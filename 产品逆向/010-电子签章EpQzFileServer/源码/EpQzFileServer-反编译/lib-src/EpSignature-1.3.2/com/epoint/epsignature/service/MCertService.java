/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.ICreateToken;
import com.epoint.epsignature.api.OutImplAPI;
import com.epoint.epsignature.bean.CertObject;
import com.epoint.epsignature.bean.MultiSignInfo;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.SignInfo;
import com.epoint.epsignature.bean.mcert.MCertBaseReq;
import com.epoint.epsignature.bean.mcert.MCertBaseResp;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.service.SignService;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SSLUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.epsignature.utils.XSSDetector;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.util.TokenUtil;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class MCertService {
    private static Logger log = Logger.getLogger(MCertService.class);
    private static String[] QRAPPTYPE = new String[]{"357", "354", "359", "356", "391", "398", "400"};
    public static String[] QZQRAPPTYPE = new String[]{"428"};
    public static final String QRCODEID_QRAPPTYPE_MIDFIX = "@QRAPPTYPE@";
    private static final String ISUSEBZTQRCODE = ConfigUtil.getConfigValue("ztb", "ISUSEBZTQRCODE");
    private String mcertUrl;
    private String curPlatFormCode;
    private String tokenSecret;
    private String huaweiUrl;
    private ICreateToken tokenMaker;
    private String dzhtUrl;
    private boolean isIgnoreSSL = false;
    private String mcertQrUrl;
    private String originMcertUrl;

    public MCertService(String mcertUrl, String platformcode, String tokenSecret) {
        this.setMcertUrl(mcertUrl);
        this.setPlatConfig(platformcode, tokenSecret);
        if (StringUtil.isNotBlank(ConfigUtil.getConfigValue("ztb", "mcertQrUrl"))) {
            this.mcertQrUrl = ConfigUtil.getConfigValue("ztb", "mcertQrUrl");
        }
    }

    public void setPlatConfig(final String platformcode, final String tokenSecret) {
        this.curPlatFormCode = platformcode;
        this.tokenSecret = tokenSecret;
        if (StringUtil.isNotBlank(platformcode) && StringUtil.isNotBlank(tokenSecret)) {
            this.tokenMaker = new ICreateToken(){

                @Override
                public String createToken() {
                    return TokenUtil.createToken(platformcode, tokenSecret, null);
                }
            };
        }
    }

    public void setTokenMaker(ICreateToken tokenMaker) {
        this.tokenMaker = tokenMaker;
    }

    public ICreateToken getTokenMaker() {
        return this.tokenMaker;
    }

    public CertObject queryCertByDevicenum(String devicenum) throws Exception {
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("devicenum", devicenum);
        String pStr = JSONUtils.bean2json(this.createReq(params));
        String rst = this.post("/rest/mcert/frame/common/querycert", pStr);
        MCertBaseResp bresp = JSONUtils.json2bean(rst, MCertBaseResp.class);
        CertObject certobj = bresp.getCustom().getCertobject();
        if (certobj == null) {
            throw new RuntimeException("\u672a\u67e5\u8be2\u5230\u8bc1\u4e66\u4fe1\u606f,devicenum\u4e3a:[" + devicenum + "]");
        }
        return certobj;
    }

    public CertObject queryCertByDognum(String dognum) throws Exception {
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("dognum", dognum);
        String pStr = JSONUtils.bean2json(this.createReq(params));
        String rst = this.post("/rest/mcert/frame/common/querycertbydognum", pStr);
        MCertBaseResp bresp = JSONUtils.json2bean(rst, MCertBaseResp.class);
        CertObject certobj = bresp.getCustom().getCertobject();
        if (certobj == null) {
            throw new RuntimeException("\u672a\u67e5\u8be2\u5230\u8bc1\u4e66\u4fe1\u606f,dognum\u4e3a:[" + dognum + "]");
        }
        return certobj;
    }

    public String creatQR(Object qrinfo) throws Exception {
        String str = JSONUtils.bean2json(qrinfo);
        QRInfo qrinfo_ = JSONUtils.json2bean(str, QRInfo.class);
        Map<String, Object> ext = qrinfo_.getExt();
        if (!"0".equals(ISUSEBZTQRCODE)) {
            if (ext == null) {
                ext = new HashMap<String, Object>();
            }
            ext.put("qrimagerequired", "1");
            qrinfo_.setExt(ext);
        }
        String request = JSONUtils.bean2json(this.createQRReq(qrinfo_));
        if (ext != null && ext.get("qrapptype") != null) {
            return this.post("/rest/mcert/frame/qrinfo/createQR", request, qrinfo_.getExt().get("qrapptype").toString());
        }
        return this.post("/rest/mcert/frame/qrinfo/createQR", request);
    }

    public String creat11QR(Object qrinfo) throws Exception {
        JSONObject qrObject = JSONUtils.json2bean(qrinfo, JSONObject.class);
        if (StringUtil.isNotBlank(qrObject.getString("platformcode"))) {
            qrObject.put("platformcode", (Object)qrObject.getString("platformcode"));
        } else {
            qrObject.put("platformcode", (Object)this.curPlatFormCode);
        }
        qrObject.put("remaintime", (Object)6000);
        JSONObject qrReqObj = new JSONObject();
        qrReqObj.put("qrinfo", (Object)qrObject);
        MCertBaseReq req = new MCertBaseReq();
        req.setHead(new MCertBaseReq.Head(this.curPlatFormCode, new Date().getTime(), this.createToken()));
        req.setParams(qrReqObj);
        String request = JSONUtils.bean2json(req);
        return this.post("/rest/mcert/frame/qrinfo/createQR", request);
    }

    public String qr11tb(Object qr11tb) throws Exception {
        MCertBaseReq req = new MCertBaseReq();
        req.setHead(new MCertBaseReq.Head(this.curPlatFormCode, new Date().getTime(), this.createToken()));
        req.setParams(qr11tb);
        String request = JSONUtils.bean2json(req);
        return this.post("/rest/mcert/frame/qrinfoex/qr11tb", request);
    }

    public String queryQRresult(String qrcodeid) throws Exception {
        if (!XSSDetector.isSafe(qrcodeid)) {
            throw new RuntimeException("\u8bf7\u6c42\u53c2\u6570\u975e\u6cd5");
        }
        JSONObject reqJSONObject = JSONUtils.getJSONObject(qrcodeid);
        String qrApptype = null;
        if (reqJSONObject != null) {
            qrcodeid = reqJSONObject.getString("qrcodeid");
            qrApptype = reqJSONObject.getString("qrapptype");
        }
        String request = JSONUtils.bean2json(this.createReq(new QueryResultReq(qrcodeid)));
        if (StringUtil.isNotBlank(qrApptype)) {
            return this.post("/rest/mcert/frame/qrinfo/queryQRResult", request, qrApptype);
        }
        return this.post("/rest/mcert/frame/qrinfo/queryQRResult", request);
    }

    public String queryMultiQRresult(JSONObject request) throws Exception {
        return this.dzhtpost("/rest/mobilecertservice/pushSuccessSignDate", request);
    }

    public List<Seal> getSealImg(String req) throws Exception {
        return this.getImg("/rest/mcert/frame/signature/getSignature", req);
    }

    public List<Seal> getSealImgByDognum(String req) throws Exception {
        return this.getImg("/rest/mcert/frame/signature/getsignaturebydognum", req);
    }

    public List<Seal> getImg(String ruter, String req) throws Exception {
        String pStr = JSONUtils.bean2json(this.createReq(req));
        ruter = "/rest/mcert/frame/signature/getSeSeal";
        String rst = "";
        JSONObject reqJSONObject = JSONUtils.getJSONObject(req);
        String qrApptype = null;
        if (reqJSONObject != null) {
            qrApptype = reqJSONObject.getString("qrapptype");
        }
        if (StringUtil.isBlank(rst = StringUtil.isNotBlank(qrApptype) ? this.post(ruter, pStr, qrApptype) : this.post(ruter, pStr))) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        MCertBaseResp bztBaseReq = JSONUtils.json2bean(rst, MCertBaseResp.class);
        int code = bztBaseReq.getStatus().getCode();
        if (code == 1) {
            List<Seal> list = bztBaseReq.getCustom().getSeals();
            Seal obj = new Seal();
            Seal obj_sign = new Seal();
            if (list == null) {
                throw new RuntimeException("\u672a\u627e\u5230\u7b7e\u7ae0ASN1\u4fe1\u606f\uff01\uff01");
            }
            return list;
        }
        throw new RuntimeException("\u83b7\u53d6\u5370\u7ae0\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + bztBaseReq.getStatus().getText());
    }

    private String post(String suburl, String params, String qrAppType) throws Exception {
        if (StringUtil.isNotBlank(qrAppType) && Arrays.asList(QRAPPTYPE).contains(qrAppType)) {
            suburl = suburl.replace("/rest/mcert/frame/qrinfo", "/rest/thirdapp/mcert/frame/qrinfo");
            if (StringUtil.isNotBlank(this.mcertQrUrl)) {
                this.originMcertUrl = this.mcertUrl;
                this.mcertUrl = this.mcertQrUrl;
            }
        }
        if (StringUtil.isNotBlank(qrAppType) && Arrays.asList(QZQRAPPTYPE).contains(qrAppType)) {
            suburl = suburl.replace("/rest/mcert/frame/qrinfo", "/rest/thirdapp/mcert/frame/qrinfo");
            suburl = suburl.replace("/rest/mcert/frame/signature/getSeSeal", "/rest/thirdapp/mcert/frame/signature/getSeSeal");
            if (StringUtil.isNotBlank(this.mcertQrUrl)) {
                this.originMcertUrl = this.mcertUrl;
                this.mcertUrl = this.mcertQrUrl;
            }
        }
        return this.post(suburl, params);
    }

    protected String post(String suburl, String params) throws Exception {
        if (this.isIgnoreSSL && this.mcertUrl.contains("https")) {
            SSLUtils.ignoreSsl();
        }
        String resp = HttpUtil.doPost(params, this.mcertUrl + suburl);
        if (StringUtil.isNotBlank(this.originMcertUrl)) {
            this.mcertUrl = this.originMcertUrl;
        }
        if (StringUtil.isBlank(resp)) {
            log.info("\u63a5\u53e3\u8bf7\u6c42\u5730\u5740\uff1a" + this.mcertUrl + suburl + ";\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570\uff1a" + params);
            throw new RuntimeException("\u6807\u8bc1\u901a\u63a5\u53e3\u8c03\u7528\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5token\u662f\u5426\u6709\u95ee\u9898\uff01");
        }
        MCertBaseResp bztBaseReq = null;
        try {
            bztBaseReq = JSONUtils.json2bean(resp, MCertBaseResp.class);
            if (bztBaseReq.getStatus().getCode() == 1) {
                return resp;
            }
        }
        catch (Exception e) {
            log.info("\u63a5\u53e3\u8bf7\u6c42\u5730\u5740\uff1a" + this.mcertUrl + suburl + ";\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570\uff1a" + params);
            log.info("\u6807\u8bc1\u901a\u63a5\u53e3\u8fd4\u56de\u503c\uff1a" + resp);
            throw new RuntimeException("\u6807\u8bc1\u901a\u63a5\u53e3\u8c03\u7528\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + e.getMessage(), e);
        }
        log.info("\u63a5\u53e3\u8bf7\u6c42\u5730\u5740\uff1a" + this.mcertUrl + suburl + ";\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570\uff1a" + params);
        throw new RuntimeException("\u6807\u8bc1\u901a\u4e1a\u52a1\u5f02\u5e38\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + bztBaseReq.getStatus().getText());
    }

    private String dzhtpost(String suburl, JSONObject request) throws Exception {
        JSONObject reqJson = new JSONObject();
        JSONArray reqArr = new JSONArray();
        for (Map.Entry<String, Object> entry : request.entrySet()) {
            JSONObject info = new JSONObject();
            info.put("qrcodeid", entry.getValue());
            reqArr.add(info);
        }
        reqJson.put("childqrcodeids", (Object)reqArr);
        String dzhtjkUrl = this.dzhtUrl + suburl;
        String resp = HttpUtil.doPost(reqJson.toJSONString(), dzhtjkUrl);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u7535\u5b50\u5408\u540c\u63a5\u53e3\u8c03\u7528\u5931\u8d25");
        }
        return resp;
    }

    private MCertBaseReq createQRReq(QRInfo qrinfo) {
        if (StringUtil.isBlank(qrinfo.getPlatformcode())) {
            qrinfo.setPlatformcode(this.curPlatFormCode);
        }
        qrinfo.setTimestamp(new Date().getTime());
        return this.createReq(new CreateQRReq(qrinfo));
    }

    protected MCertBaseReq createReq(Object params) {
        MCertBaseReq req = new MCertBaseReq();
        req.setHead(new MCertBaseReq.Head(this.curPlatFormCode, new Date().getTime(), this.createToken()));
        req.setParams(params);
        return req;
    }

    private String createToken() {
        String token = "";
        if (this.tokenMaker != null) {
            token = this.tokenMaker.createToken();
        }
        if (StringUtil.isBlank(token)) {
            log.error("\u3010\u6807\u8bc1\u901a\u7ec4\u4ef6\u3011\u65e0\u6cd5\u751f\u6210token! \u8bf7\u5b9e\u73b0createToken\u65b9\u6cd5\uff01");
        }
        return token;
    }

    public String getMcertUrl() {
        return this.mcertUrl;
    }

    public void setMcertUrl(String mcertUrl) {
        if (StringUtil.isNotBlank(mcertUrl) && mcertUrl.endsWith("/")) {
            mcertUrl = mcertUrl.substring(0, mcertUrl.lastIndexOf(47));
        }
        this.mcertUrl = mcertUrl;
    }

    public String getHuaweiUrl() {
        return this.huaweiUrl;
    }

    public void setHuaweiUrl(String huaweiUrl) {
        this.huaweiUrl = huaweiUrl;
    }

    public String signInfoSync(Object signInfo) throws Exception {
        ArrayList list = new ArrayList();
        SignInfo signInfo_ = JSONUtils.json2bean(signInfo, SignInfo.class);
        List<MultiSignInfo> multisigninfolist = signInfo_.getMultisigninfo();
        for (MultiSignInfo multiSignInfo : multisigninfolist) {
            HashMap<String, Object> map = new HashMap<String, Object>();
            CertObject certObj = new CertObject();
            certObj.setDognum(multiSignInfo.getDognum());
            map.put("certobject", certObj);
            ArrayList<QRInfo.SignatureObject> signatureobjects = new ArrayList<QRInfo.SignatureObject>();
            QRInfo.SignatureObject signatureObject = new QRInfo.SignatureObject();
            signatureObject.setOrg(signInfo_.getSignlist());
            signatureobjects.add(signatureObject);
            map.put("signatureobjects", signatureobjects);
            HashMap<String, String> ext = new HashMap<String, String>();
            ext.put("keyword", multiSignInfo.getKeyword());
            map.put("ext", ext);
            map.put("platformcode", this.curPlatFormCode);
            list.add(map);
        }
        HashMap<String, Object> mapReq = new HashMap<String, Object>();
        mapReq.put("qrcodeid", signInfo_.getQrcodeid());
        mapReq.put("objects", list);
        mapReq.put("ext", new HashMap());
        String request = JSONUtils.bean2json(this.createReq(mapReq));
        return this.post("/rest/mcert/frame/qrinfoex/signInfoSync", request);
    }

    @Deprecated
    public OutImplAPI.SignResult querySignQRResult(String qrcodeid) throws Exception {
        throw new RuntimeException("\u8be5\u5199\u6cd5\u5df2\u5f03\u7528\uff0c\u8bf7\u8054\u7cfb\u6807\u8bc1\u901a\u5f00\u53d1\u83b7\u53d6\u65b0\u7684\u5199\u6cd5\uff01");
    }

    @Deprecated
    public String queryCert(String var1) throws Exception {
        throw new RuntimeException("\u8be5\u5199\u6cd5\u5df2\u5f03\u7528\uff0c\u8bf7\u8054\u7cfb\u6807\u8bc1\u901a\u5f00\u53d1\u83b7\u53d6\u65b0\u7684\u5199\u6cd5\uff01");
    }

    @Deprecated
    public String creatSignQR(List<SignService.DegistNode> degist, String dognum) throws Exception {
        throw new RuntimeException("\u8be5\u5199\u6cd5\u5df2\u5f03\u7528\uff0c\u8bf7\u8054\u7cfb\u6807\u8bc1\u901a\u5f00\u53d1\u83b7\u53d6\u65b0\u7684\u5199\u6cd5\uff01");
    }

    public String getDzhtUrl() {
        return this.dzhtUrl;
    }

    public void setDzhtUrl(String dzhtUrl) {
        this.dzhtUrl = dzhtUrl;
    }

    public void setIgnoreSSL(boolean isIgnoreSSL) {
        this.isIgnoreSSL = isIgnoreSSL;
    }

    public String getCurPlatFormCode() {
        return this.curPlatFormCode;
    }

    public void setCurPlatFormCode(String curPlatFormCode) {
        this.curPlatFormCode = curPlatFormCode;
    }

    public String getTokenSecret() {
        return this.tokenSecret;
    }

    public void setTokenSecret(String tokenSecret) {
        this.tokenSecret = tokenSecret;
    }

    public boolean verifySign(QRInfo qrinfo) throws Exception {
        Map<String, Object> ext = qrinfo.getExt();
        String org = Base64Util.decode2string(qrinfo.getSignatureobjects().get(0).getOrg());
        String org_ = qrinfo.getSignatureobjects().get(0).getOrg();
        String cert = qrinfo.getCertobject().getSignaturecert();
        String signature = qrinfo.getSignatureobjects().get(0).getSigned();
        HashMap<String, String> req = new HashMap<String, String>();
        req.put("signcert", cert);
        req.put("plain", signature);
        req.put("org", org);
        String request = JSONUtils.bean2json(this.createReq(req));
        if (ext != null && ext.get("qrapptype") != null) {
            String resp = this.post("/rest/thirdapp/mcert/frame/signature/verifySign", request);
            String flag = JSONObject.parseObject(resp).getJSONObject("custom").getString("flag");
            if (!Boolean.parseBoolean(flag)) {
                req.put("org", org_);
                request = JSONUtils.bean2json(this.createReq(req));
                resp = this.post("/rest/thirdapp/mcert/frame/signature/verifySign", request);
                flag = JSONObject.parseObject(resp).getJSONObject("custom").getString("flag");
            }
            return Boolean.parseBoolean(flag);
        }
        return false;
    }

    static class CreateQRReq {
        private QRInfo qrinfo;

        public QRInfo getQrinfo() {
            return this.qrinfo;
        }

        public void setQrinfo(QRInfo qrinfo) {
            this.qrinfo = qrinfo;
        }

        public CreateQRReq(QRInfo qrinfo) {
            this.qrinfo = qrinfo;
        }
    }

    static class QueryResultReq {
        private String qrcodeid;

        public String getQrcodeid() {
            return this.qrcodeid;
        }

        public void setQrcodeid(String qrcodeid) {
            this.qrcodeid = qrcodeid;
        }

        public QueryResultReq(String qrcodeid) {
            this.qrcodeid = qrcodeid;
        }
    }

    static enum QrStatus {
        \u672a\u626b\u7801("00"),
        \u5df2\u626b\u7801\u672a\u786e\u8ba4("01"),
        \u5df2\u786e\u8ba4("02"),
        \u65e0\u6548("03");

        String val;

        private QrStatus(String val) {
            this.val = val;
        }

        public String getValue() {
            return this.val;
        }

        public static QrStatus getByValue(String type) {
            for (QrStatus item : QrStatus.values()) {
                if (!item.getValue().equals(type)) continue;
                return item;
            }
            return null;
        }
    }

    static enum QrcodeType {
        \u767b\u5f55("1"),
        \u7b7e\u540d("2"),
        \u7b7e\u7ae0("3"),
        \u89e3\u5bc6("5"),
        \u751f\u6210\u8bc1\u4e66("6"),
        \u7ed1\u5b9a\u8bc1\u4e66("7"),
        \u8bf7\u6c42\u7ed3\u679c("8"),
        \u751f\u6210\u6295\u6807\u6587\u4ef6("9"),
        \u6279\u91cf\u7b7e\u7ae0("11");

        String val;

        private QrcodeType(String val) {
            this.val = val;
        }

        public String getValue() {
            return this.val;
        }

        public static QrcodeType getByValue(String type) {
            for (QrcodeType item : QrcodeType.values()) {
                if (!item.getValue().equals(type)) continue;
                return item;
            }
            return null;
        }
    }

    private static class Ruter {
        public static final String CREATEQR = "/rest/mcert/frame/qrinfo/createQR";
        public static final String QUERYRESULT = "/rest/mcert/frame/qrinfo/queryQRResult";
        public static final String GETCERT = "/rest/mcert/frame/common/querycert";
        public static final String GETCERTBYDOGNUM = "/rest/mcert/frame/common/querycertbydognum";
        public static final String GETSEALIMG = "/rest/mcert/frame/signature/getSignature";
        public static final String GETSEALIMGBYDOGNUM = "/rest/mcert/frame/signature/getsignaturebydognum";
        public static final String GETSESEAL = "/rest/mcert/frame/signature/getSeSeal";
        public static final String SIGNINFOSYNC = "/rest/mcert/frame/qrinfoex/signInfoSync";
        public static final String QR11TB = "/rest/mcert/frame/qrinfoex/qr11tb";
        public static final String QUERYMULTIQRRESULT = "/rest/mobilecertservice/pushSuccessSignDate";
        public static final String VERIFY = "/rest/thirdapp/mcert/frame/signature/verifySign";

        private Ruter() {
        }
    }
}


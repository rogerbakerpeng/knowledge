/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.asn1.SealFactory;
import com.epoint.epsignature.asn1.dto.EpSESeal;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.gmhelper.util.TokenUtil;
import java.net.URLDecoder;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;

public class ServerSealActions
extends BaseActions {
    private static Logger logger = Logger.getLogger(ServerSealActions.class);
    private static String platformcode = "";
    private static String posturl = "";
    private static String appsecret = "";
    public static final String GETSESEAL = "/rest/mcert/frame/signature/getSeSeal";
    public static final String SIGNDATA = "/rest/epqzservice/v2/cert/signdata";
    public static final String APPLYCLOUDCERT = "/rest/epqzservice/v2/cert/applycertandseal";
    public static final String GETCERTLIST = "/rest/epqzservice/v2/cert/getcertlist";
    public static final String VERIFYSIGN = "/rest/epqzservice/v2/cert/verifydata";
    public static final String CERTMANAGE = "/rest/epqzservice/v2/cert/certmanage";
    public static final String GETCERTINFO = "/rest/epqzservice/v2/cert/getcertinfo";
    public static final String GETSEALLIST = "/rest/epqzservice/v2/seal/getseallist";
    public static final String GETSEALPIC = "/rest/epqzservice/v2/seal/getsealpic";
    public static final String FACECHECK = "/rest/epqzservice/v2/user/facecheck";
    public static final String FACECHECKRESULT = "/rest/epqzservice/v2/user/facecheckresult";
    public static final String LEDGERDATA = "/rest/epqzservice/v2/user/ledgerdata";
    public static final String QUERYLEDGERDATA = "/rest/epqzservice/v2/user/queryledgerdata";
    public static final String SQVEDATA = "/rest/epqzservice/v1/saas/savedata";
    public static final String VERIFYDATA = "/rest/epqzservice/v1/saas/verifydata";
    public static final String CHECKPIN = "/rest/epqzservice/v2/cert/checkpin";

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        posturl = (String)actionContext.get("posturl");
        platformcode = StringUtil.isBlank(actionContext.get("cloudplatformcode")) ? (String)actionContext.get("platformcode") : (String)actionContext.get("cloudplatformcode");
        appsecret = StringUtil.isBlank(actionContext.get("cloudtokenSecret")) ? (String)actionContext.get("tokenSecret") : (String)actionContext.get("cloudtokenSecret");
    }

    private Seal getSealInfo(String seal_str) {
        try {
            EpSESeal epSESeal = SealFactory.parseSeal(Base64Util.decode(seal_str));
            Seal seal = new Seal();
            seal.setSealguid(epSESeal.getEsealInfo().getEsID());
            seal.setSealtype(epSESeal.getEsealInfo().getProperty().getType().intValue());
            seal.setSealname(epSESeal.getEsealInfo().getProperty().getName());
            seal.setSealdata(Base64Util.encode(epSESeal.getEncoded()));
            seal.setSealimg(Base64Util.encode(epSESeal.getEsealInfo().getPicture().getData()));
            String code_img = "";
            try {
                code_img = new String(epSESeal.getEsealInfo().getExtDatas().getByOID("1.2.156.124445.2").getExtnValue());
                seal.setCode_img(code_img);
            }
            catch (Exception e) {
                logger.info("code_img\u672a\u53d6\u5230\uff01", e);
            }
            return seal;
        }
        catch (Exception e) {
            logger.error("\u7b7e\u7ae0\u7684asn\u6570\u636e\u89e3\u6790\u5931\u8d25\uff01", e);
            return null;
        }
    }

    public BaseResp checkPin(BaseReq basereq) throws Exception {
        String result;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map map_ = JSONUtils.json2bean(req, Map.class);
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap params = new HashMap();
        params.put("userid", map_.get("userid"));
        params.put("pin", map_.get("pin"));
        reqObject.setParams(params);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + CHECKPIN);
        HashMap<String, String> respmap_ = new HashMap<String, String>();
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u8c03\u7528pin\u7801\u6821\u9a8c\u5931\u8d25\uff0c\u8bf7\u67e5\u770b\u7cfb\u7edf\u65e5\u5fd7\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        if (code == 1) {
            result = JSONObject.parseObject(resp).getJSONObject("params").getString("result");
            if (!"true".equals(result)) {
                throw new RuntimeException("\u4e91\u8bc1\u5bc6\u7801\u6821\u9a8c\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + JSONObject.parseObject(resp).getJSONObject("params").getString("errortext"));
            }
        } else {
            throw new RuntimeException("\u4e91\u8bc1\u5bc6\u7801\u6821\u9a8c\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
        }
        respmap_.put("result", result);
        return this.success(JSONUtils.bean2json(respmap_));
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        ArrayList<Seal> list_seal = new ArrayList<Seal>();
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map map_ = JSONUtils.json2bean(req, Map.class);
        String filtersealid = (String)map_.get("filtersealid");
        String showSignTimeInPre = (String)map_.get("showSignTimeInPre");
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap params = new HashMap();
        params.put("userid", map_.get("userid"));
        params.put("operuserid", map_.get("operuserid"));
        String projectnum_base64 = (String)map_.get("projectnum");
        if (StringUtil.isNotBlank(projectnum_base64)) {
            String projectnum = new String(Base64Util.decode(projectnum_base64), "UTF-8");
            params.put("projectnum", projectnum);
        }
        reqObject.setParams(params);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + GETSEALLIST);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        if (code == 1) {
            JSONArray array = json_.getJSONObject("params").getJSONArray("seallist");
            String expiredRemindMsg = json_.getJSONObject("params").getString("certexpireremind");
            if (StringUtil.isNotBlank(expiredRemindMsg)) {
                throw new RuntimeException(expiredRemindMsg);
            }
            String errorMsg = json_.getJSONObject("params").getString("errormsg");
            if (StringUtil.isNotBlank(errorMsg)) {
                throw new RuntimeException(errorMsg);
            }
            for (Object object : array) {
                String sealid = ((JSONObject)object).getString("sealid");
                if (StringUtil.isNotBlank(filtersealid) && !filtersealid.contains(sealid)) continue;
                params = new HashMap();
                params.put("userid", map_.get("userid"));
                params.put("sealid", sealid);
                reqObject.setParams(params);
                resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + GETSEALPIC);
                json_ = JSONObject.parseObject(resp);
                String sealimg = json_.getJSONObject("params").getString("sealimg");
                Seal seal = this.getSealInfo(sealimg);
                if (seal != null && StringUtil.isNotBlank(showSignTimeInPre) && "1".equals(showSignTimeInPre)) {
                    seal.setSealimg(SignUtil.getSignimgWithDate(seal.getSealimg(), true));
                }
                list_seal.add(seal);
            }
        } else {
            throw new RuntimeException("\u83b7\u53d6\u4e91\u8bc1\u7b7e\u540d\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
        }
        if (list_seal.isEmpty()) {
            throw new RuntimeException("\u8be5\u7528\u6237\u6ca1\u6709\u76d6\u7ae0\u6743\u9650\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
        }
        return this.success(list_seal);
    }

    public BaseResp queryCert(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map map_ = JSONUtils.json2bean(req, Map.class);
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap params = new HashMap();
        params.put("userid", map_.get("userid"));
        if (StringUtil.isNotBlank(map_.get("certid"))) {
            params.put("certid", map_.get("certid"));
        } else {
            params.put("certid", this.getCertID((String)map_.get("userid"), (String)map_.get("projectnum")));
        }
        reqObject.setParams(params);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + GETCERTINFO);
        String signcert = JSONObject.parseObject(resp).getJSONObject("params").getString("signcert");
        HashMap<String, String> respmap_ = new HashMap<String, String>();
        respmap_.put("cert", signcert);
        return this.success(JSONUtils.bean2json(map_));
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("userid", reqmap_.get("userid"));
        if (StringUtil.isNotBlank(reqmap_.get("certid"))) {
            params.put("certid", reqmap_.get("certid"));
        } else {
            params.put("certid", this.getCertID((String)reqmap_.get("userid"), (String)reqmap_.get("projectnum")));
        }
        EpSignObj epSignObj_ = new EpSignObj();
        epSignObj_.setOrg((String)reqmap_.get("signed"));
        EpSignObj[] epSignObjArray = new EpSignObj[]{epSignObj_};
        EpAuthObj epAuthObj_ = new EpAuthObj();
        epAuthObj_.setAuthtype(0);
        params.put("signobjs", epSignObjArray);
        params.put("authobj", epAuthObj_);
        params.put("operuserid", reqmap_.get("operuserid"));
        params.put("sealid", reqmap_.get("sealid"));
        params.put("initiatorcode", reqmap_.get("initiatorcode"));
        params.put("filename", URLDecoder.decode((String)reqmap_.get("filename"), "UTF-8"));
        params.put("bdname", reqmap_.get("bdname"));
        params.put("bdno", reqmap_.get("bdno"));
        params.put("bdguid", reqmap_.get("bdguid"));
        params.put("projectloc", reqmap_.get("projectloc"));
        params.put("kbdate", reqmap_.get("kbdate"));
        params.put("applystage", reqmap_.get("applystage"));
        params.put("clientmac", reqmap_.get("clientmac"));
        params.put("clientip", reqmap_.get("clientip"));
        reqObject.setParams(params);
        String pStr = JSONUtils.bean2json(reqObject);
        String resp = HttpUtil.doPost(pStr, posturl + SIGNDATA);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        if (code == 1) {
            JSONArray array = json_.getJSONObject("params").getJSONArray("signobjs");
            String signcert = json_.getJSONObject("params").getString("signcert");
            if (array.isEmpty()) {
                throw new RuntimeException("\u7b7e\u540d\u5931\u8d25\uff01");
            }
            HashMap<String, String> map_ = new HashMap<String, String>();
            map_.put("signature", array.getJSONObject(0).getString("signed"));
            map_.put("signcert", signcert);
            return this.success(JSONUtils.bean2json(map_));
        }
        throw new RuntimeException("\u83b7\u53d6\u4e91\u8bc1\u7b7e\u540d\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
    }

    public BaseResp queryCert4ZJGCloudSign(BaseReq basereq) {
        Map map = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), Map.class);
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap body = new HashMap();
        body.put("userid", map.get("userid"));
        body.put("certid", this.getCertID((String)map.get("userid")));
        reqObject.setParams(body);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + GETCERTINFO);
        String signcert = JSONObject.parseObject(resp).getJSONObject("params").getString("signcert");
        String SignCertSN = JSONObject.parseObject(resp).getJSONObject("params").getString("certsn");
        String CertName = JSONObject.parseObject(resp).getJSONObject("params").getString("certname");
        String Validate = JSONObject.parseObject(resp).getJSONObject("params").getString("validate");
        HashMap<String, String> rtn = new HashMap<String, String>();
        rtn.put("cert", signcert);
        rtn.put("SignCertSN", SignCertSN);
        rtn.put("CertName", CertName);
        rtn.put("Validate", Validate);
        return this.success(JSONUtils.bean2json(rtn));
    }

    public BaseResp getSignData4ZJGCloudSign(BaseReq basereq) throws Exception {
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        Map reqmap = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), Map.class);
        HashMap<String, Object> body = new HashMap<String, Object>();
        body.put("userid", reqmap.get("userid"));
        body.put("certid", this.getCertID((String)reqmap.get("userid")));
        body.put("sealid", reqmap.get("sealid"));
        body.put("operuserid", reqmap.get("operuserid"));
        body.put("filename", reqmap.get("filename"));
        body.put("clientip", reqmap.get("clientip"));
        body.put("clientmac", reqmap.get("clientmac"));
        EpSignObj epSignObj = new EpSignObj();
        epSignObj.setOrg((String)reqmap.get("signed"));
        EpSignObj[] epSignObjArray = new EpSignObj[]{epSignObj};
        EpAuthObj epAuthObj = new EpAuthObj();
        epAuthObj.setAuthtype(0);
        body.put("signobjs", epSignObjArray);
        body.put("authobj", epAuthObj);
        reqObject.setParams(body);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + SIGNDATA);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        if (code == 1) {
            JSONArray array = json_.getJSONObject("params").getJSONArray("signobjs");
            String signcert = json_.getJSONObject("params").getString("signcert");
            if (StringUtil.isBlank(array)) {
                throw new RuntimeException("\u7b7e\u540d\u5931\u8d25\uff01");
            }
            HashMap<String, String> map_ = new HashMap<String, String>();
            map_.put("signature", array.getJSONObject(0).getString("signed"));
            map_.put("signcert", signcert);
            map_.put("SignCertSN", SM2CertUtil.getSerialNumber(Base64Util.decode(signcert)));
            X509Certificate signCert = SM2CertUtil.getX509Certificate(Base64Util.decode(signcert));
            String certname = CertUtils.getClientSignCertCN(signCert);
            map_.put("CertName", certname);
            return this.success(JSONUtils.bean2json(map_));
        }
        throw new RuntimeException("\u83b7\u53d6\u4e91\u8bc1\u7b7e\u540d\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
    }

    public BaseResp verifySign4ZJGCloudSign(BaseReq basereq) {
        JSONObject Infoobj = JSONObject.parseObject(JSONUtils.bean2json(basereq.getRequest()));
        String cert = Infoobj.getJSONObject("certobject").getString("signaturecert");
        JSONArray array = Infoobj.getJSONArray("signatureobjects");
        String orgdata = array.getJSONObject(0).getString("org");
        String signdata = array.getJSONObject(0).getString("signed");
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap<String, String> body = new HashMap<String, String>();
        body.put("org", orgdata);
        body.put("signed", signdata);
        body.put("signcert", cert);
        reqObject.setParams(body);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + VERIFYSIGN);
        HashMap rtn = new HashMap();
        JSONObject json_ = JSONObject.parseObject(resp);
        String result = "false";
        int code = json_.getIntValue("code");
        if (code == 1) {
            result = "true";
        }
        return this.success(result);
    }

    public String verifySign4NET4ZJGCloudSign(String OrgDate, String Cer, String Ds, String url) {
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap<String, String> body = new HashMap<String, String>();
        body.put("org", OrgDate);
        body.put("signed", Ds);
        body.put("signcert", Cer);
        reqObject.setParams(body);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), url + VERIFYSIGN);
        HashMap rtn = new HashMap();
        JSONObject json_ = JSONObject.parseObject(resp);
        String result = "false";
        int code = json_.getIntValue("code");
        if (code == 1) {
            result = "0";
        }
        return result;
    }

    public String applyCloudCert(String userid, String username, String idcard, String extparam) {
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("userid", userid);
        params.put("usertype", "21");
        params.put("device", "2");
        params.put("extparam", extparam);
        HashMap<String, String> userinfo = new HashMap<String, String>();
        userinfo.put("username", username);
        userinfo.put("idtype", "01");
        userinfo.put("idcard", idcard);
        userinfo.put("usertype", "21");
        userinfo.put("Email", "1234567890@qq.com");
        params.put("userinfo", userinfo);
        HashMap<String, Object> cainfo = new HashMap<String, Object>();
        cainfo.put("catype", "CFCA");
        cainfo.put("validate", 1);
        cainfo.put("applicationform", "");
        params.put("cainfo", cainfo);
        reqObject.setParams(params);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + APPLYCLOUDCERT);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u7533\u8bf7\u4e91\u8bc1\u4e66,\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        if (code == 1) {
            return "\u7533\u8bf7\u6210\u529f";
        }
        throw new RuntimeException("\u7533\u8bf7\u4e91\u8bc1\u4e66\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
    }

    public String destoryCloudCert(String userid) {
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("userid", userid);
        params.put("certid", this.getCertID(userid));
        params.put("mode", 3);
        params.put("opertype", "1");
        EpAuthObj epAuthObj_ = new EpAuthObj();
        epAuthObj_.setAuthtype(0);
        params.put("epauthobj", epAuthObj_);
        reqObject.setParams(params);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + CERTMANAGE);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u9500\u6bc1\u4e13\u5bb6\u7684\u4e91\u8bc1\u4e66\u5931\u8d25\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        if (code == 1) {
            return "\u9500\u6bc1\u6210\u529f";
        }
        throw new RuntimeException("\u9500\u6bc1\u4e13\u5bb6\u7684\u4e91\u8bc1\u4e66\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
    }

    public String saveLedgerData(String userid, String hash) {
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("userid", userid);
        params.put("hash", hash);
        reqObject.setParams(params);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + SQVEDATA);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u533a\u5757\u94fe\u6570\u636e\u5b58\u50a8\u5931\u8d25\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        if (code == 1) {
            return json_.getString("params");
        }
        throw new RuntimeException("\u533a\u5757\u94fe\u6570\u636e\u5b58\u50a8\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
    }

    public String queryLedgerData(String userid, String signaData, String hash, String tx_hash) {
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("userid", userid);
        params.put("hash", hash);
        params.put("signdata", signaData);
        params.put("tx_hash", tx_hash);
        reqObject.setParams(params);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + VERIFYDATA);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u8bc4\u59d4\u6253\u5206\u5b58\u8bc1\u4fe1\u606f\u67e5\u8be2\u5931\u8d25\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        if (code == 1) {
            return json_.getString("params");
        }
        throw new RuntimeException("\u8bc4\u59d4\u6253\u5206\u5b58\u8bc1\u4fe1\u606f\u67e5\u8be2\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
    }

    public String getCertID(String userid) {
        return this.getCertID(userid, "");
    }

    public String getCertID(String userid, String projectnum_base64) {
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("userid", userid);
        try {
            if (StringUtil.isNotBlank(projectnum_base64)) {
                String projectnum = new String(Base64Util.decode(projectnum_base64), "UTF-8");
                params.put("projectnum", projectnum);
            }
        }
        catch (Exception e) {
            logger.error("\u9879\u76ee\u7f16\u53f7\u89e3\u7801\u5931\u8d25", e);
        }
        reqObject.setParams(params);
        String pStr = JSONUtils.bean2json(reqObject);
        String resp = HttpUtil.doPost(pStr, posturl + GETCERTLIST);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u8bc1\u4e66\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        if (code == 1) {
            JSONArray array = json_.getJSONObject("params").getJSONArray("certinfo");
            if (!array.isEmpty()) {
                for (int i = 0; i < array.size(); ++i) {
                    if (!"1".equals(array.getJSONObject(i).getString("certstatus"))) continue;
                    return array.getJSONObject(i).getString("certid");
                }
            }
        } else {
            throw new RuntimeException("\u83b7\u53d6\u4e91\u8bc1\u4e66\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
        }
        return "";
    }

    public String ledgerData(String hashData, String signData) {
        try {
            JSONObject returnJSON;
            ReqObject reqObject = new ReqObject();
            reqObject.setToken(this.getToken());
            reqObject.setPlatformcode(platformcode);
            HashMap<String, String> params = new HashMap<String, String>();
            params.put("data", hashData);
            params.put("signData", signData);
            reqObject.setParams(params);
            String pStr = JSONUtils.bean2json(reqObject);
            String resp = HttpUtil.doPost(pStr, posturl + LEDGERDATA);
            if (StringUtil.isBlank(resp)) {
                return "";
            }
            JSONObject json_ = JSONObject.parseObject(resp);
            int code = json_.getIntValue("code");
            if (code == 1 && StringUtil.isNotBlank(returnJSON = json_.getJSONObject("params"))) {
                return JSONObject.toJSONString(returnJSON);
            }
            return "";
        }
        catch (Exception e) {
            logger.error("ledgerData", e);
            return "";
        }
    }

    public String queryLedgerData(String transactionHashData) {
        try {
            JSONObject returnJSON;
            ReqObject reqObject = new ReqObject();
            reqObject.setToken(this.getToken());
            reqObject.setPlatformcode(platformcode);
            HashMap<String, String> params = new HashMap<String, String>();
            params.put("tx_hash", transactionHashData);
            reqObject.setParams(params);
            String pStr = JSONUtils.bean2json(reqObject);
            String resp = HttpUtil.doPost(pStr, posturl + QUERYLEDGERDATA);
            if (StringUtil.isBlank(resp)) {
                return "";
            }
            JSONObject json_ = JSONObject.parseObject(resp);
            int code = json_.getIntValue("code");
            if (code == 1 && StringUtil.isNotBlank(returnJSON = json_.getJSONObject("params"))) {
                return JSONObject.toJSONString(returnJSON);
            }
            return "";
        }
        catch (Exception e) {
            logger.error("ledgerData", e);
            return "";
        }
    }

    private String getToken() {
        if (StringUtil.isNotBlank(platformcode)) {
            if (StringUtil.isNotBlank(appsecret)) {
                return TokenUtil.createToken(platformcode, appsecret, null);
            }
        }
        return "";
    }

    public BaseResp verifySign(BaseReq basereq) throws Exception {
        boolean verify = false;
        QRInfo qrinfo = JSONUtils.json2bean(basereq.getRequest(), QRInfo.class);
        String org = Base64Util.decode2string(qrinfo.getSignatureobjects().get(0).getOrg());
        String cert = qrinfo.getCertobject().getSignaturecert();
        String signature = qrinfo.getSignatureobjects().get(0).getSigned();
        verify = EpSignatureApi.verifySign(org, cert, signature);
        return this.success(verify);
    }

    public BaseResp facecheck(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map map_ = JSONUtils.json2bean(req, Map.class);
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        String idcard_name = (String)map_.get("idcard_name");
        String projectguid_base64 = (String)map_.get("projectguid");
        if (StringUtil.isBlank(idcard_name)) {
            throw new RuntimeException("\u8eab\u4efd\u8bc1\u6216\u59d3\u540d\u4e0d\u5b58\u5728\uff01\uff01");
        }
        String idcard = new String(Base64Util.decode(idcard_name), "UTF-8").split("@")[0];
        String name = new String(Base64Util.decode(idcard_name), "UTF-8").split("@")[1];
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("idcard", idcard);
        params.put("name", name);
        if (StringUtil.isNotBlank(projectguid_base64)) {
            String projectguid = new String(Base64Util.decode(projectguid_base64), "UTF-8");
            params.put("projectguid", projectguid);
        }
        reqObject.setParams(params);
        logger.info("\u4eba\u8138\u8bc6\u522b\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqObject));
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + FACECHECK);
        logger.info("\u4eba\u8138\u8bc6\u522b\u8fd4\u56de\u503c\uff1a" + resp);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        HashMap<String, String> result = new HashMap<String, String>();
        if (code != 1) {
            throw new RuntimeException("\u83b7\u53d6\u4eba\u8138\u8bc6\u522b\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
        }
        String H5FaceUrl = json_.getJSONObject("params").getString("H5FaceUrl");
        String orderno = json_.getJSONObject("params").getString("orderno");
        String isneedface = json_.getJSONObject("params").getString("isneedface");
        result.put("H5FaceUrl", H5FaceUrl);
        result.put("orderno", orderno);
        result.put("isneedface", isneedface);
        return this.success(result);
    }

    public BaseResp facecheckresult(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map map_ = JSONUtils.json2bean(req, Map.class);
        ReqObject reqObject = new ReqObject();
        reqObject.setToken(this.getToken());
        reqObject.setPlatformcode(platformcode);
        HashMap params = new HashMap();
        params.put("orderno", map_.get("orderno"));
        String projectguid_base64 = (String)map_.get("projectguid");
        if (StringUtil.isNotBlank(projectguid_base64)) {
            String projectguid = new String(Base64Util.decode(projectguid_base64), "UTF-8");
            params.put("projectguid", projectguid);
        }
        reqObject.setParams(params);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqObject), posturl + FACECHECKRESULT);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getIntValue("code");
        HashMap<String, String> resultmap = new HashMap<String, String>();
        if (code != 1) {
            throw new RuntimeException("\u83b7\u53d6\u4eba\u8138\u8bc6\u522b\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
        }
        String result = json_.getJSONObject("params").getString("result");
        resultmap.put("result", result);
        return this.success(resultmap);
    }

    class EpCertInfo {
        private String certid;
        private String certsn;
        private String usertype;
        private String certname;
        private String catype;
        private String certstatus;
        private String validate;

        EpCertInfo() {
        }

        public String getCertid() {
            return this.certid;
        }

        public void setCertid(String certid) {
            this.certid = certid;
        }

        public String getCertsn() {
            return this.certsn;
        }

        public void setCertsn(String certsn) {
            this.certsn = certsn;
        }

        public String getUsertype() {
            return this.usertype;
        }

        public void setUsertype(String usertype) {
            this.usertype = usertype;
        }

        public String getCertname() {
            return this.certname;
        }

        public void setCertname(String certname) {
            this.certname = certname;
        }

        public String getCatype() {
            return this.catype;
        }

        public void setCatype(String catype) {
            this.catype = catype;
        }

        public String getCertstatus() {
            return this.certstatus;
        }

        public void setCertstatus(String certstatus) {
            this.certstatus = certstatus;
        }

        public String getValidate() {
            return this.validate;
        }

        public void setValidate(String validate) {
            this.validate = validate;
        }
    }

    class EpAuthObj {
        private int authtype;
        private String signorg;
        private String signed;
        private String signcert;

        EpAuthObj() {
        }

        public int getAuthtype() {
            return this.authtype;
        }

        public void setAuthtype(int authtype) {
            this.authtype = authtype;
        }

        public String getSignorg() {
            return this.signorg;
        }

        public void setSignorg(String signorg) {
            this.signorg = signorg;
        }

        public String getSigned() {
            return this.signed;
        }

        public void setSigned(String signed) {
            this.signed = signed;
        }

        public String getSigncert() {
            return this.signcert;
        }

        public void setSigncert(String signcert) {
            this.signcert = signcert;
        }
    }

    class EpSignObj {
        private String oid;
        private String org;
        private String signed;

        EpSignObj() {
        }

        public String getOid() {
            return this.oid;
        }

        public void setOid(String oid) {
            this.oid = oid;
        }

        public String getOrg() {
            return this.org;
        }

        public void setOrg(String org) {
            this.org = org;
        }

        public String getSigned() {
            return this.signed;
        }

        public void setSigned(String signed) {
            this.signed = signed;
        }
    }

    class ReqObject {
        private String reqid = UUID.randomUUID().toString();
        private String platformcode;
        private String token;
        private String timestamp = Long.toString(new Date().getTime());
        private Object params;

        public String getReqid() {
            return this.reqid;
        }

        public void setReqid(String reqid) {
            this.reqid = reqid;
        }

        public String getPlatformcode() {
            return this.platformcode;
        }

        public void setPlatformcode(String platformcode) {
            this.platformcode = platformcode;
        }

        public String getToken() {
            return this.token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getTimestamp() {
            return this.timestamp;
        }

        public void setTimestamp(String timestamp) {
            this.timestamp = timestamp;
        }

        public Object getParams() {
            return this.params;
        }

        public void setParams(Object params) {
            this.params = params;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.gm.ses.v4.SES_Signature;
import com.epoint.epsignature.gm.ses.v4.TBS_Sign;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SSLUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.cert.SM2CertUtil;
import java.io.ByteArrayInputStream;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.security.Signature;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.log4j.Logger;
import org.bouncycastle.jcajce.provider.asymmetric.x509.CertificateFactory;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

public class GuangXiYunMCertActions
extends BaseActions {
    private static Logger logger = Logger.getLogger(GuangXiYunMCertActions.class);
    private static final String accessKey = ConfigUtil.getConfigValue("ztb", "H5GXACCESSKEY");
    private static final String secret = ConfigUtil.getConfigValue("ztb", "H5GXSECRET");
    private static final String jhserverUrl = ConfigUtil.getConfigValue("ztb", "H5GXJHSERVERURL");
    private static final String clientId = ConfigUtil.getConfigValue("ztb", "H5GXCLIENTID");
    private static final String serverUrl = ConfigUtil.getConfigValue("ztb", "H5GXSERVERURL");
    private static final String APPID = ConfigUtil.getConfigValue("ztb", "H5GXAPPID");
    private static final String APPSecret = ConfigUtil.getConfigValue("ztb", "H5GXAPPSECRET");

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        String url = serverUrl + "/restapi/prod/IC4500000120250925000019/xc/prod-api/sealopenapi/sign/signData?orderNo=";
        String orderNo = (String)basereq.getRequest();
        url = url + orderNo;
        HashMap<String, String> headPaeam = new HashMap<String, String>();
        String token = this.getToken();
        headPaeam.put("X-ACCESS-TOKEN", token);
        headPaeam.put("Authorization", "Bearer " + this.getAccessToken(token));
        headPaeam.put("ClientId", clientId);
        headPaeam.put("Content-Type", "application/json;charset=UTF-8");
        String result = HttpUtil.doGet(headPaeam, url);
        if (StringUtil.isBlank(result)) {
            logger.error(String.format("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u5931\u8d25\uff0c\u8bf7\u6c42\u5730\u5740\uff1a%s", url));
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"200".equals(jsonObj_.getString("code"))) {
            logger.error(String.format("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u5931\u8d25\uff0c\u8bf7\u6c42\u5730\u5740\uff1a%s", url));
            throw new RuntimeException(jsonObj_.getString("msg"));
        }
        int verifyStatus = jsonObj_.getJSONObject("data").getInteger("verifyStatus");
        String signData = jsonObj_.getJSONObject("data").getString("signData");
        JSONObject respParams = new JSONObject();
        respParams.put("verifyStatus", (Object)String.valueOf(verifyStatus));
        if (verifyStatus == 1) {
            respParams.put("signData", (Object)signData);
            try {
                SES_Signature sesSignature = SES_Signature.getInstance(com.epoint.epsignature.utils.Base64Util.decode(signData));
                byte[] certDER = sesSignature.getCert().getOctets();
                respParams.put("signCert", (Object)com.epoint.epsignature.utils.Base64Util.encode(certDER));
            }
            catch (Exception e1) {
                logger.error(String.format("\u89e3\u6790\u8bc1\u4e66\u6570\u636e\u5931\u8d25\uff0c\u7b7e\u540d\u540e\u6570\u636e\uff1a%s", new Object[]{com.epoint.epsignature.utils.Base64Util.decode(signData)}), e1);
            }
        }
        return this.success(respParams);
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        String url = serverUrl + "/restapi/prod/IC4500000120250925000018/xc/prod-api/sealopenapi/sign/signTask";
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        JSONObject params = new JSONObject();
        params.put("sealCode", reqmap_.get("sealCode"));
        params.put("docHashData", reqmap_.get("docHashData"));
        params.put("propertylnfo", reqmap_.get("propertylnfo"));
        String fileName = (String)reqmap_.get("fileName");
        if (fileName != null && fileName.length() > 100) {
            fileName = fileName.substring(fileName.length() - 100);
        }
        params.put("fileName", (Object)fileName);
        HashMap<String, String> headPaeam = new HashMap<String, String>();
        String token = this.getToken();
        headPaeam.put("X-ACCESS-TOKEN", token);
        headPaeam.put("Authorization", "Bearer " + this.getAccessToken(token));
        headPaeam.put("ClientId", clientId);
        headPaeam.put("Content-Type", "application/json;charset=UTF-8");
        String reqJsonStr = params.toJSONString();
        String result = HttpUtil.doPost(reqJsonStr, headPaeam, url);
        if (StringUtil.isBlank(result)) {
            logger.error(String.format("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u5931\u8d25\uff0c\u8bf7\u6c42\u5730\u5740\uff1a%s\uff0c\u8bf7\u6c42\u53c2\u6570\uff1a%s", url, reqJsonStr));
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"200".equals(jsonObj_.getString("code"))) {
            logger.error(String.format("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u5931\u8d25\uff0c\u8bf7\u6c42\u5730\u5740\uff1a%s\uff0c\u8bf7\u6c42\u53c2\u6570\uff1a%s", url, reqJsonStr));
            throw new RuntimeException(jsonObj_.getString("msg"));
        }
        String qrCode = jsonObj_.getJSONObject("data").getString("qrCode");
        String orderNo = jsonObj_.getJSONObject("data").getString("orderNo");
        JSONObject respParams = new JSONObject();
        respParams.put("orderNo", (Object)orderNo);
        respParams.put("qrCode", (Object)qrCode);
        return this.success(respParams);
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String url = serverUrl + "/restapi/prod/IC4500000120250925000016/xc/prod-api/sealopenapi/sign/getUserSealImage";
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        JSONObject params = new JSONObject();
        params.put("userName", reqmap_.get("userName"));
        params.put("userCardType", reqmap_.get("userCardType"));
        params.put("userCardNum", reqmap_.get("userCardNum"));
        HashMap<String, String> headPaeam = new HashMap<String, String>();
        String token = this.getToken();
        headPaeam.put("X-ACCESS-TOKEN", token);
        headPaeam.put("Authorization", "Bearer " + this.getAccessToken(token));
        headPaeam.put("ClientId", clientId);
        headPaeam.put("Content-Type", "application/json;charset=UTF-8");
        String reqJsonStr = params.toJSONString();
        String result = HttpUtil.doPost(reqJsonStr, headPaeam, url);
        if (StringUtil.isBlank(result)) {
            logger.error(String.format("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u5931\u8d25\uff0c\u8bf7\u6c42\u5730\u5740\uff1a%s\uff0c\u8bf7\u6c42\u53c2\u6570\uff1a%s", url, reqJsonStr));
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"200".equals(jsonObj_.getString("code"))) {
            logger.error(String.format("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u5931\u8d25\uff0c\u8bf7\u6c42\u5730\u5740\uff1a%s\uff0c\u8bf7\u6c42\u53c2\u6570\uff1a%s", url, reqJsonStr));
            throw new RuntimeException(jsonObj_.getString("msg"));
        }
        ArrayList<Seal> seals = new ArrayList<Seal>();
        JSONArray sealJson = jsonObj_.getJSONArray("data");
        for (Object sealObj : sealJson) {
            Seal seal = new Seal();
            seal.setSealimg(((JSONObject)sealObj).getString("picData"));
            seal.setSealguid(((JSONObject)sealObj).getString("sealCode"));
            seal.setSealname(((JSONObject)sealObj).getString("sealName"));
            seals.add(seal);
        }
        if (seals.isEmpty()) {
            if ("1".equals(reqmap_.get("userCardType"))) {
                throw new RuntimeException("\u672a\u80fd\u5728\u7edf\u4e00\u5370\u7ae0\u5e73\u53f0\u4e2d\u67e5\u8be2\u5230\u60a8\u5f53\u524d\u8d26\u53f7\u7684\u4e2a\u4eba\u4fe1\u606f\uff0c\u8bf7\u524d\u5f80\u7edf\u4e00\u5370\u7ae0\u5e73\u53f0\u6838\u5b9e!");
            }
            if ("2".equals(reqmap_.get("userCardType"))) {
                throw new RuntimeException("\u672a\u80fd\u5728\u7edf\u4e00\u5370\u7ae0\u5e73\u53f0\u4e2d\u67e5\u8be2\u5230\u60a8\u5f53\u524d\u7684\u5355\u4f4d\u4fe1\u606f\uff0c\u8bf7\u524d\u5f80\u7edf\u4e00\u5370\u7ae0\u5e73\u53f0\u6838\u5b9e!");
            }
        }
        return this.success(seals);
    }

    public BaseResp verifySign(BaseReq basereq) throws Exception {
        String org;
        byte[] actualData;
        byte[] actualDataHash;
        QRInfo qrinfo = JSONUtils.json2bean(basereq.getRequest(), QRInfo.class);
        String signature = qrinfo.getSignatureobjects().get(0).getSigned();
        SES_Signature sesSignature = SES_Signature.getInstance(com.epoint.epsignature.utils.Base64Util.decode(signature));
        TBS_Sign toSign = sesSignature.getToSign();
        byte[] expectDataHash = toSign.getDataHash().getEncoded("DER");
        if (!Arrays.equals(expectDataHash, actualDataHash = new DERBitString(actualData = com.epoint.epsignature.utils.Base64Util.decode(org = Base64Util.decode2string(qrinfo.getSignatureobjects().get(0).getOrg()))).getEncoded("DER"))) {
            logger.error("\u539f\u6587\u5df2\u88ab\u4fee\u6539\uff0cV4\u9a8c\u7b7e\u5931\u8d25");
            return this.success(false);
        }
        byte[] certDER = sesSignature.getCert().getOctets();
        Certificate signCert = new CertificateFactory().engineGenerateCertificate(new ByteArrayInputStream(certDER));
        byte[] expSigVal = sesSignature.getSignature().getOctets();
        X509Certificate signCert2 = SM2CertUtil.getX509Certificate(certDER);
        String algorithm = StringUtil.isNotBlank(signCert2.getSigAlgName()) ? signCert2.getSigAlgName() : sesSignature.getSignatureAlgID().getId();
        Signature sg = Signature.getInstance(algorithm, new BouncyCastleProvider());
        sg.initVerify(signCert);
        sg.update(toSign.getEncoded("DER"));
        boolean verify = sg.verify(expSigVal);
        if (!verify) {
            sg.update(com.epoint.epsignature.utils.Base64Util.encode(toSign.getEncoded("DER")).getBytes("UTF-8"));
            verify = sg.verify(expSigVal);
        }
        return this.success(verify);
    }

    public String getAccessToken(String token) throws Exception {
        String url = serverUrl + "/restapi/prod/IC4500000120250925000009/xc/prod-api/auth/token";
        JSONObject params = new JSONObject();
        params.put("clientId", (Object)clientId);
        params.put("grantType", (Object)"client_credentials");
        params.put("clientKey", (Object)APPID);
        long timestamp = System.currentTimeMillis();
        try {
            Class<?> bCryptClass = Class.forName("cn.dev33.satoken.secure.BCrypt");
            Method hashpwMethod = bCryptClass.getMethod("hashpw", String.class);
            String clientSecret = (String)hashpwMethod.invoke(null, APPSecret + timestamp);
            params.put("clientSecret", (Object)clientSecret);
        }
        catch (Exception e) {
            logger.error("\u751f\u6210clientSecret\u5931\u8d25\uff01", e);
        }
        params.put("tenantId", (Object)"000000");
        params.put("reqTimestamp", (Object)timestamp);
        String reqJsonStr = params.toJSONString();
        HashMap<String, String> headPaeam = new HashMap<String, String>();
        headPaeam.put("X-ACCESS-TOKEN", token);
        SSLUtils.ignoreSsl();
        String result = HttpUtil.doPost(reqJsonStr, headPaeam, url);
        if (StringUtil.isBlank(result)) {
            logger.error(String.format("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u5931\u8d25\uff0c\u8bf7\u6c42\u5730\u5740\uff1a%s\uff0c\u8bf7\u6c42\u53c2\u6570\uff1a%s", url, reqJsonStr));
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"200".equals(jsonObj_.getString("code"))) {
            logger.error(String.format("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u5931\u8d25\uff0c\u8bf7\u6c42\u5730\u5740\uff1a%s\uff0c\u8bf7\u6c42\u53c2\u6570\uff1a%s", url, reqJsonStr));
            throw new RuntimeException(jsonObj_.getString("msg"));
        }
        return jsonObj_.getJSONObject("data").getString("access_token");
    }

    private String getToken() {
        String token = "";
        String result = "";
        try {
            String url = this.getTokenUrl();
            result = HttpUtil.doGet(null, url);
            if (StringUtil.isBlank(result)) {
                logger.error("\u83b7\u53d6\u5e7f\u897f\u4e91\u7b7etoken\u5931\u8d25");
                throw new RuntimeException("\u83b7\u53d6\u5e7f\u897f\u4e91\u7b7etoken\u5931\u8d25,\u63a5\u53e3\u8fd4\u56de\u503c\u4e3a\u7a7a");
            }
            JSONObject resultJson = JSONObject.parseObject(result);
            token = resultJson.getString("token");
        }
        catch (Exception e) {
            logger.info("\u83b7\u53d6\u5e7f\u897f\u4e91\u7b7etoken\u5931\u8d25!\u63a5\u53e3\u8fd4\u56de\u6570\u636e\uff1a" + result, e);
            throw new RuntimeException("\u83b7\u53d6\u5e7f\u897f\u4e91\u7b7etoken\u5931\u8d25!");
        }
        return token;
    }

    private String getTokenUrl() {
        String url = "";
        try {
            long timestamp = System.currentTimeMillis() / 1000L;
            ArrayList<String> array = new ArrayList<String>();
            array.add("access_key=" + accessKey);
            array.add("timestamp=" + timestamp);
            Collections.sort(array);
            String signString = String.join((CharSequence)"&", array);
            String signature = GuangXiYunMCertActions.hmacSha256(secret, signString);
            url = jhserverUrl + "/apisix/token?access_key=" + accessKey + "&timestamp=" + timestamp + "&signature=" + signature;
        }
        catch (Exception e) {
            logger.info("\u751f\u6210\u83b7\u53d6tokenurl\u5931\u8d25!", e);
            throw new RuntimeException("\u83b7\u53d6\u5e7f\u897f\u4e91\u7b7etoken\u5931\u8d25!", e);
        }
        return url;
    }

    public static String hmacSha256(String secret, String message) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secret_key);
            byte[] hash = sha256_HMAC.doFinal(message.getBytes(StandardCharsets.UTF_8));
            return Hex.toHexString(hash);
        }
        catch (Exception e) {
            throw new RuntimeException("HMAC-SHA256\u52a0\u5bc6\u5931\u8d25", e);
        }
    }
}


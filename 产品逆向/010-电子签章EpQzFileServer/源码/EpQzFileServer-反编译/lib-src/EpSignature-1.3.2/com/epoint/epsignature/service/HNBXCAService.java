/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1InputStream;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.x509.Certificate;
import com.epoint.gmhelper.bouncycastle.asn1.x509.SubjectPublicKeyInfo;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.itextpdf.text.pdf.security.CertificateInfo;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.Map;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import org.apache.log4j.Logger;

public class HNBXCAService {
    private static Logger log = Logger.getLogger(HNBXCAService.class);
    private String appid = ConfigUtil.getConfigValue("ztb", "BXAppId");
    private String appKey = ConfigUtil.getConfigValue("ztb", "BXAppKey");
    private String BXServerUrl = ConfigUtil.getConfigValue("ztb", "BXServerUrl");
    private String BXqueryEncryptInfoUrl = "";
    private String BXpushDecryptInfoUrl = "";
    private String GGappid = ConfigUtil.getConfigValue("ztb", "BXGGAppId");
    private String GGappKey = ConfigUtil.getConfigValue("ztb", "BXGGAppKey");
    static final HostnameVerifier DO_NOT_VERIFY = new HostnameVerifier(){

        @Override
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }
    };

    public void setPlatConfig(String appid, String appKey, String BXServerUrl) {
        this.appid = appid;
        this.appKey = appKey;
        this.BXServerUrl = BXServerUrl;
    }

    public String creatQR(String request) {
        JSONObject orgObj;
        JSONArray signatureobjects;
        String postDataStr;
        JSONObject obj;
        if (StringUtil.isBlank(this.BXServerUrl)) {
            log.error("\u521d\u59cb\u5316HNBXCAService\u5931\u8d25\uff0c\u8bf7\u5728ztb\u4e2d\u589e\u52a0\u521d\u59cb\u5316\u53c2\u6570\u914d\u7f6e");
        }
        String rtn = "";
        String qrCodeType = "";
        String strData = "";
        String extinfo = "";
        log.info("\u6807\u4fe1\u5f00\u59cb\u521b\u5efa\u4e8c\u7ef4\u7801\uff0c\u5f53\u524d\u53c2\u6570appid\uff1a" + this.appid + "-----appKey:" + this.appKey + "\uff0c\u5f53\u524d\u8bf7\u6c42\uff1a" + request);
        try {
            Map qrCodeTypes = JSONUtils.json2bean(request, Map.class);
            qrCodeType = (String)qrCodeTypes.get("qrcodetype");
            if (qrCodeType.equals("3")) {
                this.appid = this.GGappid;
                this.appKey = this.GGappKey;
            }
            if (StringUtil.isBlank(qrCodeType)) {
                obj = JSONObject.parseObject(request).getJSONObject("request");
                qrCodeType = obj.getString("qrcodetype");
                postDataStr = "{\"appId\":\"" + this.appid + "\",\"appKey\":\"" + this.appKey + "\", \"qrCodeType\":" + qrCodeType + "}";
                rtn = HNBXCAService.doPost(postDataStr, this.BXServerUrl + "/auth/applyQrCode", "");
                if (!StringUtil.isBlank(rtn)) {
                    // empty if block
                }
                if (request.contains("\u7b7e\u540d")) {
                    signatureobjects = obj.getJSONArray("signatureobjects");
                    for (Object signlistObj : signatureobjects) {
                        orgObj = JSONObject.parseObject(JSONUtils.bean2json(signlistObj));
                        strData = orgObj.getString("org");
                    }
                } else if (request.contains("\u89e3\u5bc6") || qrCodeType.equals("7")) {
                    signatureobjects = obj.getJSONArray("decryptobjects");
                    for (Object signlistObj : signatureobjects) {
                        orgObj = JSONObject.parseObject(JSONUtils.bean2json(signlistObj));
                        strData = orgObj.getString("encryed");
                    }
                }
            } else {
                if (request.contains("\u7b7e\u7ae0")) {
                    this.appid = this.GGappid;
                    this.appKey = this.GGappKey;
                }
                String postDataStr2 = "{\"appId\":\"" + this.appid + "\",\"appKey\":\"" + this.appKey + "\", \"qrCodeType\":" + qrCodeType + "}";
                rtn = HNBXCAService.doPost(postDataStr2, this.BXServerUrl + "/auth/applyQrCode", "");
                log.info("\u5f53\u524d\u8bf7\u6c42\u7684\u53c2\u6570\u4e3a\uff1a" + postDataStr2 + "\u8bf7\u6c42\u5730\u5740\u4e3a" + this.BXServerUrl + "/auth/applyQrCode");
                log.info("\u6807\u4fe1\u5f00\u59cb\u521b\u5efa\u4e8c\u7ef4\u7801\uff0c\u5f53\u524d\u8fd4\u56de\uff1a" + rtn);
                JSONObject obj2 = JSONObject.parseObject(request);
                if (request.contains("\u7b7e\u540d")) {
                    signatureobjects = obj2.getJSONArray("signatureobjects");
                    for (Object signlistObj : signatureobjects) {
                        orgObj = JSONObject.parseObject(JSONUtils.bean2json(signlistObj));
                        strData = orgObj.getString("org");
                    }
                } else if (request.contains("\u89e3\u5bc6") || qrCodeType.equals("7")) {
                    signatureobjects = obj2.getJSONArray("decryptobjects");
                    for (Object signlistObj : signatureobjects) {
                        orgObj = JSONObject.parseObject(JSONUtils.bean2json(signlistObj));
                        strData = orgObj.getString("encryed");
                    }
                }
            }
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            obj = JSONObject.parseObject(request);
            qrCodeType = obj.getString("qrcodetype");
            postDataStr = "{\"appId\":\"" + this.appid + "\",\"appKey\":\"" + this.appKey + "\", \"qrCodeType\":" + qrCodeType + "}";
            rtn = HNBXCAService.doPost(postDataStr, this.BXServerUrl + "/auth/applyQrCode", "");
            if (!StringUtil.isBlank(rtn)) {
                // empty if block
            }
            if (request.contains("\u7b7e\u540d")) {
                signatureobjects = obj.getJSONArray("signatureobjects");
                for (Object signlistObj : signatureobjects) {
                    orgObj = JSONObject.parseObject(JSONUtils.bean2json(signlistObj));
                    strData = orgObj.getString("org");
                }
            } else if (request.contains("\u89e3\u5bc6") || request.contains("bxdecrypt")) {
                signatureobjects = obj.getJSONArray("decryptobjects");
                for (Object signlistObj : signatureobjects) {
                    orgObj = JSONObject.parseObject(JSONUtils.bean2json(signlistObj));
                    strData = orgObj.getString("encryed");
                }
            }
            extinfo = obj.getString("ext").toString();
        }
        Map json = JSONUtils.json2bean(rtn, Map.class);
        json.put("qrCodeType", qrCodeType);
        if (!StringUtil.isBlank(strData)) {
            json.put("org", strData);
        }
        if (!StringUtil.isBlank(extinfo)) {
            Map jsonext = JSONUtils.json2bean(rtn, Map.class);
            String projectId = jsonext.get("projectID").toString();
            String projectName = jsonext.get("projectName").toString();
            String sectionName = jsonext.get("sectionName").toString();
            String requestJM = "{\"appId\":\"" + this.appid + "\",\"appKey\":\"" + this.appKey + "\", \"type\":\"5\",\"tenderType\":\"1\",\"projectId\":\"" + projectId + "\",\"projectName\":\"" + projectName + "\",\"sectionName\":\"" + sectionName + "\",\"queryEncryptInfoUrl\":\"" + this.BXqueryEncryptInfoUrl + "\",\"pushDecryptInfoUr\":\"" + this.BXpushDecryptInfoUrl + "\"}";
            String res = HNBXCAService.doPost(requestJM, this.BXServerUrl + "/trade/getQRCode", "");
            JSONObject JMRESObj = JSONObject.parseObject(res);
            String qrImg = JMRESObj.getString("qrCode");
            String JMuuid = JMRESObj.getString("uuid");
            json.put("qrImg", qrImg);
            json.put("qrCodeType", "5");
            json.put("uuid", JMuuid);
        } else {
            json.put("qrCodeType", qrCodeType);
        }
        return JSONUtils.bean2json(json);
    }

    public String queryQRresult(String req) {
        String qrstatus;
        String postQrStatus;
        String rtnQrStatus;
        String UnitName = "";
        String signcert = "";
        String encryptcert = "";
        String certsn = "";
        String certVaildate = "";
        String certDN = "";
        String devicenum = "";
        String qrcode = "";
        String qrCodeType = "";
        JSONObject objreq = JSONObject.parseObject(req);
        qrcode = objreq.getString("qrCode");
        qrCodeType = objreq.getString("qrCodeType");
        if (qrCodeType.equals("3")) {
            this.appid = this.GGappid;
            this.appKey = this.GGappKey;
        }
        if (!StringUtil.isBlank(rtnQrStatus = HNBXCAService.doPost(postQrStatus = "{\"appId\":\"" + this.appid + "\",\"appKey\":\"" + this.appKey + "\", \"qrCode\":\"" + qrcode + "\"}", this.BXServerUrl + "/auth/queryQrStatus", "")) && "3".equals(qrstatus = this.ParsingJson(rtnQrStatus, "qrCodeStatus"))) {
            String openid;
            devicenum = openid = this.ParsingJson(rtnQrStatus, "openId");
            String token = this.ParsingJson(rtnQrStatus, "token");
            String detailInfo = HNBXCAService.doPost("", this.BXServerUrl + "/auth/getUserInfoDetail", token);
            JSONObject obj = JSONObject.parseObject(detailInfo);
            UnitName = obj.getJSONObject("bsAuthUserInfoDetail").getString("companyName");
            JSONArray certs = obj.getJSONObject("bsAuthUserInfoDetail").getJSONArray("ca");
            for (Object certsObj : certs) {
                JSONObject certObj = JSONObject.parseObject(JSONUtils.bean2json(certsObj));
                if (!"1".equals(certObj.getString("status")) || !"2".equals(certObj.getString("certType"))) continue;
                if ("2".equals(certObj.getString("caType"))) {
                    signcert = certObj.getString("cert");
                }
                if (!"3".equals(certObj.getString("caType"))) continue;
                encryptcert = certObj.getString("cert");
            }
            switch (qrCodeType) {
                case "1": {
                    try {
                        X509Certificate certInfo = SM2CertUtil.getX509Certificate(Base64Util.decode(signcert));
                        certsn = SM2CertUtil.getSerialNumber(Base64Util.decode(signcert));
                        certVaildate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(certInfo.getNotAfter());
                        certDN = CertificateInfo.getIssuerFields(certInfo).getField("CN");
                        Map json = JSONUtils.json2bean(rtnQrStatus, Map.class);
                        json.put("clientSignCertSN", certsn);
                        json.put("certYouXiaoQi", certVaildate);
                        json.put("signCert", signcert);
                        json.put("CertSubjectKeyID", "");
                        json.put("encCert", encryptcert);
                        json.put("clientSignCertCN", UnitName);
                        json.put("bfjg", certDN);
                        json.put("devicenum", devicenum);
                        json.put("signatureobjects", "");
                        rtnQrStatus = JSONUtils.bean2json(json);
                    }
                    catch (Exception e1) {
                        e1.printStackTrace();
                    }
                    break;
                }
                case "3": {
                    String getuuid_Qz = "{\"qrCode\":\"" + qrcode + "\"}";
                    String res_uuid_Qz = HNBXCAService.doPost(getuuid_Qz, this.BXServerUrl + "/trade/getSignId", token);
                    String uuid_Qz = this.ParsingJson(res_uuid_Qz, "uuid");
                    String getqianzhanginfo = "{\"uuid\":\"" + uuid_Qz + "\"}";
                    String detail = HNBXCAService.doPost(getqianzhanginfo, this.BXServerUrl + "/trade/getStampInfo", token);
                    JSONObject detailobj = JSONObject.parseObject(detail);
                    String lunxunStatus = this.ParsingJson(detail, "status");
                    do {
                        detail = HNBXCAService.doPost(getqianzhanginfo, this.BXServerUrl + "/trade/getStampInfo", token);
                        lunxunStatus = this.ParsingJson(detail, "status");
                        try {
                            Thread.sleep(300L);
                        }
                        catch (Exception e) {
                            log.error(e.getMessage(), e);
                        }
                    } while (lunxunStatus.equals("0"));
                    log.info("\u6807\u4fe1\u7b7e\u7ae0\u4e8c\u7ef4\u7801\u8fd4\u56de\uff1a" + detail);
                    detailobj = JSONObject.parseObject(detail);
                    JSONArray list = detailobj.getJSONArray("list");
                    JSONArray array = JSONObject.parseObject(list.get(0).toString()).getJSONArray("stampList");
                    String allqianzhanginfo = "";
                    for (Object usersinfo : array) {
                        JSONObject userinfo = JSONObject.parseObject(JSONUtils.bean2json(usersinfo));
                        String qianzhanginfo = userinfo.getString("stampDataBase64").toString();
                        String qianzhangname = userinfo.getString("stampName").toString();
                        if (StringUtil.isBlank(allqianzhanginfo)) {
                            allqianzhanginfo = qianzhangname + "@@@" + qianzhanginfo;
                            continue;
                        }
                        allqianzhanginfo = allqianzhanginfo + "|||" + qianzhangname + "@@@" + qianzhanginfo;
                    }
                    Map json_qz = JSONUtils.json2bean(rtnQrStatus, Map.class);
                    json_qz.put("signatureImg", allqianzhanginfo);
                    rtnQrStatus = JSONUtils.bean2json(json_qz);
                    break;
                }
                case "11": {
                    String strData = objreq.getString("org");
                    Map json4 = JSONUtils.json2bean(rtnQrStatus, Map.class);
                    String getuuid = "{\"qrCode\":\"" + qrcode + "\",\"operateMask\":3}";
                    String res_uuid = HNBXCAService.doPost(getuuid, this.BXServerUrl + "/trade/getSignId", token);
                    String uuid = this.ParsingJson(res_uuid, "uuid");
                    String getsigndata = "{\"uuid\":\"" + uuid + "\",\"fileDigest\":\"" + strData + "\",\"cert\":\"" + signcert + "\"}";
                    String res_signstatus = HNBXCAService.doPost(getsigndata, this.BXServerUrl + "/trade/uploadDigestAndGetSignResult", token);
                    String signstatus = this.ParsingJson(res_signstatus, "status");
                    String channelStatus = this.ParsingJson(res_signstatus, "channelStatus");
                    do {
                        res_signstatus = HNBXCAService.doPost(getsigndata, this.BXServerUrl + "/trade/uploadDigestAndGetSignResult", token);
                        signstatus = this.ParsingJson(res_signstatus, "status");
                        channelStatus = this.ParsingJson(res_signstatus, "channelStatus");
                        try {
                            Thread.sleep(200L);
                        }
                        catch (Exception e) {
                            log.error(e.getMessage(), e);
                        }
                    } while ("0".equals(signstatus) && !"1".equals(channelStatus));
                    log.info("\u5f53\u524d\u7b7e\u540d\u8fd4\u56de\u7684\u6570\u636e\u4e3a\uff1a" + res_signstatus);
                    if ("1".equals(channelStatus) && "0".equals(signstatus) && !res_signstatus.contains("signDigest")) {
                        json4.put("signatureobjects", "");
                        rtnQrStatus = JSONUtils.bean2json(json4);
                        break;
                    }
                    if ("0".equals(channelStatus) && "0".equals(signstatus) && !res_signstatus.contains("signDigest")) {
                        json4.put("signatureobjects", "");
                        json4.put("qrCodeStatus", "2");
                        rtnQrStatus = JSONUtils.bean2json(json4);
                        break;
                    }
                    log.info("\u89e3\u6790\u6570\u636e\u3002\u3002\u3002\u3002\u3002");
                    String res_signdata = this.ParsingJson(res_signstatus, "signDigest");
                    String res_cert = this.ParsingJson(res_signstatus, "cert");
                    X509Certificate certInfo1 = null;
                    String certSN = "";
                    try {
                        certInfo1 = SM2CertUtil.getX509Certificate(Base64Util.decode(res_cert));
                        certSN = SM2CertUtil.getSerialNumber(Base64Util.decode(res_cert));
                    }
                    catch (Exception e1) {
                        log.error(e1.getMessage(), e1);
                    }
                    String certCN = CertUtils.getClientSignCertCN(certInfo1);
                    String signatureobjects = res_signdata + "_" + res_cert;
                    json4.put("signatureobjects", signatureobjects);
                    json4.put("signCert", res_cert);
                    json4.put("encCert", res_cert);
                    json4.put("clientSignCertSN", certSN);
                    json4.put("clientSignCertCN", certCN);
                    rtnQrStatus = JSONUtils.bean2json(json4);
                    String closeChannel = "{\"uuid\":\"" + uuid + "\",\"status\":1}";
                    HNBXCAService.doPost(closeChannel, this.BXServerUrl + "/trade/finishTradeChannel", token);
                    break;
                }
                case "7": {
                    try {
                        String publicKeyString;
                        String strData = objreq.getString("org");
                        String strCer = strData.split("_")[1];
                        strData = strData.split("_")[0];
                        byte[] csCert = Base64Util.decode(strCer);
                        ByteArrayInputStream inStream = new ByteArrayInputStream(csCert);
                        ASN1InputStream aIn = new ASN1InputStream(inStream);
                        Certificate cert = Certificate.getInstance(aIn.readObject());
                        SubjectPublicKeyInfo subjectPublicKeyInfo = cert.getSubjectPublicKeyInfo();
                        DERBitString publicKey = subjectPublicKeyInfo.getPublicKeyData();
                        String pubKey = publicKeyString = Base64Util.encode(HNBXCAService.dealPubKey(publicKey.getBytes()));
                        String getuuid = "{\"qrCode\":\"" + qrcode + "\",\"operateMask\":7}";
                        String res_uuid = HNBXCAService.doPost(getuuid, this.BXServerUrl + "/trade/getSignId", token);
                        String uuid = this.ParsingJson(res_uuid, "uuid");
                        String getdecryptresult = "{\"uuid\":\"" + uuid + "\",\"status\":\"1\",\"envelopeInfos\":[{\"encryptedSecret\":\"" + strData + "\",\"certPublicKey\":\"" + pubKey + "\",\"filehash\":\"\"}],\"thirdPubKey\":\"\",\"algorithm\":\"2\"}";
                        String res_decryptstatus = HNBXCAService.doPost(getdecryptresult, this.BXServerUrl + "/trade/uploadEncryptedInfo", token);
                        boolean timecount = false;
                        timecount = false;
                        String res_decrypt = "{\"uuid\":\"" + uuid + "\"}";
                        String res_decryptinfo = HNBXCAService.doPost(res_decrypt, this.BXServerUrl + "/trade/getUserDecryptSecret", token);
                        String uuidstatus = "";
                        do {
                            res_decryptinfo = HNBXCAService.doPost(res_decrypt, this.BXServerUrl + "/trade/getUserDecryptSecret", token);
                            Thread.sleep(200L);
                            uuidstatus = this.ParsingJson(res_decryptinfo, "status");
                        } while (!res_decryptinfo.contains("secret") && uuidstatus.equalsIgnoreCase("0"));
                        JSONObject obj_decryptinfo = JSONObject.parseObject(res_decryptinfo);
                        JSONArray obv = obj_decryptinfo.getJSONArray("envelopeInfos");
                        String secret = "";
                        for (Object object : obv) {
                            JSONObject certObj = JSONObject.parseObject(JSONUtils.bean2json(object));
                            secret = certObj.getString("secret");
                        }
                        byte[] bytes = Base64Util.decode(secret);
                        String resultdata = "";
                        try {
                            resultdata = new String(bytes, "utf-8");
                        }
                        catch (UnsupportedEncodingException e) {
                            log.error(e.getMessage(), e);
                        }
                        Map json7 = JSONUtils.json2bean(rtnQrStatus, Map.class);
                        json7.put("org", resultdata);
                        json7.put("signatureobjects", "");
                        rtnQrStatus = JSONUtils.bean2json(json7);
                        break;
                    }
                    catch (Exception e) {
                        log.error("\u6807\u4fe1\u89e3\u5bc6\u5931\u8d25" + e.getMessage(), e);
                    }
                }
            }
        }
        return rtnQrStatus;
    }

    private static void trustAllHosts() {
        TrustManager[] trustAllCerts = new TrustManager[]{new X509TrustManager(){

            @Override
            public X509Certificate[] getAcceptedIssuers() {
                return new X509Certificate[0];
            }

            @Override
            public void checkClientTrusted(X509Certificate[] chain, String authType) {
            }

            @Override
            public void checkServerTrusted(X509Certificate[] chain, String authType) {
            }
        }};
        try {
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, trustAllCerts, new SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String doPost(String jsonStr, String requestUrl, String httptoken) {
        StringBuffer bs = new StringBuffer();
        try {
            URL url = new URL(requestUrl);
            HNBXCAService.trustAllHosts();
            HttpURLConnection conn = null;
            HttpsURLConnection https = (HttpsURLConnection)url.openConnection();
            if (url.getProtocol().toLowerCase().equals("https")) {
                https.setHostnameVerifier(DO_NOT_VERIFY);
                conn = https;
            } else {
                conn = (HttpURLConnection)url.openConnection();
            }
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setRequestMethod("POST");
            if (StringUtil.isBlank(jsonStr)) {
                conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            } else {
                conn.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
            }
            if (!StringUtil.isBlank(httptoken)) {
                conn.setRequestProperty("token", httptoken);
            }
            conn.connect();
            OutputStream out = conn.getOutputStream();
            out.write(jsonStr.getBytes("utf-8"));
            InputStream is = conn.getInputStream();
            BufferedReader buffer = new BufferedReader(new InputStreamReader(is, "utf-8"));
            String l2 = null;
            while ((l2 = buffer.readLine()) != null) {
                bs.append(l2);
            }
            conn.disconnect();
        }
        catch (Exception e) {
            log.error("\u6807\u4fe1\u8bf7\u6c42\u5931\u8d25\uff1a" + e.getMessage(), e);
        }
        return bs.toString();
    }

    private String ParsingJson(String OrgData, String KeyWord) {
        JSONObject obj = JSONObject.parseObject(OrgData);
        return obj.getString(KeyWord);
    }

    private static byte[] dealPubKey(byte[] pubKey) {
        if (pubKey.length == 64) {
            return pubKey;
        }
        byte[] result = new byte[64];
        System.arraycopy(pubKey, 1, result, 0, 64);
        return result;
    }

    private static class Ruter {
        public static final String BXapplyQrCodeurl = "/auth/applyQrCode";
        public static final String BXqueryQrStatusurl = "/auth/queryQrStatus";
        public static final String BXgetUserInfoDetail = "/auth/getUserInfoDetail";
        public static final String BXgetEncryptCert = "/trade/getEncryptCert";
        public static final String BXgetSignId = "/trade/getSignId";
        public static final String BXuploadDigestAndGetSignResult = "/trade/uploadDigestAndGetSignResult";
        public static final String BXuploadEncryptedInfo = "/trade/uploadEncryptedInfo";
        public static final String BXgetUserDecryptSecret = "/trade/getUserDecryptSecret";
        public static final String BXfinishTradeChannel = "/trade/finishTradeChannel";
        public static final String BXgetQRCode = "/trade/getQRCode";
        public static final String BXgetStampInfo = "/trade/getStampInfo";

        private Ruter() {
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.bouncycastle.cert.X509CertificateHolder;
import com.epoint.gmhelper.bouncycastle.cms.CMSProcessable;
import com.epoint.gmhelper.bouncycastle.cms.CMSProcessableByteArray;
import com.epoint.gmhelper.bouncycastle.cms.CMSSignedData;
import com.epoint.gmhelper.bouncycastle.cms.SignerInformation;
import com.epoint.gmhelper.bouncycastle.cms.SignerInformationStore;
import com.epoint.gmhelper.bouncycastle.cms.jcajce.JcaSimpleSignerInfoVerifierBuilder;
import com.epoint.gmhelper.bouncycastle.util.Store;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.log4j.Logger;

public class EpQzHuaiHuaActions
extends BaseActions {
    private String HOST = ConfigUtil.getConfigValue("ztb", "HuaiHua_URL");
    private String appSecret = ConfigUtil.getConfigValue("ztb", "HuaiHua_appSecret");
    private String appKey = ConfigUtil.getConfigValue("ztb", "HuaiHua_appKey");
    private H5OutImpl outApi;
    private static Logger log = Logger.getLogger(EpQzHuaiHuaActions.class);
    private static final String CHAR_SET = "UTF-8";
    private static final String HAMC_SHA1 = "HmacSHA1";
    private static int TIMEOUT = -1;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("\u7cfb\u7edf\u521d\u59cb\u5316\u5f02\u5e38");
        }
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String path = "/v2/sign/fileSign";
        String url = this.HOST + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        HashMap params = new HashMap();
        params.put("signerType", reqmap.get("signerType"));
        params.put("fileSignContent", reqmap.get("signed"));
        params.put("sealContainerId", reqmap.get("sealContainerId"));
        params.put("algorithm", "RSA");
        params.put("certSn", reqmap.get("certSn"));
        if ("1".equals(reqmap.get("signerType"))) {
            params.put("companyId", reqmap.get("companyId"));
            params.put("companyUniqueId", reqmap.get("companyId"));
        } else {
            params.put("accountId", reqmap.get("accountId"));
            params.put("uniqueId", reqmap.get("uniqueId"));
        }
        String result = this.huaihua_post(JSONUtils.bean2json(params), url);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u6587\u4ef6\u7b7e\u540d\u63a5\u53e3\u5931\u8d25");
        }
        JSONObject jsonObj = JSON.parseObject(result);
        if (jsonObj.getInteger("code") != 200) {
            throw new RuntimeException(jsonObj.getString("message"));
        }
        JSONObject data = jsonObj.getJSONObject("data");
        JSONObject baseResp = new JSONObject();
        baseResp.put("signature", (Object)data.getString("signResult"));
        baseResp.put("signcert", (Object)data.getString("certNo"));
        return this.success(baseResp.toJSONString());
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String result;
        String path = "/v1/seal/queryCompanySeals";
        String url = this.HOST + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        HashMap params = new HashMap();
        if (reqmap.containsKey("companyId")) {
            params.put("companyId", reqmap.get("companyId"));
        } else if (reqmap.containsKey("uniqueId")) {
            params.put("uniqueId", reqmap.get("uniqueId"));
        } else {
            throw new RuntimeException("companyId\u548cuniqueId\u5fc5\u987b\u81f3\u5c11\u63d0\u4f9b\u4e00\u4e2a");
        }
        if (reqmap.containsKey("organizeId")) {
            params.put("organizeId", reqmap.get("organizeId"));
        }
        if (reqmap.containsKey("organizeUniqueId")) {
            params.put("organizeUniqueId", reqmap.get("organizeUniqueId"));
        }
        if (StringUtil.isBlank(result = this.huaihua_post(JSONUtils.bean2json(params), url))) {
            throw new RuntimeException("\u8c03\u7528\u83b7\u53d6\u4f01\u4e1a\u5370\u7ae0\u5217\u8868\u63a5\u53e3\u5931\u8d25");
        }
        JSONObject jsonObj = JSON.parseObject(result);
        if (jsonObj.getInteger("code") != 200) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + url);
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(params));
            log.error("\u8fd4\u56de\u53c2\u6570\uff1a" + result);
            throw new RuntimeException(jsonObj.getString("message"));
        }
        JSONArray sealList = jsonObj.getJSONArray("data");
        ArrayList seals = new ArrayList();
        sealList.forEach(obj -> {
            JSONObject sealInfo = (JSONObject)obj;
            Seal seal = new Seal();
            seal.setSealname(sealInfo.getString("sealName"));
            seal.setSealguid(sealInfo.getString("sealId"));
            seal.setSealimg(sealInfo.getString("sealImage").replace("data:image/png;base64,", ""));
            seal.setSealtype(Integer.parseInt(sealInfo.getString("sealType")));
            seals.add(seal);
        });
        return this.success(seals);
    }

    private String huaihua_post(String reqdata, String url) {
        String strRes = "";
        try {
            String Content_Type = "application/json";
            String DJ_Date = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
            String DJ_Content_MD5 = EpQzHuaiHuaActions.MD5(reqdata);
            String signature = EpQzHuaiHuaActions.getHmacSignSha1(DJ_Content_MD5 + "\n" + Content_Type + "\n" + DJ_Date, this.appSecret);
            String DJ_Authorization = "DianJu:" + this.appKey + ":" + signature;
            HashMap<String, String> heads = new HashMap<String, String>();
            heads.put("Content-Type", Content_Type);
            heads.put("DJ-Date", DJ_Date);
            heads.put("DJ-Content-MD5", DJ_Content_MD5);
            heads.put("DJ-Authorization", DJ_Authorization);
            strRes = EpQzHuaiHuaActions.doPost(reqdata, heads, url);
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            strRes = "";
        }
        return strRes;
    }

    public BaseResp verifySign(BaseReq basereq) throws Exception {
        boolean verify = false;
        QRInfo qrinfo = JSONUtils.json2bean(basereq.getRequest(), QRInfo.class);
        String org = Base64Util.decode2string(qrinfo.getSignatureobjects().get(0).getOrg());
        String signature = qrinfo.getSignatureobjects().get(0).getSigned();
        byte[] p7Data = Base64Util.decode(signature);
        byte[] originalData = Base64Util.decode(org);
        CMSProcessableByteArray cmsData = new CMSProcessableByteArray(originalData);
        CMSSignedData signedData = new CMSSignedData((CMSProcessable)cmsData, p7Data);
        Store<X509CertificateHolder> certs = signedData.getCertificates();
        SignerInformationStore signers = signedData.getSignerInfos();
        Collection<SignerInformation> signerInfos = signers.getSigners();
        for (SignerInformation signer : signerInfos) {
            Collection<X509CertificateHolder> certCollection = certs.getMatches(signer.getSID());
            X509CertificateHolder certHolder = certCollection.iterator().next();
            verify = signer.verify(new JcaSimpleSignerInfoVerifierBuilder().setProvider("EPBC").build(certHolder));
        }
        return this.success(verify);
    }

    private static String MD5(String inStr) {
        MessageDigest md5 = null;
        try {
            md5 = MessageDigest.getInstance("MD5");
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return "";
        }
        char[] charArray = inStr.toCharArray();
        byte[] byteArray = new byte[charArray.length];
        for (int i = 0; i < charArray.length; ++i) {
            byteArray[i] = (byte)charArray[i];
        }
        byte[] md5Bytes = md5.digest(byteArray);
        StringBuffer hexValue = new StringBuffer();
        for (int i = 0; i < md5Bytes.length; ++i) {
            int val = md5Bytes[i] & 0xFF;
            if (val < 16) {
                hexValue.append("0");
            }
            hexValue.append(Integer.toHexString(val));
        }
        return hexValue.toString();
    }

    public static String getHmacSignSha1(String content, String appKey) {
        return EpQzHuaiHuaActions.getHmacSign(content, appKey, HAMC_SHA1);
    }

    public static String getHmacSign(String content, String key, String hamaAlgorithm) {
        String result = null;
        try {
            SecretKeySpec signinKey = new SecretKeySpec(key.getBytes(), hamaAlgorithm);
            Mac mac = Mac.getInstance(hamaAlgorithm);
            mac.init(signinKey);
            byte[] rawHmac = mac.doFinal(content.getBytes(CHAR_SET));
            result = Hex.toHexString(rawHmac);
        }
        catch (NoSuchAlgorithmException e) {
            log.error(e.getMessage(), e);
        }
        catch (InvalidKeyException e) {
            log.error(e.getMessage(), e);
        }
        catch (UnsupportedEncodingException | IllegalStateException e) {
            log.error(e.getMessage(), e);
        }
        if (null != result) {
            return result;
        }
        return null;
    }

    public static String doPost(String jsonStr, Map<String, String> heads, String requestUrl) {
        if (jsonStr != null && !"".equals(jsonStr)) {
            StringBuffer bs = new StringBuffer();
            try {
                URL url = new URL(requestUrl);
                HttpURLConnection conn = (HttpURLConnection)url.openConnection();
                if (TIMEOUT > 0) {
                    conn.setConnectTimeout(TIMEOUT);
                    conn.setReadTimeout(TIMEOUT);
                }
                conn.setDoOutput(true);
                conn.setDoInput(true);
                conn.setRequestMethod("POST");
                if (heads != null) {
                    Set<String> set = heads.keySet();
                    for (String key : set) {
                        conn.addRequestProperty(key, heads.get(key));
                    }
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
                log.error(e.getMessage(), e);
                e.printStackTrace();
            }
            return bs.toString();
        }
        return null;
    }
}


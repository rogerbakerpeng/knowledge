/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.ImageUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PDFMergeUtil;
import com.epoint.epsignature.utils.SSLUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;

public class NHCloudSignService {
    private static Logger log = Logger.getLogger(NHCloudSignService.class);
    private String CLOUD_URL = ConfigUtil.getConfigValue("ztb", "NHCloudSignUrl");
    private String appId = ConfigUtil.getConfigValue("ztb", "NHCloudSignAppId");
    private static final String CREATEQR = "/mssgApi/AuthSignService/clientsign/v2/sign/reqVerify";
    private static final String QUERYQRRESULT = "/mssgApi/AuthSignService/clientsign/v2/sign/getVerifyStatus";
    private static final String QUERYUSERCERT = "/mssgApi/AuthSignService/clientsign/v2/cert/queryUserCert";
    private static final String GETSEALIMG = "/mssgApi/AuthSignService/clientsign/v2/cert/getFileList";
    private static final String QUERYUSERINFO = "/mssgApi/CloudSignServer/v1/user/queryUserInfo";
    private static final String tokenDepositSign = "/mssgApi/CloudSignServer/v1/sign/tokenDepositSign";
    private static final String deviceName = "App";
    private static final String clientVersion = "1.0";

    public String createQR() throws Exception {
        String createQrUrl = this.CLOUD_URL + CREATEQR;
        JSONObject request = new JSONObject();
        request.put("algo", (Object)"SM3withSM2");
        request.put("deviceName", (Object)deviceName);
        request.put("clientVersion", (Object)clientVersion);
        request.put("appId", (Object)this.appId);
        request.put("usage", (Object)"AUTOSIGN");
        SSLUtils.ignoreSsl();
        String result = HttpUtil.doPost(request.toJSONString(), createQrUrl);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        if (!"200".equals(respBody.getString("status"))) {
            log.error("\u8c03\u7528\u521b\u5efa\u4e8c\u7ef4\u7801\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + request.toJSONString());
            log.error("\u8c03\u7528\u521b\u5efa\u4e8c\u7ef4\u7801\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + result);
            throw new RuntimeException(respBody.getString("message"));
        }
        return respBody.getString("data");
    }

    public String queryQRresult(String verifyId) throws Exception {
        String queryQrResultUrl = this.CLOUD_URL + QUERYQRRESULT;
        JSONObject request = new JSONObject();
        request.put("appId", (Object)this.appId);
        request.put("verifyId", (Object)verifyId);
        SSLUtils.ignoreSsl();
        String result = HttpUtil.doPost(request.toJSONString(), queryQrResultUrl);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        if (!"200".equals(respBody.getString("status"))) {
            throw new RuntimeException(respBody.getString("message"));
        }
        return respBody.getString("data");
    }

    public Map<String, String> getSealImg(String msspId, String idNumber, String verifyId) throws Exception {
        String queryUserCertUrl = this.CLOUD_URL + QUERYUSERCERT;
        String getSealImgUrl = this.CLOUD_URL + GETSEALIMG;
        JSONObject queryCertReqBody = new JSONObject();
        if (StringUtil.isNotBlank(queryCertReqBody.getString("idNumber"))) {
            this.queryUserInfo(msspId, idNumber);
        }
        queryCertReqBody.put("appId", (Object)this.appId);
        queryCertReqBody.put("msspId", (Object)msspId);
        queryCertReqBody.put("verifyId", (Object)verifyId);
        SSLUtils.ignoreSsl();
        String queryCertResult = HttpUtil.doPost(queryCertReqBody.toJSONString(), queryUserCertUrl);
        if (StringUtil.isBlank(queryCertResult)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        log.info("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + queryCertResult);
        JSONObject queryCertRespBody = JSONObject.parseObject(queryCertResult);
        if (!"200".equals(queryCertRespBody.getString("status"))) {
            throw new RuntimeException(queryCertRespBody.getString("message"));
        }
        JSONObject queryCertData = queryCertRespBody.getJSONObject("data");
        JSONArray certList = queryCertData.getJSONArray("certList");
        String newVerifyId = queryCertData.getString("newVerifyId");
        String keyId = "";
        String certSn = "";
        for (int i = 0; i < certList.size(); ++i) {
            JSONObject item = certList.getJSONObject(i);
            if (!"ACTIVE".equals(item.getString("status"))) continue;
            keyId = item.getString("keyId");
            certSn = item.getString("signCertSn");
            break;
        }
        JSONObject getSealReqBody = new JSONObject();
        getSealReqBody.put("keyId", (Object)keyId);
        getSealReqBody.put("verifyId", (Object)newVerifyId);
        getSealReqBody.put("appId", (Object)this.appId);
        String getSealResult = HttpUtil.doPost(getSealReqBody.toJSONString(), getSealImgUrl);
        if (StringUtil.isBlank(queryCertResult)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        log.info("\u8c03\u7528\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + getSealResult);
        JSONObject getSealRespBody = JSONObject.parseObject(getSealResult);
        if (!"200".equals(getSealRespBody.getString("status"))) {
            throw new RuntimeException(getSealRespBody.getString("message"));
        }
        JSONObject getSealData = getSealRespBody.getJSONObject("data");
        JSONArray fileList = getSealData.getJSONArray("fileList");
        if (fileList == null || fileList.isEmpty()) {
            throw new RuntimeException("\u672a\u83b7\u53d6\u5230\u6b64\u7528\u6237\u7684\u5370\u7ae0\u56fe\u7247\uff01");
        }
        ArrayList seals = new ArrayList();
        for (Object obj : fileList) {
            JSONObject item = (JSONObject)obj;
            HashMap<String, String> map = new HashMap<String, String>();
            map.put("sealname", item.getString("filename"));
            map.put("sealguid", UUID.randomUUID().toString());
            map.put("sealimg", item.getString("sealImage"));
            map.put("sealtype", item.getString("sealType"));
            map.put("certSn", certSn);
            map.put("newVerifyId", getSealData.getString("newVerifyId"));
            seals.add(map);
        }
        if (seals.isEmpty()) {
            throw new RuntimeException("\u672a\u83b7\u53d6\u5230\u6b64\u7528\u6237\u7684\u5370\u7ae0\u56fe\u7247\uff01");
        }
        return (Map)seals.get(0);
    }

    public void queryUserInfo(String msspId, String idNumber) throws Exception {
        String queryUserUrl = this.CLOUD_URL + QUERYUSERINFO;
        JSONObject queryUserInfoReqBody = new JSONObject();
        queryUserInfoReqBody.put("appId", (Object)this.appId);
        queryUserInfoReqBody.put("idType", (Object)"SF");
        queryUserInfoReqBody.put("idNumber", (Object)idNumber);
        SSLUtils.ignoreSsl();
        String result = HttpUtil.doPost(queryUserInfoReqBody.toJSONString(), queryUserUrl);
        log.info("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u4fe1\u606f\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + result);
        JSONObject respBody = JSONObject.parseObject(result);
        if (!"200".equals(respBody.getString("status"))) {
            throw new RuntimeException(respBody.getString("message"));
        }
        JSONObject data = respBody.getJSONObject("data");
        if (!msspId.equals(data.getString("msspId"))) {
            throw new RuntimeException("\u8bf7\u4f7f\u7528\u5f53\u524d\u8bc4\u5ba1\u4e13\u5bb6\u7533\u8bf7\u7684\u8bc1\u4e66\u8fdb\u884c\u7b7e\u7ae0!");
        }
    }

    public List<Map<String, String>> pdfSign(List<Map<String, String>> fileInfos, String idNumber, String verifyId, String msspId) throws Exception {
        ArrayList<Map<String, String>> fileSignResult = new ArrayList<Map<String, String>>();
        ArrayList hashList = new ArrayList();
        for (int i = 0; i < fileInfos.size(); ++i) {
            Map<String, String> fileInfo = fileInfos.get(i);
            byte[] degist = null;
            degist = PDFMergeUtil.degist4PDFSign(Base64Util.decode(fileInfo.get("filebase64")), "SM3");
            HashMap<String, String> hash = new HashMap<String, String>();
            hash.put("id", i + "");
            hash.put("signData", Base64Util.encode(degist));
            hash.put("dataTag", fileInfo.get("fileid"));
            hashList.add(hash);
        }
        Map<String, String> sealmap = this.getSealImg(msspId, idNumber, verifyId);
        String token = sealmap.get("newVerifyId");
        String url = this.CLOUD_URL + tokenDepositSign;
        JSONObject reqBody = new JSONObject();
        reqBody.put("appId", (Object)this.appId);
        reqBody.put("dataType", (Object)"PLAIN");
        reqBody.put("algo", (Object)"SM3withSM2");
        reqBody.put("certSn", (Object)sealmap.get("certSn"));
        reqBody.put("dataList", (Object)JSONUtils.bean2json(hashList));
        reqBody.put("token", (Object)token);
        reqBody.put("describe", (Object)"\u519c\u884c\u4e91\u7b7e\u4e00\u952e\u7b7e\u7ae0");
        SSLUtils.ignoreSsl();
        String result = HttpUtil.doPost(reqBody.toJSONString(), url);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        if (!"200".equals(respBody.getString("status"))) {
            log.info("\u8c03\u7528\u4ee4\u724c\u6258\u7ba1\u7b7e\u5931\u8d25\uff0c\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + result);
            throw new RuntimeException(respBody.getString("message"));
        }
        JSONObject data = respBody.getJSONObject("data");
        JSONArray resultList = data.getJSONArray("resultList");
        String signcert = data.getString("cert");
        String signimg = sealmap.get("sealimg");
        try {
            signimg = ImageUtil.resizeImage(signimg, 150);
        }
        catch (Exception e) {
            log.error("\u5904\u7406\u5370\u7ae0\u56fe\u7247\u5927\u5c0f\u5931\u8d25:" + e.getMessage(), e);
        }
        for (Object resultInfo : resultList) {
            String signature = ((JSONObject)resultInfo).getString("signature");
            String id = ((JSONObject)resultInfo).getString("id");
            Map<String, String> map = fileInfos.get(Integer.valueOf(id));
            String filebase64 = map.get("filebase64");
            String keyword = map.get("keyword");
            String signInfo = EpSignatureApi.pdfSignInfo(Base64Util.decode(filebase64), signimg, signature, signcert, keyword);
            map.put("signinfo", signInfo);
            fileSignResult.add(map);
        }
        return fileSignResult;
    }
}


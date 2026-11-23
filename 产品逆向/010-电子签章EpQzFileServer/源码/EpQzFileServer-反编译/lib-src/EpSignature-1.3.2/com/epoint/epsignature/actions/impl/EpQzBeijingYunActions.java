/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SSLUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;

public class EpQzBeijingYunActions
extends BaseActions {
    private H5OutImpl outApi;
    private static Logger log = Logger.getLogger(EpQzBeijingYunActions.class);
    private String CLOUD_URL = ConfigUtil.getConfigValue("ztb", "BeijingCAUrl");
    private String appId = ConfigUtil.getConfigValue("ztb", "BeijingAppId");
    private static final String CREATEQR = "/mssgApi/AuthSignService/clientsign/v2/sign/reqVerify";
    private static final String QUERYQRRESULT = "/mssgApi/AuthSignService/clientsign/v2/sign/getVerifyStatus";
    private static final String QUERYUSERCERT = "/mssgApi/AuthSignService/clientsign/v2/cert/queryUserCert";
    private static final String GETSEALIMG = "/mssgApi/AuthSignService/clientsign/v2/cert/getFileList";
    private static final String GETSIGNDATA = "/mssgApi/AuthSignService/clientsign/v2/sign/autoSign";
    private static final String QUERYUSERINFO = "/mssgApi/CloudSignServer/v1/user/queryUserInfo";
    private static final String deviceName = "App";
    private static final String clientVersion = "1.0";

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("\u7cfb\u7edf\u521d\u59cb\u5316\u5f02\u5e38");
        }
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        String createQrUrl = this.CLOUD_URL + CREATEQR;
        JSONObject request = new JSONObject();
        request.put("algo", (Object)"SM3withSM2");
        request.put("deviceName", (Object)deviceName);
        request.put("clientVersion", (Object)clientVersion);
        request.put("appId", (Object)this.appId);
        SSLUtils.ignoreSsl();
        String result = HttpUtil.doPost(request.toJSONString(), createQrUrl);
        if (StringUtil.isBlank(result)) {
            log.error("\u8c03\u7528\u521b\u5efa\u4e8c\u7ef4\u7801\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + createQrUrl);
            log.error("\u8c03\u7528\u521b\u5efa\u4e8c\u7ef4\u7801\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + request.toJSONString());
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        log.info("\u8c03\u7528\u521b\u5efa\u4e8c\u7ef4\u7801\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + result);
        JSONObject respBody = JSONObject.parseObject(result);
        if (!"200".equals(respBody.getString("status"))) {
            log.error("\u8c03\u7528\u521b\u5efa\u4e8c\u7ef4\u7801\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + createQrUrl);
            log.error("\u8c03\u7528\u521b\u5efa\u4e8c\u7ef4\u7801\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + request.toJSONString());
            log.error("\u8c03\u7528\u521b\u5efa\u4e8c\u7ef4\u7801\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + result);
            throw new RuntimeException(respBody.getString("message"));
        }
        return this.success(respBody.getString("data"));
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        String queryQrResultUrl = this.CLOUD_URL + QUERYQRRESULT;
        String verifyId = (String)basereq.getRequest();
        JSONObject request = new JSONObject();
        request.put("appId", (Object)this.appId);
        request.put("verifyId", (Object)verifyId);
        SSLUtils.ignoreSsl();
        String result = HttpUtil.doPost(request.toJSONString(), queryQrResultUrl);
        if (StringUtil.isBlank(result)) {
            log.error("\u8c03\u7528\u8f6e\u8be2\u4e8c\u7ef4\u7801\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + queryQrResultUrl);
            log.error("\u8c03\u7528\u8f6e\u8be2\u4e8c\u7ef4\u7801\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + request.toJSONString());
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        if (!"200".equals(respBody.getString("status"))) {
            log.error("\u8c03\u7528\u8f6e\u8be2\u4e8c\u7ef4\u7801\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + queryQrResultUrl);
            log.error("\u8c03\u7528\u8f6e\u8be2\u4e8c\u7ef4\u7801\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + request.toJSONString());
            log.error("\u8c03\u7528\u8f6e\u8be2\u4e8c\u7ef4\u7801\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + result);
            throw new RuntimeException(respBody.getString("message"));
        }
        return this.success(respBody.getString("data"));
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String queryUserCertUrl = this.CLOUD_URL + QUERYUSERCERT;
        String getSealImgUrl = this.CLOUD_URL + GETSEALIMG;
        String req = JSONUtils.bean2json(basereq.getRequest());
        JSONObject queryCertReqBody = JSONObject.parseObject(req);
        if (StringUtil.isNotBlank(queryCertReqBody.getString("idNumber"))) {
            this.queryUserInfo(queryCertReqBody);
        }
        queryCertReqBody.put("appId", (Object)this.appId);
        SSLUtils.ignoreSsl();
        String queryCertResult = HttpUtil.doPost(queryCertReqBody.toJSONString(), queryUserCertUrl);
        if (StringUtil.isBlank(queryCertResult)) {
            log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + queryUserCertUrl);
            log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + queryCertReqBody.toJSONString());
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        log.info("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + queryCertResult);
        JSONObject queryCertRespBody = JSONObject.parseObject(queryCertResult);
        if (!"200".equals(queryCertRespBody.getString("status"))) {
            log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + queryUserCertUrl);
            log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + queryCertReqBody.toJSONString());
            log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + queryCertResult);
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
            log.error("\u8c03\u7528\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + getSealImgUrl);
            log.error("\u8c03\u7528\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + getSealReqBody.toJSONString());
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        log.info("\u8c03\u7528\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + getSealResult);
        JSONObject getSealRespBody = JSONObject.parseObject(getSealResult);
        if (!"200".equals(getSealRespBody.getString("status"))) {
            log.error("\u8c03\u7528\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + getSealImgUrl);
            log.error("\u8c03\u7528\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + getSealReqBody.toJSONString());
            log.error("\u8c03\u7528\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + getSealResult);
            throw new RuntimeException(getSealRespBody.getString("message"));
        }
        JSONObject getSealData = getSealRespBody.getJSONObject("data");
        JSONArray fileList = getSealData.getJSONArray("fileList");
        ArrayList seals = new ArrayList();
        fileList.forEach(obj -> {
            Seal seal = new Seal();
            JSONObject item = (JSONObject)obj;
            seal.setSealname(item.getString("filename"));
            seal.setSealguid(UUID.randomUUID().toString());
            seal.setSealimg(item.getString("sealImage"));
            seals.add(seal);
        });
        JSONObject respBody = new JSONObject();
        respBody.put("seals", (Object)seals);
        respBody.put("signCertSn", (Object)certSn);
        respBody.put("newVerifyId", (Object)getSealData.getString("newVerifyId"));
        return this.success(respBody);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String getSignDataUrl = this.CLOUD_URL + GETSIGNDATA;
        String req = JSONUtils.bean2json(basereq.getRequest());
        JSONObject request = JSONObject.parseObject(req);
        if (StringUtil.isBlank(request.get("certSn"))) {
            String queryUserCertUrl = this.CLOUD_URL + QUERYUSERCERT;
            JSONObject queryCertReqBody = JSONObject.parseObject(req);
            queryCertReqBody.put("appId", (Object)this.appId);
            SSLUtils.ignoreSsl();
            String queryCertResult = HttpUtil.doPost(queryCertReqBody.toJSONString(), queryUserCertUrl);
            if (StringUtil.isBlank(queryCertResult)) {
                log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + queryUserCertUrl);
                log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + queryCertReqBody.toJSONString());
                throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
            }
            log.info("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + queryCertResult);
            JSONObject queryCertRespBody = JSONObject.parseObject(queryCertResult);
            if (!"200".equals(queryCertRespBody.getString("status"))) {
                log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + queryUserCertUrl);
                log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + queryCertReqBody.toJSONString());
                log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u8bc1\u4e66\u5217\u8868\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + queryCertResult);
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
            request.put("keyId", (Object)keyId);
            request.put("certSn", (Object)certSn);
            request.put("verifyId", (Object)newVerifyId);
        }
        request.put("type", (Object)"PLAIN");
        request.put("algo", (Object)"SM3withSM2");
        request.put("appId", (Object)this.appId);
        SSLUtils.ignoreSsl();
        String result = HttpUtil.doPost(request.toJSONString(), getSignDataUrl);
        if (StringUtil.isBlank(result)) {
            log.error("\u8c03\u7528\u83b7\u5f97\u7b7e\u540d\u503c\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + getSignDataUrl);
            log.error("\u8c03\u7528\u83b7\u5f97\u7b7e\u540d\u503c\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + request.toJSONString());
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        log.info("\u8c03\u7528\u83b7\u5f97\u7b7e\u540d\u503c\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + result);
        JSONObject respBody = JSONObject.parseObject(result);
        if (!"200".equals(respBody.getString("status"))) {
            log.error("\u8c03\u7528\u83b7\u5f97\u7b7e\u540d\u503c\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + getSignDataUrl);
            log.error("\u8c03\u7528\u83b7\u5f97\u7b7e\u540d\u503c\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + request.toJSONString());
            log.error("\u8c03\u7528\u83b7\u5f97\u7b7e\u540d\u503c\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + result);
            throw new RuntimeException(respBody.getString("message"));
        }
        return this.success(respBody.getString("data"));
    }

    public BaseResp verify(BaseReq basereq) throws Exception {
        boolean verify = false;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        String digest = (String)reqmap.get("digest");
        String signcert = (String)reqmap.get("signcert");
        String signed = (String)reqmap.get("signature");
        verify = EpSignatureApi.verifySign(digest, signcert, signed);
        return this.success(verify);
    }

    public void queryUserInfo(JSONObject reqBody) throws Exception {
        String queryUserUrl = this.CLOUD_URL + QUERYUSERINFO;
        String msspId = reqBody.getString("msspId");
        JSONObject queryUserInfoReqBody = new JSONObject();
        queryUserInfoReqBody.put("appId", (Object)this.appId);
        queryUserInfoReqBody.put("idType", (Object)"SF");
        queryUserInfoReqBody.put("idNumber", (Object)reqBody.getString("idNumber"));
        SSLUtils.ignoreSsl();
        String result = HttpUtil.doPost(queryUserInfoReqBody.toJSONString(), queryUserUrl);
        log.info("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u4fe1\u606f\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + result);
        JSONObject respBody = JSONObject.parseObject(result);
        if (!"200".equals(respBody.getString("status"))) {
            log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u4fe1\u606f\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + queryUserUrl);
            log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u4fe1\u606f\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + queryUserInfoReqBody.toJSONString());
            log.error("\u8c03\u7528\u67e5\u8be2\u7528\u6237\u4fe1\u606f\u63a5\u53e3\u8fd4\u56de\u7ed3\u679c:" + result);
            throw new RuntimeException(respBody.getString("message"));
        }
        JSONObject data = respBody.getJSONObject("data");
        if (!msspId.equals(data.getString("msspId"))) {
            throw new RuntimeException("\u8bf7\u4f7f\u7528\u5f53\u524d\u8bc4\u5ba1\u4e13\u5bb6\u7533\u8bf7\u7684\u8bc1\u4e66\u8fdb\u884c\u7b7e\u7ae0!");
        }
    }
}


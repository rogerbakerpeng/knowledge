/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SSLUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.util.TokenUtil;
import java.util.ArrayList;
import java.util.Map;
import org.apache.log4j.Logger;

public class CommonServerSealActions
extends BaseActions {
    private static Logger log = Logger.getLogger(CommonServerSealActions.class);
    private static String platformcode = "";
    private static String CLOUD_URL = "";
    private static String appsecret = "";
    private static final String GETSEALIMG = "/seal/getseseal";
    private static final String GETSIGNDATA = "/seal/sign";
    private static final String VERIFYSIGN = "/seal/verifysign";

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        CLOUD_URL = (String)actionContext.get("qzcloudurl");
        platformcode = (String)actionContext.get("qzcloudplatformcode");
        appsecret = (String)actionContext.get("qzcloudappsecret");
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String getSealImgUrl = CLOUD_URL + GETSEALIMG;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        JSONObject reqBody = new JSONObject();
        JSONObject param = new JSONObject();
        Object ext = reqmap.get("serversignext");
        if (StringUtil.isNotBlank(reqmap.get("organization"))) {
            param.put("organization", reqmap.get("organization"));
            param.put("user_id", reqmap.get("user_id"));
            getSealImgUrl = CLOUD_URL + "/yqc" + GETSEALIMG;
        } else {
            param.put("name", reqmap.get("userName"));
            param.put("id", reqmap.get("cardNumber"));
        }
        reqBody.put("params", (Object)param);
        String token = "";
        if (StringUtil.isNotBlank(ext)) {
            Map reqextmap = JSONUtils.json2bean(ext, Map.class);
            if (reqextmap.containsKey("token")) {
                token = (String)reqextmap.get("token");
            }
            param.put("ext", (Object)reqextmap);
        }
        if (StringUtil.isBlank(ext)) {
            token = this.getToken();
        }
        reqBody.put("token", (Object)token);
        SSLUtils.ignoreSsl();
        log.error("\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u63a5\u53e3\u8bf7\u6c42\uff1a" + reqBody.toJSONString());
        String result = HttpUtil.doPost(reqBody.toJSONString(), getSealImgUrl);
        log.error("\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u63a5\u53e3\u8fd4\u56de\uff1a" + result);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        JSONObject status = respBody.getJSONObject("status");
        if (!"1".equals(status.getString("code"))) {
            log.error("\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u5931\u8d25\u8fd4\u56de\uff1a" + result);
            throw new RuntimeException(status.getString("text"));
        }
        JSONArray sealList = respBody.getJSONObject("custom").getJSONArray("seals");
        ArrayList seals = new ArrayList();
        sealList.forEach(obj -> {
            JSONObject sealInfo = (JSONObject)obj;
            JSONObject seal = new JSONObject();
            seal.put("sealname", (Object)sealInfo.getString("sealname"));
            seal.put("sealguid", (Object)sealInfo.getString("sealguid"));
            seal.put("sealimg", (Object)sealInfo.getString("sealimg"));
            seal.put("certdata", (Object)sealInfo.getString("certdata"));
            seal.put("sealtype", (Object)sealInfo.getString("sealtype"));
            seals.add(seal);
        });
        return this.success(seals);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String getSignDataUrl = CLOUD_URL + GETSIGNDATA;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        Object ext = reqmap.get("serversignext");
        JSONObject reqBody = new JSONObject();
        JSONObject param = new JSONObject();
        if (StringUtil.isNotBlank(reqmap.get("organization"))) {
            param.put("organization", reqmap.get("organization"));
            param.put("user_id", reqmap.get("user_id"));
            param.put("certdata", reqmap.get("certdata"));
            getSignDataUrl = CLOUD_URL + "/yqc" + GETSIGNDATA;
        } else {
            param.put("name", reqmap.get("userName"));
            param.put("id", reqmap.get("cardNumber"));
        }
        JSONArray signatureObjects = new JSONArray();
        JSONObject signatureobject = new JSONObject();
        signatureobject.put("org", reqmap.get("digest"));
        signatureobject.put("signed", (Object)"");
        signatureObjects.add(signatureobject);
        param.put("signatureobjects", (Object)signatureObjects);
        reqBody.put("params", (Object)param);
        String token = "";
        if (StringUtil.isNotBlank(ext)) {
            Map reqextmap = JSONUtils.json2bean(ext, Map.class);
            if (reqextmap.containsKey("token")) {
                token = (String)reqextmap.get("token");
            }
            param.put("ext", (Object)reqextmap);
        }
        if (StringUtil.isBlank(ext)) {
            token = this.getToken();
        }
        reqBody.put("token", (Object)token);
        SSLUtils.ignoreSsl();
        log.error("\u7b7e\u540d\u63a5\u53e3\u8bf7\u6c42\uff1a" + reqBody.toJSONString());
        String result = HttpUtil.doPost(reqBody.toJSONString(), getSignDataUrl);
        log.error("\u7b7e\u540d\u63a5\u53e3\u8fd4\u56de\uff1a" + result);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        JSONObject status = respBody.getJSONObject("status");
        if (!"1".equals(status.getString("code"))) {
            log.info("\u7b7e\u540d\u5931\u8d25\u8fd4\u56de\uff1a" + result);
            throw new RuntimeException(status.getString("text"));
        }
        JSONObject data = respBody.getJSONObject("custom");
        JSONObject signatureObj = data.getJSONArray("signatureobjects").getJSONObject(0);
        JSONObject certObj = data.getJSONObject("certobject");
        String signCert = certObj.getString("signcert");
        JSONObject baseResp = new JSONObject();
        baseResp.put("signature", (Object)signatureObj.getString("signed"));
        baseResp.put("signcert", (Object)signCert);
        return this.success(baseResp.toJSONString());
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

    private String getToken() {
        if (StringUtil.isNotBlank(platformcode)) {
            if (StringUtil.isNotBlank(appsecret)) {
                return TokenUtil.createToken(platformcode, appsecret, null);
            }
        }
        return "";
    }
}


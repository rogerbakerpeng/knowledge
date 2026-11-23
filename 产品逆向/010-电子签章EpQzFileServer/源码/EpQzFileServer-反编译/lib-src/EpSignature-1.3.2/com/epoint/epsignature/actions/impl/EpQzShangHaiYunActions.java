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
import com.epoint.epsignature.utils.StringUtil;
import java.util.ArrayList;
import java.util.Map;
import org.apache.log4j.Logger;

public class EpQzShangHaiYunActions
extends BaseActions {
    private H5OutImpl outApi;
    private static Logger log = Logger.getLogger(EpQzShangHaiYunActions.class);
    private String CLOUD_URL = ConfigUtil.getConfigValue("ztb", "ShangHaiCAUrl");
    private static final String GETSEALIMG = "/seal/getseseal";
    private static final String GETSIGNDATA = "/seal/sign";
    private static final String VERIFYSIGN = "/seal/verifysign";

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("\u7cfb\u7edf\u521d\u59cb\u5316\u5f02\u5e38");
        }
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String getSealImgUrl = this.CLOUD_URL + GETSEALIMG;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        JSONObject reqBody = new JSONObject();
        JSONObject param = new JSONObject();
        param.put("name", reqmap.get("userName"));
        param.put("id", reqmap.get("cardNumber"));
        reqBody.put("param", (Object)param);
        String result = HttpUtil.doPost(reqBody.toJSONString(), getSealImgUrl);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        JSONObject status = respBody.getJSONObject("status");
        if (!"1".equals(status.getString("code"))) {
            log.info("\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u5931\u8d25\u8fd4\u56de\uff1a" + result);
            throw new RuntimeException(status.getString("text"));
        }
        JSONArray sealList = respBody.getJSONArray("custom");
        ArrayList seals = new ArrayList();
        sealList.forEach(obj -> {
            JSONObject sealInfo = (JSONObject)obj;
            Seal seal = new Seal();
            seal.setSealname(sealInfo.getString("sealname"));
            seal.setSealguid(sealInfo.getString("sealguid"));
            seal.setSealimg(sealInfo.getString("sealimg"));
            seals.add(seal);
        });
        return this.success(seals);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String getSignDataUrl = this.CLOUD_URL + GETSIGNDATA;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        JSONObject reqBody = new JSONObject();
        JSONObject param = new JSONObject();
        param.put("name", reqmap.get("userName"));
        param.put("id", reqmap.get("cardNumber"));
        JSONArray signatureObjects = new JSONArray();
        JSONObject signatureobject = new JSONObject();
        signatureobject.put("org", reqmap.get("digest"));
        signatureobject.put("signed", (Object)"");
        signatureObjects.add(signatureobject);
        param.put("signatureObjects", (Object)signatureObjects);
        reqBody.put("param", (Object)param);
        String result = HttpUtil.doPost(reqBody.toJSONString(), getSignDataUrl);
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
}


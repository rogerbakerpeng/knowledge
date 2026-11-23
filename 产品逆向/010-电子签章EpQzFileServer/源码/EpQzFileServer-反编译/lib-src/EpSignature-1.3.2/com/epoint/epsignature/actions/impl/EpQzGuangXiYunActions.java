/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.guangxica.utils.SignUtils;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.SM3Util;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class EpQzGuangXiYunActions
extends BaseActions {
    private String APP_ID = "";
    private String APP_SECRET = "";
    private String HOST = "";
    private H5OutImpl outApi;
    private static Logger log = Logger.getLogger(EpQzGuangXiYunActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.APP_ID = (String)actionContext.get("appid");
        this.APP_SECRET = (String)actionContext.get("appsecret");
        this.HOST = (String)actionContext.get("host");
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("\u7cfb\u7edf\u521d\u59cb\u5316\u5f02\u5e38");
        }
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String sealsStr = this.outApi.getSealImg(basereq.getRequest().toString());
        List seals = JSONUtils.json2bean(sealsStr, List.class);
        return this.success(seals);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String path = "/portal/api/signByPerson";
        String url = this.HOST + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String signCertSn = (String)reqmap_.get("signCertSn");
        String signData = (String)reqmap_.get("signed");
        byte[] signDataByte = SM3Util.hash(Base64Util.decode(signData));
        String signDataValue = Base64Util.encode(signDataByte);
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("appId", this.APP_ID);
        params.put("signCertSn", signCertSn);
        params.put("signData", signDataValue);
        long startTime = System.currentTimeMillis();
        String result = this.httpReq(url, params);
        long endTime = System.currentTimeMillis();
        log.info("\u8c03\u7528\u7b2c\u4e09\u65b9\u63a5\u53e3\u82b1\u8d39\u65f6\u95f4\uff1a" + (endTime - startTime) + "ms");
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"0".equals(jsonObj_.getString("code"))) {
            throw new RuntimeException(jsonObj_.getString("msg"));
        }
        HashMap<String, String> map_ = new HashMap<String, String>();
        String resultData = jsonObj_.getJSONObject("data").getString("resultData");
        String cert = jsonObj_.getJSONObject("data").getString("cert");
        map_.put("signature", resultData);
        map_.put("signcert", cert);
        return this.success(JSONUtils.bean2json(map_));
    }

    public BaseResp verify(BaseReq basereq) throws Exception {
        String path = "/portal/api/verify";
        String url = this.HOST + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        boolean str = false;
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String signData = (String)reqmap_.get("org");
        byte[] signDataByte = SM3Util.hash(Base64Util.decode(signData));
        String signDataValue = Base64Util.encode(signDataByte);
        String signcert = (String)reqmap_.get("signcert");
        String verifyData = (String)reqmap_.get("signature");
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("appId", this.APP_ID);
        params.put("cert", signcert);
        params.put("signData", signDataValue);
        params.put("verifyData", verifyData);
        String result = this.httpReq(url, params);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"0".equals(jsonObj_.getString("code"))) {
            throw new RuntimeException(jsonObj_.getString("msg"));
        }
        str = true;
        return this.success(str);
    }

    private String httpReq(String url, Map<String, Object> params) throws Exception {
        String paramJson = JSON.toJSONString(params);
        log.info("paramJson:" + paramJson);
        String signResult = SignUtils.createSign(params, this.APP_SECRET);
        HashMap<String, String> heads = new HashMap<String, String>();
        heads.put("sign", signResult);
        String res = HttpUtil.doPost(paramJson, heads, url);
        log.info("res:" + res);
        log.info("signResult:" + signResult);
        return res;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.SM3Util;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class EpQzHuaCeYunActions
extends BaseActions {
    private String authCode = "";
    private String HCHOST = "";
    private H5OutImpl outApi;
    private static Logger log = Logger.getLogger(EpQzHuaCeYunActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.authCode = (String)actionContext.get("authCode");
        this.HCHOST = (String)actionContext.get("hchost");
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
        String path = "/gxyq/hc/api/cert/sign";
        String url = this.HCHOST + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String signCertSn = (String)reqmap_.get("signCertSn");
        String signData = (String)reqmap_.get("signed");
        byte[] signDataByte = SM3Util.hash(Base64Util.decode(signData));
        String signDataValue = Base64Util.encode(signDataByte);
        JSONObject params = new JSONObject();
        params.put("certSn", (Object)signCertSn);
        params.put("hashData", (Object)signDataValue);
        params.put("authCode", (Object)this.authCode);
        String reqJsonStr = params.toJSONString();
        long startTime = System.currentTimeMillis();
        String result = HttpUtil.doPost(reqJsonStr, url);
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
        String resultData = jsonObj_.getString("signData");
        String cert = jsonObj_.getString("certBase64");
        map_.put("signature", resultData);
        map_.put("signcert", cert);
        return this.success(JSONUtils.bean2json(map_));
    }

    public BaseResp verify(BaseReq basereq) throws Exception {
        String path = "/gxyq/hc/api/cert/verify";
        String url = this.HCHOST + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        boolean str = false;
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String signData = (String)reqmap_.get("org");
        byte[] signDataByte = SM3Util.hash(Base64Util.decode(signData));
        String signDataValue = Base64Util.encode(signDataByte);
        String signcert = (String)reqmap_.get("signcert");
        String verifyData = (String)reqmap_.get("signature");
        JSONObject params = new JSONObject();
        params.put("certBase64", (Object)signcert);
        params.put("hashData", (Object)signDataValue);
        params.put("signData", (Object)verifyData);
        String reqJsonStr = params.toJSONString();
        String result = HttpUtil.doPost(reqJsonStr, url);
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
}


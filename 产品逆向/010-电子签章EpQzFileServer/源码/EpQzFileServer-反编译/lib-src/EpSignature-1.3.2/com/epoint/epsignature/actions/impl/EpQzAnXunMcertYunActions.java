/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.guangxica.utils.MD5Util;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.SM3Util;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import java.net.URLEncoder;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import org.apache.log4j.Logger;

public class EpQzAnXunMcertYunActions
extends BaseActions {
    private String api_key = "";
    private String api_secret = "";
    private String AnXunUrl = "";
    private H5OutImpl outApi;
    private Random rand = new SecureRandom();
    private static Logger log = Logger.getLogger(EpQzAnXunMcertYunActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.api_key = (String)actionContext.get("api_key");
        this.api_secret = (String)actionContext.get("api_secret");
        this.AnXunUrl = (String)actionContext.get("AnXunUrl");
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("\u7cfb\u7edf\u521d\u59cb\u5316\u5f02\u5e38");
        }
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String reqJsonStr;
        String path = "/api/send/seal/photoSign";
        String result = "";
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String name = (String)reqmap_.get("name");
        String idNo = Base64Util.decode2string((String)reqmap_.get("idNo"));
        JSONObject user = new JSONObject();
        user.put("name", (Object)name);
        user.put("idNo", (Object)idNo);
        if (StringUtil.isNotBlank(reqmap_.get("pinCode")) && !"1".equals(String.valueOf(reqmap_.get("pinCode")))) {
            String pinCode = MD5Util.MD5Encode((String)reqmap_.get("pinCode"), "UTF-8");
            user.put("pinCode", (Object)pinCode);
        }
        JSONObject params = new JSONObject();
        if (reqmap_.containsKey("facePhoto")) {
            path = "/api/send/v2/seal/photoSign";
            if (StringUtil.isNotBlank(reqmap_.get("facePhoto"))) {
                user.put("facePhoto", reqmap_.get("facePhoto"));
            }
            params.put("user", (Object)user);
            reqJsonStr = params.toJSONString();
            Map<String, String> axheader = this.setAXHeader(reqJsonStr);
            result = HttpUtil.doPost(reqJsonStr, axheader, this.AnXunUrl + path);
        } else {
            params.put("api_key", (Object)this.api_key);
            params.put("api_secret", (Object)this.api_secret);
            params.put("user", (Object)user);
            reqJsonStr = params.toJSONString();
            result = HttpUtil.doPost(reqJsonStr, this.AnXunUrl + path);
        }
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"200".equals(jsonObj_.getString("code"))) {
            throw new RuntimeException(jsonObj_.getString("message"));
        }
        JSONObject sealJson = JSONUtils.json2bean(jsonObj_.getString("data"), JSONObject.class);
        String[] sealArr = sealJson.getString("seal").split("@@@");
        Seal seal = new Seal();
        seal.setSealname(sealArr[0]);
        seal.setSealimg(sealArr[1]);
        ArrayList<Seal> seals = new ArrayList<Seal>();
        seals.add(seal);
        return this.success(seals);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String reqJsonStr;
        String path = "/api/send/seal/digestSign";
        String result = "";
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String name = (String)reqmap_.get("name");
        String idNo = Base64Util.decode2string((String)reqmap_.get("idNo"));
        String signData = (String)reqmap_.get("signed");
        JSONObject user = new JSONObject();
        user.put("name", (Object)name);
        user.put("idNo", (Object)idNo);
        if (StringUtil.isNotBlank(reqmap_.get("pinCode")) && !"1".equals(String.valueOf(reqmap_.get("pinCode")))) {
            String pinCode = MD5Util.MD5Encode((String)reqmap_.get("pinCode"), "UTF-8");
            user.put("pinCode", (Object)pinCode);
        }
        JSONObject params = new JSONObject();
        if (reqmap_.containsKey("facePhoto")) {
            log.info("===================\u4f20\u4e86\u4eba\u8138\u56fe\u7247");
            path = "/api/send/v2/seal/digestSign";
            if (StringUtil.isNotBlank(reqmap_.get("facePhoto"))) {
                user.put("facePhoto", reqmap_.get("facePhoto"));
                log.info("===================\u4eba\u8138\u56fe\u7247base64\uff1a" + (String)reqmap_.get("facePhoto"));
            }
            params.put("user", (Object)user);
            params.put("digest", (Object)signData);
            reqJsonStr = params.toJSONString();
            Map<String, String> axheader = this.setAXHeader(reqJsonStr);
            result = HttpUtil.doPost(reqJsonStr, axheader, this.AnXunUrl + path);
        } else {
            params.put("api_key", (Object)this.api_key);
            params.put("api_secret", (Object)this.api_secret);
            params.put("user", (Object)user);
            params.put("digest", (Object)signData);
            reqJsonStr = params.toJSONString();
            result = HttpUtil.doPost(reqJsonStr, this.AnXunUrl + path);
        }
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"200".equals(jsonObj_.getString("code"))) {
            throw new RuntimeException(jsonObj_.getString("message"));
        }
        HashMap<String, String> map_ = new HashMap<String, String>();
        JSONObject resultJson = JSONUtils.json2bean(jsonObj_.getString("data"), JSONObject.class);
        String resultData = resultJson.getString("signData");
        String cert = resultJson.getString("cert");
        map_.put("signature", resultData);
        map_.put("signcert", cert);
        return this.success(JSONUtils.bean2json(map_));
    }

    public BaseResp verify(BaseReq basereq) throws Exception {
        String path = "/api/send/seal/verifySign";
        String url = this.AnXunUrl + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        boolean str = false;
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String signData = (String)reqmap_.get("org");
        String signcert = (String)reqmap_.get("signcert");
        String verifyData = (String)reqmap_.get("signature");
        JSONObject data = new JSONObject();
        data.put("digest", (Object)signData);
        data.put("cert", (Object)signcert);
        data.put("signData", (Object)verifyData);
        JSONObject params = new JSONObject();
        params.put("api_key", (Object)this.api_key);
        params.put("api_secret", (Object)this.api_secret);
        params.put("data", (Object)data);
        String reqJsonStr = params.toJSONString();
        String result = HttpUtil.doPost(reqJsonStr, url);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"200".equals(jsonObj_.getString("code"))) {
            throw new RuntimeException(jsonObj_.getString("message"));
        }
        str = true;
        return this.success(str);
    }

    public Map<String, String> setAXHeader(String data) throws Exception {
        String nonce = String.valueOf(this.rand.nextInt());
        String timestamp = String.valueOf(new Date().getTime());
        HashMap<String, String> axheader = new HashMap<String, String>();
        axheader.put("x-send-username", this.api_key);
        axheader.put("x-send-timestamp", timestamp);
        axheader.put("x-send-nonce", nonce);
        String mdsecret = MD5Util.MD5Encode(this.api_secret, "UTF-8");
        String token = Hex.toHexString(SM3Util.hash(mdsecret.getBytes("utf-8")));
        String orgStr = token.toUpperCase() + timestamp + nonce + data;
        String signDateStr = URLEncoder.encode(orgStr, "UTF-8");
        char[] arrayCh = signDateStr.toCharArray();
        Arrays.sort(arrayCh);
        log.info("nonce\uff1a" + nonce);
        log.info("timestamp\uff1a" + timestamp);
        log.info("\u8bf7\u6c42\u53c2\u6570\uff1a" + data);
        log.info("token\u503c\uff1a" + token.toUpperCase());
        String endStr = String.valueOf(arrayCh);
        String signature = Hex.toHexString(SM3Util.hash(endStr.getBytes()));
        axheader.put("x-send-signature", signature.toUpperCase());
        log.info("\u7b7e\u540d\u503c\uff1a" + signature.toUpperCase());
        return axheader;
    }
}


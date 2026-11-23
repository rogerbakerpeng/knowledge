/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SSLUtils;
import com.epoint.epsignature.utils.Sm4Util;
import com.epoint.epsignature.utils.StringUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;

public class ChangShaDZYYZZActions
extends BaseActions {
    private static Logger logger = Logger.getLogger(ChangShaDZYYZZActions.class);
    public static String DZYYZZUrl = ConfigUtil.getConfigValue("ztb", "CSDZYYZZUrl");
    public static String SYSCODE = ConfigUtil.getConfigValue("ztb", "SYSCODE");
    public static String AUTHCODE = ConfigUtil.getConfigValue("ztb", "AUTHCODE");

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        ArrayList list_seal = new ArrayList();
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map map_ = JSONUtils.json2bean(req, Map.class);
        HashMap<String, String> message_content = new HashMap<String, String>();
        message_content.put("username", (String)map_.get("username"));
        message_content.put("uniscid", (String)map_.get("uniscid"));
        message_content.put("businesscode", UUID.randomUUID().toString());
        message_content.put("usertype", "01");
        message_content.put("enttype", "");
        message_content.put("licencesn", (String)map_.get("licencesn"));
        String resp = this.commonPost("A01", message_content);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        String errorCode = json_.getJSONObject("message_header").getString("errorCode");
        if ("0".equals(errorCode)) {
            JSONArray sealtypesList = json_.getJSONObject("message_content").getJSONArray("sealtypes");
            String username = json_.getJSONObject("message_content").getString("username");
            for (Object sealtypes : sealtypesList) {
                String sealtype = ((JSONObject)sealtypes).getString("sealtype");
                String sealimg = ((JSONObject)sealtypes).getString("imgbase64");
                String sealguid = ((JSONObject)sealtypes).getString("token");
                String sealname = username + "_" + sealtype;
                HashMap<String, String> map = new HashMap<String, String>();
                map.put("sealname", sealname);
                map.put("sealguid", sealguid);
                map.put("sealimg", sealimg);
                map.put("sealtype", sealtype);
                list_seal.add(map);
            }
        } else {
            logger.error("\u83b7\u53d6\u7535\u5b50\u8425\u4e1a\u6267\u7167\u5370\u7ae0\u6570\u636e\u5931\u8d25\uff0c\u63a5\u53e3\u8fd4\u56de\u6570\u636e:" + resp);
            String errorInfo = json_.getJSONObject("message_header").getString("errorInfo");
            throw new RuntimeException("\u83b7\u53d6\u7535\u5b50\u8425\u4e1a\u6267\u7167\u5370\u7ae0\u6570\u636e\u5931\u8d25\uff1a" + errorInfo);
        }
        if (list_seal.isEmpty()) {
            throw new RuntimeException("\u8be5\u7528\u6237\u6ca1\u6709\u7b7e\u7ae0\u6570\u636e\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
        }
        return this.success(list_seal);
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        HashMap rtn = new HashMap();
        Map map = (Map)basereq.getRequest();
        HashMap<String, String> message_content = new HashMap<String, String>();
        message_content.put("token", (String)map.get("token"));
        message_content.put("uniscid", (String)map.get("uniscid"));
        message_content.put("businesscode", UUID.randomUUID().toString());
        message_content.put("bussinfo", "\u7535\u5b50\u8425\u4e1a\u6267\u7167\u7b7e\u7ae0");
        message_content.put("signData", (String)map.get("signData"));
        message_content.put("sealtype", (String)map.get("sealtype"));
        String resp = this.commonPost("A02", message_content);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        String errorCode = json_.getJSONObject("message_header").getString("errorCode");
        if ("0".equals(errorCode)) {
            return this.success(JSONUtils.bean2json(json_));
        }
        logger.error("\u521b\u5efa\u7535\u5b50\u8425\u4e1a\u6267\u7167\u4e8c\u7ef4\u7801\u5931\u8d25\uff0c\u63a5\u53e3\u8fd4\u56de\u6570\u636e:" + resp);
        String errorInfo = json_.getJSONObject("message_header").getString("errorInfo");
        throw new RuntimeException("\u521b\u5efa\u7535\u5b50\u8425\u4e1a\u6267\u7167\u4e8c\u7ef4\u7801\u5931\u8d25\uff1a" + errorInfo);
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        HashMap rtn = new HashMap();
        Map map = (Map)basereq.getRequest();
        HashMap<String, String> message_content = new HashMap<String, String>();
        message_content.put("token", (String)map.get("qrtoken"));
        message_content.put("uniscid", (String)map.get("uniscid"));
        String resp = this.commonPost("A03", message_content);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        String errorCode = json_.getJSONObject("message_header").getString("errorCode");
        if ("100100".equals(errorCode) || "0".equals(errorCode)) {
            return this.success(JSONUtils.bean2json(json_));
        }
        logger.error("\u83b7\u53d6\u7535\u5b50\u8425\u4e1a\u6267\u7167\u626b\u7801\u7ed3\u679c\u5931\u8d25\uff0c\u63a5\u53e3\u8fd4\u56de\u6570\u636e:" + resp);
        String errorInfo = json_.getJSONObject("message_header").getString("errorInfo");
        throw new RuntimeException("\u83b7\u53d6\u7535\u5b50\u8425\u4e1a\u6267\u7167\u626b\u7801\u7ed3\u679c\u5931\u8d25\uff1a" + errorInfo);
    }

    public String commonPost(String businesstype, Map<String, String> message_content) throws Exception {
        HashMap<String, Map<Object, Object>> req = new HashMap<String, Map<Object, Object>>();
        HashMap<String, String> message_header = new HashMap<String, String>();
        message_header.put("syscode", SYSCODE);
        message_header.put("authcode", AUTHCODE);
        message_header.put("businesstype", businesstype);
        message_header.put("sign", "test");
        message_header.put("version", "1");
        req.put("message_header", message_header);
        req.put("message_content", message_content);
        String enStr = Sm4Util.encryptEcb(AUTHCODE.substring(0, 16), JSONUtils.bean2json(req));
        HashMap<String, String> req_data = new HashMap<String, String>();
        req_data.put("syscode", SYSCODE);
        req_data.put("reqenc", enStr);
        SSLUtils.ignoreSsl();
        String resp = HttpUtil.doPost(JSONUtils.bean2json(req_data), DZYYZZUrl);
        String json = "";
        if (StringUtil.isNotBlank(resp)) {
            JSONObject json_ = JSONObject.parseObject(resp);
            json = Sm4Util.decryptEcb(AUTHCODE.substring(0, 16), json_.getString("resenc"));
        }
        return json;
    }

    public BaseResp verify(BaseReq basereq) throws Exception {
        HashMap rtn = new HashMap();
        Map map = (Map)basereq.getRequest();
        HashMap<String, String> message_content = new HashMap<String, String>();
        message_content.put("hash", (String)map.get("digest"));
        message_content.put("sealtype", (String)map.get("signcert"));
        message_content.put("p7", (String)map.get("signature"));
        String resp = this.commonPost("A04", message_content);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        String errorCode = json_.getJSONObject("message_header").getString("errorCode");
        if ("0".equals(errorCode)) {
            return this.success("true");
        }
        logger.error("\u7535\u5b50\u8425\u4e1a\u6267\u7167\u9a8c\u7b7e\u5931\u8d25\uff0c\u63a5\u53e3\u8fd4\u56de\u6570\u636e:" + resp);
        return this.success("false");
    }
}


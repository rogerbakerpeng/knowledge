/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;

public class HuaRunServerSealActions
extends BaseActions {
    private static Logger logger = Logger.getLogger(HuaRunServerSealActions.class);
    private static String App_Sub_ID = ConfigUtil.getConfigValue("ztb", "App_Sub_ID");
    private static String App_Token = ConfigUtil.getConfigValue("ztb", "App_Token");
    private static String GetImgApi_ID = ConfigUtil.getConfigValue("ztb", "GetImgApi_ID");
    private static String UserInfoApi_ID = ConfigUtil.getConfigValue("ztb", "UserInfoApi_ID");
    private static String SignApi_ID = ConfigUtil.getConfigValue("ztb", "SignApi_ID");
    private static String VerifyApi_ID = ConfigUtil.getConfigValue("ztb", "VerifyApi_ID");
    private static String Api_Version = ConfigUtil.getConfigValue("ztb", "Api_Version");
    private static String Uesr_Token = ConfigUtil.getConfigValue("ztb", "Uesr_Token");
    private static String Partner_ID = ConfigUtil.getConfigValue("ztb", "Partner_ID");
    private static String Sys_ID = ConfigUtil.getConfigValue("ztb", "Sys_ID");
    private static String ESCB_ServiceUrl = ConfigUtil.getConfigValue("ztb", "ESCB_ServiceUrl");
    private static String Content_AppKey = ConfigUtil.getConfigValue("ztb", "Content_AppKey");

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String identity_type;
        String identification_number;
        ArrayList list_seal = new ArrayList();
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map map_ = JSONUtils.json2bean(req, Map.class);
        String name = (String)map_.get("name");
        String resp = this.getImg(name, identification_number = (String)map_.get("identification_number"), identity_type = (String)map_.get("identity_type"));
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        String RETURN_CODE = json_.getJSONObject("RESPONSE").getString("RETURN_CODE");
        if ("S1A00000".equals(RETURN_CODE)) {
            String return_data_base = json_.getJSONObject("RESPONSE").getString("RETURN_DATA");
            String return_data = Base64Util.decode2string(return_data_base);
            JSONArray return_data_list = JSONArray.parseArray(return_data);
            for (Object object : return_data_list) {
                if (!"true".equals(((JSONObject)object).getString("is_default"))) continue;
                String image = ((JSONObject)object).getString("image");
                String seal_id = ((JSONObject)object).getString("seal_id");
                String sealname = ((JSONObject)object).getString("name");
                String type = ((JSONObject)object).getString("type");
                HashMap<String, String> map = new HashMap<String, String>();
                map.put("sealname", sealname);
                map.put("sealguid", seal_id);
                map.put("sealimg", image);
                map.put("sealtype", type);
                list_seal.add(map);
            }
        } else {
            logger.error("\u83b7\u53d6\u7ae0\u6570\u636e\u5931\u8d25\uff0c\u63a5\u53e3\u8fd4\u56de\u6570\u636e:" + resp);
            String RETURN_DESC = json_.getJSONObject("RESPONSE").getString("RETURN_DESC");
            throw new RuntimeException("\u83b7\u53d6\u7ae0\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + RETURN_DESC);
        }
        if (list_seal.isEmpty()) {
            throw new RuntimeException("\u8be5\u7528\u6237\u6ca1\u6709\u7b7e\u7ae0\u6570\u636e\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
        }
        return this.success(list_seal);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String resp;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String user_id_str = this.getUserInfo((String)reqmap_.get("name"), (String)reqmap_.get("identification_number"), (String)reqmap_.get("identity_type"));
        String user_id = "";
        if (StringUtil.isBlank(user_id_str)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_user = JSONObject.parseObject(user_id_str);
        String RETURN_CODE = json_user.getJSONObject("RESPONSE").getString("RETURN_CODE");
        if ("S1A00000".equals(RETURN_CODE)) {
            String return_data_base = json_user.getJSONObject("RESPONSE").getString("RETURN_DATA");
            String return_data = Base64Util.decode2string(return_data_base);
            JSONObject return_data_obj = JSONArray.parseObject(return_data);
            user_id = return_data_obj.getString("user_id");
        }
        if (StringUtil.isBlank(resp = this.getESCBSignData(user_id, (String)reqmap_.get("signed")))) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_sign = JSONObject.parseObject(resp);
        String RETURN_CODE_SIGN = json_sign.getJSONObject("RESPONSE").getString("RETURN_CODE");
        if ("S1A00000".equals(RETURN_CODE_SIGN)) {
            String return_data_base = json_sign.getJSONObject("RESPONSE").getString("RETURN_DATA");
            String return_data = Base64Util.decode2string(return_data_base);
            JSONObject return_data_obj = JSONArray.parseObject(return_data);
            HashMap<String, String> map_ = new HashMap<String, String>();
            map_.put("signature", return_data_obj.getString("signed_data"));
            map_.put("signcert", return_data_obj.getString("cert_encoded"));
            return this.success(JSONUtils.bean2json(map_));
        }
        logger.error("\u83b7\u53d6\u4e91\u8bc1\u7b7e\u540d\u6570\u636e\u5931\u8d25\uff0c\u63a5\u53e3\u8fd4\u56de\u65e5\u5fd7\uff1a" + resp);
        String RETURN_DESC = json_sign.getJSONObject("RESPONSE").getString("RETURN_DESC");
        throw new RuntimeException("\u83b7\u53d6\u4e91\u8bc1\u7b7e\u540d\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + RETURN_DESC);
    }

    public BaseResp verifySign(BaseReq basereq) throws Exception {
        boolean verify = false;
        QRInfo qrinfo = JSONUtils.json2bean(basereq.getRequest(), QRInfo.class);
        String org = Base64Util.decode2string(qrinfo.getSignatureobjects().get(0).getOrg());
        String cert = qrinfo.getCertobject().getSignaturecert();
        String signature = qrinfo.getSignatureobjects().get(0).getSigned();
        String resp = this.getESCBVerify(signature, org, cert);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        String RETURN_CODE_SIGN = json_.getJSONObject("RESPONSE").getString("RETURN_CODE");
        if ("S1A00000".equals(RETURN_CODE_SIGN)) {
            String return_data_base = json_.getJSONObject("RESPONSE").getString("RETURN_DATA");
            String return_data = Base64Util.decode2string(return_data_base);
            JSONObject return_data_obj = JSONArray.parseObject(return_data);
            return this.success(return_data_obj.getString("valid"));
        }
        logger.error("\u9a8c\u7b7e\u5931\u8d25\uff0c\u63a5\u53e3\u8fd4\u56de\u65e5\u5fd7\uff1a" + resp);
        String RETURN_DESC = json_.getJSONObject("RESPONSE").getString("RETURN_DESC");
        throw new RuntimeException("\u9a8c\u7b7e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + RETURN_DESC);
    }

    public String getImg(String name, String identification_number, String identity_type) throws Exception {
        String res = "";
        try {
            HashMap<String, Object> REQUEST_DATA = new HashMap<String, Object>();
            REQUEST_DATA.put("nonce", UUID.randomUUID().toString().substring(0, 16));
            REQUEST_DATA.put("timestamp", System.currentTimeMillis());
            REQUEST_DATA.put("name", name);
            REQUEST_DATA.put("identity_type", identity_type);
            REQUEST_DATA.put("identification_number", identification_number);
            res = this.commonPostUtil(REQUEST_DATA, GetImgApi_ID);
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return res;
    }

    public String getUserInfo(String name, String identification_number, String identity_type) throws Exception {
        String res = "";
        try {
            HashMap<String, Object> REQUEST_DATA = new HashMap<String, Object>();
            REQUEST_DATA.put("nonce", UUID.randomUUID().toString().substring(0, 16));
            REQUEST_DATA.put("timestamp", System.currentTimeMillis());
            REQUEST_DATA.put("name", name);
            REQUEST_DATA.put("identity_type", identity_type);
            REQUEST_DATA.put("identification_number", identification_number);
            res = this.commonPostUtil(REQUEST_DATA, UserInfoApi_ID);
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return res;
    }

    public String getESCBSignData(String user_id, String hash) throws Exception {
        String res = "";
        try {
            HashMap<String, Object> REQUEST_DATA = new HashMap<String, Object>();
            REQUEST_DATA.put("nonce", UUID.randomUUID().toString().substring(0, 16));
            REQUEST_DATA.put("timestamp", System.currentTimeMillis());
            REQUEST_DATA.put("user_id", user_id);
            REQUEST_DATA.put("plaintext", hash);
            REQUEST_DATA.put("data_type", "base64");
            REQUEST_DATA.put("format", "raw");
            REQUEST_DATA.put("algorithm", "SM3withSM2");
            REQUEST_DATA.put("doc_title", "test");
            REQUEST_DATA.put("doc_number", "test");
            res = this.commonPostUtil(REQUEST_DATA, SignApi_ID);
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return res;
    }

    public String getESCBVerify(String signed_data, String hash, String cert_encoded) throws Exception {
        String res = "";
        try {
            HashMap<String, Object> REQUEST_DATA = new HashMap<String, Object>();
            REQUEST_DATA.put("nonce", UUID.randomUUID().toString().substring(0, 16));
            REQUEST_DATA.put("timestamp", System.currentTimeMillis());
            REQUEST_DATA.put("plaintext", hash);
            REQUEST_DATA.put("data_type", "base64");
            REQUEST_DATA.put("signed_data", signed_data);
            REQUEST_DATA.put("format", "raw");
            REQUEST_DATA.put("algorithm", "SM3withSM2");
            REQUEST_DATA.put("cert_encoded", cert_encoded);
            res = this.commonPostUtil(REQUEST_DATA, VerifyApi_ID);
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return res;
    }

    public String commonPostUtil(Map<String, Object> REQUEST_DATA, String Api_ID) throws Exception {
        String res = "";
        if (StringUtil.isBlank(ESCB_ServiceUrl)) {
            throw new Exception("\u8bf7\u6c42\u4e91\u7b7e\u670d\u52a1\u76f8\u5173\u914d\u7f6e\u672a\u914d\u7f6e\uff0c\u8bf7\u68c0\u67e5ztb\u914d\u7f6e\u6587\u4ef6\uff01");
        }
        HashMap REQUEST = new HashMap();
        HashMap<String, String> API_ATTRS = new HashMap<String, String>();
        String Sign2 = "NO_SIGN";
        String Time_Stamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS").format(new Date());
        String User_Token = "";
        API_ATTRS.put("Api_ID", Api_ID);
        API_ATTRS.put("Api_Version", Api_Version);
        API_ATTRS.put("App_Sub_ID", App_Sub_ID);
        API_ATTRS.put("App_Token", App_Token);
        API_ATTRS.put("ENV", "uat");
        API_ATTRS.put("Partner_ID", Partner_ID);
        API_ATTRS.put("Sign", Sign2);
        API_ATTRS.put("Sys_ID", Sys_ID);
        API_ATTRS.put("Time_Stamp", Time_Stamp);
        API_ATTRS.put("User_Token", User_Token);
        API_ATTRS.put("Content-AppKey", Content_AppKey);
        HashMap<String, String> data = new HashMap<String, String>();
        data.put("data", Base64Util.encode(JSONUtils.bean2json(REQUEST_DATA)));
        REQUEST.put("API_ATTRS", API_ATTRS);
        REQUEST.put("REQUEST_DATA", data);
        HashMap REQUESTData = new HashMap();
        REQUESTData.put("REQUEST", REQUEST);
        String URL2 = ESCB_ServiceUrl;
        String ecsb = null;
        ecsb = this.getCodeEcsb(GetImgApi_ID, Api_Version, App_Sub_ID, App_Token, Partner_ID, Sign2, Sys_ID, Time_Stamp, User_Token, Content_AppKey);
        URL2 = URL2 + "?ssdp=" + ecsb;
        logger.info("ecsb\u8bf7\u6c42\u5730\u5740\uff1a" + URL2);
        HashMap<String, String> heads = new HashMap<String, String>();
        heads.put("Content-AppKey", Content_AppKey);
        try {
            res = HttpUtil.doPost(JSONUtils.bean2json(REQUESTData), heads, URL2);
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return res;
    }

    private String getCodeEcsb(String Api_ID, String Api_Version, String App_Sub_ID, String App_Token, String Partner_ID, String Sign2, String Sys_ID, String Time_Stamp, String User_Token, String Content_AppKey) {
        if (StringUtil.isBlank(Api_ID)) {
            return null;
        }
        StringBuilder ecsb = new StringBuilder();
        ecsb.append("Api_ID=");
        ecsb.append(Api_ID);
        ecsb.append("&Api_Version=");
        ecsb.append(Api_Version);
        ecsb.append("&App_Sub_ID=");
        ecsb.append(App_Sub_ID);
        ecsb.append("&App_Token=");
        ecsb.append(App_Token);
        ecsb.append("&Partner_ID=");
        ecsb.append(Partner_ID);
        ecsb.append("&Sign=");
        ecsb.append(Sign2);
        ecsb.append("&Sys_ID=");
        ecsb.append(Sys_ID);
        ecsb.append("&Time_Stamp=");
        ecsb.append(Time_Stamp);
        ecsb.append("&User_Token=");
        ecsb.append(User_Token);
        ecsb.append("&Content-AppKey=");
        ecsb.append(Content_AppKey);
        return Base64Util.encode(ecsb.toString());
    }
}


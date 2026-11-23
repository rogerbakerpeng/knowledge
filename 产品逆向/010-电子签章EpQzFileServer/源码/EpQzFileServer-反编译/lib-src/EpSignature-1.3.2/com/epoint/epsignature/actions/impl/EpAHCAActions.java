/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.guangxica.utils.MD5Util;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;

public class EpAHCAActions
extends BaseActions {
    private String AHCA_URL = ConfigUtil.getConfigValue("ztb", "AHCA_URL");
    private String SYSPID = ConfigUtil.getConfigValue("ztb", "AHCA_SYSPID");
    private String SYSKEY = ConfigUtil.getConfigValue("ztb", "AHCA_SYSKEY");
    private static Logger log = Logger.getLogger(EpAHCAActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        HashMap<String, String> map;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqObj = JSONUtils.json2bean(req, Map.class);
        HashMap<String, Object> reqmap = new HashMap<String, Object>();
        reqmap.put("user_uuid", reqObj.get("idCard"));
        reqmap.put("opt", "3");
        reqmap.put("version", "V1.0");
        reqmap.put("time", new Date().getTime());
        reqmap.put("nonce", UUID.randomUUID().toString());
        String origin = this.SYSKEY + EpAHCAActions.getWXQSignature(reqmap);
        String signature = MD5Util.MD5Encode(origin, "UTF-8").toLowerCase();
        reqmap.put("signature", signature);
        reqmap.put("app_key", this.SYSPID);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqmap), this.AHCA_URL + "/ccss/restful/api/v1/get_info?" + this.convertMapToQueryString(reqmap));
        if (StringUtil.isBlank(resp)) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.AHCA_URL + "/ccss/restful/api/v1/get_info?" + this.convertMapToQueryString(reqmap));
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            throw new RuntimeException("\u83b7\u53d6\u4e13\u5bb6\u56fe\u7247\u4fe1\u606f\u4e3a\u7a7a\uff01");
        }
        JSONObject jsonObject = JSONObject.parseObject(resp);
        if (!"0".equals(jsonObject.getString("code"))) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.AHCA_URL + "/ccss/restful/api/v1/get_info?" + this.convertMapToQueryString(reqmap));
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            log.error("\u8fd4\u56de\u53c2\u6570\uff1a" + resp);
            throw new RuntimeException("\u83b7\u53d6\u4e13\u5bb6\u56fe\u7247\u4fe1\u606f\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + jsonObject.getString("msg"));
        }
        ArrayList seals = new ArrayList();
        if (StringUtil.isNotBlank(jsonObject.getJSONObject("response").getString("sign_img"))) {
            map = new HashMap<String, String>();
            map.put("sealname", jsonObject.getJSONObject("response").getString("subject_2.5.4.3"));
            map.put("sealimg", jsonObject.getJSONObject("response").getString("sign_img"));
            map.put("signcert", jsonObject.getJSONObject("response").getString("certificate"));
            seals.add(map);
        }
        if (StringUtil.isNotBlank(jsonObject.getJSONObject("response").getString("sign_img2"))) {
            map = new HashMap();
            map.put("sealname", jsonObject.getJSONObject("response").getString("user_name"));
            map.put("sealimg", jsonObject.getJSONObject("response").getString("sign_img2"));
            map.put("signcert", jsonObject.getJSONObject("response").getString("certificate"));
            seals.add(map);
        }
        return this.success(seals);
    }

    public BaseResp checkpin(BaseReq basereq) throws Exception {
        JSONObject jsonObject = this.reqSign(basereq);
        HashMap<String, String> map_ = new HashMap<String, String>();
        String resultData = jsonObject.getJSONObject("response").getString("signature");
        String cert = jsonObject.getJSONObject("response").getString("certificate");
        map_.put("signature", resultData);
        map_.put("signcert", cert);
        map_.put("result", "1");
        return this.success(JSONUtils.bean2json(map_));
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        JSONObject jsonObject = this.reqSign(basereq);
        HashMap<String, String> map_ = new HashMap<String, String>();
        String resultData = jsonObject.getJSONObject("response").getString("signature");
        String cert = jsonObject.getJSONObject("response").getString("certificate");
        map_.put("signature", resultData);
        map_.put("signcert", cert);
        return this.success(JSONUtils.bean2json(map_));
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

    private JSONObject reqSign(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqObj = JSONUtils.json2bean(req, Map.class);
        HashMap<String, Object> reqmap = new HashMap<String, Object>();
        reqmap.put("user_uuid", reqObj.get("idCard"));
        reqmap.put("opt", "3");
        reqmap.put("data", reqObj.get("signed"));
        reqmap.put("data_type", "0");
        reqmap.put("sign_reason", "sign_reason");
        reqmap.put("password", MD5Util.MD5Encode((String)reqObj.get("password"), "UTF-8"));
        reqmap.put("version", "V1.0");
        reqmap.put("time", new Date().getTime());
        reqmap.put("nonce", UUID.randomUUID().toString());
        String origin = this.SYSKEY + EpAHCAActions.getWXQSignature(reqmap);
        String signature = MD5Util.MD5Encode(origin, "UTF-8").toLowerCase();
        reqmap.put("signature", signature);
        reqmap.put("app_key", this.SYSPID);
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqmap), this.AHCA_URL + "/ccss/restful/api/v1/handle_sign?" + this.convertMapToQueryString(reqmap));
        if (StringUtil.isBlank(resp)) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.AHCA_URL + "/ccss/restful/api/v1/handle_sign?" + this.convertMapToQueryString(reqmap));
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            throw new RuntimeException("\u83b7\u5f97\u7b7e\u540d\u503c\u4e3a\u7a7a\uff01");
        }
        JSONObject jsonObject = JSONObject.parseObject(resp);
        if (!"0".equals(jsonObject.getString("code"))) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.AHCA_URL + "/ccss/restful/api/v1/handle_sign?" + this.convertMapToQueryString(reqmap));
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            log.error("\u8fd4\u56de\u53c2\u6570\uff1a" + resp);
            throw new RuntimeException(jsonObject.getString("msg"));
        }
        return jsonObject;
    }

    private static String getWXQSignature(Map<String, Object> allMap) {
        StringBuilder wxqOrg = new StringBuilder();
        ArrayList<Map.Entry<String, Object>> list = new ArrayList<Map.Entry<String, Object>>(allMap.entrySet());
        Collections.sort(list, new Comparator<Map.Entry<String, Object>>(){

            @Override
            public int compare(Map.Entry<String, Object> entry1, Map.Entry<String, Object> entry2) {
                String s1 = entry1.getKey();
                String s2 = entry2.getKey();
                for (int i = 0; i < Math.min(s1.length(), s2.length()); ++i) {
                    if (s1.charAt(i) == s2.charAt(i)) continue;
                    return s1.charAt(i) - s2.charAt(i);
                }
                return s1.length() - s2.length();
            }
        });
        for (Map.Entry entry : list) {
            wxqOrg.append((String)entry.getKey()).append(entry.getValue());
        }
        return wxqOrg.toString();
    }

    public String convertMapToQueryString(Map<String, Object> map) {
        StringBuilder queryString = new StringBuilder();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (queryString.length() > 0) {
                queryString.append("&");
            }
            queryString.append(entry.getKey()).append("=").append(entry.getValue());
        }
        return queryString.toString();
    }
}


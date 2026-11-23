/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.impl.EncryptUtil;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;

public class EpQzLiaoningServerSignActions
extends BaseActions {
    private String SERVER_URL = ConfigUtil.getConfigValue("ztb", "LiaoningServer_URL");
    private String LiaoningServer_Token = ConfigUtil.getConfigValue("ztb", "LiaoningServer_Token");
    private static Logger log = Logger.getLogger(EpQzLiaoningServerSignActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqObj = JSONUtils.json2bean(req, Map.class);
        HashMap<String, Object> reqmap = new HashMap<String, Object>();
        reqmap.put("type", "1");
        reqmap.put("istemp", "0");
        HashMap reqJson = new HashMap();
        reqJson.put("name", reqObj.get("LiaoningServer_Name"));
        reqJson.put("face", reqObj.get("LiaoningServer_Face"));
        reqJson.put("idcard", reqObj.get("LiaoningServer_Idcard"));
        reqmap.put("reqJson", reqJson);
        reqmap.put("token", EncryptUtil.createToken(this.LiaoningServer_Token));
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqmap), this.SERVER_URL + "/zsqz/getZsqzy");
        if (StringUtil.isBlank(resp)) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.SERVER_URL + "/zsqz/getZsqzy");
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01");
        }
        JSONObject jsonObject = JSONObject.parseObject(resp);
        if (!"200".equals(jsonObject.getString("code"))) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.SERVER_URL + "/zsqz/getZsqzy");
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            log.error("\u8fd4\u56de\u53c2\u6570\uff1a" + resp);
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + jsonObject.getString("msg"));
        }
        ArrayList seals = new ArrayList();
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("sealname", reqObj.get("LiaoningServer_Name").toString());
        map.put("sealimg", jsonObject.getJSONObject("data").getString("qz"));
        map.put("signcert", jsonObject.getJSONObject("data").getString("qmzs"));
        map.put("base64Cert", jsonObject.getJSONObject("data").getString("base64Cert"));
        seals.add(map);
        return this.success(seals);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqObj = JSONUtils.json2bean(req, Map.class);
        HashMap reqmap = new HashMap();
        reqmap.put("sm2FileText", reqObj.get("sm2FileText"));
        reqmap.put("data", reqObj.get("signed"));
        reqmap.put("token", EncryptUtil.createToken(this.LiaoningServer_Token));
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqmap), this.SERVER_URL + "/zsqz/signMessageAttach");
        if (StringUtil.isBlank(resp)) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.SERVER_URL + "/zsqz/signMessageAttach");
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            throw new RuntimeException("\u7b7e\u540d\u7ed3\u679c\u4e3a\u7a7a\uff01");
        }
        JSONObject jsonObject = JSONObject.parseObject(resp);
        if (!"200".equals(jsonObject.getString("code"))) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.SERVER_URL + "/zsqz/signMessageAttach");
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            log.error("\u8fd4\u56de\u53c2\u6570\uff1a" + resp);
            throw new RuntimeException("\u7b7e\u540d\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + jsonObject.getString("msg"));
        }
        HashMap<String, String> map_ = new HashMap<String, String>();
        map_.put("signature", jsonObject.getString("data"));
        map_.put("signcert", reqObj.get("sm2FileText").toString());
        return this.success(JSONUtils.bean2json(map_));
    }

    public BaseResp verify(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqObj = JSONUtils.json2bean(req, Map.class);
        HashMap reqmap = new HashMap();
        reqmap.put("base64Data", reqObj.get("base64Data"));
        reqmap.put("token", EncryptUtil.createToken(this.LiaoningServer_Token));
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqmap), this.SERVER_URL + "/zsqz/verifyMessageAttach");
        if (StringUtil.isBlank(resp)) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.SERVER_URL + "/zsqz/verifyMessageAttach");
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            throw new RuntimeException("\u9a8c\u7b7e\u7ed3\u679c\u4e3a\u7a7a\uff01");
        }
        JSONObject jsonObject = JSONObject.parseObject(resp);
        if (!"200".equals(jsonObject.getString("code"))) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.SERVER_URL + "/zsqz/verifyMessageAttach");
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            log.error("\u8fd4\u56de\u53c2\u6570\uff1a" + resp);
            throw new RuntimeException("\u9a8c\u7b7e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + jsonObject.getString("msg"));
        }
        return this.success(jsonObject.get("data"));
    }
}


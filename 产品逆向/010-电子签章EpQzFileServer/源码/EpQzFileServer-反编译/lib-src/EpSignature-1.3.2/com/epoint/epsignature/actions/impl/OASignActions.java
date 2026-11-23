/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.util.TokenUtil;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;

public class OASignActions
extends BaseActions {
    private static Logger logger = Logger.getLogger(OASignActions.class);
    private static String platformcode = "";
    private static String posturl = "";
    private static String appsecret = "";
    public static final String GETSEALLIST = "/rest/mcert/signature/getSeSeal";

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        posturl = (String)actionContext.get("posturl");
        platformcode = StringUtil.isBlank(actionContext.get("cloudplatformcode")) ? (String)actionContext.get("platformcode") : (String)actionContext.get("cloudplatformcode");
        appsecret = StringUtil.isBlank(actionContext.get("cloudtokenSecret")) ? (String)actionContext.get("tokenSecret") : (String)actionContext.get("cloudtokenSecret");
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        ArrayList<Seal> list_seal = new ArrayList<Seal>();
        HashMap<String, Object> reqObj = new HashMap<String, Object>();
        HashMap<String, Object> head = new HashMap<String, Object>();
        head.put("platformcode", platformcode);
        head.put("timestamp", new Date().getTime());
        head.put("token", this.getToken());
        reqObj.put("head", head);
        reqObj.put("params", basereq.getRequest());
        Seal seal1 = new Seal();
        seal1.setSealguid("123131231231");
        seal1.setSealtype(1);
        seal1.setSealname("\u6d4b\u8bd5\u5370\u7ae0");
        seal1.setSealdata("1312333333333333");
        seal1.setSealimg("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");
        list_seal.add(seal1);
        String resp = "";
        if (StringUtil.isBlank(resp)) {
            return this.success(list_seal);
        }
        JSONObject json_ = JSONObject.parseObject(resp);
        int code = json_.getJSONObject("status").getIntValue("code");
        if (code == 1) {
            JSONArray array = json_.getJSONObject("custom").getJSONArray("seals");
            for (Object object : array) {
                Seal seal = new Seal();
                seal.setSealguid(((JSONObject)object).getString("sealguid"));
                seal.setSealtype(((JSONObject)object).getIntValue("sealtype"));
                seal.setSealname(((JSONObject)object).getString("sealname"));
                seal.setSealdata(((JSONObject)object).getString("sealdata"));
                seal.setSealimg(((JSONObject)object).getString("sealimg"));
                list_seal.add(seal);
            }
        } else {
            throw new RuntimeException("\u83b7\u53d6\u7b7e\u7ae0\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + json_.getString("text"));
        }
        if (list_seal.isEmpty()) {
            throw new RuntimeException("\u8be5\u7528\u6237\u6ca1\u6709\u7b7e\u7ae0\u56fe\u7247\u6570\u636e\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
        }
        return this.success(list_seal);
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


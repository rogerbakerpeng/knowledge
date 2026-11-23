/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class SHDZYYZZActions
extends BaseActions {
    private String SHDZYYZZUrl = "";
    private String SHDZYYZZKey = "";
    private H5OutImpl outApi;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.SHDZYYZZUrl = (String)actionContext.get("SHDZYYZZUrl");
        this.SHDZYYZZKey = (String)actionContext.get("SHDZYYZZKey");
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("\u7cfb\u7edf\u521d\u59cb\u5316\u5f02\u5e38");
        }
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        JSONObject params = new JSONObject();
        String authorization = this.getAuthorization();
        String path = "/frfw/etl/qrid/type";
        String url = this.SHDZYYZZUrl + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String type = (String)reqmap_.get("type");
        params.put("type", (Object)type);
        if (StringUtil.isNotBlank(reqmap_.get("uuid"))) {
            params.put("uuid", reqmap_.get("uuid"));
        }
        String reqJsonStr = params.toJSONString();
        HashMap<String, String> head = new HashMap<String, String>();
        head.put("Authorization", authorization);
        String result = HttpUtil.doPost(reqJsonStr, head, url);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"0".equals(jsonObj_.getString("code"))) {
            throw new RuntimeException(jsonObj_.getString("msg"));
        }
        return this.success(jsonObj_);
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        JSONObject params = new JSONObject();
        String authorization = this.getAuthorization();
        String path = "/frfw/etl/result";
        String url = this.SHDZYYZZUrl + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String qrid = (String)reqmap_.get("qrid");
        params.put("qrid", (Object)qrid);
        String reqJsonStr = params.toJSONString();
        HashMap<String, String> head = new HashMap<String, String>();
        head.put("Authorization", authorization);
        String result = HttpUtil.doPost(reqJsonStr, head, url);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        return this.success(jsonObj_);
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String authorization = this.getAuthorization();
        String path = "/frfw/seal/seallist";
        String url = this.SHDZYYZZUrl + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String entname = (String)reqmap_.get("entname");
        String uniscid = (String)reqmap_.get("uniscid");
        String licencesn = (String)reqmap_.get("licencesn");
        JSONObject params = new JSONObject();
        params.put("entname", (Object)entname);
        params.put("uniscid", (Object)uniscid);
        params.put("licencesn", (Object)licencesn);
        params.put("sealType", (Object)"");
        String reqJsonStr = params.toJSONString();
        HashMap<String, String> head = new HashMap<String, String>();
        head.put("Authorization", authorization);
        String result = HttpUtil.doPost(reqJsonStr, head, url);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"0".equals(jsonObj_.getString("code"))) {
            throw new RuntimeException(jsonObj_.getString("msg"));
        }
        ArrayList<Seal> seals = new ArrayList<Seal>();
        JSONArray sealdatas = JSONUtils.json2bean(jsonObj_.getString("data"), JSONArray.class);
        if (sealdatas == null) {
            throw new RuntimeException("\u7535\u5b50\u8425\u4e1a\u6267\u7167\u4e2d\u65e0\u5370\u7ae0\u56fe\u7247\uff01");
        }
        for (int i = 0; i < sealdatas.size(); ++i) {
            JSONObject sealdata = sealdatas.getJSONObject(i);
            Seal seal = new Seal();
            seal.setSealname(sealdata.getString("sealName"));
            seal.setSealimg(sealdata.getString("sealPic"));
            seals.add(seal);
        }
        return this.success(seals);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String path = "/frfw/etl/scansign";
        String url = this.SHDZYYZZUrl + path;
        String authorization = this.getAuthorization();
        JSONObject reqObj = JSONUtils.json2bean(basereq.getRequest(), JSONObject.class);
        String req = JSONUtils.bean2json(reqObj);
        HashMap<String, String> head = new HashMap<String, String>();
        head.put("Authorization", authorization);
        String result = HttpUtil.doPost(req, head, url);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"0".equals(jsonObj_.getString("code"))) {
            throw new RuntimeException(jsonObj_.getString("msg"));
        }
        return this.success(jsonObj_.getJSONArray("data"));
    }

    public String getAuthorization() {
        String tokenKeyUrl = this.SHDZYYZZUrl + "/token?key=" + this.SHDZYYZZKey;
        return HttpUtil.doGet(null, tokenKeyUrl);
    }
}


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
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.util.ArrayList;
import java.util.Map;
import org.apache.log4j.Logger;

public class EpQzAnXunYunActions
extends BaseActions {
    private String api_key = "";
    private String api_secret = "";
    private String AnXunUrl = "";
    private H5OutImpl outApi;
    private static Logger log = Logger.getLogger(EpQzAnXunYunActions.class);

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
        String path = "/seal/photoSign";
        String url = this.AnXunUrl + path;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String name = (String)reqmap_.get("name");
        String idNo = (String)reqmap_.get("idNo");
        JSONObject user = new JSONObject();
        user.put("name", (Object)name);
        user.put("idNo", (Object)idNo);
        JSONObject params = new JSONObject();
        params.put("api_key", (Object)this.api_key);
        params.put("api_secret", (Object)this.api_secret);
        params.put("user", (Object)user);
        String reqJsonStr = params.toJSONString();
        String result = HttpUtil.doPost(reqJsonStr, url);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"0".equals(jsonObj_.getString("ret_code"))) {
            throw new RuntimeException(jsonObj_.getString("ret_msg"));
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
}


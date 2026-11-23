/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.dzyyzz.service.SHCADZYYZZService;
import com.epoint.epsignature.utils.JSONUtils;
import java.util.Map;

public class SHCADZYYZZActions
extends BaseActions {
    private SHCADZYYZZService dzyyzzservice;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.dzyyzzservice = new SHCADZYYZZService();
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        return this.success(this.dzyyzzservice.creatQR(basereq.getRequest()));
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        return this.success(this.dzyyzzservice.queryQRresult(basereq.getRequest()));
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        return this.success(this.dzyyzzservice.getSignData(basereq.getRequest()));
    }

    public BaseResp getSignCert(BaseReq basereq) throws Exception {
        return this.success(this.dzyyzzservice.getSignCert(basereq.getRequest()));
    }

    public BaseResp verifySign(BaseReq basereq) throws Exception {
        JSONObject jsonobject = JSONObject.parseObject(JSONUtils.bean2json(basereq.getRequest()));
        String entity = jsonobject.getString("entity");
        String clear = jsonobject.getString("clear");
        String signData = jsonobject.getString("signData");
        return this.success(this.dzyyzzservice.verifySign(entity, clear, signData));
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.dzyyzz.service.DZYYZZService;
import java.util.Map;

public class DZYYZZActions
extends BaseActions {
    private DZYYZZService dzyyzzservice;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.dzyyzzservice = (DZYYZZService)actionContext.get("DZYYZZService");
        if (this.dzyyzzservice == null) {
            this.dzyyzzservice = new DZYYZZService();
        }
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        return this.success(this.dzyyzzservice.creatQR(basereq.getRequest()));
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        return this.success(this.dzyyzzservice.queryQRresult((String)basereq.getRequest()));
    }
}


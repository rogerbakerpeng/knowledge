/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.dzyyzz.service.EpSZMcertService;
import java.util.Map;

public class EpSZMcertActions
extends BaseActions {
    private EpSZMcertService szservice;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.szservice = new EpSZMcertService();
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        return this.success(this.szservice.creatQR(basereq.getRequest()));
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        return this.success(this.szservice.queryQRresult(basereq.getRequest()));
    }

    public BaseResp verifySigned(BaseReq basereq) throws Exception {
        return this.success(this.szservice.verifySigned(basereq.getRequest()));
    }
}


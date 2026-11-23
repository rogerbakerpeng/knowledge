/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.dzyyzz.service.EpShiHuaMcertService;
import java.util.Map;

public class EpShiHuaMcertActions
extends BaseActions {
    private EpShiHuaMcertService shservice;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.shservice = new EpShiHuaMcertService();
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        return this.success(this.shservice.creatQR(basereq.getRequest()));
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        return this.success(this.shservice.queryQRresult(basereq.getRequest()));
    }

    public BaseResp verifySigned(BaseReq basereq) throws Exception {
        return this.success(this.shservice.verifySigned(basereq.getRequest()));
    }
}


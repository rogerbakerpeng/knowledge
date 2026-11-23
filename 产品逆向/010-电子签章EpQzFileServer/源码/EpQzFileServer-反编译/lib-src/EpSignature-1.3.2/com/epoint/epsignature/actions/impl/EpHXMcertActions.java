/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.dzyyzz.service.EpHXMcertService;
import java.util.Map;

public class EpHXMcertActions
extends BaseActions {
    private EpHXMcertService hxservice;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.hxservice = new EpHXMcertService();
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        return this.success(this.hxservice.creatQR(basereq.getRequest()));
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        return this.success(this.hxservice.queryQRresult(basereq.getRequest()));
    }

    public BaseResp setUserInfo(BaseReq basereq) throws Exception {
        return this.success(this.hxservice.setUserInfo(basereq.getRequest()));
    }

    public BaseResp setCertType(BaseReq basereq) throws Exception {
        return this.success(this.hxservice.setCertType(basereq.getRequest()));
    }

    public BaseResp initLocalSvr(BaseReq basereq) throws Exception {
        return this.success(this.hxservice.initLocalSvr(basereq.getRequest()));
    }

    public BaseResp encryptData(BaseReq basereq) throws Exception {
        return this.success(this.hxservice.encryptData(basereq.getRequest()));
    }

    public BaseResp verifySigned(BaseReq basereq) throws Exception {
        return this.success(this.hxservice.verifySigned(basereq.getRequest()));
    }
}


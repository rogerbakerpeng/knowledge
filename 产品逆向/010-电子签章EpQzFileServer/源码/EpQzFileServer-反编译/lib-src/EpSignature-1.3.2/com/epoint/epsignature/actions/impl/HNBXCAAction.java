/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.service.HNBXCAService;
import com.epoint.epsignature.utils.JSONUtils;
import java.util.Map;

public class HNBXCAAction
extends BaseActions {
    private String appid = "";
    private String appKey = "";
    private String posturl = "";
    private HNBXCAService hnbxcaservice;

    @Override
    public void init(Map<String, Object> actionContext) {
        this.hnbxcaservice = new HNBXCAService();
        if (this.hnbxcaservice == null) {
            throw new RuntimeException("HNBXCAService \u521d\u59cb\u5316\u5931\u8d25\uff0c\u672a\u627e\u5230\u5b9e\u73b0\u7684HNBXCAService");
        }
    }

    public BaseResp createQR(BaseReq basereq) {
        return this.success(this.hnbxcaservice.creatQR(JSONUtils.bean2json(basereq.getRequest())));
    }

    public BaseResp queryQRresult(BaseReq basereq) {
        return this.success(this.hnbxcaservice.queryQRresult(JSONUtils.bean2json(basereq.getRequest())));
    }

    public BaseResp verifySign(BaseReq basereq) {
        return this.success("true");
    }

    public BaseResp queryCert(BaseReq basereq) {
        return null;
    }

    public BaseResp getSealImg(BaseReq basereq) {
        return null;
    }

    public BaseResp parseCert(BaseReq basereq) {
        return null;
    }
}


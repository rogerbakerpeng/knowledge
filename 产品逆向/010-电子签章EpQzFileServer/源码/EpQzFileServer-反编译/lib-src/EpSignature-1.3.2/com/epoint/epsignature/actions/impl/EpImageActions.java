/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.JSONUtils;
import java.util.List;
import java.util.Map;

public class EpImageActions
extends BaseActions {
    private H5OutImpl outApi;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("\u7cfb\u7edf\u521d\u59cb\u5316\u5f02\u5e38");
        }
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String sealsStr = this.outApi.getSealImg(basereq.getRequest().toString());
        List seals = JSONUtils.json2bean(sealsStr, List.class);
        return this.success(seals);
    }
}


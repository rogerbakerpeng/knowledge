/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.dzyyzz.service.SZMCertService;
import com.epoint.epsignature.utils.JSONUtils;
import java.util.Map;

public class SZMCertActions
extends BaseActions {
    private SZMCertService szService;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.szService = new SZMCertService();
    }

    public BaseResp GMYYZZDecrypt(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        JSONObject request = JSONObject.parseObject(req);
        if ("1".equals(request.getString("deptType"))) {
            return this.success(this.szService.DecryptByGMZBR(request));
        }
        return this.success(this.szService.DecryptByGMTBR(request));
    }
}


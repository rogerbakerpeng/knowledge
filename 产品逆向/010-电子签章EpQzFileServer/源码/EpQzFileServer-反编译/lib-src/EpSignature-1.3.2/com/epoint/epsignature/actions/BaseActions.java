/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions;

import com.epoint.epsignature.bean.BaseResp;
import java.util.Map;

public abstract class BaseActions {
    public BaseActions() {
        BaseActions a;
    }

    protected BaseResp error(String a) {
        return BaseResp.returnError(9999, a);
    }

    public abstract void init(Map<String, Object> var1) throws Exception;

    protected BaseResp success(Object a) {
        return BaseResp.returnSuccess(a);
    }
}


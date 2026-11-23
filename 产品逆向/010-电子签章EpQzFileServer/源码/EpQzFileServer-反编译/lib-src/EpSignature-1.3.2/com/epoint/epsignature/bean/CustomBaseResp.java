/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean;

import com.alibaba.fastjson.JSONArray;
import com.epoint.epsignature.bean.BaseResp;

public class CustomBaseResp
extends BaseResp {
    private JSONArray ext;

    public void setExt(JSONArray a) {
        a.ext = a;
    }

    public JSONArray getExt() {
        CustomBaseResp a;
        return a.ext;
    }

    public CustomBaseResp() {
        CustomBaseResp a;
    }
}


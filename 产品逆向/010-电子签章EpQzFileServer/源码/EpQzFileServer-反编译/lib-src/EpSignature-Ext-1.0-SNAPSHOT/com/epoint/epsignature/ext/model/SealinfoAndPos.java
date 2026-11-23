/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.model;

import com.epoint.epsignature.bean.sign.SignatureInfo;
import java.util.Map;

public class SealinfoAndPos {
    private /* synthetic */ SignatureInfo.Postion b;
    private /* synthetic */ Map<String, String> g;

    public void setSealpos(SignatureInfo.Postion a) {
        a.b = a;
    }

    public Map<String, String> getSealinfo() {
        SealinfoAndPos a;
        return a.g;
    }

    public void setSealinfo(Map<String, String> a) {
        a.g = a;
    }

    public SignatureInfo.Postion getSealpos() {
        SealinfoAndPos a;
        return a.b;
    }

    public SealinfoAndPos() {
        SealinfoAndPos a;
    }
}


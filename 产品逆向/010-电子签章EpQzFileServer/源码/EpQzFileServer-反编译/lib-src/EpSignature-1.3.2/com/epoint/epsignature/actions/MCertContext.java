/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions;

public class MCertContext {
    private /* synthetic */ String a;
    private /* synthetic */ String G;
    private /* synthetic */ String b;

    public MCertContext(String a, String a2, String a3) {
        MCertContext a4;
        MCertContext mCertContext = a4;
        a4.b = a;
        mCertContext.G = a2;
        mCertContext.a = a3;
    }

    public void setAppkey(String a) {
        a.G = a;
    }

    public String getAppkey() {
        MCertContext a;
        return a.G;
    }

    public String getMcertUrl() {
        MCertContext a;
        return a.b;
    }

    public void setMcertUrl(String a) {
        a.b = a;
    }

    public void setAppsecurity(String a) {
        a.a = a;
    }

    public String getAppsecurity() {
        MCertContext a;
        return a.a;
    }
}


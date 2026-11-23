/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean;

import com.epoint.epsignature.bean.MultiSignInfo;
import java.util.List;

public class SignInfo {
    private List<MultiSignInfo> multisigninfo;
    private String signlist;
    private String qrcodeid;

    public SignInfo() {
        SignInfo a;
    }

    public void setSignlist(String a) {
        a.signlist = a;
    }

    public String getQrcodeid() {
        SignInfo a;
        return a.qrcodeid;
    }

    public String getSignlist() {
        SignInfo a;
        return a.signlist;
    }

    public void setQrcodeid(String a) {
        a.qrcodeid = a;
    }

    public void setMultisigninfo(List<MultiSignInfo> a) {
        a.multisigninfo = a;
    }

    public List<MultiSignInfo> getMultisigninfo() {
        SignInfo a;
        return a.multisigninfo;
    }
}


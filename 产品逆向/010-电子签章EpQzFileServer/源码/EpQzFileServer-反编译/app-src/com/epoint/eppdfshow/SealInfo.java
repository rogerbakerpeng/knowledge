/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.eppdfshow;

import com.epoint.epsignature.bean.sign.SignatureInfo;
import java.util.List;

class SealInfo {
    private List<SignatureInfo> verify;

    SealInfo() {
    }

    public List<SignatureInfo> getVerify() {
        return this.verify;
    }

    public void setVerify(List<SignatureInfo> verify) {
        this.verify = verify;
    }
}


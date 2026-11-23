/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.mcertresp;

import com.epoint.epsignature.bean.cert.CertObject;

@Deprecated
public class BaseResp {
    private BaseRespQRInfo custom;
    private Status status;

    public Status getStatus() {
        BaseResp a;
        return a.status;
    }

    public void setStatus(Status a) {
        a.status = a;
    }

    public BaseRespQRInfo getCustom() {
        BaseResp a;
        return a.custom;
    }

    public BaseResp() {
        BaseResp a;
    }

    public void setCustom(BaseRespQRInfo a) {
        a.custom = a;
    }

    public static class BaseRespQRInfo {
        private CertObject obj;

        public BaseRespQRInfo() {
            BaseRespQRInfo a;
        }

        public CertObject getCertobject() {
            BaseRespQRInfo a;
            return a.obj;
        }
    }

    static class Status {
        private String text;
        private int code;

        Status() {
            Status a;
        }
    }
}


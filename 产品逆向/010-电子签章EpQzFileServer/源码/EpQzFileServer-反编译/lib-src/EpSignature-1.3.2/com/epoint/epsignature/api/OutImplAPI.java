/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.api;

import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.actions.ICreateToken;
import com.epoint.epsignature.bean.Pdf;
import com.epoint.epsignature.bean.SignReq;
import com.epoint.epsignature.service.SignService;
import java.io.OutputStream;
import java.util.List;

public abstract class OutImplAPI
implements H5OutImpl,
ICreateToken {
    @Override
    public String createToken() {
        return null;
    }

    @Deprecated
    public void setService(Object var1) {
    }

    @Override
    @Deprecated
    public String getSealImg(String var1) {
        return null;
    }

    @Deprecated
    public String getSignCert(String var1) {
        return null;
    }

    @Deprecated
    public String dealDegist(SignReq var1, List<SignService.DegistNode> var2) {
        return null;
    }

    @Deprecated
    public SignResult getSignedVal(List<Object> var1, String var2) {
        return null;
    }

    @Override
    public String getPDFPath(Pdf pdf) {
        return null;
    }

    @Override
    public boolean dealPDFOs(Pdf pdf, OutputStream file) {
        return false;
    }

    @Override
    public boolean dealPDFPath(Pdf pdf, String pdfPath) {
        return false;
    }

    @Override
    public String getSignedPDFPath(Pdf pdf) {
        return null;
    }

    @Override
    public String getMsgInfo(Pdf pdf) {
        return null;
    }

    @Override
    public void deleteSignInfo(Pdf pdf, String signinfo) {
    }

    @Deprecated
    public static class SignResult {
        private int status;
        private Object value;

        public int getStatus() {
            return this.status;
        }

        public void setStatus(int status_) {
            this.status = status_;
        }

        public Object getValue() {
            return this.value;
        }

        public void setValue(Object value) {
            this.value = value;
        }

        public SignResult(int status_, Object value) {
            this.status = status_;
            this.value = value;
        }

        public SignResult() {
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean;

import com.epoint.epsignature.bean.Pdf;
import com.epoint.epsignature.bean.SignInfo;
import java.util.List;

@Deprecated
public class SignReq {
    private String userid;
    private String pdftype;
    private String catype;
    private Pdf[] batchpdf;
    private String signcert;
    private boolean isDelete;
    private Pdf pdf;

    public void setPdftype(String a) {
        a.pdftype = a;
    }

    public void setSigncert(String a) {
        a.signcert = a;
    }

    public void setBatchpdf(Pdf[] a) {
        a.batchpdf = a;
    }

    public void setPdf(Pdf a) {
        a.pdf = a;
    }

    public String getCatype() {
        SignReq a;
        return a.catype;
    }

    public boolean isDelete() {
        SignReq a;
        return a.isDelete;
    }

    public SignReq() {
        SignReq a;
    }

    public Pdf getPdf() {
        SignReq a;
        return a.pdf;
    }

    public String getPdftype() {
        SignReq a;
        return a.pdftype;
    }

    public void setDelete(boolean a) {
        a.isDelete = a;
    }

    public Pdf[] getBatchpdf() {
        SignReq a;
        return a.batchpdf;
    }

    public String getUserid() {
        SignReq a;
        return a.userid;
    }

    public void setCatype(String a) {
        a.catype = a;
    }

    public void setUserid(String a) {
        a.userid = a;
    }

    public String getSigncert() {
        SignReq a;
        return a.signcert;
    }

    public class PreaseResult {
        private List<SignInfo> signList;

        public List<SignInfo> getSignList() {
            PreaseResult a;
            return a.signList;
        }

        public PreaseResult() {
            PreaseResult a2;
        }

        public void setSignList(List<SignInfo> a) {
            a.signList = a;
        }
    }
}


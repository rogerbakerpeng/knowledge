/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfsignatureinfo.bean;

public class PdfSignatureInfo {
    private Ext ext;
    private String page;
    private Cert cert;
    private String signdate;
    private String signid;

    public void setSignid(String a) {
        a.signid = a;
    }

    public Ext getExt() {
        PdfSignatureInfo a;
        return a.ext;
    }

    public String getSigndate() {
        PdfSignatureInfo a;
        return a.signdate;
    }

    public String getPage() {
        PdfSignatureInfo a;
        return a.page;
    }

    public String getSignid() {
        PdfSignatureInfo a;
        return a.signid;
    }

    public void setSigndate(String a) {
        a.signdate = a;
    }

    public Cert getCert() {
        PdfSignatureInfo a;
        return a.cert;
    }

    public void setPage(String a) {
        a.page = a;
    }

    public void setExt(Ext a) {
        a.ext = a;
    }

    public PdfSignatureInfo() {
        PdfSignatureInfo a;
    }

    public PdfSignatureInfo(String a, String a2, String a3, Cert a4, Ext a5) {
        PdfSignatureInfo a6;
        PdfSignatureInfo pdfSignatureInfo = a6;
        PdfSignatureInfo pdfSignatureInfo2 = a6;
        a6.signid = a;
        pdfSignatureInfo2.signdate = a2;
        pdfSignatureInfo2.page = a3;
        pdfSignatureInfo.cert = a4;
        pdfSignatureInfo.ext = a5;
    }

    public void setCert(Cert a) {
        a.cert = a;
    }

    public static class Ext {
        private String certOrgID;
        private String signtype;
        private boolean ish5sign;
        private String signname;

        public void setSigntype(String a) {
            a.signtype = a;
        }

        public String getCertOrgID() {
            Ext a;
            return a.certOrgID;
        }

        public void setSignname(String a) {
            a.signname = a;
        }

        public Ext(String a, String a2, boolean a3) {
            Ext a4;
            Ext ext = a4;
            a4.signtype = a;
            ext.signname = a2;
            ext.ish5sign = a3;
        }

        public String getSignname() {
            Ext a;
            return a.signname;
        }

        public boolean getIsh5sign() {
            Ext a;
            return a.ish5sign;
        }

        public void setIsh5sign(boolean a) {
            a.ish5sign = a;
        }

        public void setCertOrgID(String a) {
            a.certOrgID = a;
        }

        public Ext() {
            Ext a;
        }

        public String getSigntype() {
            Ext a;
            return a.signtype;
        }
    }

    public static class Cert {
        private String certstartdate;
        private String signer;
        private String certenddate;

        public Cert() {
            Cert a;
        }

        public void setCertenddate(String a) {
            a.certenddate = a;
        }

        public Cert(String a) {
            Cert a2;
            a2.signer = a;
        }

        public String getCertenddate() {
            Cert a;
            return a.certenddate;
        }

        public String getCertstartdate() {
            Cert a;
            return a.certstartdate;
        }

        public void setSigner(String a) {
            a.signer = a;
        }

        public void setCertstartdate(String a) {
            a.certstartdate = a;
        }

        public String getSigner() {
            Cert a;
            return a.signer;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign;

import com.epoint.epsignature.bean.Pdf;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.util.List;
import java.util.Map;

public abstract class SignReq {
    private String signCert;
    private String signed;
    private Pdf[] batchpdf;
    private Map<String, String> ext;
    public static final float TRANS_SCALE_NEW = 0.8f;
    private String password;
    private Pdf pdf;
    protected static final float TRANS_SCALE = 0.8f;
    protected PdfReader reader;
    public PreaseResult preaseresult = null;
    private String userid;

    public void setSignCert(String a) {
        a.signCert = a;
    }

    public String getUserid() {
        SignReq a;
        return a.userid;
    }

    public SignReq() {
        SignReq a;
    }

    public Pdf getPdf() {
        SignReq a;
        return a.pdf;
    }

    public Map<String, String> getExt() {
        SignReq a;
        return a.ext;
    }

    public String getSignCert() {
        SignReq a;
        return a.signCert;
    }

    public String getPassword() {
        SignReq a;
        return a.password;
    }

    public void setUserid(String a) {
        a.userid = a;
    }

    public void setBatchpdf(Pdf[] a) {
        a.batchpdf = a;
    }

    public static Rectangle fixRect(float a, float a2, float a3, float a4, int a5, PdfReader a6) {
        PdfReader pdfReader = a6;
        Rectangle rectangle = pdfReader.getPageSize(a5);
        if (pdfReader.getPageN(a5).getAsNumber(PdfName.ROTATE) != null) {
            int n = a6.getPageN(a5).getAsNumber(PdfName.ROTATE).intValue();
            int n2 = n = (n %= 360) < 0 ? n + 360 : n;
            if (n != 180 && n != 0) {
                rectangle = a6.getPageSize(a5).rotate();
            }
        }
        a2 = rectangle.getHeight() - a2;
        Rectangle rectangle2 = new Rectangle(a - (a3 *= 0.83f) / 2.0f, a2 - (a4 *= 0.83f) / 2.0f, a + a3 / 2.0f, a2 + a4 / 2.0f);
        return rectangle2;
    }

    public void setPassword(String a) {
        a.password = a;
    }

    public void setReader(PdfReader a) {
        a.reader = a;
    }

    public Pdf[] getBatchpdf() {
        SignReq a;
        return a.batchpdf;
    }

    public PdfReader getReader() {
        SignReq a;
        return a.reader;
    }

    public void setSigned(String a) {
        a.signed = a;
    }

    public String getSigned() {
        SignReq a;
        return a.signed;
    }

    protected Rectangle fixRect(float a, float a2, float a3, float a4, int a5) {
        SignReq a6;
        return SignReq.fixRect(a, a2, a3, a4, a5, a6.reader);
    }

    public void setPdf(Pdf a) {
        a.pdf = a;
    }

    public void setExt(Map<String, String> a) {
        a.ext = a;
    }

    public abstract PreaseResult parseSigns() throws Exception;

    public class PreaseResult {
        private List<SignInfo> signList;

        public void setSignList(List<SignInfo> a) {
            a.signList = a;
        }

        public PreaseResult(List<SignInfo> a2) {
            PreaseResult a3;
            a3.signList = a2;
        }

        public List<SignInfo> getSignList() {
            PreaseResult a;
            return a.signList;
        }
    }
}


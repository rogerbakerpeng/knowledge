/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.api;

import com.epoint.epsignature.api.OutImplAPI;
import com.epoint.epsignature.bean.Pdf;
import java.io.OutputStream;

class PDFImgImpl
extends OutImplAPI {
    public byte[] pdfb;
    public byte[] pdfn;

    public PDFImgImpl(byte[] pdfb) {
        this.pdfb = pdfb;
    }

    @Override
    public byte[] getPDF(Pdf pdf) {
        return this.pdfb;
    }

    @Override
    public void dealPDF(Pdf pdf, byte[] filepdf) {
        this.pdfn = filepdf;
    }

    @Override
    public void dealSignInfo(Pdf pdf, String signinfo) {
    }

    @Override
    public String createToken() {
        return "";
    }

    public byte[] getPdfn() {
        return this.pdfn;
    }

    @Override
    public String getPDFPath(Pdf pdf) {
        return null;
    }

    @Override
    public boolean dealPDFOs(Pdf pdf, OutputStream file) {
        return false;
    }
}


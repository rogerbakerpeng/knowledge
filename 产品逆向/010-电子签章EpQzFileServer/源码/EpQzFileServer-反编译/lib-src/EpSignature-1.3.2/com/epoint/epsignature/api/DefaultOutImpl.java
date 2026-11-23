/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.api;

import com.epoint.epsignature.api.OutImplAPI;
import com.epoint.epsignature.bean.Pdf;
import java.io.OutputStream;

public class DefaultOutImpl
extends OutImplAPI {
    @Override
    public byte[] getPDF(Pdf pdf) {
        return null;
    }

    @Override
    public void dealPDF(Pdf pdf, byte[] file) {
    }

    @Override
    public void dealSignInfo(Pdf pdf, String signinfo) {
    }

    @Override
    public void deleteSignInfo(Pdf pdf, String signinfo) {
    }

    @Override
    public String createToken() {
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
}


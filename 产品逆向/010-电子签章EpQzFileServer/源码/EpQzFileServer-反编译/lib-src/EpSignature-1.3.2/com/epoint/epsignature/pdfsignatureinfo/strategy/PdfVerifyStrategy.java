/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfsignatureinfo.strategy;

import com.epoint.itextpdf.text.pdf.PdfReader;

public interface PdfVerifyStrategy {
    public String verify(PdfReader var1) throws Exception;
}


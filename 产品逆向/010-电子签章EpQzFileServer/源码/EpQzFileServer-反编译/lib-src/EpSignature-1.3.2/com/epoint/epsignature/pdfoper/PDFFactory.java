/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfoper;

import com.epoint.epsignature.utils.PDFMergeUtil;
import java.io.InputStream;
import java.util.Map;

public class PDFFactory {
    public PDFFactory() {
        PDFFactory a;
    }

    public static boolean mergePdfFiles(Map<String, InputStream> a, String a2, Boolean a3) {
        return new PDFMergeUtil().mergePdfFiles(a, a2, a3);
    }
}


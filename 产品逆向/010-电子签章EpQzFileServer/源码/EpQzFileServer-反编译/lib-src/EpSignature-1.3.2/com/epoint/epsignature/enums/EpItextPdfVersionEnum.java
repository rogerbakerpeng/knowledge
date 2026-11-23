/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.enums;

import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;

public final class EpItextPdfVersionEnum
extends Enum<EpItextPdfVersionEnum> {
    public static final /* enum */ EpItextPdfVersionEnum sp1\u4fee\u8ba2\u7248\u672c;
    String b;
    private static final /* synthetic */ EpItextPdfVersionEnum[] $VALUES;
    public static final /* enum */ EpItextPdfVersionEnum \u8001\u7248\u672c;

    public static EpItextPdfVersionEnum getByValue(String a) {
        int n;
        EpItextPdfVersionEnum[] epItextPdfVersionEnumArray = EpItextPdfVersionEnum.values();
        int n2 = epItextPdfVersionEnumArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            EpItextPdfVersionEnum epItextPdfVersionEnum = epItextPdfVersionEnumArray[n];
            if (epItextPdfVersionEnum.getVal().equals(a)) {
                return epItextPdfVersionEnum;
            }
            n3 = ++n;
        }
        return null;
    }

    public static EpItextPdfVersionEnum[] values() {
        return (EpItextPdfVersionEnum[])$VALUES.clone();
    }

    public static EpItextPdfVersionEnum valueOf(String a) {
        return Enum.valueOf(EpItextPdfVersionEnum.class, a);
    }

    static {
        \u8001\u7248\u672c = new EpItextPdfVersionEnum(UnauthorizedAccessException.J("\u800d\u721f\u6720"), 0, PDFHighlightAnnotationReq.J("8'8'<:"));
        sp1\u4fee\u8ba2\u7248\u672c = new EpItextPdfVersionEnum(UnauthorizedAccessException.J("\u007f'=\u4fb9\u8bae\u721f\u6720"), 1, PDFHighlightAnnotationReq.J("8'8'<: z}8"));
        EpItextPdfVersionEnum[] epItextPdfVersionEnumArray = new EpItextPdfVersionEnum[2];
        epItextPdfVersionEnumArray[0] = \u8001\u7248\u672c;
        epItextPdfVersionEnumArray[1] = sp1\u4fee\u8ba2\u7248\u672c;
        $VALUES = epItextPdfVersionEnumArray;
    }

    public String getVal() {
        EpItextPdfVersionEnum a;
        return a.b;
    }

    /*
     * WARNING - Possible parameter corruption
     * WARNING - void declaration
     */
    private /* synthetic */ EpItextPdfVersionEnum(String string) {
        void a;
        void var2_-1;
        void var1_-1;
        EpItextPdfVersionEnum a2;
        a2.b = a;
    }
}


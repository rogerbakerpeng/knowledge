/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.guangxica.utils;

import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.annotation.PDFAnnotationReq;
import java.security.MessageDigest;

public class MD5Util {
    private static final String[] hexDigits;

    private static /* synthetic */ String J(byte a) {
        int n = a;
        if (n < 0) {
            n += 256;
        }
        int n2 = n / 16;
        return new StringBuilder().insert(0, hexDigits[n2]).append(hexDigits[n %= 16]).toString();
    }

    public static String MD5Encode(String a, String a2) {
        MessageDigest messageDigest;
        String string;
        block3: {
            string = null;
            string = new String(a);
            messageDigest = MessageDigest.getInstance(PDFAnnotationReq.J("\n\u0000r"));
            if (a2 != null && !"".equals(a2)) break block3;
            string = MD5Util.J(messageDigest.digest(string.getBytes()));
        }
        try {
            string = MD5Util.J(messageDigest.digest(string.getBytes(a2)));
        }
        catch (Exception exception) {
            // empty catch block
        }
        return string;
    }

    public MD5Util() {
        MD5Util a;
    }

    static {
        String[] stringArray = new String[16];
        stringArray[0] = "0";
        stringArray[1] = "1";
        stringArray[2] = BaseReq.J("\u0000");
        stringArray[3] = PDFAnnotationReq.J("t");
        stringArray[4] = BaseReq.J("\u0006");
        stringArray[5] = PDFAnnotationReq.J("r");
        stringArray[6] = BaseReq.J("\u0004");
        stringArray[7] = PDFAnnotationReq.J("p");
        stringArray[8] = BaseReq.J("\n");
        stringArray[9] = PDFAnnotationReq.J("~");
        stringArray[10] = BaseReq.J("S");
        stringArray[11] = PDFAnnotationReq.J("%");
        stringArray[12] = BaseReq.J("Q");
        stringArray[13] = PDFAnnotationReq.J("#");
        stringArray[14] = BaseReq.J("W");
        stringArray[15] = PDFAnnotationReq.J("!");
        hexDigits = stringArray;
    }

    private static /* synthetic */ String J(byte[] a) {
        int n;
        StringBuffer stringBuffer = new StringBuffer();
        int n2 = n = 0;
        while (n2 < a.length) {
            stringBuffer.append(MD5Util.J(a[n++]));
            n2 = n;
        }
        return stringBuffer.toString();
    }
}


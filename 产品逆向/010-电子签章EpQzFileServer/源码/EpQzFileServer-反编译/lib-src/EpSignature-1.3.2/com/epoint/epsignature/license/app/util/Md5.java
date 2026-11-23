/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.util;

import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;
import java.security.MessageDigest;
import org.apache.log4j.Logger;

public final class Md5 {
    private static Logger log = Logger.getLogger(Md5.class);

    public static String md5(byte[] a) {
        char[] cArray;
        int n = 2;
        n = 4;
        n = 15;
        char[] cArray2 = new char[16];
        cArray2[0] = 48;
        cArray2[1] = 49;
        cArray2[2] = 50;
        cArray2[3] = 51;
        cArray2[4] = 52;
        cArray2[5] = 53;
        cArray2[6] = 54;
        cArray2[7] = 55;
        cArray2[8] = 56;
        cArray2[9] = 57;
        cArray2[10] = 97;
        cArray2[11] = 98;
        cArray2[12] = 99;
        cArray2[13] = 100;
        cArray2[14] = 101;
        cArray2[15] = 102;
        char[] cArray3 = cArray2;
        try {
            int n2;
            MessageDigest messageDigest = MessageDigest.getInstance(UnauthorizedAccessException.J("A\u00139"));
            messageDigest.update(a);
            byte[] byArray = messageDigest.digest();
            int n3 = byArray.length;
            cArray = new char[n3 * 2];
            int n4 = 0;
            byte by = 0;
            int n5 = n2 = 0;
            while (n5 < n3) {
                by = byArray[n2];
                cArray[n4++] = cArray3[by >>> 4 & 0xF];
                cArray[n4++] = cArray3[by & 0xF];
                n5 = ++n2;
            }
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
            return null;
        }
        return new String(cArray);
    }

    private /* synthetic */ Md5() {
        Md5 a;
    }
}


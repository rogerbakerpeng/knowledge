/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.license.app.util;

import java.security.MessageDigest;

public final class Md5 {
    private Md5() {
    }

    public static String md5(byte[] data) {
        int m = 2;
        int n = 4;
        int a = 15;
        char[] hexDigits = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
        try {
            MessageDigest mdTemp = MessageDigest.getInstance("MD5");
            mdTemp.update(data);
            byte[] md = mdTemp.digest();
            int j = md.length;
            char[] str = new char[j * 2];
            int k = 0;
            byte byte0 = 0;
            for (int i = 0; i < j; ++i) {
                byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xF];
                str[k++] = hexDigits[byte0 & 0xF];
            }
            return new String(str);
        }
        catch (Exception e) {
            return null;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import java.security.MessageDigest;

class EncryptUtil {
    EncryptUtil() {
    }

    public static String MD5(String inStr) {
        MessageDigest md5 = null;
        try {
            md5 = MessageDigest.getInstance("MD5");
        }
        catch (Exception e) {
            System.out.println(e.toString());
            e.printStackTrace();
            return "";
        }
        char[] charArray = inStr.toCharArray();
        byte[] byteArray = new byte[charArray.length];
        for (int i = 0; i < charArray.length; ++i) {
            byteArray[i] = (byte)charArray[i];
        }
        byte[] md5Bytes = md5.digest(byteArray);
        StringBuffer hexValue = new StringBuffer();
        for (int i = 0; i < md5Bytes.length; ++i) {
            int val = md5Bytes[i] & 0xFF;
            if (val < 16) {
                hexValue.append("0");
            }
            hexValue.append(Integer.toHexString(val));
        }
        return hexValue.toString();
    }

    public static String KL1(String inStr) {
        char[] a = inStr.toCharArray();
        for (int i = 0; i < a.length; ++i) {
            a[i] = (char)(a[i] ^ 0x74);
        }
        String s = new String(a);
        return s;
    }

    public static String JM1(String inStr) {
        char[] a = inStr.toCharArray();
        for (int i = 0; i < a.length; ++i) {
            a[i] = (char)(a[i] ^ 0x74);
        }
        String k = new String(a);
        return k;
    }

    public static String KL2(String inStr) {
        char[] a = inStr.toCharArray();
        for (int i = 0; i < a.length; ++i) {
            a[i] = (char)(a[i] ^ 0x78);
        }
        String s = new String(a);
        return s;
    }

    public static String JM2(String inStr) {
        char[] a = inStr.toCharArray();
        for (int i = 0; i < a.length; ++i) {
            a[i] = (char)(a[i] ^ 0x78);
        }
        String k = new String(a);
        return k;
    }

    public static String createToken(String orgToken1) {
        String md5Token1 = EncryptUtil.MD5(orgToken1);
        String orgToken2 = String.valueOf(System.currentTimeMillis());
        return EncryptUtil.KL1(md5Token1) + "DEL@CD" + EncryptUtil.KL2(orgToken2);
    }

    public static String jmToken(String token) {
        String[] strArray = token.split("DEL@CD");
        return EncryptUtil.JM1(strArray[0]) + "DEL@CD" + EncryptUtil.JM2(strArray[1]);
    }

    public static String validateToken(String token, String orgToken1) {
        boolean validate2;
        token = EncryptUtil.jmToken(token);
        String[] strArray = token.split("DEL@CD");
        boolean validate1 = EncryptUtil.MD5(orgToken1).equals(strArray[0]);
        boolean bl = validate2 = (System.currentTimeMillis() - Long.parseLong(strArray[1])) / 1000L <= 300L;
        if (validate1 && validate2) {
            return "OK";
        }
        if (!validate1 & !validate2) {
            return "key\u6821\u9a8c\u4e0e\u65f6\u95f4\u6821\u9a8c\u5747\u5931\u8d25";
        }
        if (!validate1) {
            return "key\u6821\u9a8c\u5931\u8d25";
        }
        if (!validate2) {
            return "\u65f6\u95f4\u6821\u9a8c\u5931\u8d25";
        }
        return "\u672a\u77e5\u9519\u8bef";
    }
}


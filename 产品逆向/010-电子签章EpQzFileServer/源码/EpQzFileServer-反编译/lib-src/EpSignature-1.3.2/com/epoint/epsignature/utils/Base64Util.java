/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

public class Base64Util {
    public Base64Util() {
        Base64Util a;
    }

    public static String encode(byte[] a) {
        return com.epoint.gm.util.Base64Util.encode(a);
    }

    public static byte[] decode(String a) {
        return com.epoint.gm.util.Base64Util.decode(a);
    }

    public static String encode(String a) {
        return com.epoint.gm.util.Base64Util.encode(a);
    }
}


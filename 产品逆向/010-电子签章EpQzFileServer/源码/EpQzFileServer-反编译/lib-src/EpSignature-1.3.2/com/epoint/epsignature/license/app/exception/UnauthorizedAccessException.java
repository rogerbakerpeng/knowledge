/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.exception;

public class UnauthorizedAccessException
extends RuntimeException {
    public static final String UNAUTH_MSG = "\u8bbf\u95ee\u6743\u9650\u9a8c\u8bc1\u5931\u8d25\uff0c\u5177\u4f53\u62a5\u9519\u8bf7\u67e5\u770b\u65e5\u5fd7\uff01";

    public UnauthorizedAccessException(String a, Throwable a2) {
        super(a, a2);
        UnauthorizedAccessException a3;
    }

    public UnauthorizedAccessException(String a) {
        super(a);
        UnauthorizedAccessException a2;
    }

    public UnauthorizedAccessException() {
        UnauthorizedAccessException a;
    }

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 5 << 4 ^ (2 ^ 5);
        int cfr_ignored_0 = 4 << 4 ^ (2 << 2 ^ 1);
        int n4 = n2;
        int n5 = 1 << 3 ^ 4;
        while (n4 >= 0) {
            int n6 = n2--;
            cArray[n6] = (char)(a.charAt(n6) ^ n5);
            if (n2 < 0) break;
            int n7 = n2--;
            cArray[n7] = (char)(a.charAt(n7) ^ n3);
            n4 = n2;
        }
        return new String(cArray);
    }

    public UnauthorizedAccessException(Throwable a) {
        super(a);
        UnauthorizedAccessException a2;
    }
}


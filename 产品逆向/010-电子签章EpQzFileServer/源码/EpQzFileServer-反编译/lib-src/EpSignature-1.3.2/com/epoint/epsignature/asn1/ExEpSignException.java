/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1;

public class ExEpSignException
extends RuntimeException {
    private /* synthetic */ Throwable b;
    private static final long serialVersionUID = 5844730020887746238L;

    public ExEpSignException(Throwable a) {
        super(a);
        ExEpSignException a2;
    }

    public ExEpSignException(String a) {
        super(a);
        ExEpSignException a2;
    }

    public ExEpSignException(String a, Throwable a2) {
        super(a, a2);
        ExEpSignException a3;
        a3.b = a2;
    }

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = (2 ^ 5) << 4 ^ 2 << 1;
        int cfr_ignored_0 = (2 ^ 5) << 3 ^ (3 ^ 5);
        int n4 = n2;
        int n5 = 4 << 3 ^ 2;
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

    public ExEpSignException() {
        ExEpSignException a;
    }
}


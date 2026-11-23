/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.cert;

@Deprecated
public class CertObject {
    public CertObject() {
        CertObject a;
    }

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 2 << 3 ^ 5;
        int cfr_ignored_0 = 4 << 4 ^ (2 << 2 ^ 1);
        int n4 = n2;
        int n5 = 2 << 3 ^ (3 ^ 5);
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
}


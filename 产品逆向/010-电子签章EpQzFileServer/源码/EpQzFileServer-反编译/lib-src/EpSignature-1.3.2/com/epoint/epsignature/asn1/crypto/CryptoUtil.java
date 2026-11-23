/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.crypto;

import com.epoint.epsignature.asn1.crypto.Rfc2898DeriveBytes;
import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.utils.JSONUtils;
import java.security.Key;
import java.security.spec.AlgorithmParameterSpec;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class CryptoUtil {
    public static byte[] processPic(String a, byte[] a2, boolean a3) throws Exception {
        Cipher cipher;
        Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(a, new byte[8]);
        Object object = rfc2898DeriveBytes.getBytes(16);
        Cipher cipher2 = Cipher.getInstance(CertObject.J("TSF9VTV9E]VE Ftrq\u007f{q"));
        object = new SecretKeySpec((byte[])object, 0, 16, JSONUtils.J("LN^"));
        Object object2 = rfc2898DeriveBytes.getBytes(16);
        object2 = new IvParameterSpec((byte[])object2);
        if (a3) {
            Cipher cipher3 = cipher2;
            cipher = cipher3;
            cipher3.init(1, (Key)object, (AlgorithmParameterSpec)object2);
        } else {
            Cipher cipher4 = cipher2;
            cipher = cipher4;
            cipher4.init(2, (Key)object, (AlgorithmParameterSpec)object2);
        }
        return cipher.doFinal(a2, 0, a2.length);
    }

    public CryptoUtil() {
        CryptoUtil a;
    }

    public static String switchGuid(String a, boolean a22) {
        StringBuilder stringBuilder = new StringBuilder();
        char[] cArray = a.toCharArray();
        if (a22) {
            int n;
            char[] a22 = cArray;
            int n2 = cArray.length;
            int n3 = n = 0;
            while (n3 < n2) {
                char c2 = a22[n];
                if (c2 == '4') {
                    stringBuilder.append('5');
                } else if (c2 == '5') {
                    stringBuilder.append('4');
                } else {
                    stringBuilder.append(c2);
                }
                n3 = ++n;
            }
        } else {
            int n;
            char[] a22 = cArray;
            int n4 = cArray.length;
            int n5 = n = 0;
            while (n5 < n4) {
                char c3 = a22[n];
                if (c3 == '5') {
                    stringBuilder.append('4');
                } else if (c3 == '4') {
                    stringBuilder.append('5');
                } else {
                    stringBuilder.append(c3);
                }
                n5 = ++n;
            }
        }
        return stringBuilder.toString();
    }
}


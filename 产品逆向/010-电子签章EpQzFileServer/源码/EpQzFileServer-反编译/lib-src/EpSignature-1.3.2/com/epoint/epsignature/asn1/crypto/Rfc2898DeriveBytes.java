/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.crypto;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.utils.EpFileServerUtil;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class Rfc2898DeriveBytes {
    private /* synthetic */ int g;
    private /* synthetic */ int k;
    private /* synthetic */ byte[] i;
    private /* synthetic */ Mac A;
    private /* synthetic */ byte[] a;
    private /* synthetic */ int G;
    private /* synthetic */ int b;

    public byte[] getBytes(int a) {
        Rfc2898DeriveBytes a2;
        byte[] byArray = new byte[a];
        int n = 0;
        Rfc2898DeriveBytes rfc2898DeriveBytes = a2;
        int n2 = rfc2898DeriveBytes.k - rfc2898DeriveBytes.b;
        if (n2 > 0) {
            if (a < n2) {
                Rfc2898DeriveBytes rfc2898DeriveBytes2 = a2;
                System.arraycopy(a2.a, rfc2898DeriveBytes2.b, byArray, 0, a);
                rfc2898DeriveBytes2.b += a;
                return byArray;
            }
            System.arraycopy(a2.a, a2.b, byArray, 0, n2);
            a2.k = 0;
            a2.b = 0;
            n += n2;
        }
        while (n < a) {
            n2 = a - n;
            a2.a = a2.J();
            if (n2 > 20) {
                int n3 = n;
                n += 20;
                System.arraycopy(a2.a, 0, byArray, n3, 20);
                continue;
            }
            System.arraycopy(a2.a, 0, byArray, n, n2);
            a2.b = n2;
            a2.k = 20;
            return byArray;
        }
        return byArray;
    }

    private /* synthetic */ byte[] J() {
        int n;
        Rfc2898DeriveBytes a;
        Rfc2898DeriveBytes rfc2898DeriveBytes = a;
        rfc2898DeriveBytes.A.update(rfc2898DeriveBytes.i, 0, a.i.length);
        Rfc2898DeriveBytes rfc2898DeriveBytes2 = a;
        byte[] byArray = a.A.doFinal(Rfc2898DeriveBytes.J(rfc2898DeriveBytes2.G));
        rfc2898DeriveBytes2.A.reset();
        byte[] byArray2 = byArray;
        int n2 = n = 2;
        while (n2 <= a.g) {
            int n3;
            byArray = a.A.doFinal(byArray);
            int n4 = n3 = 0;
            while (n4 < 20) {
                byArray2[++n3] = (byte)(byArray2[n3] ^ byArray[n3]);
                n4 = n3;
            }
            n2 = ++n;
        }
        if (a.G == Integer.MAX_VALUE) {
            a.G = Integer.MIN_VALUE;
            return byArray2;
        }
        ++a.G;
        return byArray2;
    }

    public Rfc2898DeriveBytes(byte[] a, byte[] a2, int a3) throws NoSuchAlgorithmException, InvalidKeyException {
        Rfc2898DeriveBytes a4;
        Rfc2898DeriveBytes rfc2898DeriveBytes = a4;
        Rfc2898DeriveBytes rfc2898DeriveBytes2 = a4;
        rfc2898DeriveBytes2.a = new byte[20];
        rfc2898DeriveBytes2.b = 0;
        rfc2898DeriveBytes.k = 0;
        rfc2898DeriveBytes.G = 1;
        if (a2 == null || a2.length < 8) {
            throw new InvalidKeyException(EpOFDData.J("u+J>\u0006'S9RjD/\u0006r\u0006(_>C9\u0006%TjK%T/\b"));
        }
        if (a == null) {
            throw new InvalidKeyException(EpFileServerUtil.J("\u00019\"+&7#<q;06?7%x3=q6$4=v"));
        }
        Rfc2898DeriveBytes rfc2898DeriveBytes3 = a4;
        a4.i = a2;
        rfc2898DeriveBytes3.g = a3;
        rfc2898DeriveBytes3.A = Mac.getInstance(EpOFDData.J("\u0002K+E\u0019n\u000b\u0017"));
        a4.A.init(new SecretKeySpec(a, EpFileServerUtil.J("\u001950;\u0002\u0010\u0010i")));
    }

    private static /* synthetic */ byte[] J(int a) {
        byte[] byArray = new byte[4];
        byArray[0] = (byte)(a >>> 24);
        byArray[1] = (byte)(a >>> 16);
        byArray[2] = (byte)(a >>> 8);
        byArray[3] = (byte)a;
        return byArray;
    }

    public Rfc2898DeriveBytes(String a, byte[] a2, int a3) throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException {
        a4(a.getBytes(EpOFDData.J("\u001fr\f\u001e")), a2, a3);
        Rfc2898DeriveBytes a4;
    }

    public Rfc2898DeriveBytes(String a, byte[] a2) throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException {
        a3(a, a2, 1000);
        Rfc2898DeriveBytes a3;
    }
}


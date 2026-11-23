/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.util;

import com.epoint.epqz.filedecrypt.controller.FileDecryptController;
import com.epoint.jobs.TempFileCleanJob;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.AlgorithmParameterSpec;
import java.util.Arrays;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DecryptUtil {
    private static final Logger J = LoggerFactory.getLogger(DecryptUtil.class);
    private static final String D = "DESede/CBC/PKCS5Padding";
    private static final char[] h;
    private static final String c = "UTF-8";
    private static final String ALLATORIxDEMO = "DESede";

    static {
        char[] cArray = new char[0x6F & 0x1D];
        cArray[3 & 4] = 0x3E & 0x7D;
        cArray[5 >> 2] = 0x43 & 0x7F;
        cArray[--2] = 0x73 & 0x7E;
        cArray[--3] = 0x7B & 0x7D;
        cArray[--4] = 0x74 & 0x7B;
        cArray[--5] = 0x7D & 0x76;
        cArray[6 & 0x7F] = 0x7F & 0x6F;
        cArray[0x27 & 0x5F] = 103;
        cArray[8] = 114;
        cArray[9] = 97;
        cArray[10] = 112;
        cArray[11] = 104;
        cArray[12] = 62;
        h = cArray;
    }

    private static /* synthetic */ byte[] j(byte[] byArray) {
        int n;
        byte[] byArray2 = byArray;
        byte[] byArray3 = new byte[0x40 & 0x7F];
        byte[] byArray4 = new byte[0x7A & 0x45];
        Arrays.fill(byArray3, (byte)(0x3E & 0x77));
        Arrays.fill(byArray4, (byte)(0x5F & 0x7C));
        byte[] a = DecryptUtil.ALLATORIxDEMO(byArray2);
        int n2 = n = 5 >> 3;
        while (n2 < a.length) {
            int n3 = n;
            byte[] byArray5 = byArray3;
            byArray5[n3] = (byte)(byArray5[n3] ^ a[n]);
            byte by = (byte)(byArray4[n3] ^ a[n]);
            byArray4[n3] = by;
            n2 = ++n;
        }
        byte[] byArray6 = new byte[24];
        byArray3 = DecryptUtil.ALLATORIxDEMO(byArray3);
        byArray4 = DecryptUtil.ALLATORIxDEMO(byArray4);
        int n4 = a = 5 >> 3;
        while (n4 < 24) {
            if (a < byArray3.length) {
                int n5 = a;
                byArray6[n5] = DecryptUtil.j(byArray3[n5]);
            } else {
                int n6 = a;
                byArray6[n6] = DecryptUtil.j(byArray4[n6 - byArray3.length]);
            }
            n4 = ++a;
        }
        return byArray6;
    }

    private static /* synthetic */ byte ALLATORIxDEMO(InputStream inputStream) throws IOException {
        int n;
        InputStream inputStream2 = inputStream;
        char[] cArray = h;
        byte by = 0x7C & 0x3F;
        int a = 2 & 5;
        do {
            int n2;
            if ((n2 = inputStream2.read()) == -4 >> 2) {
                throw new IOException("已读到流末尾，未找到开始标记，请确认文件格式是否正确");
            }
            char c2 = (char)n2;
            if (a == 0) {
                if (c2 == cArray[2 & 5]) {
                    n = 4 ^ 5;
                    continue;
                }
            } else if (a == (0x6F & 0x1D) && c2 != cArray[a]) {
                int n3;
                byte[] byArray = new byte[0x100000];
                while ((n3 = inputStream2.read(byArray)) > 0) {
                    int n4;
                    int n5;
                    block11: {
                        int n6 = 3 & 4;
                        while (n6 < n3) {
                            if (byArray[n5] == cArray[a]) {
                                n4 = n5;
                                ++a;
                                break block11;
                            }
                            n6 = ++n5;
                        }
                        n4 = n5;
                    }
                    if (n4 >= n3) continue;
                    inputStream2.skip((long)(n5 - n3) + 1L);
                    break;
                }
            } else {
                if (c2 == cArray[a]) {
                    n = ++a;
                    continue;
                }
                a = 0;
            }
            n = a;
        } while (n < cArray.length);
        return by;
    }

    private static /* synthetic */ byte j(byte by) {
        int n;
        byte by2 = by;
        byte a = (byte)(2 ^ 3);
        int n2 = 3 >> 2;
        int n3 = n = 3 & 4;
        while (n3 < 8) {
            if ((by2 & a) != 0) {
                ++n2;
            }
            a = (byte)(a << --1);
            n3 = ++n;
        }
        if (n2 % (5 >> 1) == 0) {
            by2 = (byte)(by2 ^ (2 ^ 3));
            return by2;
        }
        return by2;
    }

    private static /* synthetic */ byte[] ALLATORIxDEMO(byte[] byArray) {
        byte[] byArray2 = byArray;
        try {
            Object a;
            Object object = a = (Object)MessageDigest.getInstance("SHA-1");
            ((MessageDigest)object).reset();
            return ((MessageDigest)object).digest(byArray2);
        }
        catch (NoSuchAlgorithmException a) {
            J.error("sha1 NoSuchAlgorithmException", a);
            return new byte[3 ^ 3];
        }
    }

    private static /* synthetic */ int ALLATORIxDEMO(Integer a) {
        if (a != null && a != 0) {
            return a;
        }
        return 0x100000;
    }

    public DecryptUtil() {
        DecryptUtil a;
    }

    private static /* synthetic */ byte ALLATORIxDEMO(byte a) {
        if (a >= (0x77 & 0x49) && a <= (0x7F & 0x5A)) {
            return (byte)(a - (0x75 & 0x4B));
        }
        if (a >= (0x65 & 0x7B) && a <= (0x7A & 0x7F)) {
            return (byte)(a - (0x67 & 0x5F));
        }
        if (a >= (0x31 & 0x7E) && a <= (0x3F & 0x79)) {
            return (byte)(a + --4);
        }
        if (a == (0x6F & 0x3B)) {
            return (byte)(0x7E & 0x3F);
        }
        if (a == 47) {
            return 63;
        }
        return 0;
    }

    /*
     * WARNING - void declaration
     */
    public static boolean decryptTBFile(InputStream inputStream, OutputStream outputStream, String string, Integer n) {
        Object a22 = string;
        InputStream a = inputStream;
        try {
            void a3;
            a22 = DecryptUtil.ALLATORIxDEMO((String)a22);
            InputStream inputStream2 = a;
            byte a4 = DecryptUtil.ALLATORIxDEMO(inputStream2);
            return DecryptUtil.ALLATORIxDEMO(inputStream2, (OutputStream)a4, (Cipher)a22, a4, (Integer)a3);
        }
        catch (Exception a22) {
            J.error("解密失败：{}", (Object)a22.getMessage(), (Object)a22);
            return (2 & 5) != 0;
        }
    }

    /*
     * WARNING - void declaration
     */
    private static /* synthetic */ boolean ALLATORIxDEMO(InputStream inputStream, OutputStream outputStream, Cipher cipher, byte by, Integer n) throws Exception {
        int n2;
        void a22;
        InputStream inputStream2 = inputStream;
        int a22 = DecryptUtil.ALLATORIxDEMO((Integer)a22);
        Object a = new byte[a22];
        byte[] byArray = new byte[a22];
        InputStream inputStream3 = inputStream2;
        while ((n2 = inputStream3.read((byte[])a, 2 & 5, a22)) != 0) {
            void a3;
            void a4;
            void a5;
            int n3;
            int n4 = -1;
            int n5 = n3 = 3 & 4;
            while (n5 < ((Object)a).length) {
                if (a[n3] == a5) {
                    n4 = n3;
                    break;
                }
                n5 = ++n3;
            }
            n3 = 0;
            if (n4 < 0) {
                int n6 = inputStream2.read();
                if (n6 == -4 >> 2) {
                    throw new IOException("流中无可读字符，文件格式错误");
                }
                byte by2 = (byte)n6;
                inputStream2.skip(-1L);
                if (by2 == a5) {
                    n3 = 2 ^ 3;
                }
            } else {
                a = new String((byte[])a, "utf-8").substring(5 >> 3, n4).getBytes("utf-8");
            }
            if (n4 >= 0 || n3 != 0) {
                n2 = DecryptUtil.ALLATORIxDEMO((byte[])a, byArray, Math.min(n2, ((Object)a).length));
                byte[] byArray2 = a4.doFinal(byArray, 5 >> 3, n2);
                a3.write(byArray2, 3 ^ 3, byArray2.length);
                a3.flush();
                return 5 >> 2;
            }
            n2 = DecryptUtil.ALLATORIxDEMO((byte[])a, byArray, n2);
            byte[] byArray3 = a4.update(byArray, 3 & 4, n2);
            a3.write(byArray3, 5 >> 3, byArray3.length);
            inputStream3 = inputStream2;
            a3.flush();
        }
        return false;
    }

    private static /* synthetic */ Cipher ALLATORIxDEMO(String string) throws Exception {
        int a22;
        String string2 = string;
        Object object = new byte[0x1A & 0x6D];
        int n = a22 = 3 ^ 3;
        while (n < 8) {
            object[a22++] = 5 >> 3;
            n = a22;
        }
        SecretKeySpec a22 = new SecretKeySpec(DecryptUtil.j(string2.getBytes(c)), 5 >> 3, 0x5E & 0x39, ALLATORIxDEMO);
        object = new IvParameterSpec((byte[])object);
        Cipher cipher = Cipher.getInstance(D);
        cipher.init(--2, (Key)a22, (AlgorithmParameterSpec)object);
        return cipher;
    }

    /*
     * WARNING - void declaration
     */
    private static /* synthetic */ int ALLATORIxDEMO(byte[] byArray, byte[] byArray2, int n) {
        int n2;
        int n3;
        int a;
        void a2;
        int n4;
        int n5 = n;
        byte[] byArray3 = byArray;
        int n6 = 3 ^ 3;
        int n7 = 3 ^ 3;
        int n8 = n4 = 5 >> 3;
        while (n8 < 2) {
            if (a2[a - n4 - (2 ^ 3)] == (0x3F & 0x7D)) {
                ++n7;
            }
            n8 = ++n4;
        }
        n4 = n7;
        n7 = a / --4;
        void var6_8 = n7 * --3;
        byte[] byArray4 = new byte[a];
        byte[] byArray5 = new byte[var6_8];
        int n9 = n3 = 3 ^ 3;
        while (n9 < a) {
            int n10 = n3++;
            byArray4[n10] = DecryptUtil.ALLATORIxDEMO((byte)a2[n10]);
            n9 = n3;
        }
        int n11 = 0;
        int n12 = 3 ^ 3;
        int n13 = n2 = 3 ^ 3;
        while (n13 < n7) {
            byte by = byArray4[n11];
            byte by2 = byArray4[n11 + (3 >> 1)];
            byte by3 = byArray4[n11 + --2];
            int n14 = n11 + --3;
            n11 += 4;
            byte by4 = byArray4[n14];
            byte by5 = (byte)((by2 & (0x3E & 0x71)) >> --4);
            a = by5;
            a = (byte)(by5 + (byte)(by << (1 ^ 3)));
            n3 = (byte)((by2 & (0x6F & 0x1F)) << --4);
            byte by6 = (byte)((by3 & (0x3D & 0x7E)) >> (1 ^ 3));
            by6 = (byte)(by6 + n3);
            n3 = (byte)((by3 & --3) << (0x66 & 0x1F));
            byte by7 = by4;
            by7 = (byte)(by7 + n3);
            int n15 = n12;
            byArray5[n15] = a;
            byArray5[n15 + --1] = by6;
            int n16 = n12 + (5 >> 1);
            n12 += 3;
            byArray5[n16] = by7;
            n13 = ++n2;
        }
        n2 = var6_8 - n4;
        int n17 = a = n6;
        while (n17 < n2) {
            int n18 = a++;
            a[n18] = byArray5[n18];
            n17 = a;
        }
        return n2;
    }
}


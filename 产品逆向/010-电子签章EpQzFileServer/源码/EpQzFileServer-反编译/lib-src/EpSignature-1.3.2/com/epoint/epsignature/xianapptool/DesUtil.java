/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.xianapptool;

import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.gm.util.Base64Util;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.spec.KeySpec;
import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;
import org.apache.log4j.Logger;

public class DesUtil {
    private static final String desIv = "AFQ8102Y";
    private static final Logger log = Logger.getLogger(DesUtil.class);
    private static final String DES = "DES/CBC/PKCS5Padding";

    private static /* synthetic */ String J(byte[] a) {
        int n;
        String string = "";
        String string2 = "";
        int n2 = n = 0;
        while (n2 < a.length) {
            string2 = Integer.toHexString(a[n] & 0xFF);
            string = string2.length() == 1 ? new StringBuilder().insert(0, string).append("0").append(string2).toString() : new StringBuilder().insert(0, string).append(string2).toString();
            n2 = ++n;
        }
        return string.toUpperCase();
    }

    private static /* synthetic */ byte[] b(byte[] a, byte[] a2) throws Exception {
        Cipher cipher;
        IvParameterSpec ivParameterSpec = new IvParameterSpec(desIv.getBytes(StandardCharsets.UTF_8));
        a2 = new DESKeySpec((byte[])a2);
        a2 = SecretKeyFactory.getInstance(GetMessageResponse.J("9\u0000.")).generateSecret((KeySpec)a2);
        Cipher cipher2 = cipher = Cipher.getInstance(DES);
        cipher2.init(1, (Key)a2, ivParameterSpec);
        return cipher2.doFinal(a);
    }

    public static String encodeText(String a) {
        return DesUtil.J(a, desIv);
    }

    public DesUtil() {
        DesUtil a;
    }

    private static /* synthetic */ String b(String a, String a22) {
        String string = "";
        try {
            a22 = DesUtil.J(Base64Util.decode(a), ((String)a22).getBytes());
            string = new String((byte[])a22);
            return string;
        }
        catch (Exception a22) {
            log.error(a22.getMessage());
            return string;
        }
    }

    public static String decodeText(String a) {
        return DesUtil.b(a, desIv);
    }

    private static /* synthetic */ byte[] J(byte[] a, byte[] a2) throws Exception {
        Cipher cipher;
        IvParameterSpec ivParameterSpec = new IvParameterSpec(desIv.getBytes(StandardCharsets.UTF_8));
        a2 = new DESKeySpec((byte[])a2);
        a2 = SecretKeyFactory.getInstance(GetMessageResponse.J("9\u0000.")).generateSecret((KeySpec)a2);
        Cipher cipher2 = cipher = Cipher.getInstance(DES);
        cipher2.init(2, (Key)a2, ivParameterSpec);
        return cipher2.doFinal(a);
    }

    private static /* synthetic */ byte[] J(byte[] a) {
        int n;
        if (a.length % 2 != 0) {
            throw new IllegalArgumentException(GetMessageResponse.J("\u0011 \u0013\"\t-]+\u00121] \u000b \u0013"));
        }
        byte[] byArray = new byte[a.length / 2];
        int n2 = n = 0;
        while (n2 < a.length) {
            String string = new String(a, n, 2);
            int n3 = n / 2;
            byArray[n3] = (byte)Integer.parseInt(string, 16);
            n2 = n += 2;
        }
        return byArray;
    }

    private static /* synthetic */ String J(String a, String a22) {
        byte[] byArray;
        byte[] byArray2 = null;
        String string = "";
        try {
            byArray = byArray2 = DesUtil.b(a.getBytes(), a22.getBytes());
        }
        catch (Exception a22) {
            log.error(a22.getMessage());
            byArray = byArray2;
        }
        if (byArray != null) {
            string = Base64Util.encode(byArray2);
        }
        return string;
    }
}


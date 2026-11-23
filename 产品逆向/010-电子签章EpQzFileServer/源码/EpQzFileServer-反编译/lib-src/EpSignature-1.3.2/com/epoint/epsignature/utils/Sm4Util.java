/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  sun.misc.BASE64Decoder
 *  sun.misc.BASE64Encoder
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.utils.EpFileServerUtil;
import java.security.Key;
import java.security.SecureRandom;
import java.security.Security;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.SecretKeySpec;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class Sm4Util {
    private static final String ENCODING = "UTF-8";
    public static final String ALGORITHM_NAME_ECB_PADDING = "SM4/ECB/PKCS5Padding";
    private static BASE64Encoder base64Encoder;
    public static final String ALGORITHM_NAME = "SM4";
    public static final int DEFAULT_KEY_SIZE = 128;
    private static BASE64Decoder base64Decoder;

    public static byte[] encrypt_Ecb_Padding(byte[] a, byte[] a2) throws Exception {
        return Sm4Util.J(ALGORITHM_NAME_ECB_PADDING, 1, a).doFinal(a2);
    }

    private static /* synthetic */ Cipher J(String a, int a2, byte[] a3) throws Exception {
        Cipher cipher = Cipher.getInstance(a, EpOFDData.J("\be"));
        a3 = new SecretKeySpec((byte[])a3, ALGORITHM_NAME);
        Cipher cipher2 = cipher;
        cipher2.init(a2, (Key)a3);
        return cipher2;
    }

    public static byte[] generateKey(int a) throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance(ALGORITHM_NAME, EpFileServerUtil.J("\u0013\u001b"));
        keyGenerator.init(a, new SecureRandom());
        return keyGenerator.generateKey().getEncoded();
    }

    public static String decryptEcb(String a, String a2) {
        String string = "";
        try {
            byte[] byArray = a.getBytes();
            a2 = base64Decoder.decodeBuffer((String)a2);
            byte[] byArray2 = new byte[]{};
            byArray2 = Sm4Util.decrypt_Ecb_Padding(byArray, (byte[])a2);
            string = new String(byArray2, ENCODING);
            return string;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }

    public Sm4Util() {
        Sm4Util a;
    }

    static {
        Security.addProvider(new BouncyCastleProvider());
        base64Encoder = new BASE64Encoder();
        base64Decoder = new BASE64Decoder();
    }

    public static String encryptEcb(String a, String a2) {
        try {
            String string = "";
            byte[] byArray = a.getBytes();
            a2 = ((String)a2).getBytes(ENCODING);
            a2 = Sm4Util.encrypt_Ecb_Padding(byArray, (byte[])a2);
            string = new String(base64Encoder.encode((byte[])a2));
            string = string.replaceAll(EpOFDData.J("\u0016+"), "");
            string = string.replaceAll(EpFileServerUtil.J("\rR"), "");
            return string;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }

    public static byte[] decrypt_Ecb_Padding(byte[] a, byte[] a2) throws Exception {
        return Sm4Util.J(ALGORITHM_NAME_ECB_PADDING, 2, a).doFinal(a2);
    }
}


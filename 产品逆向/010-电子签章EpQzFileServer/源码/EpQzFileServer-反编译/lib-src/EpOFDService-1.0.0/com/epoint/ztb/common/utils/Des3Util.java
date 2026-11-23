/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.utils;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

public class Des3Util {
    private static final String Algorithm = "DESede";
    private static final String PASSWORD_CRYPT_KEY = "PASSWORD_KEY";

    public static byte[] encryptMode(byte[] originalText) {
        try {
            SecretKeySpec deskey = new SecretKeySpec(Des3Util.build3DesKey(PASSWORD_CRYPT_KEY), Algorithm);
            Cipher cipher = Cipher.getInstance(Algorithm);
            cipher.init(1, deskey);
            return cipher.doFinal(originalText);
        }
        catch (NoSuchAlgorithmException e1) {
            e1.printStackTrace();
        }
        catch (NoSuchPaddingException e2) {
            e2.printStackTrace();
        }
        catch (Exception e3) {
            e3.printStackTrace();
        }
        return null;
    }

    public static byte[] decryptMode(byte[] cipherText) {
        try {
            SecretKeySpec deskey = new SecretKeySpec(Des3Util.build3DesKey(PASSWORD_CRYPT_KEY), Algorithm);
            Cipher cipher = Cipher.getInstance(Algorithm);
            cipher.init(2, deskey);
            return cipher.doFinal(cipherText);
        }
        catch (NoSuchAlgorithmException e1) {
            e1.printStackTrace();
        }
        catch (NoSuchPaddingException e2) {
            e2.printStackTrace();
        }
        catch (Exception e3) {
            e3.printStackTrace();
        }
        return null;
    }

    public static byte[] build3DesKey(String keyStr) throws UnsupportedEncodingException {
        byte[] key = new byte[24];
        byte[] temp = keyStr.getBytes("UTF-8");
        if (key.length > temp.length) {
            System.arraycopy(temp, 0, key, 0, temp.length);
        } else {
            System.arraycopy(temp, 0, key, 0, key.length);
        }
        return key;
    }

    public static String byte2Hex(byte[] b) {
        String hs = "";
        String stmp = "";
        for (int n = 0; n < b.length; ++n) {
            stmp = Integer.toHexString(b[n] & 0xFF);
            hs = stmp.length() == 1 ? hs + "0" + stmp : hs + stmp;
            if (n >= b.length - 1) continue;
        }
        return hs.toUpperCase();
    }

    public static void main(String[] args) {
        String msg = "1213456789";
        System.out.println("\u3010\u52a0\u5bc6\u524d\u3011\uff1a" + msg);
        byte[] secretArr = Des3Util.encryptMode(msg.getBytes());
        String str = Des3Util.byte2Hex(secretArr);
        System.out.println("\u3010\u52a0\u5bc6\u540e\u3011\uff1a" + str);
        byte[] myMsgArr = Des3Util.decryptMode(secretArr);
        System.out.println("\u3010\u89e3\u5bc6\u540e\u3011\uff1a" + new String(myMsgArr));
    }
}


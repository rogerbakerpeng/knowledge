/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.license.app.strategy;

import com.epoint.ztb.license.app.exception.LicenseException;
import com.epoint.ztb.license.app.strategy.base.KeyPairStrategy;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import javax.crypto.Cipher;

public class DefaultKeyPairStrategy
implements KeyPairStrategy {
    private static final String KEY_ALGORITHM = "RSA";

    @Override
    public byte[] decode(byte[] sourceData, byte[] publicKey) throws LicenseException {
        try {
            KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
            X509EncodedKeySpec encodedKeySpec = new X509EncodedKeySpec(publicKey);
            PublicKey pubKey = keyFactory.generatePublic(encodedKeySpec);
            Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
            cipher.init(2, pubKey);
            return cipher.doFinal(sourceData);
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new LicenseException("DefaultKeyPairStrategy decode error", e);
        }
    }
}


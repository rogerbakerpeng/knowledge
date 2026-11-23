/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.strategy;

import com.epoint.epsignature.license.app.exception.LicenseException;
import com.epoint.epsignature.license.app.strategy.base.KeyPairStrategy;
import com.epoint.epsignature.utils.JSONUtils;
import java.security.Key;
import java.security.KeyFactory;
import java.security.spec.KeySpec;
import java.security.spec.X509EncodedKeySpec;
import javax.crypto.Cipher;
import org.apache.log4j.Logger;

public class DefaultKeyPairStrategy
implements KeyPairStrategy {
    private static final String KEY_ALGORITHM = "RSA";
    private static Logger log = Logger.getLogger(DefaultKeyPairStrategy.class);

    @Override
    public byte[] decode(byte[] a, byte[] a2) throws LicenseException {
        try {
            Cipher cipher;
            KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
            a2 = new X509EncodedKeySpec((byte[])a2);
            KeyFactory keyFactory2 = keyFactory;
            a2 = keyFactory2.generatePublic((KeySpec)a2);
            Cipher cipher2 = cipher = Cipher.getInstance(keyFactory2.getAlgorithm());
            cipher2.init(2, (Key)a2);
            return cipher2.doFinal(a);
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
            exception.printStackTrace();
            throw new LicenseException(JSONUtils.J("Inkjxgy@hr]jdy^\u007f\u007fjynjr-ohhboh+hy\u007fd\u007f"), exception);
        }
    }

    public DefaultKeyPairStrategy() {
        DefaultKeyPairStrategy a;
    }
}


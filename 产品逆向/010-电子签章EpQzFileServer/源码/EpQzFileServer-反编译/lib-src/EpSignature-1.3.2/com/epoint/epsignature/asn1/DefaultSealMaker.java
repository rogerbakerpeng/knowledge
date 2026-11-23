/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1;

import com.epoint.epsignature.asn1.SealMaker;
import com.epoint.epsignature.utils.SignUtil;
import java.security.cert.Certificate;
import java.util.Date;
import org.apache.log4j.Logger;

public class DefaultSealMaker
implements SealMaker {
    private static Logger logger = Logger.getLogger(DefaultSealMaker.class);

    @Override
    public byte[] signData(byte[] a2) {
        byte[] byArray = null;
        try {
            byArray = SignUtil.sign(a2);
            return byArray;
        }
        catch (Exception a2) {
            logger.error(a2.getMessage(), a2);
            return byArray;
        }
    }

    @Override
    public Certificate getCertificate() {
        return SignUtil.chain[0];
    }

    public DefaultSealMaker() {
        DefaultSealMaker a;
    }

    @Override
    public String getSignatureAlg() {
        return "1.3.14.3.2.29";
    }

    @Override
    public Date getSignDate() {
        return new Date();
    }
}


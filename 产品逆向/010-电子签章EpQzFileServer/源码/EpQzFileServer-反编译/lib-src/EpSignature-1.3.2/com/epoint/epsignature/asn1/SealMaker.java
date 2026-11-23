/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1;

import java.security.cert.Certificate;
import java.util.Date;

public interface SealMaker {
    public Date getSignDate();

    public Certificate getCertificate();

    public byte[] signData(byte[] var1);

    public String getSignatureAlg();
}


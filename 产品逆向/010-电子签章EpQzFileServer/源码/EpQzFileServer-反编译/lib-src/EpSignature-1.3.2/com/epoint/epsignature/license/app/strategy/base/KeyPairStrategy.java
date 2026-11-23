/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.strategy.base;

import com.epoint.epsignature.license.app.exception.LicenseException;

public interface KeyPairStrategy {
    public byte[] decode(byte[] var1, byte[] var2) throws LicenseException;
}


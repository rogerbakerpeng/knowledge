/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.strategy.base;

import com.epoint.epsignature.license.app.exception.LicenseException;

public interface LicenseFileStrategy {
    public byte[] parseLicenseFile() throws LicenseException;
}


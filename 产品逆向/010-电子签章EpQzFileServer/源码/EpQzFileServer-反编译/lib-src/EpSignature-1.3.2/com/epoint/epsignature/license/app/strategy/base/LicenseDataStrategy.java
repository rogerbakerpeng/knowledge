/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.strategy.base;

import com.epoint.epsignature.license.app.entity.LicenseEntity;
import com.epoint.epsignature.license.app.exception.LicenseException;
import com.epoint.epsignature.license.app.strategy.base.KeyPairStrategy;
import java.io.UnsupportedEncodingException;

public interface LicenseDataStrategy {
    public LicenseEntity parseLicenseData(byte[] var1, String var2, KeyPairStrategy var3) throws LicenseException, UnsupportedEncodingException;
}


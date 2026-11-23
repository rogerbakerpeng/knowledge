/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.license.app.strategy.base;

import com.epoint.ztb.license.app.entity.LicenseEntity;
import com.epoint.ztb.license.app.exception.LicenseException;
import com.epoint.ztb.license.app.strategy.base.KeyPairStrategy;

public interface LicenseDataStrategy {
    public LicenseEntity parseLicenseData(byte[] var1, String var2, KeyPairStrategy var3) throws LicenseException;
}


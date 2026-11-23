/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.license.app.strategy.base;

import com.epoint.ztb.license.app.exception.LicenseException;

public interface LicenseExpireStrategy {
    public void expire();

    public void invalid(Exception var1) throws LicenseException;
}


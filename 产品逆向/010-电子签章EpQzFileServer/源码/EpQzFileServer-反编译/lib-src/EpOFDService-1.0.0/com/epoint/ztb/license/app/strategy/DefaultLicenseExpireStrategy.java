/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.license.app.strategy;

import com.epoint.ztb.license.app.exception.LicenseException;
import com.epoint.ztb.license.app.exception.LicenseRuntimeException;
import com.epoint.ztb.license.app.strategy.base.LicenseExpireStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DefaultLicenseExpireStrategy
implements LicenseExpireStrategy {
    private static final Logger log = LoggerFactory.getLogger(DefaultLicenseExpireStrategy.class);

    @Override
    public void expire() {
        throw new LicenseRuntimeException("license\u5df2\u8fc7\u671f");
    }

    @Override
    public void invalid(Exception e) throws LicenseException {
        log.error(e.getCause() != null ? e.getCause().getMessage() : e.getMessage());
        throw new LicenseException("license\u65e0\u6548", e);
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.strategy;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.epsignature.license.app.exception.LicenseException;
import com.epoint.epsignature.license.app.exception.LicenseRuntimeException;
import com.epoint.epsignature.license.app.strategy.base.LicenseExpireStrategy;
import org.apache.log4j.Logger;

public class DefaultLicenseExpireStrategy
implements LicenseExpireStrategy {
    private static Logger log = Logger.getLogger(LicenseExpireStrategy.class);

    @Override
    public void expire() {
        throw new LicenseRuntimeException(GetMessageResponse.J(")\u0014&\u0018+\u000e \u5d8f\u8f82\u6762"));
    }

    public DefaultLicenseExpireStrategy() {
        DefaultLicenseExpireStrategy a;
    }

    @Override
    public void invalid(Exception a) throws LicenseException {
        log.error(a.getCause() != null ? a.getCause().getMessage() : a.getMessage());
        throw new LicenseException(EpOFDData.J("J#E/H9C\u65aa\u656e"), a);
    }
}


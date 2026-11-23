/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.service;

import com.epoint.epsignature.license.app.entity.LicenseEntity;
import com.epoint.epsignature.license.app.exception.LicenseException;
import com.epoint.epsignature.license.app.strategy.DefaultKeyPairStrategy;
import com.epoint.epsignature.license.app.strategy.DefaultLicenseDataStrategy;
import com.epoint.epsignature.license.app.strategy.DefaultLicenseExpireStrategy;
import com.epoint.epsignature.license.app.strategy.DefaultLicenseFileStrategy;
import com.epoint.epsignature.license.app.strategy.base.KeyPairStrategy;
import com.epoint.epsignature.license.app.strategy.base.LicenseDataStrategy;
import com.epoint.epsignature.license.app.strategy.base.LicenseExpireStrategy;
import com.epoint.epsignature.license.app.strategy.base.LicenseFileStrategy;
import com.epoint.epsignature.utils.EpFileServerUtil;
import com.epoint.epsignature.utils.JSONUtils;
import java.util.Base64;
import org.apache.log4j.Logger;

public class LicenseService {
    private /* synthetic */ KeyPairStrategy k;
    private /* synthetic */ byte[] i;
    private /* synthetic */ LicenseEntity A;
    private static Logger log = Logger.getLogger(LicenseService.class);
    private /* synthetic */ LicenseExpireStrategy a;
    private static final String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5WtX63fHsMTDbLj2Z2ldkDOODdHloNZ0DnjBOfuWboU0DH1oqUicASRFQpdDsAN4ly4KCRYdC6vzBzu5JrqTN/VtI27Ggj+OofNfoA86WDT84ICJFfDXDkBH4LkVVMcIntS9zSZ5RiXefSICBUGcN2bfgvh2Wv8Z5P5/wIOmTGwIDAQAB";
    private /* synthetic */ LicenseDataStrategy G;
    private /* synthetic */ LicenseFileStrategy b;

    public LicenseService(KeyPairStrategy a, LicenseDataStrategy a2, LicenseExpireStrategy a3, LicenseFileStrategy a4) {
        LicenseService a5;
        LicenseService licenseService = a5;
        LicenseService licenseService2 = a5;
        licenseService2.k = a;
        licenseService2.G = a2;
        licenseService.a = a3;
        licenseService.b = a4;
    }

    public void loadLicense(String a3) throws LicenseException {
        LicenseService a2;
        a2.a();
        try {
            a2.i = Base64.getDecoder().decode(a3);
            a2.A = a2.G.parseLicenseData(a2.i, publicKey, a2.k);
            if (null == a2.A) {
                throw new LicenseException(JSONUtils.J("gdhhe~n\u658a\u4efd\u6727\u52ab\u8f70"));
            }
        }
        catch (Exception a3) {
            log.error(a3.getMessage(), a3);
            a2.a.invalid(a3);
        }
    }

    private /* synthetic */ void a() {
        LicenseService a;
        if (null == a.a) {
            LicenseService licenseService = a;
            licenseService.a = new DefaultLicenseExpireStrategy();
        }
        if (null == a.k) {
            a.k = new DefaultKeyPairStrategy();
        }
        if (null == a.G) {
            a.G = new DefaultLicenseDataStrategy();
        }
        if (null == a.b) {
            a.b = new DefaultLicenseFileStrategy();
        }
    }

    public LicenseService() {
        LicenseService a;
    }

    public LicenseService(KeyPairStrategy a, LicenseDataStrategy a2, LicenseExpireStrategy a3) {
        LicenseService a4;
        LicenseService licenseService = a4;
        a4.k = a;
        licenseService.G = a2;
        licenseService.a = a3;
    }

    public void loadLicense() throws LicenseException {
        LicenseService a;
        a.a();
        try {
            LicenseService licenseService = a;
            licenseService.i = licenseService.b.parseLicenseFile();
            licenseService.A = licenseService.G.parseLicenseData(a.i, publicKey, a.k);
            if (null == a.A) {
                throw new LicenseException(EpFileServerUtil.J("=12=?+4\u65df\u4ea7\u6772\u52f1\u8f25"));
            }
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
            a.a.invalid(exception);
        }
    }

    public LicenseService(KeyPairStrategy a) {
        LicenseService a2;
        a2.k = a;
    }

    public LicenseEntity getLicenseEntity() throws LicenseException {
        LicenseService a;
        if (null == a.A) {
            throw new LicenseException(JSONUtils.J("gdhhe~n\u658a\u4efd\u6727\u52ab\u8f70"));
        }
        return a.A;
    }

    public LicenseService(LicenseExpireStrategy a) {
        LicenseService a2;
        a2.a = a;
    }

    public LicenseService(LicenseDataStrategy a) {
        LicenseService a2;
        a2.G = a;
    }

    public LicenseService(KeyPairStrategy a, LicenseExpireStrategy a2) {
        LicenseService a3;
        LicenseService licenseService = a3;
        licenseService.k = a;
        licenseService.a = a2;
    }

    public LicenseService(LicenseDataStrategy a, LicenseExpireStrategy a2, LicenseFileStrategy a3) {
        LicenseService a4;
        LicenseService licenseService = a4;
        a4.G = a;
        licenseService.a = a2;
        licenseService.b = a3;
    }

    private /* synthetic */ void J() throws LicenseException {
        LicenseService a;
        Thread thread = new Thread(() -> {
            LicenseService licenseService;
            LicenseService a;
            try {
                Thread.sleep(a.A.getExpireTime() - System.currentTimeMillis());
                licenseService = a;
            }
            catch (Exception exception) {
                log.error(exception.getMessage(), exception);
                LicenseService licenseService2 = a;
                licenseService = licenseService2;
                exception.printStackTrace();
                licenseService2.a.expire();
            }
            licenseService.a.expire();
        }, EpFileServerUtil.J("\u00148;46\"=\u001c7?1%7#u59%="));
        thread.setDaemon(true);
        thread.start();
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.license.app;

import com.epoint.ztb.license.app.entity.LicenseEntity;
import com.epoint.ztb.license.app.exception.LicenseException;
import com.epoint.ztb.license.app.strategy.DefaultKeyPairStrategy;
import com.epoint.ztb.license.app.strategy.DefaultLicenseDataStrategy;
import com.epoint.ztb.license.app.strategy.DefaultLicenseExpireStrategy;
import com.epoint.ztb.license.app.strategy.DefaultLicenseFileStrategy;
import com.epoint.ztb.license.app.strategy.base.KeyPairStrategy;
import com.epoint.ztb.license.app.strategy.base.LicenseDataStrategy;
import com.epoint.ztb.license.app.strategy.base.LicenseExpireStrategy;
import com.epoint.ztb.license.app.strategy.base.LicenseFileStrategy;
import java.util.Base64;

public class LicenseService {
    private KeyPairStrategy keyPairStrategy;
    private LicenseDataStrategy licenseDataStrategy;
    private LicenseExpireStrategy licenseExpireStrategy;
    private LicenseFileStrategy licenseFileStrategy;
    private static final String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5WtX63fHsMTDbLj2Z2ldkDOODdHloNZ0DnjBOfuWboU0DH1oqUicASRFQpdDsAN4ly4KCRYdC6vzBzu5JrqTN/VtI27Ggj+OofNfoA86WDT84ICJFfDXDkBH4LkVVMcIntS9zSZ5RiXefSICBUGcN2bfgvh2Wv8Z5P5/wIOmTGwIDAQAB";
    private byte[] licenseDataBytes;
    private LicenseEntity licenseEntity;

    public LicenseService(KeyPairStrategy keyPairStrategy, LicenseDataStrategy licenseDataStrategy, LicenseExpireStrategy licenseExpireStrategy, LicenseFileStrategy licenseFileStrategy) {
        this.keyPairStrategy = keyPairStrategy;
        this.licenseDataStrategy = licenseDataStrategy;
        this.licenseExpireStrategy = licenseExpireStrategy;
        this.licenseFileStrategy = licenseFileStrategy;
    }

    public LicenseService(LicenseDataStrategy licenseDataStrategy, LicenseExpireStrategy licenseExpireStrategy, LicenseFileStrategy licenseFileStrategy) {
        this.licenseDataStrategy = licenseDataStrategy;
        this.licenseExpireStrategy = licenseExpireStrategy;
        this.licenseFileStrategy = licenseFileStrategy;
    }

    public LicenseService(KeyPairStrategy keyPairStrategy, LicenseExpireStrategy licenseExpireStrategy) {
        this.keyPairStrategy = keyPairStrategy;
        this.licenseExpireStrategy = licenseExpireStrategy;
    }

    public LicenseService(KeyPairStrategy keyPairStrategy) {
        this.keyPairStrategy = keyPairStrategy;
    }

    public LicenseService(LicenseExpireStrategy licenseExpireStrategy) {
        this.licenseExpireStrategy = licenseExpireStrategy;
    }

    public LicenseService(LicenseDataStrategy licenseDataStrategy) {
        this.licenseDataStrategy = licenseDataStrategy;
    }

    public LicenseService(KeyPairStrategy keyPairStrategy, LicenseDataStrategy licenseDataStrategy, LicenseExpireStrategy licenseExpireStrategy) {
        this.keyPairStrategy = keyPairStrategy;
        this.licenseDataStrategy = licenseDataStrategy;
        this.licenseExpireStrategy = licenseExpireStrategy;
    }

    public LicenseService() {
    }

    public void loadLicense() throws LicenseException {
        this.init();
        try {
            this.licenseDataBytes = this.licenseFileStrategy.parseLicenseFile();
            this.licenseEntity = this.licenseDataStrategy.parseLicenseData(this.licenseDataBytes, publicKey, this.keyPairStrategy);
            if (null == this.licenseEntity) {
                throw new LicenseException("license\u6587\u4ef6\u672a\u52a0\u8f7d");
            }
        }
        catch (Exception e) {
            this.licenseExpireStrategy.invalid(e);
        }
    }

    public void loadLicense(String lic) throws LicenseException {
        this.init();
        try {
            this.licenseDataBytes = Base64.getDecoder().decode(lic);
            this.licenseEntity = this.licenseDataStrategy.parseLicenseData(this.licenseDataBytes, publicKey, this.keyPairStrategy);
            if (null == this.licenseEntity) {
                throw new LicenseException("license\u6587\u4ef6\u672a\u52a0\u8f7d");
            }
        }
        catch (Exception e) {
            this.licenseExpireStrategy.invalid(e);
        }
    }

    private void init() {
        if (null == this.licenseExpireStrategy) {
            this.licenseExpireStrategy = new DefaultLicenseExpireStrategy();
        }
        if (null == this.keyPairStrategy) {
            this.keyPairStrategy = new DefaultKeyPairStrategy();
        }
        if (null == this.licenseDataStrategy) {
            this.licenseDataStrategy = new DefaultLicenseDataStrategy();
        }
        if (null == this.licenseFileStrategy) {
            this.licenseFileStrategy = new DefaultLicenseFileStrategy();
        }
    }

    public LicenseEntity getLicenseEntity() throws LicenseException {
        if (null == this.licenseEntity) {
            throw new LicenseException("license\u6587\u4ef6\u672a\u52a0\u8f7d");
        }
        return this.licenseEntity;
    }

    private void monitorExpireThread() throws LicenseException {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(this.licenseEntity.getExpireTime() - System.currentTimeMillis());
            }
            catch (Exception e) {
                e.printStackTrace();
                this.licenseExpireStrategy.expire();
            }
            this.licenseExpireStrategy.expire();
        }, "LicenseMonitor-date");
        thread.setDaemon(true);
        thread.start();
    }
}


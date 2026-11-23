/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.strategy;

import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.license.app.entity.LicenseEntity;
import com.epoint.epsignature.license.app.exception.LicenseException;
import com.epoint.epsignature.license.app.strategy.base.KeyPairStrategy;
import com.epoint.epsignature.license.app.strategy.base.LicenseDataStrategy;
import com.epoint.epsignature.license.app.util.Md5;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.OutputStream;
import java.util.Base64;
import org.apache.log4j.Logger;

public class DefaultLicenseDataStrategy
implements LicenseDataStrategy {
    private static Logger log = Logger.getLogger(DefaultLicenseDataStrategy.class);

    private /* synthetic */ void J(InputStream a3, LicenseEntity a2) throws IOException, LicenseException {
        byte[] byArray = new byte[a2.getSplitMark().length];
        a3.read(byArray);
        int a3 = 0;
        int n = a3;
        while (n < byArray.length) {
            if (byArray[a3] != a2.getSplitMark()[a3]) {
                throw new LicenseException(CertObject.J("z|upxfs\u6565\u6378\u5f17\u5e2e"));
            }
            n = ++a3;
        }
    }

    public DefaultLicenseDataStrategy() {
        DefaultLicenseDataStrategy a;
    }

    @Override
    public LicenseEntity parseLicenseData(byte[] a5, String a2, KeyPairStrategy a3) throws LicenseException {
        Object object;
        byte[] byArray;
        DefaultLicenseDataStrategy a4;
        a5 = new ByteArrayInputStream((byte[])a5);
        Object object2 = new byte[LicenseEntity.MAGIC_MARK.length];
        ((InputStream)a5).read((byte[])object2);
        a4.J((byte[])object2, LicenseEntity.MAGIC_MARK);
        object2 = new ObjectInputStream((InputStream)a5);
        LicenseEntity licenseEntity = (LicenseEntity)((ObjectInputStream)object2).readObject();
        Object object3 = object2;
        a4.J((InputStream)object3, licenseEntity);
        if (((ObjectInputStream)object3).readLong() > System.currentTimeMillis()) {
            throw new LicenseException(VerifyReq.J("\u000bR\u0004^\tH\u0002\u654b\u6309\u5f39\u5e5f"));
        }
        long l2 = ((ObjectInputStream)object2).readLong();
        if (l2 != licenseEntity.getExpireTime()) {
            throw new LicenseException(CertObject.J("z|upxfs\u6565\u6378\u5f17\u5e2e"));
        }
        if (l2 < System.currentTimeMillis()) {
            throw new LicenseException(VerifyReq.J("W\u000eX\u0002U\u0014^\u5d95\u8ffc\u6778"));
        }
        a4.J((InputStream)object2, licenseEntity);
        Object object4 = object2;
        Object object5 = new byte[((ObjectInputStream)object4).read()];
        ((InputStream)object4).read((byte[])object5);
        DefaultLicenseDataStrategy defaultLicenseDataStrategy = a4;
        defaultLicenseDataStrategy.J((byte[])object5, licenseEntity.getPublicKeys());
        defaultLicenseDataStrategy.J((InputStream)object2, licenseEntity);
        object5 = new ByteArrayOutputStream();
        int n = 0;
        while ((n = ((ObjectInputStream)object2).read()) != 0) {
            byArray = new byte[n];
            object = a3.decode(byArray, licenseEntity.getPublicKeys());
            Object object6 = object2;
            ((InputStream)object2).read(byArray);
            object5.write((byte[])object);
            a4.J((InputStream)object6, licenseEntity);
            if (((ObjectInputStream)object6).readLong() == l2 % (long)((Object)object).length) continue;
            throw new LicenseException(CertObject.J("z|upxfs\u6565\u6378\u5f17\u5e2e"));
        }
        byArray = object5.toByteArray();
        if (!Md5.md5(byArray).equals(licenseEntity.getMd5())) {
            throw new LicenseException(VerifyReq.J("\u000bR\u0004^\tH\u0002\u654b\u6309\u5f39\u5e5f"));
        }
        object = new ByteArrayOutputStream();
        Object object7 = object2 = new ByteArrayInputStream(byArray);
        while (((ByteArrayInputStream)object7).available() > 0) {
            Object object8 = object2;
            object7 = object8;
            byte[] byArray2 = new byte[((ByteArrayInputStream)object8).read()];
            object5 = byArray2;
            ((InputStream)object8).read(byArray2);
            ((OutputStream)object).write(a3.decode((byte[])object5, Base64.getDecoder().decode(a2)));
        }
        try {
            licenseEntity.setSourceData(((ByteArrayOutputStream)object).toByteArray());
            return licenseEntity;
        }
        catch (LicenseException a5) {
            log.error(a5.getMessage(), a5);
            throw new LicenseException(a5.getMessage());
        }
        catch (Exception a5) {
            log.error(a5.getMessage(), a5);
            a5.printStackTrace();
            throw new LicenseException(CertObject.J("\u9ece\u8bb1\u7b40\u7570;y\u007ffupxfs\u6565\u6378\u89f6\u6786\u5924\u8d33"));
        }
    }

    private /* synthetic */ void J(byte[] a, byte[] a2) throws LicenseException {
        int n;
        if (a.length != a2.length) {
            throw new LicenseException(VerifyReq.J("\u000bR\u0004^\tH\u0002\u654b\u6309\u5f39\u5e5f"));
        }
        int n2 = n = 0;
        while (n2 < a.length) {
            if (a[n] != a2[n]) {
                throw new LicenseException(CertObject.J("z|upxfs\u6565\u6378\u5f17\u5e2e"));
            }
            n2 = ++n;
        }
    }
}


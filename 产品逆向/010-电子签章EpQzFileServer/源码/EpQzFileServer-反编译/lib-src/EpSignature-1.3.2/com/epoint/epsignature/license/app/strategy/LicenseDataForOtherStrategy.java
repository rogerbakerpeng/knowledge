/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.strategy;

import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.license.app.entity.LicenseEntity;
import com.epoint.epsignature.license.app.exception.LicenseException;
import com.epoint.epsignature.license.app.strategy.base.KeyPairStrategy;
import com.epoint.epsignature.license.app.strategy.base.LicenseDataStrategy;
import com.epoint.epsignature.license.app.util.Md5;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.TZGMVerifyPdf;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Base64;
import org.apache.log4j.Logger;

public class LicenseDataForOtherStrategy
implements LicenseDataStrategy {
    private static Logger log = Logger.getLogger(LicenseDataForOtherStrategy.class);

    public LicenseDataForOtherStrategy() {
        LicenseDataForOtherStrategy a;
    }

    @Override
    public LicenseEntity parseLicenseData(byte[] a5, String a2, KeyPairStrategy a3) throws LicenseException {
        Object object;
        LicenseDataForOtherStrategy a4;
        a5 = new ByteArrayInputStream((byte[])a5);
        Object object2 = new byte[LicenseEntity.MAGIC_MARK.length];
        ((InputStream)a5).read((byte[])object2);
        a4.J((byte[])object2, LicenseEntity.MAGIC_MARK);
        object2 = new byte[Integer.parseInt(new String(a4.J((ByteArrayInputStream)a5)))];
        ((InputStream)a5).read((byte[])object2);
        object2 = JSONUtils.json2bean(new String((byte[])object2), LicenseEntity.class);
        if (Long.parseLong(new String(a4.J((ByteArrayInputStream)a5))) > System.currentTimeMillis()) {
            throw new LicenseException(CertObject.J("z|upxfs\u6565\u6378\u5f17\u5e2e"));
        }
        long l2 = Long.parseLong(new String(a4.J((ByteArrayInputStream)a5)));
        if (l2 != ((LicenseEntity)object2).getExpireTime()) {
            throw new LicenseException(TZGMVerifyPdf.J("|\rs\u0001~\u0017u\u6514\u637e\u5f66\u5e28"));
        }
        if (l2 < System.currentTimeMillis()) {
            throw new LicenseException(CertObject.J("y\u007fvs{ep\u5de4\u8fd2\u6709"));
        }
        Object object3 = new byte[Integer.parseInt(new String(a4.J((ByteArrayInputStream)a5)))];
        Object object4 = a5;
        Object object5 = object4;
        ((InputStream)object4).read((byte[])object3);
        a4.J((byte[])object3, ((LicenseEntity)object2).getPublicKeys());
        object3 = new ByteArrayOutputStream();
        int n = 0;
        while ((n = ((ByteArrayInputStream)object5).read()) != 0) {
            byte[] byArray = new byte[n];
            Object object6 = a5;
            object5 = object6;
            ((InputStream)object6).read(byArray);
            object = a3.decode(byArray, ((LicenseEntity)object2).getPublicKeys());
            ((OutputStream)object3).write((byte[])object);
        }
        byte[] byArray = ((ByteArrayOutputStream)object3).toByteArray();
        if (!Md5.md5(byArray).equals(((LicenseEntity)object2).getMd5())) {
            throw new LicenseException(TZGMVerifyPdf.J("|\rs\u0001~\u0017u\u6514\u637e\u5f66\u5e28"));
        }
        object = new ByteArrayOutputStream();
        Object object7 = object3 = new ByteArrayInputStream(byArray);
        while (((ByteArrayInputStream)object7).available() > 0) {
            Object object8 = object3;
            object7 = object8;
            byte[] byArray2 = new byte[((ByteArrayInputStream)object8).read()];
            ((InputStream)object8).read(byArray2);
            ((OutputStream)object).write(a3.decode(byArray2, Base64.getDecoder().decode(a2)));
        }
        try {
            ((LicenseEntity)object2).setSourceData(((ByteArrayOutputStream)object).toByteArray());
            return object2;
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
            throw new LicenseException(TZGMVerifyPdf.J("|\rs\u0001~\u0017u\u6514\u637e\u5f66\u5e28"));
        }
        int n2 = n = 0;
        while (n2 < a.length) {
            if (a[n] != a2[n]) {
                throw new LicenseException(CertObject.J("z|upxfs\u6565\u6378\u5f17\u5e2e"));
            }
            n2 = ++n;
        }
    }

    private /* synthetic */ byte[] J(ByteArrayInputStream a) throws IOException {
        ByteArrayInputStream byteArrayInputStream = a;
        byte[] byArray = new byte[byteArrayInputStream.read()];
        a = byArray;
        byteArrayInputStream.read(byArray);
        return a;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.tool;

import com.epoint.epsignature.asn1.SealFactory;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.tool.SM2SealMaker;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.EpFileServerUtil;
import com.epoint.epsignature.utils.IOUtils;
import com.epoint.gmhelper.bouncycastle.jce.provider.BouncyCastleProvider;
import com.epoint.gmhelper.cert.SM2CertUtil;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.UUID;
import org.apache.log4j.Logger;

public class MakeSealTool {
    private static Logger log = Logger.getLogger(MakeSealTool.class);

    private static /* synthetic */ void J(String a, byte[] a2, String a3, String a4) throws Exception {
        a3 = a3.split(a4)[0].replace(EpFileServerUtil.J("<9:=\"=04"), BaseResp.J("/;4>5:"));
        IOUtils.write2File(a2, a3, a);
    }

    public static void main(String[] a) {
        block6: {
            if (a.length != 2) break block6;
            SealFactory sealFactory = new SealFactory(new SM2SealMaker());
            new MakeSealTool().extracted(sealFactory, a[0], a[1]);
            return;
        }
        try {
            if (a.length == 4) {
                byte[] byArray = IOUtils.getBytes(new StringBuilder().insert(0, a[2]).append(EpFileServerUtil.J("\u007f(7 ")).toString());
                SealFactory sealFactory = new SealFactory(new SM2SealMaker(Base64Util.encode(byArray), a[3]));
                new MakeSealTool().extracted(sealFactory, a[0], a[1]);
                return;
            }
        }
        catch (CertificateException certificateException) {
            log.error(certificateException.getMessage(), certificateException);
            return;
        }
        catch (NoSuchProviderException noSuchProviderException) {
            log.error(noSuchProviderException.getMessage(), noSuchProviderException);
            return;
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
        }
    }

    public void extracted(SealFactory a, String a2, String a3) throws CertificateException, NoSuchProviderException, Exception {
        byte[] byArray = null;
        String string = UUID.randomUUID().toString();
        String string2 = a2.split(BaseResp.J("\u001c\u0012"))[a2.split(EpFileServerUtil.J("\r\u0004")).length - 1];
        byte[] byArray2 = IOUtils.getBytes(new StringBuilder().insert(0, a2).append(BaseResp.J("n-%<")).toString());
        a3 = IOUtils.getBytes(new StringBuilder().insert(0, (String)a3).append(EpFileServerUtil.J("\u007f(??")).toString());
        Security.addProvider(new BouncyCastleProvider());
        Object object = new ByteArrayInputStream(byArray2);
        CertificateFactory certificateFactory = CertificateFactory.getInstance(BaseResp.J("\u0016n{pw"), EpFileServerUtil.J("\u0014\b\u0013\u001b"));
        object = (X509Certificate)certificateFactory.generateCertificate((InputStream)object);
        if (object == null) {
            object = (X509Certificate)certificateFactory.generateCertificate(new ByteArrayInputStream(Base64Util.decode(new String(byArray2))));
        }
        log.info(new StringBuilder().insert(0, BaseResp.J("\u8b8f\u4e26\u4faf\u602f\uff54")).append(((X509Certificate)object).getSubjectDN().toString()).toString());
        object = SM2CertUtil.getX509Certificate(byArray2);
        if (object == null) {
            object = SM2CertUtil.getX509Certificate(Base64Util.decode(new String(byArray2)));
        }
        Certificate[] certificateArray = new Certificate[1];
        certificateArray[0] = object;
        byArray = a.makeSeal(string, 1, string2, EpFileServerUtil.J("\u007f(??"), (byte[])a3, certificateArray, 12);
        MakeSealTool.J(new StringBuilder().insert(0, string2).append(BaseResp.J("n+3\"")).toString(), byArray, a2, string2);
    }

    public MakeSealTool() {
        MakeSealTool a;
    }
}


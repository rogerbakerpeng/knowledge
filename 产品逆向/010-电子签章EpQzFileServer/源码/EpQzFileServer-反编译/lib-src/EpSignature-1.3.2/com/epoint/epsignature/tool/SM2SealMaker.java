/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.tool;

import com.epoint.epsignature.asn1.SealMaker;
import com.epoint.epsignature.bean.annotation.PDFAnnotationReq;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.gm.util.Base64Util;
import com.epoint.itextpdf.text.pdf.security.PrivateKeySignature;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.Security;
import java.security.cert.Certificate;
import java.util.Date;
import org.apache.log4j.Logger;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

public class SM2SealMaker
implements SealMaker {
    private static Logger logger = Logger.getLogger(SM2SealMaker.class);
    public PrivateKey pk;
    public Certificate[] chain;
    public static final String PFXBASE64 = "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";

    public byte[] sign(byte[] a) throws Exception {
        SM2SealMaker a2;
        String string = "SM3";
        return new PrivateKeySignature(a2.pk, string, null).sign(a);
    }

    @Override
    public Date getSignDate() {
        return new Date();
    }

    public void initCert(String a, String a2) {
        try {
            Security.addProvider(new BouncyCastleProvider());
            KeyStore keyStore = KeyStore.getInstance(DZYYZZReq.J("h){1\tP"));
            a2 = ((String)a2).toCharArray();
            a = new ByteArrayInputStream(Base64Util.decode((String)a));
            keyStore.load((InputStream)a, (char[])a2);
            a = keyStore.aliases().nextElement();
            a.pk = (PrivateKey)keyStore.getKey((String)a, (char[])a2);
            a.chain = keyStore.getCertificateChain((String)a);
            return;
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            return;
        }
    }

    static {
        Security.removeProvider(PDFAnnotationReq.J("\u00141)\u0001\u0004"));
    }

    @Override
    public Certificate getCertificate() {
        SM2SealMaker a;
        return a.chain[0];
    }

    public SM2SealMaker(String a, String a2) {
        SM2SealMaker a3;
        a3.pk = null;
        a3.chain = null;
        a3.initCert(a, a2);
    }

    @Override
    public String getSignatureAlg() {
        return "1.2.156.10197.1.501";
    }

    public SM2SealMaker() {
        SM2SealMaker a;
        a.pk = null;
        a.chain = null;
        a.initCert(PFXBASE64, "12345678");
    }

    @Override
    public byte[] signData(byte[] a3) {
        try {
            SM2SealMaker a2;
            return a2.sign(a3);
        }
        catch (Exception a3) {
            logger.error(a3.getMessage(), a3);
            return null;
        }
    }
}


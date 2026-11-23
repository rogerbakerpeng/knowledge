/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.v4;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.gmhelper.BCECUtil;
import com.epoint.gmhelper.SM2Util;
import com.epoint.gmhelper.bouncycastle.asn1.pkcs.ContentInfo;
import com.epoint.gmhelper.bouncycastle.asn1.pkcs.PKCSObjectIdentifiers;
import com.epoint.gmhelper.bouncycastle.cert.X509CertificateHolder;
import com.epoint.gmhelper.bouncycastle.jcajce.provider.asymmetric.ec.BCECPrivateKey;
import com.epoint.gmhelper.bouncycastle.jcajce.provider.asymmetric.ec.BCECPublicKey;
import com.epoint.gmhelper.bouncycastle.jce.interfaces.ECPublicKey;
import com.epoint.gmhelper.bouncycastle.jce.provider.BouncyCastleProvider;
import com.epoint.gmhelper.bouncycastle.jce.spec.ECParameterSpec;
import com.epoint.gmhelper.bouncycastle.jce.spec.ECPublicKeySpec;
import com.epoint.gmhelper.bouncycastle.math.ec.ECPoint;
import com.epoint.gmhelper.bouncycastle.operator.InputDecryptorProvider;
import com.epoint.gmhelper.bouncycastle.pkcs.PKCS12PfxPdu;
import com.epoint.gmhelper.bouncycastle.pkcs.PKCS12SafeBagFactory;
import com.epoint.gmhelper.bouncycastle.pkcs.PKCS8EncryptedPrivateKeyInfo;
import com.epoint.gmhelper.bouncycastle.pkcs.jcajce.JcePKCSPBEInputDecryptorProviderBuilder;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.NoSuchProviderException;
import java.security.PublicKey;
import java.security.Security;
import java.security.cert.CertPath;
import java.security.cert.CertificateEncodingException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.List;

public class SM2CertUtil {
    public static X509Certificate getX509Certificate(byte[] a) throws CertificateException, NoSuchProviderException {
        return SM2CertUtil.getX509Certificate(new ByteArrayInputStream(a));
    }

    public static CertPath getCertificateChain(byte[] a) throws CertificateException, NoSuchProviderException {
        return SM2CertUtil.getCertificateChain(new ByteArrayInputStream(a));
    }

    public static boolean verifyCertificate(BCECPublicKey a, X509Certificate a22) {
        try {
            a22.verify((PublicKey)a, PDFHighlightAnnotationReq.J("HYOJ"));
        }
        catch (Exception a22) {
            return false;
        }
        return true;
    }

    public static CertPath getCertificateChain(String a) throws IOException, CertificateException, NoSuchProviderException {
        try (FileInputStream fileInputStream = null;){
            fileInputStream = new FileInputStream(a);
            CertPath certPath = SM2CertUtil.getCertificateChain(fileInputStream);
            return certPath;
        }
    }

    public static BCECPrivateKey getPrivateKeyFromPfx(byte[] a, String a2) throws Exception {
        int n;
        a2 = new JcePKCSPBEInputDecryptorProviderBuilder().setProvider(EpOFDData.J("\u000fv\be")).build(((String)a2).toCharArray());
        ContentInfo[] contentInfoArray = new PKCS12PfxPdu(a).getContentInfos();
        if (contentInfoArray.length != 2) {
            throw new Exception(PDFHighlightAnnotationReq.J("Fcet)~|}yb{y)bgh)}hd{-Jbgylc}Dgkf"));
        }
        int n2 = n = 0;
        while (n2 != contentInfoArray.length) {
            if (!contentInfoArray[n].getContentType().equals(PKCSObjectIdentifiers.encryptedData)) {
                return BCECUtil.convertPKCS8ToECPrivateKey(((PKCS8EncryptedPrivateKeyInfo)new PKCS12SafeBagFactory(contentInfoArray[n]).getSafeBags()[0].getBagValue()).decryptPrivateKeyInfo((InputDecryptorProvider)a2).getEncoded());
            }
            n2 = ++n;
        }
        throw new Exception(EpOFDData.J("h%Rj@%S$Bjv8O<G>Cjm/_jO$\u0006>N#UjV,^"));
    }

    public static byte[] InputStream2ByteArray(String a) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(a);
        byte[] byArray = SM2CertUtil.toByteArray(fileInputStream);
        ((InputStream)fileInputStream).close();
        return byArray;
    }

    public static X509Certificate getX509CertificateFromPfx(byte[] a, String a2) throws Exception {
        int n;
        a2 = new JcePKCSPBEInputDecryptorProviderBuilder().setProvider(PDFHighlightAnnotationReq.J("HYOJ")).build(((String)a2).toCharArray());
        ContentInfo[] contentInfoArray = new PKCS12PfxPdu(a).getContentInfos();
        if (contentInfoArray.length != 2) {
            throw new Exception(EpOFDData.J("i$J3\u00069S:V%T>\u0006%H/\u0006:G#Tje%H>C$R\u0003H,I"));
        }
        int n2 = n = 0;
        while (n2 != contentInfoArray.length) {
            if (contentInfoArray[n].getContentType().equals(PKCSObjectIdentifiers.encryptedData)) {
                return SM2CertUtil.getX509Certificate(((X509CertificateHolder)new PKCS12SafeBagFactory(contentInfoArray[n], (InputDecryptorProvider)a2).getSafeBags()[0].getBagValue()).getEncoded());
            }
            n2 = ++n;
        }
        throw new Exception(PDFHighlightAnnotationReq.J("Gb}-ob|cm-Q894Jh{y`k`nhyl-`c)yadz-ykq"));
    }

    public static BCECPublicKey getBCECPublicKey(X509Certificate a) {
        ECPublicKey eCPublicKey = (ECPublicKey)a.getPublicKey();
        Object object = eCPublicKey.getQ();
        ECParameterSpec eCParameterSpec = new ECParameterSpec(SM2Util.CURVE, SM2Util.G_POINT, SM2Util.SM2_ECC_N, SM2Util.SM2_ECC_H);
        object = new ECPublicKeySpec((ECPoint)object, eCParameterSpec);
        return new BCECPublicKey(eCPublicKey.getAlgorithm(), (ECPublicKeySpec)object, BouncyCastleProvider.CONFIGURATION);
    }

    static {
        if (Security.getProvider(EpOFDData.J("\u000fv\be")) == null) {
            Security.insertProviderAt(new BouncyCastleProvider(), 0);
        }
    }

    public static X509Certificate getX509Certificate(String a) throws IOException, CertificateException, NoSuchProviderException {
        try (FileInputStream fileInputStream = null;){
            fileInputStream = new FileInputStream(a);
            X509Certificate x509Certificate = SM2CertUtil.getX509Certificate(fileInputStream);
            return x509Certificate;
        }
    }

    public static void main(String[] a) throws Exception {
        Object object = PDFHighlightAnnotationReq.J("<8<8<8");
        Object object2 = "12345678";
        object2 = EpOFDData.J("R+T-C>\t>C9RdV,^");
        object2 = SM2CertUtil.getPublicKeyFromPfx(SM2CertUtil.InputStream2ByteArray(PDFHighlightAnnotationReq.J("M7&<;>=8?#ykq")), (String)object);
        System.out.println(((BCECPublicKey)object2).toString());
        object = SM2CertUtil.getPrivateKeyFromPfx(SM2CertUtil.InputStream2ByteArray(EpOFDData.J("bp\t{\u0014y\u0012\u007f\u0010dV,^")), (String)object);
        System.out.println(object);
    }

    public SM2CertUtil() throws Exception {
        SM2CertUtil a;
    }

    public static CertPath getCertificateChain(List<X509Certificate> a) throws CertificateException, NoSuchProviderException {
        return CertificateFactory.getInstance(PDFHighlightAnnotationReq.J("Q#<=0"), EpOFDData.J("\u000fv\be")).generateCertPath(a);
    }

    public static byte[] getCertificateChainBytes(CertPath a) throws CertificateEncodingException {
        return a.getEncoded(PDFHighlightAnnotationReq.J("YFJ^>"));
    }

    public static BCECPublicKey getPublicKeyFromPfx(byte[] a, String a2) throws Exception {
        return SM2CertUtil.getBCECPublicKey(SM2CertUtil.getX509CertificateFromPfx(a, a2));
    }

    public static X509Certificate getX509Certificate(InputStream a) throws CertificateException, NoSuchProviderException {
        return (X509Certificate)CertificateFactory.getInstance(EpOFDData.J("~d\u0013z\u001f"), PDFHighlightAnnotationReq.J("HYOJ")).generateCertificate(a);
    }

    public static CertPath getCertificateChain(InputStream a) throws CertificateException, NoSuchProviderException {
        return CertificateFactory.getInstance(EpOFDData.J("~d\u0013z\u001f"), PDFHighlightAnnotationReq.J("HYOJ")).generateCertPath(a, EpOFDData.J("v\u0001e\u0019\u0011"));
    }

    public static byte[] toByteArray(InputStream a) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] byArray = new byte[4096];
        int n = 0;
        InputStream inputStream = a;
        while ((n = inputStream.read(byArray)) != -1) {
            inputStream = a;
            byteArrayOutputStream.write(byArray, 0, n);
        }
        return byteArrayOutputStream.toByteArray();
    }
}


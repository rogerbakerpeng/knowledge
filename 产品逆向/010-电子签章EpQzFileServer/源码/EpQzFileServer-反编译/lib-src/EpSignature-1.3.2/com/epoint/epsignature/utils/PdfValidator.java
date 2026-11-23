/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.gm.ses.v4.SES_Signature;
import com.epoint.epsignature.gm.ses.v4.TBS_Sign;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.EpFileServerUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.bizlogic.ConfigUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Encodable;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1InputStream;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Set;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1TaggedObject;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.itextpdf.text.io.RASInputStream;
import com.epoint.itextpdf.text.io.RandomAccessSourceFactory;
import com.epoint.itextpdf.text.pdf.AcroFields;
import com.epoint.itextpdf.text.pdf.PdfArray;
import com.epoint.itextpdf.text.pdf.PdfDictionary;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.PdfString;
import com.epoint.itextpdf.text.pdf.RandomAccessFileOrArray;
import com.epoint.itextpdf.text.pdf.security.MakeSignature;
import com.epoint.itextpdf.text.pdf.security.PdfPKCS7;
import java.io.ByteArrayInputStream;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.security.MessageDigest;
import java.security.Signature;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;
import org.bouncycastle.jcajce.provider.asymmetric.x509.CertificateFactory;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

public class PdfValidator {
    private /* synthetic */ String k;
    private static Logger log = Logger.getLogger(EpSignatureApi.class);
    private /* synthetic */ SES_Signature i;
    private static final PdfName EPSIGNATURE_SIG;
    private static final String EPITEXT_ACROFIELDS_CLASSPATH = "com.epoint.itextpdf.text.pdf.AcroFields";
    private static final String EP_H5_HASH_ALOG = "SM3";
    private static final boolean EPITEXT_HAS_GMV4MD;
    private /* synthetic */ StructType A;
    private /* synthetic */ PdfPKCS7 a;
    private static final String EPSIGNATURE_IS_INCREMENT_HASH;
    private /* synthetic */ AcroFields G;
    private /* synthetic */ PdfReader b;
    private static final String EPITEXT_GMV4MD_METH_NAME = "updateByteRangeOfGMV4";

    public void setSesSignature(SES_Signature a) {
        a.i = a;
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public String getSignData() {
        Serializable serializable;
        try {
            PdfValidator a;
            if (a.getStructtype().equals((Object)StructType.PKCS7)) {
                ASN1InputStream aSN1InputStream;
                PdfValidator pdfValidator = a;
                PdfDictionary pdfDictionary = pdfValidator.G.getSignatureDictionary(pdfValidator.k);
                serializable = pdfDictionary.getAsString(PdfName.CONTENTS);
                ASN1InputStream aSN1InputStream2 = new ASN1InputStream(new ByteArrayInputStream(((PdfString)serializable).getBytes()));
                ASN1Sequence aSN1Sequence = (ASN1Sequence)((ASN1Set)((ASN1Sequence)((ASN1TaggedObject)((ASN1Sequence)aSN1InputStream2.readObject()).getObjectAt(1)).getObject()).getObjectAt(4)).getObjectAt(0);
                byte[] byArray = null;
                if (aSN1Sequence.size() <= 5) {
                    ASN1Sequence aSN1Sequence2 = aSN1Sequence;
                    byArray = ((ASN1OctetString)aSN1Sequence2.getObjectAt(aSN1Sequence2.size() - 1)).getOctets();
                    aSN1InputStream = aSN1InputStream2;
                } else {
                    byArray = ((ASN1OctetString)aSN1Sequence.getObjectAt(5)).getOctets();
                    aSN1InputStream = aSN1InputStream2;
                }
                aSN1InputStream.close();
                return Base64Util.encode(byArray);
            }
            if (!a.getStructtype().equals((Object)StructType.ESESIGNATURE)) return "";
            byte[] byArray = a.i.getSignature().getOctets();
            return Base64Util.encode(byArray);
        }
        catch (Exception exception) {
            serializable = exception.getStackTrace()[0];
            Object[] objectArray = new Object[3];
            objectArray[0] = exception.getMessage();
            objectArray[1] = ((StackTraceElement)serializable).getFileName();
            objectArray[2] = ((StackTraceElement)serializable).getLineNumber();
            log.error(String.format(PDFHighlightAnnotationReq.J("]MK\u9a85\u7b73\u89ea\u679d\u7b77\u5400\u5035\u5f0f\u5e31\uff01\u9510\u8be2\u4fe8\u6062\uff13(z\uff01\u9510\u8be2\u4f44\u7f63\uff13(z\uff01,~\u300b"), objectArray));
        }
        return "";
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    private static /* synthetic */ boolean J() {
        boolean bl = false;
        try {
            Class<?> clazz = Class.forName(EPITEXT_ACROFIELDS_CLASSPATH);
            Method[] methodArray = clazz.getMethods();
            int n = methodArray.length;
            int n2 = 0;
            while (n2 < n) {
                Method method = methodArray[n2];
                if (EPITEXT_GMV4MD_METH_NAME.equals(method.getName())) {
                    return true;
                }
                ++n2;
            }
            return bl;
        }
        catch (Exception exception) {
            Object[] objectArray = new Object[1];
            objectArray[0] = exception.getMessage();
            log.error(String.format(BaseReq.J("6B:F\u0016J\u0007b7tSX\u0012@\u5376\u56cf\u5bb5dG\u646a\u89f2\u658b\u6ca6\u661d\u5455\u5b6a\u575b\u5216\u65de\u5903\u8d56\bVA"), objectArray), exception);
        }
        return bl;
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static boolean parseP7SignedAndVerify(String a, String a2, String a3) {
        Object object;
        try {
            ASN1InputStream aSN1InputStream;
            ASN1InputStream aSN1InputStream2 = new ASN1InputStream(Base64Util.decode(a3));
            object = aSN1InputStream2.readObject();
            ASN1Sequence aSN1Sequence = (ASN1Sequence)((ASN1Set)((ASN1Sequence)((ASN1TaggedObject)((ASN1Sequence)object).getObjectAt(1)).getObject()).getObjectAt(4)).getObjectAt(0);
            byte[] byArray = null;
            if (aSN1Sequence.size() <= 5) {
                ASN1Sequence aSN1Sequence2 = aSN1Sequence;
                byArray = ((ASN1OctetString)aSN1Sequence2.getObjectAt(aSN1Sequence2.size() - 1)).getOctets();
                aSN1InputStream = aSN1InputStream2;
            } else {
                byArray = ((ASN1OctetString)aSN1Sequence.getObjectAt(5)).getOctets();
                aSN1InputStream = aSN1InputStream2;
            }
            aSN1InputStream.close();
            a3 = Base64Util.encode(byArray);
            return EpSignatureApi.verifySignIn(a, a2, a3);
        }
        catch (Exception exception) {
            object = exception.getStackTrace()[0];
            Object[] objectArray = new Object[3];
            objectArray[0] = exception.getMessage();
            objectArray[1] = ((StackTraceElement)object).getFileName();
            objectArray[2] = ((StackTraceElement)object).getLineNumber();
            log.error(String.format(PDFHighlightAnnotationReq.J("YIO\u9a81\u7b77\u8c0e\u657d\u9a81\u7b77\u7689\u7b77\u5400\u5035\u593c\u8d2c\uff01\u9510\u8be2\u4fe8\u6062\uff13(z\uff01\u9510\u8be2\u4f44\u7f63\uff13(z\uff01,~\u300b"), objectArray));
            return false;
        }
    }

    public boolean verifyV4Org() {
        try {
            PdfValidator a;
            if (a.getStructtype().equals((Object)StructType.ESESIGNATURE)) {
                PdfValidator pdfValidator = a;
                TBS_Sign tBS_Sign = pdfValidator.i.getToSign();
                PdfValidator pdfValidator2 = a;
                PdfDictionary pdfDictionary = pdfValidator.G.getSignatureDictionary(pdfValidator2.k);
                Object object = pdfDictionary.getAsArray(PdfName.BYTERANGE);
                byte[] byArray = tBS_Sign.getDataHash().getEncoded(BaseReq.J("v6`"));
                RandomAccessFileOrArray randomAccessFileOrArray = pdfValidator2.b.getSafeFile();
                byte[] byArray2 = new byte[Integer.parseInt(String.valueOf(randomAccessFileOrArray.length()))];
                randomAccessFileOrArray.read(byArray2);
                MessageDigest messageDigest = MessageDigest.getInstance(EP_H5_HASH_ALOG, new BouncyCastleProvider());
                messageDigest.update(byArray2, ((PdfArray)object).getAsNumber(0).intValue(), ((PdfArray)object).getAsNumber(1).intValue());
                if (((PdfArray)object).size() == 4) {
                    messageDigest.update(byArray2, ((PdfArray)object).getAsNumber(2).intValue(), ((PdfArray)object).getAsNumber(3).intValue());
                }
                object = messageDigest.digest();
                if (!Arrays.equals(byArray, (byte[])(object = (Object)new DERBitString((byte[])object).getEncoded(PDFHighlightAnnotationReq.J("MH["))))) {
                    log.error(BaseReq.J("\u53ad\u65f4\u5dc0\u88d8\u4fdc\u654a\uff3e%\u0006\u9aff\u7b4c\u5942\u8d17"));
                    return false;
                }
            }
        }
        catch (Exception exception) {
            StackTraceElement stackTraceElement = exception.getStackTrace()[0];
            Object[] objectArray = new Object[3];
            objectArray[0] = exception.getMessage();
            objectArray[1] = stackTraceElement.getFileName();
            objectArray[2] = stackTraceElement.getLineNumber();
            log.error(String.format(PDFHighlightAnnotationReq.J("YIO\u9a81\u7b77\u5229\u65a4\u5392\u658e\u7ede\u678d\u6622\u542f\u8c0e\u657d\u593c\u8d2c\uff01\u9510\u8be2\u4fe8\u6062\uff13(z\uff01\u9510\u8be2\u4f44\u7f63\uff13(z\uff01,~\u300b"), objectArray));
        }
        return true;
    }

    public X509Certificate getSigningCertificate() {
        PdfValidator a;
        block4: {
            if (!a.getStructtype().equals((Object)StructType.PKCS7)) break block4;
            return a.a.getSigningCertificate();
        }
        try {
            if (a.getStructtype().equals((Object)StructType.ESESIGNATURE)) {
                byte[] byArray = a.i.getCert().getOctets();
                return CertUtils.getX509Certificate(byArray);
            }
        }
        catch (Exception exception) {
            StackTraceElement stackTraceElement = exception.getStackTrace()[0];
            Object[] objectArray = new Object[3];
            objectArray[0] = exception.getMessage();
            objectArray[1] = stackTraceElement.getFileName();
            objectArray[2] = stackTraceElement.getLineNumber();
            log.error(String.format(BaseReq.J("b7t\u9aff\u7b4c\u83c4\u53e4\u8bb2\u4e54\u6503\u635c\u5942\u8d17\uff7f\u952b\u8b9c\u4fd3\u601c\uff28VA\uff7f\u952b\u8b9c\u4f7f\u7f1d\uff28VA\uff7f\u0017\u0000\u3030"), objectArray));
        }
        return null;
    }

    private /* synthetic */ PdfValidator(PdfPKCS7 a, SES_Signature a2, AcroFields a3, String a4, PdfReader a5) {
        PdfValidator a6;
        PdfValidator pdfValidator = a6;
        PdfValidator pdfValidator2 = a6;
        a6.a = a;
        pdfValidator2.i = a2;
        pdfValidator2.G = a3;
        pdfValidator.k = a4;
        pdfValidator.b = a5;
    }

    public String getOrgData() {
        PdfValidator a;
        block5: {
            String string;
            block6: {
                if (!a.getStructtype().equals((Object)StructType.PKCS7)) break block5;
                string = a.a.getOrgData();
                if (!StringUtil.isBlank(string)) break block6;
                return "";
            }
            byte[] byArray = a.a.getAuthenticatedAttributeBytes(Base64Util.decode(string), null, null, MakeSignature.CryptoStandard.CMS);
            return Base64Util.encode(byArray);
        }
        try {
            if (a.getStructtype().equals((Object)StructType.ESESIGNATURE)) {
                PdfValidator pdfValidator = a;
                TBS_Sign tBS_Sign = pdfValidator.i.getToSign();
                byte[] byArray = pdfValidator.J();
                TBS_Sign tBS_Sign2 = tBS_Sign;
                tBS_Sign2.setDataHash(byArray);
                return Base64Util.encode(tBS_Sign2.getEncoded(PDFHighlightAnnotationReq.J("MH[")));
            }
        }
        catch (Exception exception) {
            StackTraceElement stackTraceElement = exception.getStackTrace()[0];
            Object[] objectArray = new Object[3];
            objectArray[0] = exception.getMessage();
            objectArray[1] = stackTraceElement.getFileName();
            objectArray[2] = stackTraceElement.getLineNumber();
            log.error(String.format(BaseReq.J("b7t\u9aff\u7b4c\u83c4\u53e4\u7b0d\u543f\u53ec\u65b5\u5942\u8d17\uff7f\u952b\u8b9c\u4fd3\u601c\uff28VA\uff7f\u952b\u8b9c\u4f7f\u7f1d\uff28VA\uff7f\u0017\u0000\u3030"), objectArray));
        }
        return "";
    }

    static {
        System.setProperty(PDFHighlightAnnotationReq.J("nf`'hyb`c}#n`ahe}l\u007f'ofxgnpnh~}al#h~g<'leafzVxg~hklR`c}hnh{"), BaseReq.J("\u0007@\u0006W"));
        EPITEXT_HAS_GMV4MD = PdfValidator.J();
        EPSIGNATURE_IS_INCREMENT_HASH = ConfigUtil.getConfigValue(PDFHighlightAnnotationReq.J("syk"), BaseReq.J("w#a:u=s'g!w,{ m:|0`6\u007f6|'m;s z"));
        EPSIGNATURE_SIG = new PdfName(PDFHighlightAnnotationReq.J("HYRD"));
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static boolean adjustSignedAndVerify(String a, String a2, String a3) {
        Object object;
        try {
            int n;
            ASN1InputStream aSN1InputStream = new ASN1InputStream(Base64Util.decode(a));
            object = aSN1InputStream.readObject();
            ASN1Encodable[] aSN1EncodableArray = ((ASN1Sequence)object).toArray();
            ASN1EncodableVector aSN1EncodableVector = new ASN1EncodableVector();
            int n2 = aSN1EncodableArray.length;
            int n3 = n = 0;
            while (n3 < n2) {
                ASN1Integer aSN1Integer = (ASN1Integer)aSN1EncodableArray[n];
                if (aSN1Integer.toString().contains(BaseReq.J("\u001f"))) {
                    byte[] byArray = new byte[33];
                    System.arraycopy(aSN1Integer.getEncoded(), 2, byArray, 1, 32);
                    ASN1Integer aSN1Integer2 = new ASN1Integer(byArray);
                    aSN1EncodableVector.add(aSN1Integer2);
                } else {
                    aSN1EncodableVector.add(aSN1Integer);
                }
                n3 = ++n;
            }
            aSN1InputStream.close();
            return EpSignatureApi.verifySignIn(a2, a3, Base64Util.encode(new DERSequence(aSN1EncodableVector).getEncoded()));
        }
        catch (Exception exception) {
            object = exception.getStackTrace()[0];
            Object[] objectArray = new Object[3];
            objectArray[0] = exception.getMessage();
            objectArray[1] = ((StackTraceElement)object).getFileName();
            objectArray[2] = ((StackTraceElement)object).getLineNumber();
            log.error(String.format(PDFHighlightAnnotationReq.J("YIO\u9a81\u7b77\u8c0e\u657d\u9a81\u7b77\u7689\u7b77\u5400\u5035\u593c\u8d2c\uff01\u9510\u8be2\u4fe8\u6062\uff13(z\uff01\u9510\u8be2\u4f44\u7f63\uff13(z\uff01,~\u300b"), objectArray));
            return false;
        }
    }

    public Map<String, String> getExDatas() {
        ASN1Sequence aSN1Sequence;
        PdfValidator a;
        HashMap<String, String> hashMap = new HashMap<String, String>();
        if (a.getStructtype().equals((Object)StructType.ESESIGNATURE) && (aSN1Sequence = (ASN1Sequence)a.i.getToSign().getExtDatas()) != null) {
            int n;
            int n2 = n = 0;
            while (n2 < aSN1Sequence.size()) {
                try {
                    ASN1Sequence aSN1Sequence2 = (ASN1Sequence)aSN1Sequence.getObjectAt(n);
                    hashMap.put(aSN1Sequence2.getObjectAt(0).toString(), aSN1Sequence2.getObjectAt(1).toString());
                }
                catch (Exception exception) {
                    log.error(BaseReq.J("\u89d1\u67e3\u98af\u53b1\u6542\u5942\u8d17"), exception);
                }
                n2 = ++n;
            }
        }
        return hashMap;
    }

    public boolean verify() {
        block6: {
            Object object;
            Object object2;
            TBS_Sign tBS_Sign;
            PdfValidator a;
            block7: {
                block5: {
                    if (!a.getStructtype().equals((Object)StructType.PKCS7)) break block5;
                    return a.a.verify();
                }
                if (!a.getStructtype().equals((Object)StructType.ESESIGNATURE)) break block6;
                PdfValidator pdfValidator = a;
                tBS_Sign = pdfValidator.i.getToSign();
                object2 = tBS_Sign.getDataHash().getEncoded(PDFHighlightAnnotationReq.J("MH["));
                object = pdfValidator.J();
                if (Arrays.equals((byte[])object2, (byte[])(object = new DERBitString((byte[])object).getEncoded(BaseReq.J("v6`"))))) break block7;
                log.error(PDFHighlightAnnotationReq.J("\u5396\u658a\u5dfb\u88a6\u4fe7\u6534\uff05[=\u9a81\u7b77\u593c\u8d2c"));
                return false;
            }
            try {
                PdfValidator pdfValidator = a;
                object = pdfValidator.i.getCert().getOctets();
                Certificate certificate = new CertificateFactory().engineGenerateCertificate(new ByteArrayInputStream((byte[])object));
                byte[] byArray = pdfValidator.i.getSignature().getOctets();
                X509Certificate x509Certificate = SM2CertUtil.getX509Certificate((byte[])object);
                object = x509Certificate;
                String string = StringUtil.isNotBlank(x509Certificate.getSigAlgName()) ? ((X509Certificate)object).getSigAlgName() : a.i.getSignatureAlgID().getId();
                Object object3 = object = Signature.getInstance(string, new BouncyCastleProvider());
                ((Signature)object).initVerify(certificate);
                ((Signature)object3).update(tBS_Sign.getEncoded(BaseReq.J("v6`")));
                boolean bl = ((Signature)object3).verify(byArray);
                if (!bl) {
                    Object object4 = object;
                    ((Signature)object4).update(Base64Util.encode(tBS_Sign.getEncoded(PDFHighlightAnnotationReq.J("MH["))).getBytes("UTF-8"));
                    bl = ((Signature)object4).verify(byArray);
                }
                return bl;
            }
            catch (Exception exception) {
                object2 = exception.getStackTrace()[0];
                Object[] objectArray = new Object[3];
                objectArray[0] = exception.getMessage();
                objectArray[1] = ((StackTraceElement)object2).getFileName();
                objectArray[2] = ((StackTraceElement)object2).getLineNumber();
                log.error(String.format(BaseReq.J("b7t\u9aff\u7b4c\u5942\u8d17\uff7f\u952b\u8b9c\u4fd3\u601c\uff28VA\uff7f\u952b\u8b9c\u4f7f\u7f1d\uff28VA\uff7f\u0017\u0000\u3030"), objectArray));
            }
        }
        return false;
    }

    private /* synthetic */ boolean J(long[] a, PdfDictionary a2) {
        return a != null && a2 != null && a.length == 2 && a[0] == 0L && EPITEXT_HAS_GMV4MD && !"0".equals(EPSIGNATURE_IS_INCREMENT_HASH) && a2.contains(EPSIGNATURE_SIG);
    }

    public SES_Signature getSesSignature() {
        PdfValidator a;
        return a.i;
    }

    public String getReason() {
        block3: {
            try {
                PdfValidator a;
                if (!a.getStructtype().equals((Object)StructType.PKCS7)) break block3;
                return a.a.getReason();
            }
            catch (Exception exception) {
                StackTraceElement stackTraceElement = exception.getStackTrace()[0];
                Object[] objectArray = new Object[3];
                objectArray[0] = exception.getMessage();
                objectArray[1] = stackTraceElement.getFileName();
                objectArray[2] = stackTraceElement.getLineNumber();
                log.error(String.format(PDFHighlightAnnotationReq.J("YIO\u9a81\u7b77\u83ba\u53df\u5392\u56e9\u593c\u8d2c\uff01\u9510\u8be2\u4fe8\u6062\uff13(z\uff01\u9510\u8be2\u4f44\u7f63\uff13(z\uff01,~\u300b"), objectArray));
                return "reason";
            }
        }
        return "reason";
    }

    public String getLocation() {
        block3: {
            try {
                PdfValidator a;
                if (!a.getStructtype().equals((Object)StructType.PKCS7)) break block3;
                return a.a.getLocation();
            }
            catch (Exception exception) {
                StackTraceElement stackTraceElement = exception.getStackTrace()[0];
                Object[] objectArray = new Object[3];
                objectArray[0] = exception.getMessage();
                objectArray[1] = stackTraceElement.getFileName();
                objectArray[2] = stackTraceElement.getLineNumber();
                log.error(String.format(BaseReq.J("b7t\u9aff\u7b4c\u83c4\u53e4\u4f3e\u7f5c\u5942\u8d17\uff7f\u952b\u8b9c\u4fd3\u601c\uff28VA\uff7f\u952b\u8b9c\u4f7f\u7f1d\uff28VA\uff7f\u0017\u0000\u3030"), objectArray));
                return "location";
            }
        }
        return "location";
    }

    public static PdfValidator getInstance(AcroFields a, String a2, PdfReader a3) {
        PdfPKCS7 pdfPKCS7 = null;
        SES_Signature sES_Signature = null;
        StructType structType = null;
        try {
            pdfPKCS7 = a.verifySignature(a2);
            structType = StructType.PKCS7;
        }
        catch (Exception exception) {
            block4: {
                log.info(new StringBuilder().insert(0, PDFHighlightAnnotationReq.J("]>\u9a81\u7b77\u4e00\u8fce\uff01\u9ed1\u8ba9\u8d79{=\u9a81\u7b77\uff01\u7b77\u7aed\u5526\u4e0d\u680e\u8bcb4040\u3002")).append(a2).toString());
                byte[] byArray = PdfValidator.byteTrim(a.getSignatureDictionary(a2).getAsString(PdfName.CONTENTS).getOriginalBytes());
                try {
                    sES_Signature = SES_Signature.getInstance(byArray);
                }
                catch (Exception exception2) {
                    String string = exception2.getMessage();
                    if (!string.contains(BaseReq.J("7w5\u0012\u001fW\u001dU\u0007Z")) || !string.contains(PDFHighlightAnnotationReq.J("y{xgnhyli)op"))) break block4;
                    String string2 = string;
                    int n = Integer.valueOf(string2.substring(string2.indexOf(BaseReq.J("\u0007@\u0006\\\u0010S\u0007W\u0017\u0012\u0011K")) + PDFHighlightAnnotationReq.J("y{xgnhyli)op").length() + 1));
                    byte[] byArray2 = new byte[byArray.length + n];
                    System.arraycopy(byArray, 0, byArray2, 0, byArray.length);
                    sES_Signature = SES_Signature.getInstance(byArray2);
                }
            }
            structType = StructType.ESESIGNATURE;
        }
        PdfValidator pdfValidator = new PdfValidator(pdfPKCS7, sES_Signature, a, a2, a3);
        pdfValidator.setStructtype(structType);
        return pdfValidator;
    }

    /*
     * WARNING - Removed back jump from a try to a catch block - possible behaviour change.
     * Unable to fully structure code
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    private /* synthetic */ byte[] J() {
        var1_1 = null;
        v0 = a;
        var2_2 = v0.G.getSignatureDictionary(v0.k);
        var3_4 = var2_2.get(PdfName.V_ID).toString();
        if (v0.G.v4Cache.containsKey(var3_4)) {
            return a.G.v4Cache.get(var3_4);
        }
        {
            catch (Exception var2_3) {
                var3_4 = var2_3.getStackTrace()[0];
                v1 = new Object[3];
                v1[0] = var2_3.getMessage();
                v1[1] = var3_4.getFileName();
                v1[2] = var3_4.getLineNumber();
                PdfValidator.log.error(String.format(BaseReq.J("#v5\u9abe\u7b0d\u680b\u631db7t\u8bd2\u7ba5\u7b0d\u543f\u53ec\u65b5\u5942\u8d17\uff7f\u952b\u8b9c\u4fd3\u601c\uff28VA\uff7f\u952b\u8b9c\u4f7f\u7f1d\uff28VA\uff7f\u0017\u0000\u3030"), v1));
                return var1_1;
            }
            var4_5 = var2_2.getAsArray(PdfName.BYTERANGE).asLongArray();
            if (!a.J((long[])var4_5, var2_2)) ** GOTO lbl64
            var5_6 = null;
            try {
                v2 = new Class[1];
                v2[0] = PdfDictionary.class;
                var6_10 = a.G.getClass().getMethod("updateByteRangeOfGMV4", v2);
                v3 = new Object[1];
                v3[0] = var2_2;
                v4 = var5_6 = (MessageDigest)var6_10.invoke(a.G, v3);
            }
            catch (Exception var6_11) {}
            {
                var7_12 = var6_11.getStackTrace()[0];
                v5 = new Object[3];
                v5[0] = var6_11.getMessage();
                v5[1] = var7_12.getFileName();
                v5[2] = var7_12.getLineNumber();
                PdfValidator.log.error(String.format(BaseReq.J("4\u007f%\u0006\u53be\u5c36\u8c70\u751a\u5942\u8d17\uff7f\u952b\u8b9c\u4fd3\u601c\uff28VA\uff7f\u952b\u8b9c\u4f7f\u7f1d\uff28VA\uff7f\u0017\u0000\u3030"), v5));
                return null;
            }
        }
        {
            block23: {
                if (v4 != null) {
                    var6_10 = null;
                    try {
                        v6 = var6_10 = (MessageDigest)var5_6.clone();
                    }
                    catch (CloneNotSupportedException var7_13) {
                        var8_16 = var7_13.getStackTrace()[0];
                        v7 = new Object[3];
                        v7[0] = var7_13.getMessage();
                        v7[1] = var8_16.getFileName();
                        v7[2] = var8_16.getLineNumber();
                        PdfValidator.log.error(String.format(PDFHighlightAnnotationReq.J("JD[=\u9a81\u7b77\u5893\u91c6\u6455\u8988\u8bac\u7b9e\u593c\u8d2c\uff01\u9510\u8be2\u4fe8\u6062\uff13(z\uff01\u9510\u8be2\u4f44\u7f63\uff13(z\uff01,~\u300b"), v7));
                        v6 = var6_10;
                    }
                    if (v6 != null) {
                        var1_1 = var6_10.digest();
                        a.G.v4Cache.put((String)var3_4, var1_1);
                        return var1_1;
                    }
                }
lbl64:
                // 5 sources

                var5_6 = new RandomAccessSourceFactory();
                var6_10 = a.b.getSafeFile();
                var7_14 = var5_6.createRanged(var6_10.createSourceView(), (long[])var4_5);
                var8_16 = new RASInputStream(var7_14);
                var4_5 = null;
                try {
                    var5_6 = MessageDigest.getInstance("SM3", new BouncyCastleProvider());
                    var6_10 = new byte[8192];
                    v8 = var8_16;
                    while ((var7_15 = v8.read((byte[])var6_10)) > 0) {
                        v8 = var8_16;
                        var5_6.update((byte[])var6_10, 0, var7_15);
                    }
                    var1_1 = var5_6.digest();
                    a.G.v4Cache.put((String)var3_4, var1_1);
                    if (var8_16 == null) return var1_1;
                    if (var4_5 == null) break block23;
                }
                catch (Throwable var5_8) {
                    try {
                        v9 = var5_8;
                        var4_5 = v9;
                        throw v9;
                    }
                    catch (Throwable var9_17) {
                        if (var8_16 != null) {
                            if (var4_5 != null) {
                                try {
                                    var8_16.close();
                                    v10 = var9_17;
                                    throw v10;
                                }
                                catch (Throwable var5_9) {
                                    v10 = var9_17;
                                    var4_5.addSuppressed(var5_9);
                                    throw v10;
                                }
                            }
                            var8_16.close();
                        }
                        v10 = var9_17;
                        throw v10;
                    }
                }
                try {
                    var8_16.close();
                    return var1_1;
                }
                catch (Throwable var5_7) {
                    var4_5.addSuppressed(var5_7);
                    return var1_1;
                }
            }
            var8_16.close();
            return var1_1;
        }
    }

    public void setStructtype(StructType a) {
        a.A = a;
    }

    /*
     * Exception decompiling
     */
    public long getSignDate() {
        /*
         * This method has failed to decompile.  When submitting a bug report, please provide this stack trace, and (if you hold appropriate legal rights) the relevant class file.
         * 
         * org.benf.cfr.reader.util.ConfusedCFRException: Started 2 blocks at once
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.getStartingBlocks(Op04StructuredStatement.java:412)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.buildNestedBlocks(Op04StructuredStatement.java:487)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op03SimpleStatement.createInitialStructuredBlock(Op03SimpleStatement.java:736)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisInner(CodeAnalyser.java:850)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisOrWrapFail(CodeAnalyser.java:278)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysis(CodeAnalyser.java:201)
         *     at org.benf.cfr.reader.entities.attributes.AttributeCode.analyse(AttributeCode.java:94)
         *     at org.benf.cfr.reader.entities.Method.analyse(Method.java:531)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseMid(ClassFile.java:1055)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseTop(ClassFile.java:942)
         *     at org.benf.cfr.reader.Driver.doJarVersionTypes(Driver.java:257)
         *     at org.benf.cfr.reader.Driver.doJar(Driver.java:139)
         *     at org.benf.cfr.reader.CfrDriverImpl.analyse(CfrDriverImpl.java:76)
         *     at org.benf.cfr.reader.Main.main(Main.java:54)
         */
        throw new IllegalStateException("Decompilation failed");
    }

    public StructType getStructtype() {
        PdfValidator a;
        return a.A;
    }

    public static byte[] byteTrim(byte[] a) {
        byte[] byArray;
        int n;
        block2: {
            int n2 = a.length;
            n = 0;
            int n3 = n2 = n2 - 1;
            while (n3 > 0) {
                if (a[n2] != 0) {
                    n = n2;
                    byArray = a;
                    break block2;
                }
                n3 = --n2;
            }
            byArray = a;
        }
        return Arrays.copyOf(byArray, n + 1);
    }

    public static final class StructType
    extends Enum<StructType> {
        public static final /* enum */ StructType ESESIGNATURE;
        String b;
        private static final /* synthetic */ StructType[] $VALUES;
        public static final /* enum */ StructType PKCS7;

        public static StructType valueOf(String a) {
            return Enum.valueOf(StructType.class, a);
        }

        public static StructType[] values() {
            return (StructType[])$VALUES.clone();
        }

        public static StructType getByValue(String a) {
            int n;
            StructType[] structTypeArray = StructType.values();
            int n2 = structTypeArray.length;
            int n3 = n = 0;
            while (n3 < n2) {
                StructType structType = structTypeArray[n];
                if (structType.getValue().equals(a)) {
                    return structType;
                }
                n3 = ++n;
            }
            return null;
        }

        /*
         * WARNING - Possible parameter corruption
         * WARNING - void declaration
         */
        private /* synthetic */ StructType(String string) {
            void a;
            void var2_-1;
            void var1_-1;
            StructType a2;
            a2.b = a;
        }

        public String getValue() {
            StructType a;
            return a.b;
        }

        static {
            PKCS7 = new StructType(VerifyReq.J("7p$hP"), 0, "1");
            ESESIGNATURE = new StructType(EpFileServerUtil.J("\u0014\u000b\u0014\u000b\u0018\u001f\u001f\u0019\u0005\r\u0003\u001d"), 1, VerifyReq.J("U"));
            StructType[] structTypeArray = new StructType[2];
            structTypeArray[0] = PKCS7;
            structTypeArray[1] = ESESIGNATURE;
            $VALUES = structTypeArray;
        }
    }
}


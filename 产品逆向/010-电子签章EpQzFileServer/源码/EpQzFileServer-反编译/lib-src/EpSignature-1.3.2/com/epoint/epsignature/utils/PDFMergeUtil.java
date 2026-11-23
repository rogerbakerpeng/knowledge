/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.actions.impl.CFCAServerSealImpl;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.bean.sign.MixedSignCtx;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.bean.sign.SignatureInfo;
import com.epoint.epsignature.dzyyzz.service.DZYYZZService;
import com.epoint.epsignature.gm.ses.v4.SES_Signature;
import com.epoint.epsignature.gm.ses.v4.TBS_Sign;
import com.epoint.epsignature.pdfsignatureinfo.exception.VerifyByCaTypeException;
import com.epoint.epsignature.pdfsignatureinfo.strategy.PdfVerifyByCatypeStrategy;
import com.epoint.epsignature.service.EpCertVerifyService;
import com.epoint.epsignature.tsaimpl.TSAClientFactory;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.EpCertVerifyUtil;
import com.epoint.epsignature.utils.ImageMergeUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PdfValidator;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.epsignature.utils.SignatureDataExtractor;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.epsignature.utils.l;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1InputStream;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Set;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1TaggedObject;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERSet;
import com.epoint.gmhelper.bouncycastle.asn1.gm.GMObjectIdentifiers;
import com.epoint.gmhelper.bouncycastle.jce.provider.BouncyCastleProvider;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.itextpdf.epsign.EPPdfNames;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.Document;
import com.epoint.itextpdf.text.DocumentException;
import com.epoint.itextpdf.text.Image;
import com.epoint.itextpdf.text.Phrase;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.AcroFields;
import com.epoint.itextpdf.text.pdf.ColumnText;
import com.epoint.itextpdf.text.pdf.PdfAction;
import com.epoint.itextpdf.text.pdf.PdfContentByte;
import com.epoint.itextpdf.text.pdf.PdfCopy;
import com.epoint.itextpdf.text.pdf.PdfDate;
import com.epoint.itextpdf.text.pdf.PdfDestination;
import com.epoint.itextpdf.text.pdf.PdfDeveloperExtension;
import com.epoint.itextpdf.text.pdf.PdfDictionary;
import com.epoint.itextpdf.text.pdf.PdfImportedPage;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfObject;
import com.epoint.itextpdf.text.pdf.PdfOutline;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.PdfSignature;
import com.epoint.itextpdf.text.pdf.PdfSignatureAppearance;
import com.epoint.itextpdf.text.pdf.PdfStamper;
import com.epoint.itextpdf.text.pdf.PdfString;
import com.epoint.itextpdf.text.pdf.PdfWriter;
import com.epoint.itextpdf.text.pdf.security.BouncyCastleDigest;
import com.epoint.itextpdf.text.pdf.security.CertificateInfo;
import com.epoint.itextpdf.text.pdf.security.DigestAlgorithms;
import com.epoint.itextpdf.text.pdf.security.ExternalDigest;
import com.epoint.itextpdf.text.pdf.security.ExternalSignature;
import com.epoint.itextpdf.text.pdf.security.MakeSignature;
import com.epoint.itextpdf.text.pdf.security.PdfPKCS7;
import com.epoint.itextpdf.text.pdf.security.SignaturePermissions;
import com.epoint.itextpdf.text.pdf.security.TSAClient;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.security.cert.Certificate;
import java.security.cert.CertificateEncodingException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;

/*
 * Exception performing whole class analysis ignored.
 */
public class PDFMergeUtil {
    private static String ZZ_STRCID = "ZZ";
    private static String ISVerifyWithCaFrameworkServer;
    private static Logger log;
    private static String EPH5_ISValidateZZThirdSeal;
    private static String ISValidateThirdSeal;
    protected static final float TRANS_SCALE = 0.75f;
    private static String EPH5_ISUseCaVerify;
    private static final String XS_STRCID = "XS";
    private static final String IS_OPEN_SIGNATURE_CERT_VERIFY;
    private static EpCertVerifyService epCertVerifyService;
    private static String ZZ_MARKID;
    private static final String EP_STRCID = "EP";

    public static String PreSignValid(String a, Class<? extends SignReq> a22) {
        try {
            a22 = JSONUtils.json2bean(a, a22);
            long l2 = SM2CertUtil.getX509Certificate(Base64Util.decode(((SignReq)a22).getSignCert())).getNotAfter().getTime();
            long l3 = new Date().getTime();
            if (l2 < l3) {
                return HighlightPos.J("\u7b32\u7abb\u597d\u8d7ev\u60f3\u76c8\u8b9a\u4e2a\u5da9\u8f8b\u6744\uff40\u8bac\u7ea1\u6744\u5442\u8f80\u8800\u7b25\u7aac\u6496\u4f10\uff5a");
            }
        }
        catch (Exception a22) {
            log.error(CertObject.J("\u7b68\u7af5\u4ff7\u607a\u6837\u9a99\u5927\u8d30\uff17"), a22);
            return HighlightPos.J("\u7b32\u7abb\u597d\u8d7ev\u7b25\u7aac\u4fba\u6023\u687a\u9ac0\u596a\u8d69\uff5a");
        }
        return "";
    }

    public static String signatureMergeTmpFile(String a, PdfReader a2, byte[] a3, X509Certificate a4, List<SignInfo> a5, String a6, String a7, Map<String, String> a8) throws Exception {
        long[] lArray = new long[2];
        lArray[0] = 0L;
        lArray[1] = a2.getFileLength();
        return PDFMergeUtil.signatureMergeTmpFile(a, a2, a3, a4, a5, lArray, a6, a7, a8);
    }

    public static byte[] origin_Sign(PdfReader a, SignatureInfo a2, int a3, Map<String, String> a4) throws Exception {
        SignatureInfo signatureInfo = a2;
        X509Certificate x509Certificate = SM2CertUtil.getX509Certificate(Base64Util.decode(signatureInfo.getCert().getBase64Cert()));
        List<SignInfo> list = signatureInfo.getSignImg();
        Object object = Image.getInstance(ImageMergeUtil.changeTransparent(Base64Util.decode((String)((Object)list)), 9));
        SignatureInfo.Postion postion = signatureInfo.getPos();
        Rectangle rectangle = SignReq.fixRect(postion.getX(), postion.getY(), ((Rectangle)object).getWidth(), ((Rectangle)object).getHeight(), postion.getPage(), a);
        list = new SignInfo(rectangle, postion.getPage(), postion.getX(), postion.getY(), (String)((Object)list), (Image)object, a2.getSignid());
        SignInfo[] signInfoArray = new SignInfo[1];
        signInfoArray[0] = list;
        list = Arrays.asList(signInfoArray);
        object = Base64Util.decode(a2.getSignature());
        long[] lArray = new long[2];
        lArray[0] = 0L;
        lArray[1] = a3;
        return PDFMergeUtil.signatureMerge(a, (byte[])object, x509Certificate, list, lArray, a2.getReason(), a2.getLocation(), a4);
    }

    public static String verifyPDFWithMixed(PdfReader a, AcroFields a2) throws VerifyByCaTypeException {
        return JSONUtils.bean2json(PDFMergeUtil.inspectSignatureWithMixed(a, a2, true));
    }

    public static byte[] degist4PDFSignWithPdfpath(String a, String a2) throws Exception {
        return PDFMergeUtil.J(SignUtil.degistByStream(a, a2));
    }

    private static /* synthetic */ void J(MixedSignCtx.MixedAnnote a, PdfReader a2, AcroFields.FieldPosition a3) {
        PdfReader pdfReader = a2;
        a.pg = a3.page;
        Rectangle rectangle = pdfReader.getPageSize(a3.page);
        if (pdfReader.getPageN(a3.page).getAsNumber(PdfName.ROTATE) != null) {
            int n = a2.getPageN(a3.page).getAsNumber(PdfName.ROTATE).intValue();
            int n2 = n = (n %= 360) < 0 ? n + 360 : n;
            if (n != 180 && n != 0) {
                rectangle = a2.getPageSize(a3.page).rotate();
            }
        }
        Rectangle rectangle2 = a3.position;
        MixedSignCtx.MixedAnnote mixedAnnote = a;
        mixedAnnote.x = rectangle2.getLeft() + rectangle2.getWidth() / 2.0f;
        mixedAnnote.y = rectangle.getHeight() - rectangle2.getBottom() - rectangle2.getHeight() + rectangle2.getHeight() / 2.0f;
    }

    private static /* synthetic */ byte[] J(byte[] a) throws Exception {
        ASN1EncodableVector aSN1EncodableVector = new ASN1EncodableVector();
        ASN1EncodableVector aSN1EncodableVector2 = new ASN1EncodableVector();
        ASN1EncodableVector aSN1EncodableVector3 = aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector4 = aSN1EncodableVector2;
        aSN1EncodableVector4.add(new ASN1ObjectIdentifier(CertObject.J("$8'8-\"%8$'&#!/;';/;%")));
        aSN1EncodableVector4.add(new DERSet(new ASN1ObjectIdentifier(HighlightPos.J("}u~uto|u}j\u007fnxbbjblbj"))));
        aSN1EncodableVector3.add(new DERSequence(aSN1EncodableVector2));
        aSN1EncodableVector2 = new ASN1EncodableVector();
        aSN1EncodableVector2.add(new ASN1ObjectIdentifier(CertObject.J("$8'8-\"%8$'&#!/;';/;\"")));
        aSN1EncodableVector2.add(new DERSet(new DEROctetString(a)));
        aSN1EncodableVector3.add(new DERSequence(aSN1EncodableVector2));
        return new DERSet(aSN1EncodableVector).getEncoded();
    }

    private static /* synthetic */ int J(MixedSignCtx.MixedAnnote a, MixedSignCtx.MixedAnnote a2) {
        return a.pg - a2.pg;
    }

    public static MixedSignCtx inspectSignatureWithMixed(PdfReader a, AcroFields a2, boolean a3) throws VerifyByCaTypeException {
        HashMap<String, String> hashMap = new HashMap<String, String>();
        return PDFMergeUtil.J(a, a2, a3, hashMap);
    }

    private static /* synthetic */ void J(MixedSignCtx.MixedSign a, PdfValidator a2) throws CertificateEncodingException {
        MixedSignCtx.MixedSign mixedSign = a;
        PdfValidator pdfValidator = a2;
        a.date = a2.getSignDate();
        PDFMergeUtil.J(a, pdfValidator.getSigningCertificate());
        mixedSign.loc = pdfValidator.getLocation();
        mixedSign.rea = a2.getReason();
        if (epCertVerifyService != null && "1".equals(IS_OPEN_SIGNATURE_CERT_VERIFY)) {
            a.certverify = epCertVerifyService.verifyCert(Base64Util.encode(a2.getSigningCertificate().getEncoded())) ? "1" : "0";
        }
    }

    /*
     * WARNING - Removed back jump from a try to a catch block - possible behaviour change.
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    private static /* synthetic */ void J(MixedSignCtx.MixedSign a, X509Certificate a2) {
        try {
            a.cert.sigAlg = GMObjectIdentifiers.sm2sign_with_sm3.equals(a2.getSigAlgName()) ? "SM3WITHSM2" : a2.getSigAlgOID();
        }
        catch (Exception exception) {
            log.error(new StringBuilder().insert(0, CertObject.J("\u671f\u95fb\u988e\u8bd4\u4e70\u5e9a\u5201\u53e2+(\u301d")).append(a2.getSerialNumber()).toString(), exception);
            return;
        }
        {
            String string = HighlightPos.J("\u000f\u0015");
            MixedSignCtx.MixedSign mixedSign = a;
            mixedSign.cert.signer = CertificateInfo.getSubjectFields(a2).getField(string);
            mixedSign.cert.b64 = Base64Util.encode(a2.getEncoded()).replace(CertObject.J("\u001c"), "");
            mixedSign.cert.sn = SM2CertUtil.getSerialNumber(a2.getEncoded());
            mixedSign.cert.bfjg = CertificateInfo.getIssuerFields(a2).getField(HighlightPos.J("\u000f\u0015"));
            return;
        }
    }

    public PDFMergeUtil() {
        PDFMergeUtil a;
    }

    private static /* synthetic */ String J(AcroFields a, String a22) {
        try {
            a22 = a.getSignatureDictionary((String)a22);
            PdfString pdfString = ((PdfDictionary)a22).getAsString(PdfName.CONTENTS);
            return Base64Util.encode(((ASN1OctetString)((ASN1Sequence)((ASN1Set)((ASN1Sequence)((ASN1TaggedObject)((ASN1Sequence)new ASN1InputStream(new ByteArrayInputStream(pdfString.getBytes())).readObject()).getObjectAt(1)).getObject()).getObjectAt(4)).getObjectAt(0)).getObjectAt(5)).getOctets());
        }
        catch (Exception a22) {
            log.error(a22.getMessage(), a22);
            a22.printStackTrace();
            return "";
        }
    }

    /*
     * Could not resolve type clashes
     * Unable to fully structure code
     */
    private static /* synthetic */ SignatureInfo J(AcroFields a, String a, SignatureDataExtractor a, SignaturePermissions a, PdfReader a) throws GeneralSecurityException, IOException {
        block35: {
            var5_8 = new HashMap<String, Object>();
            var6_9 = new SignatureInfo();
            v0 = a;
            var6_9.setId(a.getFieldItem((String)a).getWidgetRef(0).getNumber() + HighlightPos.J("\t"));
            var6_9.setSignid(v0);
            var7_10 = a.getFieldPositions(v0);
            var8_11 = new SignatureInfo.Postion();
            var9_13 = "";
            if (var7_10 == null || var7_10.isEmpty()) ** GOTO lbl29
            var10_14 = var7_10.get(0);
            var11_15 = var10_14.position;
            if (var11_15.getWidth() == 0.0f || var11_15.getHeight() == 0.0f) {
                var9_13 = CertObject.J("_{`|e|tys5e|q{wacgs");
                v1 = var6_9;
            } else {
                var8_11.setPage(var10_14.page);
                v2 = a;
                var12_16 = v2.getPageSize(var10_14.page);
                if (v2.getPageN(var10_14.page).getAsNumber(PdfName.ROTATE) != null) {
                    var13_18 = a.getPageN(var10_14.page).getAsNumber(PdfName.ROTATE).intValue();
                    v3 = var13_18 = (var13_18 %= 360) < 0 ? var13_18 + 360 : var13_18;
                    if (var13_18 != 180 && var13_18 != 0) {
                        var12_16 = a.getPageSize(var10_14.page).rotate();
                    }
                }
                var8_11.setX(var11_15.getLeft() + var11_15.getWidth() / 2.0f);
                var8_11.setY(var12_16.getHeight() - var11_15.getBottom() - var11_15.getHeight() + var11_15.getHeight() / 2.0f);
                var6_9.setPage(var10_14.page);
lbl29:
                // 2 sources

                v1 = var6_9;
            }
            v1.setPos((SignatureInfo.Postion)var8_11);
            var10_14 = a.getFieldItem((String)a);
            var11_15 = var10_14.getValue(0);
            var12_16 = null;
            v4 = var11_15;
            var13_19 = v4.get(EPPdfNames.DIGITAL_INFO_CONTANER);
            var7_10 = v4.get(EPPdfNames.DIGITAL_INFO);
            if (var13_19 != null) {
                if (var5_8.containsKey(var13_19.toString())) {
                    v5 = var12_16 = (PdfObject)var5_8.get(var13_19.toString());
                } else {
                    var8_11 = var11_15.getAsDict(EPPdfNames.DIGITAL_INFO_CONTANER);
                    v6 = var12_16 = var8_11.get(EPPdfNames.DIGITAL_INFO);
                    v5 = v6;
                    var5_8.put(var13_19.toString(), v6);
                }
            } else {
                if (var7_10 != null) {
                    var12_16 = (PdfString)var7_10;
                }
                v5 = var12_16;
            }
            if (v5 != null) {
                var6_9.setSignImg(var12_16.toString());
            } else {
                try {
                    var8_11 = a.extractImage((String)a);
                    var6_9.setSignImg(Base64Util.encode(var8_11.getImageAsBytes()));
                }
                catch (Exception var8_12) {
                    PDFMergeUtil.log.error(HighlightPos.J("\u6766\u538d\u527c\u000b\b\u001d\u56b2\u721c\u82ce\u70e2"));
                }
            }
            var8_11 = new HashMap<String, String>();
            a = a.getSignatureDictionary((String)a);
            for (Object var7_10 : a.getKeys()) {
                var9_13 = var7_10.toString();
                if (var9_13.indexOf(CertObject.J("PFERSI")) == -1 || (var10_14 = (PdfString)a.get((PdfName)var7_10)) == null) continue;
                var12_16 = var9_13.split(HighlightPos.J("\u0004"))[1];
                var8_11.put((String)var12_16, var10_14.toUnicodeString());
            }
            if (var8_11.isEmpty()) {
                for (Object var7_10 : var11_15.getKeys()) {
                    var9_13 = var7_10.toString();
                    if (var9_13.indexOf(CertObject.J("PFERSI")) == -1 || (var10_14 = (PdfString)var11_15.get((PdfName)var7_10)) == null) continue;
                    var12_16 = var9_13.split(HighlightPos.J("\u0004"))[1];
                    var8_11.put((String)var12_16, var10_14.toUnicodeString());
                }
            }
            var6_9.setExt(var8_11);
            var5_8 = PdfValidator.getInstance(a, (String)a, (PdfReader)a);
            var7_10 = "";
            var9_13 = "";
            var10_14 = "";
            var12_17 = false;
            if (var11_15.contains(new PdfName(CertObject.J("NFR|q|btz\\xsy")))) {
                var12_17 = true;
            }
            if (!var12_17) {
                try {
                    v7 = var5_8;
                    var12_17 = v7.verify();
                    var9_13 = v7.getOrgData();
                    var7_10 = v7.getSignData();
                    a = v7.getSigningCertificate();
                    var10_14 = Base64Util.encode(a.getEncoded());
                    v8 = var6_9;
                    v8.setOrg(var9_13);
                    v8.setSignature((String)var7_10);
                    v9 = var8_11;
                    break block35;
                }
                catch (Exception a) {
                    PDFMergeUtil.log.error(a.getMessage(), a);
                }
            }
            v9 = var8_11;
        }
        if (v9.containsKey(HighlightPos.J("8#6\":!>"))) {
            try {
                var12_17 = new DZYYZZService().verifySign((String)var10_14, var9_13, (String)var7_10);
                var6_9.setIsIntegrity(var12_17);
                v10 = var5_8;
            }
            catch (Exception a) {
                PDFMergeUtil.log.error(a.getMessage(), a);
                v10 = var5_8;
                var6_9.setIsIntegrity(false);
            }
        } else if (CertObject.J("'#").equals(var8_11.get(HighlightPos.J("?2+5\u00014(>")))) {
            var12_17 = new CFCAServerSealImpl().verifySign((String)var7_10);
            v10 = var5_8;
            var6_9.setIsIntegrity(var12_17);
        } else {
            try {
                if (var12_17) {
                    var6_9.setIsIntegrity(true);
                } else {
                    if (StringUtil.isNotBlank(var7_10)) {
                        var12_17 = EpSignatureApi.verifySign(var9_13, (String)var10_14, (String)var7_10);
                    }
                    var6_9.setIsIntegrity(var12_17);
                }
            }
            catch (Exception a) {
                PDFMergeUtil.log.error(a.getMessage(), a);
                var6_9.setIsIntegrity(false);
            }
            v10 = var5_8;
        }
        a = v10.getSigningCertificate();
        a = new SignatureInfo.Cert();
        a.setSigAlg(a.getSigAlgName());
        var7_10 = "";
        if ("SM3WITHSM2".equals(a.getSigAlgName())) {
            var7_10 = CertObject.J("VX");
            v11 = a;
        } else {
            var7_10 = HighlightPos.J("\u000f\u0015");
            v11 = a;
        }
        var7_10 = v11.getIssuerDN().toString();
        var7_10 = CertUtils.getClientSignCertCN((X509Certificate)a);
        v12 = a;
        a.setSigner((String)var7_10);
        v12.setBase64Cert(Base64Util.encode(a.getEncoded()));
        v12.setSerialNumber(SM2CertUtil.getSerialNumber(a.getEncoded()));
        v13 = var6_9;
        v14 = var6_9;
        v14.setCert((SignatureInfo.Cert)a);
        v14.setSigndate(var5_8.getSignDate());
        v13.setTimestamp(null);
        v13.setLocation(var5_8.getLocation());
        var6_9.setReason(var5_8.getReason());
        v13.setBfjg(CertificateInfo.getIssuerFields((X509Certificate)a).getField(CertObject.J("VX")));
        if (HighlightPos.J("\u6756\u52ed\u5633\u7b32\u7abb").equals(var5_8.getReason())) {
            return null;
        }
        if ((a = a.getSignatureDictionary((String)a)).getAsString(PdfName.CONTACTINFO) != null) {
            // empty if block
        }
        a = new SignaturePermissions((PdfDictionary)a, a);
        return var6_9;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static String verifyPDF(PdfReader a, List<SignInfo> a2) throws Exception {
        ArrayList<SignatureInfo> arrayList = new ArrayList<SignatureInfo>();
        {
            AcroFields acroFields = a.getAcroFields();
            SignatureDataExtractor signatureDataExtractor = new SignatureDataExtractor(a);
            Object object = acroFields.getSignatureNames();
            SignInfo signInfo = new SignInfo();
            object = ((ArrayList)object).iterator();
            while (object.hasNext()) {
                String string = (String)object.next();
                signInfo.setName(string);
                if (a2 != null && !a2.contains(signInfo)) continue;
                try {
                    SignatureInfo signatureInfo = new SignatureInfo();
                    signatureInfo = PDFMergeUtil.J(acroFields, string, signatureDataExtractor, null, a);
                    if (signatureInfo == null) continue;
                    arrayList.add(signatureInfo);
                }
                catch (Exception exception) {
                    exception.printStackTrace();
                }
            }
        }
        a.close();
        ArrayList<SignatureInfo> arrayList2 = arrayList;
        return JSONUtils.bean2json(arrayList2);
    }

    static {
        ZZ_MARKID = "/GM.sm2seal";
        EPH5_ISValidateZZThirdSeal = ConfigUtil.getConfigValue(CertObject.J("lat"), HighlightPos.J("\t\u000b\u0004n\u0013\u0012\u001f\r-7%?-/)\u0001\u0016\u000f$2>?\u001f>-7"));
        EPH5_ISUseCaVerify = ConfigUtil.getConfigValue(CertObject.J("lat"), HighlightPos.J("\t\u000b\u0004n\u0013\u0012\u001f\u000e?>\u000f:\u001a>>2*\""));
        ISValidateThirdSeal = ConfigUtil.getConfigValue(CertObject.J("lat"), HighlightPos.J("\u0012\u001f\r-7%?-/)\u000f$2>?\u001f>-7"));
        IS_OPEN_SIGNATURE_CERT_VERIFY = ConfigUtil.getConfigValue(CertObject.J("lat"), HighlightPos.J("\u0012\u001f\u0004\u0003\u000b\t\u0015\u0013\b\u0005\u001c\u0002\u001a\u0018\u000e\u001e\u001e\u0013\u0018\t\t\u0018\u0004\u001a\u001e\u001e\u0012\n\u0002"));
        ISVerifyWithCaFrameworkServer = ConfigUtil.getConfigValue(CertObject.J("lat"), HighlightPos.J("\u0012\u001f\r))%=5\f%/$\u0018-\u001d>:!>;4>0\u001f>>-))"));
        epCertVerifyService = null;
        Security.addProvider(new BouncyCastleProvider());
        if ("1".equals(IS_OPEN_SIGNATURE_CERT_VERIFY)) {
            epCertVerifyService = new EpCertVerifyService(EpCertVerifyUtil.getCARootPath());
        }
        log = Logger.getLogger(PDFMergeUtil.class);
    }

    public static ByteArrayOutputStream signatureMergeOs(PdfReader a, byte[] a2, X509Certificate a3, List<SignInfo> a4, long[] a5, String a6, String a7, Map<String, String> a8) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PDFMergeUtil.J(byteArrayOutputStream, null, a, a2, a3, a4, a5, a6, a7, a8);
        return byteArrayOutputStream;
    }

    public static String verifyPDF(PdfReader a) throws Exception {
        return PDFMergeUtil.verifyPDF(a, null);
    }

    public static int getPdfSealCount(PdfReader a) {
        int n = 0;
        try {
            AcroFields acroFields = a.getAcroFields();
            n = acroFields.getSignatureNames().size();
            return n;
        }
        catch (Exception exception) {
            log.error(CertObject.J("qpbErsEpwyUzc{b"), exception);
            return n;
        }
    }

    private static /* synthetic */ void J(MixedSignCtx.MixedSign a, PdfValidator a2, PdfVerifyByCatypeStrategy a3) throws Exception {
        PdfValidator pdfValidator = a2;
        PDFMergeUtil.J(a, pdfValidator);
        pdfValidator.verify();
        PdfValidator pdfValidator2 = a2;
        a.signed = pdfValidator2.getSignData();
        a.org = pdfValidator2.getOrgData();
        a.verify = a3.verifyByCaType(a.org, a.cert.b64, a.signed);
    }

    public static ByteArrayOutputStream signatureMergeOs(PdfReader a, byte[] a2, X509Certificate a3, List<SignInfo> a4, String a5, String a6, Map<String, String> a7) throws Exception {
        long[] lArray = new long[2];
        lArray[0] = 0L;
        lArray[1] = a.getFileLength();
        return PDFMergeUtil.signatureMergeOs(a, a2, a3, a4, lArray, a5, a6, a7);
    }

    public static String preSignSignCertValid(String a, Class<? extends SignReq> a22) {
        try {
            a22 = JSONUtils.json2bean(a, a22);
            if (epCertVerifyService != null && StringUtil.isNotBlank(((SignReq)a22).getSignCert()) && !epCertVerifyService.verifyCert(((SignReq)a22).getSignCert())) {
                return HighlightPos.J("\u7b32\u7abb\u597d\u8d7ev\u60f3\u76c8\u8b9a\u4e2a\u6862\u8b8d\u4e3d\u686d\u9ad7\u597d\u8d7e\uff40\u8bac\u8018\u7ca0\u7cb7\u7e84\u7bed\u745d\u5414\uff5a");
            }
        }
        catch (Exception a22) {
            log.error(CertObject.J("\u682c\u8bd7\u4e73\u6837\u9a99\u5927\u8d30\uff17"), a22);
            return HighlightPos.J("\u7b32\u7abb\u597d\u8d7ev\u60f3\u76c8\u8b9a\u4e2a\u6862\u8b8d\u4e3d\u686d\u9ad7\u597d\u8d7e\uff40\u8bac\u8018\u7ca0\u7cb7\u7e84\u7bed\u745d\u5414\uff5a");
        }
        return "";
    }

    private static /* synthetic */ void J(PdfSignatureAppearance a, ExternalDigest a22322, ExternalSignature a3, Certificate[] a4, TSAClient a5, MakeSignature.CryptoStandard a622, byte[] a7, Map<String, String> a8) throws IOException, DocumentException, GeneralSecurityException {
        int a22322 = 102400;
        a.setCertificate(a4[0]);
        if (a622 == MakeSignature.CryptoStandard.CADES) {
            a.addDeveloperExtension(PdfDeveloperExtension.ESIC_1_7_EXTENSIONLEVEL2);
        }
        Object object = a3 = new PdfSignature(PdfName.ADOBE_PPKLITE, a622 == MakeSignature.CryptoStandard.CADES ? PdfName.ETSI_CADES_DETACHED : PdfName.ADBE_PKCS7_DETACHED);
        PdfSignatureAppearance pdfSignatureAppearance = a;
        ((PdfSignature)a3).setReason(a.getReason());
        ((PdfSignature)a3).setLocation(pdfSignatureAppearance.getLocation());
        ((PdfSignature)object).setSignatureCreator(pdfSignatureAppearance.getSignatureCreator());
        ((PdfSignature)object).setContact(a.getContact());
        ((PdfSignature)object).setDate(new PdfDate(a.getSignDate()));
        ((PdfDictionary)a3).put(new PdfName(CertObject.J("PFJ[")), new PdfString("1"));
        if (a8 != null) {
            for (String a622 : a8.keySet()) {
                if (a8.get(a622) == null) continue;
                ((PdfDictionary)a3).put(new PdfName(new StringBuilder().insert(0, HighlightPos.J("\t\u000b\u001c\u001f\n\u0004")).append(a622).toString()), new PdfString((String)a8.get(a622), CertObject.J("@x|uzrpT|q")));
            }
        }
        a.setCryptoDictionary((PdfDictionary)a3);
        a5 = new HashMap<PdfName, Integer>();
        a5.put(PdfName.CONTENTS, a22322 * 2 + 2);
        a.preClose(a5);
        Certificate[] a622 = new Certificate[]{a4[0]};
        a3 = TBS_Sign.getInstance(Base64Util.decode((String)a8.get(HighlightPos.J("4><"))));
        a3 = new SES_Signature().setToSign((TBS_Sign)a3).setCert(a622[0]).setSignatureAlgID(GMObjectIdentifiers.sm2sign_with_sm3).setSignature((byte[])a7).getEncoded();
        if (a22322 < ((Object)a3).length) {
            throw new IOException(CertObject.J("[ya6pxzcr~5eewvs"));
        }
        byte[] a22322 = new byte[a22322];
        System.arraycopy(a3, 0, a22322, 0, ((Object)a3).length);
        Object object2 = a3 = new PdfDictionary();
        ((PdfDictionary)object2).put(PdfName.CONTENTS, new PdfString(a22322).setHexWriting(true));
        a.close((PdfDictionary)object2);
    }

    public static byte[] degist4PDFSign(byte[] a, String a2) throws Exception {
        return PDFMergeUtil.J(SignUtil.degist(a, a2));
    }

    private static /* synthetic */ void J(MixedSignCtx.MixedSign a, PdfValidator a2, String a3, Boolean a4) throws CertificateEncodingException {
        MixedSignCtx.MixedSign mixedSign;
        if ("XS".equals(a3)) {
            mixedSign = a;
            a.verify = "1";
        } else {
            if (a4.booleanValue()) {
                a.verify = a2.verify() ? "1" : "0";
            }
            mixedSign = a;
        }
        PDFMergeUtil.J(mixedSign, a2);
        if ("0".equals(a.verify)) {
            a.signed = a2.getSignData();
            a.org = a2.getOrgData();
            a.verify = EpSignatureApi.verifySign(a.org, a.cert.b64, a.signed) ? "1" : "0";
        }
    }

    public static byte[] imageMerge(byte[] a, List<SignInfo> a2) throws Exception {
        return PDFMergeUtil.imageMergeOs(a, a2).toByteArray();
    }

    public static byte[] signatureMerge(PdfReader a, byte[] a2, X509Certificate a3, List<SignInfo> a4, String a5, String a6, Map<String, String> a7) throws Exception {
        long[] lArray = new long[2];
        lArray[0] = 0L;
        lArray[1] = a.getFileLength();
        return PDFMergeUtil.signatureMerge(a, a2, a3, a4, lArray, a5, a6, a7);
    }

    private static /* synthetic */ void J(OutputStream a, File a2, PdfReader a3, byte[] a4, X509Certificate a5, List<SignInfo> a6, long[] a72, String a8, String a9, Map<String, String> a10) throws Exception {
        Object object;
        Object object2 = a2 = PdfStamper.createSignature((PdfReader)a3, a, '\u0000', (File)a2, true).getSignatureAppearance();
        ((PdfSignatureAppearance)a2).setByte_range(a72);
        ((PdfSignatureAppearance)object2).setReason(a8);
        ((PdfSignatureAppearance)object2).setLocation(a9);
        if (StringUtil.isNotBlank(EpSignatureApi.getEpsignatureVersion())) {
            a10.put(HighlightPos.J(")+?2+5-/9))-))?2#5"), EpSignatureApi.getEpsignatureVersion());
        }
        if (StringUtil.isNotBlank(EpSignatureApi.getPdfjsVersion())) {
            a10.put(CertObject.J("ers|f`pdf\u007fzx"), EpSignatureApi.getPdfjsVersion());
        }
        ((PdfSignatureAppearance)a2).setExt(a10);
        ((PdfSignatureAppearance)a2).setSigns((List<SignInfo>)a6);
        if (a6.size() > 0) {
            ((PdfSignatureAppearance)a2).setVisibleSignature(a6.get(0).getRect(), a6.get(0).getPage(), a6.get(0).getName());
            ((PdfSignatureAppearance)a2).setSignatureGraphic(a6.get(0).getImage());
        }
        Object object3 = a2;
        ((PdfSignatureAppearance)object3).setCertificationLevel(0);
        ((PdfSignatureAppearance)object3).setRenderingMode(PdfSignatureAppearance.RenderingMode.GRAPHIC);
        a3 = a5.getSigAlgOID();
        a3 = new l((String)a3);
        a6 = null;
        try {
            a6 = TSAClientFactory.getInstance();
            object = a2;
        }
        catch (Exception a72) {
            a6 = null;
            log.error(HighlightPos.J("\u5246\u5987\u534d\u65ba\u95af\u627f\u5ba2\u8c2d\u596a\u8d69\uff5a"), a72);
            object = a2;
        }
        Certificate[] certificateArray = new Certificate[1];
        certificateArray[0] = a5;
        PDFMergeUtil.J((PdfSignatureAppearance)object, new BouncyCastleDigest(), (ExternalSignature)a3, certificateArray, (TSAClient)a6, MakeSignature.CryptoStandard.CMS, a4);
    }

    /*
     * Exception decompiling
     */
    public static ByteArrayOutputStream imageMergeOs(byte[] a, List<SignInfo> a) throws Exception {
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

    public static byte[] signatureMerge(PdfReader a, byte[] a2, X509Certificate a3, List<SignInfo> a4, long[] a5, String a6, String a7, Map<String, String> a8) throws Exception {
        return PDFMergeUtil.signatureMergeOs(a, a2, a3, a4, a5, a6, a7, a8).toByteArray();
    }

    public static String verifyPDFWithMixed(PdfReader a) throws VerifyByCaTypeException {
        return JSONUtils.bean2json(PDFMergeUtil.inspectSignatureWithMixed(a, null, true));
    }

    /*
     * WARNING - Removed back jump from a try to a catch block - possible behaviour change.
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static String signatureMergeTmpFile(String a, PdfReader a222, byte[] a3, X509Certificate a4, List<SignInfo> a5, long[] a6, String a7, String a8, Map<String, String> a9) throws Exception {
        File file = null;
        File file2 = Paths.get(System.getProperty(CertObject.J("\u007fwcw;\u007fz8a{er|d")), new String[0]).toFile();
        if (!Files.isWritable(file2.toPath())) {
            Object[] objectArray = new Object[1];
            objectArray[0] = file2.getAbsolutePath();
            log.info(String.format(HighlightPos.J("~?\u5ba2\u5ed8\u4e6f\u65ba\u65dc\u4eba\u76b5\u5f19\u4e56\u53a3\u7573\uff40\u7b25\u7aac\u5453\u5e3a\u596a\u8d69\uff5a"), objectArray));
            return null;
        }
        try {
            file = StringUtil.isNotBlank(a) ? new File(a) : File.createTempFile(UUID.randomUUID().toString(), CertObject.J(";bxf"), file2);
        }
        catch (Exception exception) {
            Object[] objectArray = new Object[2];
            objectArray[0] = file != null ? file.getPath() : CertObject.J("X:W");
            objectArray[1] = exception.getMessage();
            log.error(String.format(HighlightPos.J("\u001c\u001f\n\u7b25\u7aac\u5453\u5e3a\u596a\u8d69{0{86<\u0004<:83v{i(l'l>>)#)v{i("), objectArray), exception);
            if (file == null) return null;
            if (!file.exists()) return null;
            try {
                Files.delete(file.toPath());
                return null;
            }
            catch (IOException iOException) {
                Object[] objectArray2 = new Object[1];
                objectArray2[0] = file.getAbsolutePath();
                log.error(String.format(HighlightPos.J("\u4e6f\u65ba\u65dc\u4eba\u6e5e\u744a\u596a\u8d69{0{<:83v{i("), objectArray2), iOException);
            }
            return null;
        }
        {
            File file3;
            block16: {
                BufferedOutputStream bufferedOutputStream;
                block17: {
                    bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(file));
                    Throwable throwable = null;
                    try {
                        PDFMergeUtil.J(bufferedOutputStream, file2, a222, a3, a4, a5, a6, a7, a8, a9);
                        if (bufferedOutputStream == null) break block16;
                        if (throwable == null) break block17;
                    }
                    catch (Throwable a222) {
                        try {
                            throwable = a222;
                            throw throwable;
                        }
                        catch (Throwable throwable2) {
                            Throwable throwable3;
                            if (bufferedOutputStream != null) {
                                if (throwable != null) {
                                    try {
                                        ((OutputStream)bufferedOutputStream).close();
                                        throwable3 = throwable2;
                                        throw throwable3;
                                    }
                                    catch (Throwable a222) {
                                        throwable3 = throwable2;
                                        throwable.addSuppressed(a222);
                                        throw throwable3;
                                    }
                                }
                                ((OutputStream)bufferedOutputStream).close();
                            }
                            throwable3 = throwable2;
                            throw throwable3;
                        }
                    }
                    try {
                        ((OutputStream)bufferedOutputStream).close();
                        file3 = file;
                        return file3.getAbsolutePath();
                    }
                    catch (Throwable a222) {
                        file3 = file;
                        throwable.addSuppressed(a222);
                        return file3.getAbsolutePath();
                    }
                }
                ((OutputStream)bufferedOutputStream).close();
                file3 = file;
                return file3.getAbsolutePath();
            }
            file3 = file;
            return file3.getAbsolutePath();
        }
    }

    private static /* synthetic */ void J(PdfSignatureAppearance a, ExternalDigest a2, ExternalSignature a3, Certificate[] a4, TSAClient a5, MakeSignature.CryptoStandard a6, byte[] a7) throws IOException, DocumentException, GeneralSecurityException {
        int n = 20480;
        if (a7.length > n) {
            n = a7.length + 5120;
        }
        a.setCertificate(a4[0]);
        if (a6 == MakeSignature.CryptoStandard.CADES) {
            a.addDeveloperExtension(PdfDeveloperExtension.ESIC_1_7_EXTENSIONLEVEL2);
        }
        Object object = new PdfSignature(PdfName.ADOBE_PPKLITE, a6 == MakeSignature.CryptoStandard.CADES ? PdfName.ETSI_CADES_DETACHED : PdfName.ADBE_PKCS7_DETACHED);
        PdfSignatureAppearance pdfSignatureAppearance = a;
        PdfSignature pdfSignature = object;
        PdfSignatureAppearance pdfSignatureAppearance2 = a;
        ((PdfSignature)object).setReason(a.getReason());
        ((PdfSignature)object).setLocation(pdfSignatureAppearance2.getLocation());
        pdfSignature.setSignatureCreator(pdfSignatureAppearance2.getSignatureCreator());
        pdfSignature.setContact(pdfSignatureAppearance.getContact());
        ((PdfSignature)object).setDate(new PdfDate(a.getSignDate()));
        ((PdfDictionary)object).put(new PdfName(CertObject.J("PFJ[")), new PdfString("0"));
        pdfSignatureAppearance.setCryptoDictionary((PdfDictionary)object);
        object = new HashMap<PdfName, Integer>();
        ((HashMap)object).put(PdfName.CONTENTS, n * 2 + 2);
        PdfSignatureAppearance pdfSignatureAppearance3 = a;
        pdfSignatureAppearance3.preClose((HashMap<PdfName, Integer>)object);
        object = a3.getHashAlgorithm();
        Object object2 = a4 = new PdfPKCS7(null, (Certificate[])a4, (String)object, null, (ExternalDigest)a2, false);
        ((PdfPKCS7)object2).setExternalDigest(a7, null, a3.getEncryptionAlgorithm());
        a2 = ((PdfPKCS7)object2).getEncodedPKCS7(DigestAlgorithms.digest(pdfSignatureAppearance3.getRangeStream(), a2.getMessageDigest((String)object)), a5, null, null, a6);
        if (n < ((Object)a2).length) {
            throw new IOException(HighlightPos.J("\u000248{)5#.+3l(<:/>"));
        }
        a3 = new byte[n];
        System.arraycopy(a2, 0, a3, 0, ((Object)a2).length);
        Object object3 = a2 = new PdfDictionary();
        ((PdfDictionary)object3).put(PdfName.CONTENTS, new PdfString((byte[])a3).setHexWriting(true));
        a.close((PdfDictionary)object3);
    }

    public static byte[] doMerge(String a, String a2, String a3, String a4, float a5, float a6, int a7, String a8, String a9, String a10, Map<String, String> a11) {
        try {
            Image image;
            PdfReader pdfReader = new PdfReader(Base64Util.decode(a));
            a2 = SM2CertUtil.getX509Certificate(Base64Util.decode((String)a2));
            a3 = Base64Util.decode((String)a3);
            ArrayList<SignInfo> arrayList = new ArrayList<SignInfo>();
            Image image2 = image = Image.getInstance(Base64Util.decode(a4));
            float f = image2.getWidth();
            float f2 = image2.getHeight();
            Rectangle rectangle = pdfReader.getPageSize(a7);
            if (pdfReader.getPageN(a7).getAsNumber(PdfName.ROTATE) != null) {
                rectangle = pdfReader.getPageSize(a7).rotate();
            }
            a6 = rectangle.getHeight() - a6;
            Rectangle rectangle2 = new Rectangle(a5 - (f *= 0.75f) / 2.0f, a6 - (f2 *= 0.75f) / 2.0f, a5 + f / 2.0f, a6 + f2 / 2.0f);
            arrayList.add(new SignInfo(rectangle2, a7, a5, a6, a4, image, a8));
            return PDFMergeUtil.signatureMerge(pdfReader, (byte[])a3, (X509Certificate)a2, arrayList, a9, a10, a11);
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
            return null;
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public boolean mergePdfFiles(Map<String, InputStream> a, String a22, Boolean a3) {
        boolean bl;
        block11: {
            PdfReader.unethicalreading = true;
            Document document = new Document();
            InputStream inputStream = null;
            FileOutputStream fileOutputStream = null;
            bl = false;
            try {
                fileOutputStream = new FileOutputStream(new File((String)a22));
                a22 = new PdfCopy(document, (OutputStream)fileOutputStream);
                document.open();
                PdfOutline pdfOutline = ((PdfWriter)a22).getRootOutline();
                int n = 0;
                int n2 = 1;
                Object object = a = a.entrySet().iterator();
                while (object.hasNext()) {
                    int n3;
                    Map.Entry entry = (Map.Entry)a.next();
                    inputStream = (InputStream)entry.getValue();
                    PdfReader pdfReader = new PdfReader(inputStream);
                    int n4 = pdfReader.getNumberOfPages();
                    int n5 = n3 = 1;
                    while (n5 <= n4) {
                        document.newPage();
                        ++n;
                        PdfImportedPage pdfImportedPage = ((PdfCopy)a22).getImportedPage(pdfReader, n3);
                        if (a3.booleanValue()) {
                            PdfCopy.PageStamp pageStamp = ((PdfCopy)a22).createPageStamp(pdfImportedPage);
                            ColumnText.showTextAligned(pageStamp.getOverContent(), 1, new Phrase(new StringBuilder().insert(0, CertObject.J("\u7b3a")).append(n).append(HighlightPos.J("\u982e")).toString()), 300.0f, 5.0f, 0.0f);
                            pageStamp.alterContents();
                        }
                        ((PdfCopy)a22).addPage(pdfImportedPage);
                        n5 = ++n3;
                    }
                    pdfReader.close();
                    inputStream.close();
                    PdfAction pdfAction = PdfAction.gotoLocalPage(n2, new PdfDestination(1), (PdfWriter)a22);
                    new PdfOutline(pdfOutline, pdfAction, (String)entry.getKey(), false);
                    n2 = n + 1;
                    object = a;
                }
                ((PdfCopy)a22).close();
                fileOutputStream.close();
                bl = true;
                if (document != null) {
                    document.close();
                    return bl;
                }
            }
            catch (Exception a22) {
                log.error(CertObject.J("\u541d\u5e60\u6592\u6875\u5f17\u5e2e"), a22);
                return bl;
            }
            finally {
                if (document == null) break block11;
                document.close();
            }
        }
        return bl;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Loose catch block
     */
    public static String verifySingleSign(PdfReader a, String a2) throws Exception {
        ArrayList<SignatureInfo> arrayList;
        block10: {
            ArrayList<SignatureInfo> arrayList2;
            block9: {
                arrayList2 = new ArrayList<SignatureInfo>();
                AcroFields acroFields = a.getAcroFields();
                SignatureDataExtractor signatureDataExtractor = new SignatureDataExtractor(a);
                try {
                    SignatureInfo signatureInfo = new SignatureInfo();
                    signatureInfo = PDFMergeUtil.J(acroFields, a2, signatureDataExtractor, null, a);
                    if (signatureInfo != null) {
                        arrayList2.add(signatureInfo);
                    }
                }
                catch (Exception exception) {
                    exception.printStackTrace();
                }
                if (a == null) break block9;
                arrayList = arrayList2;
                a.close();
                break block10;
                {
                    catch (Exception exception) {
                        try {
                            log.error(exception.getMessage(), exception);
                            if (a == null) break block9;
                            arrayList = arrayList2;
                            a.close();
                            break block10;
                        }
                        catch (Throwable throwable) {
                            if (a != null) {
                                a.close();
                            }
                            throw throwable;
                        }
                    }
                }
            }
            arrayList = arrayList2;
        }
        return JSONUtils.bean2json(arrayList);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * WARNING - Removed back jump from a try to a catch block - possible behaviour change.
     * Unable to fully structure code
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static String imageMergeByTmpfile(PdfReader a, String a, List<SignInfo> a) throws Exception {
        block20: {
            block18: {
                block19: {
                    var3_6 = null;
                    var4_7 = "";
                    var5_8 = new BufferedOutputStream(new FileOutputStream(a));
                    var6_10 = null;
                    v0 = var3_6 = new PdfStamper(a, var5_8, '\u0000', true);
                    PDFMergeUtil.J(v0, a);
                    var4_7 = a;
                    if (v0 != null) {
                        var3_6.close();
                    }
                    if (var5_8 == null) break block18;
                    if (var6_10 == null) break block19;
                    ** GOTO lbl43
                    {
                        catch (Exception var5_9) {
                            v1 = new Object[1];
                            v1[0] = a;
                            PDFMergeUtil.log.error(String.format(HighlightPos.J("\u56a5\u720b\u7b25\u7aac\u4f24\u7564\u4e6f\u65ba\u65dc\u4eba\u5453\u5e3a\u596a\u8d69\uff41i("), v1), var5_9);
                            return var4_7;
                        }
                        catch (Throwable a) {
                            try {
                                var6_10 = a;
                                throw var6_10;
                            }
                            catch (Throwable var7_11) {
                                if (var5_8 != null) {
                                    if (var6_10 != null) {
                                        try {
                                            var5_8.close();
                                            v2 = var7_11;
                                            throw v2;
                                        }
                                        catch (Throwable a) {
                                            v2 = var7_11;
                                            var6_10.addSuppressed(a);
                                            throw v2;
                                        }
                                    }
                                    var5_8.close();
                                }
                                v2 = var7_11;
                                throw v2;
                            }
                        }
lbl43:
                        // 1 sources

                        try {
                            var5_8.close();
                            v3 = a;
                        }
                        catch (Throwable a) {}
                        {
                            v3 = a;
                            var6_10.addSuppressed(a);
                        }
                    }
                    break block20;
                }
                var5_8.close();
                v3 = a;
                break block20;
            }
            v3 = a;
        }
        if (v3 == null) return var4_7;
        a.close();
        return var4_7;
        finally {
            if (a == null) return var4_7;
            a.close();
        }
    }

    /*
     * Exception decompiling
     */
    private static /* synthetic */ MixedSignCtx J(PdfReader a, AcroFields a, boolean a, Map<String, String> a) throws VerifyByCaTypeException {
        /*
         * This method has failed to decompile.  When submitting a bug report, please provide this stack trace, and (if you hold appropriate legal rights) the relevant class file.
         * 
         * org.benf.cfr.reader.util.ConfusedCFRException: Tried to end blocks [0[TRYBLOCK]], but top level block is 27[WHILELOOP]
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.processEndingBlocks(Op04StructuredStatement.java:435)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.buildNestedBlocks(Op04StructuredStatement.java:484)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op03SimpleStatement.createInitialStructuredBlock(Op03SimpleStatement.java:736)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisInner(CodeAnalyser.java:850)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisOrWrapFail(CodeAnalyser.java:278)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysis(CodeAnalyser.java:201)
         *     at org.benf.cfr.reader.entities.attributes.AttributeCode.analyse(AttributeCode.java:94)
         *     at org.benf.cfr.reader.entities.Method.analyse(Method.java:531)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseMid(ClassFile.java:1050)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseTop(ClassFile.java:942)
         *     at org.benf.cfr.reader.Driver.doJarVersionTypes(Driver.java:257)
         *     at org.benf.cfr.reader.Driver.doJar(Driver.java:139)
         *     at org.benf.cfr.reader.CfrDriverImpl.analyse(CfrDriverImpl.java:76)
         *     at org.benf.cfr.reader.Main.main(Main.java:54)
         */
        throw new IllegalStateException("Decompilation failed");
    }

    private static /* synthetic */ Map<String, String> J(PdfDictionary a, PdfDictionary a2) {
        String string;
        PdfString pdfString;
        String string2;
        HashMap<String, String> hashMap = new HashMap<String, String>();
        for (PdfName pdfName : a.getKeys()) {
            string2 = pdfName.toString();
            if (string2.indexOf(CertObject.J("PFERSI")) == -1 || (pdfString = (PdfString)a.get(pdfName)) == null) continue;
            string = string2.split(HighlightPos.J("\u0004"))[1];
            hashMap.put(string, pdfString.toUnicodeString());
        }
        if (hashMap.isEmpty()) {
            for (PdfName pdfName : a2.getKeys()) {
                string2 = pdfName.toString();
                if (string2.indexOf(CertObject.J("PFERSI")) == -1 || (pdfString = (PdfString)a2.get(pdfName)) == null) continue;
                string = string2.split(HighlightPos.J("\u0004"))[1];
                hashMap.put(string, pdfString.toUnicodeString());
            }
        }
        return hashMap;
    }

    private static /* synthetic */ void J(PdfStamper a, List<SignInfo> a2) throws Exception {
        Object object = a2 = a2.iterator();
        while (object.hasNext()) {
            SignInfo signInfo = (SignInfo)a2.next();
            Image image = Image.getInstance(Base64Util.decode(signInfo.getImgbase64()));
            int n = signInfo.getPage();
            Rectangle rectangle = signInfo.getRect();
            PdfContentByte pdfContentByte = a.getOverContent(n);
            object = a2;
            Image image2 = image;
            float f = image.getWidth() * 0.75f;
            float f2 = image2.getHeight() * 0.75f;
            image2.setAbsolutePosition(rectangle.getLeft(), rectangle.getBottom());
            image2.scaleAbsolute(f, f2);
            pdfContentByte.addImage(image);
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static ByteArrayOutputStream imageMergeOs(PdfReader a, List<SignInfo> a2) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream;
        block5: {
            byteArrayOutputStream = new ByteArrayOutputStream();
            PdfStamper pdfStamper = null;
            try {
                pdfStamper = new PdfStamper(a, byteArrayOutputStream, '\u0000', true);
                PDFMergeUtil.J(pdfStamper, a2);
                if (pdfStamper == null) break block5;
            }
            catch (Throwable throwable) {
                if (pdfStamper != null) {
                    pdfStamper.close();
                }
                if (a != null) {
                    a.close();
                }
                throw throwable;
            }
            pdfStamper.close();
        }
        if (a != null) {
            a.close();
            return byteArrayOutputStream;
        }
        return byteArrayOutputStream;
    }

    public static String verifyPDFWithMixed(PdfReader a, AcroFields a2, Map<String, String> a3) throws VerifyByCaTypeException {
        return JSONUtils.bean2json(PDFMergeUtil.J(a, a2, true, a3));
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfsignatureinfo.strategy.impl;

import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.gm.ses.v4.SES_ESPropertyInfo;
import com.epoint.epsignature.gm.ses.v4.SES_Signature;
import com.epoint.epsignature.gm.ses.v4.SESeal;
import com.epoint.epsignature.gm.ses.v4.TBS_Sign;
import com.epoint.epsignature.pdfsignatureinfo.bean.PdfSignatureInfo;
import com.epoint.epsignature.pdfsignatureinfo.enums.BZTSealTypeEnum;
import com.epoint.epsignature.pdfsignatureinfo.enums.ZZSealTypeEnum;
import com.epoint.epsignature.pdfsignatureinfo.strategy.PdfVerifyStrategy;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PdfValidator;
import com.epoint.epsignature.utils.TZGMVerifyPdf;
import com.epoint.gmhelper.bouncycastle.jce.provider.BouncyCastleProvider;
import com.epoint.itextpdf.text.pdf.AcroFields;
import com.epoint.itextpdf.text.pdf.PdfDictionary;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.PdfString;
import java.security.Security;
import java.security.cert.X509Certificate;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class H5AndZZPdfVerifyStrategy
implements PdfVerifyStrategy {
    private static final String DATE_FORMAT_PATTERN = "yyyy-MM-dd HH:mm:ss";
    private static Logger log = Logger.getLogger(H5AndZZPdfVerifyStrategy.class);
    private static final String ZZ_MARKID = "/GM.sm2seal";
    private static final Map<ZZSealTypeEnum, BZTSealTypeEnum> SEAL_TYPE_MAPPING;
    private static final PdfName EPPDF_SIGNNAME;
    private static final PdfName EPPDF_CERTORGID;
    private static final PdfName EPPDF_SIGNTYPE;

    static {
        EPPDF_SIGNTYPE = new PdfName(DZYYZZReq.J("}2h&~=K\u000b_\fL\u001bH\u0007"));
        EPPDF_SIGNNAME = new PdfName(TZGMVerifyPdf.J("!@4T\"O\u0017y\u0003~\nq\tu"));
        EPPDF_CERTORGID = new PdfName(DZYYZZReq.J("'h2|$g\u0001]\u0010L-J\u0005q&"));
        try {
            Security.addProvider(new BouncyCastleProvider());
            System.setProperty(TZGMVerifyPdf.J("\u0007\u007f\t>\u0001`\u000by\ndJw\tx\u0001|\u0014u\u0016>\u0006\u007f\u0011~\u0007i\u0007q\u0017d\buJq\u0017~U>\u0005|\b\u007f\u0013O\u0011~\u0017q\u0002u;y\nd\u0001w\u0001b"), DZYYZZReq.J("L\u0010M\u0007"));
            System.setProperty(TZGMVerifyPdf.J("\u000bb\u0003>\u0006\u007f\u0011~\u0007i\u0007q\u0017d\buJq\u0017~U>\u0005|\b\u007f\u0013O\u0011~\u0017q\u0002u;y\nd\u0001w\u0001b"), DZYYZZReq.J("L\u0010M\u0007"));
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
        }
        HashMap<ZZSealTypeEnum, BZTSealTypeEnum> hashMap = new HashMap<ZZSealTypeEnum, BZTSealTypeEnum>();
        hashMap.put(ZZSealTypeEnum.\u516c\u7ae0, BZTSealTypeEnum.\u516c\u7ae0);
        hashMap.put(ZZSealTypeEnum.\u624b\u5199\u7b7e\u540d, BZTSealTypeEnum.\u7535\u5b50\u79c1\u7ae0);
        hashMap.put(ZZSealTypeEnum.\u6cd5\u5b9a\u4ee3\u8868\u4eba\u7ae0, BZTSealTypeEnum.\u6cd5\u4eba\u5370\u9274);
        hashMap.put(ZZSealTypeEnum.\u4eba\u540d\u7ae0, BZTSealTypeEnum.\u6cd5\u4eba\u7b7e\u5b57);
        SEAL_TYPE_MAPPING = Collections.unmodifiableMap(hashMap);
    }

    private /* synthetic */ boolean b(PdfDictionary a) {
        return a.contains(PdfName.SUBFILTER) && ZZ_MARKID.equals(a.get(PdfName.SUBFILTER).toString());
    }

    private /* synthetic */ void J(AcroFields a, String a2, PdfSignatureInfo a3) {
        if ((a = ((AcroFields)a).getFieldPositions(a2)) != null && !a.isEmpty()) {
            a3.setPage(String.valueOf(((AcroFields.FieldPosition)a.get((int)0)).page));
        }
    }

    private /* synthetic */ String J(String a) {
        return a;
    }

    private /* synthetic */ void J(PdfValidator a, PdfDictionary a2, PdfSignatureInfo.Ext a3) {
        H5AndZZPdfVerifyStrategy a4;
        if ((a = ((PdfValidator)a).getSesSignature()) == null) {
            return;
        }
        if ((a = ((SES_Signature)a).getToSign()) == null) {
            return;
        }
        if ((a = (SESeal)((TBS_Sign)a).getEseal()) == null) {
            return;
        }
        a = ((SESeal)a).geteSealInfo().getProperty();
        String string = String.valueOf(((SES_ESPropertyInfo)a).getType());
        if (a4.b(a2)) {
            string = a4.J(string);
        }
        a3.setSigntype(string);
        a3.setSignname(((SES_ESPropertyInfo)a).getName().getString());
    }

    private /* synthetic */ void b(PdfDictionary a, PdfSignatureInfo.Ext a2) {
        PdfString pdfString;
        if (a.contains(EPPDF_SIGNTYPE)) {
            pdfString = (PdfString)a.get(EPPDF_SIGNTYPE);
            a2.setSigntype(pdfString.toUnicodeString());
        }
        if (a.contains(EPPDF_SIGNNAME)) {
            pdfString = (PdfString)a.get(EPPDF_SIGNNAME);
            a2.setSignname(pdfString.toUnicodeString());
        }
        if (a.contains(EPPDF_CERTORGID)) {
            pdfString = (PdfString)a.get(EPPDF_CERTORGID);
            a2.setCertOrgID(pdfString.toUnicodeString());
            return;
        }
        a2.setCertOrgID("");
    }

    private /* synthetic */ void J(PdfReader a2) {
        if (a2 != null) {
            try {
                a2.close();
                return;
            }
            catch (Exception a2) {
                log.error(TZGMVerifyPdf.J("\u5117\u95fd4t\u0002B\u0001q\u0000u\u0016\u65e6\u53b5\u750f\u5f66\u5e28"), a2);
            }
        }
    }

    private /* synthetic */ boolean J(PdfDictionary a) {
        if (a == null) {
            return false;
        }
        a = ((PdfDictionary)a).getKeys().iterator();
        while (a.hasNext()) {
            if (((PdfName)a.next()).toString().indexOf(DZYYZZReq.J("}2h&~=")) == -1) continue;
            return true;
        }
        return false;
    }

    private /* synthetic */ void J(AcroFields a, String a2, List<PdfSignatureInfo> a3, PdfReader a4) {
        H5AndZZPdfVerifyStrategy a5;
        PdfDictionary pdfDictionary = ((AcroFields)a).getSignatureDictionary(a2);
        if (pdfDictionary == null) {
            return;
        }
        if ((a = a5.J((AcroFields)a, a2, pdfDictionary, a4)) != null) {
            a3.add((PdfSignatureInfo)a);
        }
    }

    private /* synthetic */ void b(PdfValidator a, PdfSignatureInfo a2) {
        H5AndZZPdfVerifyStrategy a3;
        a = a3.J(((PdfValidator)a).getSignDate());
        a2.setSigndate((String)a);
    }

    private /* synthetic */ void J(PdfDictionary a, PdfSignatureInfo.Ext a2) {
        H5AndZZPdfVerifyStrategy a3;
        if (a == null) {
            return;
        }
        a3.b(a, a2);
    }

    private /* synthetic */ void J(AcroFields a, List<PdfSignatureInfo> a2, PdfReader a3) {
        Iterator iterator;
        Iterator iterator2 = iterator = a.getSignatureNames().iterator();
        while (iterator2.hasNext()) {
            H5AndZZPdfVerifyStrategy a4;
            String string = (String)iterator.next();
            iterator2 = iterator;
            a4.J(a, string, a2, a3);
        }
    }

    private /* synthetic */ PdfSignatureInfo J(AcroFields a, String a2, PdfDictionary a3, PdfReader a4) {
        try {
            H5AndZZPdfVerifyStrategy a5;
            PdfSignatureInfo pdfSignatureInfo = new PdfSignatureInfo();
            AcroFields acroFields = a;
            pdfSignatureInfo.setSignid(a2);
            a4 = PdfValidator.getInstance(acroFields, a2, (PdfReader)a4);
            PdfDictionary pdfDictionary = acroFields.getFieldItem(a2).getValue(0);
            H5AndZZPdfVerifyStrategy h5AndZZPdfVerifyStrategy = a5;
            H5AndZZPdfVerifyStrategy h5AndZZPdfVerifyStrategy2 = a5;
            h5AndZZPdfVerifyStrategy2.J((PdfValidator)a4, pdfSignatureInfo);
            h5AndZZPdfVerifyStrategy2.J((PdfValidator)a4, pdfSignatureInfo, pdfDictionary, a3);
            h5AndZZPdfVerifyStrategy.J(a, a2, pdfSignatureInfo);
            h5AndZZPdfVerifyStrategy.b((PdfValidator)a4, pdfSignatureInfo);
            return pdfSignatureInfo;
        }
        catch (Exception exception) {
            Object[] objectArray = new Object[1];
            objectArray[0] = a2;
            log.warn(String.format(TZGMVerifyPdf.J("\u5914\u7462\u7b6e\u54695\u0017\u65e6\u53b5\u750f\u5f66\u5e28"), objectArray), exception);
            return null;
        }
    }

    private /* synthetic */ void J(PdfValidator a, PdfSignatureInfo a2) {
        if ((a = ((PdfValidator)a).getSigningCertificate()) == null) {
            return;
        }
        PdfSignatureInfo.Cert cert = new PdfSignatureInfo.Cert();
        Object object = CertUtils.getClientSignCertCN((X509Certificate)a);
        PdfSignatureInfo.Cert cert2 = cert;
        cert2.setSigner((String)object);
        object = new SimpleDateFormat(DATE_FORMAT_PATTERN);
        cert2.setCertstartdate(((DateFormat)object).format(((X509Certificate)a).getNotBefore()));
        cert2.setCertenddate(((DateFormat)object).format(((X509Certificate)a).getNotAfter()));
        a2.setCert(cert);
    }

    private /* synthetic */ List<PdfSignatureInfo> J(PdfReader a) throws Exception {
        H5AndZZPdfVerifyStrategy a2;
        ArrayList<PdfSignatureInfo> arrayList = new ArrayList<PdfSignatureInfo>();
        try {
            AcroFields acroFields = a.getAcroFields();
            if (acroFields == null) {
                ArrayList<PdfSignatureInfo> arrayList2 = arrayList;
                return arrayList2;
            }
            a2.J(acroFields, arrayList, a);
            return arrayList;
        }
        catch (Exception exception) {
            log.error(DZYYZZReq.J("*\r#V\u0006b8h\u0006^4]\u0010Q\u0004A1L\u0010Y\u0016]\u0005A\u9aee\u8bf9\u8fa5\u7a33\u4e4f\u53e9\u757d\u9521\u8b8d"), exception);
            throw exception;
        }
        finally {
            a2.J(a);
        }
    }

    @Override
    public String verify(PdfReader a) throws Exception {
        H5AndZZPdfVerifyStrategy a2;
        return JSONUtils.bean2json(a2.J(a));
    }

    public H5AndZZPdfVerifyStrategy() {
        H5AndZZPdfVerifyStrategy a;
    }

    private /* synthetic */ String J(long a) {
        return new SimpleDateFormat(DATE_FORMAT_PATTERN).format(new Date(a));
    }

    private /* synthetic */ void J(PdfValidator a, PdfSignatureInfo a2, PdfDictionary a3, PdfDictionary a4) {
        H5AndZZPdfVerifyStrategy a5;
        PdfSignatureInfo.Ext ext;
        PdfSignatureInfo.Ext ext2 = new PdfSignatureInfo.Ext();
        if (PdfValidator.StructType.PKCS7.equals((Object)a.getStructtype())) {
            PdfSignatureInfo.Ext ext3 = ext2;
            ext = ext3;
            a5.J(a3, ext3);
        } else {
            if (PdfValidator.StructType.ESESIGNATURE.equals((Object)a.getStructtype())) {
                a5.J(a, a4, ext2);
            }
            ext = ext2;
        }
        ext.setIsh5sign(a5.J(a3));
        a2.setExt(ext2);
    }
}


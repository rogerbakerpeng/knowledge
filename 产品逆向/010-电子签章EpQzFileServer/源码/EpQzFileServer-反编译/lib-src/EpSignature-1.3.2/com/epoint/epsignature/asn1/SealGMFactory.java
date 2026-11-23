/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1;

import com.epoint.epsignature.asn1.SealMaker;
import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.gm.ses.v1.ExtensionDatas;
import com.epoint.epsignature.gm.ses.v1.SES_ESPictrueInfo;
import com.epoint.epsignature.gm.ses.v1.SES_Header;
import com.epoint.epsignature.gm.ses.v4.CertInfoList;
import com.epoint.epsignature.gm.ses.v4.SES_CertList;
import com.epoint.epsignature.gm.ses.v4.SES_ESPropertyInfo;
import com.epoint.epsignature.gm.ses.v4.SES_SealInfo;
import com.epoint.epsignature.gm.ses.v4.SESeal;
import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1GeneralizedTime;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERUTF8String;
import com.epoint.gmhelper.bouncycastle.asn1.DLSequence;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.security.cert.Certificate;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import javax.imageio.ImageIO;
import org.apache.log4j.Logger;

public class SealGMFactory {
    public static final String SES_VID = "GASS";
    public static final String POINT_VID = "1.2.156.124445.2";
    private /* synthetic */ SealMaker b;
    public static final String SES_ID = "ES";
    public static final long SES_VERSION = 4L;
    private static Logger logger = Logger.getLogger(SealGMFactory.class);

    public SealGMFactory(SealMaker a) {
        SealGMFactory a2;
        a2.b = a;
    }

    protected static DEROctetString cert2OctetString(Certificate a) {
        try {
            return new DEROctetString(a.getEncoded());
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            throw new RuntimeException(EpOFDData.J(")C8Rxi)R/R\u0019R8O$A\u9553\u8bc9"));
        }
    }

    public SESeal makeSeal(String a, int a2, String a3, String a4, byte[] a5, Certificate[] a6, int a7, long[] a8, Map<String, Object> a9) throws Exception {
        SealGMFactory a10;
        return a10.J(a, a2, a3, a4, a5, a6, a7, a8, false, a9);
    }

    public SESeal makeSeal(String a, int a2, String a3, String a4, byte[] a5, Certificate[] a6, int a7, boolean a8, Map<String, Object> a9) throws Exception {
        SealGMFactory a10;
        return a10.J(a, a2, a3, a4, a5, a6, a7, null, a8, a9);
    }

    protected static ASN1OctetString[] certList2asn1Seq(Certificate[] a) {
        ASN1OctetString[] aSN1OctetStringArray;
        try {
            int n;
            aSN1OctetStringArray = new ASN1OctetString[a.length];
            int n2 = n = 0;
            while (n2 < a.length) {
                int n3 = n;
                DEROctetString dEROctetString = new DEROctetString(a[n].getEncoded());
                aSN1OctetStringArray[n3] = dEROctetString;
                n2 = ++n;
            }
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            throw new RuntimeException(UnauthorizedAccessException.J("4i%x\u001be$xem$bf_2}\u5966\u8d29"));
        }
        return aSN1OctetStringArray;
    }

    public SESeal makeSeal(String a, int a2, String a3, String a4, byte[] a5, Certificate[] a6, int a7) throws Exception {
        SealGMFactory a8;
        return a8.makeSeal(a, a2, a3, a4, a5, a6, a7, null);
    }

    public SESeal makeSeal(String a, int a22, String a3, String a4, byte[] a5, Certificate[] a6, int a7, long[] a8) throws Exception {
        SealGMFactory a9;
        SealGMFactory sealGMFactory = a9;
        a = sealGMFactory.J((String)a, a22, a3, a4, a5, a6, a7, a8, false, null);
        Object a22 = new ASN1EncodableVector();
        ASN1EncodableVector aSN1EncodableVector = a22;
        Object object = a;
        ASN1EncodableVector aSN1EncodableVector2 = a22;
        aSN1EncodableVector2.add(((SESeal)a).geteSealInfo().getHeader());
        aSN1EncodableVector2.add(((SESeal)a).geteSealInfo().getEsID());
        ((ASN1EncodableVector)a22).add(((SESeal)object).geteSealInfo().getProperty());
        aSN1EncodableVector.add(((SESeal)object).geteSealInfo().getPicture());
        aSN1EncodableVector.add(((SESeal)a).geteSealInfo().getExtDatas());
        a22 = sealGMFactory.b.signData(new DLSequence((ASN1EncodableVector)a22).getEncoded(EpOFDData.J("b\u000ft")));
        Object object2 = a;
        ((SESeal)object2).setSignedValue((byte[])a22);
        return object2;
    }

    private /* synthetic */ SESeal J(String a, int a22, String a3, String a4, byte[] a5, Certificate[] a6, int a72, long[] a8, boolean a9, Map<String, Object> a10) throws Exception {
        SealGMFactory a11;
        a8 = a11.b.getSignDate();
        Calendar calendar = a9 = Calendar.getInstance();
        calendar.setTime((Date)a8);
        calendar.add(2, a72);
        ExtensionDatas a72 = new ExtensionDatas();
        a6 = new CertInfoList(SealGMFactory.certList2asn1Seq(a6));
        SES_ESPropertyInfo a22 = new SES_ESPropertyInfo(new ASN1Integer(a22), new DERUTF8String((String)a3), new ASN1Integer(1L), new SES_CertList((CertInfoList)a6), new ASN1GeneralizedTime((Date)a8), new ASN1GeneralizedTime((Date)a8), new ASN1GeneralizedTime(a9.getTime()));
        a3 = ImageIO.read(new ByteArrayInputStream(a5));
        a3 = new SES_ESPictrueInfo(new DERIA5String((String)a4), new DEROctetString(a5), new ASN1Integer((long)((double)((BufferedImage)a3).getHeight() / 3.78)), new ASN1Integer((long)((double)((BufferedImage)a3).getWidth() / 3.78)));
        a4 = new SES_Header(new ASN1Integer(4L), new DERIA5String(SES_VID));
        a = new SES_SealInfo((SES_Header)a4, new DERIA5String((String)a), a22, (SES_ESPictrueInfo)a3, a72);
        return new SESeal((SES_SealInfo)a, SealGMFactory.cert2OctetString(a11.b.getCertificate()), new ASN1ObjectIdentifier(a11.b.getSignatureAlg()), new DERBitString(new byte[0]));
    }

    public SESeal makeSeal(String a, int a2, String a3, String a4, byte[] a5, Certificate[] a6, int a7, boolean a8) throws Exception {
        SealGMFactory a9;
        return a9.J(a, a2, a3, a4, a5, a6, a7, null, a8, null);
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1;

import com.epoint.epsignature.asn1.SealMaker;
import com.epoint.epsignature.asn1.dto.EpExtData;
import com.epoint.epsignature.asn1.dto.EpExtensionDatas;
import com.epoint.epsignature.asn1.dto.EpSESESPictureInfo;
import com.epoint.epsignature.asn1.dto.EpSESESPropertyInfo;
import com.epoint.epsignature.asn1.dto.EpSESHeader;
import com.epoint.epsignature.asn1.dto.EpSESSealInfo;
import com.epoint.epsignature.asn1.dto.EpSESSignInfo;
import com.epoint.epsignature.asn1.dto.EpSESeal;
import com.epoint.epsignature.asn1.model.EpASN1Object;
import com.epoint.epsignature.asn1.model.EpSealExts;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.utils.PointUtil;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import java.security.cert.Certificate;
import java.util.Calendar;
import java.util.Date;
import org.apache.log4j.Logger;

public class SealFactory {
    public static final String SES_ID = "ES";
    public static final String POINT_VID = "1.2.156.124445.2";
    private /* synthetic */ SealMaker b;
    private static Logger logger = Logger.getLogger(SealFactory.class);
    public static final String SES_VID = "EpointQz";
    public static final EpSESHeader sh = new EpSESHeader("ES", 11L, "EpointQz");
    public static final long SES_VERSION = 11L;

    public byte[] makeSeal1(String a, int a22, String a3, String a4, byte[] a5, Certificate[] a6, int a7, String a8, EpSESeal a9) throws Exception {
        a = a9;
        byte[] a22 = Base64Util.decode(a8);
        Object object = a;
        ((EpSESeal)object).getSignInfo().setSignData(a22);
        return ((EpASN1Object)object).getEncoded();
    }

    public SealFactory(SealMaker a) {
        SealFactory a2;
        a2.b = a;
    }

    public EpSESeal makeSeal(String a, int a2, String a3, String a4, byte[] a5, Certificate[] a6, int a7, boolean a8) throws Exception {
        SealFactory a9;
        return a9.J(a, a2, a3, a4, a5, a6, a7, null, a8, null);
    }

    private /* synthetic */ EpSESeal b(String a, int a22, String a3, String a4, byte[] a52, Certificate[] a6, Date a7, Date a8, long[] a9, boolean a10, EpSealExts a11) throws Exception {
        SealFactory a12;
        Date date = a12.b.getSignDate();
        EpExtensionDatas epExtensionDatas = new EpExtensionDatas();
        EpSESESPropertyInfo a22 = new EpSESESPropertyInfo(Long.valueOf(a22), (String)a3, a6, date, (Date)a7, a8);
        a3 = new EpSESESPictureInfo((String)a4, (byte[])a52, epExtensionDatas, a10, a9);
        a4 = PointUtil.getRandomPoint(((EpSESESPictureInfo)a3).getWidth().longValue(), ((EpSESESPictureInfo)a3).getHeight().longValue());
        a4 = new EpExtData(POINT_VID, true, a4.getBytes());
        epExtensionDatas.appendExtData((EpExtData)a4);
        if (a11 != null) {
            a4 = a11.getEpExtDatas();
            int a52 = ((EpExtData[])a4).length;
            int n = a6 = 0;
            while (n < a52) {
                a7 = a4[a6];
                epExtensionDatas.appendExtData((EpExtData)a7);
                n = ++a6;
            }
        }
        a4 = new EpSESSealInfo(sh, a, a22, (EpSESESPictureInfo)a3, epExtensionDatas);
        Object a52 = new EpSESSignInfo(a12.b.getCertificate(), new ASN1ObjectIdentifier(a12.b.getSignatureAlg()), new byte[0]);
        return new EpSESeal((EpSESSealInfo)a4, (EpSESSignInfo)a52);
    }

    public byte[] makeSeal(String a, int a22, String a3, String a4, byte[] a5, Certificate[] a6, int a7, long[] a8, EpSealExts a9) throws Exception {
        SealFactory a10;
        SealFactory sealFactory = a10;
        a = sealFactory.J((String)a, a22, a3, a4, a5, a6, a7, a8, false, a9);
        byte[] a22 = sealFactory.b.signData(((EpSESeal)a).getSignByte());
        Object object = a;
        ((EpSESeal)object).getSignInfo().setSignData(a22);
        return ((EpASN1Object)object).getEncoded();
    }

    public byte[] makeSeal(String a, int a2, String a3, String a4, byte[] a5, Certificate[] a6, int a7) throws Exception {
        SealFactory a8;
        return a8.makeSeal(a, a2, a3, a4, a5, a6, a7, null);
    }

    public byte[] makeSeal(String a, int a22, String a3, String a4, byte[] a5, Certificate[] a6, Date a7, Date a8) throws Exception {
        SealFactory a9;
        SealFactory sealFactory = a9;
        a = sealFactory.J((String)a, a22, a3, a4, a5, a6, a7, a8, null, false, null);
        byte[] a22 = sealFactory.b.signData(((EpSESeal)a).getSignByte());
        Object object = a;
        ((EpSESeal)object).getSignInfo().setSignData(a22);
        return ((EpASN1Object)object).getEncoded();
    }

    public byte[] makeSeal(String a, int a22, String a3, String a4, byte[] a5, Certificate[] a6, int a7, long[] a8) throws Exception {
        SealFactory a9;
        SealFactory sealFactory = a9;
        a = sealFactory.J((String)a, a22, a3, a4, a5, a6, a7, a8, false, null);
        byte[] a22 = sealFactory.b.signData(((EpSESeal)a).getSignByte());
        Object object = a;
        ((EpSESeal)object).getSignInfo().setSignData(a22);
        return ((EpASN1Object)object).getEncoded();
    }

    private /* synthetic */ EpSESeal J(String a, int a2, String a3, String a4, byte[] a5, Certificate[] a6, Date a7, Date a8, long[] a9, boolean a10, EpSealExts a11) throws Exception {
        SealFactory a12;
        return a12.b(a, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
    }

    public byte[] makeSeal(String a, int a22, String a3, String a4, byte[] a5, Certificate[] a6, Date a7, Date a8, long[] a9, EpSealExts a10) throws Exception {
        SealFactory a11;
        SealFactory sealFactory = a11;
        a = sealFactory.J((String)a, a22, a3, a4, a5, a6, a7, a8, a9, false, a10);
        byte[] a22 = sealFactory.b.signData(((EpSESeal)a).getSignByte());
        Object object = a;
        ((EpSESeal)object).getSignInfo().setSignData(a22);
        return ((EpASN1Object)object).getEncoded();
    }

    private /* synthetic */ EpSESeal J(String a, int a2, String a3, String a4, byte[] a5, Certificate[] a6, int a7, long[] a8, boolean a9, EpSealExts a10) throws Exception {
        Calendar calendar;
        SealFactory a11;
        SealFactory sealFactory = a11;
        Date date = sealFactory.b.getSignDate();
        Calendar calendar2 = calendar = Calendar.getInstance();
        calendar2.setTime(date);
        calendar2.add(2, a7);
        return sealFactory.b(a, a2, a3, a4, a5, a6, date, calendar.getTime(), a8, a9, a10);
    }

    public EpSESeal makeSeal(String a, int a2, String a3, String a4, byte[] a5, Certificate[] a6, int a7, boolean a8, EpSealExts a9) throws Exception {
        SealFactory a10;
        return a10.J(a, a2, a3, a4, a5, a6, a7, null, a8, a9);
    }

    public static String verifySeal(byte[] a) {
        Object object;
        EpSESeal epSESeal;
        block4: {
            try {
                epSESeal = SealFactory.parseSeal(a);
                object = epSESeal.getSignByte();
                byte[] byArray = epSESeal.getSignInfo().getSignData();
                byte[] byArray2 = epSESeal.getSignInfo().getCert().getEncoded();
                if (SignUtil.verifySign((byte[])object, byArray, byArray2)) break block4;
                return HighlightPos.J("=-7?>");
            }
            catch (Exception exception) {
                logger.error(exception.getMessage(), exception);
                return HighlightPos.J("=-7?>");
            }
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(epSESeal.getEsealInfo().getProperty().getValidEnd());
        Object object2 = object = (Object)Calendar.getInstance();
        ((Calendar)object2).setTime(new Date());
        if (calendar.before(object2)) {
            return BaseResp.J("(!\"3+");
        }
        return BaseResp.J("4<5+");
    }

    public static EpSESeal parseSeal(byte[] a) {
        return EpSESeal.getInstance(a);
    }
}


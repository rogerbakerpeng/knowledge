/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.dto;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.crypto.CryptoUtil;
import com.epoint.epsignature.asn1.dto.EpExtData;
import com.epoint.epsignature.asn1.dto.EpExtensionDatas;
import com.epoint.epsignature.asn1.model.EpASN1Object;
import com.epoint.epsignature.asn1.model.SESESPictureInfo;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.util.UUID;
import javax.imageio.ImageIO;

public class EpSESESPictureInfo
extends EpASN1Object<SESESPictureInfo> {
    private static final String EXT_SpOID = "1.2.156.124445.1";
    private /* synthetic */ byte[] i;
    private /* synthetic */ EpExtensionDatas A;
    private /* synthetic */ Long a;
    private /* synthetic */ Long G;
    public static final double PX2MM = 3.78;
    private /* synthetic */ String b;

    public void setExtdatas(EpExtensionDatas a) {
        a.A = a;
    }

    public void setHeight(Long a) {
        EpSESESPictureInfo a2;
        ((SESESPictureInfo)a2.source).setHeight(new ASN1Integer(a));
    }

    public EpSESESPictureInfo(String a, byte[] a2, EpExtensionDatas a3, boolean a4) throws Exception {
        a5(a, a2, a3, a4, null);
        EpSESESPictureInfo a5;
    }

    public Long getHeight() {
        EpSESESPictureInfo a;
        return EpSESESPictureInfo.asn1Int2Long(((SESESPictureInfo)a.source).getHeight());
    }

    public void setType(String a) {
        EpSESESPictureInfo a2;
        ((SESESPictureInfo)a2.source).setType(new DERIA5String(a));
    }

    private /* synthetic */ void J() {
        EpSESESPictureInfo a;
        if (a.A == null) {
            throw new ExEpSignException(VerifyReq.J("\u674d\u8b85\u7f09~\u001fO\u0002U\u0014R\bU#Z\u0013Z\u0014\uff37\u6587\u6cee\u8fbc\u8877\u5699\u727c\u52c7\u89d8\u5ba1\u64f6\u4f3b"));
        }
    }

    public EpExtensionDatas getExtdatas() {
        EpSESESPictureInfo a;
        return a.A;
    }

    public Long getWidth() {
        EpSESESPictureInfo a;
        return EpSESESPictureInfo.asn1Int2Long(((SESESPictureInfo)a.source).getWidth());
    }

    public EpSESESPictureInfo(SESESPictureInfo a, EpExtensionDatas a2) {
        EpSESESPictureInfo a3;
        EpSESESPictureInfo epSESESPictureInfo = a3;
        epSESESPictureInfo.setSource(a);
        epSESESPictureInfo.setExtdatas(a2);
    }

    public void setWidth(Long a) {
        EpSESESPictureInfo a2;
        ((SESESPictureInfo)a2.source).setWidth(new ASN1Integer(a));
    }

    public byte[] getData() throws Exception {
        EpSESESPictureInfo a;
        EpSESESPictureInfo epSESESPictureInfo = a;
        epSESESPictureInfo.J();
        Object object = epSESESPictureInfo.A.getByOID(EXT_SpOID);
        byte[] byArray = null;
        if (((EpExtData)object).isCritical()) {
            object = CryptoUtil.switchGuid(new String(((EpExtData)object).getExtnValue()), false);
            byte[] byArray2 = ((SESESPictureInfo)a.source).getData().getOctets();
            byArray = CryptoUtil.processPic((String)object, byArray2, false);
            return byArray;
        }
        byArray = ((SESESPictureInfo)a.source).getData().getOctets();
        return byArray;
    }

    public void setData(byte[] a, boolean a2, long[] a3) throws Exception {
        EpSESESPictureInfo epSESESPictureInfo;
        boolean bl;
        Object object;
        EpSESESPictureInfo epSESESPictureInfo2;
        EpSESESPictureInfo a4;
        if (a3 != null) {
            EpSESESPictureInfo epSESESPictureInfo3 = a4;
            epSESESPictureInfo2 = epSESESPictureInfo3;
            epSESESPictureInfo3.setHeight(a3[0]);
            epSESESPictureInfo3.setWidth(a3[1]);
        } else {
            object = ImageIO.read(new ByteArrayInputStream(a));
            EpSESESPictureInfo epSESESPictureInfo4 = a4;
            epSESESPictureInfo2 = epSESESPictureInfo4;
            epSESESPictureInfo4.setHeight((long)((double)((BufferedImage)object).getHeight() / 3.78));
            epSESESPictureInfo4.setWidth((long)((double)((BufferedImage)object).getWidth() / 3.78));
        }
        epSESESPictureInfo2.J();
        object = null;
        if (a4.A.hasOID(EXT_SpOID)) {
            object = a4.A.getByOID(EXT_SpOID);
            bl = a2;
        } else {
            a3 = UUID.randomUUID().toString();
            object = new EpExtData(EXT_SpOID, true, ((String)a3).getBytes());
            bl = a2;
            a4.A.appendExtData((EpExtData)object);
        }
        if (bl) {
            a3 = CryptoUtil.switchGuid(new String(((EpExtData)object).getExtnValue()), true);
            a = CryptoUtil.processPic((String)a3, a, true);
            epSESESPictureInfo = a4;
        } else {
            ((EpExtData)object).setCritical(false);
            epSESESPictureInfo = a4;
        }
        ((SESESPictureInfo)epSESESPictureInfo.source).setData(new DEROctetString(a));
    }

    public String getType() {
        EpSESESPictureInfo a;
        return ((SESESPictureInfo)a.source).getType().getString();
    }

    public EpSESESPictureInfo(String a, byte[] a2, EpExtensionDatas a3, boolean a4, long[] a5) throws Exception {
        EpSESESPictureInfo a6;
        EpSESESPictureInfo epSESESPictureInfo = a6;
        EpSESESPictureInfo epSESESPictureInfo2 = a6;
        epSESESPictureInfo(new SESESPictureInfo(new DERIA5String(a), new DEROctetString(new byte[0]), new ASN1Integer(1L), new ASN1Integer(1L)), a3);
        epSESESPictureInfo.setData(a2, a4, a5);
    }
}


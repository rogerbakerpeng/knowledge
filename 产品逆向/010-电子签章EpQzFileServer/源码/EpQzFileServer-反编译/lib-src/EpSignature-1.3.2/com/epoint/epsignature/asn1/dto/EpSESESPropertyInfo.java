/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.dto;

import com.epoint.epsignature.asn1.model.EpASN1Object;
import com.epoint.epsignature.asn1.model.SESESPropertyInfo;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1UTCTime;
import com.epoint.gmhelper.bouncycastle.asn1.DERUTCTime;
import com.epoint.gmhelper.bouncycastle.asn1.DERUTF8String;
import java.security.cert.Certificate;
import java.util.Date;

public class EpSESESPropertyInfo
extends EpASN1Object<SESESPropertyInfo> {
    private /* synthetic */ Date k;
    private /* synthetic */ Certificate[] i;
    private /* synthetic */ Date A;
    private /* synthetic */ Date a;
    private /* synthetic */ String G;
    private /* synthetic */ Long b;

    public void setName(String a) {
        EpSESESPropertyInfo a2;
        ((SESESPropertyInfo)a2.source).setName(new DERUTF8String(a));
    }

    public EpSESESPropertyInfo(SESESPropertyInfo a) {
        EpSESESPropertyInfo a2;
        EpSESESPropertyInfo epSESESPropertyInfo = a2;
        epSESESPropertyInfo.setSource(a);
    }

    public Date getValidEnd() {
        EpSESESPropertyInfo a;
        return EpSESESPropertyInfo.asn1UTCTime2Date(((SESESPropertyInfo)a.source).getValidEnd());
    }

    public Date getValidStart() {
        EpSESESPropertyInfo a;
        return EpSESESPropertyInfo.asn1UTCTime2Date(((SESESPropertyInfo)a.source).getValidStart());
    }

    public void setType(Long a) {
        EpSESESPropertyInfo a2;
        ((SESESPropertyInfo)a2.source).setType(new ASN1Integer(a));
    }

    public Certificate[] getCertList() {
        EpSESESPropertyInfo a;
        return EpSESESPropertyInfo.asn1Seq2CertList(((SESESPropertyInfo)a.source).getCertList());
    }

    public Date getCreateDate() {
        EpSESESPropertyInfo a;
        return EpSESESPropertyInfo.asn1UTCTime2Date(((SESESPropertyInfo)a.source).getCreateDate());
    }

    public void setValidStart(Date a) {
        EpSESESPropertyInfo a2;
        ((SESESPropertyInfo)a2.source).setValidStart(new ASN1UTCTime(a));
    }

    public void setCertList(Certificate[] a) {
        EpSESESPropertyInfo a2;
        ((SESESPropertyInfo)a2.source).setCertList(EpSESESPropertyInfo.certList2asn1Seq(a));
    }

    public void setValidEnd(Date a) {
        EpSESESPropertyInfo a2;
        ((SESESPropertyInfo)a2.source).setValidEnd(new ASN1UTCTime(a));
    }

    public void setCreateDate(Date a) {
        EpSESESPropertyInfo a2;
        ((SESESPropertyInfo)a2.source).setCreateDate(new ASN1UTCTime(a));
    }

    public EpSESESPropertyInfo(Long a, String a2, Certificate[] a3, Date a4, Date a5, Date a6) {
        EpSESESPropertyInfo a7;
        a7.setSource(new SESESPropertyInfo(new ASN1Integer(a), new DERUTF8String(a2), EpSESESPropertyInfo.certList2asn1Seq(a3), new DERUTCTime(a4), new DERUTCTime(a5), new DERUTCTime(a6)));
    }

    public String getName() {
        EpSESESPropertyInfo a;
        return ((SESESPropertyInfo)a.source).getName().getString();
    }

    public Long getType() {
        EpSESESPropertyInfo a;
        return EpSESESPropertyInfo.asn1Int2Long(((SESESPropertyInfo)a.source).getType());
    }
}


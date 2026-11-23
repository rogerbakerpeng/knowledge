/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v4;

import com.epoint.epsignature.gm.ses.v4.SES_CertList;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1GeneralizedTime;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERUTF8String;

public class SES_ESPropertyInfo
extends ASN1Object {
    private /* synthetic */ ASN1GeneralizedTime g;
    public static final ASN1Integer CertDigestListType;
    private /* synthetic */ DERUTF8String k;
    private /* synthetic */ ASN1GeneralizedTime i;
    private /* synthetic */ ASN1GeneralizedTime A;
    private /* synthetic */ ASN1Integer a;
    public static final ASN1Integer CertListType;
    private /* synthetic */ ASN1Integer G;
    private /* synthetic */ SES_CertList b;

    public ASN1GeneralizedTime getCreateDate() {
        SES_ESPropertyInfo a;
        return a.g;
    }

    public SES_ESPropertyInfo setCreateDate(ASN1GeneralizedTime a) {
        SES_ESPropertyInfo a2;
        a2.g = a;
        return a2;
    }

    public SES_ESPropertyInfo(ASN1Integer a, DERUTF8String a2, ASN1Integer a3, SES_CertList a4, ASN1GeneralizedTime a5, ASN1GeneralizedTime a6, ASN1GeneralizedTime a7) {
        SES_ESPropertyInfo a8;
        SES_ESPropertyInfo sES_ESPropertyInfo = a8;
        SES_ESPropertyInfo sES_ESPropertyInfo2 = a8;
        SES_ESPropertyInfo sES_ESPropertyInfo3 = a8;
        a8.G = a;
        sES_ESPropertyInfo3.k = a2;
        sES_ESPropertyInfo3.a = a3;
        sES_ESPropertyInfo2.b = a4;
        sES_ESPropertyInfo2.g = a5;
        sES_ESPropertyInfo.A = a6;
        sES_ESPropertyInfo.i = a7;
    }

    public SES_ESPropertyInfo setValidStart(ASN1GeneralizedTime a) {
        SES_ESPropertyInfo a2;
        a2.A = a;
        return a2;
    }

    public ASN1GeneralizedTime getValidStart() {
        SES_ESPropertyInfo a;
        return a.A;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SES_ESPropertyInfo a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        SES_ESPropertyInfo sES_ESPropertyInfo = a;
        ASN1EncodableVector aSN1EncodableVector3 = aSN1EncodableVector;
        SES_ESPropertyInfo sES_ESPropertyInfo2 = a;
        aSN1EncodableVector.add(a.G);
        aSN1EncodableVector.add(sES_ESPropertyInfo2.k);
        aSN1EncodableVector3.add(sES_ESPropertyInfo2.a);
        aSN1EncodableVector3.add(a.b);
        aSN1EncodableVector.add(sES_ESPropertyInfo.g);
        aSN1EncodableVector2.add(sES_ESPropertyInfo.A);
        aSN1EncodableVector2.add(a.i);
        return new DERSequence(aSN1EncodableVector);
    }

    public SES_ESPropertyInfo(ASN1Sequence a) {
        SES_ESPropertyInfo a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.G = ASN1Integer.getInstance(a.nextElement());
        a2.k = DERUTF8String.getInstance(a.nextElement());
        a2.a = ASN1Integer.getInstance(a.nextElement());
        a2.b = SES_CertList.getInstance(a2.a, a.nextElement());
        a2.g = ASN1GeneralizedTime.getInstance(a.nextElement());
        a2.A = ASN1GeneralizedTime.getInstance(a.nextElement());
        a2.i = ASN1GeneralizedTime.getInstance(a.nextElement());
    }

    public SES_CertList getCertList() {
        SES_ESPropertyInfo a;
        return a.b;
    }

    public SES_ESPropertyInfo setType(ASN1Integer a) {
        SES_ESPropertyInfo a2;
        a2.G = a;
        return a2;
    }

    public ASN1GeneralizedTime getValidEnd() {
        SES_ESPropertyInfo a;
        return a.i;
    }

    public ASN1Integer getType() {
        SES_ESPropertyInfo a;
        return a.G;
    }

    public SES_ESPropertyInfo setCertList(SES_CertList a) {
        SES_ESPropertyInfo a2;
        a2.b = a;
        return a2;
    }

    public SES_ESPropertyInfo() {
        SES_ESPropertyInfo a;
    }

    public ASN1Integer getCertListType() {
        SES_ESPropertyInfo a;
        return a.a;
    }

    public SES_ESPropertyInfo setName(DERUTF8String a) {
        SES_ESPropertyInfo a2;
        a2.k = a;
        return a2;
    }

    static {
        CertListType = new ASN1Integer(1L);
        CertDigestListType = new ASN1Integer(2L);
    }

    public DERUTF8String getName() {
        SES_ESPropertyInfo a;
        return a.k;
    }

    public SES_ESPropertyInfo setCertListType(ASN1Integer a) {
        SES_ESPropertyInfo a2;
        a2.a = a;
        return a2;
    }

    public SES_ESPropertyInfo setValidEnd(ASN1GeneralizedTime a) {
        SES_ESPropertyInfo a2;
        a2.i = a;
        return a2;
    }

    public static SES_ESPropertyInfo getInstance(Object a) {
        if (a instanceof SES_ESPropertyInfo) {
            return (SES_ESPropertyInfo)a;
        }
        if (a != null) {
            return new SES_ESPropertyInfo(ASN1Sequence.getInstance(a));
        }
        return null;
    }
}


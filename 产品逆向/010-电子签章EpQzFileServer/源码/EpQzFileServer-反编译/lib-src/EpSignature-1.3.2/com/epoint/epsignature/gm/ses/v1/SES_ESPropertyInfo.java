/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v1;

import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1UTCTime;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERUTF8String;

public class SES_ESPropertyInfo
extends ASN1Object {
    private /* synthetic */ ASN1Integer k;
    public static final ASN1Integer PersonType;
    private /* synthetic */ DERUTF8String i;
    private /* synthetic */ ASN1UTCTime A;
    private /* synthetic */ ASN1Sequence a;
    private /* synthetic */ ASN1UTCTime G;
    public static final ASN1Integer OrgType;
    private /* synthetic */ ASN1UTCTime b;

    public ASN1UTCTime getValidStart() {
        SES_ESPropertyInfo a;
        return a.A;
    }

    public SES_ESPropertyInfo setType(ASN1Integer a) {
        SES_ESPropertyInfo a2;
        a2.k = a;
        return a2;
    }

    public SES_ESPropertyInfo() {
        SES_ESPropertyInfo a;
    }

    public SES_ESPropertyInfo setCertList(ASN1Sequence a) {
        SES_ESPropertyInfo a2;
        a2.a = a;
        return a2;
    }

    public SES_ESPropertyInfo(ASN1Integer a, DERUTF8String a2, ASN1Sequence a3, ASN1UTCTime a4, ASN1UTCTime a5, ASN1UTCTime a6) {
        SES_ESPropertyInfo a7;
        SES_ESPropertyInfo sES_ESPropertyInfo = a7;
        SES_ESPropertyInfo sES_ESPropertyInfo2 = a7;
        SES_ESPropertyInfo sES_ESPropertyInfo3 = a7;
        sES_ESPropertyInfo3.k = a;
        sES_ESPropertyInfo3.i = a2;
        sES_ESPropertyInfo2.a = a3;
        sES_ESPropertyInfo2.b = a4;
        sES_ESPropertyInfo.A = a5;
        sES_ESPropertyInfo.G = a6;
    }

    public ASN1Integer getType() {
        SES_ESPropertyInfo a;
        return a.k;
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

    @Override
    public ASN1Primitive toASN1Primitive() {
        SES_ESPropertyInfo a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        SES_ESPropertyInfo sES_ESPropertyInfo = a;
        ASN1EncodableVector aSN1EncodableVector3 = aSN1EncodableVector;
        SES_ESPropertyInfo sES_ESPropertyInfo2 = a;
        aSN1EncodableVector.add(sES_ESPropertyInfo2.k);
        aSN1EncodableVector3.add(sES_ESPropertyInfo2.i);
        aSN1EncodableVector3.add(a.a);
        aSN1EncodableVector.add(sES_ESPropertyInfo.b);
        aSN1EncodableVector2.add(sES_ESPropertyInfo.A);
        aSN1EncodableVector2.add(a.G);
        return new DERSequence(aSN1EncodableVector);
    }

    public SES_ESPropertyInfo setName(String a) {
        SES_ESPropertyInfo a2;
        a2.i = new DERUTF8String(a);
        return a2;
    }

    public ASN1Sequence getCertList() {
        SES_ESPropertyInfo a;
        return a.a;
    }

    public SES_ESPropertyInfo setCreateDate(ASN1UTCTime a) {
        SES_ESPropertyInfo a2;
        a2.b = a;
        return a2;
    }

    public ASN1UTCTime getValidEnd() {
        SES_ESPropertyInfo a;
        return a.G;
    }

    public SES_ESPropertyInfo setName(DERUTF8String a) {
        SES_ESPropertyInfo a2;
        a2.i = a;
        return a2;
    }

    public SES_ESPropertyInfo(ASN1Sequence a) {
        SES_ESPropertyInfo a2;
        SES_ESPropertyInfo sES_ESPropertyInfo = a2;
        a = ((ASN1Sequence)a).getObjects();
        sES_ESPropertyInfo.k = ASN1Integer.getInstance(a.nextElement());
        a2.i = DERUTF8String.getInstance(a.nextElement());
        sES_ESPropertyInfo.a = ASN1Sequence.getInstance(a.nextElement());
        sES_ESPropertyInfo.b = ASN1UTCTime.getInstance(a.nextElement());
        sES_ESPropertyInfo.A = ASN1UTCTime.getInstance(a.nextElement());
        sES_ESPropertyInfo.G = ASN1UTCTime.getInstance(a.nextElement());
    }

    public DERUTF8String getName() {
        SES_ESPropertyInfo a;
        return a.i;
    }

    static {
        OrgType = new ASN1Integer(1L);
        PersonType = new ASN1Integer(1L);
    }

    public ASN1UTCTime getCreateDate() {
        SES_ESPropertyInfo a;
        return a.b;
    }

    public SES_ESPropertyInfo setValidEnd(ASN1UTCTime a) {
        SES_ESPropertyInfo a2;
        a2.G = a;
        return a2;
    }

    public SES_ESPropertyInfo setType(int a) {
        SES_ESPropertyInfo a2;
        a2.k = new ASN1Integer(a);
        return a2;
    }

    public SES_ESPropertyInfo setValidStart(ASN1UTCTime a) {
        SES_ESPropertyInfo a2;
        a2.A = a;
        return a2;
    }
}


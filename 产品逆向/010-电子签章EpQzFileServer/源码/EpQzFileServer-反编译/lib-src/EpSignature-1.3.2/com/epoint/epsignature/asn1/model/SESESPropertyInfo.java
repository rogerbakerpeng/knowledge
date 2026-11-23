/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.model.ExtensionDatas;
import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1UTCTime;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERUTF8String;

public class SESESPropertyInfo
extends ASN1Object {
    private /* synthetic */ ASN1UTCTime k;
    private /* synthetic */ ASN1UTCTime i;
    private /* synthetic */ ASN1Integer A;
    private /* synthetic */ ASN1UTCTime a;
    private /* synthetic */ DERUTF8String G;
    private /* synthetic */ ASN1Sequence b;

    public DERUTF8String getName() {
        SESESPropertyInfo a;
        return a.G;
    }

    public ASN1UTCTime getValidEnd() {
        SESESPropertyInfo a;
        return a.i;
    }

    public void setValidEnd(ASN1UTCTime a) {
        a.i = a;
    }

    public ASN1Sequence getCertList() {
        SESESPropertyInfo a;
        return a.b;
    }

    public SESESPropertyInfo(ASN1Sequence a) {
        SESESPropertyInfo a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.A = (ASN1Integer)a.nextElement();
        a2.G = (DERUTF8String)a.nextElement();
        a2.b = (ASN1Sequence)a.nextElement();
        a2.k = (ASN1UTCTime)a.nextElement();
        a2.a = (ASN1UTCTime)a.nextElement();
        a2.i = (ASN1UTCTime)a.nextElement();
    }

    public void setValidStart(ASN1UTCTime a) {
        a.a = a;
    }

    public void setName(DERUTF8String a) {
        a.G = a;
    }

    public static SESESPropertyInfo getInstance(Object a) {
        if (a instanceof ExtensionDatas) {
            return (SESESPropertyInfo)a;
        }
        if (a != null) {
            return new SESESPropertyInfo(ASN1Sequence.getInstance(a));
        }
        throw new ExEpSignException(new StringBuilder().insert(0, PDFHighlightAnnotationReq.J("|cbcfzg-fochjy)dg-ZHZHZ]{byh{ypDgkf-nh}Dg~}lgnl7)")).append(a.getClass().getName()).toString());
    }

    public ASN1UTCTime getValidStart() {
        SESESPropertyInfo a;
        return a.a;
    }

    public ASN1Integer getType() {
        SESESPropertyInfo a;
        return a.A;
    }

    public void setType(ASN1Integer a) {
        a.A = a;
    }

    public void setCertList(ASN1Sequence a) {
        a.b = a;
    }

    public SESESPropertyInfo(ASN1Integer a, DERUTF8String a2, ASN1Sequence a3, ASN1UTCTime a4, ASN1UTCTime a5, ASN1UTCTime a6) {
        SESESPropertyInfo a7;
        SESESPropertyInfo sESESPropertyInfo = a7;
        SESESPropertyInfo sESESPropertyInfo2 = a7;
        SESESPropertyInfo sESESPropertyInfo3 = a7;
        sESESPropertyInfo3.A = a;
        sESESPropertyInfo3.G = a2;
        sESESPropertyInfo2.b = a3;
        sESESPropertyInfo2.k = a4;
        sESESPropertyInfo.a = a5;
        sESESPropertyInfo.i = a6;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SESESPropertyInfo a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        SESESPropertyInfo sESESPropertyInfo = a;
        ASN1EncodableVector aSN1EncodableVector3 = aSN1EncodableVector;
        SESESPropertyInfo sESESPropertyInfo2 = a;
        aSN1EncodableVector.add(sESESPropertyInfo2.A);
        aSN1EncodableVector3.add(sESESPropertyInfo2.G);
        aSN1EncodableVector3.add(a.b);
        aSN1EncodableVector.add(sESESPropertyInfo.k);
        aSN1EncodableVector2.add(sESESPropertyInfo.a);
        aSN1EncodableVector2.add(a.i);
        return new DERSequence(aSN1EncodableVector);
    }

    public void setCreateDate(ASN1UTCTime a) {
        a.k = a;
    }

    public ASN1UTCTime getCreateDate() {
        SESESPropertyInfo a;
        return a.k;
    }
}


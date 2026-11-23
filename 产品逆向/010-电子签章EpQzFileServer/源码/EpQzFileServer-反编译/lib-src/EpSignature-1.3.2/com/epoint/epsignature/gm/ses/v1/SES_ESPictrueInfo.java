/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v1;

import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SES_ESPictrueInfo
extends ASN1Object {
    private /* synthetic */ ASN1Integer A;
    private /* synthetic */ DERIA5String a;
    private /* synthetic */ ASN1OctetString G;
    private /* synthetic */ ASN1Integer b;

    public static SES_ESPictrueInfo getInstance(Object a) {
        if (a instanceof SES_ESPictrueInfo) {
            return (SES_ESPictrueInfo)a;
        }
        if (a != null) {
            return new SES_ESPictrueInfo(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public SES_ESPictrueInfo(DERIA5String a, ASN1OctetString a2, ASN1Integer a3, ASN1Integer a4) {
        SES_ESPictrueInfo a5;
        SES_ESPictrueInfo sES_ESPictrueInfo = a5;
        SES_ESPictrueInfo sES_ESPictrueInfo2 = a5;
        sES_ESPictrueInfo2.a = a;
        sES_ESPictrueInfo2.G = a2;
        sES_ESPictrueInfo.A = a3;
        sES_ESPictrueInfo.b = a4;
    }

    public SES_ESPictrueInfo setHeight(ASN1Integer a) {
        SES_ESPictrueInfo a2;
        a2.b = a;
        return a2;
    }

    public SES_ESPictrueInfo() {
        SES_ESPictrueInfo a;
    }

    public SES_ESPictrueInfo setHeight(long a) {
        SES_ESPictrueInfo a2;
        a2.b = new ASN1Integer(a);
        return a2;
    }

    public SES_ESPictrueInfo setWidth(long a) {
        SES_ESPictrueInfo a2;
        a2.A = new ASN1Integer(a);
        return a2;
    }

    public SES_ESPictrueInfo setData(byte[] a) {
        SES_ESPictrueInfo a2;
        a2.G = new DEROctetString(a);
        return a2;
    }

    public SES_ESPictrueInfo setType(DERIA5String a) {
        SES_ESPictrueInfo a2;
        a2.a = a;
        return a2;
    }

    public DERIA5String getType() {
        SES_ESPictrueInfo a;
        return a.a;
    }

    public ASN1OctetString getData() {
        SES_ESPictrueInfo a;
        return a.G;
    }

    public ASN1Integer getWidth() {
        SES_ESPictrueInfo a;
        return a.A;
    }

    public SES_ESPictrueInfo(ASN1Sequence a) {
        SES_ESPictrueInfo a2;
        SES_ESPictrueInfo sES_ESPictrueInfo = a2;
        a = ((ASN1Sequence)a).getObjects();
        sES_ESPictrueInfo.a = DERIA5String.getInstance(a.nextElement());
        a2.G = ASN1OctetString.getInstance(a.nextElement());
        sES_ESPictrueInfo.A = ASN1Integer.getInstance(a.nextElement());
        sES_ESPictrueInfo.b = ASN1Integer.getInstance(a.nextElement());
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SES_ESPictrueInfo a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        SES_ESPictrueInfo sES_ESPictrueInfo = a;
        aSN1EncodableVector.add(a.a);
        aSN1EncodableVector.add(sES_ESPictrueInfo.G);
        aSN1EncodableVector2.add(sES_ESPictrueInfo.A);
        aSN1EncodableVector2.add(a.b);
        return new DERSequence(aSN1EncodableVector);
    }

    public SES_ESPictrueInfo setData(ASN1OctetString a) {
        SES_ESPictrueInfo a2;
        a2.G = a;
        return a2;
    }

    public SES_ESPictrueInfo setType(String a) {
        SES_ESPictrueInfo a2;
        a2.a = new DERIA5String(a);
        return a2;
    }

    public ASN1Integer getHeight() {
        SES_ESPictrueInfo a;
        return a.b;
    }

    public SES_ESPictrueInfo setWidth(ASN1Integer a) {
        SES_ESPictrueInfo a2;
        a2.A = a;
        return a2;
    }
}


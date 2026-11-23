/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.model.ExtensionDatas;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SESHeader
extends ASN1Object {
    private /* synthetic */ ASN1Integer a;
    private /* synthetic */ DERIA5String G;
    private /* synthetic */ DERIA5String b;

    public void setId(DERIA5String a) {
        a.b = a;
    }

    public void setVersion(ASN1Integer a) {
        a.a = a;
    }

    public static SESHeader getInstance(Object a) {
        if (a instanceof ExtensionDatas) {
            return (SESHeader)a;
        }
        if (a != null) {
            return new SESHeader(ASN1Sequence.getInstance(a));
        }
        throw new ExEpSignException(new StringBuilder().insert(0, HighlightPos.J(".\"0\"4;5l4.1)88{%5l\b\t\b\u0004>-?))l<)/\u00055?/-5/>v{")).append(a.getClass().getName()).toString());
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SESHeader a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        SESHeader sESHeader = a;
        aSN1EncodableVector.add(sESHeader.b);
        aSN1EncodableVector2.add(sESHeader.a);
        aSN1EncodableVector2.add(a.G);
        return new DERSequence(aSN1EncodableVector);
    }

    public SESHeader(DERIA5String a, ASN1Integer a2, DERIA5String a3) {
        SESHeader a4;
        SESHeader sESHeader = a4;
        a4.b = a;
        sESHeader.a = a2;
        sESHeader.G = a3;
    }

    public ASN1Integer getVersion() {
        SESHeader a;
        return a.a;
    }

    public DERIA5String getVid() {
        SESHeader a;
        return a.G;
    }

    public void setVid(DERIA5String a) {
        a.G = a;
    }

    public DERIA5String getId() {
        SESHeader a;
        return a.b;
    }

    public SESHeader(ASN1Sequence a) {
        SESHeader a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.b = (DERIA5String)a.nextElement();
        a2.a = (ASN1Integer)a.nextElement();
        a2.G = (DERIA5String)a.nextElement();
    }
}


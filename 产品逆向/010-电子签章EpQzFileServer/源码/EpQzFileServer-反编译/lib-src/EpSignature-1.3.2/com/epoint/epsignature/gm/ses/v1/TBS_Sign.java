/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v1;

import com.epoint.epsignature.gm.ses.v1.SESeal;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1BitString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class TBS_Sign
extends ASN1Object {
    private /* synthetic */ ASN1OctetString g;
    private /* synthetic */ ASN1BitString k;
    private /* synthetic */ DERIA5String i;
    private /* synthetic */ ASN1Integer A;
    private /* synthetic */ SESeal a;
    private /* synthetic */ ASN1BitString G;
    private /* synthetic */ ASN1ObjectIdentifier b;

    @Override
    public ASN1Primitive toASN1Primitive() {
        TBS_Sign a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        TBS_Sign tBS_Sign = a;
        ASN1EncodableVector aSN1EncodableVector3 = aSN1EncodableVector;
        TBS_Sign tBS_Sign2 = a;
        aSN1EncodableVector.add(a.A);
        aSN1EncodableVector.add(tBS_Sign2.a);
        aSN1EncodableVector3.add(tBS_Sign2.k);
        aSN1EncodableVector3.add(a.G);
        aSN1EncodableVector.add(tBS_Sign.i);
        aSN1EncodableVector2.add(tBS_Sign.g);
        aSN1EncodableVector2.add(a.b);
        return new DERSequence(aSN1EncodableVector);
    }

    public TBS_Sign setDataHash(ASN1BitString a) {
        TBS_Sign a2;
        a2.G = a;
        return a2;
    }

    public TBS_Sign setTimeInfo(ASN1BitString a) {
        TBS_Sign a2;
        a2.k = a;
        return a2;
    }

    public SESeal getEseal() {
        TBS_Sign a;
        return a.a;
    }

    public ASN1ObjectIdentifier getSignatureAlgorithm() {
        TBS_Sign a;
        return a.b;
    }

    public ASN1BitString getDataHash() {
        TBS_Sign a;
        return a.G;
    }

    public ASN1OctetString getCert() {
        TBS_Sign a;
        return a.g;
    }

    public TBS_Sign setPropertyInfo(DERIA5String a) {
        TBS_Sign a2;
        a2.i = a;
        return a2;
    }

    public TBS_Sign() {
        TBS_Sign a;
    }

    public TBS_Sign setVersion(ASN1Integer a) {
        TBS_Sign a2;
        a2.A = a;
        return a2;
    }

    public TBS_Sign(ASN1Integer a, SESeal a2, ASN1BitString a3, ASN1BitString a4, DERIA5String a5, ASN1OctetString a6, ASN1ObjectIdentifier a7) {
        TBS_Sign a8;
        TBS_Sign tBS_Sign = a8;
        TBS_Sign tBS_Sign2 = a8;
        TBS_Sign tBS_Sign3 = a8;
        a8.A = a;
        tBS_Sign3.a = a2;
        tBS_Sign3.k = a3;
        tBS_Sign2.G = a4;
        tBS_Sign2.i = a5;
        tBS_Sign.g = a6;
        tBS_Sign.b = a7;
    }

    public ASN1Integer getVersion() {
        TBS_Sign a;
        return a.A;
    }

    public TBS_Sign(ASN1Sequence a) {
        TBS_Sign a2;
        TBS_Sign tBS_Sign = a2;
        a = ((ASN1Sequence)a).getObjects();
        tBS_Sign.A = ASN1Integer.getInstance(a.nextElement());
        a2.a = SESeal.getInstance(a.nextElement());
        tBS_Sign.k = DERBitString.getInstance(a.nextElement());
        tBS_Sign.G = DERBitString.getInstance(a.nextElement());
        tBS_Sign.i = DERIA5String.getInstance(a.nextElement());
        tBS_Sign.g = ASN1OctetString.getInstance(a.nextElement());
        tBS_Sign.b = ASN1ObjectIdentifier.getInstance(a.nextElement());
    }

    public TBS_Sign setCert(ASN1OctetString a) {
        TBS_Sign a2;
        a2.g = a;
        return a2;
    }

    public DERIA5String getPropertyInfo() {
        TBS_Sign a;
        return a.i;
    }

    public static TBS_Sign getInstance(Object a) {
        if (a instanceof TBS_Sign) {
            return (TBS_Sign)a;
        }
        if (a != null) {
            return new TBS_Sign(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public ASN1BitString getTimeInfo() {
        TBS_Sign a;
        return a.k;
    }

    public TBS_Sign setSignatureAlgorithm(ASN1ObjectIdentifier a) {
        TBS_Sign a2;
        a2.b = a;
        return a2;
    }

    public TBS_Sign setEseal(SESeal a) {
        TBS_Sign a2;
        a2.a = a;
        return a2;
    }
}


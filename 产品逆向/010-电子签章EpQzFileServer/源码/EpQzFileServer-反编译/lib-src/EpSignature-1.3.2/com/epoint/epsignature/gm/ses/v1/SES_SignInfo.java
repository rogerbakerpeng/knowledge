/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v1;

import com.epoint.gmhelper.bouncycastle.asn1.ASN1BitString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SES_SignInfo
extends ASN1Object {
    private /* synthetic */ ASN1OctetString a;
    private /* synthetic */ ASN1BitString G;
    private /* synthetic */ ASN1ObjectIdentifier b;

    public ASN1BitString getSignData() {
        SES_SignInfo a;
        return a.G;
    }

    public SES_SignInfo(ASN1OctetString a, ASN1ObjectIdentifier a2, ASN1BitString a3) {
        SES_SignInfo a4;
        SES_SignInfo sES_SignInfo = a4;
        a4.a = a;
        sES_SignInfo.b = a2;
        sES_SignInfo.G = a3;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SES_SignInfo a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        SES_SignInfo sES_SignInfo = a;
        aSN1EncodableVector.add(sES_SignInfo.a);
        aSN1EncodableVector2.add(sES_SignInfo.b);
        aSN1EncodableVector2.add(a.G);
        return new DERSequence(aSN1EncodableVector);
    }

    public SES_SignInfo(ASN1Sequence a) {
        SES_SignInfo a2;
        SES_SignInfo sES_SignInfo = a2;
        a = ((ASN1Sequence)a).getObjects();
        sES_SignInfo.a = ASN1OctetString.getInstance(a.nextElement());
        a2.b = ASN1ObjectIdentifier.getInstance(a.nextElement());
        sES_SignInfo.G = DERBitString.getInstance(a.nextElement());
    }

    public SES_SignInfo() {
        SES_SignInfo a;
    }

    public ASN1ObjectIdentifier getSignatureAlgorithm() {
        SES_SignInfo a;
        return a.b;
    }

    public SES_SignInfo setSignatureAlgorithm(ASN1ObjectIdentifier a) {
        SES_SignInfo a2;
        a2.b = a;
        return a2;
    }

    public SES_SignInfo setCert(ASN1OctetString a) {
        SES_SignInfo a2;
        a2.a = a;
        return a2;
    }

    public static SES_SignInfo getInstance(Object a) {
        if (a instanceof SES_SignInfo) {
            return (SES_SignInfo)a;
        }
        if (a != null) {
            return new SES_SignInfo(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public SES_SignInfo setSignData(ASN1BitString a) {
        SES_SignInfo a2;
        a2.G = a;
        return a2;
    }

    public SES_SignInfo setSignData(byte[] a) {
        SES_SignInfo a2;
        a2.G = new DERBitString(a);
        return a2;
    }

    public ASN1OctetString getCert() {
        SES_SignInfo a;
        return a.a;
    }
}


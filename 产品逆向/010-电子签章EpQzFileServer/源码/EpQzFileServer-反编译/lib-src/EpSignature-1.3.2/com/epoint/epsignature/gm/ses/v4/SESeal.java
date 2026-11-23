/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v4;

import com.epoint.epsignature.gm.ses.v4.SES_SealInfo;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1BitString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import java.security.cert.Certificate;
import java.security.cert.CertificateEncodingException;

public class SESeal
extends ASN1Object {
    private /* synthetic */ SES_SealInfo A;
    private /* synthetic */ ASN1BitString a;
    private /* synthetic */ ASN1ObjectIdentifier G;
    private /* synthetic */ ASN1OctetString b;

    public ASN1ObjectIdentifier getSignAlgID() {
        SESeal a;
        return a.G;
    }

    public SESeal(SES_SealInfo a, ASN1OctetString a2, ASN1ObjectIdentifier a3, ASN1BitString a4) {
        SESeal a5;
        SESeal sESeal = a5;
        SESeal sESeal2 = a5;
        sESeal2.A = a;
        sESeal2.b = a2;
        sESeal.G = a3;
        sESeal.a = a4;
    }

    public static SESeal getInstance(Object a) {
        if (a instanceof SESeal) {
            return (SESeal)a;
        }
        if (a != null) {
            return new SESeal(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public SESeal setCert(ASN1OctetString a) {
        SESeal a2;
        a2.b = a;
        return a2;
    }

    public ASN1OctetString getCert() {
        SESeal a;
        return a.b;
    }

    public SESeal setSignAlgID(ASN1ObjectIdentifier a) {
        SESeal a2;
        a2.G = a;
        return a2;
    }

    public SESeal setCert(Certificate a) throws CertificateEncodingException {
        SESeal a2;
        a2.b = new DEROctetString(a.getEncoded());
        return a2;
    }

    public SESeal seteSealInfo(SES_SealInfo a) {
        SESeal a2;
        a2.A = a;
        return a2;
    }

    public ASN1BitString getSignedValue() {
        SESeal a;
        return a.a;
    }

    public SESeal(ASN1Sequence a) {
        SESeal a2;
        SESeal sESeal = a2;
        a = ((ASN1Sequence)a).getObjects();
        sESeal.A = SES_SealInfo.getInstance(a.nextElement());
        a2.b = ASN1OctetString.getInstance(a.nextElement());
        sESeal.G = ASN1ObjectIdentifier.getInstance(a.nextElement());
        sESeal.a = DERBitString.getInstance(a.nextElement());
    }

    public SESeal setSignedValue(ASN1BitString a) {
        SESeal a2;
        a2.a = a;
        return a2;
    }

    public SESeal() {
        SESeal a;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SESeal a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        SESeal sESeal = a;
        aSN1EncodableVector.add(a.A);
        aSN1EncodableVector.add(sESeal.b);
        aSN1EncodableVector2.add(sESeal.G);
        aSN1EncodableVector2.add(a.a);
        return new DERSequence(aSN1EncodableVector);
    }

    public SESeal setSignedValue(byte[] a) {
        SESeal a2;
        a2.a = new DERBitString(a);
        return a2;
    }

    public SES_SealInfo geteSealInfo() {
        SESeal a;
        return a.A;
    }
}


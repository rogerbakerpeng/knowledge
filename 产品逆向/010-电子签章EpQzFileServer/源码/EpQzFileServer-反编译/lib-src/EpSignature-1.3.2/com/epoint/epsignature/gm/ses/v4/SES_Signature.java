/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v4;

import com.epoint.epsignature.gm.ses.v4.TBS_Sign;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1BitString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1TaggedObject;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERTaggedObject;
import java.security.cert.Certificate;
import java.security.cert.CertificateEncodingException;

public class SES_Signature
extends ASN1Object {
    private /* synthetic */ TBS_Sign i;
    private /* synthetic */ ASN1OctetString A;
    private /* synthetic */ ASN1BitString a;
    private /* synthetic */ ASN1ObjectIdentifier G;
    private /* synthetic */ ASN1BitString b;

    @Override
    public ASN1Primitive toASN1Primitive() {
        SES_Signature a;
        ASN1EncodableVector aSN1EncodableVector = new ASN1EncodableVector();
        SES_Signature sES_Signature = a;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector;
        SES_Signature sES_Signature2 = a;
        aSN1EncodableVector.add(sES_Signature2.i);
        aSN1EncodableVector2.add(sES_Signature2.A);
        aSN1EncodableVector2.add(a.G);
        aSN1EncodableVector.add(sES_Signature.b);
        if (sES_Signature.a != null) {
            aSN1EncodableVector.add(new DERTaggedObject(true, 0, a.a));
        }
        return new DERSequence(aSN1EncodableVector);
    }

    public ASN1BitString getSignature() {
        SES_Signature a;
        return a.b;
    }

    public ASN1ObjectIdentifier getSignatureAlgID() {
        SES_Signature a;
        return a.G;
    }

    public ASN1OctetString getCert() {
        SES_Signature a;
        return a.A;
    }

    public SES_Signature setSignatureAlgID(ASN1ObjectIdentifier a) {
        SES_Signature a2;
        a2.G = a;
        return a2;
    }

    public SES_Signature() {
        SES_Signature a;
    }

    public SES_Signature(ASN1Sequence a) {
        SES_Signature a2;
        SES_Signature sES_Signature = a2;
        a = ((ASN1Sequence)a).getObjects();
        sES_Signature.i = TBS_Sign.getInstance(a.nextElement());
        a2.A = ASN1OctetString.getInstance(a.nextElement());
        sES_Signature.G = ASN1ObjectIdentifier.getInstance(a.nextElement());
        sES_Signature.b = DERBitString.getInstance(a.nextElement());
        if (a.hasMoreElements() && (a = a.nextElement()) instanceof ASN1TaggedObject) {
            a2.a = DERBitString.getInstance(((ASN1TaggedObject)a).getObject());
        }
    }

    public SES_Signature(TBS_Sign a, ASN1OctetString a2, ASN1ObjectIdentifier a3, ASN1BitString a4, ASN1BitString a5) {
        SES_Signature a6;
        SES_Signature sES_Signature = a6;
        SES_Signature sES_Signature2 = a6;
        a6.i = a;
        sES_Signature2.A = a2;
        sES_Signature2.G = a3;
        sES_Signature.b = a4;
        sES_Signature.a = a5;
    }

    public SES_Signature setSignature(byte[] a) {
        SES_Signature a2;
        a2.b = new DERBitString(a);
        return a2;
    }

    public TBS_Sign getToSign() {
        SES_Signature a;
        return a.i;
    }

    public ASN1BitString getTimeStamp() {
        SES_Signature a;
        return a.a;
    }

    public SES_Signature setTimeStamp(ASN1BitString a) {
        SES_Signature a2;
        a2.a = a;
        return a2;
    }

    public SES_Signature setToSign(TBS_Sign a) {
        SES_Signature a2;
        a2.i = a;
        return a2;
    }

    public SES_Signature setSignature(ASN1BitString a) {
        SES_Signature a2;
        a2.b = a;
        return a2;
    }

    public SES_Signature setCert(ASN1OctetString a) {
        SES_Signature a2;
        a2.A = a;
        return a2;
    }

    public static SES_Signature getInstance(Object a) {
        if (a instanceof SES_Signature) {
            return (SES_Signature)a;
        }
        if (a != null) {
            return new SES_Signature(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public SES_Signature setCert(Certificate a) throws CertificateEncodingException {
        SES_Signature a2;
        a2.A = new DEROctetString(a.getEncoded());
        return a2;
    }
}


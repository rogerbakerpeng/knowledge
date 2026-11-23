/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v1;

import com.epoint.epsignature.gm.ses.v1.TBS_Sign;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1BitString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SES_Signature
extends ASN1Object {
    private /* synthetic */ ASN1BitString G;
    private /* synthetic */ TBS_Sign b;

    public SES_Signature() {
        SES_Signature a;
    }

    public TBS_Sign getToSign() {
        SES_Signature a;
        return a.b;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SES_Signature a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        aSN1EncodableVector2.add(a.b);
        aSN1EncodableVector2.add(a.G);
        return new DERSequence(aSN1EncodableVector);
    }

    public SES_Signature setToSign(TBS_Sign a) {
        SES_Signature a2;
        a2.b = a;
        return a2;
    }

    public SES_Signature setSignature(byte[] a) {
        SES_Signature a2;
        a2.G = new DERBitString(a);
        return a2;
    }

    public ASN1BitString getSignature() {
        SES_Signature a;
        return a.G;
    }

    public SES_Signature setSignature(ASN1BitString a) {
        SES_Signature a2;
        a2.G = a;
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

    public SES_Signature(TBS_Sign a, ASN1BitString a2) {
        SES_Signature a3;
        SES_Signature sES_Signature = a3;
        sES_Signature.b = a;
        sES_Signature.G = a2;
    }

    public SES_Signature(ASN1Sequence a) {
        SES_Signature a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.b = TBS_Sign.getInstance(a.nextElement());
        a2.G = DERBitString.getInstance(a.nextElement());
    }
}


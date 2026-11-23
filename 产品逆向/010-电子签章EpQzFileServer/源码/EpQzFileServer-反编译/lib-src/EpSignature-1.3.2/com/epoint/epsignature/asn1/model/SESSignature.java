/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.model.ExtensionDatas;
import com.epoint.epsignature.asn1.model.TBSSign;
import com.epoint.epsignature.utils.TZGMVerifyPdf;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SESSignature
extends ASN1Object {
    private /* synthetic */ DERBitString G;
    private /* synthetic */ TBSSign b;

    public TBSSign getToSign() {
        SESSignature a;
        return a.b;
    }

    public SESSignature(ASN1Sequence a) {
        SESSignature a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.b = TBSSign.getInstance(a.nextElement());
        a2.G = (DERBitString)a.nextElement();
    }

    public void setToSign(TBSSign a) {
        a.b = a;
    }

    public void setSignature(DERBitString a) {
        a.G = a;
    }

    public SESSignature(TBSSign a, DERBitString a2) {
        SESSignature a3;
        SESSignature sESSignature = a3;
        sESSignature.b = a;
        sESSignature.G = a2;
    }

    public static SESSignature getInstance(Object a) {
        if (a instanceof ExtensionDatas) {
            return (SESSignature)a;
        }
        if (a != null) {
            return new SESSignature(ASN1Sequence.getInstance(a));
        }
        throw new ExEpSignException(new StringBuilder().insert(0, TZGMVerifyPdf.J("\u0011~\u000f~\u000bg\n0\u000br\u000eu\u0007dDy\n07U7C\rw\nq\u0010e\u0016uDw\u0001d-~\u0017d\u0005~\u0007u^0")).append(a.getClass().getName()).toString());
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SESSignature a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        aSN1EncodableVector2.add(a.b);
        aSN1EncodableVector2.add(a.G);
        return new DERSequence(aSN1EncodableVector);
    }

    public DERBitString getSignature() {
        SESSignature a;
        return a.G;
    }
}


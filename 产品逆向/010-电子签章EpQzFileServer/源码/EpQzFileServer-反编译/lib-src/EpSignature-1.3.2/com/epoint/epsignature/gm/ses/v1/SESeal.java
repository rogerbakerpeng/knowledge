/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v1;

import com.epoint.epsignature.gm.ses.v1.SES_SealInfo;
import com.epoint.epsignature.gm.ses.v1.SES_SignInfo;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SESeal
extends ASN1Object {
    private /* synthetic */ SES_SignInfo G;
    private /* synthetic */ SES_SealInfo b;

    public SESeal setEsealInfo(SES_SealInfo a) {
        SESeal a2;
        a2.b = a;
        return a2;
    }

    public SESeal() {
        SESeal a;
    }

    public SESeal setSignInfo(SES_SignInfo a) {
        SESeal a2;
        a2.G = a;
        return a2;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SESeal a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        aSN1EncodableVector2.add(a.b);
        aSN1EncodableVector2.add(a.G);
        return new DERSequence(aSN1EncodableVector);
    }

    public SESeal(SES_SealInfo a, SES_SignInfo a2) {
        SESeal a3;
        SESeal sESeal = a3;
        sESeal.b = a;
        sESeal.G = a2;
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

    public SES_SealInfo getEsealInfo() {
        SESeal a;
        return a.b;
    }

    public SES_SignInfo getSignInfo() {
        SESeal a;
        return a.G;
    }

    public SESeal(ASN1Sequence a) {
        SESeal a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.b = SES_SealInfo.getInstance(a.nextElement());
        a2.G = SES_SignInfo.getInstance(a.nextElement());
    }
}


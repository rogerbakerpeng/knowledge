/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.model.ExtensionDatas;
import com.epoint.epsignature.asn1.model.SESSealInfo;
import com.epoint.epsignature.asn1.model.SESSignInfo;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SESeal
extends ASN1Object {
    private /* synthetic */ SESSealInfo G;
    private /* synthetic */ SESSignInfo b;

    public void setEsealInfo(SESSealInfo a) {
        a.G = a;
    }

    public SESSignInfo getSignInfo() {
        SESeal a;
        return a.b;
    }

    public SESeal(ASN1Sequence a) {
        SESeal a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.G = SESSealInfo.getInstance(a.nextElement());
        a2.b = SESSignInfo.getInstance(a.nextElement());
    }

    public SESSealInfo getEsealInfo() {
        SESeal a;
        return a.G;
    }

    public void setSignInfo(SESSignInfo a) {
        a.b = a;
    }

    public SESeal(SESSealInfo a, SESSignInfo a2) {
        SESeal a3;
        SESeal sESeal = a3;
        sESeal.G = a;
        sESeal.b = a2;
    }

    public static SESeal getInstance(Object a) {
        if (a instanceof ExtensionDatas) {
            return (SESeal)a;
        }
        if (a != null) {
            return new SESeal(ASN1Sequence.getInstance(a));
        }
        throw new ExEpSignException(new StringBuilder().insert(0, JSONUtils.J("~c`cdze-doahhy+de-XHXhja+jnyBcxyjchh1-")).append(a.getClass().getName()).toString());
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SESeal a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        aSN1EncodableVector2.add(a.G);
        aSN1EncodableVector2.add(a.b);
        return new DERSequence(aSN1EncodableVector);
    }
}


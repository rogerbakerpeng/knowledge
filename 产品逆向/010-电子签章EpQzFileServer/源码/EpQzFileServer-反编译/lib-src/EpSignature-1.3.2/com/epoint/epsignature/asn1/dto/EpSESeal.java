/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.dto;

import com.epoint.epsignature.asn1.dto.EpSESSealInfo;
import com.epoint.epsignature.asn1.dto.EpSESSignInfo;
import com.epoint.epsignature.asn1.model.EpASN1Object;
import com.epoint.epsignature.asn1.model.SESSealInfo;
import com.epoint.epsignature.asn1.model.SESSignInfo;
import com.epoint.epsignature.asn1.model.SESeal;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.DLSequence;

public class EpSESeal
extends EpASN1Object<SESeal> {
    private /* synthetic */ EpSESSignInfo G;
    private /* synthetic */ EpSESSealInfo b;

    public EpSESeal(EpSESSealInfo a, EpSESSignInfo a2) {
        EpSESeal a3;
        a3.setSource(new SESeal((SESSealInfo)a.getSource(), (SESSignInfo)a2.getSource()));
    }

    public EpSESSealInfo getEsealInfo() {
        EpSESeal a;
        return new EpSESSealInfo(((SESeal)a.source).getEsealInfo());
    }

    public void setEsealInfo(EpSESSealInfo a) {
        EpSESeal a2;
        ((SESeal)a2.source).setEsealInfo((SESSealInfo)a.getSource());
    }

    public byte[] getSignByte() throws Exception {
        EpSESeal a;
        ASN1EncodableVector aSN1EncodableVector = new ASN1EncodableVector();
        aSN1EncodableVector.add(((SESeal)a.source).getEsealInfo());
        aSN1EncodableVector.add(((SESeal)a.source).getSignInfo().getCert());
        aSN1EncodableVector.add(((SESeal)a.source).getSignInfo().getSignatureAlgorithm());
        return new DLSequence(aSN1EncodableVector).getEncoded();
    }

    public EpSESSignInfo getSignInfo() {
        EpSESeal a;
        return new EpSESSignInfo(((SESeal)a.source).getSignInfo());
    }

    public EpSESeal(SESeal a) {
        EpSESeal a2;
        EpSESeal epSESeal = a2;
        epSESeal.setSource(a);
    }

    public static EpSESeal getInstance(Object a) {
        return new EpSESeal(SESeal.getInstance(a));
    }

    public void setSignInfo(EpSESSignInfo a) {
        EpSESeal a2;
        ((SESeal)a2.source).setSignInfo((SESSignInfo)a.getSource());
    }
}


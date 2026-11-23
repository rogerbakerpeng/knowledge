/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.gmhelper.bouncycastle.asn1.ASN1Boolean;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class ExtData
extends ASN1Object {
    private /* synthetic */ DEROctetString a;
    private /* synthetic */ ASN1Boolean G;
    private /* synthetic */ ASN1ObjectIdentifier b;

    public ExtData(ASN1ObjectIdentifier a, ASN1Boolean a2, DEROctetString a3) {
        ExtData a4;
        ExtData extData = a4;
        a4.b = a;
        extData.G = a2;
        extData.a = a3;
    }

    public static ExtData getInstance(Object a) {
        if (a instanceof ExtData) {
            return (ExtData)a;
        }
        if (a != null) {
            return new ExtData(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public ASN1ObjectIdentifier getExtnID() {
        ExtData a;
        return a.b;
    }

    public DEROctetString getExtnValue() {
        ExtData a;
        return a.a;
    }

    public ExtData(ASN1Sequence a) {
        ExtData a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.b = (ASN1ObjectIdentifier)a.nextElement();
        a2.G = (ASN1Boolean)a.nextElement();
        a2.a = (DEROctetString)a.nextElement();
    }

    public void setCritical(ASN1Boolean a) {
        a.G = a;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        ExtData a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        ExtData extData = a;
        aSN1EncodableVector.add(extData.b);
        aSN1EncodableVector2.add(extData.G);
        aSN1EncodableVector2.add(a.a);
        return new DERSequence(aSN1EncodableVector);
    }

    public void setExtnID(ASN1ObjectIdentifier a) {
        a.b = a;
    }

    public ASN1Boolean getCritical() {
        ExtData a;
        return a.G;
    }

    public void setExtnValue(DEROctetString a) {
        a.a = a;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.model.ExtensionDatas;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SESSignInfo
extends ASN1Object {
    private /* synthetic */ DERBitString a;
    private /* synthetic */ DEROctetString G;
    private /* synthetic */ ASN1ObjectIdentifier b;

    public SESSignInfo(ASN1Sequence a) {
        SESSignInfo a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.G = (DEROctetString)a.nextElement();
        a2.b = (ASN1ObjectIdentifier)a.nextElement();
        a2.a = (DERBitString)a.nextElement();
    }

    public DEROctetString getCert() {
        SESSignInfo a;
        return a.G;
    }

    public void setSignData(DERBitString a) {
        a.a = a;
    }

    public ASN1ObjectIdentifier getSignatureAlgorithm() {
        SESSignInfo a;
        return a.b;
    }

    public void setSignatureAlgorithm(ASN1ObjectIdentifier a) {
        a.b = a;
    }

    public DERBitString getSignData() {
        SESSignInfo a;
        return a.a;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SESSignInfo a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        SESSignInfo sESSignInfo = a;
        aSN1EncodableVector.add(sESSignInfo.G);
        aSN1EncodableVector2.add(sESSignInfo.b);
        aSN1EncodableVector2.add(a.a);
        return new DERSequence(aSN1EncodableVector);
    }

    public void setCert(DEROctetString a) {
        a.G = a;
    }

    public SESSignInfo(DEROctetString a, ASN1ObjectIdentifier a2, DERBitString a3) {
        SESSignInfo a4;
        SESSignInfo sESSignInfo = a4;
        a4.G = a;
        sESSignInfo.b = a2;
        sESSignInfo.a = a3;
    }

    public static SESSignInfo getInstance(Object a) {
        if (a instanceof ExtensionDatas) {
            return (SESSignInfo)a;
        }
        if (a != null) {
            return new SESSignInfo(ASN1Sequence.getInstance(a));
        }
        throw new ExEpSignException(new StringBuilder().insert(0, VerifyReq.J("\u0012U\fU\bL\t\u001b\bY\r^\u0004OGR\t\u001b4~4h\u000e\\\tr\t]\b\u001b\u0000^\u0013r\tH\u0013Z\tX\u0002\u0001G")).append(a.getClass().getName()).toString());
    }
}


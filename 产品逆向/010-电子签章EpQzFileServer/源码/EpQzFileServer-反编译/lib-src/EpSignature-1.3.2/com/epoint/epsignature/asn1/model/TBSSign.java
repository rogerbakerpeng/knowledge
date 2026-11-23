/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.model.ExtensionDatas;
import com.epoint.epsignature.asn1.model.SESeal;
import com.epoint.epsignature.bean.annotation.PDFAnnotationReq;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class TBSSign
extends ASN1Object {
    private /* synthetic */ DERBitString g;
    private /* synthetic */ SESeal k;
    private /* synthetic */ DERIA5String i;
    private /* synthetic */ ASN1Integer A;
    private /* synthetic */ ASN1ObjectIdentifier a;
    private /* synthetic */ DEROctetString G;
    private /* synthetic */ DERBitString b;

    public static TBSSign getInstance(Object a) {
        if (a instanceof ExtensionDatas) {
            return (TBSSign)a;
        }
        if (a != null) {
            return new TBSSign(ASN1Sequence.getInstance(a));
        }
        throw new ExEpSignException(new StringBuilder().insert(0, PDFAnnotationReq.J("2*,*(3)d(&-!$0g-)d\u0013\u0006\u0014\u0017.#)d !3\r)73%)'\"~g")).append(a.getClass().getName()).toString());
    }

    public DERBitString getDataHash() {
        TBSSign a;
        return a.g;
    }

    public void setVersion(ASN1Integer a) {
        a.A = a;
    }

    public void setCert(DEROctetString a) {
        a.G = a;
    }

    public SESeal getEseal() {
        TBSSign a;
        return a.k;
    }

    public DEROctetString getCert() {
        TBSSign a;
        return a.G;
    }

    public ASN1Integer getVersion() {
        TBSSign a;
        return a.A;
    }

    public void setTimeInfo(DERBitString a) {
        a.b = a;
    }

    public DERBitString getTimeInfo() {
        TBSSign a;
        return a.b;
    }

    public TBSSign(ASN1Sequence a) {
        TBSSign a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.A = (ASN1Integer)a.nextElement();
        TBSSign tBSSign = a2;
        tBSSign.k = SESeal.getInstance(a.nextElement());
        tBSSign.b = (DERBitString)a.nextElement();
        a2.g = (DERBitString)a.nextElement();
        a2.i = (DERIA5String)a.nextElement();
        a2.G = (DEROctetString)a.nextElement();
        a2.a = (ASN1ObjectIdentifier)a.nextElement();
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        TBSSign a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        TBSSign tBSSign = a;
        ASN1EncodableVector aSN1EncodableVector3 = aSN1EncodableVector;
        TBSSign tBSSign2 = a;
        aSN1EncodableVector.add(a.A);
        aSN1EncodableVector.add(tBSSign2.k);
        aSN1EncodableVector3.add(tBSSign2.b);
        aSN1EncodableVector3.add(a.g);
        aSN1EncodableVector.add(tBSSign.i);
        aSN1EncodableVector2.add(tBSSign.G);
        aSN1EncodableVector2.add(a.a);
        return new DERSequence(aSN1EncodableVector);
    }

    public TBSSign(ASN1Integer a, SESeal a2, DERBitString a3, DERBitString a4, DERIA5String a5, DEROctetString a6, ASN1ObjectIdentifier a7) {
        TBSSign a8;
        TBSSign tBSSign = a8;
        TBSSign tBSSign2 = a8;
        TBSSign tBSSign3 = a8;
        a8.A = a;
        tBSSign3.k = a2;
        tBSSign3.b = a3;
        tBSSign2.g = a4;
        tBSSign2.i = a5;
        tBSSign.G = a6;
        tBSSign.a = a7;
    }

    public void setEseal(SESeal a) {
        a.k = a;
    }

    public void setSignatureAlgorithm(ASN1ObjectIdentifier a) {
        a.a = a;
    }

    public void setDataHash(DERBitString a) {
        a.g = a;
    }

    public ASN1ObjectIdentifier getSignatureAlgorithm() {
        TBSSign a;
        return a.a;
    }

    public void setPropertyInfo(DERIA5String a) {
        a.i = a;
    }

    public DERIA5String getPropertyInfo() {
        TBSSign a;
        return a.i;
    }
}


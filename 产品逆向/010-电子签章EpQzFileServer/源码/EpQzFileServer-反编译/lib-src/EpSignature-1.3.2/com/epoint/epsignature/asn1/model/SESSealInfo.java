/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.model.ExtensionDatas;
import com.epoint.epsignature.asn1.model.SESESPictureInfo;
import com.epoint.epsignature.asn1.model.SESESPropertyInfo;
import com.epoint.epsignature.asn1.model.SESHeader;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SESSealInfo
extends ASN1Object {
    private /* synthetic */ SESHeader i;
    private /* synthetic */ DERIA5String A;
    private /* synthetic */ SESESPropertyInfo a;
    private /* synthetic */ SESESPictureInfo G;
    private /* synthetic */ ExtensionDatas b;

    @Override
    public ASN1Primitive toASN1Primitive() {
        SESSealInfo a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        SESSealInfo sESSealInfo = a;
        ASN1EncodableVector aSN1EncodableVector3 = aSN1EncodableVector;
        aSN1EncodableVector3.add(a.i);
        aSN1EncodableVector3.add(a.A);
        aSN1EncodableVector.add(sESSealInfo.a);
        aSN1EncodableVector2.add(sESSealInfo.G);
        aSN1EncodableVector2.add(a.b);
        return new DERSequence(aSN1EncodableVector);
    }

    public ExtensionDatas getExtDatas() {
        SESSealInfo a;
        return a.b;
    }

    public void setHeader(SESHeader a) {
        a.i = a;
    }

    public DERIA5String getEsID() {
        SESSealInfo a;
        return a.A;
    }

    public void setPicture(SESESPictureInfo a) {
        a.G = a;
    }

    public void setProperty(SESESPropertyInfo a) {
        a.a = a;
    }

    public void setExtDatas(ExtensionDatas a) {
        a.b = a;
    }

    public SESSealInfo(SESHeader a, DERIA5String a2, SESESPropertyInfo a3, SESESPictureInfo a4, ExtensionDatas a5) {
        SESSealInfo a6;
        SESSealInfo sESSealInfo = a6;
        SESSealInfo sESSealInfo2 = a6;
        a6.i = a;
        sESSealInfo2.A = a2;
        sESSealInfo2.a = a3;
        sESSealInfo.G = a4;
        sESSealInfo.b = a5;
    }

    public SESESPictureInfo getPicture() {
        SESSealInfo a;
        return a.G;
    }

    public SESHeader getHeader() {
        SESSealInfo a;
        return a.i;
    }

    public SESESPropertyInfo getProperty() {
        SESSealInfo a;
        return a.a;
    }

    public SESSealInfo(ASN1Sequence a) {
        SESSealInfo a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.i = SESHeader.getInstance(a.nextElement());
        a2.A = (DERIA5String)a.nextElement();
        SESSealInfo sESSealInfo = a2;
        Object object = a;
        a2.a = SESESPropertyInfo.getInstance(object.nextElement());
        sESSealInfo.G = SESESPictureInfo.getInstance(object.nextElement());
        sESSealInfo.b = ExtensionDatas.getInstance(a.nextElement());
    }

    public static SESSealInfo getInstance(Object a) {
        if (a instanceof ExtensionDatas) {
            return (SESSealInfo)a;
        }
        if (a != null) {
            return new SESSealInfo(ASN1Sequence.getInstance(a));
        }
        throw new ExEpSignException(new StringBuilder().insert(0, ExEpSignException.J("W\u001aI\u001aM\u0003LTM\u0016H\u0011A\u0000\u0002\u001dLTq1q'G\u0015N=L\u0012MTE\u0011V=L\u0007V\u0015L\u0017GN\u0002")).append(a.getClass().getName()).toString());
    }

    public void setEsID(DERIA5String a) {
        a.A = a;
    }
}


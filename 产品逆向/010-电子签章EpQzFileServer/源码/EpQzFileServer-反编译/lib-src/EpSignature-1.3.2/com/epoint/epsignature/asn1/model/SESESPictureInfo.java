/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.model.ExtensionDatas;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SESESPictureInfo
extends ASN1Object {
    private /* synthetic */ DEROctetString A;
    private /* synthetic */ DERIA5String a;
    private /* synthetic */ ASN1Integer G;
    private /* synthetic */ ASN1Integer b;

    public ASN1Integer getWidth() {
        SESESPictureInfo a;
        return a.b;
    }

    public SESESPictureInfo(ASN1Sequence a) {
        SESESPictureInfo a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.a = (DERIA5String)a.nextElement();
        a2.A = (DEROctetString)a.nextElement();
        a2.b = (ASN1Integer)a.nextElement();
        a2.G = (ASN1Integer)a.nextElement();
    }

    public void setType(DERIA5String a) {
        a.a = a;
    }

    public void setWidth(ASN1Integer a) {
        a.b = a;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SESESPictureInfo a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        SESESPictureInfo sESESPictureInfo = a;
        aSN1EncodableVector.add(a.a);
        aSN1EncodableVector.add(sESESPictureInfo.A);
        aSN1EncodableVector2.add(sESESPictureInfo.b);
        aSN1EncodableVector2.add(a.G);
        return new DERSequence(aSN1EncodableVector);
    }

    public SESESPictureInfo(DERIA5String a, DEROctetString a2, ASN1Integer a3, ASN1Integer a4) {
        SESESPictureInfo a5;
        SESESPictureInfo sESESPictureInfo = a5;
        SESESPictureInfo sESESPictureInfo2 = a5;
        sESESPictureInfo2.a = a;
        sESESPictureInfo2.A = a2;
        sESESPictureInfo.b = a3;
        sESESPictureInfo.G = a4;
    }

    public static SESESPictureInfo getInstance(Object a) {
        if (a instanceof ExtensionDatas) {
            return (SESESPictureInfo)a;
        }
        if (a != null) {
            return new SESESPictureInfo(ASN1Sequence.getInstance(a));
        }
        throw new ExEpSignException(new StringBuilder().insert(0, VerifyReq.J("N\tP\tT\u0010UGT\u0005Q\u0002X\u0013\u001b\u000eUGh\"h\"h7R\u0004O\u0012I\u0002r\t]\b\u001b\u0000^\u0013r\tH\u0013Z\tX\u0002\u0001G")).append(a.getClass().getName()).toString());
    }

    public DERIA5String getType() {
        SESESPictureInfo a;
        return a.a;
    }

    public DEROctetString getData() {
        SESESPictureInfo a;
        return a.A;
    }

    public ASN1Integer getHeight() {
        SESESPictureInfo a;
        return a.G;
    }

    public void setData(DEROctetString a) {
        a.A = a;
    }

    public void setHeight(ASN1Integer a) {
        a.G = a;
    }
}


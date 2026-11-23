/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v1;

import com.epoint.epsignature.gm.ses.v1.ExtensionDatas;
import com.epoint.epsignature.gm.ses.v1.SES_ESPictrueInfo;
import com.epoint.epsignature.gm.ses.v1.SES_ESPropertyInfo;
import com.epoint.epsignature.gm.ses.v1.SES_Header;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SES_SealInfo
extends ASN1Object {
    private /* synthetic */ DERIA5String i;
    private /* synthetic */ SES_Header A;
    private /* synthetic */ SES_ESPropertyInfo a;
    private /* synthetic */ SES_ESPictrueInfo G;
    private /* synthetic */ ExtensionDatas b;

    public SES_SealInfo(ASN1Sequence a) {
        SES_SealInfo a2;
        SES_SealInfo sES_SealInfo = a2;
        a = ((ASN1Sequence)a).getObjects();
        sES_SealInfo.A = SES_Header.getInstance(a.nextElement());
        a2.i = DERIA5String.getInstance(a.nextElement());
        sES_SealInfo.a = SES_ESPropertyInfo.getInstance(a.nextElement());
        sES_SealInfo.G = SES_ESPictrueInfo.getInstance(a.nextElement());
        if (a.hasMoreElements()) {
            a2.b = ExtensionDatas.getInstance(a.nextElement());
        }
    }

    public static SES_SealInfo getInstance(Object a) {
        if (a instanceof SES_SealInfo) {
            return (SES_SealInfo)a;
        }
        if (a != null) {
            return new SES_SealInfo(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public SES_SealInfo setEsID(String a) {
        SES_SealInfo a2;
        a2.i = new DERIA5String(a);
        return a2;
    }

    public SES_SealInfo() {
        SES_SealInfo a;
    }

    public SES_Header getHeader() {
        SES_SealInfo a;
        return a.A;
    }

    public SES_ESPropertyInfo getProperty() {
        SES_SealInfo a;
        return a.a;
    }

    public SES_SealInfo setHeader(SES_Header a) {
        SES_SealInfo a2;
        a2.A = a;
        return a2;
    }

    public SES_SealInfo(SES_Header a, DERIA5String a2, SES_ESPropertyInfo a3, SES_ESPictrueInfo a4, ExtensionDatas a5) {
        SES_SealInfo a6;
        SES_SealInfo sES_SealInfo = a6;
        SES_SealInfo sES_SealInfo2 = a6;
        a6.A = a;
        sES_SealInfo2.i = a2;
        sES_SealInfo2.a = a3;
        sES_SealInfo.G = a4;
        sES_SealInfo.b = a5;
    }

    public DERIA5String getEsID() {
        SES_SealInfo a;
        return a.i;
    }

    public SES_SealInfo setPicture(SES_ESPictrueInfo a) {
        SES_SealInfo a2;
        a2.G = a;
        return a2;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SES_SealInfo a;
        ASN1EncodableVector aSN1EncodableVector = new ASN1EncodableVector();
        SES_SealInfo sES_SealInfo = a;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector;
        SES_SealInfo sES_SealInfo2 = a;
        aSN1EncodableVector.add(sES_SealInfo2.A);
        aSN1EncodableVector2.add(sES_SealInfo2.i);
        aSN1EncodableVector2.add(a.a);
        aSN1EncodableVector.add(sES_SealInfo.G);
        if (sES_SealInfo.b != null) {
            aSN1EncodableVector.add(a.b);
        }
        return new DERSequence(aSN1EncodableVector);
    }

    public SES_SealInfo setExtDatas(ExtensionDatas a) {
        SES_SealInfo a2;
        a2.b = a;
        return a2;
    }

    public ExtensionDatas getExtDatas() {
        SES_SealInfo a;
        return a.b;
    }

    public SES_ESPictrueInfo getPicture() {
        SES_SealInfo a;
        return a.G;
    }

    public SES_SealInfo setProperty(SES_ESPropertyInfo a) {
        SES_SealInfo a2;
        a2.a = a;
        return a2;
    }

    public SES_SealInfo setEsID(DERIA5String a) {
        SES_SealInfo a2;
        a2.i = a;
        return a2;
    }
}


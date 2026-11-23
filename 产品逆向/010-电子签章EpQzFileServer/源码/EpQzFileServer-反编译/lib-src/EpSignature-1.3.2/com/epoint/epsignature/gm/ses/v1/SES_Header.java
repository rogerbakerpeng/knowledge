/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v1;

import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class SES_Header
extends ASN1Object {
    public static final DERIA5String ID;
    private /* synthetic */ DERIA5String a;
    private /* synthetic */ ASN1Integer G;
    private /* synthetic */ DERIA5String b;
    public static final ASN1Integer V4;

    public ASN1Integer getVersion() {
        SES_Header a;
        return a.G;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SES_Header a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        aSN1EncodableVector.add(ID);
        aSN1EncodableVector2.add(a.G);
        aSN1EncodableVector2.add(a.a);
        return new DERSequence(aSN1EncodableVector);
    }

    public SES_Header setVersion(int a) {
        SES_Header a2;
        a2.G = new ASN1Integer(a);
        return a2;
    }

    public SES_Header(ASN1Integer a, DERIA5String a2) {
        SES_Header a3;
        SES_Header sES_Header = a3;
        a3.b = ID;
        sES_Header.G = a;
        sES_Header.a = a2;
    }

    public SES_Header setVersion(ASN1Integer a) {
        SES_Header a2;
        a2.G = a;
        return a2;
    }

    public SES_Header setVid(String a) {
        SES_Header a2;
        a2.a = new DERIA5String(a);
        return a2;
    }

    public SES_Header setVid(DERIA5String a) {
        SES_Header a2;
        a2.a = a;
        return a2;
    }

    public DERIA5String getId() {
        SES_Header a;
        return a.b;
    }

    public SES_Header(ASN1Sequence a) {
        SES_Header a2;
        SES_Header sES_Header = a2;
        a = ((ASN1Sequence)a).getObjects();
        sES_Header.b = DERIA5String.getInstance(a.nextElement());
        a2.G = ASN1Integer.getInstance(a.nextElement());
        sES_Header.a = DERIA5String.getInstance(a.nextElement());
    }

    public SES_Header() {
        SES_Header a;
    }

    public static SES_Header getInstance(Object a) {
        if (a instanceof SES_Header) {
            return (SES_Header)a;
        }
        if (a != null) {
            return new SES_Header(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    static {
        V4 = new ASN1Integer(4L);
        ID = new DERIA5String("ES");
    }

    public DERIA5String getVid() {
        SES_Header a;
        return a.a;
    }
}


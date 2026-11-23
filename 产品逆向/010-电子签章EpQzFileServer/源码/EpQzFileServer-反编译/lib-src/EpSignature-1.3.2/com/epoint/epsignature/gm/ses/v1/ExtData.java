/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v1;

import com.epoint.gmhelper.bouncycastle.asn1.ASN1Boolean;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;

public class ExtData
extends ASN1Object {
    private /* synthetic */ ASN1Sequence A;
    private /* synthetic */ ASN1OctetString a;
    private /* synthetic */ ASN1ObjectIdentifier G;
    private /* synthetic */ ASN1Boolean b;

    public ExtData() {
        ExtData a;
        a.b = ASN1Boolean.FALSE;
    }

    public ASN1Boolean getCritical() {
        ExtData a;
        return a.b;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        ExtData a;
        return a.A;
    }

    public ExtData setExtnID(ASN1ObjectIdentifier a) {
        ExtData a2;
        a2.G = a;
        return a2;
    }

    public ExtData(ASN1Sequence a) {
        ExtData a2;
        a2.b = ASN1Boolean.FALSE;
        a2.A = a;
    }

    public ExtData(ASN1ObjectIdentifier a, ASN1Boolean a2, ASN1OctetString a3) {
        ExtData a4;
        ExtData extData = a4;
        a4.b = ASN1Boolean.FALSE;
        a4.G = a;
        extData.b = a2;
        extData.a = a3;
    }

    public ASN1ObjectIdentifier getExtnID() {
        ExtData a;
        return a.G;
    }

    public ASN1OctetString getExtnValue() {
        ExtData a;
        return a.a;
    }

    public ExtData setCritical(ASN1Boolean a) {
        ExtData a2;
        a2.b = a;
        return a2;
    }

    public ExtData setExtnValue(ASN1OctetString a) {
        ExtData a2;
        a2.a = a;
        return a2;
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
}


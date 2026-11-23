/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v4;

import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERPrintableString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class CertDigestObj
extends ASN1Object {
    private /* synthetic */ ASN1OctetString G;
    private /* synthetic */ DERPrintableString b;

    public CertDigestObj() {
        CertDigestObj a;
    }

    public CertDigestObj setType(String a) {
        CertDigestObj a2;
        a2.b = new DERPrintableString(a);
        return a2;
    }

    public static CertDigestObj getInstance(Object a) {
        if (a instanceof CertDigestObj) {
            return (CertDigestObj)a;
        }
        if (a != null) {
            return new CertDigestObj(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public CertDigestObj setValue(byte[] a) {
        CertDigestObj a2;
        a2.G = new DEROctetString(a);
        return a2;
    }

    public CertDigestObj setValue(ASN1OctetString a) {
        CertDigestObj a2;
        a2.G = a;
        return a2;
    }

    public CertDigestObj setType(DERPrintableString a) {
        CertDigestObj a2;
        a2.b = a;
        return a2;
    }

    public ASN1OctetString getValue() {
        CertDigestObj a;
        return a.G;
    }

    public DERPrintableString getType() {
        CertDigestObj a;
        return a.b;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        CertDigestObj a;
        ASN1EncodableVector aSN1EncodableVector;
        ASN1EncodableVector aSN1EncodableVector2 = aSN1EncodableVector = new ASN1EncodableVector();
        aSN1EncodableVector2.add(a.b);
        aSN1EncodableVector2.add(a.G);
        return new DERSequence(aSN1EncodableVector);
    }

    public CertDigestObj(ASN1Sequence a) {
        CertDigestObj a2;
        a = ((ASN1Sequence)a).getObjects();
        a2.b = DERPrintableString.getInstance(a.nextElement());
        a2.G = ASN1OctetString.getInstance(a.nextElement());
    }

    public CertDigestObj(DERPrintableString a, ASN1OctetString a2) {
        CertDigestObj a3;
        CertDigestObj certDigestObj = a3;
        certDigestObj.b = a;
        certDigestObj.G = a2;
    }
}


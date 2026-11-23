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
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import com.epoint.gmhelper.bouncycastle.util.Iterable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class CertInfoList
extends ASN1Object
implements Iterable<ASN1OctetString> {
    private final /* synthetic */ List<ASN1OctetString> b;

    public ASN1OctetString get(int a) {
        CertInfoList a2;
        return a2.b.get(a);
    }

    public CertInfoList add(ASN1OctetString a) {
        CertInfoList a2;
        CertInfoList certInfoList = a2;
        certInfoList.b.add(a);
        return certInfoList;
    }

    public CertInfoList() {
        CertInfoList a;
        CertInfoList certInfoList = a;
        certInfoList.b = new ArrayList<ASN1OctetString>();
    }

    public CertInfoList(ASN1OctetString[] a) {
        CertInfoList a2;
        CertInfoList certInfoList = a2;
        certInfoList();
        certInfoList.b.addAll(Arrays.asList(a));
    }

    @Override
    public Iterator<ASN1OctetString> iterator() {
        CertInfoList a;
        return a.b.iterator();
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        CertInfoList a;
        ASN1EncodableVector aSN1EncodableVector = new ASN1EncodableVector();
        a.b.forEach(aSN1EncodableVector::add);
        return new DERSequence(aSN1EncodableVector);
    }

    public static CertInfoList getInstance(Object a) {
        if (a instanceof CertInfoList) {
            return (CertInfoList)a;
        }
        if (a != null) {
            return new CertInfoList(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public CertInfoList(ASN1Sequence a) {
        int n;
        CertInfoList a2;
        CertInfoList certInfoList = a2;
        certInfoList.b = new ArrayList<ASN1OctetString>(a.size());
        int n2 = n = 0;
        while (n2 != a.size()) {
            a2.add(DEROctetString.getInstance(a.getObjectAt(n++)));
            n2 = n;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v4;

import com.epoint.epsignature.gm.ses.v4.CertDigestObj;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import com.epoint.gmhelper.bouncycastle.util.Iterable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class CertDigestList
extends ASN1Object
implements Iterable<CertDigestObj> {
    private /* synthetic */ List<CertDigestObj> b;

    public static CertDigestList getInstance(Object a) {
        if (a instanceof CertDigestList) {
            return (CertDigestList)a;
        }
        if (a != null) {
            return new CertDigestList(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public CertDigestList() {
        CertDigestList a;
        CertDigestList certDigestList = a;
        certDigestList.b = new ArrayList<CertDigestObj>();
    }

    public CertDigestList(CertDigestObj[] a) {
        CertDigestList a2;
        CertDigestList certDigestList = a2;
        certDigestList();
        certDigestList.b.addAll(Arrays.asList(a));
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        CertDigestList a;
        ASN1EncodableVector aSN1EncodableVector = new ASN1EncodableVector();
        a.b.forEach(aSN1EncodableVector::add);
        return new DERSequence(aSN1EncodableVector);
    }

    @Override
    public Iterator<CertDigestObj> iterator() {
        CertDigestList a;
        return a.b.iterator();
    }

    public CertDigestList add(CertDigestObj a) {
        CertDigestList a2;
        CertDigestList certDigestList = a2;
        certDigestList.b.add(a);
        return certDigestList;
    }

    public CertDigestObj get(int a) {
        CertDigestList a2;
        return a2.b.get(a);
    }

    public CertDigestList(ASN1Sequence a) {
        int n;
        CertDigestList a2;
        CertDigestList certDigestList = a2;
        certDigestList.b = new ArrayList<CertDigestObj>(a.size());
        int n2 = n = 0;
        while (n2 != a.size()) {
            a2.add(CertDigestObj.getInstance(a.getObjectAt(n++)));
            n2 = n;
        }
    }
}


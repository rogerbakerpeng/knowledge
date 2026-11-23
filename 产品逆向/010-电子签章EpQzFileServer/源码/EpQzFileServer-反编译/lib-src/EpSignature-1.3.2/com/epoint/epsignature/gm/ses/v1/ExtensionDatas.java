/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v1;

import com.epoint.epsignature.gm.ses.v1.ExtData;
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

public class ExtensionDatas
extends ASN1Object
implements Iterable<ExtData> {
    private final /* synthetic */ List<ExtData> b;

    @Override
    public Iterator<ExtData> iterator() {
        ExtensionDatas a;
        return a.b.iterator();
    }

    public ExtensionDatas(ExtData[] a) {
        ExtensionDatas a2;
        ExtensionDatas extensionDatas = a2;
        extensionDatas();
        extensionDatas.b.addAll(Arrays.asList(a));
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        ExtensionDatas a;
        ASN1EncodableVector aSN1EncodableVector = new ASN1EncodableVector();
        a.b.forEach(aSN1EncodableVector::add);
        return new DERSequence(aSN1EncodableVector);
    }

    public ExtData get(int a) {
        ExtensionDatas a2;
        return a2.b.get(a);
    }

    public ExtensionDatas() {
        ExtensionDatas a;
        ExtensionDatas extensionDatas = a;
        extensionDatas.b = new ArrayList<ExtData>();
    }

    public ExtensionDatas(ASN1Sequence a) {
        int n;
        ExtensionDatas a2;
        ExtensionDatas extensionDatas = a2;
        extensionDatas.b = new ArrayList<ExtData>(a.size());
        int n2 = n = 0;
        while (n2 != a.size()) {
            a2.add(ExtData.getInstance(a.getObjectAt(n++)));
            n2 = n;
        }
    }

    public ExtensionDatas add(ExtData a) {
        ExtensionDatas a2;
        ExtensionDatas extensionDatas = a2;
        extensionDatas.b.add(a);
        return extensionDatas;
    }

    public static ExtensionDatas getInstance(Object a) {
        if (a instanceof ExtensionDatas) {
            return (ExtensionDatas)a;
        }
        if (a != null) {
            return new ExtensionDatas(ASN1Sequence.getInstance(a));
        }
        return null;
    }
}


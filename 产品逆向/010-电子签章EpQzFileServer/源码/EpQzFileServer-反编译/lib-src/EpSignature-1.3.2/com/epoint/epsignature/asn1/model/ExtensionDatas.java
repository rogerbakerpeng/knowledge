/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.model.ExtData;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;

public class ExtensionDatas
extends ASN1Object {
    private /* synthetic */ ExtData[] b;

    @Override
    public ASN1Primitive toASN1Primitive() {
        ExtensionDatas a;
        int n;
        ASN1EncodableVector aSN1EncodableVector = new ASN1EncodableVector();
        int n2 = n = 0;
        while (n2 < a.b.length) {
            aSN1EncodableVector.add(a.b[n++]);
            n2 = n;
        }
        return new DERSequence(aSN1EncodableVector);
    }

    public static ExtensionDatas getInstance(Object a) {
        if (a instanceof ExtensionDatas) {
            return (ExtensionDatas)a;
        }
        if (a != null) {
            return new ExtensionDatas(ASN1Sequence.getInstance(a));
        }
        throw new ExEpSignException(new StringBuilder().insert(0, GetMessageResponse.J("0\u0013.\u0013*\n+]*\u001f/\u0018&\te\u0014+]\u0000\u00051\u0018+\u000e,\u0012+9$\t$\u000ee\u001a \t\f\u00136\t$\u0013&\u0018\u007f]")).append(a.getClass().getName()).toString());
    }

    public ExtData[] getExtdata() {
        ExtensionDatas a;
        return a.b;
    }

    public ExtensionDatas(ASN1Sequence a) {
        int n;
        ExtensionDatas a2;
        a2.b = new ExtData[a.size()];
        int n2 = n = 0;
        while (n2 < a.size()) {
            int n3 = n++;
            a2.b[n3] = ExtData.getInstance(a.getObjectAt(n3));
            n2 = n;
        }
    }

    public void setExtdata(ExtData[] a) {
        a.b = a;
    }

    public ExtensionDatas(ExtData[] a) {
        ExtensionDatas a2;
        a2.b = a;
    }
}


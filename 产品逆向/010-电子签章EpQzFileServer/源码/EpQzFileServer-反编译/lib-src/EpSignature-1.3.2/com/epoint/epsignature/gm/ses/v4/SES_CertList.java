/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v4;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.gm.ses.v4.CertDigestList;
import com.epoint.epsignature.gm.ses.v4.CertInfoList;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Choice;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Encodable;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import java.io.IOException;

public class SES_CertList
extends ASN1Object
implements ASN1Choice {
    private final /* synthetic */ CertDigestList G;
    private final /* synthetic */ CertInfoList b;

    public CertInfoList getCerts() {
        SES_CertList a;
        return a.b;
    }

    public SES_CertList(CertInfoList a) {
        SES_CertList a2;
        SES_CertList sES_CertList = a2;
        sES_CertList.b = a;
        sES_CertList.G = null;
    }

    public SES_CertList(CertDigestList a) {
        SES_CertList a2;
        SES_CertList sES_CertList = a2;
        sES_CertList.b = null;
        sES_CertList.G = a;
    }

    public static SES_CertList getInstance(ASN1Integer a, Object a2) {
        if (a2 instanceof SES_CertList) {
            return (SES_CertList)a2;
        }
        if (a2 != null) {
            if (a2 instanceof ASN1Encodable) {
                int n = a.getValue().intValue();
                if (n == 1) {
                    return new SES_CertList(CertInfoList.getInstance(a2));
                }
                if (n == 2) {
                    return new SES_CertList(CertDigestList.getInstance(a2));
                }
                throw new IllegalArgumentException(new StringBuilder().insert(0, VerifyReq.J("\u0012U\fU\bL\t\u001b\u0013B\u0017^GR\t\u001b\u0000^\u0013r\tH\u0013Z\tX\u0002\u0013N\u0001G")).append(a2.getClass().getName()).toString());
            }
            if (a2 instanceof byte[]) {
                try {
                    return SES_CertList.getInstance(a, ASN1Primitive.fromByteArray((byte[])a2));
                }
                catch (IOException iOException) {
                    throw new IllegalArgumentException(EpOFDData.J("S$M$I=HjC$E%B#H-\u0006#HjA/R\u0003H9R+H)Cb\u000f"));
                }
            }
            throw new IllegalArgumentException(new StringBuilder().insert(0, VerifyReq.J("\u0012U\fU\bL\t\u001b\bY\r^\u0004OGR\t\u001b\u0000^\u0013r\tH\u0013Z\tX\u0002\u0013N\u0001G")).append(a2.getClass().getName()).toString());
        }
        return null;
    }

    public ASN1Object get() {
        SES_CertList a;
        if (a.b != null) {
            return a.b;
        }
        return a.G;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        SES_CertList a;
        return a.get().toASN1Primitive();
    }

    public CertDigestList getCertDigestList() {
        SES_CertList a;
        return a.G;
    }
}


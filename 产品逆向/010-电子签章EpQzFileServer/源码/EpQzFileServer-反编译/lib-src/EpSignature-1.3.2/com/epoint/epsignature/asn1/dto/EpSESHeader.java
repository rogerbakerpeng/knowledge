/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.dto;

import com.epoint.epsignature.asn1.model.EpASN1Object;
import com.epoint.epsignature.asn1.model.SESHeader;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;

public class EpSESHeader
extends EpASN1Object<SESHeader> {
    private /* synthetic */ String a;
    private /* synthetic */ Long G;
    private /* synthetic */ String b;

    public void setVid(String a) {
        EpSESHeader a2;
        ((SESHeader)a2.source).setVid(new DERIA5String(a));
    }

    public EpSESHeader(String a, Long a2, String a3) {
        EpSESHeader a4;
        a4.setSource(new SESHeader(new DERIA5String(a), new ASN1Integer(a2), new DERIA5String(a3)));
    }

    public Long getVersion() {
        EpSESHeader a;
        return EpSESHeader.asn1Int2Long(((SESHeader)a.source).getVersion());
    }

    public String getId() {
        EpSESHeader a;
        return ((SESHeader)a.source).getId().getString();
    }

    public void setVersion(Long a) {
        EpSESHeader a2;
        ((SESHeader)a2.source).setVersion(new ASN1Integer(a));
    }

    public EpSESHeader(SESHeader a) {
        EpSESHeader a2;
        EpSESHeader epSESHeader = a2;
        epSESHeader.setSource(a);
    }

    public String getVid() {
        EpSESHeader a;
        return ((SESHeader)a.source).getVid().getString();
    }

    public void setId(String a) {
        EpSESHeader a2;
        ((SESHeader)a2.source).setId(new DERIA5String(a));
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.dto;

import com.epoint.epsignature.asn1.model.EpASN1Object;
import com.epoint.epsignature.asn1.model.ExtData;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Boolean;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;

public class EpExtData
extends EpASN1Object<ExtData> {
    private /* synthetic */ byte[] a;
    private /* synthetic */ boolean G;
    private /* synthetic */ String b;

    public String getExtnID() {
        EpExtData a;
        return ((ExtData)a.source).getExtnID().getId();
    }

    public void setExtnValue(byte[] a) {
        EpExtData a2;
        ((ExtData)a2.source).setExtnValue(new DEROctetString(a));
    }

    public EpExtData(String a, boolean a2, byte[] a3) {
        EpExtData a4;
        a4.setSource(new ExtData(new ASN1ObjectIdentifier(a), ASN1Boolean.getInstance(a2), new DEROctetString(a3)));
    }

    public boolean oidEquals(String a) {
        EpExtData a2;
        return a2.oidEquals(new ASN1ObjectIdentifier(a));
    }

    public void setExtnID(String a) {
        EpExtData a2;
        ((ExtData)a2.source).setExtnID(new ASN1ObjectIdentifier(a));
    }

    public EpExtData(ExtData a) {
        EpExtData a2;
        EpExtData epExtData = a2;
        epExtData.setSource(a);
    }

    public boolean oidEquals(ASN1ObjectIdentifier a) {
        EpExtData a2;
        return ((ExtData)a2.source).getExtnID().getId().equals(a.getId());
    }

    public boolean isCritical() {
        EpExtData a;
        return ((ExtData)a.source).getCritical().isTrue();
    }

    public byte[] getExtnValue() {
        EpExtData a;
        return ((ExtData)a.source).getExtnValue().getOctets();
    }

    public void setCritical(boolean a) {
        EpExtData a2;
        ((ExtData)a2.source).setCritical(ASN1Boolean.getInstance(a));
    }
}


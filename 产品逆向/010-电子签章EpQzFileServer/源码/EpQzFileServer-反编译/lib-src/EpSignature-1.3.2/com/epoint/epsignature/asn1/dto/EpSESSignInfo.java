/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.dto;

import com.epoint.epsignature.asn1.model.EpASN1Object;
import com.epoint.epsignature.asn1.model.SESSignInfo;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1ObjectIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import java.security.cert.Certificate;

public class EpSESSignInfo
extends EpASN1Object<SESSignInfo> {
    private /* synthetic */ byte[] a;
    private /* synthetic */ ASN1ObjectIdentifier G;
    private /* synthetic */ Certificate b;

    public Certificate getCert() {
        EpSESSignInfo a;
        return EpSESSignInfo.octetString2Cert(((SESSignInfo)a.source).getCert());
    }

    public void setSignData(byte[] a) {
        EpSESSignInfo a2;
        ((SESSignInfo)a2.source).setSignData(new DERBitString(a));
    }

    public EpSESSignInfo(Certificate a, ASN1ObjectIdentifier a2, byte[] a3) {
        EpSESSignInfo a4;
        a4.setSource(new SESSignInfo(EpSESSignInfo.cert2OctetString(a), a2, new DERBitString(a3)));
    }

    public EpSESSignInfo() {
        EpSESSignInfo a;
    }

    public byte[] getSignData() {
        EpSESSignInfo a;
        return ((SESSignInfo)a.source).getSignData().getOctets();
    }

    public ASN1ObjectIdentifier getSignatureAlgorithm() {
        EpSESSignInfo a;
        return ((SESSignInfo)a.source).getSignatureAlgorithm();
    }

    public void setCert(Certificate a) {
        EpSESSignInfo a2;
        ((SESSignInfo)a2.source).setCert(EpSESSignInfo.cert2OctetString(a));
    }

    public EpSESSignInfo(SESSignInfo a) {
        EpSESSignInfo a2;
        EpSESSignInfo epSESSignInfo = a2;
        epSESSignInfo.setSource(a);
    }

    public void setSignatureAlgorithm(ASN1ObjectIdentifier a) {
        EpSESSignInfo a2;
        ((SESSignInfo)a2.source).setSignatureAlgorithm(a);
    }
}


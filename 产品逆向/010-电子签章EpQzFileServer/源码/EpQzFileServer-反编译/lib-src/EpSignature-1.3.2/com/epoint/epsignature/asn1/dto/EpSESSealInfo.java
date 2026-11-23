/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.dto;

import com.epoint.epsignature.asn1.dto.EpExtensionDatas;
import com.epoint.epsignature.asn1.dto.EpSESESPictureInfo;
import com.epoint.epsignature.asn1.dto.EpSESESPropertyInfo;
import com.epoint.epsignature.asn1.dto.EpSESHeader;
import com.epoint.epsignature.asn1.model.EpASN1Object;
import com.epoint.epsignature.asn1.model.ExtensionDatas;
import com.epoint.epsignature.asn1.model.SESESPictureInfo;
import com.epoint.epsignature.asn1.model.SESESPropertyInfo;
import com.epoint.epsignature.asn1.model.SESHeader;
import com.epoint.epsignature.asn1.model.SESSealInfo;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;

public class EpSESSealInfo
extends EpASN1Object<SESSealInfo> {
    private /* synthetic */ EpSESESPictureInfo i;
    private /* synthetic */ String A;
    private /* synthetic */ EpExtensionDatas a;
    private /* synthetic */ EpSESHeader G;
    private /* synthetic */ EpSESESPropertyInfo b;

    public EpSESHeader getHeader() {
        EpSESSealInfo a;
        return new EpSESHeader(((SESSealInfo)a.source).getHeader());
    }

    public EpSESESPropertyInfo getProperty() {
        EpSESSealInfo a;
        return new EpSESESPropertyInfo(((SESSealInfo)a.source).getProperty());
    }

    public EpSESESPictureInfo getPicture() {
        EpSESSealInfo a;
        return new EpSESESPictureInfo(((SESSealInfo)a.source).getPicture(), a.getExtDatas());
    }

    public void setEsID(String a) {
        EpSESSealInfo a2;
        ((SESSealInfo)a2.source).setEsID(new DERIA5String(a));
    }

    public void setExtDatas(EpExtensionDatas a) {
        EpSESSealInfo a2;
        ((SESSealInfo)a2.source).setExtDatas((ExtensionDatas)a.getSource());
    }

    public EpSESSealInfo(EpSESHeader a, String a2, EpSESESPropertyInfo a3, EpSESESPictureInfo a4, EpExtensionDatas a5) {
        EpSESSealInfo a6;
        a6.setSource(new SESSealInfo((SESHeader)a.getSource(), new DERIA5String(a2), (SESESPropertyInfo)a3.getSource(), (SESESPictureInfo)a4.getSource(), (ExtensionDatas)a5.getSource()));
    }

    public void setPicture(EpSESESPictureInfo a) {
        EpSESSealInfo a2;
        ((SESSealInfo)a2.source).setPicture((SESESPictureInfo)a.getSource());
    }

    public void setProperty(EpSESESPropertyInfo a) {
        EpSESSealInfo a2;
        ((SESSealInfo)a2.source).setProperty((SESESPropertyInfo)a.getSource());
    }

    public EpSESSealInfo(SESSealInfo a) {
        EpSESSealInfo a2;
        EpSESSealInfo epSESSealInfo = a2;
        epSESSealInfo.setSource(a);
    }

    public String getEsID() {
        EpSESSealInfo a;
        return ((SESSealInfo)a.source).getEsID().getString();
    }

    public void setHeader(EpSESHeader a) {
        EpSESSealInfo a2;
        ((SESSealInfo)a2.source).setHeader((SESHeader)a.getSource());
    }

    public EpExtensionDatas getExtDatas() {
        EpSESSealInfo a;
        return new EpExtensionDatas(((SESSealInfo)a.source).getExtDatas());
    }
}


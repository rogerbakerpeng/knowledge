/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.asn1.dto.EpExtData;
import java.io.UnsupportedEncodingException;

public class EpSealExts {
    private /* synthetic */ String G;
    private /* synthetic */ String b;
    public static final String PLATFORMNAME_OID = "1.2.156.124445.9.2";
    public static final String PLATFORMCODE_OID = "1.2.156.124445.9.1";
    private static final String CHARSET = "UTF-8";

    public EpSealExts() {
        EpSealExts a;
    }

    public void setPlatformname(String a) {
        a.G = a;
    }

    public EpSealExts(String a, String a2) {
        EpSealExts a3;
        EpSealExts epSealExts = a3;
        epSealExts.b = a;
        epSealExts.G = a2;
    }

    public String getPlatformcode() {
        EpSealExts a;
        return a.b;
    }

    public EpExtData[] getEpExtDatas() throws UnsupportedEncodingException {
        EpSealExts a;
        EpExtData[] epExtDataArray = new EpExtData[2];
        epExtDataArray[0] = new EpExtData(PLATFORMCODE_OID, true, a.b.getBytes(CHARSET));
        epExtDataArray[1] = new EpExtData(PLATFORMNAME_OID, true, a.G.getBytes(CHARSET));
        return epExtDataArray;
    }

    public String getPlatformname() {
        EpSealExts a;
        return a.G;
    }

    public void setPlatformcode(String a) {
        a.b = a;
    }
}


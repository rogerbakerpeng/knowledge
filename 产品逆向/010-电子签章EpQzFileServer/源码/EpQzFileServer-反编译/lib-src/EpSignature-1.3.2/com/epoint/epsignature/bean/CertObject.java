/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean;

public class CertObject {
    private String signaturecert;
    private String devicenum;
    private String decryptcert;
    private String dognum;

    public void setDecryptcert(String a) {
        a.decryptcert = a;
    }

    public CertObject(String a, String a2, String a3, String a4) {
        CertObject a5;
        CertObject certObject = a5;
        CertObject certObject2 = a5;
        certObject2.devicenum = a;
        certObject2.dognum = a2;
        certObject.signaturecert = a3;
        certObject.decryptcert = a4;
    }

    public void setDevicenum(String a) {
        a.devicenum = a;
    }

    public void setSignaturecert(String a) {
        a.signaturecert = a;
    }

    public String getDognum() {
        CertObject a;
        return a.dognum;
    }

    public void setDognum(String a) {
        a.dognum = a;
    }

    public String getDecryptcert() {
        CertObject a;
        return a.decryptcert;
    }

    public String getSignaturecert() {
        CertObject a;
        return a.signaturecert;
    }

    public String getDevicenum() {
        CertObject a;
        return a.devicenum;
    }

    public CertObject() {
        CertObject a;
    }
}


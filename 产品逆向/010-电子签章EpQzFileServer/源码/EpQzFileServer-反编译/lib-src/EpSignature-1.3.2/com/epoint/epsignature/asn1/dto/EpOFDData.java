/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.dto;

import com.epoint.epsignature.asn1.dto.EpOFDExtraParams;

public class EpOFDData {
    private /* synthetic */ String g;
    private /* synthetic */ float k;
    private /* synthetic */ float i;
    private /* synthetic */ float A;
    private /* synthetic */ EpOFDExtraParams a;
    private /* synthetic */ int G;
    private /* synthetic */ float b;

    public void setWidth(float a) {
        a.A = a;
    }

    public int getType() {
        EpOFDData a;
        return a.G;
    }

    public float getWidth() {
        EpOFDData a;
        return a.A;
    }

    public void setY(float a) {
        a.k = a;
    }

    public void setConvertAddress(String a) {
        a.g = a;
    }

    public void setExtraParams(EpOFDExtraParams a) {
        a.a = a;
    }

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 4 << 4 ^ 5 << 1;
        int cfr_ignored_0 = 5 << 4 ^ 5 << 1;
        int n4 = n2;
        int n5 = 4 << 3 ^ (3 ^ 5);
        while (n4 >= 0) {
            int n6 = n2--;
            cArray[n6] = (char)(a.charAt(n6) ^ n5);
            if (n2 < 0) break;
            int n7 = n2--;
            cArray[n7] = (char)(a.charAt(n7) ^ n3);
            n4 = n2;
        }
        return new String(cArray);
    }

    public void setType(int a) {
        a.G = a;
    }

    public float getY() {
        EpOFDData a;
        return a.k;
    }

    public void setX(float a) {
        a.b = a;
    }

    public float getHeight() {
        EpOFDData a;
        return a.i;
    }

    public void setHeight(float a) {
        a.i = a;
    }

    public EpOFDData() {
        EpOFDData a;
    }

    public float getX() {
        EpOFDData a;
        return a.b;
    }

    public String getConvertAddress() {
        EpOFDData a;
        return a.g;
    }

    public EpOFDExtraParams getExtraParams() {
        EpOFDData a;
        return a.a;
    }
}


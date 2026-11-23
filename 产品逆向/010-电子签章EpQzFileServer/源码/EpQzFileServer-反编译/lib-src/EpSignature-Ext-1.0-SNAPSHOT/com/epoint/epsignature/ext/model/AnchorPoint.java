/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.model;

import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.ext.model.SealinfoAndPos;
import java.util.List;

public class AnchorPoint {
    private /* synthetic */ String D;
    private /* synthetic */ List<SealinfoAndPos> M;
    private /* synthetic */ String m;
    private /* synthetic */ float b;
    private /* synthetic */ ComSignReq.Position g;

    public void setKeyword(String a) {
        a.D = a;
    }

    public String getKeyword() {
        AnchorPoint a;
        return a.D;
    }

    public AnchorPoint() {
        AnchorPoint a;
    }

    public String getSeal_type() {
        AnchorPoint a;
        return a.m;
    }

    public static String F(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 2 << 3 ^ 2;
        int cfr_ignored_0 = 5 << 3;
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

    public void setSeal_type(String a) {
        a.m = a;
    }

    public void setPosition(ComSignReq.Position a) {
        a.g = a;
    }

    public void setRange(float a) {
        a.b = a;
    }

    public List<SealinfoAndPos> getSignatures() {
        AnchorPoint a;
        return a.M;
    }

    public void setSignatures(List<SealinfoAndPos> a) {
        a.M = a;
    }

    public float getRange() {
        AnchorPoint a;
        return a.b;
    }

    public ComSignReq.Position getPosition() {
        AnchorPoint a;
        return a.g;
    }
}


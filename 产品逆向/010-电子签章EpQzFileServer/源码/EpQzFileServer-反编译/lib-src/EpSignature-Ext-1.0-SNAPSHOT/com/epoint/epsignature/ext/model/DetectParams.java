/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.model;

import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import java.util.List;

public class DetectParams {
    private /* synthetic */ float i;
    private /* synthetic */ float J;
    private /* synthetic */ List<ComSignReq.Position> C;
    private /* synthetic */ String D;
    private /* synthetic */ String M;
    private /* synthetic */ float m;
    private /* synthetic */ String b;
    private /* synthetic */ int g;

    public String getKeyword() {
        DetectParams a;
        return a.D;
    }

    public float getRange() {
        DetectParams a;
        return a.i;
    }

    public void setY(float a) {
        a.J = a;
    }

    public String getSealtype() {
        DetectParams a;
        return a.M;
    }

    public List<ComSignReq.Position> getPositionLst() {
        DetectParams a;
        return a.C;
    }

    public void setPagenum(int a) {
        a.g = a;
    }

    public float getX() {
        DetectParams a;
        return a.m;
    }

    public void setRange(float a) {
        a.i = a;
    }

    public void setSealtype(String a) {
        a.M = a;
    }

    public void setKeyword(String a) {
        a.D = a;
    }

    public void setX(float a) {
        a.m = a;
    }

    public int getPagenum() {
        DetectParams a;
        return a.g;
    }

    public void setPositionLst(List<ComSignReq.Position> a) {
        a.C = a;
    }

    public float getY() {
        DetectParams a;
        return a.J;
    }

    public void setPagerange(String a) {
        a.b = a;
    }

    public String getPagerange() {
        DetectParams a;
        return a.b;
    }

    public DetectParams() {
        DetectParams a;
    }
}


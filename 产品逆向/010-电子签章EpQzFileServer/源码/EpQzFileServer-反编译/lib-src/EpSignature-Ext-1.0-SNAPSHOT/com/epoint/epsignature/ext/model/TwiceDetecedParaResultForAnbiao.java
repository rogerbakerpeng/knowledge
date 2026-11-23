/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.model;

import java.util.List;

public class TwiceDetecedParaResultForAnbiao {
    private /* synthetic */ List<PosOfKeywordInPara> M;
    private /* synthetic */ String m;
    private /* synthetic */ String b;
    private /* synthetic */ String g;

    public void setParakey(String a) {
        a.m = a;
    }

    public TwiceDetecedParaResultForAnbiao() {
        TwiceDetecedParaResultForAnbiao a;
    }

    public void setPos(List<PosOfKeywordInPara> a) {
        a.M = a;
    }

    public String getParakey() {
        TwiceDetecedParaResultForAnbiao a;
        return a.m;
    }

    public String getParano() {
        TwiceDetecedParaResultForAnbiao a;
        return a.g;
    }

    public List<PosOfKeywordInPara> getPos() {
        TwiceDetecedParaResultForAnbiao a;
        return a.M;
    }

    public void setSum(String a) {
        a.b = a;
    }

    public String getSum() {
        TwiceDetecedParaResultForAnbiao a;
        return a.b;
    }

    public void setParano(String a) {
        a.g = a;
    }

    public class PosOfKeywordInPara {
        private /* synthetic */ float D;
        private /* synthetic */ float M;
        private /* synthetic */ float m;
        private /* synthetic */ float g;

        public void setW(float a) {
            a.D = a;
        }

        public float getW() {
            PosOfKeywordInPara a;
            return a.D;
        }

        public float getY() {
            PosOfKeywordInPara a;
            return a.g;
        }

        public float getH() {
            PosOfKeywordInPara a;
            return a.M;
        }

        public void setH(float a) {
            a.M = a;
        }

        public float getX() {
            PosOfKeywordInPara a;
            return a.m;
        }

        public void setY(float a) {
            a.g = a;
        }

        public void setX(float a) {
            a.m = a;
        }

        public PosOfKeywordInPara() {
            PosOfKeywordInPara a2;
        }
    }
}


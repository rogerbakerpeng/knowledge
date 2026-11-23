/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.model;

import java.util.List;

public class TwiceDetecedParaResult {
    private /* synthetic */ List<PosOfKeyword> b;
    private /* synthetic */ String g;

    public void setParagraphno(String a) {
        a.g = a;
    }

    public List<PosOfKeyword> getPos() {
        TwiceDetecedParaResult a;
        return a.b;
    }

    public TwiceDetecedParaResult() {
        TwiceDetecedParaResult a;
    }

    public String getParagraphno() {
        TwiceDetecedParaResult a;
        return a.g;
    }

    public void setPos(List<PosOfKeyword> a) {
        a.b = a;
    }

    public class PosOfKeyword {
        private /* synthetic */ float M;
        private /* synthetic */ float m;
        private /* synthetic */ float b;
        private /* synthetic */ float g;

        public void setWidth(float a) {
            a.g = a;
        }

        public float getWidth() {
            PosOfKeyword a;
            return a.g;
        }

        public void setY(float a) {
            a.M = a;
        }

        public float getY() {
            PosOfKeyword a;
            return a.M;
        }

        public void setX(float a) {
            a.b = a;
        }

        public PosOfKeyword() {
            PosOfKeyword a2;
        }

        public void setHeight(float a) {
            a.m = a;
        }

        public float getX() {
            PosOfKeyword a;
            return a.b;
        }

        public float getHeight() {
            PosOfKeyword a;
            return a.m;
        }
    }
}


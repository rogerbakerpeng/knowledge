/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.annotation;

public class TransFormResult {
    private float[] boundingRectangle;
    private float[] rectangles;

    public TransFormResult(float[] a, float[] a2) {
        TransFormResult a3;
        TransFormResult transFormResult = a3;
        transFormResult.boundingRectangle = a;
        transFormResult.rectangles = a2;
    }

    public float[] getBoundingRectangle() {
        TransFormResult a;
        return a.boundingRectangle;
    }

    public void setBoundingRectangle(float[] a) {
        a.boundingRectangle = a;
    }

    public void setRectangles(float[] a) {
        a.rectangles = a;
    }

    public float[] getRectangles() {
        TransFormResult a;
        return a.rectangles;
    }
}


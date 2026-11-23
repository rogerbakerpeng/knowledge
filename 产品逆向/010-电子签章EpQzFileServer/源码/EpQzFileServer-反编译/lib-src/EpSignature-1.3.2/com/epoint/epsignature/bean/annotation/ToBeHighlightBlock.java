/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.annotation;

import java.util.Map;

public class ToBeHighlightBlock {
    private Map<String, Object> ext;
    private Integer pg;
    private String highLightID;
    private Point endPoint;
    private Point startPoint;

    public Point getStartPoint() {
        ToBeHighlightBlock a;
        return a.startPoint;
    }

    public void setEndPoint(Point a) {
        a.endPoint = a;
    }

    public void setStartPoint(Point a) {
        a.startPoint = a;
    }

    public String getHighLightID() {
        ToBeHighlightBlock a;
        return a.highLightID;
    }

    public Map<String, Object> getExt() {
        ToBeHighlightBlock a;
        return a.ext;
    }

    public void setExt(Map<String, Object> a) {
        a.ext = a;
    }

    public ToBeHighlightBlock() {
        ToBeHighlightBlock a;
    }

    public Integer getPg() {
        ToBeHighlightBlock a;
        return a.pg;
    }

    public Point getEndPoint() {
        ToBeHighlightBlock a;
        return a.endPoint;
    }

    public void setHighLightID(String a) {
        a.highLightID = a;
    }

    public void setPg(Integer a) {
        a.pg = a;
    }

    public static class Point {
        private float y;
        private float x;

        public float getX() {
            Point a;
            return a.x;
        }

        public void setX(float a) {
            a.x = a;
        }

        public void setY(float a) {
            a.y = a;
        }

        public Point() {
            Point a;
        }

        public float getY() {
            Point a;
            return a.y;
        }
    }
}


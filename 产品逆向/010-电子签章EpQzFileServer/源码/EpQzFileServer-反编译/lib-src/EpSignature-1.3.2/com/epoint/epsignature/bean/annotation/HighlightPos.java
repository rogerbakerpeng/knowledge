/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.annotation;

import java.util.Map;

public class HighlightPos {
    private float left;
    private float width;
    private float top;
    private Map<String, Object> ext;
    private String bgColor;
    private String highLightID;
    private Float height;
    private int pagenum;

    public void setPagenum(int a) {
        a.pagenum = a;
    }

    public float getHeight() {
        HighlightPos a;
        return a.height.floatValue();
    }

    public void setTop(float a) {
        a.top = a;
    }

    public void setWidth(float a) {
        a.width = a;
    }

    public void setExt(Map<String, Object> a) {
        a.ext = a;
    }

    public Map<String, Object> getExt() {
        HighlightPos a;
        return a.ext;
    }

    public int getPagenum() {
        HighlightPos a;
        return a.pagenum;
    }

    public HighlightPos() {
        HighlightPos a;
    }

    public float getLeft() {
        HighlightPos a;
        return a.left;
    }

    public float getWidth() {
        HighlightPos a;
        return a.width;
    }

    public String getBgColor() {
        HighlightPos a;
        return a.bgColor;
    }

    public float getTop() {
        HighlightPos a;
        return a.top;
    }

    public String getHighLightID() {
        HighlightPos a;
        return a.highLightID;
    }

    public void setBgColor(String a) {
        a.bgColor = a;
    }

    public void setHighLightID(String a) {
        a.highLightID = a;
    }

    public void setLeft(float a) {
        a.left = a;
    }

    public void setHeight(float a) {
        a.height = Float.valueOf(a);
    }

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 4 << 4 ^ (3 ^ 5) << 1;
        int cfr_ignored_0 = (3 ^ 5) << 4 ^ (2 ^ 5);
        int n4 = n2;
        int n5 = 5 << 4 ^ (2 << 2 ^ 3);
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
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign;

import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.CertInfo;

public class MatchItem {
    private Float x;
    private Float pageWidth;
    private Float pageHeight;
    private Integer pageNum;
    private Float y;
    private Float height;
    private String content;
    private Float width;

    public void setHeight(Float a) {
        a.height = a;
    }

    public void setPageWidth(Float a) {
        a.pageWidth = a;
    }

    public String toString() {
        MatchItem a;
        return new StringBuilder().insert(0, CertInfo.J("}dDfXLD`]%kuQbUKEh\r")).append(a.pageNum).append(BaseReq.J("_\u0012\u000b\u000f")).append(a.x).append(CertInfo.J(")\u0010|\r")).append(a.y).append(BaseReq.J("_\u0012\u0003S\u0014W$[\u0017F\u001b\u000f")).append(a.pageWidth).append(CertInfo.J("\u001c%@dW`x`YbXq\r")).append(a.pageHeight).append(BaseReq.J("_\u0012\u0010]\u001dF\u0016\\\u0007\u000f")).append(a.content).append(CertInfo.J("m")).toString();
    }

    public String getContent() {
        MatchItem a;
        return a.content;
    }

    public void setPageHeight(Float a) {
        a.pageHeight = a;
    }

    public Float getX() {
        MatchItem a;
        return a.x;
    }

    public MatchItem() {
        MatchItem a;
    }

    public void setPageNum(Integer a) {
        a.pageNum = a;
    }

    public Float getY() {
        MatchItem a;
        return a.y;
    }

    public void setY(Float a) {
        a.y = a;
    }

    public void setContent(String a) {
        a.content = a;
    }

    public void setWidth(Float a) {
        a.width = a;
    }

    public void setX(Float a) {
        a.x = a;
    }

    public Float getPageWidth() {
        MatchItem a;
        return a.pageWidth;
    }

    public Integer getPageNum() {
        MatchItem a;
        return a.pageNum;
    }

    public Float getPageHeight() {
        MatchItem a;
        return a.pageHeight;
    }

    public Float getHeight() {
        MatchItem a;
        return a.height;
    }

    public Float getWidth() {
        MatchItem a;
        return a.width;
    }
}


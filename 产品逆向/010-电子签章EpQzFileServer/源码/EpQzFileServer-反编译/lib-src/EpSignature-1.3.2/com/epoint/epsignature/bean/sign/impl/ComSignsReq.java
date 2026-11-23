/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign.impl;

import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.Image;
import com.epoint.itextpdf.text.Rectangle;
import java.util.ArrayList;
import java.util.List;

public class ComSignsReq
extends SignReq {
    private List<Sign> signs;

    public ComSignsReq() {
        ComSignsReq a;
    }

    public void setSigns(List<Sign> a) {
        a.signs = a;
    }

    public List<Sign> getSigns() {
        ComSignsReq a;
        return a.signs;
    }

    @Override
    public SignReq.PreaseResult parseSigns() throws Exception {
        ComSignsReq a;
        if (a.preaseresult == null) {
            ArrayList<SignInfo> arrayList = new ArrayList<SignInfo>();
            for (Sign sign : a.signs) {
                int n;
                String string = sign.getSignimg();
                if (string.split(DZYYZZReq.J("N")).length > 1) {
                    string = string.split(BaseReq.J("\u001e"))[1];
                }
                Image image = Image.getInstance(Base64Util.decode(string));
                Sign sign2 = sign;
                float f = sign2.imgwidth;
                float f2 = sign2.imgheight;
                if (f <= 0.0f || f2 <= 0.0f) {
                    Image image2 = image;
                    f = image2.getWidth();
                    f2 = image2.getHeight();
                }
                Position[] positionArray = sign.getPositions();
                int n2 = positionArray.length;
                int n3 = n = 0;
                while (n3 < n2) {
                    Position position = positionArray[n];
                    String string2 = SignUtil.getSignName();
                    Position position2 = position;
                    float f3 = position2.getX();
                    float f4 = position2.getY();
                    Rectangle rectangle = a.fixRect(f3, f4, f, f2, position.getPage());
                    arrayList.add(new SignInfo(rectangle, position.getPage(), f3, f4, string, image, string2, sign.imgwidth, sign.imgheight));
                    n3 = ++n;
                }
            }
            a.preaseresult = a.new SignReq.PreaseResult(arrayList);
        }
        return a.preaseresult;
    }

    public static class Position {
        private float x;
        private int page;
        private float y;
        private String name;

        public float getY() {
            Position a;
            return a.y;
        }

        public float getX() {
            Position a;
            return a.x;
        }

        public void setName(String a) {
            a.name = a;
        }

        public void setX(float a) {
            a.x = a;
        }

        public Position() {
            Position a;
        }

        public void setPage(int a) {
            a.page = a;
        }

        public void setY(float a) {
            a.y = a;
        }

        public String getName() {
            Position a;
            return a.name;
        }

        public int getPage() {
            Position a;
            return a.page;
        }
    }

    public static class Sign {
        private String deleteMode;
        private Position[] positions;
        private String signimg;
        private float imgwidth;
        private float imgheight;

        public Sign() {
            Sign a;
        }

        public void setImgheight(float a) {
            a.imgheight = a;
        }

        public void setImgwidth(float a) {
            a.imgwidth = a;
        }

        public float getImgwidth() {
            Sign a;
            return a.imgwidth;
        }

        public void setDeleteMode(String a) {
            a.deleteMode = a;
        }

        public void setSignimg(String a) {
            a.signimg = a;
        }

        public float getImgheight() {
            Sign a;
            return a.imgheight;
        }

        public String getSignimg() {
            Sign a;
            return a.signimg;
        }

        public Position[] getPositions() {
            Sign a;
            return a.positions;
        }

        public void setPositions(Position[] a) {
            a.positions = a;
        }

        public String getDeleteMode() {
            Sign a;
            return a.deleteMode;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign.impl;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.Image;
import com.epoint.itextpdf.text.Rectangle;
import java.util.ArrayList;

public class ComSignReq
extends SignReq {
    private Sign sign;

    @Override
    public SignReq.PreaseResult parseSigns() throws Exception {
        ComSignReq a;
        if (a.preaseresult == null) {
            int n;
            Position[] positionArray;
            Object object;
            if (a.sign.getPositions().length > 0) {
                ComSignReq comSignReq = a;
                int n2 = comSignReq.reader.getNumberOfPages();
                object = comSignReq.sign.getPositions()[0];
                if (((Position)object).page == -1) {
                    int n3;
                    positionArray = new Position[n2];
                    int n4 = n3 = 0;
                    while (n4 < n2) {
                        Position position = new Position();
                        int n5 = n3;
                        Position position2 = position;
                        position.setPage(n3 + 1);
                        position2.setX(((Position)object).getX());
                        position2.setY(((Position)object).getY());
                        positionArray[n5] = position;
                        n4 = ++n3;
                    }
                    Sign.access$102(a.sign, positionArray);
                }
                if (((Position)object).page == -2) {
                    ((Position)object).page = n2;
                    a.sign.getPositions()[0] = object;
                }
            }
            ArrayList<SignInfo> arrayList = new ArrayList<SignInfo>();
            object = a.sign.getSignimg();
            if (((String)object).split(ExEpSignException.J("\u000e")).length > 1) {
                object = ((String)object).split(GetMessageResponse.J("Q"))[1];
            }
            positionArray = Image.getInstance(Base64Util.decode((String)object));
            float f = positionArray.getWidth();
            float f2 = positionArray.getHeight();
            Position[] positionArray2 = a.sign.getPositions();
            int n6 = positionArray2.length;
            int n7 = n = 0;
            while (n7 < n6) {
                Position position = positionArray2[n];
                String string = SignUtil.getSignName();
                Position position3 = position;
                float f3 = position3.getX();
                float f4 = position3.getY();
                Rectangle rectangle = a.fixRect(f3, f4, f, f2, position.getPage());
                arrayList.add(new SignInfo(rectangle, position.getPage(), f3, f4, (String)object, (Image)positionArray, string));
                n7 = ++n;
            }
            a.preaseresult = a.new SignReq.PreaseResult(arrayList);
        }
        return a.preaseresult;
    }

    public void setSign(Sign a) {
        a.sign = a;
    }

    public Sign getSign() {
        ComSignReq a;
        return a.sign;
    }

    public ComSignReq() {
        ComSignReq a;
    }

    public static class Position {
        private float y;
        private String name;
        private float x;
        private int page;

        public float getY() {
            Position a;
            return a.y;
        }

        public void setPage(int a) {
            a.page = a;
        }

        public void setName(String a) {
            a.name = a;
        }

        public int getPage() {
            Position a;
            return a.page;
        }

        public float getX() {
            Position a;
            return a.x;
        }

        public void setX(float a) {
            a.x = a;
        }

        public void setY(float a) {
            a.y = a;
        }

        public String getName() {
            Position a;
            return a.name;
        }

        public Position() {
            Position a;
        }
    }

    public static class Sign {
        private String signimg;
        private Position[] positions;
        private String deleteMode;

        public Sign() {
            Sign a;
        }

        public String getSignimg() {
            Sign a;
            return a.signimg;
        }

        public void setSignimg(String a) {
            a.signimg = a;
        }

        public void setDeleteMode(String a) {
            a.deleteMode = a;
        }

        public void setPositions(Position[] a) {
            a.positions = a;
        }

        public Position[] getPositions() {
            Sign a;
            return a.positions;
        }

        static /* synthetic */ Position[] access$102(Sign a, Position[] a2) {
            a.positions = a2;
            return a2;
        }

        public String getDeleteMode() {
            Sign a;
            return a.deleteMode;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign.impl;

import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.Image;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.lang.reflect.Method;
import java.util.ArrayList;
import org.apache.log4j.Logger;

public class MultiPageSignReq
extends SignReq {
    private static Logger log = Logger.getLogger(MultiPageSignReq.class);
    private Sign sign;
    private static final String SET_REF_METH_NAME = "set_ref";

    public Sign getSign() {
        MultiPageSignReq a;
        return a.sign;
    }

    public void setSign(Sign a) {
        a.sign = a;
    }

    private /* synthetic */ Position changeXY(int a5, PdfReader a2, int a3, Position a4) {
        int n;
        PdfReader pdfReader = a2;
        Rectangle rectangle = pdfReader.getPageSize(a5);
        Rectangle rectangle2 = pdfReader.getPageSize(a3);
        if (pdfReader.getPageN(a5).getAsNumber(PdfName.ROTATE) != null) {
            n = ((PdfReader)a2).getPageN(a5).getAsNumber(PdfName.ROTATE).intValue();
            int n2 = n = (n %= 360) < 0 ? n + 360 : n;
            if (n != 180 && n != 0) {
                rectangle = ((PdfReader)a2).getPageSize(a5).rotate();
            }
        }
        if (((PdfReader)a2).getPageN(a3).getAsNumber(PdfName.ROTATE) != null) {
            n = ((PdfReader)a2).getPageN(a3).getAsNumber(PdfName.ROTATE).intValue();
            int n3 = n = (n %= 360) < 0 ? n + 360 : n;
            if (n != 180 && n != 0) {
                rectangle2 = ((PdfReader)a2).getPageSize(a3).rotate();
            }
        }
        Rectangle rectangle3 = rectangle;
        float f = rectangle3.getWidth() / rectangle2.getWidth() * a4.getX();
        float a5 = rectangle3.getHeight() / rectangle2.getHeight() * a4.getY();
        Object object = a2 = new Position();
        ((Position)object).setX(f);
        ((Position)object).setY(a5);
        return object;
    }

    public MultiPageSignReq() {
        MultiPageSignReq a;
    }

    private static /* synthetic */ void invokeSetRef(SignInfo a, SignInfo a2) {
        try {
            Class<?> clazz = a.getClass();
            Class[] classArray = new Class[1];
            classArray[0] = SignInfo.class;
            Object[] objectArray = new Object[1];
            objectArray[0] = a2;
            clazz.getDeclaredMethod(SET_REF_METH_NAME, classArray).invoke(a, objectArray);
            return;
        }
        catch (Exception exception) {
            Object[] objectArray = new Object[1];
            objectArray[0] = exception.getMessage();
            log.error(String.format(JSONUtils.J("\u53c0\u5c0f\u83ba\u53dd\u5f18\u7523\u5bf4\u8c6a\u593c\u8d2e7.~"), objectArray), exception);
            return;
        }
    }

    /*
     * Unable to fully structure code
     */
    @Override
    public SignReq.PreaseResult parseSigns() throws Exception {
        block4: {
            if (a.preaseresult != null) break block4;
            var1_1 = new ArrayList<SignInfo>();
            var2_2 = a.sign.getSignimg();
            if (var2_2.split(GetMessageResponse.J("Q")).length > 1) {
                var2_2 = var2_2.split(JSONUtils.J("!"))[1];
            }
            v0 = var3_3 = Image.getInstance(Base64Util.decode(var2_2));
            var4_4 = v0.getWidth();
            var5_5 = v0.getHeight();
            var6_6 = a.sign.getPosition();
            var7_7 = a.sign.getSignpagenum();
            v1 = var6_6;
            var8_8 = v1.getX();
            var8_8 = v1.getY();
            var8_9 = MultiPageSignReq.hasSetRefMeth();
            var9_10 = null;
            var10_11 = v1.getPages();
            var11_12 = var10_11.length;
            v2 = var12_13 = 0;
            while (v2 < var11_12) {
                var13_15 = var10_11[var12_13];
                v3 = a;
                v4 = v3.changeXY(var13_15, v3.reader, var7_7, var6_6);
                var14_16 = v4.getX();
                var15_17 = v4.getY();
                var16_18 = v3.fixRect(var14_16, var15_17, var4_4, var5_5, var13_15);
                var17_19 = SignUtil.getSignName();
                var13_14 = new SignInfo(var16_18, var13_15, var14_16, var15_17, var2_2, var3_3, var17_19);
                if (!var8_9) ** GOTO lbl34
                if (var9_10 == null) {
                    var9_10 = var13_14;
                    v5 = var1_1;
                } else {
                    MultiPageSignReq.invokeSetRef(var13_14, var9_10);
lbl34:
                    // 2 sources

                    v5 = var1_1;
                }
                v5.add(var13_14);
                v2 = ++var12_13;
            }
            a.preaseresult = a.new SignReq.PreaseResult(var1_1);
        }
        return a.preaseresult;
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    private static /* synthetic */ boolean hasSetRefMeth() {
        boolean bl = false;
        try {
            Class<SignInfo> clazz = SignInfo.class;
            Method[] methodArray = SignInfo.class.getMethods();
            int n = methodArray.length;
            int n2 = 0;
            while (n2 < n) {
                Method method = methodArray[n2];
                if (SET_REF_METH_NAME.equals(method.getName())) {
                    return true;
                }
                ++n2;
            }
            return bl;
        }
        catch (Exception exception) {
            Object[] objectArray = new Object[1];
            objectArray[0] = exception.getMessage();
            log.error(String.format(GetMessageResponse.J("\u5259\u65e8\u6652\u5463\u5b25\u576d\u5f68\u756d\u5b84\u8c24\u65c4\u6c90\u594c\u8d60G`\u000e"), objectArray), exception);
        }
        return bl;
    }

    public static class Position {
        private float x;
        private float y;
        private int[] pages;

        public void setY(float a) {
            a.y = a;
        }

        public void setX(float a) {
            a.x = a;
        }

        public void setPages(int[] a) {
            a.pages = a;
        }

        public int[] getPages() {
            Position a;
            return a.pages;
        }

        public float getY() {
            Position a;
            return a.y;
        }

        public Position() {
            Position a;
        }

        public float getX() {
            Position a;
            return a.x;
        }
    }

    public static class Sign {
        private Position position;
        private String signimg;
        private int signpagenum;

        public void setSignpagenum(int a) {
            a.signpagenum = a;
        }

        public Position getPosition() {
            Sign a;
            return a.position;
        }

        public void setPosition(Position a) {
            a.position = a;
        }

        public String getSignimg() {
            Sign a;
            return a.signimg;
        }

        public int getSignpagenum() {
            Sign a;
            return a.signpagenum;
        }

        public void setSignimg(String a) {
            a.signimg = a;
        }

        public Sign() {
            Sign a;
        }
    }
}


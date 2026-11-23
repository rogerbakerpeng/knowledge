/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign.impl;

import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.utils.EpFileServerUtil;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.BadElementException;
import com.epoint.itextpdf.text.Image;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfName;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import javax.imageio.ImageIO;

public class CrossPageReq
extends SignReq {
    private Sign sign;

    public CrossPageReq() {
        CrossPageReq a;
    }

    public Sign getSign() {
        CrossPageReq a;
        return a.sign;
    }

    public void setSign(Sign a) {
        a.sign = a;
    }

    @Override
    public SignReq.PreaseResult parseSigns() throws Exception {
        CrossPageReq a;
        if (a.preaseresult == null) {
            float f;
            float f2;
            float f3;
            float f4;
            float f5;
            String string;
            Object object;
            Object object2;
            Object object3;
            int n;
            int n2;
            ArrayList<SignInfo> arrayList = new ArrayList<SignInfo>();
            CrossPageReq crossPageReq = a;
            String string2 = crossPageReq.sign.getSignimg();
            float f6 = crossPageReq.sign.getPercent();
            if (string2.split(BaseReq.J("\u001e")).length > 1) {
                string2 = string2.split(EpFileServerUtil.J("t"))[1];
            }
            int n3 = a.reader.getNumberOfPages();
            int n4 = 10;
            BufferedImage[] bufferedImageArray = CrossPageReq.subImages(string2, n4);
            int n5 = n3 / n4;
            n3 -= n5 * n4;
            int n6 = n2 = 0;
            while (n6 < n5) {
                int n7 = n = 0;
                while (n7 < n4) {
                    int n8 = n2 * n4 + n + 1;
                    CrossPageReq crossPageReq2 = a;
                    object3 = crossPageReq2.reader.getPageSize(n8);
                    object2 = new ByteArrayOutputStream();
                    ImageIO.write((RenderedImage)bufferedImageArray[n], BaseReq.J("B\u001dU"), (OutputStream)object2);
                    ByteArrayOutputStream byteArrayOutputStream = object2;
                    object = Image.getInstance(byteArrayOutputStream.toByteArray());
                    string = Base64Util.encode(byteArrayOutputStream.toByteArray());
                    String string3 = SignUtil.getSignName();
                    f5 = (float)bufferedImageArray[n].getWidth() * 0.8f;
                    f4 = (float)bufferedImageArray[n].getHeight() * 0.8f;
                    f3 = ((Rectangle)object3).getWidth() - f5 / 2.0f;
                    f2 = ((Rectangle)object3).getHeight() * f6;
                    if (crossPageReq2.reader.getPageN(n8).getAsNumber(PdfName.ROTATE) != null) {
                        int n9 = a.reader.getPageN(n8).getAsNumber(PdfName.ROTATE).intValue();
                        int n10 = n9 = (n9 %= 360) < 0 ? n9 + 360 : n9;
                        if (n9 != 180 && n9 != 0) {
                            object3 = a.reader.getPageSize(n8).rotate();
                            f3 = ((Rectangle)object3).getWidth() - f5 / 2.0f;
                            f2 = ((Rectangle)object3).getHeight() * f6;
                        }
                    }
                    f = f3;
                    float f7 = ((Rectangle)object3).getHeight() - f2;
                    Object object4 = new Rectangle(f - f5 / 2.0f - 2.0f, f7 - f4 / 2.0f - 2.0f, f + f5 / 2.0f + 2.0f, f7 + f4 / 2.0f + 2.0f);
                    object4 = new SignInfo((Rectangle)object4, n8, f3, f2, string, (Image)object, string3);
                    arrayList.add((SignInfo)object4);
                    n7 = ++n;
                }
                n6 = ++n2;
            }
            if (n3 > 0) {
                bufferedImageArray = CrossPageReq.subImages(string2, n3);
                int n11 = n2 = 0;
                while (n11 < n3) {
                    n = n5 * n4 + n2 + 1;
                    CrossPageReq crossPageReq3 = a;
                    Rectangle rectangle = crossPageReq3.reader.getPageSize(n);
                    object3 = new ByteArrayOutputStream();
                    ImageIO.write((RenderedImage)bufferedImageArray[n2], EpFileServerUtil.J("(??"), (OutputStream)object3);
                    Object object5 = object3;
                    object2 = Image.getInstance(((ByteArrayOutputStream)object5).toByteArray());
                    object = Base64Util.encode(((ByteArrayOutputStream)object5).toByteArray());
                    string = SignUtil.getSignName();
                    float f8 = (float)bufferedImageArray[n2].getWidth() * 0.8f;
                    f5 = (float)bufferedImageArray[n2].getHeight() * 0.8f;
                    f4 = rectangle.getWidth() - f8 / 2.0f;
                    f3 = rectangle.getHeight() * f6;
                    if (crossPageReq3.reader.getPageN(n).getAsNumber(PdfName.ROTATE) != null) {
                        int n12 = a.reader.getPageN(n).getAsNumber(PdfName.ROTATE).intValue();
                        int n13 = n12 = (n12 %= 360) < 0 ? n12 + 360 : n12;
                        if (n12 != 180 && n12 != 0) {
                            rectangle = a.reader.getPageSize(n).rotate();
                            f4 = rectangle.getWidth() - f8 / 2.0f;
                            f3 = rectangle.getHeight() * f6;
                        }
                    }
                    f2 = f4;
                    f = rectangle.getHeight() - f3;
                    Rectangle rectangle2 = new Rectangle(f2 - f8 / 2.0f - 2.0f, f - f5 / 2.0f - 2.0f, f2 + f8 / 2.0f + 2.0f, f + f5 / 2.0f + 2.0f);
                    arrayList.add(new SignInfo(rectangle2, n, f4, f3, (String)object, (Image)object2, string));
                    n11 = ++n2;
                }
            }
            a.preaseresult = a.new SignReq.PreaseResult(arrayList);
        }
        return a.preaseresult;
    }

    public static BufferedImage[] subImages(String a, int a2) throws IOException, BadElementException {
        int n;
        Object object = new ByteArrayInputStream(Base64Util.decode(a));
        BufferedImage[] bufferedImageArray = new BufferedImage[a2];
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        object = ImageIO.read((InputStream)object);
        int n2 = ((BufferedImage)object).getHeight();
        int n3 = ((BufferedImage)object).getWidth();
        int n4 = n3 / a2;
        int n5 = n = 0;
        while (n5 < a2) {
            BufferedImage bufferedImage;
            ImageIO.write((RenderedImage)(n == a2 - 1 ? ((BufferedImage)object).getSubimage(n * n4, 0, n3 - n * n4, n2) : ((BufferedImage)object).getSubimage(n * n4, 0, n4, n2)), BaseReq.J("B\u001dU"), byteArrayOutputStream);
            ByteArrayOutputStream byteArrayOutputStream2 = byteArrayOutputStream;
            bufferedImageArray[n++] = bufferedImage;
            byteArrayOutputStream2.flush();
            byteArrayOutputStream2.reset();
            n5 = n;
        }
        return bufferedImageArray;
    }

    public static class Sign {
        private String signimg;
        private int[] pages;
        private float percent;

        public void setPages(int[] a) {
            a.pages = a;
        }

        public String getSignimg() {
            Sign a;
            return a.signimg;
        }

        public void setSignimg(String a) {
            a.signimg = a;
        }

        public int[] getPages() {
            Sign a;
            return a.pages;
        }

        public float getPercent() {
            Sign a;
            return a.percent;
        }

        public Sign() {
            Sign a;
        }

        public void setPercent(float a) {
            a.percent = a;
        }
    }
}


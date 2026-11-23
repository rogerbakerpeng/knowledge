/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.epsignature.utils.PDFMergeUtil;
import com.epoint.epsignature.utils.TZGMVerifyPdf;
import com.epoint.gm.util.Base64Util;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import org.apache.log4j.Logger;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

public class ImageMergeUtil {
    private static final Logger logger = Logger.getLogger(ImageMergeUtil.class);

    /*
     * Enabled aggressive block sorting
     */
    public static byte[] CommonMerge(byte[] a, List<String> a2, String a3) throws Exception {
        int n;
        byte[] byArray;
        block12: {
            byArray = null;
            int n2 = -1;
            switch (a3.hashCode()) {
                case 57: {
                    if (!a3.equals(GetMessageResponse.J("D"))) break;
                    n = n2 = 0;
                    break block12;
                }
                case 1637: {
                    if (!a3.equals(TZGMVerifyPdf.J("W("))) break;
                    n = n2 = 1;
                    break block12;
                }
                case 1606: {
                    if (!a3.equals(GetMessageResponse.J("wE"))) break;
                    n = n2 = 2;
                    break block12;
                }
                case 1824: {
                    if (!a3.equals(TZGMVerifyPdf.J("])"))) break;
                    n2 = 3;
                }
            }
            n = n2;
        }
        switch (n) {
            case 0: {
                return ImageMergeUtil.J(a, a2);
            }
            case 1: {
                return ImageMergeUtil.J(a, a2);
            }
            case 2: {
                return byArray;
            }
            case 3: {
                return EpSignatureApi.WXMerge(a, a2);
            }
        }
        return byArray;
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static byte[] changeTransparent(byte[] a, int a2) {
        byte[] byArray = null;
        if (a2 < 0) {
            a2 = 0;
        } else if (a2 > 10) {
            a2 = 10;
        }
        try {
            int n;
            BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(a));
            int n2 = bufferedImage.getWidth();
            int n3 = bufferedImage.getHeight();
            BufferedImage bufferedImage2 = new BufferedImage(n2, n3, 2);
            Graphics2D graphics2D = bufferedImage2.createGraphics();
            bufferedImage2 = graphics2D.getDeviceConfiguration().createCompatibleImage(n2, n3, 3);
            graphics2D.dispose();
            BufferedImage bufferedImage3 = bufferedImage2;
            graphics2D = bufferedImage3.createGraphics();
            int n4 = n = bufferedImage3.getMinY();
            while (n4 < bufferedImage2.getHeight()) {
                int n5 = bufferedImage2.getMinX();
                while (n5 < bufferedImage2.getWidth()) {
                    int n6;
                    BufferedImage bufferedImage4 = bufferedImage2;
                    int n7 = bufferedImage4.getRGB(n6, n);
                    n7 = a2 * 255 / 10 << 24 | n7 & 0xFFFFFF;
                    bufferedImage4.setRGB(n6++, n, n7);
                    n5 = n6;
                }
                n4 = ++n;
            }
            graphics2D.setComposite(AlphaComposite.SrcIn);
            graphics2D.drawImage(bufferedImage, 0, 0, n2, n3, null);
            graphics2D.dispose();
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ImageIO.write((RenderedImage)bufferedImage2, GetMessageResponse.J("\r+\u001a"), byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        }
        catch (IOException iOException) {
            logger.error(TZGMVerifyPdf.J("\u56ee\u7223\u901f\u666a\u5306\u5955\u8d35"), iOException);
            return byArray;
        }
    }

    public static byte[] deTransprent(byte[] a) {
        int n;
        int n2;
        Graphics2D graphics2D;
        BufferedImage bufferedImage;
        Object object;
        byte[] byArray = null;
        Object object2 = GetMessageResponse.J("\u001a,\u001b");
        try {
            object = object2 = ImageIO.read(new ByteArrayInputStream(a));
            object = new ImageIcon((Image)object);
            bufferedImage = new BufferedImage(((ImageIcon)object).getIconWidth(), ((ImageIcon)object).getIconHeight(), 6);
            graphics2D = (Graphics2D)bufferedImage.getGraphics();
            graphics2D.drawImage(((ImageIcon)object).getImage(), 0, 0, ((ImageIcon)object).getImageObserver());
            int n3 = 0;
            n2 = bufferedImage.getMinY();
            n = n2;
            while (n < bufferedImage.getHeight()) {
                int n4 = bufferedImage.getMinX();
                while (n4 < bufferedImage.getWidth()) {
                    int n5;
                    int n6 = bufferedImage.getRGB(n5, n2);
                    int n7 = (n6 & 0xFF0000) >> 16;
                    int n8 = (n6 & 0xFF00) >> 8;
                    int n9 = n6 & 0xFF;
                    if (255 - n7 < 30 && 255 - n8 < 30 && 255 - n9 < 30) {
                        n6 = n3 + 1 << 24 | n6 & 0xFFFFFF;
                    }
                    bufferedImage.setRGB(n5++, n2, n6);
                    n4 = n5;
                }
            }
        }
        catch (Exception exception) {
            logger.error(GetMessageResponse.J("\u53c6\u63cc\u001a,\u001b\u6879\u5f72\u56bb\u723a\u8089\u6612\u5974\u8d58"), exception);
            return byArray;
        }
        {
            n = ++n2;
            continue;
        }
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        graphics2D.drawImage((Image)bufferedImage, 0, 0, ((ImageIcon)object).getImageObserver());
        ImageIO.write((RenderedImage)bufferedImage, TZGMVerifyPdf.J("w\rv"), byteArrayOutputStream);
        byArray = byteArrayOutputStream.toByteArray();
        byteArrayOutputStream.close();
        return byArray;
    }

    private static /* synthetic */ byte[] J(byte[] a, String a2, String a3, String a4, String a5, String a6) throws Exception {
        ComSignReq comSignReq;
        PdfReader pdfReader = new PdfReader(a);
        ComSignReq comSignReq2 = new ComSignReq();
        ComSignReq.Sign sign = new ComSignReq.Sign();
        sign.setSignimg((String)a6);
        ComSignReq.Position[] positionArray = new ComSignReq.Position[1];
        ComSignReq.Position position = new ComSignReq.Position();
        float f = 0.0f;
        float f2 = 0.0f;
        float f3 = 0.0f;
        float f4 = 0.0f;
        float f5 = 0.0f;
        float f6 = 0.0f;
        float f7 = 0.0f;
        PdfReader pdfReader2 = pdfReader;
        Rectangle rectangle = pdfReader2.getPageSize(Integer.parseInt((String)a2));
        a6 = com.epoint.itextpdf.text.Image.getInstance(Base64Util.decode((String)a6));
        if (pdfReader2.getPageN(Integer.parseInt((String)a2)).getAsNumber(PdfName.ROTATE) != null) {
            int n = pdfReader.getPageN(Integer.parseInt((String)a2)).getAsNumber(PdfName.ROTATE).intValue();
            int n2 = n = (n %= 360) < 0 ? n + 360 : n;
            if (n != 180 && n != 0) {
                f = Float.parseFloat(a4);
                f2 = rectangle.getWidth() - Float.parseFloat(a3);
                f3 = rectangle.getWidth();
                f4 = ((Rectangle)a6).getHeight();
                f5 = ((Rectangle)a6).getWidth();
                f6 = f + 3.0f * f4 / 8.0f;
                f7 = f3 - f2 + 3.0f * f5 / 8.0f;
            } else {
                f = Float.parseFloat(a3);
                f2 = Float.parseFloat(a4);
                f3 = rectangle.getHeight();
                f4 = ((Rectangle)a6).getWidth();
                f5 = ((Rectangle)a6).getHeight();
                f6 = f + 3.0f * f4 / 8.0f;
                f7 = f3 - f2 - 3.0f * f5 / 8.0f;
            }
        } else {
            f = Float.parseFloat(a3);
            f2 = Float.parseFloat(a4);
            f3 = rectangle.getHeight();
            f4 = ((Rectangle)a6).getWidth();
            f5 = ((Rectangle)a6).getHeight();
            f6 = f + 3.0f * f4 / 8.0f;
            f7 = f3 - f2 - 3.0f * f5 / 8.0f;
        }
        ComSignReq.Position position2 = position;
        position.setName(a5);
        position2.setPage(Integer.parseInt((String)a2));
        position2.setX(f6);
        position.setY(f7);
        ComSignReq comSignReq3 = comSignReq2;
        positionArray[0] = position;
        sign.setPositions(positionArray);
        comSignReq3.setSign(sign);
        ComSignReq comSignReq4 = comSignReq = comSignReq3;
        comSignReq4.setReader(new PdfReader(a));
        a2 = ((SignReq)comSignReq4).parseSigns().getSignList();
        a = PDFMergeUtil.imageMerge(a, (List<SignInfo>)a2);
        return a;
    }

    public ImageMergeUtil() {
        ImageMergeUtil a;
    }

    private static /* synthetic */ byte[] J(byte[] a, List<String> a2) {
        a2 = a2.iterator();
        while (a2.hasNext()) {
            String string;
            String string2;
            String string3;
            String string4;
            String string5;
            String string6;
            Element element;
            block4: {
                String string7 = (String)a2.next();
                string7 = Base64Util.decode2string(string7);
                element = DocumentHelper.parseText(string7).getRootElement();
                string6 = element.elementTextTrim(TZGMVerifyPdf.J("\u0017u\u0005|\t\u007f\u0000u"));
                if (!"1".equals(string6)) break block4;
                Element element2 = element;
                string5 = element2.elementTextTrim(GetMessageResponse.J("\u000e1\u001c7\t5\u001c\"\u0018"));
                string4 = element2.elementTextTrim(TZGMVerifyPdf.J("\u0017u\u0005|\u001c`\u000bc"));
                string3 = element2.elementTextTrim(GetMessageResponse.J("6\u0018$\u0011<\r*\u000e"));
                string2 = element2.elementTextTrim(TZGMVerifyPdf.J("\u0017u\u0005|\nq\tu"));
                string = element2.elementTextTrim(GetMessageResponse.J("'\u000esI6\u0018$\u0011!\u001c1\u001c"));
                a = ImageMergeUtil.J(a, string5, string4, string3, string2, string);
            }
            try {
                if (!TZGMVerifyPdf.J("#").equals(string6)) continue;
                Element element3 = element;
                string5 = Base64Util.decode2string(element3.elementTextTrim(GetMessageResponse.J("\u000e \u001c)\r$\u001a \u000e"))).replace(TZGMVerifyPdf.J("l"), "");
                string4 = Base64Util.decode2string(element3.elementTextTrim(GetMessageResponse.J("6\u0018$\u0011=\r*\u000e \u000e"))).replace(TZGMVerifyPdf.J("l"), "");
                string3 = Base64Util.decode2string(element3.elementTextTrim(GetMessageResponse.J("6\u0018$\u0011<\r*\u000e \u000e"))).replace(TZGMVerifyPdf.J("l"), "");
                string2 = Base64Util.decode2string(element3.elementTextTrim(GetMessageResponse.J("6\u0018$\u0011+\u001c(\u0018")));
                string = element3.elementTextTrim(TZGMVerifyPdf.J("\u0006cR$\u0017u\u0005|\u0000q\u0010q"));
                a = ImageMergeUtil.J(a, string5, string4, string3, string2, string);
            }
            catch (Exception exception) {
                logger.error(GetMessageResponse.J("\u7fa9\u661a\u5475\u5e33\u594c\u8d60\u307f"), exception);
            }
        }
        return a;
    }
}


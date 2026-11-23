/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.bean.sign.MatchItem;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.bean.sign.impl.KeyFindUtil;
import com.epoint.epsignature.license.app.util.RequiresAuthorization;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.Image;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.cert.Certificate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import org.apache.log4j.Logger;

public class ServerSignUtil {
    private static Logger logger = Logger.getLogger(ServerSignUtil.class);
    private static final float TRANS_SCALE = 0.8f;

    private static /* synthetic */ SignInfo J(PdfReader a, int a2, float a3, float a4, MatchItem a5) {
        PdfReader pdfReader = a;
        Rectangle rectangle = pdfReader.getPageSize(a2);
        float f = 0.0f;
        float f2 = 0.0f;
        float f3 = 0.0f;
        float f4 = 0.0f;
        float f5 = 0.0f;
        float f6 = 0.0f;
        float f7 = 0.0f;
        Rectangle rectangle2 = null;
        if (pdfReader.getPageN(a2).getAsNumber(PdfName.ROTATE) != null) {
            int n = a.getPageN(a2).getAsNumber(PdfName.ROTATE).intValue();
            int n2 = n = (n %= 360) < 0 ? n + 360 : n;
            if (n != 180 && n != 0) {
                MatchItem matchItem = a5;
                f = matchItem.getY().floatValue();
                f2 = rectangle.getWidth() - a5.getX().floatValue();
                f3 = rectangle.getWidth();
                f4 = matchItem.getHeight().floatValue();
                f5 = matchItem.getWidth().floatValue();
                f6 = f + 3.0f * f4 / 4.0f;
                f7 = f3 - f2 + 3.0f * f5 / 4.0f;
                rectangle2 = new Rectangle(f + 3.0f * f4 / 4.0f - a3 / 2.0f, f2 + 3.0f * f5 / 4.0f - a4 / 2.0f, f + 3.0f * f4 / 4.0f + a3 / 2.0f, f2 + 3.0f * f5 / 4.0f + a4 / 2.0f);
            } else {
                MatchItem matchItem = a5;
                f = matchItem.getX().floatValue();
                f2 = matchItem.getY().floatValue();
                f3 = rectangle.getHeight();
                f4 = matchItem.getWidth().floatValue();
                f5 = a5.getHeight().floatValue();
                f6 = f + f4 / 2.0f;
                f7 = f3 - f2 + f5 / 2.0f;
                rectangle2 = new Rectangle(f + f4 / 2.0f - a3 / 2.0f, f2 + f5 / 2.0f - a4 / 2.0f, f + f4 / 2.0f + a3 / 2.0f, f2 + f5 / 2.0f + a4 / 2.0f);
            }
        } else {
            MatchItem matchItem = a5;
            f = matchItem.getX().floatValue();
            f2 = matchItem.getY().floatValue();
            f3 = rectangle.getHeight();
            f4 = matchItem.getWidth().floatValue();
            f5 = a5.getHeight().floatValue();
            f6 = f + f4 / 2.0f;
            f7 = f3 - f2 + f5 / 2.0f;
            rectangle2 = new Rectangle(f + f4 / 2.0f - a3 / 2.0f, f2 + f5 / 2.0f - a4 / 2.0f, f + f4 / 2.0f + a3 / 2.0f, f2 + f5 / 2.0f + a4 / 2.0f);
        }
        return new SignInfo(rectangle2, a2, f6, f7, null, null, SignUtil.getSignName());
    }

    public ServerSignUtil() {
        ServerSignUtil a;
    }

    @RequiresAuthorization
    public static byte[] WebPDFSign(InputStream a, Map<String, String> a2) {
        Object object = a2.get(PDFHighlightAnnotationReq.J("ydjoh~l;="));
        Certificate[] certificateArray = a2.get(VerifyReq.J("\u0017]\u001fY\u0006H\u0002\rS"));
        Object object2 = a2.get(PDFHighlightAnnotationReq.J("ybzRq"));
        String string = a2.get(VerifyReq.J("\u0017T\u0014d\u001e"));
        String string2 = a2.get(PDFHighlightAnnotationReq.J("ybzRylnhgxd"));
        a2 = a2.get(VerifyReq.J("\u0004^\u0015O\u0017L\u0003"));
        try {
            KeyStore keyStore = KeyStore.getInstance(PDFHighlightAnnotationReq.J("]BNZ<;"));
            a2 = ((String)a2).toCharArray();
            certificateArray = new ByteArrayInputStream(Base64Util.decode((String)certificateArray));
            KeyStore keyStore2 = keyStore;
            keyStore2.load((InputStream)certificateArray, (char[])a2);
            certificateArray = keyStore2.aliases().nextElement();
            a2 = (PrivateKey)keyStore.getKey((String)certificateArray, (char[])a2);
            certificateArray = keyStore.getCertificateChain((String)certificateArray);
            object = Image.getInstance(Base64Util.decode((String)object));
            PdfReader pdfReader = new PdfReader(a);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            object2 = SignReq.fixRect(Float.parseFloat((String)object2), Float.parseFloat(string), ((Rectangle)object).getWidth(), ((Rectangle)object).getHeight(), Integer.parseInt(string2), pdfReader);
            string = "reason";
            String string3 = "location";
            ByteArrayOutputStream byteArrayOutputStream2 = byteArrayOutputStream;
            SignUtil.signRSA(pdfReader, byteArrayOutputStream2, (PrivateKey)a2, certificateArray, VerifyReq.J("4s&\u0016V"), (Rectangle)object2, Integer.parseInt(string2), PDFHighlightAnnotationReq.J("~`jg"), (Image)object, string, string3, null, null);
            return byteArrayOutputStream2.toByteArray();
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            return null;
        }
    }

    @RequiresAuthorization
    public static byte[] WebPDFKeySign(InputStream a, Map<String, String> a22) {
        Object object;
        int n;
        int n2;
        ArrayList<SignInfo> arrayList;
        Image image;
        ByteArrayOutputStream byteArrayOutputStream;
        PdfReader pdfReader;
        String string = a22.get(VerifyReq.J("\u0017R\u0004Y\u0006H\u0002\rS"));
        Certificate[] certificateArray = a22.get(PDFHighlightAnnotationReq.J("ykqoh~l;="));
        String string2 = a22.get(VerifyReq.J("\f^\u001eL\bI\u0003"));
        Object object2 = a22.get(PDFHighlightAnnotationReq.J("jh{yyzm"));
        a22 = a22.get(VerifyReq.J("\f^\u001eH\u000e\\\tO\u001eK\u0002"));
        try {
            a22 = KeyStore.getInstance(PDFHighlightAnnotationReq.J("]BNZ<;"));
            object2 = ((String)object2).toCharArray();
            certificateArray = new ByteArrayInputStream(Base64Util.decode((String)certificateArray));
            Object object3 = a22;
            ((KeyStore)object3).load((InputStream)certificateArray, (char[])object2);
            certificateArray = ((KeyStore)object3).aliases().nextElement();
            object2 = (PrivateKey)((KeyStore)a22).getKey((String)certificateArray, (char[])object2);
            certificateArray = ((KeyStore)a22).getCertificateChain((String)certificateArray);
            pdfReader = new PdfReader(a);
            byteArrayOutputStream = new ByteArrayOutputStream();
            image = Image.getInstance(Base64Util.decode(string));
            float f = image.getWidth() * 0.8f;
            float f2 = image.getHeight() * 0.8f;
            arrayList = new ArrayList<SignInfo>();
            int n3 = pdfReader.getNumberOfPages();
            n = n2 = 1;
            while (n <= n3) {
                object = KeyFindUtil.matchPage(pdfReader, (Integer)n2, string2);
                Iterator<MatchItem> iterator = object.iterator();
                while (iterator.hasNext()) {
                    Iterator<MatchItem> iterator2;
                    Object object4 = iterator2.next();
                    object4 = ServerSignUtil.J(pdfReader, n2, f, f2, (MatchItem)object4);
                    iterator = iterator2;
                    Object object5 = object4;
                    ((SignInfo)object5).setImage(image);
                    ((SignInfo)object5).setImgbase64(string);
                    arrayList.add((SignInfo)object5);
                }
            }
        }
        catch (Exception a22) {
            logger.error(a22.getMessage(), a22);
            return null;
        }
        {
            n = ++n2;
            continue;
        }
        String string3 = "reason";
        object = "location";
        ByteArrayOutputStream byteArrayOutputStream2 = byteArrayOutputStream;
        SignUtil.signRSA(pdfReader, byteArrayOutputStream2, (PrivateKey)object2, certificateArray, VerifyReq.J("4s&\u0016V"), null, 0, PDFHighlightAnnotationReq.J("~`jg"), image, string3, (String)object, null, null, arrayList);
        return byteArrayOutputStream2.toByteArray();
    }
}


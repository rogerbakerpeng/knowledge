/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.bean.CertInfo;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.bean.annotation.PDFAnnotationReq;
import com.epoint.epsignature.bean.annotation.TransFormResult;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.itextpdf.text.BaseColor;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfAnnotation;
import com.epoint.itextpdf.text.pdf.PdfArray;
import com.epoint.itextpdf.text.pdf.PdfContentByte;
import com.epoint.itextpdf.text.pdf.PdfDictionary;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfObject;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.PdfStamper;
import com.epoint.itextpdf.text.pdf.PdfString;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;

public class PDFAnnotationUtil {
    public static Logger logger = Logger.getLogger(PDFAnnotationUtil.class);
    protected static final float TRANS_SCALE = 0.75f;

    private static /* synthetic */ Rectangle J(float a, float a2, float a3, float a4, int a5, PdfReader a6) {
        PdfReader pdfReader = a6;
        Rectangle rectangle = pdfReader.getPageSize(a5);
        if (pdfReader.getPageN(a5).getAsNumber(PdfName.ROTATE) != null) {
            int n = a6.getPageN(a5).getAsNumber(PdfName.ROTATE).intValue();
            int n2 = n = (n %= 360) < 0 ? n + 360 : n;
            if (n != 180 && n != 0) {
                rectangle = a6.getPageSize(a5).rotate();
            }
        }
        a2 = rectangle.getHeight() - a2;
        float f = a;
        Rectangle rectangle2 = new Rectangle(f, a2 - (a4 *= 0.8f), f + (a3 *= 0.8f), a2);
        return rectangle2;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Loose catch block
     */
    public static byte[] addAnnotation(PdfReader a, int a2322, float a3, float a4, float a5222, float a22223223222, String a6, String a7, String a8, String a9) {
        ByteArrayOutputStream byteArrayOutputStream;
        block10: {
            ByteArrayOutputStream a5222 = new ByteArrayOutputStream();
            PdfReader a22223223222 = a;
            PdfStamper pdfStamper = new PdfStamper(a22223223222, a5222, '\u0000', true);
            Rectangle rectangle = PDFAnnotationUtil.fixRect(a3 * 0.75f, a4 * 0.75f, 20.0f, 20.0f, a2322, a22223223222);
            PdfStamper pdfStamper2 = pdfStamper;
            Object object = a6 = PdfAnnotation.createText(pdfStamper2.getWriter(), rectangle, (String)a6, a7, true, CertInfo.J("sj]hUkD"));
            Object object2 = a6;
            ((PdfDictionary)object2).put(new PdfName(HighlightPos.J("\t\u000b\u001c\u001f\n\u0004-5\"48:82#5%?")), new PdfString(a8, CertInfo.J("P^lSjT`rlW")));
            ((PdfDictionary)a6).put(new PdfName(HighlightPos.J("\t\u000b\u001c\u001f\n\u0004(:8:")), new PdfString(new SimpleDateFormat(CertInfo.J("I|I|\u001dH}(Ta\u0010Mx?]h\nVc")).format(new Date()), HighlightPos.J("\u00195%8#?)\u0019%<")));
            ((PdfDictionary)object2).put(new PdfName(CertInfo.J("@`UtCodEqXjB")), new PdfString(a9, HighlightPos.J("\u00195%8#?)\u0019%<")));
            ((PdfDictionary)object).put(new PdfName(CertInfo.J("uU`AvZQk^jDdDl_kh")), new PdfString(String.valueOf(a3), HighlightPos.J("\u00195%8#?)\u0019%<")));
            ((PdfDictionary)object).put(new PdfName(CertInfo.J("uU`AvZQk^jDdDl_ki")), new PdfString(String.valueOf(a4), HighlightPos.J("\u00195%8#?)\u0019%<")));
            pdfStamper2.addAnnotation((PdfAnnotation)object, a2322);
            pdfStamper2.close();
            try {
                a5222.close();
                byteArrayOutputStream = a5222;
            }
            catch (IOException a22223223222) {
                logger.error(a22223223222.getMessage(), a22223223222);
                byteArrayOutputStream = a5222;
            }
            break block10;
            catch (Exception a22223223222) {
                try {
                    a22223223222.printStackTrace();
                    logger.error(a22223223222.getMessage(), a22223223222);
                }
                catch (Throwable throwable) {
                    Throwable throwable2;
                    try {
                        a5222.close();
                        throwable2 = throwable;
                    }
                    catch (IOException a2322) {
                        logger.error(a2322.getMessage(), a2322);
                        throwable2 = throwable;
                    }
                    throw throwable2;
                }
                try {
                    a5222.close();
                    byteArrayOutputStream = a5222;
                }
                catch (IOException a22223223222) {
                    logger.error(a22223223222.getMessage(), a22223223222);
                    byteArrayOutputStream = a5222;
                }
            }
        }
        return byteArrayOutputStream.toByteArray();
    }

    private static /* synthetic */ float[] J(List<Rectangle> a) {
        Iterator<Rectangle> iterator;
        float f = Float.MAX_VALUE;
        float f2 = Float.MAX_VALUE;
        float f3 = -3.4028235E38f;
        float f4 = -3.4028235E38f;
        Iterator<Rectangle> iterator2 = iterator = a.iterator();
        while (iterator2.hasNext()) {
            Rectangle rectangle = iterator.next();
            f = Math.min(f, rectangle.getLeft());
            f2 = Math.min(f2, rectangle.getTop() - rectangle.getHeight());
            f3 = Math.max(f3, rectangle.getLeft() + rectangle.getWidth());
            f4 = Math.max(f4, rectangle.getTop());
            iterator2 = iterator;
        }
        float[] fArray = new float[4];
        fArray[0] = f;
        fArray[1] = f2;
        fArray[2] = f3;
        fArray[3] = f4;
        return fArray;
    }

    public static byte[] addAnnotation(PdfReader a, PDFAnnotationReq.Position a2, String a3, String a4, String a5, String a6) throws Exception {
        return PDFAnnotationUtil.addAnnotation(a, a2.getPage(), a2.getLlx(), a2.getLly(), a2.getLlx() + 20.0f, a2.getLly() + 20.0f, a3, a4, a5, a6);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Loose catch block
     */
    public static byte[] updateAnnotation(PdfReader a, int a22222222222222222, String a3, String a4) {
        ByteArrayOutputStream byteArrayOutputStream;
        block14: {
            PdfStamper pdfStamper;
            ByteArrayOutputStream byteArrayOutputStream2;
            block13: {
                int n;
                byteArrayOutputStream2 = new ByteArrayOutputStream();
                PdfReader pdfReader = a;
                pdfStamper = new PdfStamper(pdfReader, byteArrayOutputStream2, '\u0000', true);
                PdfArray a22222222222222222 = pdfReader.getPageN(a22222222222222222).getAsArray(PdfName.ANNOTS);
                if (a22222222222222222 == null) break block13;
                int n2 = n = 0;
                while (n2 < a22222222222222222.size()) {
                    PdfDictionary pdfDictionary = a22222222222222222.getAsDict(n);
                    PdfString pdfString = pdfDictionary.getAsString(new PdfName(CertInfo.J("@`UtCod^k_qQqYj^lT")));
                    if (pdfString != null && a3.equals(pdfString.toString()) && StringUtil.isNotBlank(pdfDictionary.getAsString(PdfName.CONTENTS))) {
                        PdfDictionary pdfDictionary2 = pdfDictionary;
                        pdfDictionary2.put(PdfName.CONTENTS, new PdfString(a4, HighlightPos.J("\u00195%8#?)\u0019%<")));
                        pdfDictionary2.remove(PdfName.AP);
                        pdfStamper.markUsed(pdfDictionary2);
                    }
                    n2 = ++n;
                }
            }
            pdfStamper.close();
            try {
                byteArrayOutputStream2.close();
                byteArrayOutputStream = byteArrayOutputStream2;
            }
            catch (IOException iOException) {
                logger.error(iOException.getMessage(), iOException);
                byteArrayOutputStream = byteArrayOutputStream2;
            }
            break block14;
            catch (Exception exception) {
                try {
                    logger.error(exception.getMessage(), exception);
                }
                catch (Throwable throwable) {
                    Throwable throwable2;
                    try {
                        byteArrayOutputStream2.close();
                        throwable2 = throwable;
                    }
                    catch (IOException a22222222222222222) {
                        logger.error(a22222222222222222.getMessage(), a22222222222222222);
                        throwable2 = throwable;
                    }
                    throw throwable2;
                }
                try {
                    byteArrayOutputStream2.close();
                    byteArrayOutputStream = byteArrayOutputStream2;
                }
                catch (IOException iOException) {
                    logger.error(iOException.getMessage(), iOException);
                    byteArrayOutputStream = byteArrayOutputStream2;
                }
            }
        }
        return byteArrayOutputStream.toByteArray();
    }

    public static Rectangle fixRect(float a, float a2, float a3, float a4, int a5, PdfReader a6) {
        PdfReader pdfReader = a6;
        Rectangle rectangle = pdfReader.getPageSize(a5);
        if (pdfReader.getPageN(a5).getAsNumber(PdfName.ROTATE) != null) {
            rectangle = a6.getPageSize(a5).rotate();
        }
        a2 = rectangle.getHeight() - a2;
        return new Rectangle(a - a3 / 2.0f, a2 - a4 / 2.0f, a + a3 / 2.0f, a2 + a4 / 2.0f);
    }

    /*
     * Exception decompiling
     */
    public static void main(String[] a) throws Exception {
        /*
         * This method has failed to decompile.  When submitting a bug report, please provide this stack trace, and (if you hold appropriate legal rights) the relevant class file.
         * 
         * org.benf.cfr.reader.util.ConfusedCFRException: Tried to end blocks [4[TRYBLOCK]], but top level block is 0[TRYBLOCK]
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.processEndingBlocks(Op04StructuredStatement.java:435)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.buildNestedBlocks(Op04StructuredStatement.java:484)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op03SimpleStatement.createInitialStructuredBlock(Op03SimpleStatement.java:736)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisInner(CodeAnalyser.java:850)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisOrWrapFail(CodeAnalyser.java:278)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysis(CodeAnalyser.java:201)
         *     at org.benf.cfr.reader.entities.attributes.AttributeCode.analyse(AttributeCode.java:94)
         *     at org.benf.cfr.reader.entities.Method.analyse(Method.java:531)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseMid(ClassFile.java:1055)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseTop(ClassFile.java:942)
         *     at org.benf.cfr.reader.Driver.doJarVersionTypes(Driver.java:257)
         *     at org.benf.cfr.reader.Driver.doJar(Driver.java:139)
         *     at org.benf.cfr.reader.CfrDriverImpl.analyse(CfrDriverImpl.java:76)
         *     at org.benf.cfr.reader.Main.main(Main.java:54)
         */
        throw new IllegalStateException("Decompilation failed");
    }

    private static /* synthetic */ void J(PdfStamper a, PdfContentByte a2, List<HighlightPos> a3, PdfReader a4, int a5, String a6, boolean a7, Map<String, Object> a8) {
        Map<String, Object> map;
        Object object;
        Object object2;
        Object object3;
        boolean bl;
        if (a8 != null && a8.containsKey(CertInfo.J("YvDdRiU")) && !(bl = ((Boolean)a8.get(HighlightPos.J("2?/-9 >"))).booleanValue())) {
            Iterator<HighlightPos> iterator = a3.iterator();
            Object object4 = iterator;
            object3 = iterator;
            while (object4.hasNext()) {
                object2 = (HighlightPos)object3.next();
                object = a4.getPageSize(a5);
                Object object5 = object2;
                ((HighlightPos)object5).setLeft(((HighlightPos)object5).getLeft() > 50.0f ? 50.0f : ((HighlightPos)object2).getLeft());
                Object object6 = object2;
                ((HighlightPos)object6).setWidth(((Rectangle)object).getWidth() - 2.0f * (((HighlightPos)object6).getLeft() > 50.0f ? 50.0f : ((HighlightPos)object2).getLeft()));
                object4 = object3;
            }
        }
        TransFormResult transFormResult = PDFAnnotationUtil.J(a3, a4, a5, a7);
        object3 = transFormResult.getBoundingRectangle();
        object2 = new Rectangle(object3[0], object3[1], object3[2], (float)object3[3]);
        object = PdfAnnotation.createMarkup(a.getWriter(), (Rectangle)object2, null, 0, transFormResult.getRectangles());
        ((PdfDictionary)object).put(new PdfName(CertInfo.J("uUoMyBx")), new PdfString(a6));
        if (a8 != null && a8.containsKey(HighlightPos.J("9+8#7#)"))) {
            a3 = (JSONObject)a8.get(CertInfo.J("RbSj\\jB"));
            map = a8;
            ((PdfAnnotation)object).setColor(new BaseColor(((JSONObject)a3).getIntValue(HighlightPos.J("))?")), ((JSONObject)a3).getIntValue(CertInfo.J("WwU`^")), ((JSONObject)a3).getIntValue(HighlightPos.J(".79>"))));
        } else {
            ((PdfAnnotation)object).setColor(new BaseColor(255, 255, 0));
            map = a8;
        }
        if (map != null && a8.containsKey(CertInfo.J("DlDiU"))) {
            ((PdfDictionary)object).put(PdfName.T, new PdfString((String)a8.get(HighlightPos.J("/%/ >")), CertInfo.J("P^lSjT`rlW")));
        }
        if (a8 != null && a8.containsKey(HighlightPos.J("8#58>\"/"))) {
            ((PdfDictionary)object).put(PdfName.CONTENTS, new PdfString((String)a8.get(CertInfo.J("Sj^qUkD")), HighlightPos.J("\u00195%8#?)\u0019%<")));
        }
        ((PdfAnnotation)object).setFlags(4);
        a2.addAnnotation((PdfAnnotation)object, false);
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static List<PDFAnnotationReq> getAnnotationInfo(PdfReader a) {
        ArrayList<PDFAnnotationReq> arrayList = new ArrayList<PDFAnnotationReq>();
        try {
            PdfReader pdfReader = a;
            int n = pdfReader.getNumberOfPages();
            for (int i = 1; i < n + 1; ++i) {
                int n2;
                PdfArray pdfArray = pdfReader.getPageN(i).getAsArray(PdfName.ANNOTS);
                if (pdfArray == null) continue;
                int n3 = n2 = 0;
                while (n3 < pdfArray.size()) {
                    PdfObject pdfObject = pdfArray.getAsDict(n2);
                    Object object = ((PdfDictionary)pdfObject).getAsName(PdfName.SUBTYPE);
                    if (((PdfName)object).equals(PdfName.TEXT) || ((PdfName)object).equals(PdfName.HIGHLIGHT) || ((PdfName)object).equals(PdfName.UNDERLINE) || ((PdfName)object).equals(PdfName.SQUIGGLY)) {
                        object = new PDFAnnotationReq();
                        PdfDictionary pdfDictionary = pdfObject;
                        PdfString pdfString = pdfDictionary.getAsString(new PdfName(CertInfo.J("uU`AvZQk^jDdDl_kh")));
                        PdfString pdfString2 = ((PdfDictionary)pdfObject).getAsString(new PdfName(HighlightPos.J("\u001e\u001c\u000b\b\u001d\u0013:\"5#/-/%4\"\u0002")));
                        PdfArray pdfArray2 = (PdfArray)pdfDictionary.get(new PdfName(CertInfo.J("WUfD")));
                        Object object2 = ((PdfDictionary)pdfObject).getAsName(new PdfName(HighlightPos.J("\u0002:!>")));
                        if (pdfArray2 != null && object2 != null) {
                            Object object3;
                            object2 = new PDFAnnotationReq.Position();
                            if (StringUtil.isNotBlank(pdfString) && StringUtil.isNotBlank(pdfString2)) {
                                Object object4 = object2;
                                object3 = object4;
                                ((PDFAnnotationReq.Position)object4).setLlx(Float.parseFloat(pdfString.toUnicodeString()));
                                ((PDFAnnotationReq.Position)object4).setLly(Float.parseFloat(pdfString2.toUnicodeString()));
                            } else {
                                object3 = object2 = PDFAnnotationUtil.fixRectToPage(pdfArray2.asLongArray()[0], pdfArray2.asLongArray()[1], 20.0f, 20.0f, i, pdfReader);
                            }
                            ((PDFAnnotationReq.Position)object3).setPage(i);
                            ((PDFAnnotationReq)object).setPosition((PDFAnnotationReq.Position)object2);
                            object2 = ((PdfDictionary)pdfObject).getAsString(PdfName.CONTENTS);
                            if (object2 != null) {
                                ((PDFAnnotationReq)object).setContent(((PdfString)object2).toUnicodeString());
                            }
                            if ((pdfString = ((PdfDictionary)pdfObject).getAsString(new PdfName(CertInfo.J("@`UtCod^k_qQqYj^lT")))) != null) {
                                ((PDFAnnotationReq)object).setId(pdfString.toString());
                            }
                            pdfString2 = ((PdfDictionary)pdfObject).getAsString(new PdfName(HighlightPos.J("\t\u000b\u001c\u001f\n\u0004(:8:")));
                            if (pdfString != null) {
                                ((PDFAnnotationReq)object).setDate(pdfString2.toString());
                            }
                            if ((pdfObject = ((PdfDictionary)pdfObject).getAsString(new PdfName(CertInfo.J("@`UtCodEqXjB")))) != null) {
                                ((PDFAnnotationReq)object).setAuthor(((PdfString)pdfObject).toUnicodeString());
                            }
                            arrayList.add((PDFAnnotationReq)object);
                        }
                    }
                    n3 = ++n2;
                }
            }
            return arrayList;
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
        }
        return arrayList;
    }

    private static /* synthetic */ TransFormResult J(List<HighlightPos> a, PdfReader a22, int a32, boolean a42) {
        Object object;
        int n;
        ArrayList<Rectangle> arrayList = new ArrayList<Rectangle>();
        int n2 = n = 0;
        while (n2 < a.size()) {
            object = a.get(n);
            if (!a42) {
                arrayList.add(PDFAnnotationUtil.J(((HighlightPos)object).getLeft() * 0.8f, ((HighlightPos)object).getTop() * 0.8f, ((HighlightPos)object).getWidth(), ((HighlightPos)object).getHeight(), a32, (PdfReader)a22));
            } else {
                arrayList.add(new Rectangle(((HighlightPos)object).getLeft(), ((HighlightPos)object).getTop(), ((HighlightPos)object).getLeft() + ((HighlightPos)object).getWidth(), ((HighlightPos)object).getTop() - ((HighlightPos)object).getHeight()));
            }
            n2 = ++n;
        }
        ArrayList<float[]> arrayList2 = new ArrayList<float[]>();
        Object object2 = object = arrayList.iterator();
        while (object2.hasNext()) {
            a22 = (Rectangle)object.next();
            object2 = object;
            arrayList2.add(PDFAnnotationUtil.J((Rectangle)a22));
        }
        ArrayList<float[]> arrayList3 = arrayList2;
        object = new float[arrayList3.size() * 8];
        int a22 = 0;
        for (float[] a42 : arrayList3) {
            int n3;
            int n4 = a42.length;
            int n5 = n3 = 0;
            while (n5 < n4) {
                float f = a42[n3];
                object[a22++] = f;
                n5 = ++n3;
            }
        }
        Object a32 = PDFAnnotationUtil.J(arrayList);
        return new TransFormResult((float[])a32, (float[])object);
    }

    public static PDFAnnotationReq.Position fixRectToPage(float a, float a2, float a3, float a4, int a5, PdfReader a6) {
        PDFAnnotationReq.Position position = new PDFAnnotationReq.Position();
        PdfReader pdfReader = a6;
        Rectangle rectangle = pdfReader.getPageSize(a5);
        if (pdfReader.getPageN(a5).getAsNumber(PdfName.ROTATE) != null) {
            rectangle = a6.getPageSize(a5).rotate();
            return position;
        }
        PDFAnnotationReq.Position position2 = position;
        position.setLlx((a + a3 / 2.0f) / 0.75f);
        position2.setLly((rectangle.getHeight() - a2) / 0.75f - a4 / 2.0f);
        position2.setPage(a5);
        return position;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Loose catch block
     */
    public static byte[] removeAnnotation(PdfReader a, int a22222222222222222, String a3) {
        ByteArrayOutputStream byteArrayOutputStream;
        block14: {
            PdfStamper pdfStamper;
            ByteArrayOutputStream byteArrayOutputStream2;
            block13: {
                int n;
                byteArrayOutputStream2 = new ByteArrayOutputStream();
                PdfReader pdfReader = a;
                pdfStamper = new PdfStamper(pdfReader, byteArrayOutputStream2, '\u0000', true);
                PdfArray a22222222222222222 = pdfReader.getPageN(a22222222222222222).getAsArray(PdfName.ANNOTS);
                if (a22222222222222222 == null) break block13;
                int n2 = n = 0;
                while (n2 < a22222222222222222.size()) {
                    PdfDictionary pdfDictionary = a22222222222222222.getAsDict(n);
                    PdfString pdfString = pdfDictionary.getAsString(new PdfName(HighlightPos.J("\t\u000b\u001c\u001f\n\u0004-5\"48:82#5%?")));
                    if (pdfString != null && a3.equals(pdfString.toString())) {
                        PdfDictionary pdfDictionary2 = pdfDictionary;
                        pdfDictionary2.clear();
                        pdfStamper.markUsed(pdfDictionary2);
                    }
                    n2 = ++n;
                }
            }
            pdfStamper.close();
            try {
                byteArrayOutputStream2.close();
                byteArrayOutputStream = byteArrayOutputStream2;
            }
            catch (IOException iOException) {
                logger.error(iOException.getMessage(), iOException);
                byteArrayOutputStream = byteArrayOutputStream2;
            }
            break block14;
            catch (Exception exception) {
                try {
                    logger.error(exception.getMessage(), exception);
                }
                catch (Throwable throwable) {
                    Throwable throwable2;
                    try {
                        byteArrayOutputStream2.close();
                        throwable2 = throwable;
                    }
                    catch (IOException a22222222222222222) {
                        logger.error(a22222222222222222.getMessage(), a22222222222222222);
                        throwable2 = throwable;
                    }
                    throw throwable2;
                }
                try {
                    byteArrayOutputStream2.close();
                    byteArrayOutputStream = byteArrayOutputStream2;
                }
                catch (IOException iOException) {
                    logger.error(iOException.getMessage(), iOException);
                    byteArrayOutputStream = byteArrayOutputStream2;
                }
            }
        }
        return byteArrayOutputStream.toByteArray();
    }

    public static ByteArrayOutputStream addHeightLightAnnoation(PdfReader a, List<HighlightPos> a2, String a3, boolean a4) throws Exception {
        a2 = a2.stream().collect(Collectors.groupingBy(HighlightPos::getPagenum));
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfStamper pdfStamper = new PdfStamper(a, byteArrayOutputStream);
        for (Map.Entry entry : a2.entrySet()) {
            int n = (Integer)entry.getKey();
            List list = (List)entry.getValue();
            PdfContentByte pdfContentByte = pdfStamper.getOverContent(n);
            if (!a4) {
                PDFAnnotationUtil.J(pdfStamper, pdfContentByte, list, a, n, a3, a4, null);
                continue;
            }
            Iterator iterator = list.iterator();
            while (iterator.hasNext()) {
                Iterator iterator2;
                HighlightPos highlightPos = (HighlightPos)iterator2.next();
                ArrayList<HighlightPos> arrayList = new ArrayList<HighlightPos>();
                iterator = iterator2;
                arrayList.add(highlightPos);
                PDFAnnotationUtil.J(pdfStamper, pdfContentByte, arrayList, a, n, highlightPos.getHighLightID(), a4, highlightPos.getExt());
            }
        }
        pdfStamper.close();
        a.close();
        return byteArrayOutputStream;
    }

    public PDFAnnotationUtil() {
        PDFAnnotationUtil a;
    }

    private static /* synthetic */ float[] J(Rectangle a) {
        Rectangle rectangle = a;
        float f = rectangle.getLeft();
        float f2 = rectangle.getTop();
        float f3 = rectangle.getHeight();
        float f4 = rectangle.getWidth();
        float[] fArray = new float[8];
        fArray[0] = f;
        fArray[1] = f2 - f3;
        fArray[2] = f;
        fArray[3] = f2;
        fArray[4] = f + f4;
        fArray[5] = f2 - f3;
        fArray[6] = f + f4;
        fArray[7] = f2;
        return fArray;
    }
}


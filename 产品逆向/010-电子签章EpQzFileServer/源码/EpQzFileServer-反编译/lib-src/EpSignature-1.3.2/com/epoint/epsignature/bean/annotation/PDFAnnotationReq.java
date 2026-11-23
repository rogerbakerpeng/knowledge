/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.annotation;

import com.epoint.epsignature.bean.Pdf;
import com.epoint.itextpdf.text.pdf.PdfReader;

public class PDFAnnotationReq {
    private String content;
    private String author;
    private String id;
    private Pdf pdf;
    protected PdfReader reader;
    private String date;
    private Position position;
    private String title;

    public PDFAnnotationReq() {
        PDFAnnotationReq a;
    }

    public String getAuthor() {
        PDFAnnotationReq a;
        return a.author;
    }

    public String getTitle() {
        PDFAnnotationReq a;
        return a.title;
    }

    public void setPdf(Pdf a) {
        a.pdf = a;
    }

    public Pdf getPdf() {
        PDFAnnotationReq a;
        return a.pdf;
    }

    public void setId(String a) {
        a.id = a;
    }

    public void setReader(PdfReader a) {
        a.reader = a;
    }

    public Position getPosition() {
        PDFAnnotationReq a;
        return a.position;
    }

    public String getId() {
        PDFAnnotationReq a;
        return a.id;
    }

    public void setAuthor(String a) {
        a.author = a;
    }

    public String getContent() {
        PDFAnnotationReq a;
        return a.content;
    }

    public void setPosition(Position a) {
        a.position = a;
    }

    public String getDate() {
        PDFAnnotationReq a;
        return a.date;
    }

    public void setDate(String a) {
        a.date = a;
    }

    public void setContent(String a) {
        a.content = a;
    }

    public PdfReader getReader() {
        PDFAnnotationReq a;
        return a.reader;
    }

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 4 << 4 ^ 2 << 1;
        int cfr_ignored_0 = 2 ^ 5;
        int n4 = n2;
        int n5 = 4 << 4 ^ (2 ^ 5);
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

    public void setTitle(String a) {
        a.title = a;
    }

    public static class Position {
        private int page;
        private float lly;
        private float llx;

        public Position() {
            Position a;
        }

        public void setPage(int a) {
            a.page = a;
        }

        public void setLly(float a) {
            a.lly = a;
        }

        public float getLlx() {
            Position a;
            return a.llx;
        }

        public float getLly() {
            Position a;
            return a.lly;
        }

        public void setLlx(float a) {
            a.llx = a;
        }

        public int getPage() {
            Position a;
            return a.page;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.utils;

import com.epoint.itextpdf.text.BaseColor;
import com.epoint.itextpdf.text.pdf.BaseFont;
import com.epoint.itextpdf.text.pdf.PdfContentByte;
import com.epoint.itextpdf.text.pdf.PdfGState;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.PdfStamper;
import java.io.FileOutputStream;
import javax.swing.JLabel;

public class PDFUtils {
    public static void addwaterMark(String inputFile, String waterMarkName) {
        try {
            PdfReader reader = new PdfReader(inputFile);
            PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(inputFile.replace(".pdf", "temp.pdf")));
            BaseFont base = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", true);
            PdfGState gs = new PdfGState();
            gs.setFillOpacity(0.5f);
            gs.setStrokeOpacity(0.4f);
            int total = reader.getNumberOfPages() + 1;
            JLabel label = new JLabel();
            label.setText(waterMarkName);
            for (int i = 1; i < total; ++i) {
                PdfContentByte under = stamper.getOverContent(i);
                gs.setFillOpacity(0.5f);
                under.setGState(gs);
                under.beginText();
                under.setColorFill(BaseColor.LIGHT_GRAY);
                under.setFontAndSize(base, 50.0f);
                under.setTextMatrix(70.0f, 200.0f);
                under.showTextAligned(1, waterMarkName, 300.0f, 350.0f, 55.0f);
                under.endText();
            }
            stamper.close();
            reader.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}


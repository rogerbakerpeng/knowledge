/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.bean.sign.MixedSignCtx;
import com.epoint.epsignature.gm.ses.v1.SES_ESPictrueInfo;
import com.epoint.epsignature.gm.ses.v4.SES_SealInfo;
import com.epoint.epsignature.gm.ses.v4.SESeal;
import com.epoint.epsignature.gm.ses.v4.TBS_Sign;
import com.epoint.epsignature.utils.ImageMergeUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PdfValidator;
import com.epoint.epsignature.utils.j;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.SM3Util;
import com.epoint.itextpdf.epsign.EPPdfNames;
import com.epoint.itextpdf.text.pdf.AcroFields;
import com.epoint.itextpdf.text.pdf.PRStream;
import com.epoint.itextpdf.text.pdf.PdfDictionary;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfObject;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.parser.ContentByteUtils;
import com.epoint.itextpdf.text.pdf.parser.PdfContentStreamProcessor;
import com.epoint.itextpdf.text.pdf.parser.PdfImageObject;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Map;
import org.apache.log4j.Logger;

public class SignatureDataExtractor {
    final PdfReader b;
    private static Logger log = Logger.getLogger(SignatureDataExtractor.class);

    public SignatureDataExtractor(PdfReader a) {
        SignatureDataExtractor a2;
        a2.b = a;
    }

    static /* synthetic */ Logger J() {
        return log;
    }

    public PdfImageObject extractImage(String a) throws IOException {
        SignatureDataExtractor a2;
        j j2 = new j(a2);
        a = a2.b.getAcroFields().getFieldItem((String)a).getMerged(0).getAsDict(PdfName.AP).getAsStream(PdfName.N);
        PdfDictionary pdfDictionary = ((PdfDictionary)a).getAsDict(PdfName.RESOURCES);
        new PdfContentStreamProcessor(j2).processContent(ContentByteUtils.getContentBytesFromContentObject((PdfObject)a), pdfDictionary);
        return j2.G;
    }

    private /* synthetic */ String J(PRStream a) {
        String string = "";
        try {
            Class<PRStream> clazz = PRStream.class;
            Object object = JSONUtils.J("doaC~`");
            Object object2 = object = clazz.getDeclaredField((String)object);
            ((Field)object2).setAccessible(true);
            string = String.valueOf(((Field)object2).get(a));
            return string;
        }
        catch (Exception exception) {
            log.error(HighlightPos.J("<)/\u00039&596"), exception);
            return string;
        }
    }

    public PdfImageObject extractImage(AcroFields.Item a) throws Exception {
        SignatureDataExtractor a2;
        j j2 = new j(a2);
        a = ((AcroFields.Item)a).getMerged(0).getAsDict(PdfName.AP).getAsStream(PdfName.N);
        PdfDictionary pdfDictionary = ((PdfDictionary)a).getAsDict(PdfName.RESOURCES);
        new PdfContentStreamProcessor(j2).processContent(ContentByteUtils.getContentBytesFromContentObject((PdfObject)a), pdfDictionary);
        return j2.G;
    }

    public String extractMaskedImage2(AcroFields.Item a, MixedSignCtx a2, String a3, PdfValidator a4, Map<String, String> a5) throws Exception {
        Object object;
        Object object2;
        SignatureDataExtractor a6;
        block17: {
            if ("XS".equals(a3)) {
                SignatureDataExtractor signatureDataExtractor = a6;
                a3 = signatureDataExtractor.extractImage((AcroFields.Item)a);
                String string = signatureDataExtractor.J((PRStream)((PdfImageObject)a3).getDictionary());
                if (!a2.imgs.containsKey(string)) {
                    a2.imgs.put(string, Base64Util.encode(ImageMergeUtil.changeTransparent(((PdfImageObject)a3).getImageAsBytes(), 9)));
                }
                return string;
            }
            a3 = "";
            PdfDictionary pdfDictionary = ((AcroFields.Item)a).getMerged(0);
            object2 = null;
            PdfDictionary pdfDictionary2 = pdfDictionary;
            object = pdfDictionary2.get(EPPdfNames.DIGITAL_INFO);
            PdfObject pdfObject = pdfDictionary2.get(EPPdfNames.DIGITAL_INFO_CONTANER);
            if (pdfObject == null) break block17;
            a3 = pdfObject.toString();
            if (!a2.imgs.containsKey(a3)) {
                PdfDictionary pdfDictionary3 = pdfDictionary.getAsDict(EPPdfNames.DIGITAL_INFO_CONTANER);
                object2 = pdfDictionary3.get(EPPdfNames.DIGITAL_INFO);
                a2.imgs.put((String)a3, ((PdfObject)object2).toString());
            }
        }
        try {
            SignatureDataExtractor signatureDataExtractor = a6;
            PdfImageObject pdfImageObject = signatureDataExtractor.extractImage((AcroFields.Item)a);
            a3 = signatureDataExtractor.J((PRStream)pdfImageObject.getDictionary());
            if (object != null) {
                object2 = object;
                if (!a2.imgs.containsKey(a3)) {
                    a2.imgs.put((String)a3, ((PdfObject)object2).toString());
                }
            } else if (!a2.imgs.containsKey(a3)) {
                if (a4 != null && ((PdfValidator)a4).getSesSignature() != null) {
                    a = ((PdfValidator)a4).getSesSignature().getToSign();
                    if (a != null && (object2 = (SESeal)((TBS_Sign)a).getEseal()) != null && (a4 = ((SESeal)object2).geteSealInfo()) != null && (a4 = ((SES_SealInfo)a4).getPicture()) != null) {
                        object = Base64Util.encode(SM3Util.hash(((SES_ESPictrueInfo)a4).getData().getOctets()));
                        if (a5.containsKey(object)) {
                            a3 = a5.get(object);
                        } else {
                            a2.imgs.put((String)a3, Base64Util.encode(((SES_ESPictrueInfo)a4).getData().getOctets()));
                            a5.put((String)object, (String)a3);
                        }
                    }
                } else {
                    a = Base64Util.encode(ImageMergeUtil.changeTransparent(pdfImageObject.getImageAsBytes(), 9));
                    object2 = Base64Util.encode(SM3Util.hash(Base64Util.decode((String)a)));
                    if (a5.containsKey(object2)) {
                        a3 = a5.get(object2);
                    } else {
                        a2.imgs.put((String)a3, (String)a);
                        a5.put((String)object2, (String)a3);
                    }
                }
            }
        }
        catch (Exception exception) {
            log.error(JSONUtils.J("hsyylhyFlxfniB`jjn?"), exception);
        }
        return a3;
    }
}


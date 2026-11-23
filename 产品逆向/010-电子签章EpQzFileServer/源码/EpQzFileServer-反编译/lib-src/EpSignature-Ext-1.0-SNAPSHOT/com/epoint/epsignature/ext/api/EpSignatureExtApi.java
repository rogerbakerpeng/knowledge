/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.api;

import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.sign.MixedSignCtx;
import com.epoint.epsignature.ext.baen.AbToSignReq;
import com.epoint.epsignature.ext.factory.ToSignReqFactory;
import com.epoint.epsignature.ext.model.AnchorPoint;
import com.epoint.epsignature.ext.model.DetectParams;
import com.epoint.epsignature.ext.model.DocumentSealAnchors;
import com.epoint.epsignature.ext.model.ToBeTwiceDetecedForAnbiao;
import com.epoint.epsignature.ext.model.TwiceDetecedResForAnbiao;
import com.epoint.epsignature.ext.utils.DocumentSealAnchorUtil;
import com.epoint.epsignature.ext.utils.TwiceDetectOfAnBiaoUtil;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.io.InputStream;
import java.util.List;
import org.apache.log4j.Logger;

public class EpSignatureExtApi {
    private static Logger log = Logger.getLogger(EpSignatureApi.class);

    private static /* synthetic */ List<TwiceDetecedResForAnbiao> F(PdfReader a, List<ToBeTwiceDetecedForAnbiao> a22) {
        List<TwiceDetecedResForAnbiao> list = null;
        try {
            list = TwiceDetectOfAnBiaoUtil.getTwiceDetectInfoByParaLst(a, a22);
            return list;
        }
        catch (Exception a22) {
            log.error(AnchorPoint.F("CjR`GqRYCkQ}Tvv}U"), a22);
            return list;
        }
    }

    private static /* synthetic */ DocumentSealAnchors F(PdfReader a, List<DetectParams> a22, String a3) {
        DocumentSealAnchors documentSealAnchors = null;
        try {
            a22 = ToSignReqFactory.getSignReq((String)a3, a, a22);
            a3 = ((AbToSignReq)a22).getSignPos().getToSignList();
            MixedSignCtx mixedSignCtx = DocumentSealAnchorUtil.getMixedSignCtx(a);
            documentSealAnchors = DocumentSealAnchorUtil.getDocSealAnchorsByPosAndMixctx((List<DetectParams>)a3, mixedSignCtx);
            return documentSealAnchors;
        }
        catch (Exception a22) {
            log.error(AnchorPoint.F("VsTaCBbTuwG~g|EzI`U"), a22);
            return documentSealAnchors;
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static List<TwiceDetecedResForAnbiao> twiceDetectKeywordByParaLst(InputStream a, List<ToBeTwiceDetecedForAnbiao> a2) {
        try (PdfReader pdfReader = null;){
            pdfReader = new PdfReader(a);
            a2 = EpSignatureExtApi.F(pdfReader, a2);
            return a2;
        }
        return null;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static DocumentSealAnchors analyzeSealAnchors(String a, List<DetectParams> a2, String a3) {
        try (PdfReader pdfReader = null;){
            pdfReader = new PdfReader(a);
            a2 = EpSignatureExtApi.F(pdfReader, a2, a3);
            return a2;
        }
        return null;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static DocumentSealAnchors analyzeSealAnchors(InputStream a, List<DetectParams> a2, String a3) {
        try (PdfReader pdfReader = null;){
            pdfReader = new PdfReader(a);
            a2 = EpSignatureExtApi.F(pdfReader, a2, a3);
            return a2;
        }
        return null;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static List<TwiceDetecedResForAnbiao> twiceDetectKeywordByParaLst(String a, List<ToBeTwiceDetecedForAnbiao> a2) {
        try (PdfReader pdfReader = null;){
            pdfReader = new PdfReader(a);
            a2 = EpSignatureExtApi.F(pdfReader, a2);
            return a2;
        }
        return null;
    }

    private /* synthetic */ EpSignatureExtApi() {
        EpSignatureExtApi a;
    }
}


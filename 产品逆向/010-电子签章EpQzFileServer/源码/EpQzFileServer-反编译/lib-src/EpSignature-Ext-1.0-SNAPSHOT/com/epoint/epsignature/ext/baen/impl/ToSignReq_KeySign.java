/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.baen.impl;

import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.ext.baen.AbToSignReq;
import com.epoint.epsignature.ext.model.AnchorPoint;
import com.epoint.epsignature.ext.model.DetectParams;
import com.epoint.epsignature.ext.model.KeywordPositionOfPdf;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.util.Arrays;
import java.util.List;

public class ToSignReq_KeySign
extends AbToSignReq {
    public ToSignReq_KeySign(PdfReader a, List<DetectParams> a2) {
        ToSignReq_KeySign a3;
        ToSignReq_KeySign toSignReq_KeySign = a3;
        toSignReq_KeySign.pdfReader = a;
        toSignReq_KeySign.toSignLst = a2;
    }

    private static /* synthetic */ void F(List<DetectParams> a) {
        if (a.stream().anyMatch(a3 -> a.stream().anyMatch(a2 -> a3 != a2 && a3.getKeyword().equals(a2.getKeyword()) && a3.getSealtype().equals(a2.getSealtype())))) {
            throw new RuntimeException(AnchorPoint.F("\u5155\u953c\u5b71\u549e\u5356\u7af2\u7c5d\u5799\u91eb\u591f\uff2a\u8be5\u68e6\u67f7\u5155\u953c\u5b71\u549e\u5356\u7af2\u7c5d\u5799\uff27"));
        }
    }

    @Override
    public AbToSignReq.ParseResult getSignPos() throws Exception {
        ToSignReq_KeySign a;
        ToSignReq_KeySign toSignReq_KeySign = a;
        ToSignReq_KeySign.F(toSignReq_KeySign.toSignLst);
        String[] stringArray = (String[])toSignReq_KeySign.toSignLst.stream().map(DetectParams::getKeyword).toArray(String[]::new);
        for (KeywordPositionOfPdf.KeywordAndPosition keywordAndPosition : JSONUtils.json2bean(EpSignatureApi.getKeyWordPositions(a.pdfReader, Arrays.asList(stringArray)), KeywordPositionOfPdf.class).getData()) {
            DetectParams detectParams = a.toSignLst.stream().filter(a2 -> keywordAndPosition.getKeyword().equals(a2.getKeyword())).findFirst().orElse(null);
            if (detectParams == null) continue;
            detectParams.setPositionLst(keywordAndPosition.getPositions());
        }
        ToSignReq_KeySign toSignReq_KeySign2 = a;
        return toSignReq_KeySign2.new AbToSignReq.ParseResult(toSignReq_KeySign2.toSignLst);
    }
}


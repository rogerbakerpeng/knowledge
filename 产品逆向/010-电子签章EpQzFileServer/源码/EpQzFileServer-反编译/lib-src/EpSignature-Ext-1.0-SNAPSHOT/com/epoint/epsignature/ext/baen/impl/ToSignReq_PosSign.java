/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.baen.impl;

import com.epoint.epsignature.ext.baen.AbToSignReq;
import com.epoint.epsignature.ext.model.DetectParams;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.util.List;

public class ToSignReq_PosSign
extends AbToSignReq {
    @Override
    public AbToSignReq.ParseResult getSignPos() throws Exception {
        ToSignReq_PosSign a;
        ToSignReq_PosSign toSignReq_PosSign = a;
        return toSignReq_PosSign.new AbToSignReq.ParseResult(toSignReq_PosSign.toSignLst);
    }

    public ToSignReq_PosSign(PdfReader a, List<DetectParams> a2) {
        ToSignReq_PosSign a3;
        ToSignReq_PosSign toSignReq_PosSign = a3;
        toSignReq_PosSign.pdfReader = a;
        toSignReq_PosSign.toSignLst = a2;
    }
}


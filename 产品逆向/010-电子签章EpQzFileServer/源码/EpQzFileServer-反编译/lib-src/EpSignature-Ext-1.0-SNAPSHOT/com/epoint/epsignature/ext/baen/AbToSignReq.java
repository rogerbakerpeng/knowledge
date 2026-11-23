/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.baen;

import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.ext.model.DetectParams;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.util.List;

public abstract class AbToSignReq {
    protected List<DetectParams> toSignLst;
    protected SignReq.PreaseResult preaseresult = null;
    protected PdfReader pdfReader;

    public AbToSignReq() {
        AbToSignReq a;
    }

    public abstract ParseResult getSignPos() throws Exception;

    public class ParseResult {
        private /* synthetic */ List<DetectParams> b;

        public void setToSignList(List<DetectParams> a) {
            a.b = a;
        }

        public List<DetectParams> getToSignList() {
            ParseResult a;
            return a.b;
        }

        public ParseResult(List<DetectParams> a2) {
            ParseResult a3;
            a3.b = a2;
        }
    }
}


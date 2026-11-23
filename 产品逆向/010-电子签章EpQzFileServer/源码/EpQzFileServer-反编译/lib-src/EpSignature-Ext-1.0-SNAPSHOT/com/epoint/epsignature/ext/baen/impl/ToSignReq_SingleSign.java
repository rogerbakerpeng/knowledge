/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.baen.impl;

import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.ext.baen.AbToSignReq;
import com.epoint.epsignature.ext.model.DetectParams;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ToSignReq_SingleSign
extends AbToSignReq {
    @Override
    public AbToSignReq.ParseResult getSignPos() throws Exception {
        ToSignReq_SingleSign a;
        Iterator iterator;
        Iterator iterator2 = iterator = a.toSignLst.iterator();
        while (iterator2.hasNext()) {
            DetectParams detectParams = (DetectParams)iterator.next();
            ArrayList<ComSignReq.Position> arrayList = new ArrayList<ComSignReq.Position>();
            ComSignReq.Position position = new ComSignReq.Position();
            iterator2 = iterator;
            ComSignReq.Position position2 = position;
            DetectParams detectParams2 = detectParams;
            position.setX(detectParams2.getX());
            position2.setY(detectParams2.getY());
            position2.setPage(detectParams.getPagenum());
            arrayList.add(position2);
            detectParams.setPositionLst(arrayList);
        }
        ToSignReq_SingleSign toSignReq_SingleSign = a;
        return toSignReq_SingleSign.new AbToSignReq.ParseResult(toSignReq_SingleSign.toSignLst);
    }

    public ToSignReq_SingleSign(PdfReader a, List<DetectParams> a2) {
        ToSignReq_SingleSign a3;
        ToSignReq_SingleSign toSignReq_SingleSign = a3;
        toSignReq_SingleSign.pdfReader = a;
        toSignReq_SingleSign.toSignLst = a2;
    }
}


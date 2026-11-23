/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.baen.impl;

import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.ext.baen.AbToSignReq;
import com.epoint.epsignature.ext.model.DetectParams;
import com.epoint.epsignature.ext.model.DocumentSealAnchors;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ToSignReq_MultiPageSign
extends AbToSignReq {
    @Override
    public AbToSignReq.ParseResult getSignPos() throws Exception {
        ToSignReq_MultiPageSign a;
        Iterator iterator;
        ArrayList<ComSignReq.Position> arrayList = new ArrayList<ComSignReq.Position>();
        Iterator iterator2 = iterator = a.toSignLst.iterator();
        while (iterator2.hasNext()) {
            DetectParams detectParams = (DetectParams)iterator.next();
            String[] stringArray = detectParams.getPagerange().split(DocumentSealAnchors.F("Y"));
            int n = Integer.valueOf(stringArray[0]);
            int n2 = Integer.valueOf(stringArray[1]);
            int n3 = n = n;
            while (n3 <= n2) {
                ComSignReq.Position position;
                ComSignReq.Position position2 = position = new ComSignReq.Position();
                DetectParams detectParams2 = detectParams;
                position.setX(detectParams2.getX());
                position2.setY(detectParams2.getY());
                position2.setPage(++n);
                arrayList.add(position2);
                n3 = n;
            }
            detectParams.setPositionLst(arrayList);
            iterator2 = iterator;
        }
        ToSignReq_MultiPageSign toSignReq_MultiPageSign = a;
        return toSignReq_MultiPageSign.new AbToSignReq.ParseResult(toSignReq_MultiPageSign.toSignLst);
    }

    public ToSignReq_MultiPageSign(PdfReader a, List<DetectParams> a2) {
        ToSignReq_MultiPageSign a3;
        ToSignReq_MultiPageSign toSignReq_MultiPageSign = a3;
        toSignReq_MultiPageSign.pdfReader = a;
        toSignReq_MultiPageSign.toSignLst = a2;
    }
}


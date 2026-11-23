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

public class ToSignReq_CrossSign
extends AbToSignReq {
    @Override
    public AbToSignReq.ParseResult getSignPos() throws Exception {
        ToSignReq_CrossSign a;
        Iterator iterator;
        ArrayList<ComSignReq.Position> arrayList = new ArrayList<ComSignReq.Position>();
        Iterator iterator2 = iterator = a.toSignLst.iterator();
        while (iterator2.hasNext()) {
            int n;
            DetectParams detectParams = (DetectParams)iterator.next();
            int n2 = n = 0;
            while (n2 <= a.pdfReader.getNumberOfPages()) {
                ComSignReq.Position position;
                ComSignReq.Position position2 = position = new ComSignReq.Position();
                DetectParams detectParams2 = detectParams;
                position.setX(detectParams2.getX());
                position2.setY(detectParams2.getY());
                position2.setPage(++n);
                arrayList.add(position2);
                n2 = n;
            }
            detectParams.setPositionLst(arrayList);
            iterator2 = iterator;
        }
        ToSignReq_CrossSign toSignReq_CrossSign = a;
        return toSignReq_CrossSign.new AbToSignReq.ParseResult(toSignReq_CrossSign.toSignLst);
    }

    public ToSignReq_CrossSign(PdfReader a, List<DetectParams> a2) {
        ToSignReq_CrossSign a3;
        ToSignReq_CrossSign toSignReq_CrossSign = a3;
        toSignReq_CrossSign.pdfReader = a;
        toSignReq_CrossSign.toSignLst = a2;
    }
}


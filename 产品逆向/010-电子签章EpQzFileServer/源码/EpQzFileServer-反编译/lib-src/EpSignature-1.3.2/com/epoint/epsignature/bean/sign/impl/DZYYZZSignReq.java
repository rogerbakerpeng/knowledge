/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign.impl;

import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.Rectangle;
import java.util.ArrayList;
import java.util.UUID;

public class DZYYZZSignReq
extends SignReq {
    @Override
    public SignReq.PreaseResult parseSigns() throws Exception {
        DZYYZZSignReq a;
        if (a.preaseresult == null) {
            ArrayList<SignInfo> arrayList = new ArrayList<SignInfo>();
            Rectangle rectangle = new Rectangle(0.0f, 0.0f);
            arrayList.add(new SignInfo(rectangle, 1, 0.0f, 0.0f, "", null, UUID.randomUUID().toString()));
            a.preaseresult = a.new SignReq.PreaseResult(arrayList);
        }
        return a.preaseresult;
    }

    public DZYYZZSignReq() {
        DZYYZZSignReq a;
    }
}


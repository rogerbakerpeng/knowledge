/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.factory;

import com.epoint.epsignature.ext.baen.AbToSignReq;
import com.epoint.epsignature.ext.model.AnchorPoint;
import com.epoint.epsignature.ext.model.DetectParams;
import com.epoint.epsignature.ext.model.DocumentSealAnchors;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

public class ToSignReqFactory {
    public static final String PACKAGENAME = "com.epoint.epsignature.ext.baen.impl";
    public static final String PREFIX = "ToSignReq_";
    private static Logger log = LogManager.getLogger(ToSignReqFactory.class);

    public static AbToSignReq getSignReq(String a, PdfReader a2, List<DetectParams> a3) {
        try {
            Class<?> clazz = Class.forName(new StringBuilder().insert(0, AnchorPoint.F("E}K<CbI{Hf\bwVaOuHsRgTw\bw^f\bpGwH<O\u007fV~\bFIAOuH@Ccy")).append(a).toString());
            Class[] classArray = new Class[2];
            classArray[0] = PdfReader.class;
            classArray[1] = List.class;
            Object[] objectArray = new Object[2];
            objectArray[0] = a2;
            objectArray[1] = a3;
            a2 = clazz.getConstructor(classArray).newInstance(objectArray);
        }
        catch (ClassNotFoundException | IllegalAccessException | InstantiationException | NoSuchMethodException | InvocationTargetException reflectiveOperationException) {
            throw new RuntimeException(DocumentSealAnchors.F("\u0013B\u0000t\u001d@\u001au\u0011V\u5f76\u5e1f\uff6e"), reflectiveOperationException);
        }
        log.info(new StringBuilder().insert(0, AnchorPoint.F("FIAOuH@Cc`sEfI`_2\u67a2\u9032\u5baa\u6202\uff3c")).append(a2.getClass().getName()).toString());
        return (AbToSignReq)((Object)a2);
    }

    public ToSignReqFactory() {
        ToSignReqFactory a;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfsignatureinfo.factory;

import com.epoint.epsignature.bean.CertInfo;
import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;
import com.epoint.epsignature.pdfsignatureinfo.strategy.PdfVerifyByCatypeStrategy;
import com.epoint.epsignature.pdfsignatureinfo.strategy.impl.ShangHaiCAPdfVerifyStrategy;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.log4j.Logger;

public class PdfVerifyByCatypeStrategyFactory {
    private static Logger log = Logger.getLogger(PdfVerifyByCatypeStrategyFactory.class);
    private static final Map<String, PdfVerifyByCatypeStrategy> STRATEGY_MAP = new ConcurrentHashMap<String, PdfVerifyByCatypeStrategy>();

    private static /* synthetic */ void J(String a, PdfVerifyByCatypeStrategy a2) {
        if (a == null || a.trim().isEmpty()) {
            throw new IllegalArgumentException(UnauthorizedAccessException.J("\u7c2c\u5787\u4eb4\u780d\u4e5a\u80f1\u4e6d\u7a76"));
        }
        if (a2 == null) {
            throw new IllegalArgumentException(CertInfo.J("\u7b53\u7555\u5b9b\u4fbb\u4e08\u80cd\u4e3f\u7a4a"));
        }
        STRATEGY_MAP.put(a, a2);
    }

    private static /* synthetic */ void J() {
        ShangHaiCAPdfVerifyStrategy shangHaiCAPdfVerifyStrategy = new ShangHaiCAPdfVerifyStrategy();
        PdfVerifyByCatypeStrategyFactory.J(UnauthorizedAccessException.J(">a="), shangHaiCAPdfVerifyStrategy);
    }

    static {
        PdfVerifyByCatypeStrategyFactory.J();
    }

    public static PdfVerifyByCatypeStrategy getStrategy(String a) {
        return STRATEGY_MAP.get(a);
    }

    public static boolean containsStrategy(String a) {
        return STRATEGY_MAP.containsKey(a);
    }

    public PdfVerifyByCatypeStrategyFactory() {
        PdfVerifyByCatypeStrategyFactory a;
    }
}


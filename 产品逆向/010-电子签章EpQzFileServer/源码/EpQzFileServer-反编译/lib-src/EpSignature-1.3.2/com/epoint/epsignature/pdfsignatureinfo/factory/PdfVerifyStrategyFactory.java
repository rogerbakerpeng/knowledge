/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfsignatureinfo.factory;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.pdfsignatureinfo.strategy.PdfVerifyStrategy;
import com.epoint.epsignature.pdfsignatureinfo.strategy.impl.H5AndZZPdfVerifyStrategy;
import com.epoint.epsignature.pdfsignatureinfo.strategy.impl.H5PdfVerifyStrategy;
import com.epoint.epsignature.pdfsignatureinfo.strategy.impl.TZGMPdfVerifyStrategy;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.log4j.Logger;

public class PdfVerifyStrategyFactory {
    private static final Map<String, PdfVerifyStrategy> STRATEGY_MAP;
    private static Logger log;

    public static boolean containsStrategy(String a) {
        return STRATEGY_MAP.containsKey(a);
    }

    public static PdfVerifyStrategy getStrategy(String a) {
        PdfVerifyStrategy pdfVerifyStrategy = STRATEGY_MAP.get(a);
        if (pdfVerifyStrategy == null) {
            throw new IllegalArgumentException(new StringBuilder().insert(0, CertObject.J("\u4e1b\u653a\u6317\u7691FQP\u7c6e\u579d/6")).append(a).toString());
        }
        return pdfVerifyStrategy;
    }

    public PdfVerifyStrategyFactory() {
        PdfVerifyStrategyFactory a;
    }

    private static /* synthetic */ void J() {
        H5PdfVerifyStrategy h5PdfVerifyStrategy = new H5PdfVerifyStrategy();
        TZGMPdfVerifyStrategy tZGMPdfVerifyStrategy = new TZGMPdfVerifyStrategy();
        H5AndZZPdfVerifyStrategy h5AndZZPdfVerifyStrategy = new H5AndZZPdfVerifyStrategy();
        PdfVerifyStrategyFactory.J(ExEpSignException.J("\u0010D\u0012"), h5PdfVerifyStrategy);
        PdfVerifyStrategyFactory.J(CertObject.J("$%\""), h5PdfVerifyStrategy);
        PdfVerifyStrategyFactory.J(ExEpSignException.J("M\u001b"), h5PdfVerifyStrategy);
        PdfVerifyStrategyFactory.J(CertObject.J(" \""), tZGMPdfVerifyStrategy);
        PdfVerifyStrategyFactory.J(ExEpSignException.J("\u001bM\u001b"), h5AndZZPdfVerifyStrategy);
    }

    static {
        log = Logger.getLogger(PdfVerifyStrategyFactory.class);
        STRATEGY_MAP = new ConcurrentHashMap<String, PdfVerifyStrategy>();
        PdfVerifyStrategyFactory.J();
    }

    private static /* synthetic */ void J(String a, PdfVerifyStrategy a2) {
        if (a == null || a.trim().isEmpty()) {
            throw new IllegalArgumentException(CertObject.J("\u7c6e\u579d\u4ef6\u7817\u4e18\u80eb\u4e2f\u7a6c"));
        }
        if (a2 == null) {
            throw new IllegalArgumentException(ExEpSignException.J("\u7b22\u7547\u5bea\u4fa9\u4e79\u80df\u4e4e\u7a58"));
        }
        STRATEGY_MAP.put(a, a2);
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.tsaimpl;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.tsaimpl.BJCATSAClientImp;
import com.epoint.epsignature.tsaimpl.BJCATsaUtil;
import com.epoint.epsignature.tsaimpl.ChangShaTSAClientImp;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.itextpdf.text.pdf.security.TSAClient;
import org.apache.log4j.Logger;

public class TSAClientFactory {
    private static String tsaProvider;
    public static boolean ENABLETSA;
    private static String CHANGSHA;
    private static String BJCA;
    private static Logger logger;
    private static volatile TSAClient tsaClientInstance;

    private static /* synthetic */ TSAClient J(String a) {
        TSAClient tSAClient;
        block4: {
            block5: {
                tSAClient = null;
                if (a == null) break block4;
                if (!a.equals(BJCA)) break block5;
                tSAClient = new BJCATSAClientImp();
            }
            try {
                if (a.equals(CHANGSHA)) {
                    tSAClient = new ChangShaTSAClientImp();
                }
            }
            catch (Exception exception) {
                logger.error(new StringBuilder().insert(0, CertObject.J("\u5208\u59dd\u5303\u65e0\u95e1\u6225\u5bec\u8c77\u5924\u8d33\uff19\u65e0\u95e1\u6225\u63c5\u4f8d\u5553\uff0c")).append(a).toString(), exception);
            }
        }
        return tSAClient;
    }

    static {
        logger = Logger.getLogger(BJCATsaUtil.class);
        ENABLETSA = false;
        BJCA = "BJCA";
        CHANGSHA = "CHANGSHA";
        tsaClientInstance = null;
        tsaProvider = "";
        tsaProvider = ConfigUtil.getConfigValue(EpOFDData.J("\\>D"), CertObject.J("bfwEdz`|rpd"));
    }

    public static void setIsEnableTSA(boolean a) {
        ENABLETSA = a;
    }

    public TSAClientFactory() {
        TSAClientFactory a;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Enabled force condition propagation
     * Lifted jumps to return sites
     */
    public static TSAClient getQzInstance() {
        if (tsaClientInstance != null || !StringUtil.isNotBlank(tsaProvider)) return tsaClientInstance;
        Class<TSAClient> clazz = TSAClient.class;
        synchronized (TSAClient.class) {
            if (tsaClientInstance != null) return tsaClientInstance;
            tsaClientInstance = TSAClientFactory.J(tsaProvider);
            // ** MonitorExit[var0] (shouldn't be in output)
            return tsaClientInstance;
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Enabled force condition propagation
     * Lifted jumps to return sites
     */
    public static TSAClient getInstance() {
        if (!ENABLETSA) return null;
        if (tsaClientInstance != null || !StringUtil.isNotBlank(tsaProvider)) return tsaClientInstance;
        Class<TSAClient> clazz = TSAClient.class;
        synchronized (TSAClient.class) {
            if (tsaClientInstance != null) return tsaClientInstance;
            tsaClientInstance = TSAClientFactory.J(tsaProvider);
            // ** MonitorExit[var0] (shouldn't be in output)
            return tsaClientInstance;
        }
    }
}


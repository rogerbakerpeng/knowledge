/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.utils.H;
import com.epoint.epsignature.utils.M;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;

public class SSLUtils {
    public static void ignoreSsl() throws Exception {
        H h = new H();
        SSLUtils.J();
        HttpsURLConnection.setDefaultHostnameVerifier(h);
    }

    public SSLUtils() {
        SSLUtils a;
    }

    private static /* synthetic */ void J() throws Exception {
        TrustManager[] trustManagerArray = new TrustManager[1];
        M m = new M();
        trustManagerArray[0] = m;
        SSLContext sSLContext = SSLContext.getInstance(VerifyReq.J("4h+"));
        sSLContext.init(null, trustManagerArray, null);
        HttpsURLConnection.setDefaultSSLSocketFactory(sSLContext.getSocketFactory());
    }
}


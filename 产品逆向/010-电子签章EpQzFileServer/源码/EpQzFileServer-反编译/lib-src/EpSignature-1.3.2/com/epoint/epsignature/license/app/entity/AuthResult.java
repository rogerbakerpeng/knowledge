/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.entity;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.enums.LicenseEnum;
import com.epoint.epsignature.license.app.entity.LicenseEntity;
import com.epoint.epsignature.license.app.util.AuthorizationUtil;
import org.apache.log4j.Logger;

public class AuthResult {
    private /* synthetic */ String H;
    private static final String ERROR_MSG = "\u63a7\u4ef6\u6fc0\u6d3b\u5931\u8d25";
    private /* synthetic */ String m;
    private static Logger log = Logger.getLogger(AuthResult.class);
    private /* synthetic */ String g;
    private /* synthetic */ String k;
    private /* synthetic */ String i;
    private /* synthetic */ String A;
    private /* synthetic */ String a;
    private static volatile AuthResult authResult;
    private /* synthetic */ String G;
    private /* synthetic */ String b;

    public void setSoftwareName(String a) {
        a.a = a;
    }

    public void setLiclevel(String a) {
        a.i = a;
    }

    public String getShowmode() {
        AuthResult a;
        return a.k;
    }

    public void setLicdesc(String a) {
        a.H = a;
    }

    public String getSoftwareName() {
        AuthResult a;
        return a.a;
    }

    private static /* synthetic */ AuthResult J(LicenseEntity a) {
        AuthResult authResult;
        block5: {
            authResult = new AuthResult();
            if (a == null) break block5;
            String[] stringArray = new String(a.getSourceData(), "UTF-8").split(PDFHighlightAnnotationReq.J("I"));
            AuthResult authResult2 = authResult;
            AuthResult authResult3 = authResult;
            authResult3.setLicenseResult(LicenseEnum.LicenseResultEnum.\u6210\u529f.getVal());
            authResult3.setLicenseName(stringArray[0]);
            authResult.setPlatformcode(stringArray[1]);
            authResult2.setLicdesc(stringArray[2]);
            authResult2.setSoftwareName(stringArray[3]);
            authResult.setSoftwareId(stringArray[4]);
            if (stringArray.length >= 6) {
                authResult.setLiclevel(stringArray[5]);
            }
            if (stringArray.length >= 7) {
                authResult.setShowmode(stringArray[5]);
            }
        }
        try {
            authResult.setLicenseResult(LicenseEnum.LicenseResultEnum.\u5931\u8d25.getVal());
            authResult.setLicenseError(ERROR_MSG);
        }
        catch (Exception exception) {
            log.error(EpOFDData.J("@#J&g?R\"t/U?J>d3j#E/H9C\u000fH>O>_"), exception);
        }
        return authResult;
    }

    public void setShowmode(String a) {
        a.k = a;
    }

    public void setLicenseResult(String a) {
        a.b = a;
    }

    public void setSoftwareId(String a) {
        a.A = a;
    }

    public void setLicenseName(String a) {
        a.m = a;
    }

    private /* synthetic */ AuthResult() {
        AuthResult a;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Enabled force condition propagation
     * Lifted jumps to return sites
     */
    public static synchronized AuthResult getInstance() {
        if (authResult != null && !LicenseEnum.LicenseResultEnum.\u5931\u8d25.getVal().equals(authResult.getLicenseResult())) return authResult;
        Class<AuthResult> clazz = AuthResult.class;
        synchronized (AuthResult.class) {
            if (authResult != null && !LicenseEnum.LicenseResultEnum.\u5931\u8d25.getVal().equals(authResult.getLicenseResult())) return authResult;
            authResult = AuthResult.J(AuthorizationUtil.checkLic());
            // ** MonitorExit[var0] (shouldn't be in output)
            return authResult;
        }
    }

    public String getLicenseName() {
        AuthResult a;
        return a.m;
    }

    public void setPlatformcode(String a) {
        a.G = a;
    }

    public String getLicenseResult() {
        AuthResult a;
        return a.b;
    }

    public String getLiclevel() {
        AuthResult a;
        return a.i;
    }

    public void setLicenseError(String a) {
        a.g = a;
    }

    public String getLicenseError() {
        AuthResult a;
        return a.g;
    }

    public String getLicdesc() {
        AuthResult a;
        return a.H;
    }

    public String getSoftwareId() {
        AuthResult a;
        return a.A;
    }

    public String getPlatformcode() {
        AuthResult a;
        return a.G;
    }
}


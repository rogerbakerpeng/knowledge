/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean;

import java.security.cert.X509Certificate;
import java.util.Date;

public class CertInfo {
    private String pubKey;
    private Date notAfter;
    private String clientSignCertCN;
    private String clientSignCertSN;
    private X509Certificate cert;
    private String certYouXiaoQi;
    private Date notBefore;
    private String bfjg;

    public String getBfjg() {
        CertInfo a;
        return a.bfjg;
    }

    public Date getNotBefore() {
        CertInfo a;
        return a.notBefore;
    }

    public String getCertYouXiaoQi() {
        CertInfo a;
        return a.certYouXiaoQi;
    }

    public String getClientSignCertSN() {
        CertInfo a;
        return a.clientSignCertSN;
    }

    public void setBfjg(String a) {
        a.bfjg = a;
    }

    public void setClientSignCertCN(String a) {
        a.clientSignCertCN = a;
    }

    public void setPubKey(String a) {
        a.pubKey = a;
    }

    public X509Certificate getCert() {
        CertInfo a;
        return a.cert;
    }

    public void setNotAfter(Date a) {
        a.notAfter = a;
    }

    public void setCertYouXiaoQi(String a) {
        a.certYouXiaoQi = a;
    }

    public void setNotBefore(Date a) {
        a.notBefore = a;
    }

    public void setCert(X509Certificate a) {
        a.cert = a;
    }

    public String getClientSignCertCN() {
        CertInfo a;
        return a.clientSignCertCN;
    }

    public CertInfo() {
        CertInfo a;
    }

    public void setClientSignCertSN(String a) {
        a.clientSignCertSN = a;
    }

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 5;
        int cfr_ignored_0 = (3 ^ 5) << 4;
        int n4 = n2;
        int n5 = (3 ^ 5) << 3;
        while (n4 >= 0) {
            int n6 = n2--;
            cArray[n6] = (char)(a.charAt(n6) ^ n5);
            if (n2 < 0) break;
            int n7 = n2--;
            cArray[n7] = (char)(a.charAt(n7) ^ n3);
            n4 = n2;
        }
        return new String(cArray);
    }

    public Date getNotAfter() {
        CertInfo a;
        return a.notAfter;
    }

    public String getPubKey() {
        CertInfo a;
        return a.pubKey;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign;

import java.util.Map;

public class SignatureInfo {
    private String bfjg;
    private String signid;
    private Timestamp timestamp;
    private Cert cert;
    private String location;
    private String id;
    private boolean isIntegrity;
    private long signdate;
    private String org;
    private String signature;
    private String signImg;
    private Postion pos;
    private String reason;
    private Map<String, String> ext;
    public String ref_id;
    private int page;

    public void setId(String a) {
        a.id = a;
    }

    public void setCert(Cert a) {
        a.cert = a;
    }

    public void setSignid(String a) {
        a.signid = a;
    }

    public String getOrg() {
        SignatureInfo a;
        return a.org;
    }

    public void setOrg(String a) {
        a.org = a;
    }

    public Map<String, String> getExt() {
        SignatureInfo a;
        return a.ext;
    }

    public void setReason(String a) {
        a.reason = a;
    }

    public Cert getCert() {
        SignatureInfo a;
        return a.cert;
    }

    public String getReason() {
        SignatureInfo a;
        return a.reason;
    }

    public String getId() {
        SignatureInfo a;
        return a.id;
    }

    public Postion getPos() {
        SignatureInfo a;
        return a.pos;
    }

    public String getLocation() {
        SignatureInfo a;
        return a.location;
    }

    public Timestamp getTimestamp() {
        SignatureInfo a;
        return a.timestamp;
    }

    public void setPage(int a) {
        a.page = a;
    }

    public String getBfjg() {
        SignatureInfo a;
        return a.bfjg;
    }

    public void setIsIntegrity(boolean a) {
        a.isIntegrity = a;
    }

    public void setSignImg(String a) {
        a.signImg = a;
    }

    public int getPage() {
        SignatureInfo a;
        return a.page;
    }

    public void setLocation(String a) {
        a.location = a;
    }

    public void setIntegrity(boolean a) {
        a.isIntegrity = a;
    }

    public String getRef_id() {
        SignatureInfo a;
        return a.ref_id;
    }

    public void setBfjg(String a) {
        a.bfjg = a;
    }

    public void setTimestamp(Timestamp a) {
        a.timestamp = a;
    }

    public String getSignature() {
        SignatureInfo a;
        return a.signature;
    }

    public void setSigndate(long a) {
        a.signdate = a;
    }

    public String getSignImg() {
        SignatureInfo a;
        return a.signImg;
    }

    public String getSignid() {
        SignatureInfo a;
        return a.signid;
    }

    public void setSignature(String a) {
        a.signature = a;
    }

    public long getSigndate() {
        SignatureInfo a;
        return a.signdate;
    }

    public void setRef_id(String a) {
        a.ref_id = a;
    }

    public void setPos(Postion a) {
        a.pos = a;
    }

    public void setExt(Map<String, String> a) {
        a.ext = a;
    }

    public SignatureInfo() {
        SignatureInfo a;
    }

    public boolean getIsIntegrity() {
        SignatureInfo a;
        return a.isIntegrity;
    }

    public static class Timestamp {
        private boolean verified;
        private String signer;
        private String base64Cert;
        private long time;

        public void setSigner(String a) {
            a.signer = a;
        }

        public void setVerified(boolean a) {
            a.verified = a;
        }

        public boolean isVerified() {
            Timestamp a;
            return a.verified;
        }

        public String getSigner() {
            Timestamp a;
            return a.signer;
        }

        public String getBase64Cert() {
            Timestamp a;
            return a.base64Cert;
        }

        public long getTime() {
            Timestamp a;
            return a.time;
        }

        public Timestamp() {
            Timestamp a;
        }

        public void setTime(long a) {
            a.time = a;
        }

        public void setBase64Cert(String a) {
            a.base64Cert = a;
        }
    }

    public static class Cert {
        private String signer;
        private String base64Cert;
        private String sigAlg;
        private String serialNumber;

        public Cert() {
            Cert a;
        }

        public void setBase64Cert(String a) {
            a.base64Cert = a;
        }

        public String getSigner() {
            Cert a;
            return a.signer;
        }

        public void setSigner(String a) {
            a.signer = a;
        }

        public void setSerialNumber(String a) {
            a.serialNumber = a;
        }

        public Cert(String a, String a2, String a3, String a4) {
            Cert a5;
            Cert cert = a5;
            Cert cert2 = a5;
            cert2.serialNumber = a;
            cert2.base64Cert = a2;
            cert.sigAlg = a3;
            cert.signer = a4;
        }

        public void setSigAlg(String a) {
            a.sigAlg = a;
        }

        public String getBase64Cert() {
            Cert a;
            return a.base64Cert;
        }

        public String getSerialNumber() {
            Cert a;
            return a.serialNumber;
        }

        public String getSigAlg() {
            Cert a;
            return a.sigAlg;
        }
    }

    public static class Postion {
        private float x;
        private int page;
        private float y;

        public float getY() {
            Postion a;
            return a.y;
        }

        public Postion(int a, float a2, float a3) {
            Postion a4;
            Postion postion = a4;
            a4.page = a;
            postion.x = a2;
            postion.y = a3;
        }

        public Postion() {
            Postion a;
        }

        public void setPage(int a) {
            a.page = a;
        }

        public void setX(float a) {
            a.x = a;
        }

        public float getX() {
            Postion a;
            return a.x;
        }

        public void setY(float a) {
            a.y = a;
        }

        public int getPage() {
            Postion a;
            return a.page;
        }
    }
}


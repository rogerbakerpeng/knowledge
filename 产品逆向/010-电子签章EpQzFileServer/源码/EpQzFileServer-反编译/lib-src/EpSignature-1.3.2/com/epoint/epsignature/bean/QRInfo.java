/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean;

import com.epoint.epsignature.bean.CertObject;
import java.util.List;
import java.util.Map;

public class QRInfo {
    private List<DecryptObject> decryptobjects;
    private CertObject certobject;
    private List<OCts> oCts;
    private String platformcode;
    private Integer remaintime;
    private long timestamp;
    private List<SignatureObject> signatureobjects;
    private Map<String, Object> ext;
    private String qrcodetype;

    public void setSignatureobjects(List<SignatureObject> a) {
        a.signatureobjects = a;
    }

    public Map<String, Object> getExt() {
        QRInfo a;
        return a.ext;
    }

    public void setCertobject(CertObject a) {
        a.certobject = a;
    }

    public String getPlatformcode() {
        QRInfo a;
        return a.platformcode;
    }

    public List<SignatureObject> getSignatureobjects() {
        QRInfo a;
        return a.signatureobjects;
    }

    public List<DecryptObject> getDecryptobjects() {
        QRInfo a;
        return a.decryptobjects;
    }

    public long getTimestamp() {
        QRInfo a;
        return a.timestamp;
    }

    public List<OCts> getoCts() {
        QRInfo a;
        return a.oCts;
    }

    public void setQrcodetype(String a) {
        a.qrcodetype = a;
    }

    public void setTimestamp(long a) {
        a.timestamp = a;
    }

    public void setoCts(List<OCts> a) {
        a.oCts = a;
    }

    public void setExt(Map<String, Object> a) {
        a.ext = a;
    }

    public QRInfo(String a, String a2, long a3, CertObject a4, List<DecryptObject> a5, List<SignatureObject> a6, Map<String, Object> a7, Integer a8) {
        QRInfo a9;
        QRInfo qRInfo = a9;
        QRInfo qRInfo2 = a9;
        QRInfo qRInfo3 = a9;
        QRInfo qRInfo4 = a9;
        qRInfo4.qrcodetype = a;
        qRInfo4.platformcode = a2;
        qRInfo3.timestamp = a3;
        qRInfo3.certobject = a4;
        qRInfo2.decryptobjects = a5;
        qRInfo2.signatureobjects = a6;
        qRInfo.ext = a7;
        qRInfo.remaintime = a8;
    }

    public CertObject getCertobject() {
        QRInfo a;
        return a.certobject;
    }

    public void setDecryptobjects(List<DecryptObject> a) {
        a.decryptobjects = a;
    }

    public QRInfo() {
        QRInfo a;
    }

    public Integer getRemaintime() {
        QRInfo a;
        return a.remaintime;
    }

    public void setPlatformcode(String a) {
        a.platformcode = a;
    }

    public String getQrcodetype() {
        QRInfo a;
        return a.qrcodetype;
    }

    public void setRemaintime(Integer a) {
        a.remaintime = a;
    }

    public static class OCts {
        private String decryptcert;
        private String sn;

        public String getSn() {
            OCts a;
            return a.sn;
        }

        public OCts() {
            OCts a;
        }

        public String getDecryptcert() {
            OCts a;
            return a.decryptcert;
        }

        public void setSn(String a) {
            a.sn = a;
        }

        public void setDecryptcert(String a) {
            a.decryptcert = a;
        }
    }

    public static class SignatureObject {
        private String desc;
        private String org;
        private String signed;
        private String oid;

        public void setOid(String a) {
            a.oid = a;
        }

        public void setSigned(String a) {
            a.signed = a;
        }

        public String getDesc() {
            SignatureObject a;
            return a.desc;
        }

        public SignatureObject() {
            SignatureObject a;
        }

        public SignatureObject(String a, String a2, String a3, String a4) {
            SignatureObject a5;
            SignatureObject signatureObject = a5;
            SignatureObject signatureObject2 = a5;
            signatureObject2.oid = a;
            signatureObject2.org = a2;
            signatureObject.signed = a3;
            signatureObject.desc = a4;
        }

        public String getSigned() {
            SignatureObject a;
            return a.signed;
        }

        public void setDesc(String a) {
            a.desc = a;
        }

        public String getOrg() {
            SignatureObject a;
            return a.org;
        }

        public void setOrg(String a) {
            a.org = a;
        }

        public String getOid() {
            SignatureObject a;
            return a.oid;
        }
    }

    public static class DecryptObject {
        private String oid;
        private Boolean result;
        private String encryed;
        private String org;
        private String desc;

        public Boolean getResult() {
            DecryptObject a;
            return a.result;
        }

        public String getOrg() {
            DecryptObject a;
            return a.org;
        }

        public void setOrg(String a) {
            a.org = a;
        }

        public String getOid() {
            DecryptObject a;
            return a.oid;
        }

        public void setResult(Boolean a) {
            a.result = a;
        }

        public void setOid(String a) {
            a.oid = a;
        }

        public String getEncryed() {
            DecryptObject a;
            return a.encryed;
        }

        public String getDesc() {
            DecryptObject a;
            return a.desc;
        }

        public void setEncryed(String a) {
            a.encryed = a;
        }

        public DecryptObject() {
            DecryptObject a;
        }

        public void setDesc(String a) {
            a.desc = a;
        }
    }
}


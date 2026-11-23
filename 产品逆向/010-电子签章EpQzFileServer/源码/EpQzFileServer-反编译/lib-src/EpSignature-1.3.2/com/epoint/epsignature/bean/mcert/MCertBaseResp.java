/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.mcert;

import com.epoint.epsignature.bean.CertObject;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.sign.Seal;
import java.util.List;

public class MCertBaseResp {
    private Custom custom;
    private Status status;

    public void setCustom(Custom a) {
        a.custom = a;
    }

    public Custom getCustom() {
        MCertBaseResp a;
        return a.custom;
    }

    public Status getStatus() {
        MCertBaseResp a;
        return a.status;
    }

    public void setStatus(Status a) {
        a.status = a;
    }

    public MCertBaseResp() {
        MCertBaseResp a;
    }

    public static class Custom {
        private QRInfo qrinfo;
        private String qrcodeid;
        private List<Seal> seals;
        private String qrstatus;
        private CertObject certobject;

        public void setQrinfo(QRInfo a) {
            a.qrinfo = a;
        }

        public CertObject getCertobject() {
            Custom a;
            return a.certobject;
        }

        public List<Seal> getSeals() {
            Custom a;
            return a.seals;
        }

        public void setSeals(List<Seal> a) {
            a.seals = a;
        }

        public void setQrstatus(String a) {
            a.qrstatus = a;
        }

        public QRInfo getQrinfo() {
            Custom a;
            return a.qrinfo;
        }

        public void setQrcodeid(String a) {
            a.qrcodeid = a;
        }

        public Custom() {
            Custom a;
        }

        public void setCertobject(CertObject a) {
            a.certobject = a;
        }

        public String getQrstatus() {
            Custom a;
            return a.qrstatus;
        }

        public String getQrcodeid() {
            Custom a;
            return a.qrcodeid;
        }
    }

    public static class Status {
        private String text;
        private int code;

        public Status() {
            Status a;
        }

        public String getText() {
            Status a;
            return a.text;
        }

        public int getCode() {
            Status a;
            return a.code;
        }

        public void setCode(int a) {
            a.code = a;
        }

        public void setText(String a) {
            a.text = a;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.mcert;

public class MCertBaseReq {
    private Head head;
    private Object params;

    public void setParams(Object a) {
        a.params = a;
    }

    public Object getParams() {
        MCertBaseReq a;
        return a.params;
    }

    public void setHead(Head a) {
        a.head = a;
    }

    public Head getHead() {
        MCertBaseReq a;
        return a.head;
    }

    public MCertBaseReq() {
        MCertBaseReq a;
    }

    public static class Head {
        private long timestamp;
        private String platformcode;
        private String token;

        public Head(String a, long a2, String a3) {
            Head a4;
            Head head = a4;
            a4.platformcode = a;
            head.timestamp = a2;
            head.token = a3;
        }

        public void setPlatformcode(String a) {
            a.platformcode = a;
        }

        public String getToken() {
            Head a;
            return a.token;
        }

        public long getTimestamp() {
            Head a;
            return a.timestamp;
        }

        public Head() {
            Head a;
        }

        public void setTimestamp(long a) {
            a.timestamp = a;
        }

        public String getPlatformcode() {
            Head a;
            return a.platformcode;
        }

        public void setToken(String a) {
            a.token = a;
        }
    }
}


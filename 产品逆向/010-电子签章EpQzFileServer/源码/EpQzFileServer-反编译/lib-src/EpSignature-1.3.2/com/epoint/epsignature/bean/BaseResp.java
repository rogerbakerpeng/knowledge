/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean;

public class BaseResp {
    private Status status;
    private Object custom;

    public void setStatus(Status a) {
        a.status = a;
    }

    public static BaseResp returnError(int a, String a2) {
        return new BaseResp(new Status(a, a2), null);
    }

    public void setCustom(Object a) {
        a.custom = a;
    }

    public Status getStatus() {
        BaseResp a;
        return a.status;
    }

    public Object getCustom() {
        BaseResp a;
        return a.custom;
    }

    public BaseResp(Status a, Object a2) {
        BaseResp a3;
        BaseResp baseResp = a3;
        baseResp.status = a;
        baseResp.custom = a2;
    }

    public BaseResp() {
        BaseResp a;
    }

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 4 << 4;
        int cfr_ignored_0 = 5 << 4 ^ 5 << 1;
        int n4 = n2;
        int n5 = 4 << 4 ^ (2 ^ 5) << 1;
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

    public static BaseResp returnSuccess(Object a) {
        return new BaseResp(new Status(0, ""), a);
    }

    public static class Status {
        private String text;
        private int code;

        public String getText() {
            Status a;
            return a.text;
        }

        public void setCode(int a) {
            a.code = a;
        }

        public int getCode() {
            Status a;
            return a.code;
        }

        public void setText(String a) {
            a.text = a;
        }

        public Status(int a, String a2) {
            Status a3;
            Status status = a3;
            status.code = a;
            status.text = a2;
        }

        public Status() {
            Status a;
        }
    }
}


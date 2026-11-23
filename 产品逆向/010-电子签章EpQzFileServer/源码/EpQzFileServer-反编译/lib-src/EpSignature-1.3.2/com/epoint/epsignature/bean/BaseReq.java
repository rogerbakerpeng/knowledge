/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean;

public class BaseReq {
    private Object request;
    private String action;

    public Object getRequest() {
        BaseReq a;
        return a.request;
    }

    public BaseReq() {
        BaseReq a;
    }

    public void setAction(String a) {
        a.action = a;
    }

    public String getAction() {
        BaseReq a;
        return a.action;
    }

    public void setRequest(Object a) {
        a.request = a;
    }

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = (2 ^ 5) << 4 ^ 3;
        int cfr_ignored_0 = (3 ^ 5) << 4 ^ (2 ^ 5) << 1;
        int n4 = n2;
        int n5 = (3 ^ 5) << 3 ^ 2;
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
}


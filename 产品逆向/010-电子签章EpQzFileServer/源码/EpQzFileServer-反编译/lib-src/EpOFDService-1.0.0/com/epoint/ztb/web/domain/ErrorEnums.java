/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.web.domain;

public enum ErrorEnums {
    SUCCESS("00000", "\u4e00\u5207\u6b63\u5e38"),
    CLIENT_ERROR("A0001", "\u5ba2\u6237\u7aef\u9519\u8bef"),
    SERVER_ERROR("B0001", "\u7cfb\u7edf\u6267\u884c\u51fa\u9519"),
    THIRD_PART_SERVICE_ERROR("C0001", "\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");

    private String code;
    private String msg;

    private ErrorEnums(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getCode() {
        return this.code;
    }

    public String getMsg() {
        return this.msg;
    }
}


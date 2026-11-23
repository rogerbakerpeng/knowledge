/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.enums;

public enum ResponseEnum {
    请求失败(0),
    请求成功(1);

    Integer val;

    private ResponseEnum(Integer val) {
        this.val = val;
    }

    public Integer getValue() {
        return this.val;
    }

    public static ResponseEnum getByValue(Integer type) {
        for (ResponseEnum item : ResponseEnum.values()) {
            if (!item.getValue().equals(type)) continue;
            return item;
        }
        return null;
    }
}


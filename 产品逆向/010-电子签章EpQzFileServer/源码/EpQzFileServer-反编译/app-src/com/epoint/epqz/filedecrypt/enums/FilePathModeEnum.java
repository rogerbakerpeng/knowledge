/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.enums;

public enum FilePathModeEnum {
    不加密(0),
    SM4加密(1);

    Integer val;

    private FilePathModeEnum(Integer val) {
        this.val = val;
    }

    public Integer getValue() {
        return this.val;
    }

    public static FilePathModeEnum getByValue(Integer type) {
        for (FilePathModeEnum item : FilePathModeEnum.values()) {
            if (!item.getValue().equals(type)) continue;
            return item;
        }
        return null;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.enums;

public enum BZTQRCodeTypeEnum {
    解密("5");

    String val;

    private BZTQRCodeTypeEnum(String val) {
        this.val = val;
    }

    public String getValue() {
        return this.val;
    }

    public static BZTQRCodeTypeEnum getByValue(String type) {
        for (BZTQRCodeTypeEnum item : BZTQRCodeTypeEnum.values()) {
            if (!item.getValue().equals(type)) continue;
            return item;
        }
        return null;
    }
}


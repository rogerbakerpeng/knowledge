/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.enums;

public enum BZTQRStatusEnum {
    未扫码("00"),
    已扫码未确认("01"),
    已确认("02"),
    无效("03");

    String val;

    private BZTQRStatusEnum(String val) {
        this.val = val;
    }

    public String getValue() {
        return this.val;
    }

    public static BZTQRStatusEnum getByValue(String type) {
        for (BZTQRStatusEnum item : BZTQRStatusEnum.values()) {
            if (!item.getValue().equals(type)) continue;
            return item;
        }
        return null;
    }
}


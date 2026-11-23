/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.enums;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;

public final class KeySignTypeEnum
extends Enum<KeySignTypeEnum> {
    private static final /* synthetic */ KeySignTypeEnum[] $VALUES;
    public static final /* enum */ KeySignTypeEnum \u7b2c\u4e00\u4e2a\u5173\u952e\u5b57\u7b7e\u7ae0 = new KeySignTypeEnum(DZYYZZReq.J("\u7b14\u4e62\u4e12\u5111\u9516\u5b35\u7b46\u7a82"), 0, "1");
    public static final /* enum */ KeySignTypeEnum \u6bcf\u4e00\u4e2a\u5173\u952e\u5b57\u7b7e\u7ae0 = new KeySignTypeEnum(EpOFDData.J("\u6b85\u4e26\u4e60\u5155\u9564\u5b71\u7b34\u7ac6"), 1, DZYYZZReq.J("P"));
    String b;
    public static final /* enum */ KeySignTypeEnum \u6700\u540e\u4e00\u4e2a\u5173\u952e\u5b57\u7b7e\u7ae0 = new KeySignTypeEnum(EpOFDData.J("\u6726\u5444\u4e26\u4e60\u5155\u9564\u5b71\u7b34\u7ac6"), 2, DZYYZZReq.J("Q"));

    public String getVal() {
        KeySignTypeEnum a;
        return a.b;
    }

    public static KeySignTypeEnum getByValue(String a) {
        int n;
        KeySignTypeEnum[] keySignTypeEnumArray = KeySignTypeEnum.values();
        int n2 = keySignTypeEnumArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            KeySignTypeEnum keySignTypeEnum = keySignTypeEnumArray[n];
            if (keySignTypeEnum.getVal().equals(a)) {
                return keySignTypeEnum;
            }
            n3 = ++n;
        }
        return null;
    }

    public static KeySignTypeEnum valueOf(String a) {
        return Enum.valueOf(KeySignTypeEnum.class, a);
    }

    /*
     * WARNING - Possible parameter corruption
     * WARNING - void declaration
     */
    private /* synthetic */ KeySignTypeEnum(String string) {
        void a;
        void var2_-1;
        void var1_-1;
        KeySignTypeEnum a2;
        a2.b = a;
    }

    static {
        KeySignTypeEnum[] keySignTypeEnumArray = new KeySignTypeEnum[3];
        keySignTypeEnumArray[0] = \u7b2c\u4e00\u4e2a\u5173\u952e\u5b57\u7b7e\u7ae0;
        keySignTypeEnumArray[1] = \u6bcf\u4e00\u4e2a\u5173\u952e\u5b57\u7b7e\u7ae0;
        keySignTypeEnumArray[2] = \u6700\u540e\u4e00\u4e2a\u5173\u952e\u5b57\u7b7e\u7ae0;
        $VALUES = keySignTypeEnumArray;
    }

    public static KeySignTypeEnum[] values() {
        return (KeySignTypeEnum[])$VALUES.clone();
    }
}


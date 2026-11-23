/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfsignatureinfo.enums;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;

public final class ZZSealTypeEnum
extends Enum<ZZSealTypeEnum> {
    public static final /* enum */ ZZSealTypeEnum \u516c\u7ae0;
    public static final /* enum */ ZZSealTypeEnum \u4eba\u540d\u7ae0;
    public static final /* enum */ ZZSealTypeEnum \u6cd5\u5b9a\u4ee3\u8868\u4eba\u7ae0;
    public static final /* enum */ ZZSealTypeEnum \u624b\u5199\u7b7e\u540d;
    public static final /* enum */ ZZSealTypeEnum \u8d22\u52a1\u7ae0;
    private static final /* synthetic */ ZZSealTypeEnum[] $VALUES;
    public static final /* enum */ ZZSealTypeEnum \u5408\u540c\u7ae0;
    String b;

    public static ZZSealTypeEnum[] values() {
        return (ZZSealTypeEnum[])$VALUES.clone();
    }

    public String getVal() {
        ZZSealTypeEnum a;
        return a.b;
    }

    /*
     * WARNING - Possible parameter corruption
     * WARNING - void declaration
     */
    private /* synthetic */ ZZSealTypeEnum(String string) {
        void a;
        void var2_-1;
        void var1_-1;
        ZZSealTypeEnum a2;
        a2.b = a;
    }

    public static ZZSealTypeEnum valueOf(String a) {
        return Enum.valueOf(ZZSealTypeEnum.class, a);
    }

    static {
        \u624b\u5199\u7b7e\u540d = new ZZSealTypeEnum(EpOFDData.J("\u6201\u51bf\u7b34\u542b"), 0, "0");
        \u516c\u7ae0 = new ZZSealTypeEnum(UnauthorizedAccessException.J("\u513b\u7aec"), 1, "1");
        \u5408\u540c\u7ae0 = new ZZSealTypeEnum(EpOFDData.J("\u542e\u5446\u7ac6"), 2, UnauthorizedAccessException.J(">"));
        \u8d22\u52a1\u7ae0 = new ZZSealTypeEnum(EpOFDData.J("\u8d04\u52eb\u7ac6"), 3, UnauthorizedAccessException.J("?"));
        \u4eba\u540d\u7ae0 = new ZZSealTypeEnum(EpOFDData.J("\u4e9c\u5447\u7ac6"), 4, UnauthorizedAccessException.J("8"));
        \u6cd5\u5b9a\u4ee3\u8868\u4eba\u7ae0 = new ZZSealTypeEnum(EpOFDData.J("\u6c9f\u5bbc\u4ea9\u884e\u4ef0\u7ac6"), 5, UnauthorizedAccessException.J("9"));
        ZZSealTypeEnum[] zZSealTypeEnumArray = new ZZSealTypeEnum[6];
        zZSealTypeEnumArray[0] = \u624b\u5199\u7b7e\u540d;
        zZSealTypeEnumArray[1] = \u516c\u7ae0;
        zZSealTypeEnumArray[2] = \u5408\u540c\u7ae0;
        zZSealTypeEnumArray[3] = \u8d22\u52a1\u7ae0;
        zZSealTypeEnumArray[4] = \u4eba\u540d\u7ae0;
        zZSealTypeEnumArray[5] = \u6cd5\u5b9a\u4ee3\u8868\u4eba\u7ae0;
        $VALUES = zZSealTypeEnumArray;
    }

    public static ZZSealTypeEnum getByValue(String a) {
        int n;
        ZZSealTypeEnum[] zZSealTypeEnumArray = ZZSealTypeEnum.values();
        int n2 = zZSealTypeEnumArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            ZZSealTypeEnum zZSealTypeEnum = zZSealTypeEnumArray[n];
            if (zZSealTypeEnum.getVal().equals(a)) {
                return zZSealTypeEnum;
            }
            n3 = ++n;
        }
        return null;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.enums;

import com.epoint.epsignature.ext.model.AnchorPoint;
import com.epoint.epsignature.ext.model.DocumentSealAnchors;

public final class SealTypeEnum
extends Enum<SealTypeEnum> {
    private static final /* synthetic */ SealTypeEnum[] $VALUES;
    public static final /* enum */ SealTypeEnum \u6cd5\u5b9a\u4ee3\u8868\u4eba\u624b\u5199\u7b7e\u540d;
    public static final /* enum */ SealTypeEnum \u7535\u5b50\u79c1\u7ae0;
    public static final /* enum */ SealTypeEnum \u4f01\u4e1a\u516c\u7ae0;
    public static final /* enum */ SealTypeEnum \u6cd5\u5b9a\u4ee3\u8868\u4eba\u5370\u9274;
    String g;

    /*
     * WARNING - Possible parameter corruption
     * WARNING - void declaration
     */
    private /* synthetic */ SealTypeEnum(String string) {
        void a;
        void var2_-1;
        void var1_-1;
        SealTypeEnum a2;
        a2.g = a;
    }

    public static SealTypeEnum getByValue(String a) {
        int n;
        SealTypeEnum[] sealTypeEnumArray = SealTypeEnum.values();
        int n2 = sealTypeEnumArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            SealTypeEnum sealTypeEnum = sealTypeEnumArray[n];
            if (sealTypeEnum.getVal().equals(a)) {
                return sealTypeEnum;
            }
            n3 = ++n;
        }
        return null;
    }

    public static SealTypeEnum valueOf(String a) {
        return Enum.valueOf(SealTypeEnum.class, a);
    }

    public String getVal() {
        SealTypeEnum a;
        return a.g;
    }

    static {
        \u4f01\u4e1a\u516c\u7ae0 = new SealTypeEnum(AnchorPoint.F("\u4f13\u4e3c\u517e\u7ac6"), 0, DocumentSealAnchors.F("E"));
        \u6cd5\u5b9a\u4ee3\u8868\u4eba\u624b\u5199\u7b7e\u540d = new SealTypeEnum(AnchorPoint.F("\u6cf3\u5b88\u4ec5\u887a\u4e9c\u6259\u51bf\u7b6c\u542b"), 1, DocumentSealAnchors.F("F"));
        \u6cd5\u5b9a\u4ee3\u8868\u4eba\u5370\u9274 = new SealTypeEnum(AnchorPoint.F("\u6cf3\u5b88\u4ec5\u887a\u4e9c\u5362\u9252"), 2, DocumentSealAnchors.F("G"));
        \u7535\u5b50\u79c1\u7ae0 = new SealTypeEnum(AnchorPoint.F("\u7527\u5b76\u79d3\u7ac6"), 3, DocumentSealAnchors.F("@"));
        SealTypeEnum[] sealTypeEnumArray = new SealTypeEnum[4];
        sealTypeEnumArray[0] = \u4f01\u4e1a\u516c\u7ae0;
        sealTypeEnumArray[1] = \u6cd5\u5b9a\u4ee3\u8868\u4eba\u624b\u5199\u7b7e\u540d;
        sealTypeEnumArray[2] = \u6cd5\u5b9a\u4ee3\u8868\u4eba\u5370\u9274;
        sealTypeEnumArray[3] = \u7535\u5b50\u79c1\u7ae0;
        $VALUES = sealTypeEnumArray;
    }

    public static SealTypeEnum[] values() {
        return (SealTypeEnum[])$VALUES.clone();
    }
}


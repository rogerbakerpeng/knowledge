/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.enums;

import com.epoint.epsignature.ext.model.AnchorPoint;

public final class DetectTypeEnum
extends Enum<DetectTypeEnum> {
    public static final /* enum */ DetectTypeEnum \u5355\u4e2a\u76d6\u7ae0\u951a\u70b9\u5206\u6790;
    public static final /* enum */ DetectTypeEnum \u9a91\u7f1d\u7b7e\u7ae0\u951a\u70b9\u5206\u6790;
    public static final /* enum */ DetectTypeEnum \u5173\u952e\u5b57\u76d6\u7ae0\u951a\u70b9\u5206\u6790;
    public static final /* enum */ DetectTypeEnum \u6279\u91cf\u76d6\u7ae0\u951a\u70b9\u5206\u6790;
    private static final /* synthetic */ DetectTypeEnum[] $VALUES;
    public static final /* enum */ DetectTypeEnum \u6307\u5b9a\u4f4d\u7f6e\u76d6\u7ae0\u951a\u70b9\u5206\u6790;
    String g;

    public static DetectTypeEnum[] values() {
        return (DetectTypeEnum[])$VALUES.clone();
    }

    public String getVal() {
        DetectTypeEnum a;
        return a.g;
    }

    /*
     * WARNING - Possible parameter corruption
     * WARNING - void declaration
     */
    private /* synthetic */ DetectTypeEnum(String string) {
        void a;
        void var2_-1;
        void var1_-1;
        DetectTypeEnum a2;
        a2.g = a;
    }

    static {
        \u5173\u952e\u5b57\u76d6\u7ae0\u951a\u70b9\u5206\u6790 = new DetectTypeEnum(AnchorPoint.F("\u5155\u953c\u5b71\u76c4\u7ac6\u9508\u709f\u5214\u67b6"), 0, AnchorPoint.F("mw_AOuH"));
        \u6307\u5b9a\u4f4d\u7f6e\u76d6\u7ae0\u951a\u70b9\u5206\u6790 = new DetectTypeEnum(AnchorPoint.F("\u6315\u5bbc\u4f5f\u7f48\u76c4\u7ac6\u9508\u709f\u5214\u67b6"), 1, AnchorPoint.F("v}UAOuH"));
        \u6279\u91cf\u76d6\u7ae0\u951a\u70b9\u5206\u6790 = new DetectTypeEnum(AnchorPoint.F("\u626b\u91e9\u76c4\u7ac6\u9508\u709f\u5214\u67b6"), 2, AnchorPoint.F("kgJfOBGuCAOuH"));
        \u9a91\u7f1d\u7b7e\u7ae0\u951a\u70b9\u5206\u6790 = new DetectTypeEnum(AnchorPoint.F("\u9a83\u7f3b\u7b6c\u7ac6\u9508\u709f\u5214\u67b6"), 3, AnchorPoint.F("e`IaUAOuH"));
        \u5355\u4e2a\u76d6\u7ae0\u951a\u70b9\u5206\u6790 = new DetectTypeEnum(AnchorPoint.F("\u5347\u4e0c\u76c4\u7ac6\u9508\u709f\u5214\u67b6"), 4, AnchorPoint.F("AO|A~CAOuH"));
        DetectTypeEnum[] detectTypeEnumArray = new DetectTypeEnum[5];
        detectTypeEnumArray[0] = \u5173\u952e\u5b57\u76d6\u7ae0\u951a\u70b9\u5206\u6790;
        detectTypeEnumArray[1] = \u6307\u5b9a\u4f4d\u7f6e\u76d6\u7ae0\u951a\u70b9\u5206\u6790;
        detectTypeEnumArray[2] = \u6279\u91cf\u76d6\u7ae0\u951a\u70b9\u5206\u6790;
        detectTypeEnumArray[3] = \u9a91\u7f1d\u7b7e\u7ae0\u951a\u70b9\u5206\u6790;
        detectTypeEnumArray[4] = \u5355\u4e2a\u76d6\u7ae0\u951a\u70b9\u5206\u6790;
        $VALUES = detectTypeEnumArray;
    }

    public static DetectTypeEnum getByValue(String a) {
        int n;
        DetectTypeEnum[] detectTypeEnumArray = DetectTypeEnum.values();
        int n2 = detectTypeEnumArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            DetectTypeEnum detectTypeEnum = detectTypeEnumArray[n];
            if (detectTypeEnum.getVal().equals(a)) {
                return detectTypeEnum;
            }
            n3 = ++n;
        }
        return null;
    }

    public static DetectTypeEnum valueOf(String a) {
        return Enum.valueOf(DetectTypeEnum.class, a);
    }
}


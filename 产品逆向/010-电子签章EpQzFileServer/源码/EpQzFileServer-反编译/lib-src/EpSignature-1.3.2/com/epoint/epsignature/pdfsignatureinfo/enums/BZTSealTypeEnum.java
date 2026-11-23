/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfsignatureinfo.enums;

import com.epoint.epsignature.bean.CertInfo;
import com.epoint.epsignature.utils.EpFileServerUtil;

public final class BZTSealTypeEnum
extends Enum<BZTSealTypeEnum> {
    private static final /* synthetic */ BZTSealTypeEnum[] $VALUES;
    public static final /* enum */ BZTSealTypeEnum \u7535\u5b50\u79c1\u7ae0;
    String b;
    public static final /* enum */ BZTSealTypeEnum \u6cd5\u4eba\u7b7e\u5b57;
    public static final /* enum */ BZTSealTypeEnum \u516c\u7ae0;
    public static final /* enum */ BZTSealTypeEnum \u6cd5\u4eba\u5370\u9274;

    public static BZTSealTypeEnum valueOf(String a) {
        return Enum.valueOf(BZTSealTypeEnum.class, a);
    }

    public static BZTSealTypeEnum[] values() {
        return (BZTSealTypeEnum[])$VALUES.clone();
    }

    static {
        \u516c\u7ae0 = new BZTSealTypeEnum(CertInfo.J("\u5169\u7ad0"), 0, "1");
        \u6cd5\u4eba\u7b7e\u5b57 = new BZTSealTypeEnum(EpFileServerUtil.J("\u6c84\u4ee2\u7b2f\u5b0f"), 1, CertInfo.J("\u0002"));
        \u6cd5\u4eba\u5370\u9274 = new BZTSealTypeEnum(EpFileServerUtil.J("\u6c84\u4ee2\u5321\u922c"), 2, CertInfo.J("\u0003"));
        \u7535\u5b50\u79c1\u7ae0 = new BZTSealTypeEnum(EpFileServerUtil.J("\u7564\u5b08\u7990\u7ab8"), 3, CertInfo.J("\u0004"));
        BZTSealTypeEnum[] bZTSealTypeEnumArray = new BZTSealTypeEnum[4];
        bZTSealTypeEnumArray[0] = \u516c\u7ae0;
        bZTSealTypeEnumArray[1] = \u6cd5\u4eba\u7b7e\u5b57;
        bZTSealTypeEnumArray[2] = \u6cd5\u4eba\u5370\u9274;
        bZTSealTypeEnumArray[3] = \u7535\u5b50\u79c1\u7ae0;
        $VALUES = bZTSealTypeEnumArray;
    }

    /*
     * WARNING - Possible parameter corruption
     * WARNING - void declaration
     */
    private /* synthetic */ BZTSealTypeEnum(String string) {
        void a;
        void var2_-1;
        void var1_-1;
        BZTSealTypeEnum a2;
        a2.b = a;
    }

    public String getVal() {
        BZTSealTypeEnum a;
        return a.b;
    }

    public static BZTSealTypeEnum getByValue(String a) {
        int n;
        BZTSealTypeEnum[] bZTSealTypeEnumArray = BZTSealTypeEnum.values();
        int n2 = bZTSealTypeEnumArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            BZTSealTypeEnum bZTSealTypeEnum = bZTSealTypeEnumArray[n];
            if (bZTSealTypeEnum.getVal().equals(a)) {
                return bZTSealTypeEnum;
            }
            n3 = ++n;
        }
        return null;
    }
}


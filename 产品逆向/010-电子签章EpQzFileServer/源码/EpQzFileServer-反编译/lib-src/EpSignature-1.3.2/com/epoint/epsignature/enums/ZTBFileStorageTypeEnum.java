/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.enums;

import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;

public final class ZTBFileStorageTypeEnum
extends Enum<ZTBFileStorageTypeEnum> {
    String b;
    public static final /* enum */ ZTBFileStorageTypeEnum \u6587\u4ef6;
    public static final /* enum */ ZTBFileStorageTypeEnum \u65b0\u70b9\u6587\u4ef6\u670d\u52a1\u5668;
    public static final /* enum */ ZTBFileStorageTypeEnum \u6570\u636e\u5e93;
    private static final /* synthetic */ ZTBFileStorageTypeEnum[] $VALUES;

    public static ZTBFileStorageTypeEnum[] values() {
        return (ZTBFileStorageTypeEnum[])$VALUES.clone();
    }

    public static ZTBFileStorageTypeEnum valueOf(String a) {
        return Enum.valueOf(ZTBFileStorageTypeEnum.class, a);
    }

    static {
        \u6570\u636e\u5e93 = new ZTBFileStorageTypeEnum(DZYYZZReq.J("\u6512\u6356\u5ef1"), 0, UnauthorizedAccessException.J("\u0013N"));
        \u6587\u4ef6 = new ZTBFileStorageTypeEnum(DZYYZZReq.J("\u65bf\u4e94"), 1, UnauthorizedAccessException.J("\u0011e;i"));
        \u65b0\u70b9\u6587\u4ef6\u670d\u52a1\u5668 = new ZTBFileStorageTypeEnum(DZYYZZReq.J("\u65d2\u7081\u65e5\u4ece\u676f\u5299\u560a"), 2, UnauthorizedAccessException.J("\u0012|8e9x\u0011e;i\u0004i%z2~"));
        ZTBFileStorageTypeEnum[] zTBFileStorageTypeEnumArray = new ZTBFileStorageTypeEnum[3];
        zTBFileStorageTypeEnumArray[0] = \u6570\u636e\u5e93;
        zTBFileStorageTypeEnumArray[1] = \u6587\u4ef6;
        zTBFileStorageTypeEnumArray[2] = \u65b0\u70b9\u6587\u4ef6\u670d\u52a1\u5668;
        $VALUES = zTBFileStorageTypeEnumArray;
    }

    public String getVal() {
        ZTBFileStorageTypeEnum a;
        return a.b;
    }

    /*
     * WARNING - Possible parameter corruption
     * WARNING - void declaration
     */
    private /* synthetic */ ZTBFileStorageTypeEnum(String string) {
        void a;
        void var2_-1;
        void var1_-1;
        ZTBFileStorageTypeEnum a2;
        a2.b = a;
    }

    public static ZTBFileStorageTypeEnum getByValue(String a) {
        int n;
        ZTBFileStorageTypeEnum[] zTBFileStorageTypeEnumArray = ZTBFileStorageTypeEnum.values();
        int n2 = zTBFileStorageTypeEnumArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            ZTBFileStorageTypeEnum zTBFileStorageTypeEnum = zTBFileStorageTypeEnumArray[n];
            if (zTBFileStorageTypeEnum.getVal().equals(a)) {
                return zTBFileStorageTypeEnum;
            }
            n3 = ++n;
        }
        return null;
    }
}


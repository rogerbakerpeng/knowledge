/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.enums;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.bean.BaseReq;

public final class H5ActionsEnum
extends Enum<H5ActionsEnum> {
    private static final /* synthetic */ H5ActionsEnum[] $VALUES;
    public static final /* enum */ H5ActionsEnum \u7b7e\u7ae0;
    public static final /* enum */ H5ActionsEnum \u9a8c\u7b7e;
    String b;
    public static final /* enum */ H5ActionsEnum \u83b7\u53d6\u6ce8\u91ca;
    public static final /* enum */ H5ActionsEnum \u5220\u9664\u7b7e\u7ae0;
    public static final /* enum */ H5ActionsEnum \u8ba1\u7b97\u6458\u8981;

    static {
        \u9a8c\u7b7e = new H5ActionsEnum(ExEpSignException.J("\u9af8\u7b5c"), 0, BaseReq.J("\u0005W\u0001[\u0015K"));
        \u83b7\u53d6\u6ce8\u91ca = new H5ActionsEnum(ExEpSignException.J("\u83c3\u53f4\u6c9c\u91e8"), 1, BaseReq.J("\u0014W\u0007s\u001d\\\u001cS\u0007[\u001c\\"));
        \u8ba1\u7b97\u6458\u8981 = new H5ActionsEnum(ExEpSignException.J("\u8bd5\u7bb5\u642c\u89a3"), 2, BaseReq.J("\u0017W\u0014[\u0000F"));
        \u7b7e\u7ae0 = new H5ActionsEnum(ExEpSignException.J("\u7b0a\u7ac2"), 3, BaseReq.J("\u0000[\u0014\\"));
        \u5220\u9664\u7b7e\u7ae0 = new H5ActionsEnum(ExEpSignException.J("\u5254\u9646\u7b0a\u7ac2"), 4, BaseReq.J("\u0017W\u001fW\u0007W\u0000[\u0014\\"));
        H5ActionsEnum[] h5ActionsEnumArray = new H5ActionsEnum[5];
        h5ActionsEnumArray[0] = \u9a8c\u7b7e;
        h5ActionsEnumArray[1] = \u83b7\u53d6\u6ce8\u91ca;
        h5ActionsEnumArray[2] = \u8ba1\u7b97\u6458\u8981;
        h5ActionsEnumArray[3] = \u7b7e\u7ae0;
        h5ActionsEnumArray[4] = \u5220\u9664\u7b7e\u7ae0;
        $VALUES = h5ActionsEnumArray;
    }

    public static H5ActionsEnum valueOf(String a) {
        return Enum.valueOf(H5ActionsEnum.class, a);
    }

    public static H5ActionsEnum getByValue(String a) {
        int n;
        H5ActionsEnum[] h5ActionsEnumArray = H5ActionsEnum.values();
        int n2 = h5ActionsEnumArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            H5ActionsEnum h5ActionsEnum = h5ActionsEnumArray[n];
            if (h5ActionsEnum.getVal().equals(a)) {
                return h5ActionsEnum;
            }
            n3 = ++n;
        }
        return null;
    }

    public static H5ActionsEnum[] values() {
        return (H5ActionsEnum[])$VALUES.clone();
    }

    public String getVal() {
        H5ActionsEnum a;
        return a.b;
    }

    /*
     * WARNING - Possible parameter corruption
     * WARNING - void declaration
     */
    private /* synthetic */ H5ActionsEnum(String string) {
        void a;
        void var2_-1;
        void var1_-1;
        H5ActionsEnum a2;
        a2.b = a;
    }
}


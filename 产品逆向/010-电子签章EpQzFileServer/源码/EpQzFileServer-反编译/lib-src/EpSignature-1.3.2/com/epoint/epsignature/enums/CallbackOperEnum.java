/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.enums;

import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;

public final class CallbackOperEnum
extends Enum<CallbackOperEnum> {
    private static final /* synthetic */ CallbackOperEnum[] $VALUES;
    public static final /* enum */ CallbackOperEnum \u8fd4\u56de\u5408\u5e76\u540ePDF\u6587\u4ef6\u8def\u5f84;
    public static final /* enum */ CallbackOperEnum \u8fd4\u56de\u5408\u5e76\u540ePDF\u5b57\u8282\u6570\u7ec4;
    String b;
    public static final /* enum */ CallbackOperEnum \u8fd4\u56de\u5408\u5e76\u540e\u7b7e\u7ae0\u4fe1\u606f;

    public static CallbackOperEnum getByValue(String a) {
        int n;
        CallbackOperEnum[] callbackOperEnumArray = CallbackOperEnum.values();
        int n2 = callbackOperEnumArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            CallbackOperEnum callbackOperEnum = callbackOperEnumArray[n];
            if (callbackOperEnum.getVal().equals(a)) {
                return callbackOperEnum;
            }
            n3 = ++n;
        }
        return null;
    }

    public String getVal() {
        CallbackOperEnum a;
        return a.b;
    }

    /*
     * WARNING - Possible parameter corruption
     * WARNING - void declaration
     */
    private /* synthetic */ CallbackOperEnum(String string) {
        void a;
        void var2_-1;
        void var1_-1;
        CallbackOperEnum a2;
        a2.b = a;
    }

    public static CallbackOperEnum[] values() {
        return (CallbackOperEnum[])$VALUES.clone();
    }

    static {
        \u8fd4\u56de\u5408\u5e76\u540ePDF\u5b57\u8282\u6570\u7ec4 = new CallbackOperEnum(DZYYZZReq.J("\u8fec\u56bc\u5430\u5e14\u54362|$\u5b6f\u82e0\u6548\u7ea6"), 0, CertObject.J("rpwyFQP"));
        \u8fd4\u56de\u5408\u5e76\u540ePDF\u6587\u4ef6\u8def\u5f84 = new CallbackOperEnum(DZYYZZReq.J("\u8fec\u56bc\u5430\u5e14\u54362|$\u65bf\u4e94\u8dd7\u5fe6"), 1, CertObject.J("rpwyFQPEwa~"));
        \u8fd4\u56de\u5408\u5e76\u540e\u7b7e\u7ae0\u4fe1\u606f = new CallbackOperEnum(DZYYZZReq.J("\u8fb6\u56e6\u546a\u5e4e\u546c\u7b46\u7a82\u4fd9\u600d"), 2, CertObject.J("qstzF\u007frx\\xsy"));
        CallbackOperEnum[] callbackOperEnumArray = new CallbackOperEnum[3];
        callbackOperEnumArray[0] = \u8fd4\u56de\u5408\u5e76\u540ePDF\u5b57\u8282\u6570\u7ec4;
        callbackOperEnumArray[1] = \u8fd4\u56de\u5408\u5e76\u540ePDF\u6587\u4ef6\u8def\u5f84;
        callbackOperEnumArray[2] = \u8fd4\u56de\u5408\u5e76\u540e\u7b7e\u7ae0\u4fe1\u606f;
        $VALUES = callbackOperEnumArray;
    }

    public static CallbackOperEnum valueOf(String a) {
        return Enum.valueOf(CallbackOperEnum.class, a);
    }
}


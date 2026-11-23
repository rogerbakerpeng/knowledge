/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.enums;

import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.utils.TZGMVerifyPdf;

public class OFDEnum {
    public OFDEnum() {
        OFDEnum a;
    }

    public static final class SealPositionEnum
    extends Enum<SealPositionEnum> {
        public static final /* enum */ SealPositionEnum \u5168\u90e8\u9875 = new SealPositionEnum(BaseReq.J("\u515a\u909b\u9847"), 0, -1);
        int b;
        public static final /* enum */ SealPositionEnum \u7b2c\u4e00\u9875 = new SealPositionEnum(TZGMVerifyPdf.J("\u7b3c\u4e64\u9865"), 1, 0);
        public static final /* enum */ SealPositionEnum \u6700\u540e\u4e00\u9875 = new SealPositionEnum(BaseReq.J("\u6773\u543c\u4e73\u9847"), 2, 1);
        private static final /* synthetic */ SealPositionEnum[] $VALUES;

        public static SealPositionEnum getByValue(int a) {
            int n;
            SealPositionEnum[] sealPositionEnumArray = SealPositionEnum.values();
            int n2 = sealPositionEnumArray.length;
            int n3 = n = 0;
            while (n3 < n2) {
                SealPositionEnum sealPositionEnum = sealPositionEnumArray[n];
                if (sealPositionEnum.getVal() == a) {
                    return sealPositionEnum;
                }
                n3 = ++n;
            }
            return null;
        }

        static {
            SealPositionEnum[] sealPositionEnumArray = new SealPositionEnum[3];
            sealPositionEnumArray[0] = \u5168\u90e8\u9875;
            sealPositionEnumArray[1] = \u7b2c\u4e00\u9875;
            sealPositionEnumArray[2] = \u6700\u540e\u4e00\u9875;
            $VALUES = sealPositionEnumArray;
        }

        public static SealPositionEnum[] values() {
            return (SealPositionEnum[])$VALUES.clone();
        }

        /*
         * WARNING - Possible parameter corruption
         * WARNING - void declaration
         */
        private /* synthetic */ SealPositionEnum(int n) {
            void a;
            void var2_-1;
            void var1_-1;
            SealPositionEnum a2;
            a2.b = a;
        }

        public static SealPositionEnum valueOf(String a) {
            return Enum.valueOf(SealPositionEnum.class, a);
        }

        public int getVal() {
            SealPositionEnum a;
            return a.b;
        }
    }
}


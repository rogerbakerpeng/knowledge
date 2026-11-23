/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.enums;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;

public class LicenseEnum {
    public LicenseEnum() {
        LicenseEnum a;
    }

    public static final class LicenseResultEnum
    extends Enum<LicenseResultEnum> {
        public static final /* enum */ LicenseResultEnum \u901a\u8fc7;
        String b;
        public static final /* enum */ LicenseResultEnum \u6210\u529f;
        public static final /* enum */ LicenseResultEnum \u5931\u8d25;
        private static final /* synthetic */ LicenseResultEnum[] $VALUES;

        public String getVal() {
            LicenseResultEnum a;
            return a.b;
        }

        public static LicenseResultEnum valueOf(String a) {
            return Enum.valueOf(LicenseResultEnum.class, a);
        }

        public static LicenseResultEnum[] values() {
            return (LicenseResultEnum[])$VALUES.clone();
        }

        static {
            \u5931\u8d25 = new LicenseResultEnum(EpOFDData.J("\u597b\u8d03"), 0, DZYYZZReq.J("\u0007J\u0010W\u0010"));
            \u6210\u529f = new LicenseResultEnum(EpOFDData.J("\u625a\u52b9"), 1, DZYYZZReq.J("K\u0017[\u0007K\u0011"));
            \u901a\u8fc7 = new LicenseResultEnum(EpOFDData.J("\u9050\u8fe1"), 2, DZYYZZReq.J("H\u0003K\u0011"));
            LicenseResultEnum[] licenseResultEnumArray = new LicenseResultEnum[3];
            licenseResultEnumArray[0] = \u5931\u8d25;
            licenseResultEnumArray[1] = \u6210\u529f;
            licenseResultEnumArray[2] = \u901a\u8fc7;
            $VALUES = licenseResultEnumArray;
        }

        public static LicenseResultEnum getByValue(String a) {
            int n;
            LicenseResultEnum[] licenseResultEnumArray = LicenseResultEnum.values();
            int n2 = licenseResultEnumArray.length;
            int n3 = n = 0;
            while (n3 < n2) {
                LicenseResultEnum licenseResultEnum = licenseResultEnumArray[n];
                if (licenseResultEnum.getVal().equals(a)) {
                    return licenseResultEnum;
                }
                n3 = ++n;
            }
            return null;
        }

        /*
         * WARNING - Possible parameter corruption
         * WARNING - void declaration
         */
        private /* synthetic */ LicenseResultEnum(String string) {
            void a;
            void var2_-1;
            void var1_-1;
            LicenseResultEnum a2;
            a2.b = a;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.utils.JSONUtils;
import java.util.regex.Pattern;

public class XSSDetector {
    public static String[] XSS_PATTERNS;

    static {
        String[] stringArray = new String[3];
        stringArray[0] = BaseReq.J("OA\u0010@\u001aB\u0007\f[\u001cY\rZ\u000e\\A\u0010@\u001aB\u0007\f");
        stringArray[1] = JSONUtils.J("7~h\u007fb}\u007f3");
        stringArray[2] = BaseReq.J("\u000e\\A\u0010@\u001aB\u0007\f");
        XSS_PATTERNS = stringArray;
    }

    public static boolean isSafe(String a) {
        int n;
        String[] stringArray = XSS_PATTERNS;
        int n2 = XSS_PATTERNS.length;
        int n3 = n = 0;
        while (n3 < n2) {
            if (Pattern.compile(stringArray[n], 2).matcher(a).find()) {
                return false;
            }
            n3 = ++n;
        }
        return true;
    }

    public XSSDetector() {
        XSSDetector a;
    }
}


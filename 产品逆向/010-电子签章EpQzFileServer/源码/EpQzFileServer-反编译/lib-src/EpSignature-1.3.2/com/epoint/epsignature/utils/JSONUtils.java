/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.utils.StringUtil;

public class JSONUtils {
    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 1 << 3 ^ 3;
        int cfr_ignored_0 = (2 ^ 5) << 4 ^ (3 << 2 ^ 1);
        int n4 = n2;
        int n5 = 1 << 3 ^ 5;
        while (n4 >= 0) {
            int n6 = n2--;
            cArray[n6] = (char)(a.charAt(n6) ^ n5);
            if (n2 < 0) break;
            int n7 = n2--;
            cArray[n7] = (char)(a.charAt(n7) ^ n3);
            n4 = n2;
        }
        return new String(cArray);
    }

    public static JSONObject getJSONObject(String a) {
        JSONObject jSONObject = null;
        try {
            jSONObject = JSONObject.parseObject(a);
            return jSONObject;
        }
        catch (Exception exception) {
            return jSONObject;
        }
    }

    public static <T> T json2bean(Object a, Class<T> a2) {
        if (StringUtil.isBlank(a)) {
            return null;
        }
        T t = null;
        if (a instanceof String) {
            T t2 = JSON.parseObject((String)a, a2);
            t = t2;
            return t2;
        }
        if (a instanceof JSON) {
            t = JSON.toJavaObject((JSON)a, a2);
        }
        return t;
    }

    public static String bean2json(Object a) {
        return JSON.toJSONString(a);
    }

    public JSONUtils() {
        JSONUtils a;
    }
}


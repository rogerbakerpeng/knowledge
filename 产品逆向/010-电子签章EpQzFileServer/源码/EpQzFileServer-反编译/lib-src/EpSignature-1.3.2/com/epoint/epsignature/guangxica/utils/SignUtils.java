/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.guangxica.utils;

import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.guangxica.utils.MD5Util;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Map;

public class SignUtils {
    public static String createSign(Map<String, Object> a, String a2) {
        String string;
        int n;
        String[] stringArray;
        if (a == null) {
            return "";
        }
        a.remove(DZYYZZReq.J("K\u000b_\f"));
        a.put(CertObject.J("wefFsvdpb"), a2);
        a2 = new ArrayList();
        Iterator<Map.Entry<String, Object>> iterator = a.entrySet().iterator();
        while (iterator.hasNext()) {
            stringArray = iterator.next();
            if ("".equals(stringArray.getValue()) || null == stringArray.getValue()) continue;
            ((ArrayList)a2).add(stringArray.getKey());
        }
        Object object = a2;
        int n2 = ((ArrayList)object).size();
        stringArray = ((ArrayList)object).toArray(new String[n2]);
        Arrays.sort(stringArray, String.CASE_INSENSITIVE_ORDER);
        a2 = new StringBuilder();
        int n3 = n = 0;
        while (n3 < n2) {
            StringBuilder stringBuilder = new StringBuilder().append(stringArray[n]).append(DZYYZZReq.J("_")).append(a.get(stringArray[n]));
            ((StringBuilder)a2).append(stringBuilder.append(CertObject.J("0")).toString());
            n3 = ++n;
        }
        String string2 = string = ((StringBuilder)a2).toString();
        string = string2.substring(0, string2.length() - 1);
        return MD5Util.MD5Encode(string, "UTF-8");
    }

    public SignUtils() {
        SignUtils a;
    }
}


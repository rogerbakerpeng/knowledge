/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.bean.annotation.PDFAnnotationReq;
import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.utils.HttpUtil;
import java.io.IOException;
import java.util.HashMap;

public class EpFileServerUtil {
    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 5 << 4 ^ 1;
        int cfr_ignored_0 = 4 << 4 ^ (2 << 2 ^ 3);
        int n4 = n2;
        int n5 = 5 << 4 ^ 4 << 1;
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

    public EpFileServerUtil() {
        EpFileServerUtil a;
    }

    public static String doAction(String a, String a2) throws IOException {
        HashMap<String, String> hashMap = new HashMap<String, String>();
        hashMap.put(CertObject.J("ewgwxe"), a2);
        return HttpUtil.doPostWithFormData(new StringBuilder().insert(0, a).append(PDFAnnotationReq.J("k5!40h)$!507 !7\"61-$!h (\u0005$0.+)")).toString(), hashMap);
    }
}


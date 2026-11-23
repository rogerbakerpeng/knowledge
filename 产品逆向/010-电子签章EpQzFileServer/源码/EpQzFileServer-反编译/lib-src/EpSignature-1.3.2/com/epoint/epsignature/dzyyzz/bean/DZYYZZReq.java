/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.bean;

import com.epoint.epsignature.dzyyzz.bean.Message_Content;
import com.epoint.epsignature.dzyyzz.bean.Message_Header;

public class DZYYZZReq {
    Message_Content message_content;
    Message_Header message_header;

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = (2 ^ 5) << 3;
        int cfr_ignored_0 = 5 << 4 ^ 3 << 1;
        int n4 = n2;
        int n5 = (3 ^ 5) << 4 ^ 1 << 1;
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

    public void setMessage_header(Message_Header a) {
        a.message_header = a;
    }

    public void setMessage_content(Message_Content a) {
        a.message_content = a;
    }

    public Message_Content getMessage_content() {
        DZYYZZReq a;
        return a.message_content;
    }

    public Message_Header getMessage_header() {
        DZYYZZReq a;
        return a.message_header;
    }

    public DZYYZZReq() {
        DZYYZZReq a;
    }
}


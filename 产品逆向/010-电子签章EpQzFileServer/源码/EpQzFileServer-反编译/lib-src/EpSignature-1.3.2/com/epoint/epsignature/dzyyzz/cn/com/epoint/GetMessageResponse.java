/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.cn.com.epoint;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(value=XmlAccessType.FIELD)
@XmlType(name="", propOrder={"getMessageResult"})
@XmlRootElement(name="GetMessageResponse")
public class GetMessageResponse {
    @XmlElement(name="GetMessageResult")
    protected String getMessageResult;

    public GetMessageResponse() {
        GetMessageResponse a;
    }

    public static String J(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 4 << 4 ^ 5;
        int cfr_ignored_0 = (3 ^ 5) << 4 ^ (2 << 2 ^ 3);
        int n4 = n2;
        int n5 = (2 ^ 5) << 4 ^ (3 << 2 ^ 1);
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

    public void setGetMessageResult(String a) {
        a.getMessageResult = a;
    }

    public String getGetMessageResult() {
        GetMessageResponse a;
        return a.getMessageResult;
    }
}


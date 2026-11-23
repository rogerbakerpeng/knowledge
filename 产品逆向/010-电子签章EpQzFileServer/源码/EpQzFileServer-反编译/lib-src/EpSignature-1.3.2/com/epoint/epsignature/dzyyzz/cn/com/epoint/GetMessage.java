/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.cn.com.epoint;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(value=XmlAccessType.FIELD)
@XmlType(name="", propOrder={"qrid"})
@XmlRootElement(name="GetMessage")
public class GetMessage {
    protected String qrid;

    public GetMessage() {
        GetMessage a;
    }

    public String getQrid() {
        GetMessage a;
        return a.qrid;
    }

    public void setQrid(String a) {
        a.qrid = a;
    }
}


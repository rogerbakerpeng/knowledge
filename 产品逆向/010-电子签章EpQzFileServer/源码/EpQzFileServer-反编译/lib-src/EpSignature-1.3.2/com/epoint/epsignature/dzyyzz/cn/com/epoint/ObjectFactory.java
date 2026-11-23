/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.cn.com.epoint;

import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessage;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

@XmlRegistry
public class ObjectFactory {
    private static final QName _String_QNAME = new QName(GetMessageResponse.J("-\t1\r\u007fRj\u00185\u0012,\u00131S&\u0012(S&\u0013"), GetMessageResponse.J("6\t7\u0014+\u001a"));

    public GetMessage createGetMessage() {
        return new GetMessage();
    }

    @XmlElementDecl(namespace="http://epoint.com.cn", name="string")
    public JAXBElement<String> createString(String a) {
        return new JAXBElement<String>(_String_QNAME, String.class, null, a);
    }

    public GetMessageResponse createGetMessageResponse() {
        return new GetMessageResponse();
    }

    public ObjectFactory() {
        ObjectFactory a;
    }
}


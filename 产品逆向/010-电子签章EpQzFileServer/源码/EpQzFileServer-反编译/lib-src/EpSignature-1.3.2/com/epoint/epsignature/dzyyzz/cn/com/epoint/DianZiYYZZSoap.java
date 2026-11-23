/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.jws.WebMethod
 *  javax.jws.WebParam
 *  javax.jws.WebResult
 *  javax.jws.WebService
 *  javax.xml.ws.RequestWrapper
 *  javax.xml.ws.ResponseWrapper
 */
package com.epoint.epsignature.dzyyzz.cn.com.epoint;

import com.epoint.epsignature.dzyyzz.cn.com.epoint.ObjectFactory;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

@WebService(targetNamespace="http://epoint.com.cn", name="DianZiYYZZSoap")
@XmlSeeAlso(value={ObjectFactory.class})
public interface DianZiYYZZSoap {
    @WebMethod(operationName="GetMessage", action="http://epoint.com.cn/GetMessage")
    @RequestWrapper(localName="GetMessage", targetNamespace="http://epoint.com.cn", className="cn.com.epoint.GetMessage")
    @ResponseWrapper(localName="GetMessageResponse", targetNamespace="http://epoint.com.cn", className="cn.com.epoint.GetMessageResponse")
    @WebResult(name="GetMessageResult", targetNamespace="http://epoint.com.cn")
    public String getMessage(@WebParam(name="qrid", targetNamespace="http://epoint.com.cn") String var1);
}


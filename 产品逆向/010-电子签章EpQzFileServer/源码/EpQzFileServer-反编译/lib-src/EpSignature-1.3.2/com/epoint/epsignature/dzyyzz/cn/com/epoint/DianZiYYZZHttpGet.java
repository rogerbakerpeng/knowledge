/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.jws.WebMethod
 *  javax.jws.WebParam
 *  javax.jws.WebResult
 *  javax.jws.WebService
 *  javax.jws.soap.SOAPBinding
 *  javax.jws.soap.SOAPBinding$ParameterStyle
 */
package com.epoint.epsignature.dzyyzz.cn.com.epoint;

import com.epoint.epsignature.dzyyzz.cn.com.epoint.ObjectFactory;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;

@WebService(targetNamespace="http://epoint.com.cn", name="DianZiYYZZHttpGet")
@XmlSeeAlso(value={ObjectFactory.class})
@SOAPBinding(parameterStyle=SOAPBinding.ParameterStyle.BARE)
public interface DianZiYYZZHttpGet {
    @WebMethod(operationName="GetMessage")
    @WebResult(name="string", targetNamespace="http://epoint.com.cn", partName="Body")
    public String getMessage(@WebParam(partName="qrid", name="qrid", targetNamespace="http://epoint.com.cn") String var1);
}


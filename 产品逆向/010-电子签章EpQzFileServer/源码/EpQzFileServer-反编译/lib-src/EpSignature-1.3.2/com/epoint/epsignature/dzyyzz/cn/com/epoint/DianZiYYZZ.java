/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.xml.ws.Service
 *  javax.xml.ws.WebEndpoint
 *  javax.xml.ws.WebServiceClient
 *  javax.xml.ws.WebServiceFeature
 */
package com.epoint.epsignature.dzyyzz.cn.com.epoint;

import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.DianZiYYZZHttpGet;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.DianZiYYZZHttpPost;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.DianZiYYZZSoap;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceFeature;

@WebServiceClient(name="DianZiYYZZ", wsdlLocation="http://58.210.186.140/yqztbservice/DianZiYYZZ.asmx?wsdl", targetNamespace="http://epoint.com.cn")
public class DianZiYYZZ
extends Service {
    public static final QName DianZiYYZZHttpGet;
    public static final QName DianZiYYZZHttpPost;
    public static final URL WSDL_LOCATION;
    private static org.apache.log4j.Logger log;
    public static final QName DianZiYYZZSoap12;
    public static final QName DianZiYYZZSoap;
    public static final QName SERVICE;

    @WebEndpoint(name="DianZiYYZZSoap")
    public DianZiYYZZSoap getDianZiYYZZSoap() {
        DianZiYYZZ a;
        return (DianZiYYZZSoap)super.getPort(DianZiYYZZSoap, DianZiYYZZSoap.class);
    }

    public DianZiYYZZ(URL a, QName a2, WebServiceFeature ... a3) {
        super(a, a2, a3);
        DianZiYYZZ a4;
    }

    @WebEndpoint(name="DianZiYYZZHttpGet")
    public DianZiYYZZHttpGet getDianZiYYZZHttpGet(WebServiceFeature ... a) {
        DianZiYYZZ a2;
        return (DianZiYYZZHttpGet)super.getPort(DianZiYYZZHttpGet, DianZiYYZZHttpGet.class, a);
    }

    @WebEndpoint(name="DianZiYYZZHttpPost")
    public DianZiYYZZHttpPost getDianZiYYZZHttpPost(WebServiceFeature ... a) {
        DianZiYYZZ a2;
        return (DianZiYYZZHttpPost)super.getPort(DianZiYYZZHttpPost, DianZiYYZZHttpPost.class, a);
    }

    public DianZiYYZZ(URL a) {
        super(a, SERVICE);
        DianZiYYZZ a2;
    }

    public DianZiYYZZ(WebServiceFeature ... a) {
        super(WSDL_LOCATION, SERVICE, a);
        DianZiYYZZ a2;
    }

    static {
        URL uRL;
        log = org.apache.log4j.Logger.getLogger(DianZiYYZZ.class);
        SERVICE = new QName(PDFHighlightAnnotationReq.J("e}yy7&\"l}fdgy'nf`'ng"), DZYYZZReq.J("|\u000bY\fb\u000ba;b8"));
        DianZiYYZZHttpGet = new QName(PDFHighlightAnnotationReq.J("e}yy7&\"l}fdgy'nf`'ng"), DZYYZZReq.J("&Q\u0003V8Q;a8b*L\u0016H%]\u0016"));
        DianZiYYZZSoap12 = new QName(PDFHighlightAnnotationReq.J("e}yy7&\"l}fdgy'nf`'ng"), DZYYZZReq.J("|\u000bY\fb\u000ba;b8k\rY\u0012\tP"));
        DianZiYYZZSoap = new QName(PDFHighlightAnnotationReq.J("e}yy7&\"l}fdgy'nf`'ng"), DZYYZZReq.J("|\u000bY\fb\u000ba;b8k\rY\u0012"));
        DianZiYYZZHttpPost = new QName(PDFHighlightAnnotationReq.J("e}yy7&\"l}fdgy'nf`'ng"), DZYYZZReq.J("|\u000bY\fb\u000ba;b8p\u0016L\u0012h\rK\u0016"));
        URL uRL2 = null;
        try {
            uRL = uRL2 = new URL(PDFHighlightAnnotationReq.J("ay}}3\"&81#;<9#85?#899\"p|syk~l\u007f\u007fdjh&I`lgW`TPWS#h~du6zzie"));
        }
        catch (MalformedURLException malformedURLException) {
            log.error(malformedURLException.getMessage(), malformedURLException);
            Logger.getLogger(DianZiYYZZ.class.getName()).log(Level.INFO, DZYYZZReq.J("{\u0003VBV\rLBQ\fQ\u0016Q\u0003T\u000bB\u0007\u0018\u0016P\u0007\u0018\u0006]\u0004Y\u0017T\u0016\u0018\u0015K\u0006TB^\u0010W\u000f\u0018\u0019\b\u001f"), PDFHighlightAnnotationReq.J("ay}}3\"&81#;<9#85?#899\"p|syk~l\u007f\u007fdjh&I`lgW`TPWS#h~du6zzie"));
            uRL = uRL2;
        }
        WSDL_LOCATION = uRL;
    }

    @WebEndpoint(name="DianZiYYZZSoap12")
    public DianZiYYZZSoap getDianZiYYZZSoap12(WebServiceFeature ... a) {
        DianZiYYZZ a2;
        return (DianZiYYZZSoap)super.getPort(DianZiYYZZSoap12, DianZiYYZZSoap.class, a);
    }

    @WebEndpoint(name="DianZiYYZZSoap12")
    public DianZiYYZZSoap getDianZiYYZZSoap12() {
        DianZiYYZZ a;
        return (DianZiYYZZSoap)super.getPort(DianZiYYZZSoap12, DianZiYYZZSoap.class);
    }

    public DianZiYYZZ(URL a, QName a2) {
        super(a, a2);
        DianZiYYZZ a3;
    }

    @WebEndpoint(name="DianZiYYZZHttpPost")
    public DianZiYYZZHttpPost getDianZiYYZZHttpPost() {
        DianZiYYZZ a;
        return (DianZiYYZZHttpPost)super.getPort(DianZiYYZZHttpPost, DianZiYYZZHttpPost.class);
    }

    @WebEndpoint(name="DianZiYYZZSoap")
    public DianZiYYZZSoap getDianZiYYZZSoap(WebServiceFeature ... a) {
        DianZiYYZZ a2;
        return (DianZiYYZZSoap)super.getPort(DianZiYYZZSoap, DianZiYYZZSoap.class, a);
    }

    public DianZiYYZZ() {
        super(WSDL_LOCATION, SERVICE);
        DianZiYYZZ a;
    }

    public DianZiYYZZ(URL a, WebServiceFeature ... a2) {
        super(a, SERVICE, a2);
        DianZiYYZZ a3;
    }

    @WebEndpoint(name="DianZiYYZZHttpGet")
    public DianZiYYZZHttpGet getDianZiYYZZHttpGet() {
        DianZiYYZZ a;
        return (DianZiYYZZHttpGet)super.getPort(DianZiYYZZHttpGet, DianZiYYZZHttpGet.class);
    }
}


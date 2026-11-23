/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.dzyyzz.bean.Message_Content;
import com.epoint.epsignature.dzyyzz.bean.Message_Header;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.io.Serializable;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.log4j.Logger;

public class SZDZYYZZService {
    public String SYSCODE;
    public String DZYYZZUrl;
    private static Logger logger = Logger.getLogger(SZDZYYZZService.class);
    public static final String LOGINRESULT = "/authidp/qr/getQrDealResult";
    public String client_id;
    public String SZJYUrl;
    public static final String LOGIN = "/authidp/qr/generateQrCode";
    public String AUTHCODE;
    public String YEWUUrl;

    public String queryQRresult(Object a) {
        SZDZYYZZService a2;
        Serializable serializable;
        String string = "";
        String string2 = "";
        a = JSONUtils.json2bean(a, JSONObject.class);
        String string3 = ((JSONObject)a).getString(GetMessageResponse.J("4\u000f&\u0012!\u0018,\u0019"));
        String string4 = ((JSONObject)a).getString(PDFHighlightAnnotationReq.J("|{yp}l"));
        Object object = "";
        try {
            serializable = Inet4Address.getLocalHost();
            object = ((InetAddress)serializable).getHostAddress();
        }
        catch (UnknownHostException unknownHostException) {
            logger.error(new StringBuilder().insert(0, GetMessageResponse.J("4\b \u000f<,\u0017\u000f \u000e0\u00111] \u000f7\u00127G")).append(unknownHostException.getMessage()).toString(), unknownHostException);
        }
        if (PDFHighlightAnnotationReq.J("ebndg").equals(string4)) {
            string = new StringBuilder().insert(0, a2.SZJYUrl).append(LOGINRESULT).toString();
            serializable = new JSONObject();
            JSONObject jSONObject = new JSONObject();
            JSONObject jSONObject2 = new JSONObject();
            jSONObject.put(GetMessageResponse.J("\u001c5\r\f\u0019"), (Object)a2.client_id);
            jSONObject.put(PDFHighlightAnnotationReq.J("\u007fl`fylDy"), object);
            jSONObject2.put(GetMessageResponse.J("4\u000f1\u00045\u0018"), (Object)PDFHighlightAnnotationReq.J("<8=;"));
            jSONObject2.put(GetMessageResponse.J("4\u000f,\u0019"), (Object)string3);
            jSONObject2.put(PDFHighlightAnnotationReq.J("{h}yp}l"), (Object)"0");
            ((JSONObject)serializable).put(GetMessageResponse.J("\u0014$\u0010\u001a\u001e*\u00131\u0018+\t"), (Object)jSONObject);
            ((JSONObject)serializable).put(PDFHighlightAnnotationReq.J("dhz~hjlRjbgylc}"), (Object)jSONObject2);
            string2 = HttpUtil.doPost(((JSON)((Object)serializable)).toJSONString(), string);
            if (StringUtil.isBlank(string2)) {
                throw new RuntimeException(GetMessageResponse.J("\u8c7e\u756d\u7b51\u4e4c\u65c4\u6748\u52dc\u51bf\u9564"));
            }
            object = JSONUtils.json2bean(string2, JSONObject.class);
            if (!"0".equals(((JSONObject)object).getJSONObject(PDFHighlightAnnotationReq.J("`l~zlnhVellmh{")).getString(GetMessageResponse.J("\u00187\u000f*\u000f\u0006\u0012!\u0018")))) {
                throw new RuntimeException(((JSONObject)object).getJSONObject(PDFHighlightAnnotationReq.J("`l~zlnhVellmh{")).getString(GetMessageResponse.J("\u00187\u000f*\u000f\f\u0013#\u0012")));
            }
        } else if (PDFHighlightAnnotationReq.J("~`jg").equals(string4)) {
            string = new StringBuilder().insert(0, a2.YEWUUrl).append(GetMessageResponse.J("z\f7\u0014!@")).append(string3).toString();
            string2 = HttpUtil.doPost(((JSON)a).toJSONString(), string);
            if (StringUtil.isBlank(string2)) {
                throw new RuntimeException(PDFHighlightAnnotationReq.J("\u8c0a\u7525\u7b25\u4e04\u65b0\u6700\u52a8\u51f7\u9510"));
            }
            serializable = JSONUtils.json2bean(string2, JSONObject.class);
            if (!"0".equals(((JSONObject)serializable).getString(GetMessageResponse.J("6\t$\t0\u000e"))) && !PDFHighlightAnnotationReq.J(" 8").equals(((JSONObject)serializable).getString(GetMessageResponse.J("6\t$\t0\u000e")))) {
                throw new RuntimeException(PDFHighlightAnnotationReq.J("\u8c0e\u7521\u63a8\u53ea\u593c\u8d2c"));
            }
        }
        return string2;
    }

    public boolean verifySign(String a, String a2, String a3) {
        Message_Content message_Content;
        SZDZYYZZService a4;
        Message_Header message_Header;
        DZYYZZReq dZYYZZReq = new DZYYZZReq();
        Message_Header message_Header2 = message_Header = new Message_Header();
        Message_Header message_Header3 = message_Header;
        SZDZYYZZService sZDZYYZZService = a4;
        message_Header.setSyscode(sZDZYYZZService.SYSCODE);
        message_Header3.setAuthcode(sZDZYYZZService.AUTHCODE);
        message_Header3.setBusinesstype(GetMessageResponse.J("MuJ"));
        message_Header2.setSign(a3);
        message_Header2.setVersion("1");
        Message_Content message_Content2 = message_Content = new Message_Content();
        Message_Content message_Content3 = message_Content;
        message_Content3.setEntity(a);
        message_Content3.setClear(a2);
        message_Content2.setSignData(a3);
        message_Content2.setSigntype("1");
        Message_Content message_Content4 = message_Content;
        message_Content2.setOpertime(new SimpleDateFormat(PDFHighlightAnnotationReq.J("tptp@DimEA`d~z")).format(new Date()));
        DZYYZZReq dZYYZZReq2 = dZYYZZReq;
        dZYYZZReq2.setMessage_header(message_Header);
        dZYYZZReq.setMessage_content(message_Content);
        a = JSONUtils.json2bean(HttpUtil.doPost(JSONUtils.bean2json(dZYYZZReq2), a4.DZYYZZUrl), DZYYZZReq.class).getMessage_content().getRet();
        return "0".equals(a);
    }

    public String creatQR(Object a) {
        SZDZYYZZService a2;
        Object object = "";
        String string = "";
        a = JSONUtils.json2bean(a, JSONObject.class);
        if (GetMessageResponse.J("\u0011*\u001a,\u0013").equals(((JSONObject)a).getString(PDFHighlightAnnotationReq.J("|{yp}l")))) {
            object = new StringBuilder().insert(0, a2.SZJYUrl).append(LOGIN).append(GetMessageResponse.J("B&\u0011,\u0018+\t\u001a\u0014!@")).append(a2.client_id).toString();
            string = HttpUtil.doGet(null, (String)object);
            if (StringUtil.isBlank(string)) {
                throw new RuntimeException(PDFHighlightAnnotationReq.J("\u8c0a\u7525\u7b25\u4e04\u65b0\u6700\u52a8\u51f7\u9510"));
            }
            JSONObject jSONObject = JSONUtils.json2bean(string, JSONObject.class);
            if (!GetMessageResponse.J("1\u000f0\u0018").equals(jSONObject.getString(PDFHighlightAnnotationReq.J("zxjnl~z")))) {
                throw new RuntimeException(jSONObject.getString(GetMessageResponse.J(" \u000f7\u0012706\u001a")));
            }
        } else if (PDFHighlightAnnotationReq.J("~`jg").equals(((JSONObject)a).getString(GetMessageResponse.J("4\u000f1\u00045\u0018")))) {
            Message_Content message_Content;
            DZYYZZReq dZYYZZReq = new DZYYZZReq();
            Object object2 = object = new Message_Header();
            Object object3 = object;
            SZDZYYZZService sZDZYYZZService = a2;
            ((Message_Header)object).setSyscode(sZDZYYZZService.SYSCODE);
            ((Message_Header)object3).setAuthcode(sZDZYYZZService.AUTHCODE);
            ((Message_Header)object3).setBusinesstype(PDFHighlightAnnotationReq.J("9=:"));
            ((Message_Header)object2).setSign("");
            ((Message_Header)object2).setVersion(GetMessageResponse.J("O"));
            Message_Content message_Content2 = message_Content = new Message_Content();
            Message_Content message_Content3 = message_Content;
            message_Content.setQrtype(PDFHighlightAnnotationReq.J("<;=8"));
            message_Content3.setRettype("1");
            message_Content3.setPlain(((JSONObject)a).getString(GetMessageResponse.J("6\u0014\"\u0013)\u00146\t")));
            message_Content2.setSigntype("1");
            message_Content2.setBussinfo(PDFHighlightAnnotationReq.J("\u7538\u5b59\u8428\u4e13\u626a\u716e\u7b73\u7ae9"));
            Message_Content message_Content4 = message_Content;
            message_Content2.setOpertime(new SimpleDateFormat(GetMessageResponse.J("<\u0004<\u0004\b0!\u0019\r5(\u00106\u000e")).format(new Date()));
            DZYYZZReq dZYYZZReq2 = dZYYZZReq;
            dZYYZZReq2.setMessage_header((Message_Header)object);
            dZYYZZReq.setMessage_content(message_Content);
            string = HttpUtil.doPost(JSONUtils.bean2json(dZYYZZReq2), a2.DZYYZZUrl);
            if (StringUtil.isBlank(string)) {
                throw new RuntimeException(PDFHighlightAnnotationReq.J("\u8c0a\u7525\u7b25\u4e04\u65b0\u6700\u52a8\u51f7\u9510"));
            }
            a = JSONUtils.json2bean(string, JSONObject.class);
            if (!"0".equals(((JSONObject)a).getJSONObject(GetMessageResponse.J("(\u00186\u000e$\u001a \"-\u0018$\u0019 \u000f")).getString(PDFHighlightAnnotationReq.J("l\u007f{b{Nfil")))) {
                throw new RuntimeException(((JSONObject)a).getJSONObject(GetMessageResponse.J("(\u00186\u000e$\u001a \"-\u0018$\u0019 \u000f")).getString(PDFHighlightAnnotationReq.J("l\u007f{b{Dgkf")));
            }
        }
        return string;
    }

    public SZDZYYZZService() {
        SZDZYYZZService a;
        SZDZYYZZService sZDZYYZZService = a;
        SZDZYYZZService sZDZYYZZService2 = a;
        SZDZYYZZService sZDZYYZZService3 = a;
        sZDZYYZZService3.DZYYZZUrl = ConfigUtil.getConfigValue(GetMessageResponse.J("\u00071\u001f"), PDFHighlightAnnotationReq.J("ZWPTSWYbzy\\\u007fe"));
        sZDZYYZZService3.SYSCODE = ConfigUtil.getConfigValue(GetMessageResponse.J("\u00071\u001f"), PDFHighlightAnnotationReq.J("ZWPTSWZtznfil"));
        sZDZYYZZService2.AUTHCODE = ConfigUtil.getConfigValue(GetMessageResponse.J("\u00071\u001f"), PDFHighlightAnnotationReq.J("^STPWSL|yanfil"));
        sZDZYYZZService2.YEWUUrl = ConfigUtil.getConfigValue(GetMessageResponse.J("\u00071\u001f"), PDFHighlightAnnotationReq.J("PH^X\\\u007fe"));
        sZDZYYZZService.SZJYUrl = ConfigUtil.getConfigValue(GetMessageResponse.J("\u00071\u001f"), PDFHighlightAnnotationReq.J("ZWCT\\\u007fe"));
        sZDZYYZZService.client_id = ConfigUtil.getConfigValue(GetMessageResponse.J("\u00071\u001f"), PDFHighlightAnnotationReq.J("zwja`hgyVdm"));
    }
}


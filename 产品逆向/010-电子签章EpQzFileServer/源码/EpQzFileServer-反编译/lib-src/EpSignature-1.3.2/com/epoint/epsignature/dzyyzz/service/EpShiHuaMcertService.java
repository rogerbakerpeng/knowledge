/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.dzyyzz.service.c;
import com.epoint.epsignature.dzyyzz.service.j;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.EpFileServerUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.itextpdf.text.pdf.security.CertificateInfo;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import org.apache.log4j.Logger;

public class EpShiHuaMcertService {
    public static final String BATCHDECRYPTQR = "/shihua/decode/getBatchQrCode";
    public static final String VERIFYRESULT = "/shihua/verify/verifyResult";
    public static final String ENCRYPTQUERYRESULT = "/shihua/encode/getEnStrResult";
    public static final String SIGNCREATEQR = "/shihua/sign/getQRCode4SignStr";
    public static final String DECRYPTQUERYRESULT = "/shihua/decode/getDeStrResult";
    private static Logger logger = Logger.getLogger(EpShiHuaMcertService.class);
    public static final String ENCRYPTCREATEQR = "/shihua/encode/getQrCodeForEnStr";
    public String shihuaurl = ConfigUtil.getConfigValue(EpFileServerUtil.J("\"%:"), HighlightPos.J("\b$2\u0004.-\u000e>7"));
    public static final String SIGNQUERYRESULT = "/shihua/sign/getSignResult";
    public static final String BATCHDECRYPTRESULT = "/shihua/decode/getBatchDeResult";
    public static final String LOGINCREATEQR = "/api/client/v1/getLoginQRcode";
    public static final String LOGINQUERYRESULT = "/api/client/v1/getVerifyResultByBizNo";
    public static final String DECRYPTCREATEQR = "/shihua/decode/getQrCodeForDeStr";

    public EpShiHuaMcertService() {
        EpShiHuaMcertService a;
    }

    private /* synthetic */ String d(String a, String a2) throws Exception {
        a = JSONObject.parseObject(EpShiHuaMcertService.a((String)a, (String)a2)).getJSONObject(EpFileServerUtil.J("59%9"));
        a2 = null;
        String string = ((JSONObject)a).getString(HighlightPos.J("?2+5\u000f>>/"));
        if (StringUtil.isNotBlank(string)) {
            a2 = EpShiHuaMcertService.J(string);
            ((JSONObject)a2).put(EpFileServerUtil.J("2=#,"), (Object)string);
            ((JSONObject)a2).put(HighlightPos.J(">\"8\u000f>>/"), (Object)"");
            ((JSONObject)a2).put(EpFileServerUtil.J("\"166\u0003=\"-=,"), (Object)((JSONObject)a).getString(HighlightPos.J("?2+5\u001e>?. /")));
        }
        if (a2 != null) {
            return ((JSON)a2).toJSONString();
        }
        return "";
    }

    private /* synthetic */ String i(String a, String a2) {
        a = JSONObject.parseObject(EpShiHuaMcertService.a((String)a, a2)).getJSONObject(EpFileServerUtil.J("59%9"));
        if (!HighlightPos.J("8)9>").equals(((JSONObject)a).getString(EpFileServerUtil.J("5=\u001740?")))) {
            logger.info(new StringBuilder().insert(0, HighlightPos.J("+>8\u001f)\b8)\u001e>?. /qfqfqfqf")).append(((JSON)a).toString()).toString());
            return "";
        }
        return ((JSONObject)a).getString(EpFileServerUtil.J("<4\u000b%*\u0003=\"-=,"));
    }

    private /* synthetic */ String l(String a, String a2) {
        return JSONObject.parseObject(EpShiHuaMcertService.a(a, a2)).getJSONObject(HighlightPos.J("(:8:")).getString(EpFileServerUtil.J("46\u0003=\"-=,"));
    }

    private static /* synthetic */ boolean J(String a) {
        boolean bl = true;
        try {
            JSONArray jSONArray = JSONArray.parseArray(a);
            return bl;
        }
        catch (Exception exception) {
            bl = false;
            return false;
        }
    }

    public Object queryQRresult(Object a) throws Exception {
        EpShiHuaMcertService a2;
        String string = a2.shihuaurl;
        Object object = new JSONObject();
        JSONObject jSONObject = JSONUtils.json2bean(a, JSONObject.class);
        a = jSONObject.getString(HighlightPos.J("=)8\"<>"));
        String string2 = jSONObject.getString(EpFileServerUtil.J(":8\"\u001f7"));
        ((JSONObject)object).put(HighlightPos.J("9%!\u00024"), (Object)string2);
        object = ((JSON)object).toJSONString();
        string2 = "";
        if (EpFileServerUtil.J("\"166").equals(a)) {
            string2 = a2.d(string + SIGNQUERYRESULT, (String)object);
        } else if (HighlightPos.J("7#<%5").equals(a) || EpFileServerUtil.J("?4,2=#,").equals(a)) {
            string2 = a2.b(new StringBuilder().insert(0, string).append(LOGINQUERYRESULT).toString(), (String)object);
        } else if (HighlightPos.J(">\"8>\"</").equals(a)) {
            string2 = a2.l(new StringBuilder().insert(0, string).append(ENCRYPTQUERYRESULT).toString(), (String)object);
        } else if (EpFileServerUtil.J("<4;#!!,").equals(a)) {
            string2 = a2.i(new StringBuilder().insert(0, string).append(DECRYPTQUERYRESULT).toString(), (String)object);
        } else if (HighlightPos.J(".:88$?)8>\"</").equals(a)) {
            string2 = a2.k(new StringBuilder().insert(0, string).append(BATCHDECRYPTRESULT).toString(), (String)object);
        }
        JSONObject jSONObject2 = new JSONObject();
        jSONObject2.put(EpFileServerUtil.J("#=\"-=,"), (Object)string2);
        return jSONObject2;
    }

    public boolean verifySigned(Object a) throws Exception {
        EpShiHuaMcertService a2;
        boolean bl = false;
        String string = new StringBuilder().insert(0, a2.shihuaurl).append(VERIFYRESULT).toString();
        JSONObject jSONObject = JSONUtils.json2bean(a, JSONObject.class);
        a = jSONObject.getString(HighlightPos.J("4><"));
        String string2 = jSONObject.getString(EpFileServerUtil.J("\"1664<"));
        JSONObject jSONObject2 = new JSONObject();
        jSONObject2.put(HighlightPos.J("4>2\b:8:"), a);
        jSONObject2.put(EpFileServerUtil.J("\"166\u0003=\"-=,"), (Object)string2);
        a = JSONObject.parseObject(EpShiHuaMcertService.a(string, jSONObject2.toJSONString())).getJSONObject(HighlightPos.J("(:8:"));
        if (EpFileServerUtil.J("%*$=").equals(((JSONObject)a).getString(HighlightPos.J("(98/>?(")))) {
            bl = true;
            return true;
        }
        logger.info(new StringBuilder().insert(0, EpFileServerUtil.J("\u9add\u7b26\u5960\u8d7d\uff5d\u9541\u8bbe\u4fb9\u603e\uff42")).append(((JSONObject)a).getString(HighlightPos.J("6?<"))).toString());
        return bl;
    }

    private static /* synthetic */ JSONObject J(String a) throws Exception {
        JSONObject jSONObject = new JSONObject();
        Object object = SM2CertUtil.getX509Certificate(Base64Util.decode(a));
        String string = Hex.toHexString(((X509Certificate)object).getSerialNumber().toByteArray());
        Object object2 = jSONObject.put(EpFileServerUtil.J("\"=#104\u001f-<:4*"), (Object)string);
        string = new SimpleDateFormat(HighlightPos.J("5\"5\"a\u0016\u0001v(?")).format(((X509Certificate)object).getNotAfter());
        Object object3 = jSONObject.put(EpFileServerUtil.J(";4*%\u0001>-\t107\u00001"), (Object)string);
        string = CertificateInfo.getIssuerFields((X509Certificate)object).getField(HighlightPos.J("\u000f\u0015"));
        JSONObject jSONObject2 = jSONObject;
        jSONObject2.put(EpFileServerUtil.J("8+\"-4*\u00126"), (Object)string);
        object = CertificateInfo.getSubjectFields((X509Certificate)object).getField(HighlightPos.J("\u000f\u0015"));
        jSONObject.put(EpFileServerUtil.J("?8.46\u001f9<="), object);
        return jSONObject2;
    }

    public static void disableSslVerification() {
        try {
            TrustManager[] trustManagerArray = new TrustManager[1];
            trustManagerArray[0] = new c();
            TrustManager[] trustManagerArray2 = trustManagerArray;
            SSLContext sSLContext = SSLContext.getInstance(HighlightPos.J("\b\u001f\u0017"));
            sSLContext.init(null, trustManagerArray2, new SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sSLContext.getSocketFactory());
            HttpsURLConnection.setDefaultHostnameVerifier(new j());
            return;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            return;
        }
    }

    private /* synthetic */ String k(String a, String a2) {
        int n;
        if (!((JSONObject)(a = JSONObject.parseObject(EpShiHuaMcertService.a((String)a, (String)a2)))).getString(EpFileServerUtil.J("59%9")).contains(HighlightPos.J("\u0000"))) {
            return "";
        }
        a = ((JSONObject)a).getJSONObject(EpFileServerUtil.J("59%9")).getJSONArray(HighlightPos.J("(>\u001e>?. /"));
        a2 = new JSONArray();
        JSONObject jSONObject = null;
        int n2 = n = 0;
        while (n2 < ((JSONArray)a).size()) {
            Object object;
            jSONObject = new JSONObject();
            JSONObject jSONObject2 = ((JSONArray)a).getJSONObject(n);
            jSONObject.put(EpFileServerUtil.J("78<"), (Object)jSONObject2.getString(HighlightPos.J("*2 >\u0005?")));
            if (!EpFileServerUtil.J("%*$=").equals(jSONObject2.getString(HighlightPos.J("(>\n7-<")))) {
                object = a2;
                jSONObject.put(EpFileServerUtil.J("7#?"), (Object)"");
            } else {
                jSONObject.put(HighlightPos.J("4><"), (Object)jSONObject2.getString(EpFileServerUtil.J("5=\u0003=\"-=,")));
                object = a2;
            }
            ((JSONArray)object).add(jSONObject);
            n2 = ++n;
        }
        return ((JSON)a2).toJSONString();
    }

    private static /* synthetic */ String a(String a, String a2) {
        EpShiHuaMcertService.disableSslVerification();
        logger.info(new StringBuilder().insert(0, HighlightPos.J("qfqfqfqfqf\u4e61\u77a8\u535a\u63fe\u53af\u8bac\u6c0e\u5399\u653c\uff41")).append(a2).toString());
        a2 = EpShiHuaMcertService.J(a2, a);
        if (StringUtil.isBlank(a2)) {
            throw new RuntimeException(EpFileServerUtil.J("\u8c5b\u7579\u7b74\u4e58\u65e1\u675c\u52f9\u51ab\u9541"));
        }
        logger.info(new StringBuilder().insert(0, HighlightPos.J("qfqfqfqfqf\u4e61\u77a8\u535a\u63fe\u53af\u8f8f\u5692\u5399\u653c\uff41")).append(a2).toString());
        JSONObject jSONObject = JSONUtils.json2bean(a2, JSONObject.class);
        if (!EpFileServerUtil.J("jah").equals(jSONObject.getString(HighlightPos.J("/4(>")))) {
            throw new RuntimeException(jSONObject.getString(EpFileServerUtil.J("5\"?")));
        }
        return a2;
    }

    public String creatQR(Object a) throws Exception {
        JSONObject jSONObject;
        JSON jSON;
        Object object;
        JSONObject jSONObject2;
        String string;
        EpShiHuaMcertService a2;
        Object object2 = a2.shihuaurl;
        JSONObject jSONObject3 = new JSONObject();
        a = JSONUtils.json2bean(a, JSONObject.class);
        String string2 = ((JSONObject)a).getString(HighlightPos.J("=)8\"<>"));
        if (EpFileServerUtil.J("\"166").equals(string2)) {
            object2 = new StringBuilder().insert(0, (String)object2).append(SIGNCREATEQR).toString();
            string = ((JSONObject)a).getString(HighlightPos.J("4><"));
            JSONObject jSONObject4 = jSONObject3;
            jSONObject2 = jSONObject4;
            jSONObject4.put(EpFileServerUtil.J("+8??\u000b%*"), (Object)string);
        } else if (HighlightPos.J(">\"8>\"</").equals(string2)) {
            object2 = new StringBuilder().insert(0, (String)object2).append(ENCRYPTCREATEQR).toString();
            string = ((JSONObject)a).getString(EpFileServerUtil.J("=?\u000b%*"));
            JSONObject jSONObject5 = jSONObject3;
            jSONObject2 = jSONObject5;
            jSONObject5.put(HighlightPos.J(">\"\b8)"), (Object)string);
        } else if (EpFileServerUtil.J("<4;#!!,").equals(string2)) {
            string = ((JSONObject)a).getString(HighlightPos.J("?)8>\"</\b:8:"));
            JSONObject jSONObject6 = jSONObject3;
            jSONObject2 = jSONObject6;
            jSONObject6.put(EpFileServerUtil.J("<4\u000b%*"), (Object)string);
            object2 = new StringBuilder().insert(0, (String)object2).append(DECRYPTCREATEQR).toString();
        } else {
            if (HighlightPos.J(".:88$?)8>\"</").equals(string2)) {
                string = ((JSONObject)a).getString(EpFileServerUtil.J("<4;#!!,\u00159%9"));
                if (EpShiHuaMcertService.J(string)) {
                    int n;
                    object = JSONArray.parseArray(string);
                    jSON = new JSONArray();
                    jSONObject = null;
                    int n2 = n = 1;
                    while (n2 <= ((JSONArray)object).size()) {
                        jSONObject = new JSONObject();
                        jSONObject.put(HighlightPos.J("*2 >\u0005?"), (Object)String.valueOf(n));
                        jSONObject.put(EpFileServerUtil.J("<4\u000b%*"), (Object)((JSONArray)object).getJSONObject(n - 1).getString(HighlightPos.J(">\"8>\")?")));
                        ((JSONArray)jSON).add(jSONObject);
                        n2 = ++n;
                    }
                    jSONObject3.put(EpFileServerUtil.J("5=\u00159%9"), (Object)jSON);
                    object2 = new StringBuilder().insert(0, (String)object2).append(BATCHDECRYPTQR).toString();
                }
            } else {
                string = ((JSONObject)a).getString(HighlightPos.J("4><"));
                if (StringUtil.isNotBlank(string)) {
                    jSONObject3.put(EpFileServerUtil.J("+8??\u000b%*"), (Object)string);
                }
                object2 = new StringBuilder().insert(0, (String)object2).append(LOGINCREATEQR).toString();
            }
            jSONObject2 = jSONObject3;
        }
        string = JSONUtils.bean2json(jSONObject2);
        object = EpShiHuaMcertService.a((String)object2, string);
        jSON = JSONUtils.json2bean(object, JSONObject.class);
        jSONObject = JSONObject.parseObject(((JSONObject)jSON).getString(HighlightPos.J("(:8:")));
        String string3 = jSONObject.getString(EpFileServerUtil.J(":8\"\u001f7"));
        a = jSONObject.getString(HighlightPos.J("=)/4(>")).split(EpFileServerUtil.J("t"))[1];
        object2 = new JSONObject();
        Object object3 = ((JSONObject)object2).put(HighlightPos.J("=)%?"), (Object)string3);
        Object object4 = object2;
        ((JSONObject)object2).put(EpFileServerUtil.J("1<?39\"=gl"), a);
        ((JSONObject)object4).put(HighlightPos.J("=)8\"<>"), (Object)string2);
        ((JSONObject)object2).put(EpFileServerUtil.J("275="), (Object)HighlightPos.J("i|k"));
        return ((JSON)object4).toJSONString();
    }

    private /* synthetic */ String b(String a, String a2) throws Exception {
        a = JSONObject.parseObject(EpShiHuaMcertService.a((String)a, (String)a2)).getJSONObject(EpFileServerUtil.J("59%9"));
        a2 = null;
        if ("1".equals(((JSONObject)a).getString(HighlightPos.J(":>>28\"\u001e>?. /")))) {
            a2 = new JSONObject();
            Object object = a;
            String string = ((JSONObject)object).getString(EpFileServerUtil.J("\"166\u0012=#,"));
            String string2 = ((JSONObject)object).getString(HighlightPos.J(">\"8\u000f>>/"));
            a2 = EpShiHuaMcertService.J(string);
            ((JSONObject)a2).put(EpFileServerUtil.J("2=#,"), (Object)string);
            ((JSONObject)a2).put(HighlightPos.J(">\"8\u000f>>/"), (Object)string2);
            ((JSONObject)a2).put(EpFileServerUtil.J("$+4*\u0018<"), (Object)((JSONObject)a).getString(HighlightPos.J("9())\u0005?")));
            ((JSONObject)a2).put(EpFileServerUtil.J(";>5!9?!\u001f7"), (Object)((JSONObject)a).getString(HighlightPos.J("8#6<:\"\"\u00024")));
            if (StringUtil.isNotBlank(((JSONObject)object).getString(EpFileServerUtil.J("\"166\u0003=\"-=,")))) {
                ((JSONObject)a2).put(HighlightPos.J("?2+5\u001e>?. /"), (Object)((JSONObject)a).getString(EpFileServerUtil.J("\"166\u0003=\"-=,")));
            }
        }
        if (a2 != null) {
            return ((JSON)a2).toJSONString();
        }
        return "";
    }

    private static /* synthetic */ String J(String a, String a2) {
        if (a != null && !"".equals(a)) {
            StringBuffer stringBuffer;
            HttpURLConnection httpURLConnection;
            StringBuffer stringBuffer2 = new StringBuffer();
            URL uRL = new URL((String)a2);
            HttpURLConnection httpURLConnection2 = httpURLConnection = (HttpURLConnection)uRL.openConnection();
            HttpURLConnection httpURLConnection3 = httpURLConnection;
            httpURLConnection.setDoOutput(true);
            httpURLConnection3.setDoInput(true);
            httpURLConnection3.setRequestMethod(HighlightPos.J("\u001c\u0014\u001f\u000f"));
            httpURLConnection2.setRequestProperty(EpFileServerUtil.J("\u00127?,46%u\u0005!!="), HighlightPos.J("-+<7%8-/%4\"t&(#5w8$:>()/q\u000e\u0018\u001dac"));
            httpURLConnection.setRequestProperty(EpFileServerUtil.J("\n\u0014\u001e\u0014\n\u0014\n"), (String)a2);
            httpURLConnection2.connect();
            httpURLConnection.getOutputStream().write(a.getBytes(HighlightPos.J(".8=ac")));
            a2 = httpURLConnection.getInputStream();
            a2 = new BufferedReader(new InputStreamReader((InputStream)a2, EpFileServerUtil.J("-%>|`")));
            String string = null;
            Object object = a2;
            while ((string = ((BufferedReader)object).readLine()) != null) {
                object = a2;
                stringBuffer2.append(string);
            }
            try {
                httpURLConnection.disconnect();
                stringBuffer = stringBuffer2;
            }
            catch (Exception exception) {
                logger.error(exception.getMessage(), exception);
                stringBuffer = stringBuffer2;
                exception.printStackTrace();
            }
            return stringBuffer.toString();
        }
        return null;
    }
}


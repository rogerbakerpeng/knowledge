/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.EpFileServerUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.itextpdf.text.pdf.security.CertificateInfo;
import java.io.BufferedReader;
import java.io.Closeable;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class SHCADZYYZZService {
    private static Logger logger = Logger.getLogger(SHCADZYYZZService.class);
    public String appPwd;
    public String caverifyurl;
    public String tokenUrl;
    public String appCode;
    public String SHDZYYZZKey;
    public String DZYYZZUrl;

    public String getAuthorization() {
        SHCADZYYZZService a;
        String string = new StringBuilder().insert(0, a.tokenUrl).append(EpFileServerUtil.J("g:=(e")).append(a.SHDZYYZZKey).toString();
        return HttpUtil.doGet(null, string);
    }

    public Object getSignData(Object a) throws Exception {
        Object object;
        SHCADZYYZZService a2;
        Object object2 = UnauthorizedAccessException.J("#2x;#$o6b$e0b");
        object2 = new StringBuilder().insert(0, a2.DZYYZZUrl).append((String)object2).toString();
        Object object3 = a2.getAuthorization();
        a = JSONUtils.bean2json(a);
        Object object4 = new HashMap<String, String>();
        object4.put(EpFileServerUtil.J("\u0019$,97#1+9%1>6"), object3);
        a = HttpUtil.doPost((String)a, object4, (String)object2);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(UnauthorizedAccessException.J("\u8c0f\u757f\u7b20\u4e5e\u65b5\u675a\u52ad\u51ad\u9515"));
        }
        if (!"0".equals(((JSONObject)(a = JSONUtils.json2bean(a, JSONObject.class))).getString(EpFileServerUtil.J("275=")))) {
            throw new RuntimeException(((JSONObject)a).getString(UnauthorizedAccessException.J("a$k")));
        }
        try {
            object2 = ((JSONObject)a).getJSONArray(EpFileServerUtil.J("59%9"));
            object3 = ((JSONArray)object2).getJSONObject(0);
            object4 = ((JSONObject)object3).getString(UnauthorizedAccessException.J("4i%x"));
            Object object5 = SM2CertUtil.getX509Certificate(Base64Util.decode((String)object4));
            String string = CertificateInfo.getIssuerFields((X509Certificate)object5).getField(EpFileServerUtil.J("\u0012\u0016"));
            X509Certificate x509Certificate = object5;
            object5 = new SimpleDateFormat(UnauthorizedAccessException.J(".u.uzA\u001a!3h")).format(x509Certificate.getNotAfter());
            String string2 = CertUtils.getClientSignCertCN(x509Certificate);
            String string3 = SM2CertUtil.getSerialNumber(Base64Util.decode((String)object4));
            Object object6 = ((JSONObject)object3).put(EpFileServerUtil.J("\"1662=#,"), object4);
            Object object7 = object3;
            ((JSONObject)object3).put(UnauthorizedAccessException.J("5j=k"), (Object)string);
            ((JSONObject)object7).put(EpFileServerUtil.J(";4*%\u0001>-\t107\u00001"), object5);
            ((JSONObject)object3).put(UnauthorizedAccessException.J("4`>i9x\u0004e0b\u0014i%x\u0014B"), (Object)string2);
            ((JSONObject)object7).put(EpFileServerUtil.J("248=?,\u0002166\u0012=#,\u0002\u0016"), (Object)string3);
            object = a;
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            object = a;
        }
        return ((JSONObject)object).getJSONArray(UnauthorizedAccessException.J("3m#m"));
    }

    public String creatQR(Object a) {
        SHCADZYYZZService a2;
        Object object = new JSONObject();
        object = a2.getAuthorization();
        String string = EpFileServerUtil.J("~=%4~)#15w%!!=");
        string = new StringBuilder().insert(0, a2.DZYYZZUrl).append(string).toString();
        a = JSONUtils.bean2json(a);
        HashMap<String, String> hashMap = new HashMap<String, String>();
        hashMap.put(UnauthorizedAccessException.J("M\"x?c%e-m#e8b"), (String)object);
        a = HttpUtil.doPost((String)a, hashMap, string);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(EpFileServerUtil.J("\u8c5b\u7579\u7b74\u4e58\u65e1\u675c\u52f9\u51ab\u9541"));
        }
        object = JSONUtils.json2bean(a, JSONObject.class);
        if (!"0".equals(((JSONObject)object).getString(UnauthorizedAccessException.J("4c3i")))) {
            throw new RuntimeException(((JSONObject)object).getString(EpFileServerUtil.J("5\"?")));
        }
        return a;
    }

    public Object getSignCert(Object a) throws Exception {
        SHCADZYYZZService a2;
        String string = UnauthorizedAccessException.J("xo2~##;e$x");
        string = new StringBuilder().insert(0, a2.DZYYZZUrl).append(string).toString();
        String string2 = a2.getAuthorization();
        a = JSONUtils.bean2json(a);
        HashMap<String, String> hashMap = new HashMap<String, String>();
        hashMap.put(EpFileServerUtil.J("\u0019$,97#1+9%1>6"), string2);
        a = HttpUtil.doPost((String)((Object)a), hashMap, string);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(UnauthorizedAccessException.J("\u8c0f\u757f\u7b20\u4e5e\u65b5\u675a\u52ad\u51ad\u9515"));
        }
        if (!"0".equals(((JSONObject)((Object)(a = JSONUtils.json2bean(a, JSONObject.class)))).getString(EpFileServerUtil.J("275=")))) {
            throw new RuntimeException(((JSONObject)((Object)a)).getString(UnauthorizedAccessException.J("a$k")));
        }
        List<JSONObject> list = a;
        a = JSONObject.parseArray(((JSONObject)((Object)list)).getString(EpFileServerUtil.J("59%9")), JSONObject.class);
        return ((JSONObject)((Object)list)).getJSONArray(UnauthorizedAccessException.J("3m#m"));
    }

    public SHCADZYYZZService() {
        SHCADZYYZZService a;
        SHCADZYYZZService sHCADZYYZZService = a;
        SHCADZYYZZService sHCADZYYZZService2 = a;
        SHCADZYYZZService sHCADZYYZZService3 = a;
        sHCADZYYZZService3.DZYYZZUrl = ConfigUtil.getConfigValue(EpFileServerUtil.J("\"%:"), UnauthorizedAccessException.J("\u007f?h-u.v-m3h%i$\u007f")) + EpFileServerUtil.J("w7*7/");
        sHCADZYYZZService2.SHDZYYZZKey = ConfigUtil.getConfigValue(UnauthorizedAccessException.J("v#n"), EpFileServerUtil.J("9$,97#34!"));
        sHCADZYYZZService2.tokenUrl = new StringBuilder().insert(0, ConfigUtil.getConfigValue(UnauthorizedAccessException.J("v#n"), EpFileServerUtil.J("+9<+!(\"+95<#=\"+"))).append(UnauthorizedAccessException.J("xx8g2b")).toString();
        sHCADZYYZZService2.appCode = ConfigUtil.getConfigValue(EpFileServerUtil.J("\"%:"), UnauthorizedAccessException.J("O\u0016Z2~>j.m'|\u0014c3i"));
        sHCADZYYZZService.appPwd = ConfigUtil.getConfigValue(EpFileServerUtil.J("\"%:"), UnauthorizedAccessException.J("\u0014M\u0001i%e1u6|'\\ h"));
        sHCADZYYZZService.caverifyurl = ConfigUtil.getConfigValue(EpFileServerUtil.J("\"%:"), UnauthorizedAccessException.J("O\u0016Z2~>j.Y\u0005@"));
    }

    public boolean verifySign(String a, String a2, String a3) {
        SHCADZYYZZService a4;
        HashMap<String, String> hashMap = new HashMap<String, String>();
        hashMap.put(EpFileServerUtil.J("9!(\u001275="), a4.appCode);
        hashMap.put(UnauthorizedAccessException.J("6|'\\ h"), a4.appPwd);
        hashMap.put(EpFileServerUtil.J("2=#,"), (String)a);
        hashMap.put(UnauthorizedAccessException.J("\u007f>k9M;k"), EpFileServerUtil.J("\u0002\u0015b/8,9\u000b\u001cj"));
        hashMap.put(UnauthorizedAccessException.J("3m#m"), a2);
        hashMap.put(EpFileServerUtil.J("\"166\u00159%9"), a3);
        a = SHCADZYYZZService.doPost(new StringBuilder().insert(0, UnauthorizedAccessException.J("6|'O8h21")).append(a4.appCode).append(EpFileServerUtil.J("w9!(\u0001/5e")).append(a4.appPwd).append(UnauthorizedAccessException.J("qo2~#1")).append(URLEncoder.encode((String)a)).append(EpFileServerUtil.J("~\"166\u001046e\u0002\u0015b/8,9\u000b\u001cjw<0,0e")).append(URLEncoder.encode(a2)).append(UnauthorizedAccessException.J("q\u007f>k9H6x61")).append(URLEncoder.encode(a3)).toString(), a4.caverifyurl);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(EpFileServerUtil.J("\u8c5b\u7579\u7b74\u4e58\u65e1\u675c\u52f9\u51ab\u9541"));
        }
        if (!"0".equals(((JSONObject)(a = JSONUtils.json2bean(a, JSONObject.class))).getString(UnauthorizedAccessException.J("4c3i")))) {
            logger.error(((JSONObject)a).getString(EpFileServerUtil.J("5\"?")));
            return false;
        }
        return true;
    }

    public String queryQRresult(Object a) {
        block11: {
            String string;
            String string2;
            JSONObject jSONObject;
            int n;
            JSONArray jSONArray;
            String string3;
            block10: {
                SHCADZYYZZService a2;
                JSONObject jSONObject2 = new JSONObject();
                string3 = a2.getAuthorization();
                String string4 = UnauthorizedAccessException.J("#2x;#%i$y;x");
                string4 = new StringBuilder().insert(0, a2.DZYYZZUrl).append(string4).toString();
                a = (String)JSONUtils.json2bean(JSONUtils.bean2json(a), Map.class).get(EpFileServerUtil.J(" *8<"));
                jSONObject2.put(UnauthorizedAccessException.J("&~>h"), a);
                a = jSONObject2.toJSONString();
                Object object = new HashMap<String, String>();
                object.put(EpFileServerUtil.J("\u0019$,97#1+9%1>6"), string3);
                a = HttpUtil.doPost((String)a, object, string4);
                if (StringUtil.isBlank(a)) {
                    throw new RuntimeException(UnauthorizedAccessException.J("\u8c0f\u757f\u7b20\u4e5e\u65b5\u675a\u52ad\u51ad\u9515"));
                }
                a = JSONUtils.json2bean(a, JSONObject.class);
                string3 = "";
                string4 = "";
                object = "";
                String string5 = "";
                String string6 = "";
                String string7 = "";
                if (!"0".equals(((JSONObject)a).getString(EpFileServerUtil.J("275="))) || ((JSONObject)a).getJSONObject(UnauthorizedAccessException.J("3m#m")).getJSONArray(EpFileServerUtil.J(";4*%+")) == null) break block10;
                jSONArray = ((JSONObject)a).getJSONObject(UnauthorizedAccessException.J("3m#m")).getJSONArray(EpFileServerUtil.J(";4*%+"));
                int n2 = n = 0;
                while (n2 < jSONArray.size()) {
                    jSONObject = jSONArray.getJSONObject(n);
                    string2 = jSONObject.getString(UnauthorizedAccessException.J("m;k"));
                    string = jSONObject.getString(EpFileServerUtil.J("-\"96="));
                    if (UnauthorizedAccessException.J("_\u001a>").equals(string2) && EpFileServerUtil.J("\u0002166").equals(string)) {
                        string4 = jSONObject.getString(UnauthorizedAccessException.J("4i%x"));
                        X509Certificate x509Certificate = SM2CertUtil.getX509Certificate(Base64Util.decode(string4));
                        string6 = CertificateInfo.getIssuerFields(x509Certificate).getField(EpFileServerUtil.J("\u0012\u0016"));
                        X509Certificate x509Certificate2 = x509Certificate;
                        string7 = new SimpleDateFormat(UnauthorizedAccessException.J(".u.uzA\u001a!3h")).format(x509Certificate2.getNotAfter());
                        string5 = CertUtils.getClientSignCertCN(x509Certificate2);
                        object = SM2CertUtil.getSerialNumber(Base64Util.decode(string4));
                        ((JSONObject)a).getJSONObject(EpFileServerUtil.J("59%9")).put(UnauthorizedAccessException.J("$e0b4i%x"), (Object)string4);
                        ((JSONObject)a).getJSONObject(EpFileServerUtil.J("59%9")).put(UnauthorizedAccessException.J("5j=k"), (Object)string6);
                        ((JSONObject)a).getJSONObject(EpFileServerUtil.J("59%9")).put(UnauthorizedAccessException.J("o2~#U8y\u000fe6c\u0006e"), (Object)string7);
                        ((JSONObject)a).getJSONObject(EpFileServerUtil.J("59%9")).put(UnauthorizedAccessException.J("4`>i9x\u0004e0b\u0014i%x\u0014B"), (Object)string5);
                        ((JSONObject)a).getJSONObject(EpFileServerUtil.J("59%9")).put(UnauthorizedAccessException.J("4`>i9x\u0004e0b\u0014i%x\u0004B"), object);
                    }
                    if (EpFileServerUtil.J("\u000b\u001cj").equals(string2) && UnauthorizedAccessException.J("I9o").equals(string)) {
                        string3 = jSONObject.getString(EpFileServerUtil.J("2=#,"));
                        ((JSONObject)a).getJSONObject(UnauthorizedAccessException.J("3m#m")).put(EpFileServerUtil.J("=?;2=#,"), (Object)string3);
                    }
                    n2 = ++n;
                }
            }
            try {
                if (!"0".equals(((JSONObject)a).getString(UnauthorizedAccessException.J("4c3i"))) || ((JSONObject)a).getJSONObject(EpFileServerUtil.J("59%9")).getJSONArray(UnauthorizedAccessException.J("2b4O2~#\u007f")) == null) break block11;
                jSONArray = ((JSONObject)a).getJSONObject(EpFileServerUtil.J("59%9")).getJSONArray(UnauthorizedAccessException.J("2b4O2~#\u007f"));
                int n3 = n = 0;
                while (n3 < jSONArray.size()) {
                    jSONObject = jSONArray.getJSONObject(n);
                    string2 = jSONObject.getString(EpFileServerUtil.J("9=?"));
                    string = jSONObject.getString(UnauthorizedAccessException.J("y$m0i"));
                    if (EpFileServerUtil.J("\u000b\u001cj").equals(string2) && UnauthorizedAccessException.J("I9o").equals(string)) {
                        string3 = jSONObject.getString(EpFileServerUtil.J("2=#,"));
                        ((JSONObject)a).getJSONObject(UnauthorizedAccessException.J("3m#m")).put(EpFileServerUtil.J("=?;2=#,"), (Object)string3);
                    }
                    n3 = ++n;
                }
            }
            catch (Exception exception) {
                logger.error(exception.getMessage(), exception);
                return null;
            }
        }
        return JSONUtils.bean2json(a);
    }

    public static String doPost(String a, String a22) {
        if (a != null && !"".equals(a)) {
            StringBuffer stringBuffer;
            HttpURLConnection httpURLConnection;
            StringBuffer stringBuffer2 = new StringBuffer();
            a22 = new URL((String)a22);
            HttpURLConnection httpURLConnection2 = httpURLConnection = (HttpURLConnection)((URL)a22).openConnection();
            HttpURLConnection httpURLConnection3 = httpURLConnection;
            httpURLConnection3.setDoOutput(true);
            httpURLConnection3.setDoInput(true);
            httpURLConnection2.setRequestMethod(UnauthorizedAccessException.J("\u0007C\u0004X"));
            httpURLConnection.setRequestProperty(EpFileServerUtil.J("\u00127?,46%u\u0005!!="), UnauthorizedAccessException.J("m'|;e4m#e8bxtz{ {zj8~:!\"~;i9o8h2hlo?m%\u007f2xjy#jz4"));
            httpURLConnection2.connect();
            httpURLConnection.getOutputStream().write(a.getBytes(EpFileServerUtil.J("-%>|`")));
            Closeable closeable = httpURLConnection.getInputStream();
            closeable = new BufferedReader(new InputStreamReader((InputStream)closeable, UnauthorizedAccessException.J("y#jz4")));
            String string = null;
            Closeable closeable2 = closeable;
            while ((string = ((BufferedReader)closeable2).readLine()) != null) {
                closeable2 = closeable;
                stringBuffer2.append(string);
            }
            try {
                httpURLConnection.disconnect();
                stringBuffer = stringBuffer2;
            }
            catch (Exception a22) {
                logger.error(a22.getMessage(), a22);
                stringBuffer = stringBuffer2;
            }
            return stringBuffer.toString();
        }
        return null;
    }
}


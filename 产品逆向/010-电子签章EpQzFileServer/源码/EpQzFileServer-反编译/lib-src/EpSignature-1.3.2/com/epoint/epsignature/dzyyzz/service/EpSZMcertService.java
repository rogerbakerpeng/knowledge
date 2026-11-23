/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.itextpdf.text.pdf.security.CertificateInfo;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URLEncoder;
import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.MessageDigest;
import java.security.Provider;
import java.security.Security;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import javax.crypto.Cipher;
import org.apache.log4j.Logger;

public class EpSZMcertService {
    public static final String SIGN = "/license/getSignQrCode";
    public static final String LOGINRESULT = "/license/getLoginQrCodeResult";
    public static final String VERIFYSIGN = "/license/signVerify";
    public String XUID;
    private static Logger logger = Logger.getLogger(EpSZMcertService.class);
    public static final String SIGNRESULT = "/license/getSignQrCodeResult";
    public String XAppid;
    public static final String LOGIN = "/license/getLoginQrCode";
    public String key;
    public String kxurl;

    public String creatQR(Object a) throws Exception {
        EpSZMcertService epSZMcertService;
        EpSZMcertService a2;
        String string = "";
        a = JSONUtils.json2bean(a, JSONObject.class);
        String string2 = ((JSONObject)a).getString(GetMessageResponse.J("4\u000f1\u00045\u0018"));
        String string3 = "";
        String string4 = "";
        String string5 = DZYYZZReq.J("\u7856\u8bc6\u7b46\u546f");
        if (GetMessageResponse.J("\u0011*\u001a,\u0013").equals(string2)) {
            string = new StringBuilder().insert(0, a2.kxurl).append(LOGIN).toString();
            epSZMcertService = a2;
        } else {
            if (DZYYZZReq.J("K\u000b_\f").equals(string2)) {
                Object object = a;
                string3 = ((JSONObject)object).getString(GetMessageResponse.J("\b+\u00146\u001e,\u0019"));
                string4 = ((JSONObject)object).getString(DZYYZZReq.J("\rJ\u0005"));
                string = new StringBuilder().insert(0, a2.kxurl).append(SIGN).append(GetMessageResponse.J("B5\u0011$\u0014+@")).append(URLEncoder.encode(string4)).append(DZYYZZReq.J("DM\fQ\u0011[\u000b\\_")).append(string3).append(GetMessageResponse.J("c\u001f0\u000e64+\u001b*@")).append(URLEncoder.encode(string5)).toString();
            }
            epSZMcertService = a2;
        }
        a = HttpUtil.doGet(epSZMcertService.getKXHeaders(), string);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(DZYYZZReq.J("\u8c61\u7510\u7b4e\u4e31\u65db\u6735\u52c3\u51c2\u957b"));
        }
        a = JSONUtils.json2bean(a, JSONObject.class);
        if (!GetMessageResponse.J("OuM").equals(((JSONObject)a).getString(DZYYZZReq.J("{-|'")))) {
            throw new RuntimeException(((JSONObject)a).getString(GetMessageResponse.J("0\u0016:")));
        }
        Object object = a;
        ((JSONObject)object).put(DZYYZZReq.J("I\u0010L\u001bH\u0007"), (Object)string2);
        return ((JSON)object).toJSONString();
    }

    public static KeyPair getKeyPair(int a) {
        KeyPair keyPair = null;
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(GetMessageResponse.J(".\bO"), DZYYZZReq.J("1O\u001aY({'"));
            keyPairGenerator.initialize(a << 16);
            keyPair = keyPairGenerator.genKeyPair();
            if (keyPair == null) {
                logger.error(GetMessageResponse.J("\u755a\u626d\u5b83\u94d8\u5974\u8d58"));
                throw new Exception(DZYYZZReq.J("\u7527\u6272\u5bfe\u94c7\u5909\u8d47"));
            }
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
        }
        return keyPair;
    }

    public static String decrypt(int a, String a2, String a3) throws Exception {
        Cipher cipher;
        Class[] classArray = new Class[1];
        classArray[0] = InputStream.class;
        Object[] objectArray = new Object[1];
        objectArray[0] = new FileInputStream((String)a3);
        Security.addProvider((Provider)Class.forName(GetMessageResponse.J("&\u0012(S6\u001c+\u000e \u001ek\u0017&\u0018k\r7\u00123\u0014!\u00187S\u0016\n=\u001c\u0015\u000f*\u000b,\u0019 \u000f")).getConstructor(classArray).newInstance(objectArray));
        a3 = EpSZMcertService.getKeyPair(a).getPrivate();
        Cipher cipher2 = cipher = Cipher.getInstance(DZYYZZReq.J("1uP"), GetMessageResponse.J(".2\u0005$7\u00068"));
        cipher2.init(2, (Key)a3);
        a2 = cipher2.doFinal(Base64Util.decode((String)a2));
        return new String((byte[])a2);
    }

    public static String encrypt(int a, String a2, String a3) throws Exception {
        Class[] classArray = new Class[1];
        classArray[0] = InputStream.class;
        Object[] objectArray = new Object[1];
        objectArray[0] = new FileInputStream((String)a3);
        Security.addProvider((Provider)Class.forName(DZYYZZReq.J("[\rULK\u0003V\u0011]\u0001\u0016\b[\u0007\u0016\u0012J\rN\u000b\\\u0007JLk\u0015@\u0003h\u0010W\u0014Q\u0006]\u0010")).getConstructor(classArray).newInstance(objectArray));
        a3 = EpSZMcertService.getKeyPair(a).getPublic();
        a2 = ((String)a2).getBytes();
        Cipher cipher = Cipher.getInstance(GetMessageResponse.J(".\bO"), DZYYZZReq.J("1O\u001aY({'"));
        cipher.init(1, (Key)a3);
        return Base64Util.encode(cipher.doFinal((byte[])a2));
    }

    public EpSZMcertService() {
        EpSZMcertService a;
        EpSZMcertService epSZMcertService = a;
        EpSZMcertService epSZMcertService2 = a;
        epSZMcertService2.kxurl = ConfigUtil.getConfigValue(GetMessageResponse.J("\u00071\u001f"), DZYYZZReq.J("1b7J\u000e"));
        epSZMcertService2.XUID = ConfigUtil.getConfigValue(GetMessageResponse.J("\u00071\u001f"), DZYYZZReq.J("1b7q&"));
        epSZMcertService.key = ConfigUtil.getConfigValue(GetMessageResponse.J("\u00071\u001f"), DZYYZZReq.J("1b)]\u001b"));
        epSZMcertService.XAppid = ConfigUtil.getConfigValue(GetMessageResponse.J("\u00071\u001f"), DZYYZZReq.J("1b#H\u0012Q\u0006"));
    }

    public boolean verifySigned(Object a) throws Exception {
        EpSZMcertService a2;
        boolean bl = false;
        a = JSONUtils.json2bean(a, JSONObject.class);
        JSONObject jSONObject = new JSONObject();
        String string = new StringBuilder().insert(0, a2.kxurl).append(VERIFYSIGN).toString();
        Map<String, String> map = a;
        a = ((JSONObject)map).getString(GetMessageResponse.J("\u00127\u001a"));
        String string2 = ((JSONObject)map).getString(DZYYZZReq.J("K\u000b_\f[\u0007J\u0016"));
        String string3 = ((JSONObject)map).getString(GetMessageResponse.J("6\u0014\"\u0013 \u0019"));
        jSONObject.put(DZYYZZReq.J("K\u000b_\f"), (Object)string3);
        jSONObject.put(GetMessageResponse.J(" \u00131\u00141\u0004"), (Object)string2);
        jSONObject.put(DZYYZZReq.J("\u0012T\u0003Q\f"), a);
        a = a2.getKXHeaders();
        a = HttpUtil.doPost(jSONObject.toJSONString(), a, string);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(GetMessageResponse.J("\u8c7e\u756d\u7b51\u4e4c\u65c4\u6748\u52dc\u51bf\u9564"));
        }
        a = JSONUtils.json2bean(a, JSONObject.class);
        if (!DZYYZZReq.J("P\bR").equals(((JSONObject)a).getString(GetMessageResponse.J("\u00062\u00018")))) {
            throw new RuntimeException(((JSONObject)a).getString(DZYYZZReq.J("/k%")));
        }
        if (((JSONObject)a).getJSONObject(GetMessageResponse.J("\u0001<\u0011<")) != null && "0".equals(((JSONObject)a).getJSONObject(DZYYZZReq.J("|#l#")).getString(GetMessageResponse.J("\u00178\u0016(\t)")))) {
            bl = true;
        }
        return bl;
    }

    public Object queryQRresult(Object a) throws Exception {
        EpSZMcertService epSZMcertService;
        EpSZMcertService a2;
        String string = "";
        JSONObject jSONObject = JSONUtils.json2bean(a, JSONObject.class);
        a = jSONObject.getString(DZYYZZReq.J("I\u0010L\u001bH\u0007"));
        Object object = jSONObject.getString(GetMessageResponse.J("4\u000f&\u0012!\u0018,\u0019"));
        if (DZYYZZReq.J("\u000eW\u0005Q\f").equals(a)) {
            string = new StringBuilder().insert(0, a2.kxurl).append(LOGINRESULT).toString();
            epSZMcertService = a2;
        } else {
            if (GetMessageResponse.J("6\u0014\"\u0013").equals(a)) {
                string = new StringBuilder().insert(0, a2.kxurl).append(SIGNRESULT).toString();
            }
            epSZMcertService = a2;
        }
        a = epSZMcertService.getKXHeaders();
        a = HttpUtil.doGet(a, string + DZYYZZReq.J("\u0007\u0013J+\\_") + (String)object);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(GetMessageResponse.J("\u8c7e\u756d\u7b51\u4e4c\u65c4\u6748\u52dc\u51bf\u9564"));
        }
        a = JSONUtils.json2bean(a, JSONObject.class);
        if (!DZYYZZReq.J("P\bR").equals(((JSONObject)a).getString(GetMessageResponse.J("\u00062\u00018"))) && !DZYYZZReq.J("T\tP").equals(((JSONObject)a).getString(GetMessageResponse.J("\u00062\u00018")))) {
            throw new RuntimeException(((JSONObject)a).getString(DZYYZZReq.J("/k%")));
        }
        string = "";
        if (((JSONObject)a).getJSONObject(GetMessageResponse.J("\u0001<\u0011<")) != null && ((JSONObject)a).getJSONObject(DZYYZZReq.J("|#l#")).getJSONObject(GetMessageResponse.J("\u00178\u0016(\t)")) != null && StringUtil.isNotBlank(((JSONObject)a).getJSONObject(DZYYZZReq.J("|#l#")).getJSONObject(GetMessageResponse.J("\u00178\u0016(\t)")).getString(DZYYZZReq.J("},l+l;")))) {
            Object object2 = a;
            object = SM2CertUtil.getX509Certificate(Base64Util.decode(((JSONObject)object2).getJSONObject(GetMessageResponse.J("\u0001<\u0011<")).getJSONObject(DZYYZZReq.J("j'k7t6")).getString(GetMessageResponse.J("\u00003\u00114\u0011$"))));
            string = new SimpleDateFormat(DZYYZZReq.J("A\u001bA\u001b\u0015/uO\\\u0006")).format(((X509Certificate)object).getNotAfter());
            ((JSONObject)object2).put(GetMessageResponse.J("\u001e \u000f1$*\b\u001d\u0014$\u0012\u0014\u0014"), (Object)string);
            ((JSONObject)a).put(DZYYZZReq.J("Z\u0004R\u0005"), (Object)CertificateInfo.getIssuerFields((X509Certificate)object).getField(GetMessageResponse.J("\u00063")));
        }
        return a;
    }

    public Map<String, String> getKXHeaders() {
        EpSZMcertService a;
        String string = System.currentTimeMillis() + "";
        String string2 = String.valueOf(new Random().nextInt());
        HashMap<String, String> hashMap = new HashMap<String, String>();
        String string3 = hashMap.put(DZYYZZReq.J(":\u00157Q\u0006"), a.XUID);
        HashMap<String, String> hashMap2 = hashMap;
        hashMap.put(GetMessageResponse.J("%h),\u0010 \u000e1\u001c(\r"), string);
        hashMap2.put(DZYYZZReq.J(":\u0015,W\f[\u0007"), string2);
        hashMap.put(GetMessageResponse.J("%h<5\r,\u0019"), a.XAppid);
        hashMap.put(DZYYZZReq.J(":\u00151Q\u0005V\u0003L\u0017J\u0007"), EpSZMcertService.encrypt(new StringBuilder().insert(0, string2).append(GetMessageResponse.J("F")).append(a.key).append(DZYYZZReq.J("Y")).append(string).append(GetMessageResponse.J("F")).append(a.XUID).append(DZYYZZReq.J("Y")).toString()));
        return hashMap2;
    }

    public static String encrypt(String a) {
        StringBuffer stringBuffer;
        String string = "";
        try {
            int n;
            MessageDigest messageDigest = MessageDigest.getInstance(GetMessageResponse.J(".\r<hL"));
            messageDigest.update(a.getBytes(DZYYZZReq.J("\u0017L\u0004\u0015Z")));
            byte[] byArray = messageDigest.digest();
            stringBuffer = new StringBuffer();
            int n2 = n = 0;
            while (n2 < byArray.length) {
                String string2 = Integer.toHexString(byArray[n] & 0xFF);
                if (string2.length() < 2) {
                    stringBuffer.append(0);
                }
                stringBuffer.append(string2);
                n2 = ++n;
            }
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            return string;
        }
        string = stringBuffer.toString();
        return string;
    }
}


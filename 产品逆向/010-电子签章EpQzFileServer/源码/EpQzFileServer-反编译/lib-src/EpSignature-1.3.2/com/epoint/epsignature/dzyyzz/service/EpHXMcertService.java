/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.dzyyzz.service.H;
import com.epoint.epsignature.dzyyzz.service.M;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.SM2Util;
import com.epoint.gmhelper.SM3Util;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import com.epoint.gmhelper.bouncycastle.jcajce.provider.asymmetric.ec.BCECPublicKey;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.cert.SM2CertUtil;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import org.apache.log4j.Logger;

public class EpHXMcertService {
    public String hxurl;
    public static final String QUERYRESULT = "/api/newQrCode/getDataByUuid";
    public static final String CREATEQR = "/api/newQrCode/createqrcodeV3";
    private static Logger logger = Logger.getLogger(EpHXMcertService.class);
    public String appid;
    public String hxapiurl;
    public String secret;

    public Object encryptData(Object a) throws Exception {
        EpHXMcertService a2;
        String string = a2.hxapiurl;
        a = JSONUtils.bean2json(JSONUtils.json2bean(a, JSONObject.class));
        EpHXMcertService.disableSslVerification();
        a = HttpUtil.doPost((String)a, string);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(VerifyReq.J("\u8c64\u7513\u7b4b\u4e32\u65de\u6736\u52c6\u51c1\u957e"));
        }
        if (!"0".equals(((JSONObject)(a = JSONUtils.json2bean(a, JSONObject.class))).getString(BaseResp.J("<%:#!$+")))) {
            throw new RuntimeException(((JSONObject)a).getString(VerifyReq.J("\u0002I\u0015R\t]\b")));
        }
        a = Base64Util.encode(((JSONObject)a).getString(BaseResp.J("2+48!\"5+")));
        JSONObject jSONObject = new JSONObject();
        jSONObject.put(VerifyReq.J("\u0002U\u0004I\u001eK\u0013\u007f\u0006O\u0006"), a);
        return jSONObject;
    }

    public static void disableSslVerification() {
        try {
            TrustManager[] trustManagerArray = new TrustManager[1];
            trustManagerArray[0] = new H();
            TrustManager[] trustManagerArray2 = trustManagerArray;
            SSLContext sSLContext = SSLContext.getInstance(BaseResp.J("\u001d\u0013\u0002"));
            sSLContext.init(null, trustManagerArray2, new SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sSLContext.getSocketFactory());
            HttpsURLConnection.setDefaultHostnameVerifier(new M());
            return;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            return;
        }
    }

    public EpHXMcertService() {
        EpHXMcertService a;
        EpHXMcertService epHXMcertService = a;
        EpHXMcertService epHXMcertService2 = a;
        epHXMcertService2.hxurl = ConfigUtil.getConfigValue(VerifyReq.J("\u001dO\u0005"), BaseResp.J("\u0006\u0018\u001b2\""));
        epHXMcertService2.appid = ConfigUtil.getConfigValue(VerifyReq.J("\u001dO\u0005"), BaseResp.J("\u0006\u0018\u000f0>)*"));
        epHXMcertService.secret = ConfigUtil.getConfigValue(VerifyReq.J("\u001dO\u0005"), BaseResp.J("\b\u0016\u0013+#<%:"));
        epHXMcertService.hxapiurl = ConfigUtil.getConfigValue(VerifyReq.J("\u001dO\u0005"), BaseResp.J("\b\u0016\u0001>);2\""));
    }

    public Object queryQRresult(Object a) throws Exception {
        EpHXMcertService a2;
        Object object = new StringBuilder().insert(0, a2.hxurl).append(QUERYRESULT).toString();
        JSONObject jSONObject = new JSONObject();
        a = JSONUtils.json2bean(a, JSONObject.class);
        Object object2 = ((JSONObject)a).getString(VerifyReq.J("N\u0012R\u0003"));
        jSONObject.put(BaseResp.J("5;)*"), object2);
        jSONObject.put(VerifyReq.J("\u0006K\u0017R\u0003"), (Object)a2.appid);
        object2 = new SimpleDateFormat(BaseResp.J("9797\r\u0003$*\b\u0006-#3="));
        object2 = ((DateFormat)object2).format(new Date());
        jSONObject.put(VerifyReq.J("O\u000eV\u0002"), object2);
        object2 = Base64Util.encode(SM3Util.hash(new StringBuilder().insert(0, a2.appid).append((String)object2).append(a2.secret).toString().getBytes(BaseResp.J(";4(mv"))));
        jSONObject.put(VerifyReq.J("S\u0006H\u000f_\u0006O\u0006"), object2);
        object = HttpUtil.doPost(jSONObject.toJSONString(), (String)object);
        if (StringUtil.isBlank(object)) {
            throw new RuntimeException(BaseResp.J("\u8c4d\u7568\u7b62\u4e49\u65f7\u674d\u52ef\u51ba\u9557"));
        }
        object = JSONUtils.json2bean(object, JSONObject.class);
        if (!VerifyReq.J("\u0014N\u0004X\u0002H\u0014").equals(((JSONObject)object).getString(BaseResp.J("2=,:"))) && !VerifyReq.J("\"i5t5dW\nS").equals(((JSONObject)object).getString(BaseResp.J("+2</<\u0003!$+")))) {
            throw new RuntimeException(((JSONObject)object).getString(VerifyReq.J("^\u0015I\bI*H\u0000")));
        }
        if (((JSONObject)object).getJSONObject(BaseResp.J("$/4/")) != null) {
            String string;
            jSONObject = ((JSONObject)object).getJSONObject(VerifyReq.J("_\u0006O\u0006"));
            if (StringUtil.isNotBlank(jSONObject.getString(BaseResp.J("%%7$/4/")))) {
                Object object3;
                object2 = JSONArray.parseArray(jSONObject.getString(VerifyReq.J("\f^\u001e_\u0006O\u0006")));
                string = "";
                if (((JSONObject)a).containsKey(BaseResp.J(":,2*%-270:")) && VerifyReq.J("O\u0015N\u0002").equals(((JSONObject)a).getString(BaseResp.J(":,2*%-270:")))) {
                    Object object4 = object2;
                    object3 = object4;
                    string = ((JSON)object4).toJSONString();
                } else {
                    int n;
                    int n2 = n = 1;
                    while (n2 <= ((JSONArray)object2).size()) {
                        int n3 = a = 1;
                        while (n3 <= ((JSONArray)object2).size()) {
                            JSONObject jSONObject2 = ((JSONArray)object2).getJSONObject(a - 1);
                            if (String.valueOf(n).equals(jSONObject2.getString(VerifyReq.J("N\tR\u0016N\u0002r\u0003")))) {
                                string = new StringBuilder().insert(0, string).append(jSONObject2.getString(BaseResp.J("*%-270:\u0004/4/"))).toString();
                            }
                            n3 = ++a;
                        }
                        n2 = ++n;
                    }
                    object3 = object2;
                }
                ((JSONArray)object3).getJSONObject(0).put(VerifyReq.J("\u0003^\u0004I\u001eK\u0013\u007f\u0006O\u0006"), (Object)string);
                jSONObject.put(BaseResp.J("%%7$/4/"), object2);
                ((JSONObject)object).put(VerifyReq.J("_\u0006O\u0006"), (Object)jSONObject);
            }
            object2 = "";
            if (StringUtil.isNotBlank(jSONObject.getString(BaseResp.J("#+2:")))) {
                string = jSONObject.getString(VerifyReq.J("X\u0002I\u0013"));
                X509Certificate x509Certificate = SM2CertUtil.getX509Certificate(Base64Util.decode(string));
                object2 = new SimpleDateFormat(BaseResp.J("9797m\u0003\rc$*")).format(x509Certificate.getNotAfter());
                ((JSONObject)object).getJSONObject(VerifyReq.J("_\u0006O\u0006")).put(BaseResp.J("-%<4\u0017/;\u0018'!!\u0011'"), object2);
            }
        }
        return object;
    }

    public Object setUserInfo(Object a) throws Exception {
        EpHXMcertService a2;
        String string = a2.hxapiurl;
        a = JSONUtils.bean2json(JSONUtils.json2bean(a, JSONObject.class));
        EpHXMcertService.disableSslVerification();
        a = HttpUtil.doPost((String)a, string);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(VerifyReq.J("\u8c64\u7513\u7b4b\u4e32\u65de\u6736\u52c6\u51c1\u957e"));
        }
        if (!"0".equals(((JSONObject)(a = JSONUtils.json2bean(a, JSONObject.class))).getString(BaseResp.J("<%:#!$+")))) {
            throw new RuntimeException(((JSONObject)a).getString(VerifyReq.J("\u0002I\u0015R\t]\b")));
        }
        return a;
    }

    public boolean verifySigned(Object a) throws Exception {
        boolean bl = false;
        JSONObject jSONObject = JSONUtils.json2bean(a, JSONObject.class);
        a = jSONObject.getString(BaseResp.J("!2)"));
        Object object = jSONObject.getString(VerifyReq.J("H\u000e\\\tX\u0002I\u0013"));
        Object object2 = jSONObject.getString(BaseResp.J("3'' %*"));
        a = Base64Util.decode(Base64Util.encode(EpHXMcertService.hexStringToBytes(Hex.toHexString(SM3Util.hash(Base64Util.decode((String)a))))));
        object = SM2CertUtil.getBCECPublicKey(SM2CertUtil.getX509Certificate(Base64Util.decode((String)object)));
        object2 = Base64Util.decode((String)object2);
        Object object3 = new byte[32];
        Object object4 = new byte[32];
        Object object5 = object2;
        System.arraycopy(object5, 0, object3, 0, 32);
        System.arraycopy(object5, 32, object4, 0, 32);
        object2 = new BigInteger(1, (byte[])object3);
        object3 = new BigInteger(1, (byte[])object4);
        Object object6 = object4 = (Object)new ASN1EncodableVector();
        ((ASN1EncodableVector)object6).add(new ASN1Integer((BigInteger)object2));
        ((ASN1EncodableVector)object6).add(new ASN1Integer((BigInteger)object3));
        object2 = new DERSequence((ASN1EncodableVector)object4).getEncoded(VerifyReq.J("#~5"));
        bl = SM2Util.verify((BCECPublicKey)object, null, (byte[])a, (byte[])object2);
        return bl;
    }

    public Object initLocalSvr(Object a) throws Exception {
        EpHXMcertService a2;
        String string = a2.hxapiurl;
        a = JSONUtils.json2bean(a, JSONObject.class);
        JSONObject jSONObject = new JSONObject();
        jSONObject.put(BaseResp.J("/0>)*"), (Object)a2.appid);
        jSONObject.put(VerifyReq.J("H\u0002X\u0015^\u0013"), (Object)a2.secret);
        ((JSONObject)a).put(BaseResp.J(">!<!#"), (Object)jSONObject);
        a = JSONUtils.bean2json(a);
        EpHXMcertService.disableSslVerification();
        a = HttpUtil.doPost((String)a, string);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(VerifyReq.J("\u8c64\u7513\u7b4b\u4e32\u65de\u6736\u52c6\u51c1\u957e"));
        }
        if (!"0".equals(((JSONObject)(a = JSONUtils.json2bean(a, JSONObject.class))).getString(BaseResp.J("<%:#!$+")))) {
            throw new RuntimeException(((JSONObject)a).getString(VerifyReq.J("\u0002I\u0015R\t]\b")));
        }
        return a;
    }

    /*
     * Unable to fully structure code
     * Could not resolve type clashes
     */
    public String creatQR(Object a) throws Exception {
        block6: {
            block7: {
                block8: {
                    block5: {
                        var2_2 = new StringBuilder().insert(0, a.hxurl).append("/api/newQrCode/createqrcodeV3").toString();
                        var3_3 = new JSONObject();
                        a /* !! */  = JSONUtils.json2bean(a /* !! */ , JSONObject.class);
                        EpHXMcertService.logger.info(new StringBuilder().insert(0, BaseResp.J("s}s}s}s}s}s}s\u8bb7\u6c0c\u5382\u653e")).append(a /* !! */ .toJSONString()).toString());
                        var4_4 = a /* !! */ .getString(VerifyReq.J("O\u001eK\u0002"));
                        var3_3.put(BaseResp.J("/0>)*"), (Object)a.appid);
                        var3_3.put(VerifyReq.J("O\u001eK\u0002"), (Object)var4_4);
                        var5_6 = new SimpleDateFormat(BaseResp.J("9797\r\u0003$*\b\u0006-#3="));
                        var5_6 = var5_6.format(new Date());
                        var3_3.put(VerifyReq.J("O\u000eV\u0002"), var5_6);
                        var5_6 = Base64Util.encode(SM3Util.hash(new StringBuilder().insert(0, a.appid).append((String)var5_6).append(a.secret).toString().getBytes(BaseResp.J(";4(mv"))));
                        var3_3.put(VerifyReq.J("S\u0006H\u000f_\u0006O\u0006"), var5_6);
                        if (!BaseResp.J("3'' ").equals(var4_4)) break block5;
                        var5_6 = new JSONObject();
                        var6_7 = a /* !! */ .getString(VerifyReq.J("\bI\u0000"));
                        var7_8 = SM3Util.hash(Base64Util.decode((String)var6_7));
                        var8_9 = Hex.toHexString((byte[])var7_8);
                        v0 = var5_6.put(BaseResp.J("(/3&\u0004/4/"), (Object)var8_9);
                        v1 = var3_3;
                        var5_6.put(VerifyReq.J("O\by\u0002h\u000e\\\t"), (Object)"");
                        v2 = v1;
                        v1.put(BaseResp.J("<%?\u0004/4/"), var5_6);
                        break block6;
                    }
                    if (!VerifyReq.J("\u0003^\u0004I\u001eK\u0013").equals(var4_4)) break block7;
                    var5_6 = a /* !! */ .getString(BaseResp.J("*%-270:\u0004/4/"));
                    var6_7 = new JSONArray();
                    var7_8 = new JSONArray();
                    var8_10 = new JSONObject();
                    if (!var5_6.contains(VerifyReq.J("\u2662"))) break block8;
                    a /* !! */  = var5_6.split(BaseResp.J("\u264b"));
                    var4_5 = 0;
                    var9_11 = a /* !! */ ;
                    var10_12 = a /* !! */ .length;
                    v3 = var11_13 = 0;
                    while (v3 < var10_12) {
                        var7_8 = JSONArray.parseArray(Base64Util.decode2string(var9_11[var11_13]));
                        var8_10 = var7_8.getJSONObject(0);
                        var8_10.put(VerifyReq.J("N\tR\u0016N\u0002r\u0003"), (Object)String.valueOf(++var4_5));
                        var6_7.add(var8_10);
                        v3 = ++var11_13;
                    }
                    ** GOTO lbl67
                }
                a /* !! */  = Base64Util.decode2string((String)var5_6);
                if (a /* !! */ .contains(BaseResp.J("5 )?5+\t*"))) {
                    var6_7 = JSONArray.parseArray((String)a /* !! */ );
                    v4 = var3_3;
                } else {
                    var7_8 = JSONArray.parseArray((String)a /* !! */ );
                    var8_10 = var7_8.getJSONObject(0);
                    var8_10.put(VerifyReq.J("N\tR\u0016N\u0002r\u0003"), (Object)"1");
                    var6_7.add(var8_10);
lbl67:
                    // 2 sources

                    v4 = var3_3;
                }
                v4.put(BaseResp.J("<%?\u0004/4/"), var6_7);
            }
            v2 = var3_3;
        }
        var5_6 = JSONUtils.bean2json(v2);
        var6_7 = HttpUtil.doPost((String)var5_6, var2_2);
        EpHXMcertService.logger.info(new StringBuilder().insert(0, VerifyReq.J("Z\u0006Z\u0006Z\u0006Z\u0006Z\u0006Z\u0006Z\u5220\u5e9d\u4eb7\u7e93\u783a\u63c2\u53d8\u8fb3\u56e5\u505b")).append((String)var6_7).toString());
        if (StringUtil.isBlank(var6_7)) {
            throw new RuntimeException(BaseResp.J("\u8c4d\u7568\u7b62\u4e49\u65f7\u674d\u52ef\u51ba\u9557"));
        }
        var7_8 = JSONUtils.json2bean(var6_7, JSONObject.class);
        if (!VerifyReq.J("\u0014N\u0004X\u0002H\u0014").equals(var7_8.getString(BaseResp.J("2=,:")))) {
            throw new RuntimeException(var7_8.getString(VerifyReq.J("^\u0015I\bI*H\u0000")));
        }
        return var6_7;
    }

    public Object setCertType(Object a) throws Exception {
        EpHXMcertService a2;
        String string = a2.hxapiurl;
        a = JSONUtils.bean2json(JSONUtils.json2bean(a, JSONObject.class));
        EpHXMcertService.disableSslVerification();
        a = HttpUtil.doPost((String)a, string);
        if (StringUtil.isBlank(a)) {
            throw new RuntimeException(BaseResp.J("\u8c4d\u7568\u7b62\u4e49\u65f7\u674d\u52ef\u51ba\u9557"));
        }
        if (!"0".equals(((JSONObject)(a = JSONUtils.json2bean(a, JSONObject.class))).getString(VerifyReq.J("\u0015^\u0013X\b_\u0002")))) {
            throw new RuntimeException(((JSONObject)a).getString(BaseResp.J("+2<) &!")));
        }
        return a;
    }

    public static byte[] hexStringToBytes(String a) {
        int n;
        if (a == null || "".equals(a)) {
            return null;
        }
        a = a.trim().replaceAll(VerifyReq.J(";HM"), "");
        String string = BaseResp.J("p\u007fr}t{vyxw\u0001\f\u0003\n\u0005\b");
        a = a.toUpperCase();
        int n2 = a.length() / 2;
        char[] cArray = a.toCharArray();
        byte[] byArray = new byte[n2];
        int n3 = n = 0;
        while (n3 < n2) {
            int n4 = n * 2;
            byArray[n++] = (byte)(string.indexOf(cArray[n4]) << 4 | string.indexOf(cArray[n4 + 1]));
            n3 = n;
        }
        return byArray;
    }
}


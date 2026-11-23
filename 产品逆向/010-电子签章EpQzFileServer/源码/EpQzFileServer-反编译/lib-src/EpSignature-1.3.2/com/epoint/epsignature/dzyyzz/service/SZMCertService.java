/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.SSLUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.SM3Util;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;

public class SZMCertService {
    private static final String decResultUrlZBR = "/preServerApi/front/client/dataDec";
    public String YZSZAppsecret;
    public String YZSZAppkey;
    private static Logger logger = Logger.getLogger(SZMCertService.class);
    public String YZSZUrl;
    private static final String decResultUrlTBR = "/preServerApi/front/client/dec";

    public SZMCertService() {
        SZMCertService a;
        SZMCertService sZMCertService = a;
        a.YZSZUrl = ConfigUtil.getConfigValue(VerifyReq.J("\u001dO\u0005"), EpOFDData.J("a\u0007s8J"));
        sZMCertService.YZSZAppkey = ConfigUtil.getConfigValue(VerifyReq.J("\u001dO\u0005"), EpOFDData.J("\rk\u000bv\u001am\u000f\u007f"));
        sZMCertService.YZSZAppsecret = ConfigUtil.getConfigValue(VerifyReq.J("\u001dO\u0005"), EpOFDData.J("a\u0007g:V9C)T/R"));
    }

    private /* synthetic */ String J(String a, String a2) {
        String string;
        SZMCertService a3;
        String string2 = "";
        SZMCertService sZMCertService = a3;
        Map<String, String> map = SZMCertService.J(sZMCertService.YZSZAppkey, sZMCertService.YZSZAppsecret);
        try {
            SSLUtils.ignoreSsl();
            string = a;
        }
        catch (Exception exception) {
            logger.error(VerifyReq.J("\u51764h+\u8bfa\u4e01\u681a\u9aeb\u5f39\u5e5f"));
            string = a;
        }
        String string3 = HttpUtil.doPost(string, map, a2);
        logger.info(new StringBuilder().insert(0, EpOFDData.J("\u6226\u5df8\u550c\u5160\u846f\u4e3c\u622d\u7141\u89a9\u5be0\u63ef\u53c5\u8f9e\u56f8\u5076\u001c")).append(string3).toString());
        if (StringUtil.isNotBlank(string3) && "0".equals(((JSONObject)(a = JSONObject.parseObject(string3))).getString(VerifyReq.J("X\b_\u0002")))) {
            string2 = ((JSONObject)a).getString(EpOFDData.J(".G>G"));
        }
        return string2;
    }

    private static /* synthetic */ Map<String, String> J(String a, String a2) {
        HashMap<String, String> hashMap = new HashMap<String, String>();
        String string = hashMap.put(VerifyReq.J("Z\u0017K\f^\u001e"), a);
        String string2 = UUID.randomUUID().toString();
        HashMap<String, String> hashMap2 = hashMap;
        hashMap.put(EpOFDData.J("\u001fU/Tgg-C$R"), VerifyReq.J("*T\u001dR\u000bW\u0006\u0014R\u0015W\u001bOl\u000eU\u0003T\u0010HGu3\u001bV\u000bI\u000b\\\u001b0R\t\rS\u0000GCQ\u000fN\u001b&K\u0017W\u0002l\u0002Y,R\u0013\u0014R\bP\u0015T\rG\u0013,s3v+\u0017GW\u000eP\u0002\u001b ^\u0004P\b\u0012Gx\u000fI\bV\u0002\u0014V\u000bV\u0015W\u0015W\u0015W\u001b4Z\u0001Z\u0015RH\u000eT\fI\bQ"));
        hashMap2.put(EpOFDData.J("8G$B%K"), string2);
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(a).append(a2).append(string2);
        a2 = Hex.toHexString(SM3Util.hash(stringBuilder.toString().getBytes()));
        hashMap.put(VerifyReq.J("_\u000e\\\u0002H\u0013"), a2);
        logger.info(new StringBuilder().insert(0, EpOFDData.J("\u53b9\u65cd\u001c")).append(stringBuilder.toString()).append(VerifyReq.J("\u0000\u5ba1\u65bc]")).append(a2).toString());
        return hashMap2;
    }

    public String DecryptByGMTBR(JSONObject a) throws Exception {
        SZMCertService a2;
        String string = new StringBuilder().insert(0, a2.YZSZUrl).append(decResultUrlTBR).toString();
        String string2 = "";
        JSONObject jSONObject = a;
        String string3 = jSONObject.getString(EpOFDData.J("C$E\u001aG)M"));
        String string4 = jSONObject.getString(VerifyReq.J("_\u0002K\u0013u\u0006V\u0002"));
        String string5 = jSONObject.getString(EpOFDData.J(".C:R\tI.C"));
        String string6 = jSONObject.getString(VerifyReq.J("XV"));
        if (JSON.isValidArray(string3)) {
            JSONArray jSONArray = new JSONArray();
            JSONObject.parseArray(string3).forEach(a6 -> {
                SZMCertService a7;
                a6 = (JSONObject)a6;
                JSONObject jSONObject = new JSONObject();
                JSONObject jSONObject2 = new JSONObject();
                jSONObject.put(VerifyReq.J("_\u0002K\u0013u\u0006V\u0002"), (Object)string4);
                jSONObject.put(EpOFDData.J(".C:R\tI.C"), (Object)string5);
                jSONObject.put(VerifyReq.J("XV"), (Object)string6);
                string4 = Base64Util.decode2string(((JSONObject)a6).getString(EpOFDData.J("C$E8_/B")));
                jSONObject.put(VerifyReq.J("\u0002U\u0004k\u0006X\f"), (Object)string4);
                string4 = a7.J(jSONObject.toJSONString(), string);
                jSONObject2.put(EpOFDData.J("B/E8_:R\u001ed"), (Object)string4);
                jSONArray.add(jSONObject2);
            });
            string2 = jSONArray.toJSONString();
            return string2;
        }
        string2 = a2.J(a.toJSONString(), string);
        return string2;
    }

    public String DecryptByGMZBR(JSONObject a) throws Exception {
        SZMCertService a2;
        String string = new StringBuilder().insert(0, a2.YZSZUrl).append(decResultUrlZBR).toString();
        String string2 = "";
        JSONObject jSONObject = a;
        String string3 = jSONObject.getString(EpOFDData.J(">I\bC\u000fH)i8b/E\u000eG>G"));
        String string4 = jSONObject.getString(VerifyReq.J("_\u0002K\u0013u\u0006V\u0002"));
        String string5 = jSONObject.getString(EpOFDData.J(".C:R\tI.C"));
        if (JSON.isValidArray(string3)) {
            JSONArray jSONArray = new JSONArray();
            JSONObject.parseArray(string3).forEach(a5 -> {
                SZMCertService a6;
                a5 = (JSONObject)a5;
                JSONObject jSONObject = new JSONObject();
                JSONObject jSONObject2 = new JSONObject();
                jSONObject.put(VerifyReq.J("_\u0002K\u0013u\u0006V\u0002"), (Object)string4);
                jSONObject.put(EpOFDData.J(".C:R\tI.C"), (Object)string5);
                jSONObject.put(VerifyReq.J("_\u0002K\u0013o\u001eK\u0002"), (Object)"1");
                jSONObject.put(EpOFDData.J(">I\bC\u000fH)i8b/E\u000eG>G"), (Object)((JSONObject)a5).getString(VerifyReq.J("\u0002U\u0004I\u001e^\u0003")));
                string4 = a6.J(jSONObject.toJSONString(), string);
                jSONObject2.put(EpOFDData.J("I8A"), (Object)string4);
                string4 = ((JSONObject)a5).getString(VerifyReq.J("_\u0002H\u0004"));
                jSONObject2.put(EpOFDData.J(".C9E"), (Object)string4);
                jSONArray.add(jSONObject2);
            });
            string2 = jSONArray.toJSONString();
            return string2;
        }
        string2 = a2.J(a.toJSONString(), string);
        return string2;
    }
}


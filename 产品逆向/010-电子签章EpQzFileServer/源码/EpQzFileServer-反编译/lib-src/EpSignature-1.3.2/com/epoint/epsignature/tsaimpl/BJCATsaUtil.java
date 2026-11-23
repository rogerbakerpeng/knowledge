/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.tsaimpl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.tsaimpl.j;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.log4j.Logger;

public class BJCATsaUtil {
    private static String appId;
    private static String secret;
    private static String bjcatsaurl;
    private static final String getServerCert = "/tss/v1/getServerCert";
    private static String deviceId;
    private static String signAlgo;
    private static Logger logger;
    private static final String signtss = "/tss/v1/signtss";
    private static String version;
    private static final String verifytss = "/tss/v1/verifytss";

    public BJCATsaUtil() {
        BJCATsaUtil a;
    }

    private static /* synthetic */ String J(Map<String, Object> a) {
        StringBuilder stringBuilder = new StringBuilder();
        ArrayList<Map.Entry<String, Object>> arrayList = new ArrayList<Map.Entry<String, Object>>(a.entrySet());
        ArrayList<Map.Entry<String, Object>> arrayList2 = arrayList;
        Collections.sort(arrayList2, new j());
        for (Map.Entry entry : arrayList2) {
            if (stringBuilder.length() == 0) {
                stringBuilder.append((String)entry.getKey()).append(BaseReq.J("\u000f")).append(entry.getValue());
                continue;
            }
            stringBuilder.append(HighlightPos.J("}")).append((String)entry.getKey()).append(BaseReq.J("\u000f")).append(entry.getValue());
        }
        return stringBuilder.toString();
    }

    private static /* synthetic */ String J(String a, String a22) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            a22 = ((String)a22).getBytes(StandardCharsets.UTF_8);
            Mac mac2 = mac;
            Mac mac3 = mac;
            mac2.init(new SecretKeySpec((byte[])a22, "HmacSHA256"));
            return Base64Util.encode(mac2.doFinal(a.getBytes(StandardCharsets.UTF_8)));
        }
        catch (Exception a22) {
            logger.error(HighlightPos.J("\u8bfa\u7bdb\u65ad\u95b8\u6268\u0004\u0016\r\u0018\u597d\u8d7e"), a22);
            return "";
        }
    }

    static {
        logger = Logger.getLogger(BJCATsaUtil.class);
        try {
            version = "1.0";
            signAlgo = "HmacSHA256";
            deviceId = ConfigUtil.getConfigValue(BaseReq.J("H\u0007P"), HighlightPos.J(".1/:(>:2/>\u0005?"));
            appId = ConfigUtil.getConfigValue(BaseReq.J("H\u0007P"), HighlightPos.J("9&8-:<+\u0005?"));
            secret = ConfigUtil.getConfigValue(BaseReq.J("H\u0007P"), HighlightPos.J(".1/:?>/))/"));
            bjcatsaurl = ConfigUtil.getConfigValue(BaseReq.J("H\u0007P"), HighlightPos.J(".1/:8(-.>7"));
        }
        catch (Exception exception) {
            logger.error(BaseReq.J("p9q2f\u0000S&F\u001a^S\u976b\u6072\u4ed1\u7872\u5765\u6214\u887e\u5f71\u5e0a"), exception);
        }
    }

    public static String signtss(String a, String a2) {
        HashMap<String, Object> hashMap = new HashMap<String, Object>();
        hashMap.put(HighlightPos.J(":<+\u0005?"), appId);
        hashMap.put(BaseReq.J("\u0017W\u0005[\u0010W:V"), deviceId);
        hashMap.put(HighlightPos.J("-))?2#5"), version);
        hashMap.put(BaseReq.J("\u0000[\u0014\\2^\u0014]"), signAlgo);
        hashMap.put(HighlightPos.J("99(?2\">?(\u0005?"), a2);
        hashMap.put(BaseReq.J("\u0012^\u0014]"), HighlightPos.J("\b\u0001i"));
        hashMap.put(BaseReq.J("\u0017S\u0007S"), a);
        hashMap.put(HighlightPos.J("(:8:\u0018\"<>"), BaseReq.J("b?s:|"));
        HashMap<String, Object> hashMap2 = hashMap;
        a2 = BJCATsaUtil.J(BJCATsaUtil.J(hashMap2), secret);
        hashMap2.put(HighlightPos.J("(%<\":8.>>"), a2);
        logger.info(new StringBuilder().insert(0, BaseReq.J("\u8c31\u755b\u65c4\u9587\u6201\u677e\u5293\u561b\u8bc5\u6c31\u6397\u5390\u5702\u5733\uff28")).append(bjcatsaurl).append(signtss).toString());
        logger.info(new StringBuilder().insert(0, HighlightPos.J("\u8c58\u7564\u65ad\u95b8\u6268\u6741\u52fa\u5624\u8bac\u6c0e\u5399\u653c\uff41")).append(JSONUtils.bean2json(hashMap)).toString());
        a2 = HttpUtil.doPost(JSONUtils.bean2json(hashMap), new StringBuilder().insert(0, bjcatsaurl).append(signtss).toString());
        logger.info(new StringBuilder().insert(0, BaseReq.J("\u8c70\u751a\u6585\u95c6\u6240\u673f\u52d2\u565a\u8fa7\u56ec\u504f\uff28")).append((String)a2).toString());
        a2 = JSONObject.parseObject((String)a2);
        if (!HighlightPos.J("i|k").equals(((JSONObject)a2).getString(BaseReq.J("\u0000F\u0012F\u0006A")))) {
            throw new RuntimeException(((JSONObject)a2).getString(HighlightPos.J("6)(?:+>")));
        }
        return ((JSONObject)a2).getJSONObject(BaseReq.J("\u0017S\u0007S")).getString(HighlightPos.J("(%<\":8.>>"));
    }
}


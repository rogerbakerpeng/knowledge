/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class ESignMAYIAction
extends BaseActions {
    private static final String MAYIPUBLICKEYRSA = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArqGKoPW6JuoyJL8FxXUMa+RLtABtqeQPRhajbgi8wSqHynhNyM44Z+X+iFHmndWNVKalA2U+6BeP7plfWIDwz4//fkHZk2FLACE3EJGOG5B0pI+NNe8Ml5/W08lkN50Nnz50qXgcMKq+6T1vf9nwpwY/iCyHnq4f4vw0JoCW3xXDW+J9MFxn2Xtg77OLCwiXaoVnZdMBB1cEYLoyEfg3geiYS2cQMp2IRWrSiJt0o3NRATjvgwC0DYCpqcCqudJ8u5/cH//c5g+ulYkYTAkaxkInGxpLhoiECrYICO57RFTKkVTCEEhUFu4dqRcUWKyo8BLDePArfJZpzwKEnTTJWQIDAQAB";
    private static final String APPID = "4438854685";
    private static final String SECRET = "aee9f3a62a3908286b6eaa5f9ccfc366";
    private static final String URL = "https://smlopenapi.esign.cn";

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        JSONObject reqJson = JSONObject.parseObject(req);
        String orgid = reqJson.getString("orgid");
        String url = String.format("/v1/organizations/%s/seals", orgid);
        String resp = ESignMAYIAction.post(URL + url, "", url);
        System.out.println(resp);
        JSONObject obj = JSON.parseObject(resp);
        JSONArray esignseals = obj.getJSONObject("data").getJSONArray("seals");
        ArrayList<Seal> seals = new ArrayList<Seal>();
        for (Object object : esignseals) {
            JSONObject esignseal = (JSONObject)object;
            String sealid = esignseal.getString("sealId");
            String sealname = esignseal.getString("sealBizTypeDesc") + "_" + esignseal.getString("alias");
            String sealimg = Base64Util.encode(HttpUtil.doDownloadsmallFile(esignseal.getString("url")));
            Seal _seal = new Seal(sealname, sealid, null, sealimg, null);
            int sealtype = esignseal.getInteger("sealType");
            _seal.setSealtype(sealtype);
            seals.add(_seal);
        }
        return this.success(seals);
    }

    public static void main(String[] args) throws Exception {
        String url = "/v1/organizations/b86c75e3e19c430f8b1577c8f37a4258/seals";
        String resp = ESignMAYIAction.post("https://smlopenapi.esign.cn/v1/organizations/b86c75e3e19c430f8b1577c8f37a4258/seals", "1", url);
        System.out.println(resp);
    }

    private static String post(String apiUrl, String data, String url) {
        String strRes = "";
        try {
            String signature = ESignMAYIAction.signature(url, "GET");
            HashMap<String, String> heads = new HashMap<String, String>();
            String timestamp = String.valueOf(System.currentTimeMillis());
            heads.put("X-Tsign-Open-App-Id", APPID);
            heads.put("X-Tsign-Open-Auth-Mode", "Signature");
            heads.put("X-Tsign-Open-Ca-Timestamp", timestamp);
            heads.put("X-Tsign-Open-Ca-Signature", signature);
            heads.put("Accept", "application/json");
            heads.put("Content-MD5", "");
            heads.put("Content-type", "application/json; charset=UTF-8");
            return HttpUtil.doGet(heads, apiUrl);
        }
        catch (Exception e) {
            e.printStackTrace();
            strRes = "";
            return strRes;
        }
    }

    private static String signature(String url, String method) throws NoSuchAlgorithmException, InvalidKeyException {
        String secret = SECRET;
        String enter = "\n";
        String accept = "application/json";
        String contentType = "application/json; charset=UTF-8";
        String contentMD5 = "";
        String date = "";
        String headers = "";
        StringBuilder sb = new StringBuilder();
        sb.append(method).append(enter).append(accept).append(enter).append(contentMD5).append(enter).append(contentType).append(enter).append(date).append(enter);
        if ("".equals(headers)) {
            sb.append(headers).append(url);
        } else {
            sb.append(headers).append(enter).append(url);
        }
        String stringToSign = sb.toString();
        Mac hmacSha256 = Mac.getInstance("HmacSHA256");
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        hmacSha256.init(new SecretKeySpec(keyBytes, 0, keyBytes.length, "HmacSHA256"));
        String sign = "";
        return Base64Util.encode(hmacSha256.doFinal(stringToSign.getBytes(StandardCharsets.UTF_8)));
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.actions.impl.ShanTouSeal;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.itextpdf.text.Image;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;

public class EpQzShanTouYunActions
extends BaseActions {
    private String passId = "";
    private String passToken = "";
    private String sturl = "";
    private H5OutImpl outApi;
    private static Logger log = Logger.getLogger(EpQzShanTouYunActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.passId = (String)actionContext.get("passId");
        this.passToken = (String)actionContext.get("passToken");
        this.sturl = (String)actionContext.get("sturl");
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("\u7cfb\u7edf\u521d\u59cb\u5316\u5f02\u5e38");
        }
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        String userid = (String)reqmap.get("userid");
        JSONObject params = new JSONObject();
        params.put("UserID", (Object)userid);
        String reqJsonStr = params.toJSONString();
        HashMap<String, String> headers = EpQzShanTouYunActions.createYzwHeader(this.passId, this.passToken, userid);
        String result = HttpUtil.doPost(reqJsonStr, headers, this.sturl + "/api/gdata/seal/person/getImageByUUID");
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj = JSONUtils.json2bean(result, JSONObject.class);
        if (!"0".equals(jsonObj.getString("errcode"))) {
            throw new RuntimeException(jsonObj.getString("errmsg"));
        }
        JSONArray sealinfos = JSONArray.parseArray(jsonObj.getString("dataSeal"));
        ArrayList<ShanTouSeal> sealList = new ArrayList<ShanTouSeal>();
        for (int i = 0; i < sealinfos.size(); ++i) {
            JSONObject info = sealinfos.getJSONObject(i);
            ShanTouSeal seal = new ShanTouSeal();
            seal.setSealguid(info.getString("seaId"));
            seal.setSealname(info.getString("sealName"));
            seal.setSealimg(info.getString("imageBase64"));
            seal.setImgHeight(info.getString("imageH"));
            seal.setImgWidth(info.getString("imageW"));
            sealList.add(seal);
        }
        return this.success(sealList);
    }

    public BaseResp sign(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        JSONObject json = JSONUtils.json2bean(reqmap.get("sign"), JSONObject.class);
        String posStr = json.getString("positions");
        JSONArray posArr = JSONArray.parseArray(posStr);
        SignReq signReq = JSONUtils.json2bean(basereq.getRequest(), ComSignReq.class);
        byte[] pdfb = this.outApi.getPDF(signReq.getPdf());
        Class<?> HashSignOperatorClass = Class.forName("com.gomain.seal.service.Impl.HashSignOperator");
        Constructor<?> con = HashSignOperatorClass.getConstructor(String.class, String.class, String.class, String.class);
        Object haSafe = con.newInstance(this.sturl, this.passToken, this.passId, "");
        int docType = 0;
        int authType = 1;
        String sealId = (String)reqmap.get("sealguid");
        String userId = (String)reqmap.get("userId");
        String signimg = json.getString("signimg");
        Image image = Image.getInstance(Base64Util.decode(signimg));
        float width = image.getWidth();
        float height = image.getHeight();
        byte[] results = null;
        if (!posArr.isEmpty()) {
            int page = posArr.getJSONObject(0).getIntValue("page") - 1;
            float left = posArr.getJSONObject(0).getFloat("x").floatValue() - width / 2.5f;
            float top = posArr.getJSONObject(0).getFloat("y").floatValue() - height / 2.5f;
            Method hashSignWithAuthType = HashSignOperatorClass.getMethod("hashSignWithAuthType", Integer.TYPE, Integer.TYPE, byte[].class, String.class, String.class, Integer.TYPE, Float.TYPE, Float.TYPE);
            results = (byte[])hashSignWithAuthType.invoke(null, docType, authType, pdfb, sealId, userId, page, Float.valueOf(left), Float.valueOf(top));
        }
        if (results == null || results.length <= 0) {
            log.info("\u8c03sdk\u7b7e\u7ae0\u5931\u8d25");
            return this.success("false");
        }
        this.outApi.dealPDF(signReq.getPdf(), results);
        return this.success("true");
    }

    public String verify(byte[] f) throws Exception {
        Class<?> HashSignOperatorClass = Class.forName("com.gomain.seal.service.Impl.HashSignOperator");
        Constructor<?> con = HashSignOperatorClass.getConstructor(String.class, String.class, String.class, String.class);
        Object haSafe = con.newInstance(this.sturl, this.passToken, this.passId, "");
        Method hashVerifySign = HashSignOperatorClass.getMethod("hashVerifySign", Integer.TYPE, byte[].class);
        return (String)hashVerifySign.invoke(null, 0, f);
    }

    public static HashMap<String, String> createYzwHeader(String xtifpaasid, String passToken, String userid) {
        HashMap<String, String> headerMap = new HashMap<String, String>();
        headerMap.put("x-tif-nonce", UUID.randomUUID().toString());
        headerMap.put("x-tif-paasid", xtifpaasid);
        headerMap.put("x-tif-timestamp", Long.toString(System.currentTimeMillis() / 1000L));
        String sign = EpQzShanTouYunActions.getSHA256((String)headerMap.get("x-tif-timestamp") + passToken + (String)headerMap.get("x-tif-nonce") + (String)headerMap.get("x-tif-timestamp"));
        headerMap.put("x-tif-signature", sign);
        headerMap.put("x-tif-uuid", userid);
        return headerMap;
    }

    public static String getSHA256(String content) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(content.getBytes("UTF-8"));
            byte[] result = md.digest();
            return EpQzShanTouYunActions.bytesToHexString(result);
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    public static String bytesToHexString(byte[] src) {
        StringBuffer stringBuilder = new StringBuffer();
        if (src == null || src.length <= 0) {
            return null;
        }
        for (int i = 0; i < src.length; ++i) {
            int v = src[i] & 0xFF;
            String hv = Integer.toHexString(v);
            if (hv.length() < 2) {
                stringBuilder.append(0);
            }
            stringBuilder.append(hv);
        }
        return stringBuilder.toString();
    }
}


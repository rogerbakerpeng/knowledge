/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.service.MCertService;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;

public class MCert391Service
extends MCertService {
    private static Logger log = Logger.getLogger(MCert391Service.class);

    public MCert391Service(String mcertUrl, String platformcode, String tokenSecret) {
        super(mcertUrl, platformcode, tokenSecret);
    }

    @Override
    public List<Seal> getSealImg(String req) throws Exception {
        ArrayList<Seal> seals = new ArrayList<Seal>();
        JSONObject reqJSONObject = JSONUtils.getJSONObject(req);
        JSONObject thirdAppObj = null;
        if (reqJSONObject == null) {
            throw new RuntimeException("app\u76f8\u5173\u6570\u636e\u4e3a\u7a7a\uff0c\u8bf7\u91cd\u65b0\u626b\u7801\uff01");
        }
        thirdAppObj = reqJSONObject.getJSONObject("thirdappobj");
        if (thirdAppObj == null) {
            return seals;
        }
        JSONObject reqparams = new JSONObject();
        reqparams.put("tid", thirdAppObj.get("tid"));
        reqparams.put("pid", thirdAppObj.get("pid"));
        reqparams.put("sealBelongType", thirdAppObj.get("sealSignatureUserType"));
        reqparams.put("orgTransactionCode", thirdAppObj.get("orgTransactionCode"));
        reqparams.put("personalTransactionCode", thirdAppObj.get("personalTransactionCode"));
        reqparams.put("accessToken", thirdAppObj.get("accessToken"));
        reqparams.put("idCardHash", thirdAppObj.get("idCardHash"));
        String pStr = JSONUtils.bean2json(this.createReq(reqparams));
        String rst = this.post("/rest/thirdapp/thirdqr/391/getuserseals", pStr);
        if (StringUtil.isBlank(rst)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject rstJSONObject = JSONUtils.getJSONObject(rst);
        int code = rstJSONObject.getJSONObject("status").getIntValue("code");
        if (code == 1) {
            JSONArray sealList = rstJSONObject.getJSONObject("custom").getJSONArray("data");
            sealList.forEach(obj -> {
                JSONObject sealInfo = (JSONObject)obj;
                Seal seal = new Seal();
                seal.setSealname(sealInfo.getString("sealName"));
                seal.setSealguid(sealInfo.getString("sealSn"));
                seal.setSealimg(sealInfo.getString("sealImage").replace("data:image/png;base64,", ""));
                seal.setSealtype(Integer.parseInt(sealInfo.getString("sealType")));
                seals.add(seal);
            });
            return seals;
        }
        throw new RuntimeException("\u83b7\u53d6\u5370\u7ae0\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + rstJSONObject.getJSONObject("status").getString("text"));
    }

    public String uploadSignatureOriginalText(String req) throws Exception {
        JSONObject reqJSONObject = JSONUtils.getJSONObject(req);
        JSONObject thirdAppObj = null;
        if (reqJSONObject == null) {
            throw new RuntimeException("app\u76f8\u5173\u6570\u636e\u4e3a\u7a7a\uff0c\u8bf7\u91cd\u65b0\u626b\u7801\uff01");
        }
        thirdAppObj = reqJSONObject.getJSONObject("thirdappobj");
        JSONObject reqparams = new JSONObject();
        reqparams.put("tid", thirdAppObj.get("tid"));
        reqparams.put("pid", thirdAppObj.get("pid"));
        reqparams.put("sealSn", thirdAppObj.get("signatureCertSn"));
        reqparams.put("electronicSignatureUserType", thirdAppObj.get("sealSignatureUserType"));
        reqparams.put("orgTransactionCode", thirdAppObj.get("orgTransactionCode"));
        reqparams.put("personalTransactionCode", thirdAppObj.get("personalTransactionCode"));
        reqparams.put("tradingSystemCode", thirdAppObj.get("tradingSystemCode"));
        reqparams.put("accessToken", thirdAppObj.get("accessToken"));
        reqparams.put("signatureOriginalTextList", (Object)reqJSONObject.getJSONArray("signatureobjects"));
        String pStr = JSONUtils.bean2json(this.createReq(reqparams));
        String rst = this.post("/rest/thirdapp/thirdqr/391/uploadsignatureoriginaltext", pStr);
        if (StringUtil.isBlank(rst)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject rstJSONObject = JSONUtils.getJSONObject(rst);
        int code = rstJSONObject.getJSONObject("status").getIntValue("code");
        if (code == 1) {
            JSONObject tid = rstJSONObject.getJSONObject("custom").getJSONObject("data");
            if (tid == null) {
                throw new RuntimeException("\u83b7\u53d6tid\u6570\u636e\u4e3a\u7a7a\uff01");
            }
            return JSONUtils.bean2json(tid);
        }
        throw new RuntimeException("\u83b7\u53d6tid\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + rstJSONObject.getJSONObject("status").getString("text"));
    }

    public String getOriginalTextSignatureValue(String req) throws Exception {
        String data;
        JSONObject appOperateStatus;
        String operateStatus;
        JSONObject reqJSONObject = JSONUtils.getJSONObject(req);
        JSONObject reqparams = new JSONObject();
        int queryCount = reqJSONObject.getIntValue("queryCount");
        if (queryCount > 10 && "01".equals(operateStatus = (appOperateStatus = JSONUtils.getJSONObject(data = this.getAppOperateStatus(req))).getString("operateStatus"))) {
            return data;
        }
        reqparams.put("tid", (Object)reqJSONObject.getString("tid"));
        reqparams.put("pid", (Object)reqJSONObject.getString("pid"));
        reqparams.put("accessToken", (Object)reqJSONObject.getString("accessToken"));
        String pStr = JSONUtils.bean2json(this.createReq(reqparams));
        String rst = this.post("/rest/thirdapp/thirdqr/391/getoriginaltextsignaturevalue", pStr);
        if (StringUtil.isBlank(rst)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject rstJSONObject = JSONUtils.getJSONObject(rst);
        int code = rstJSONObject.getJSONObject("status").getIntValue("code");
        if (code == 1) {
            JSONObject data2 = rstJSONObject.getJSONObject("custom").getJSONObject("data");
            if (data2 == null) {
                throw new RuntimeException("\u83b7\u53d6\u7b7e\u540d\u503c\u6570\u636e\u4e3a\u7a7a\uff01");
            }
            return JSONUtils.bean2json(data2);
        }
        throw new RuntimeException("\u83b7\u53d6\u7b7e\u540d\u503c\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + rstJSONObject.getJSONObject("status").getString("text"));
    }

    public String getAppOperateStatus(String req) throws Exception {
        JSONObject reqJSONObject = JSONUtils.getJSONObject(req);
        JSONObject reqparams = new JSONObject();
        reqparams.put("tid", reqJSONObject.get("pid"));
        reqparams.put("pid", reqJSONObject.get("pid"));
        reqparams.put("accessToken", reqJSONObject.get("accessToken"));
        String pStr = JSONUtils.bean2json(this.createReq(reqparams));
        String rst = this.post("/rest/thirdapp/thirdqr/391/getappoperatestatus", pStr);
        if (StringUtil.isBlank(rst)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        JSONObject rstJSONObject = JSONUtils.getJSONObject(rst);
        int code = rstJSONObject.getJSONObject("status").getIntValue("code");
        if (code == 1) {
            JSONObject data = rstJSONObject.getJSONObject("custom").getJSONObject("data");
            if (data == null) {
                throw new RuntimeException("\u83b7\u53d6CA\u4e92\u8ba4APP\u64cd\u4f5c\u72b6\u6001\u6570\u636e\u4e3a\u7a7a\uff01");
            }
            return JSONUtils.bean2json(data);
        }
        throw new RuntimeException("\u83b7\u53d6CA\u4e92\u8ba4APP\u64cd\u4f5c\u72b6\u6001\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + rstJSONObject.getJSONObject("status").getString("text"));
    }

    private static class ThirdApp {
        public static final String GETUSERSEALS = "/rest/thirdapp/thirdqr/391/getuserseals";
        public static final String UPLOADSIGNATUREORIGINALTEXT = "/rest/thirdapp/thirdqr/391/uploadsignatureoriginaltext";
        public static final String GETORIGINALTEXTSIGNATUREVALUE = "/rest/thirdapp/thirdqr/391/getoriginaltextsignaturevalue";
        public static final String GETAPPOPERATESTATUS = "/rest/thirdapp/thirdqr/391/getappoperatestatus";

        private ThirdApp() {
        }
    }
}


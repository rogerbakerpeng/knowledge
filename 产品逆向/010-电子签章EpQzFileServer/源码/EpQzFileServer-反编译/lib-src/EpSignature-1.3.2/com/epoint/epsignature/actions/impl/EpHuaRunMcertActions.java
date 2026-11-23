/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.impl.MCertActions;
import com.epoint.epsignature.actions.impl.TopLicUtilReflect;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.service.MCertService;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;

public class EpHuaRunMcertActions
extends BaseActions {
    private MCertService mcertservice;
    private static Logger log = Logger.getLogger(EpHuaRunMcertActions.class);
    private static final String SEAL_API_ID = ConfigUtil.getConfigValue("ztb", "XY_SEAL_API_ID");
    private static final String API_VERSION = ConfigUtil.getConfigValue("ztb", "XY_API_VERSION");
    private static final String APP_SUB_ID = ConfigUtil.getConfigValue("ztb", "XY_APP_SUB_ID");
    private static final String APP_TOKEN = ConfigUtil.getConfigValue("ztb", "XY_APP_TOKEN");
    private static final String SYS_ID = ConfigUtil.getConfigValue("ztb", "XY_SYS_ID");
    private static final String BASE_URL = ConfigUtil.getConfigValue("ztb", "XY_BASE_URL");
    private static final String PARTNER_ID = ConfigUtil.getConfigValue("ztb", "XY_PARTNER_ID");
    private static final String ENV = ConfigUtil.getConfigValue("ztb", "XY_ENV");

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.mcertservice = (MCertService)actionContext.get("MCertService");
        if (this.mcertservice == null) {
            throw new RuntimeException("MCertActions \u521d\u59cb\u5316\u5931\u8d25\uff0c\u672a\u627e\u5230\u5b9e\u73b0\u7684MCertService");
        }
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map map_ = JSONUtils.json2bean(req, Map.class);
        JSONObject apiAttrs = new JSONObject();
        apiAttrs.put("Api_ID", (Object)SEAL_API_ID);
        apiAttrs.put("Api_Version", (Object)API_VERSION);
        apiAttrs.put("App_Sub_ID", (Object)APP_SUB_ID);
        apiAttrs.put("App_Token", (Object)APP_TOKEN);
        apiAttrs.put("ENV", (Object)ENV);
        apiAttrs.put("Partner_ID", (Object)PARTNER_ID);
        apiAttrs.put("Sign", (Object)"NO_SIGN");
        apiAttrs.put("Sys_ID", (Object)SYS_ID);
        apiAttrs.put("Time_Stamp", (Object)String.format("%tF %<tT:%<tL", System.currentTimeMillis()));
        apiAttrs.put("User_Token", (Object)"");
        JSONObject requestData = new JSONObject();
        requestData.put("keybh", map_.get("keybh"));
        JSONObject request = new JSONObject();
        request.put("API_ATTRS", (Object)apiAttrs);
        request.put("REQUEST_DATA", (Object)requestData);
        JSONObject requestBody = new JSONObject();
        requestBody.put("REQUEST", (Object)request);
        String requestStr = requestBody.toJSONString();
        String result = HttpUtil.doPost(requestStr, BASE_URL);
        if (StringUtil.isBlank(result)) {
            log.error("\u83b7\u53d6\u5370\u7ae0\u5217\u8868\u5931\u8d25\uff1a\u8fd4\u56de\u7ed3\u679c\u4e3a\u7a7a");
            throw new RuntimeException("\u83b7\u53d6\u5370\u7ae0\u5217\u8868\u5931\u8d25\uff1a\u8fd4\u56de\u7ed3\u679c\u4e3a\u7a7a");
        }
        JSONObject resultJson = JSONObject.parseObject(result);
        JSONObject response = resultJson.getJSONObject("RESPONSE");
        if (response == null || !"S0A00000".equals(response.getString("RETURN_CODE"))) {
            String errorMsg = response != null ? response.getString("RETURN_DESC") : "\u672a\u77e5\u9519\u8bef";
            log.error("\u83b7\u53d6\u5370\u7ae0\u5217\u8868\u5931\u8d25\uff1a" + errorMsg);
            throw new RuntimeException("\u83b7\u53d6\u5370\u7ae0\u5217\u8868\u5931\u8d25\uff1a" + errorMsg);
        }
        ArrayList sealList = new ArrayList();
        String returnData = response.getString("RETURN_DATA");
        if (StringUtil.isBlank(returnData)) {
            log.error("\u83b7\u53d6\u5370\u7ae0\u5217\u8868\u5931\u8d25\uff1a\u8fd4\u56de\u6570\u636e\u4e3a\u7a7a");
            throw new RuntimeException("\u83b7\u53d6\u5370\u7ae0\u5217\u8868\u5931\u8d25\uff1a\u8fd4\u56de\u6570\u636e\u4e3a\u7a7a");
        }
        JSONArray sealArray = JSONArray.parseArray(returnData);
        if (sealArray == null || sealArray.isEmpty()) {
            log.error("\u83b7\u53d6\u5370\u7ae0\u5217\u8868\u4e3a\u7a7a");
            throw new RuntimeException("\u83b7\u53d6\u5370\u7ae0\u5217\u8868\u4e3a\u7a7a\uff0c\u8bf7\u786e\u8ba4\u7528\u6237\u662f\u5426\u6709\u5370\u7ae0\uff01");
        }
        for (int i = 0; i < sealArray.size(); ++i) {
            JSONObject sealObj = sealArray.getJSONObject(i);
            if (sealObj == null) continue;
            String picData = sealObj.getString("picData");
            String picName = sealObj.getString("picname");
            String fileId = sealObj.getString("fileid");
            String picType = sealObj.getString("pictype");
            HashMap<String, String> map = new HashMap<String, String>();
            map.put("sealname", picName);
            map.put("sealguid", fileId);
            map.put("sealimg", picData);
            map.put("sealtype", picType);
            sealList.add(map);
        }
        return this.success(sealList);
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        return this.success(this.mcertservice.creatQR(basereq.getRequest()));
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        return this.success(this.mcertservice.queryQRresult((String)basereq.getRequest()));
    }

    public BaseResp parseCert(BaseReq basereq) throws Exception {
        return new MCertActions().parseCert(basereq);
    }

    public BaseResp verifySign(BaseReq basereq) throws Exception {
        String signature;
        boolean verify = false;
        QRInfo qrinfo = JSONUtils.json2bean(basereq.getRequest(), QRInfo.class);
        String org = Base64Util.decode2string(qrinfo.getSignatureobjects().get(0).getOrg());
        String cert = qrinfo.getCertobject().getSignaturecert();
        verify = EpHuaRunMcertActions.verifySignIn(cert, signature = qrinfo.getSignatureobjects().get(0).getSigned(), org);
        if (!verify) {
            verify = EpHuaRunMcertActions.verifySignIn(cert, signature, qrinfo.getSignatureobjects().get(0).getOrg());
        }
        return this.success(verify);
    }

    public static boolean verifySignIn(String base64PbkCert, String signedData, String plainText) {
        try {
            String cerSerialNumber;
            Object cer;
            Object pkcs7;
            try {
                TopLicUtilReflect.getInstance().initTCA();
            }
            catch (Exception ex) {
                log.error("\u9a8c\u7b7e\u5931\u8d25\uff1a\u521d\u59cb\u5316\u5931\u8d25:");
                ex.printStackTrace();
                return false;
            }
            Class<?> pkcs7Class = Class.forName("cn.topca.api.cert.Pkcs7");
            Class<?> certificateClass = Class.forName("cn.topca.api.cert.Certificate");
            try {
                Constructor<?> pkcs7Constructor = pkcs7Class.getConstructor(String.class);
                pkcs7 = pkcs7Constructor.newInstance(signedData);
            }
            catch (Exception ex) {
                log.error("\u9a8c\u7b7e\u5931\u8d25\uff1a\u7b7e\u540d\u6570\u636e\u89e3\u6790\u5931\u8d25\uff1a" + signedData, ex);
                return false;
            }
            try {
                Constructor<?> certificateConstructor = certificateClass.getConstructor(String.class);
                cer = certificateConstructor.newInstance(base64PbkCert);
            }
            catch (Exception ex) {
                log.error("\u9a8c\u7b7e\u5931\u8d25\uff1a\u7528\u6237\u8bc1\u4e66\u89e3\u6790\u5931\u8d25\uff1a" + base64PbkCert, ex);
                return false;
            }
            Method verifyMethod = pkcs7Class.getMethod("verify", byte[].class);
            Object certificate = verifyMethod.invoke(pkcs7, new Object[]{plainText.getBytes(Charset.forName("UTF-8"))});
            if (certificate == null) {
                log.error("\u9a8c\u7b7e\u5931\u8d25\uff1a\u539f\u6587\u88ab\u4fee\u6539");
                return false;
            }
            Method serialNumberMethod = certificateClass.getMethod("serialNumber", new Class[0]);
            String certSerialNumber = (String)serialNumberMethod.invoke(certificate, new Object[0]);
            boolean bSame = certSerialNumber.equals(cerSerialNumber = (String)serialNumberMethod.invoke(cer, new Object[0]));
            if (!bSame) {
                log.error("\u9a8c\u7b7e\u5931\u8d25\uff1a\u7528\u6237\u8bc1\u4e66\u4e0e\u7b7e\u540d\u8bc1\u4e66\u4e0d\u4e00\u81f4:" + certSerialNumber + ":" + cerSerialNumber);
            }
            return true;
        }
        catch (Exception e) {
            log.error("\u9a8c\u7b7e\u5931\u8d25\uff1a\u672a\u77e5\u5f02\u5e38\uff1a" + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}


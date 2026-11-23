/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.bouncycastle.jce.provider.BouncyCastleProvider;
import java.io.ByteArrayInputStream;
import java.security.KeyStore;
import java.security.Security;
import java.security.cert.Certificate;
import java.util.ArrayList;
import java.util.Map;
import org.apache.log4j.Logger;

public class EpQzZhenJiangYunActions
extends BaseActions {
    private H5OutImpl outApi;
    private static Logger log = Logger.getLogger(EpQzZhenJiangYunActions.class);
    private String CLOUD_URL = ConfigUtil.getConfigValue("ztb", "ZhenJiangUrl");
    private String APP_KEY = ConfigUtil.getConfigValue("ztb", "ZhenJiangAppkey");
    private String PASSWORD = ConfigUtil.getConfigValue("ztb", "ZhenJiangPassWord");
    private static final String GETTOKEN = "/oauth/authorize";
    private static final String GETSEALIMG = "/httpSeal/getPadSealImg";
    private static final String GETSIGNDATA = "/httpCustomSeal/digestSign";
    private static final String VERIFYSIGN = "/httpCustomSeal/verifyDigestSign";

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("\u7cfb\u7edf\u521d\u59cb\u5316\u5f02\u5e38");
        }
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String getSealImgUrl = this.CLOUD_URL + GETSEALIMG;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        String token = this.getToken();
        JSONObject reqBody = new JSONObject();
        reqBody.put("userName", reqmap.get("userName"));
        reqBody.put("cardNumber", reqmap.get("cardNumber"));
        reqBody.put("channelNo", (Object)this.APP_KEY);
        reqBody.put("accessToken", (Object)token);
        String result = HttpUtil.doPost(reqBody.toJSONString(), getSealImgUrl);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        if (!"200".equals(respBody.getString("code"))) {
            log.info("\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u5931\u8d25\u8fd4\u56de\uff1a" + result);
            throw new RuntimeException(respBody.getString("message"));
        }
        JSONObject data = respBody.getJSONObject("data");
        if (!"200".equals(data.getString("code"))) {
            log.info("\u83b7\u53d6\u5370\u7ae0\u56fe\u7247\u5931\u8d25\u8fd4\u56de\uff1a" + result);
            throw new RuntimeException(data.getString("message"));
        }
        JSONObject sealJson = data.getJSONObject("data");
        ArrayList<Seal> seals = new ArrayList<Seal>();
        Seal seal = new Seal();
        seal.setSealname(sealJson.getString("sealname"));
        seal.setSealguid(sealJson.getString("sealguid"));
        seal.setSealimg(sealJson.getString("sealimg"));
        seals.add(seal);
        return this.success(seals);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String getSignDataUrl = this.CLOUD_URL + GETSIGNDATA;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        String token = this.getToken();
        JSONObject reqBody = new JSONObject();
        reqBody.put("userName", reqmap.get("userName"));
        reqBody.put("cardNumber", reqmap.get("cardNumber"));
        reqBody.put("channelNo", (Object)this.APP_KEY);
        reqBody.put("accessToken", (Object)token);
        JSONObject signatureobjects = new JSONObject();
        signatureobjects.put("digest", reqmap.get("digest"));
        reqBody.put("signatureobjects", (Object)signatureobjects);
        String result = HttpUtil.doPost(reqBody.toJSONString(), getSignDataUrl);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        if (!"200".equals(respBody.getString("code"))) {
            log.info("\u7b7e\u540d\u5931\u8d25\u8fd4\u56de\uff1a" + result);
            throw new RuntimeException(respBody.getString("message"));
        }
        JSONObject data = respBody.getJSONObject("data");
        if (!"200".equals(data.getString("code"))) {
            log.info("\u7b7e\u540d\u5931\u8d25\u8fd4\u56de\uff1a" + result);
            throw new RuntimeException(data.getString("message"));
        }
        JSONObject signJson = data.getJSONObject("data");
        JSONObject signatureObj = signJson.getJSONObject("signatureobjects");
        JSONObject certObj = signJson.getJSONObject("certobject");
        String signCert = this.getSignCertBase64(certObj.getString("signCert"));
        JSONObject baseResp = new JSONObject();
        baseResp.put("signature", (Object)signatureObj.getString("signed"));
        baseResp.put("signcert", (Object)signCert);
        return this.success(baseResp.toJSONString());
    }

    public BaseResp verify(BaseReq basereq) throws Exception {
        boolean verify = false;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap = JSONUtils.json2bean(req, Map.class);
        String digest = (String)reqmap.get("digest");
        String signcert = (String)reqmap.get("signcert");
        String signed = (String)reqmap.get("signature");
        verify = EpSignatureApi.verifySign(digest, signcert, signed);
        return this.success(verify);
    }

    private String getToken() {
        StringBuilder requestUrl = new StringBuilder();
        requestUrl.append(this.CLOUD_URL).append(GETTOKEN).append("?app_key=").append(this.APP_KEY).append("&response_type=token");
        String respStr = HttpUtil.doGet(null, requestUrl.toString());
        if (StringUtil.isBlank(respStr)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(respStr);
        if (!"00000".equals(respBody.getString("statusCode"))) {
            throw new RuntimeException(respBody.getString("msgDesc"));
        }
        JSONObject data = respBody.getJSONObject("data");
        return data.getString("access_token");
    }

    private String getSignCertBase64(String pfxbase64) throws Exception {
        Security.addProvider(new BouncyCastleProvider());
        KeyStore ks = KeyStore.getInstance("PKCS12");
        char[] password = this.PASSWORD.toCharArray();
        ByteArrayInputStream certStream = new ByteArrayInputStream(Base64Util.decode(pfxbase64));
        ks.load(certStream, password);
        String alias = ks.aliases().nextElement();
        Certificate[] chain = ks.getCertificateChain(alias);
        return Base64Util.encode(chain[0].getEncoded());
    }
}


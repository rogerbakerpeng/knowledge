/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.itextpdf.text.pdf.security.PrivateKeySignature;
import java.io.ByteArrayInputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.Security;
import java.security.cert.Certificate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

public class DXServerSealActions
extends BaseActions {
    private static Logger log = Logger.getLogger(SignUtil.class);
    public PrivateKey pk = null;
    public Certificate[] chain = null;
    private H5OutImpl outApi;
    public static final String PFXBASE64 = "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";

    public DXServerSealActions() {
        try {
            Security.addProvider(new BouncyCastleProvider());
            KeyStore ks = KeyStore.getInstance("PKCS12", "BC");
            char[] PASSWORD = "12345678".toCharArray();
            ByteArrayInputStream certStream = new ByteArrayInputStream(Base64Util.decode(PFXBASE64));
            ks.load(certStream, PASSWORD);
            String alias = ks.aliases().nextElement();
            this.pk = (PrivateKey)ks.getKey(alias, PASSWORD);
            this.chain = ks.getCertificateChain(alias);
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            e.printStackTrace();
        }
    }

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("\u7cfb\u7edf\u521d\u59cb\u5316\u5f02\u5e38");
        }
    }

    public BaseResp queryCert(BaseReq basereq) throws Exception {
        HashMap<String, String> map_cert = new HashMap<String, String>();
        map_cert.put("cert", Base64Util.encode(this.chain[0].getEncoded()));
        return this.success(JSONUtils.bean2json(map_cert));
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String sealsStr = this.outApi.getSealImg(basereq.getRequest().toString());
        List seals = JSONUtils.json2bean(sealsStr, List.class);
        return this.success(seals);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        HashMap<String, String> map_sign = new HashMap<String, String>();
        String req = JSONUtils.bean2json(basereq.getRequest());
        JSONObject reqJson = JSONObject.parseObject(req);
        if (reqJson.get("signed").toString().contains("[")) {
            JSONArray reqArr = JSONObject.parseArray(reqJson.get("signed").toString());
            JSONArray respArr = new JSONArray();
            for (int i = 0; i < reqArr.size(); ++i) {
                JSONObject respJson = new JSONObject();
                respJson.put("oid", (Object)"");
                respJson.put("desc", (Object)"batch");
                String orgStr = JSONObject.parseObject(reqArr.get(i).toString()).getString("org");
                respJson.put("org", (Object)orgStr);
                respJson.put("signed", (Object)this.dxSign(orgStr));
                respArr.add(respJson);
            }
            map_sign.put("signature", respArr.toString());
            map_sign.put("signcert", Base64Util.encode(this.chain[0].getEncoded()));
        } else {
            String reqStr = reqJson.get("signed").toString();
            map_sign.put("signature", this.dxSign(reqStr));
            map_sign.put("signcert", Base64Util.encode(this.chain[0].getEncoded()));
        }
        return this.success(JSONUtils.bean2json(map_sign));
    }

    public String dxSign(String src) throws Exception {
        return Base64Util.encode(this.sign(Base64Util.decode(src)));
    }

    public byte[] sign(byte[] src) throws Exception {
        String digestAlgorithm = "SM3";
        PrivateKeySignature signature = new PrivateKeySignature(this.pk, digestAlgorithm, null);
        return signature.sign(src);
    }
}


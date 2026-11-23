/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.service.MCertService;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.cert.SM2CertUtil;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Map;

public class SZCMCertActions
extends BaseActions {
    private MCertService mcertservice;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.mcertservice = (MCertService)actionContext.get("MCertService");
        if (this.mcertservice == null) {
            throw new RuntimeException("MCertActions \u521d\u59cb\u5316\u5931\u8d25\uff0c\u672a\u627e\u5230\u5b9e\u73b0\u7684MCertService");
        }
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(basereq.getRequest().toString());
        String signcert = jsonObject.getJSONObject("qrinfo").getJSONObject("certobject").getString("signcert");
        X509Certificate signCert = SM2CertUtil.getX509Certificate(Base64Util.decode(signcert));
        String danweiname = CertUtils.getClientSignCertCN(signCert);
        String signdate = Base64Util.encode(String.valueOf(System.currentTimeMillis()));
        String signcertpub = Base64Util.encode(signCert.getPublicKey().getEncoded());
        HashMap<String, String> map_ = new HashMap<String, String>();
        map_.put("danweiname", danweiname);
        map_.put("signdate", signdate);
        map_.put("signcertpub", signcertpub);
        return this.success(map_);
    }

    public BaseResp getSealImgByCa(BaseReq basereq) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(basereq.getRequest().toString());
        String signcert = jsonObject.getString("signcert");
        X509Certificate signCert = SM2CertUtil.getX509Certificate(Base64Util.decode(signcert));
        String danweiname = CertUtils.getClientSignCertCN(signCert);
        String signdate = Base64Util.encode(String.valueOf(System.currentTimeMillis()));
        String signcertpub = Base64Util.encode(signCert.getPublicKey().getEncoded());
        HashMap<String, String> map_ = new HashMap<String, String>();
        map_.put("danweiname", danweiname);
        map_.put("signdate", signdate);
        map_.put("signcertpub", signcertpub);
        return this.success(map_);
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.PadImpl;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.Pdf;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.utils.JSONUtils;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class PADActions
extends BaseActions {
    private static Logger logger = Logger.getLogger(PADActions.class);
    private PadImpl outApi;

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.outApi = (PadImpl)actionContext.get("PadImpl");
        if (this.outApi == null) {
            throw new RuntimeException("PADActions \u521d\u59cb\u5316\u5931\u8d25\uff0c\u672a\u627e\u5230\u5b9e\u73b0\u7684PadImpl");
        }
    }

    public BaseResp getSignedVal(BaseReq basereq) throws Exception {
        ArrayList<Pdf> pdflist_ = new ArrayList<Pdf>();
        JSONObject json_ = JSONObject.parseObject(basereq.getRequest().toString());
        Pdf pdf = JSONUtils.json2bean(json_.getString("pdf"), Pdf.class);
        Pdf[] batchpdf = null;
        try {
            ComSignReq bean = JSONUtils.json2bean(pdf.getMsg(), ComSignReq.class);
            if (bean != null) {
                batchpdf = bean.getBatchpdf();
            }
        }
        catch (Exception e) {
            logger.info("\u4e0d\u662f\u6279\u91cf\u76d6\u7ae0\uff01", e);
        }
        if (batchpdf != null) {
            pdflist_ = Arrays.asList(batchpdf);
        } else {
            pdflist_.add(pdf);
        }
        PadImpl.SignResult signresult = this.outApi.getSignedVal(pdflist_, json_.getString("signatureobjects"));
        return this.success(JSONUtils.bean2json(signresult));
    }

    public BaseResp dealDegist(BaseReq basereq) throws Exception {
        logger.info("\u8fdb\u5165dealDegist\u6b64\u65b9\u6cd5\u3002\u3002\u3002");
        SignReq req = JSONUtils.json2bean(basereq.getRequest(), ComSignReq.class);
        QRInfo qrinfo_ = JSONUtils.json2bean(basereq.getRequest(), QRInfo.class);
        List<QRInfo.SignatureObject> signatureobject = qrinfo_.getSignatureobjects();
        String signcert = this.outApi.dealDegist(req, signatureobject);
        logger.info("\u7ed3\u675fdealDegist\u6b64\u65b9\u6cd5\u3002\u3002\u3002");
        HashMap<String, String> map_ = new HashMap<String, String>();
        map_.put("signcert", signcert);
        return this.success(map_);
    }

    public BaseResp getSignCert(BaseReq basereq) throws Exception {
        JSONObject json_ = JSONObject.parseObject(basereq.getRequest().toString());
        String dognum = "";
        if (json_.containsKey("dognum")) {
            dognum = json_.getString("dognum");
        }
        String signcert = this.outApi.getSignCert(dognum);
        HashMap<String, String> map_ = new HashMap<String, String>();
        map_.put("signcert", signcert);
        return this.success(map_);
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        JSONObject json_ = JSONObject.parseObject(basereq.getRequest().toString());
        String dognum = "";
        if (json_.containsKey("dognum")) {
            dognum = json_.getString("dognum");
        }
        List<Seal> seals = this.outApi.getSealImg(dognum);
        return this.success(seals);
    }
}


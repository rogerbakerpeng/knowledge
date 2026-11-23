/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.mcert.MCertBaseReq;
import com.epoint.epsignature.bean.mcert.MCertBaseResp;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class IWebNetActions
extends BaseActions {
    private String platformcode = "";
    private String posturl = "";
    public static final String GETSESEAL = "/rest/mcert/frame/signature/getSeSeal";
    private static Logger logger = Logger.getLogger(IWebNetActions.class);
    private static String restfulUrl = StringUtil.isNotBlank(ConfigUtil.getConfigValue("ztb", "H5VerifyFrameworkServerUrl")) ? ConfigUtil.getConfigValue("ztb", "H5VerifyFrameworkServerUrl") : ConfigUtil.getConfigValue("ztb", "DotNetResutFulUrl");
    public static final String CHARSETNAME = "UTF-8";

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.posturl = (String)actionContext.get("posturl");
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        MCertBaseReq baseReq = new MCertBaseReq();
        baseReq.setHead(new MCertBaseReq.Head(this.platformcode, new Date().getTime(), ""));
        baseReq.setParams(req);
        String pStr = JSONUtils.bean2json(baseReq);
        String resp = HttpUtil.doPost(pStr, this.posturl + GETSESEAL);
        if (StringUtil.isBlank(resp)) {
            throw new RuntimeException("\u83b7\u53d6\u4fe1\u606f\u4e3a\u7a7a\uff01\uff01");
        }
        MCertBaseResp bztBaseReq = JSONUtils.json2bean(resp, MCertBaseResp.class);
        int code = bztBaseReq.getStatus().getCode();
        if (code == 1) {
            List<Seal> list_seals = bztBaseReq.getCustom().getSeals();
            if (list_seals == null) {
                throw new RuntimeException("\u672a\u627e\u5230\u7b7e\u7ae0ASN1\u4fe1\u606f\uff01\uff01");
            }
            return this.success(list_seals);
        }
        throw new RuntimeException("\u83b7\u53d6\u5370\u7ae0\u6570\u636e\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + bztBaseReq.getStatus().getText());
    }

    public BaseResp queryCert(BaseReq basereq) throws Exception {
        HashMap<String, String> map_cert = new HashMap<String, String>();
        map_cert.put("cert", Base64Util.encode(SignUtil.chain[0].getEncoded()));
        return this.success(JSONUtils.bean2json(map_cert));
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        HashMap<String, String> map_sign = new HashMap<String, String>();
        map_sign.put("signature", SignUtil.sign(basereq.getRequest().toString()));
        return this.success(JSONUtils.bean2json(map_sign));
    }

    public static String verifySign(String org, String cert, String signed, String CAType) {
        try {
            HashMap<String, String> params = new HashMap<String, String>();
            params.put("CAType", "2");
            params.put("OrgData", org);
            params.put("Cer", cert);
            params.put("Ds", signed);
            String ret = HttpUtil.doPost(JSONUtils.bean2json(params), restfulUrl + "/EpDataVerifyJava");
            logger.info("verifySign\u8bf7\u6c42\u5730\u5740\uff1a" + restfulUrl + "/EpDataVerifyJava");
            logger.info("verifySign\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(params));
            logger.info("verifySign\u8fd4\u56de\u53c2\u6570\uff1a" + ret);
            byte[] result = Base64Util.decode(ret);
            if (result != null && result.length > 6 && "Error:".equals(new String(result, 0, 6, CHARSETNAME))) {
                logger.error("verifySign\u9519\u8bef\uff1a" + ret);
                return "0";
            }
            return Base64Util.decode2string(ret);
        }
        catch (Exception e) {
            logger.error("verifySign \u672a\u77e5\u9519\u8bef", e);
            return "0";
        }
    }
}


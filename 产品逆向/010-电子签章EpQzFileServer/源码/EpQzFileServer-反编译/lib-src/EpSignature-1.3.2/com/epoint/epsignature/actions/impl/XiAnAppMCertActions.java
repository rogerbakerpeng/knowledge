/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.epsignature.xianapptool.DesUtil;
import com.epoint.gm.util.Base64Util;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import org.apache.log4j.Logger;

public class XiAnAppMCertActions
extends BaseActions {
    private static Logger logger = Logger.getLogger(XiAnAppMCertActions.class);
    public String XiAnAppUrl = ConfigUtil.getConfigValue("ztb", "XiAnSignAppUrl");
    private static final String getCaSmsUri = "/signature/getCaSms";
    private static final String getSignatureUri = "/signature/startSignXd";
    private static final String verifySignUri = "/signature/endSign";

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getCaSms(BaseReq basereq) throws Exception {
        String caSmsUrl = this.XiAnAppUrl + getCaSmsUri;
        String req = JSONUtils.bean2json(basereq.getRequest());
        JSONObject reqBody = this.getBaseReqBody();
        reqBody.put("body", (Object)DesUtil.encodeText(req));
        String result = HttpUtil.doPost(reqBody.toJSONString(), caSmsUrl);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u897f\u5b89app\u83b7\u53d6\u7b7e\u540d\u9a8c\u8bc1\u7801\u63a5\u53e3\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        String respbody = DesUtil.decodeText(respBody.getString("body"));
        logger.info("\u897f\u5b89app\u83b7\u53d6\u7b7e\u540d\u9a8c\u8bc1\u7801\u63a5\u53e3\u8fd4\u56de\u503c:" + result);
        JSONObject caSmsBody = JSONObject.parseObject(respbody);
        if (!"000000".equals(caSmsBody.getString("errCode"))) {
            throw new RuntimeException(caSmsBody.getString("errMsg"));
        }
        return this.success(caSmsBody.getString("data"));
    }

    public BaseResp getSignature(BaseReq basereq) throws Exception {
        String signUrl = this.XiAnAppUrl + getSignatureUri;
        String req = JSONUtils.bean2json(basereq.getRequest());
        JSONObject reqBody = this.getBaseReqBody();
        reqBody.put("body", (Object)DesUtil.encodeText(req));
        String result = HttpUtil.doPost(reqBody.toJSONString(), signUrl);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u897f\u5b89app\u83b7\u53d6\u7b7e\u540d\u503c\u63a5\u53e3\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        String respbody = DesUtil.decodeText(respBody.getString("body"));
        logger.info("\u897f\u5b89app\u83b7\u53d6\u7b7e\u540d\u503c\u63a5\u53e3\u8fd4\u56de\u503c:" + result);
        JSONObject caSmsBody = JSONObject.parseObject(respbody);
        if (!"000000".equals(caSmsBody.getString("errCode"))) {
            throw new RuntimeException(caSmsBody.getString("errMsg"));
        }
        return this.success(caSmsBody.getString("data"));
    }

    public BaseResp verifySign(BaseReq basereq) throws Exception {
        String verifyUrl = this.XiAnAppUrl + verifySignUri;
        JSONObject reqBody = this.getBaseReqBody();
        boolean verify = false;
        QRInfo qrinfo = JSONUtils.json2bean(basereq.getRequest(), QRInfo.class);
        String org = Base64Util.decode2string(qrinfo.getSignatureobjects().get(0).getOrg());
        String signature = qrinfo.getSignatureobjects().get(0).getSigned();
        JSONObject body = new JSONObject();
        body.put("plaintext", (Object)org);
        body.put("pkcs7Str", (Object)signature);
        reqBody.put("body", (Object)DesUtil.encodeText(body.toJSONString()));
        String result = HttpUtil.doPost(reqBody.toJSONString(), verifyUrl);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u897f\u5b89app\u9a8c\u7b7e\u63a5\u53e3\u51fa\u9519");
        }
        JSONObject respBody = JSONObject.parseObject(result);
        String respbody = DesUtil.decodeText(respBody.getString("body"));
        logger.info("\u897f\u5b89app\u9a8c\u7b7e\u63a5\u53e3\u8fd4\u56de\u503c:" + result);
        JSONObject verifyBody = JSONObject.parseObject(respbody);
        if (!"000000".equals(verifyBody.getString("errCode"))) {
            throw new RuntimeException(verifyBody.getString("errMsg"));
        }
        JSONObject data = verifyBody.getJSONObject("data");
        verify = "0".equals(data.getString("verify"));
        return this.success(verify);
    }

    private JSONObject getBaseReqBody() {
        JSONObject baseReqBody = new JSONObject();
        JSONObject head = new JSONObject();
        head.put("msgId", (Object)UUID.randomUUID().toString());
        head.put("transCode", (Object)"companyInfo");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        head.put("sendDate", (Object)sdf.format(new Date()));
        baseReqBody.put("head", (Object)head);
        return baseReqBody;
    }
}


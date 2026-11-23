/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.service;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.dzyyzz.bean.Message_Content;
import com.epoint.epsignature.dzyyzz.bean.Message_Header;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.util.TokenUtil;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.log4j.Logger;

public class ElcBusLicService {
    public String AUTHCODE;
    public String YEWUsecret;
    public String YEWUkey;
    public String YEWUUrl;
    public String DZYYZZUrl;
    private static Logger logger = Logger.getLogger(ElcBusLicService.class);
    public String SYSCODE;

    public ElcBusLicService() {
        ElcBusLicService a;
        ElcBusLicService elcBusLicService = a;
        ElcBusLicService elcBusLicService2 = a;
        ElcBusLicService elcBusLicService3 = a;
        elcBusLicService3.DZYYZZUrl = ConfigUtil.getConfigValue(BaseReq.J("H\u0007P"), CertObject.J("ROOLLOCgz"));
        elcBusLicService3.SYSCODE = ConfigUtil.getConfigValue(BaseReq.J("H\u0007P"), CertObject.J("ROOLLOElevyqs"));
        elcBusLicService2.AUTHCODE = ConfigUtil.getConfigValue(BaseReq.J("H\u0007P"), CertObject.J("QLLOOLTca~vyqs"));
        elcBusLicService2.YEWUUrl = ConfigUtil.getConfigValue(BaseReq.J("H\u0007P"), CertObject.J("OPA@Cgz"));
        elcBusLicService.YEWUkey = ConfigUtil.getConfigValue(BaseReq.J("H\u0007P"), CertObject.J("OPA@}po"));
        elcBusLicService.YEWUsecret = ConfigUtil.getConfigValue(BaseReq.J("H\u0007P"), CertObject.J("LSBCfsvdpb"));
    }

    public String queryQRresult(Object a) {
        ElcBusLicService a2;
        String string = "";
        a = JSONUtils.json2bean(a, JSONObject.class).getString(BaseReq.J("\u0002@\u0010]\u0017W\u001aV"));
        JSONObject jSONObject = new JSONObject();
        JSONObject jSONObject2 = new JSONObject();
        JSONObject jSONObject3 = new JSONObject();
        ElcBusLicService elcBusLicService = a2;
        String string2 = TokenUtil.createToken(elcBusLicService.YEWUkey, elcBusLicService.YEWUsecret, null);
        jSONObject2.put(CertObject.J("bz}px"), (Object)string2);
        jSONObject3.put(BaseReq.J("\u0002@\u001aV"), a);
        jSONObject.put(CertObject.J("}str"), (Object)jSONObject2);
        jSONObject.put(BaseReq.J("\u0011]\u0017K"), (Object)jSONObject3);
        string = HttpUtil.doPost(jSONObject.toJSONString(), a2.YEWUUrl);
        if (StringUtil.isBlank(string)) {
            throw new RuntimeException(CertObject.J("\u8c15\u753d\u7b3a\u4e1c\u65af\u6718\u52b7\u51ef\u950f"));
        }
        a = JSONUtils.json2bean(string, JSONObject.class).getJSONObject(BaseReq.J("\u0000F\u0012F\u0006A"));
        if (!"1".equals(((JSONObject)a).getString(CertObject.J("vyqs")))) {
            throw new RuntimeException(new StringBuilder().insert(0, BaseReq.J("\u8c70\u751a\u63d6\u53d1\u5942\u8d17_\u952b\u8b9c\u4fd3\u601c\uff28")).append(((JSONObject)a).getString(CertObject.J("asmb"))).toString());
        }
        return string;
    }

    public boolean verifySign(String a, String a2, String a3) {
        Message_Content message_Content;
        ElcBusLicService a4;
        Message_Header message_Header;
        DZYYZZReq dZYYZZReq = new DZYYZZReq();
        Message_Header message_Header2 = message_Header = new Message_Header();
        Message_Header message_Header3 = message_Header;
        ElcBusLicService elcBusLicService = a4;
        message_Header.setSyscode(elcBusLicService.SYSCODE);
        message_Header3.setAuthcode(elcBusLicService.AUTHCODE);
        message_Header3.setBusinesstype(BaseReq.J("\u0002C\u0005"));
        message_Header2.setSign(a3);
        message_Header2.setVersion("1");
        Message_Content message_Content2 = message_Content = new Message_Content();
        Message_Content message_Content3 = message_Content;
        message_Content3.setEntity(a);
        message_Content3.setClear(a2);
        message_Content2.setSignData(a3);
        message_Content2.setSigntype("1");
        Message_Content message_Content4 = message_Content;
        message_Content2.setOpertime(new SimpleDateFormat(CertObject.J("loloX[qr]^x{fe")).format(new Date()));
        DZYYZZReq dZYYZZReq2 = dZYYZZReq;
        dZYYZZReq2.setMessage_header(message_Header);
        dZYYZZReq.setMessage_content(message_Content);
        a = JSONUtils.json2bean(HttpUtil.doPost(JSONUtils.bean2json(dZYYZZReq2), a4.DZYYZZUrl), DZYYZZReq.class).getMessage_content().getRet();
        return "0".equals(a);
    }

    public String creatQR(Object a) {
        Message_Content message_Content;
        ElcBusLicService a2;
        Message_Header message_Header;
        String string = "";
        a = JSONUtils.json2bean(a, JSONObject.class);
        String string2 = ((JSONObject)a).getString(BaseReq.J("\u0002@\u0007K\u0003W"));
        DZYYZZReq dZYYZZReq = new DZYYZZReq();
        Message_Header message_Header2 = message_Header = new Message_Header();
        Message_Header message_Header3 = message_Header;
        ElcBusLicService elcBusLicService = a2;
        message_Header.setSyscode(elcBusLicService.SYSCODE);
        message_Header3.setAuthcode(elcBusLicService.AUTHCODE);
        message_Header3.setBusinesstype(CertObject.J("&%%"));
        message_Header2.setSign("");
        message_Header2.setVersion(BaseReq.J("\u0000"));
        Message_Content message_Content2 = new Message_Content();
        if (CertObject.J("zzq|x").equals(string2)) {
            Message_Content message_Content3 = message_Content2;
            message_Content = message_Content3;
            message_Content3.setQrtype(BaseReq.J("B\u0003C\u0000"));
        } else {
            if (CertObject.J("f\u007frx").equals(string2)) {
                Message_Content message_Content4 = message_Content2;
                Message_Content message_Content5 = message_Content2;
                message_Content5.setQrtype(BaseReq.J("B\u0000C\u0003"));
                message_Content5.setPlain(((JSONObject)a).getString(CertObject.J("f\u007frxy\u007ffb")));
                message_Content4.setSigntype("1");
                message_Content4.setBussinfo(BaseReq.J("\u7546\u5b62\u8456\u4e28\u6214\u7155\u7b0d\u543f"));
            }
            message_Content = message_Content2;
        }
        message_Content.setRettype("1");
        Message_Content message_Content6 = message_Content2;
        Message_Content message_Content7 = message_Content2;
        message_Content6.setOpertime(new SimpleDateFormat(CertObject.J("loloX[qr]^x{fe")).format(new Date()));
        message_Content6.setTermtype("0");
        DZYYZZReq dZYYZZReq2 = dZYYZZReq;
        dZYYZZReq2.setMessage_header(message_Header);
        dZYYZZReq.setMessage_content(message_Content2);
        string = HttpUtil.doPost(JSONUtils.bean2json(dZYYZZReq2), a2.DZYYZZUrl);
        if (StringUtil.isBlank(string)) {
            throw new RuntimeException(BaseReq.J("\u8c31\u755b\u7b1e\u4e7a\u658b\u677e\u5293\u5189\u952b"));
        }
        a = JSONUtils.json2bean(string, JSONObject.class);
        if (!"0".equals(((JSONObject)a).getJSONObject(CertObject.J("xsfetqpI}strpd")).getString(BaseReq.J("W\u0001@\u001c@0]\u0017W")))) {
            throw new RuntimeException(((JSONObject)a).getJSONObject(CertObject.J("xsfetqpI}strpd")).getString(BaseReq.J("W\u0001@\u001c@:\\\u0015]")));
        }
        return string;
    }
}


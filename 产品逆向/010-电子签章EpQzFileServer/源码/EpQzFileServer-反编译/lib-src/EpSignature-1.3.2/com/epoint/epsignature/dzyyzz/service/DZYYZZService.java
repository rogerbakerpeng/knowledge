/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.dzyyzz.service;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.bean.CertInfo;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.dzyyzz.bean.Message_Content;
import com.epoint.epsignature.dzyyzz.bean.Message_Header;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.DianZiYYZZ;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import org.apache.log4j.Logger;

public class DZYYZZService {
    private static Logger logger = Logger.getLogger(DZYYZZService.class);
    public static String AUTHCODE;
    public static String GetMessageUrl;
    public static String DZYYZZUrl;
    public static String SYSCODE;

    public String creatQR(Object a) {
        Message_Header message_Header;
        a = (Map)a;
        DZYYZZReq dZYYZZReq = new DZYYZZReq();
        Message_Header message_Header2 = message_Header = new Message_Header();
        Message_Header message_Header3 = message_Header;
        message_Header3.setSyscode(SYSCODE);
        message_Header3.setAuthcode(AUTHCODE);
        message_Header3.setBusinesstype(ExEpSignException.J("\u0012D\u0011"));
        message_Header2.setSign(CertInfo.J("qUvD"));
        message_Header2.setVersion("1");
        Message_Content message_Content = new Message_Content();
        message_Content.setQrtype((String)a.get(ExEpSignException.J("\u0005P\u0000[\u0004G")));
        Message_Content message_Content2 = message_Content;
        message_Content2.setRettype("1");
        message_Content2.setPlain((String)a.get(CertInfo.J("vYb^iYvD")));
        Message_Content message_Content3 = message_Content;
        message_Content3.setSigntype("1");
        message_Content3.setBussinfo(ExEpSignException.J("\u7541\u5b72\u8451\u4e38\u6213\u7145\u7b0a\u7ac2"));
        Message_Content message_Content4 = message_Content;
        message_Content3.setOpertime(new SimpleDateFormat(CertInfo.J("|I|IH}aTMxh]vC")).format(new Date()));
        DZYYZZReq dZYYZZReq2 = dZYYZZReq;
        dZYYZZReq2.setMessage_header(message_Header);
        dZYYZZReq.setMessage_content(message_Content);
        return HttpUtil.doPost(JSONUtils.bean2json(dZYYZZReq2), DZYYZZUrl);
    }

    public boolean verifySign(String a, String a2, String a3) {
        Message_Content message_Content;
        Message_Header message_Header;
        DZYYZZReq dZYYZZReq = new DZYYZZReq();
        Message_Header message_Header2 = message_Header = new Message_Header();
        Message_Header message_Header3 = message_Header;
        message_Header3.setSyscode(SYSCODE);
        message_Header3.setAuthcode(AUTHCODE);
        message_Header3.setBusinesstype(ExEpSignException.J("\u0012D\u0015"));
        message_Header2.setSign(a3);
        message_Header2.setVersion("1");
        Message_Content message_Content2 = message_Content = new Message_Content();
        Message_Content message_Content3 = message_Content;
        message_Content3.setEntity(a);
        message_Content3.setClear(a2);
        message_Content2.setSignData(a3);
        message_Content2.setSigntype("1");
        Message_Content message_Content4 = message_Content;
        message_Content2.setOpertime(new SimpleDateFormat(CertInfo.J("|I|IH}aTMxh]vC")).format(new Date()));
        DZYYZZReq dZYYZZReq2 = dZYYZZReq;
        dZYYZZReq2.setMessage_header(message_Header);
        dZYYZZReq.setMessage_content(message_Content);
        a = JSONUtils.json2bean(HttpUtil.doPost(JSONUtils.bean2json(dZYYZZReq2), DZYYZZUrl), DZYYZZReq.class).getMessage_content().getRet();
        return "0".equals(a);
    }

    public DZYYZZService() {
        DZYYZZService a;
    }

    static {
        DZYYZZUrl = "http://202.102.25.174:8080/authenticationService/httpserver.do";
        GetMessageUrl = "http://58.210.186.140/yqztbservice/DianZiYYZZ.asmx";
        SYSCODE = "SAIC_YWXT_320501";
        AUTHCODE = "bdb9023ecb9a431d84cb7a92a347f777";
    }

    public String queryQRresult(String a) {
        block3: {
            a = JSONUtils.json2bean(a, DZYYZZReq.class);
            Object object = ((DZYYZZReq)a).getMessage_content().getQrid();
            try {
                DianZiYYZZ dianZiYYZZ = new DianZiYYZZ();
                object = dianZiYYZZ.getDianZiYYZZSoap().getMessage((String)object);
                if (((String)object).length() <= 10) break block3;
                object = JSONObject.parseObject((String)object).get(ExEpSignException.J("\u0010C\u0000C"));
                Object object2 = a;
                ((DZYYZZReq)object2).getMessage_header().setQrstatus(CertInfo.J("5\u0002"));
                ((DZYYZZReq)object2).getMessage_content().setData(object);
                return JSONUtils.bean2json(object2);
            }
            catch (Exception exception) {
                logger.error(new StringBuilder().insert(0, CertInfo.J("tE`B|aWB`Cp\\q\u0010`Bw_w\n")).append(exception.getMessage()).toString(), exception);
                Object object3 = a;
                ((DZYYZZReq)object3).getMessage_header().setQrstatus(ExEpSignException.J("D\u0011"));
                return JSONUtils.bean2json(object3);
            }
        }
        Object object = a;
        ((DZYYZZReq)object).getMessage_header().setQrstatus(ExEpSignException.J("D\u0013"));
        return JSONUtils.bean2json(object);
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SSLUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

public class EpQzXSYunActions
extends BaseActions {
    private static String ReqUrl = "";
    private static Logger log = Logger.getLogger(EpQzXSYunActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        String token = this.getTokenServlet();
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String userid = (String)reqmap_.get("userid");
        String sealid = (String)reqmap_.get("sealid");
        String url = ReqUrl + "/SealInfoServlet?userid=" + userid + "&sealid=" + sealid + "&token=" + token;
        String rtn = HttpUtil.doGet(null, url);
        if (StringUtil.isBlank(rtn)) {
            log.error("\u8bf7\u6c42\u4e09\u65b9\u5730\u5740\u5982\u4e0b\uff1a" + url);
            throw new RuntimeException("\u8c03\u7528\u4e09\u65b9\u670d\u52a1\u63a5\u53e3\u5931\u8d25\uff01");
        }
        String rtndata = new String(Base64Util.decode(rtn), "GBK");
        Document document = DocumentHelper.parseText(rtndata);
        String errorcode = document.getRootElement().elementText("errorcode");
        if (!"1".equals(errorcode)) {
            throw new RuntimeException("\u8c03\u7528\u4e09\u65b9\u670d\u52a1\u63a5\u53e3\u672a\u83b7\u53d6\u5230\u7b7e\u7ae0\u56fe\u7247\uff0c\u8bf7\u68c0\u67e5\u7528\u6237\u4fe1\u606f\uff01");
        }
        Element tokenText = document.getRootElement().element("sealinfo");
        String username = tokenText.elementText("username");
        String sealdata = tokenText.elementText("sealdata");
        String certtype = tokenText.elementText("certtype");
        log.info("\u7528\u6237\u6807\u8bc6\uff1a" + userid + ";\u5370\u7ae0base64\uff1a" + sealdata);
        if (StringUtil.isBlank(sealdata)) {
            throw new RuntimeException("\u672a\u53d6\u5230\u6b64\u7528\u6237\u7b7e\u7ae0\u56fe\u7247\u4fe1\u606f\uff0c\u8bf7\u68c0\u67e5\uff01");
        }
        Seal seal = new Seal();
        seal.setSealimg(sealdata);
        seal.setSealname(username);
        seal.setSealtype(Integer.parseInt(certtype));
        ArrayList<Seal> seals = new ArrayList<Seal>();
        seals.add(seal);
        return this.success(seals);
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String token = this.getTokenServlet();
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String signData = Base64Util.encode((String)reqmap_.get("signed"));
        String userid = (String)reqmap_.get("userid");
        String url = ReqUrl + "/signaturebyuserid?userid=" + userid + "&token=" + token + "&hash=" + signData;
        String rtn = HttpUtil.doGet(null, url);
        if (StringUtil.isBlank(rtn)) {
            log.error("\u8bf7\u6c42\u4e09\u65b9\u5730\u5740\u5982\u4e0b\uff1a" + url);
            throw new RuntimeException("\u8c03\u7528\u4e09\u65b9\u670d\u52a1\u63a5\u53e3\u5931\u8d25\uff01");
        }
        String rtndata = new String(Base64Util.decode(rtn), "GBK");
        Document document = DocumentHelper.parseText(rtndata);
        Element root = document.getRootElement();
        String signed = root.elementText("signaturedata");
        String certdata = root.elementText("certdata");
        HashMap<String, String> map_ = new HashMap<String, String>();
        map_.put("signature", signed);
        map_.put("signcert", certdata);
        return this.success(JSONUtils.bean2json(map_));
    }

    public BaseResp verify(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        boolean str = false;
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String org = Base64Util.encode((String)reqmap_.get("org"));
        String signcert = (String)reqmap_.get("signcert");
        String signature = (String)reqmap_.get("signature");
        str = EpSignatureApi.verifySign(org, signcert, signature);
        return this.success(str);
    }

    private String getTokenServlet() throws Exception {
        SSLUtils.ignoreSsl();
        String tokenText = "";
        String params = "appkeyid=sharesun&randomA=1653637252aaaaaa&sign=32f058ba3bad3cbd5792c4d1bb41bdd23d8f5c92546e4a0a5be399c5d838a026";
        log.error("\u8bf7\u6c42\u4e09\u65b9\u5730\u5740\u5982\u4e0b\uff1a" + ReqUrl + "/GetTokenServlet");
        String rtn = EpQzXSYunActions.doPost(params, ReqUrl + "/GetTokenServlet");
        if (StringUtil.isBlank(rtn)) {
            log.error("\u8bf7\u6c42\u4e09\u65b9\u5730\u5740\u5982\u4e0b\uff1a" + ReqUrl + "/GetTokenServlet");
            throw new RuntimeException("\u8c03\u7528\u4e09\u65b9\u670d\u52a1\u63a5\u53e3\u5931\u8d25\uff01");
        }
        Document document = DocumentHelper.parseText(rtn);
        String message = document.getRootElement().element("Message").getText();
        tokenText = document.getRootElement().element("Content").getText();
        if (!"1000".equals(message)) {
            throw new RuntimeException(tokenText);
        }
        return tokenText;
    }

    public static String doPost(String jsonStr, String requestUrl) {
        if (jsonStr != null && !"".equals(jsonStr)) {
            StringBuffer bs = new StringBuffer();
            try {
                URL url = new URL(requestUrl);
                HttpURLConnection conn = (HttpURLConnection)url.openConnection();
                conn.setDoOutput(true);
                conn.setDoInput(true);
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                conn.connect();
                OutputStream out = conn.getOutputStream();
                out.write(jsonStr.getBytes("utf-8"));
                InputStream is = conn.getInputStream();
                BufferedReader buffer = new BufferedReader(new InputStreamReader(is, "utf-8"));
                String l2 = null;
                while ((l2 = buffer.readLine()) != null) {
                    bs.append(l2);
                }
                conn.disconnect();
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
                e.printStackTrace();
            }
            return bs.toString();
        }
        return null;
    }

    static {
        ReqUrl = ConfigUtil.getConfigValue("ztb", "CloudSignatureURL");
        if (StringUtil.isNotBlank(ReqUrl)) {
            ReqUrl = ReqUrl.split("@")[0];
        }
    }
}


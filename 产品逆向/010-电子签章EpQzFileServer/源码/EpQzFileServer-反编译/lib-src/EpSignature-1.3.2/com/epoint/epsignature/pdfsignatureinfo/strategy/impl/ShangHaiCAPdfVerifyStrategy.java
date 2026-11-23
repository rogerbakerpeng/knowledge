/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfsignatureinfo.strategy.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.pdfsignatureinfo.exception.VerifyByCaTypeException;
import com.epoint.epsignature.pdfsignatureinfo.strategy.PdfVerifyByCatypeStrategy;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.SSLUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.util.HashMap;
import org.apache.log4j.Logger;

public class ShangHaiCAPdfVerifyStrategy
implements PdfVerifyByCatypeStrategy {
    private /* synthetic */ String A;
    private /* synthetic */ String a;
    private static Logger log = Logger.getLogger(ShangHaiCAPdfVerifyStrategy.class);
    private /* synthetic */ String G;
    private /* synthetic */ String b;

    public ShangHaiCAPdfVerifyStrategy() {
        ShangHaiCAPdfVerifyStrategy a;
        ShangHaiCAPdfVerifyStrategy shangHaiCAPdfVerifyStrategy = a;
        ShangHaiCAPdfVerifyStrategy shangHaiCAPdfVerifyStrategy2 = a;
        shangHaiCAPdfVerifyStrategy2.A = ConfigUtil.getConfigValue(PDFHighlightAnnotationReq.J("syk"), DZYYZZReq.J("}2pWg1P\u0003V\u0005p\u0003Q!y4]\u0010Q\u0004A1]\u0010N\u0007J7J\u000e"));
        shangHaiCAPdfVerifyStrategy2.a = ConfigUtil.getConfigValue(PDFHighlightAnnotationReq.J("syk"), DZYYZZReq.J("}2pWg1P\u0003V\u0005p\u0003Q!y4]\u0010Q\u0004A#H\u0012{\r\\\u0007"));
        shangHaiCAPdfVerifyStrategy.G = ConfigUtil.getConfigValue(PDFHighlightAnnotationReq.J("syk"), DZYYZZReq.J("'h*\r=k\nY\f_*Y\u000b{#n\u0007J\u000b^\u001by\u0012H2O\u0006"));
        shangHaiCAPdfVerifyStrategy.b = ConfigUtil.getConfigValue(PDFHighlightAnnotationReq.J("syk"), DZYYZZReq.J("}2pWg1P\u0003V\u0005p\u0003Q!y4]\u0010Q\u0004A#H\u0012v\u0003U\u0007"));
    }

    @Override
    public String verifyByCaType(String a, String a2, String a3) throws Exception {
        String string = "";
        try {
            ShangHaiCAPdfVerifyStrategy a4;
            HashMap<String, String> hashMap = new HashMap<String, String>();
            hashMap.put(PDFHighlightAnnotationReq.J("h}yNfil"), a4.a);
            hashMap.put(DZYYZZReq.J("Y\u0012H2O\u0006"), a4.G);
            hashMap.put(PDFHighlightAnnotationReq.J("nl\u007f}"), a2);
            hashMap.put(DZYYZZReq.J("\u0011Q\u0005V#T\u0005"), PDFHighlightAnnotationReq.J("^d?^d}eZ`:"));
            hashMap.put(DZYYZZReq.J("K\u000b_\f|\u0003L\u0003"), a3);
            hashMap.put(PDFHighlightAnnotationReq.J("ihyh"), (String)a);
            SSLUtils.ignoreSsl();
            string = HttpUtil.doPostWithFormData(new StringBuilder().insert(0, a4.A).append(DZYYZZReq.J("NP\u0017\u0011N\u0011\u0017\u0012\tMN\u0007J\u000b^\u001b")).toString(), hashMap);
            if (StringUtil.isBlank(string)) {
                throw new VerifyByCaTypeException(PDFHighlightAnnotationReq.J("\u8c0e\u7521\u4e07\u6d7eNH\u9a81\u7b77\u63a8\u53ea\u593c\u8d2c"));
            }
            a = JSON.parseObject(string);
            if (((JSONObject)a).getInteger(DZYYZZReq.J("[\r\\\u0007")) != 0) {
                log.error(new StringBuilder().insert(0, PDFHighlightAnnotationReq.J("\u4e07\u6d7enh\u9a81\u7b77\u593c\u8d2c\uff01\u9510\u8be2\u4fe8\u6062\uff13")).append(((JSONObject)a).getString(DZYYZZReq.J("\u000fK\u0005"))).toString());
                throw new VerifyByCaTypeException(((JSONObject)a).getString(PDFHighlightAnnotationReq.J("d~n")));
            }
            string = "1";
            return string;
        }
        catch (Exception exception) {
            log.error(DZYYZZReq.J("1P\u0003V\u0005p\u0003Q!y2\\\u0004n\u0007J\u000b^\u001bk\u0016J\u0003L\u0007_\u001b"), exception);
            throw new VerifyByCaTypeException(new StringBuilder().insert(0, PDFHighlightAnnotationReq.J("\u4e07\u6d7enh\u9a81\u7b77\u593c\u8d2c\uff01\u9510\u8be2\u4fe8\u6062\uff13")).append(exception.getMessage()).toString(), exception);
        }
    }
}


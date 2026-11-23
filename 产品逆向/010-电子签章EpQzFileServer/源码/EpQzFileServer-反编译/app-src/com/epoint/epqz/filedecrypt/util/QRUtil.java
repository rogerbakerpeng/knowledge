/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.util;

import com.alibaba.fastjson.JSONObject;
import com.epoint.configuration.EpQzFileServerConfig;
import com.epoint.epqz.filedecrypt.controller.FileDecryptController;
import com.epoint.epqz.filedecrypt.enums.BZTQRCodeTypeEnum;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.mcert.MCertBaseReq;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.util.TokenUtil;
import com.epoint.jobs.TempFileCleanJob;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class QRUtil {
    private static final String D = "/rest/mcert/frame/qrinfo/queryQRResult";
    private static final String h = "投标文件解密";
    private static final String c = "/rest/mcert/frame/qrinfo/createQR";
    private static final Logger ALLATORIxDEMO = LoggerFactory.getLogger(QRUtil.class);

    public QRUtil() {
        QRUtil a;
    }

    /*
     * WARNING - void declaration
     */
    private static /* synthetic */ MCertBaseReq ALLATORIxDEMO(EpQzFileServerConfig epQzFileServerConfig, JSONObject jSONObject) {
        void a;
        Object a2;
        EpQzFileServerConfig epQzFileServerConfig2 = epQzFileServerConfig;
        Object object = a2 = new MCertBaseReq();
        ((MCertBaseReq)object).setHead(QRUtil.ALLATORIxDEMO(epQzFileServerConfig2));
        ((MCertBaseReq)object).setParams(a);
        return object;
    }

    private static /* synthetic */ void ALLATORIxDEMO(EpQzFileServerConfig a) {
        if (a == null) {
            throw new IllegalArgumentException("配置对象不能为空");
        }
        if (StringUtil.isBlank(a.getMcerturl())) {
            throw new IllegalArgumentException("服务端地址不能为空");
        }
    }

    /*
     * WARNING - void declaration
     */
    public static String queryQRResult(EpQzFileServerConfig epQzFileServerConfig, String string) {
        void a;
        EpQzFileServerConfig epQzFileServerConfig2 = epQzFileServerConfig;
        QRUtil.ALLATORIxDEMO(epQzFileServerConfig2);
        if (StringUtil.isBlank(a)) {
            throw new IllegalArgumentException("二维码标识不能为空");
        }
        JSONObject a2 = new JSONObject();
        a2.put("qrcodeid", (Object)a);
        return QRUtil.ALLATORIxDEMO(epQzFileServerConfig2, D, a2);
    }

    private static /* synthetic */ MCertBaseReq.Head ALLATORIxDEMO(EpQzFileServerConfig epQzFileServerConfig) {
        EpQzFileServerConfig epQzFileServerConfig2 = epQzFileServerConfig;
        String a = TokenUtil.createToken(epQzFileServerConfig2.getAppkey(), epQzFileServerConfig2.getAppsecret(), null);
        return new MCertBaseReq.Head(epQzFileServerConfig2.getAppkey(), System.currentTimeMillis(), a);
    }

    public static String createDecryptQR(EpQzFileServerConfig epQzFileServerConfig, String string) {
        Object a = string;
        EpQzFileServerConfig a2 = epQzFileServerConfig;
        QRUtil.ALLATORIxDEMO(a2);
        if (StringUtil.isBlank(a)) {
            throw new IllegalArgumentException("加密字符串不能为空");
        }
        EpQzFileServerConfig epQzFileServerConfig2 = a2;
        a = QRUtil.ALLATORIxDEMO(epQzFileServerConfig2, (String)a);
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("qrinfo", a);
        return QRUtil.ALLATORIxDEMO(epQzFileServerConfig2, c, jSONObject);
    }

    private static /* synthetic */ QRInfo ALLATORIxDEMO(EpQzFileServerConfig epQzFileServerConfig, String string) {
        HashMap<String, Object> a;
        QRInfo.DecryptObject decryptObject;
        EpQzFileServerConfig epQzFileServerConfig2 = epQzFileServerConfig;
        QRInfo a2 = new QRInfo();
        a2.setPlatformcode(epQzFileServerConfig2.getAppkey());
        a2.setQrcodetype(BZTQRCodeTypeEnum.解密.getValue());
        a2.setTimestamp(new Date().getTime());
        ArrayList<QRInfo.DecryptObject> arrayList = new ArrayList<QRInfo.DecryptObject>();
        QRInfo.DecryptObject decryptObject2 = decryptObject = new QRInfo.DecryptObject();
        decryptObject2.setEncryed((String)((Object)a));
        decryptObject2.setDesc(h);
        arrayList.add(decryptObject2);
        a2.setDecryptobjects(arrayList);
        a = new HashMap<String, Object>();
        a.put("qrimagerequired", 3 >> 1);
        a2.setExt(a);
        return a2;
    }

    private static /* synthetic */ String ALLATORIxDEMO(EpQzFileServerConfig epQzFileServerConfig, String string, JSONObject jSONObject) {
        String a;
        Object a2 = jSONObject;
        EpQzFileServerConfig a3 = epQzFileServerConfig;
        a2 = QRUtil.ALLATORIxDEMO(a3, (JSONObject)a2);
        a = new StringBuilder().insert(5 >> 3, a3.getMcerturl()).append(a).toString();
        a2 = JSONUtils.bean2json(a2);
        try {
            String string2 = HttpUtil.doPost((String)a2, a);
            if (StringUtil.isBlank(string2)) {
                ALLATORIxDEMO.error("接口返回空响应 - URL: {}, 请求参数: {}", (Object)a, a2);
                throw new QRCodeException("标证通接口返回为空");
            }
            return string2;
        }
        catch (Exception exception) {
            ALLATORIxDEMO.error("接口调用异常 - URL: {}, 错误信息: {}", (Object)a, (Object)exception.getMessage());
            throw new QRCodeException("标证通接口调用异常", exception);
        }
    }

    public static class QRCodeException
    extends RuntimeException {
        public QRCodeException(String string) {
            String a = string;
            QRCodeException a2 = this;
            super(a);
        }

        /*
         * WARNING - void declaration
         */
        public QRCodeException(String string, Throwable throwable) {
            void a;
            Throwable a2 = throwable;
            QRCodeException a3 = this;
            super((String)a, a2);
        }
    }
}


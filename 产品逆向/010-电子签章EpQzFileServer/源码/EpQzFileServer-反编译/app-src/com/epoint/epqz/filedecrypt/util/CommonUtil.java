/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.util;

import com.alibaba.fastjson.JSONObject;
import com.epoint.configuration.EpQzFileServerConfig;
import com.epoint.configuration.EpointConfig;
import com.epoint.epqz.filedecrypt.controller.FileDecryptController;
import com.epoint.epqz.filedecrypt.enums.BZTQRStatusEnum;
import com.epoint.epqz.filedecrypt.enums.ResponseEnum;
import com.epoint.epqz.filedecrypt.model.CommonResponse;
import com.epoint.epqz.filedecrypt.model.QueryResultRequest;
import com.epoint.epqz.filedecrypt.util.QRUtil;
import com.epoint.epqz.filedecrypt.util.XMLUtil;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.SM4Util;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.util.TokenUtil;
import com.epoint.jobs.TempFileCleanJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommonUtil {
    private static final String I = "qrimagebase64";
    private static final String J = "qrcodeid";
    private static final Logger D = LoggerFactory.getLogger(CommonUtil.class);
    private static final String h = "token";
    private static final String c = "Cryptograph";
    private static final String ALLATORIxDEMO = "encpath";

    /*
     * Exception decompiling
     */
    public static String handleFileDecryption(EpointConfig var0, QueryResultRequest var1_1, JSONObject var2_6) throws Exception {
        /*
         * This method has failed to decompile.  When submitting a bug report, please provide this stack trace, and (if you hold appropriate legal rights) the relevant class file.
         * 
         * org.benf.cfr.reader.util.ConfusedCFRException: Started 2 blocks at once
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.getStartingBlocks(Op04StructuredStatement.java:412)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.buildNestedBlocks(Op04StructuredStatement.java:487)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op03SimpleStatement.createInitialStructuredBlock(Op03SimpleStatement.java:736)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisInner(CodeAnalyser.java:850)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisOrWrapFail(CodeAnalyser.java:278)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysis(CodeAnalyser.java:201)
         *     at org.benf.cfr.reader.entities.attributes.AttributeCode.analyse(AttributeCode.java:94)
         *     at org.benf.cfr.reader.entities.Method.analyse(Method.java:531)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseMid(ClassFile.java:1055)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseTop(ClassFile.java:942)
         *     at org.benf.cfr.reader.Driver.doJarVersionTypes(Driver.java:257)
         *     at org.benf.cfr.reader.Driver.doJar(Driver.java:139)
         *     at org.benf.cfr.reader.CfrDriverImpl.analyse(CfrDriverImpl.java:76)
         *     at org.benf.cfr.reader.Main.main(Main.java:54)
         */
        throw new IllegalStateException("Decompilation failed");
    }

    public static String processQRCodeCreation(EpQzFileServerConfig epQzFileServerConfig, String string) throws Exception {
        Object a = string;
        EpQzFileServerConfig a2 = epQzFileServerConfig;
        a = JSONObject.parseObject(QRUtil.createDecryptQR(a2, (String)a), CommonResponse.class);
        CommonResponse commonResponse = new CommonResponse();
        commonResponse.setStatus(((CommonResponse)a).getStatus());
        if (ResponseEnum.请求成功.getValue().intValue() == ((CommonResponse)a).getStatus().getCode()) {
            JSONObject jSONObject = new JSONObject();
            a = ((CommonResponse)a).getCustom();
            jSONObject.put(J, (Object)((JSONObject)a).getString(J));
            jSONObject.put(I, (Object)((JSONObject)a).getString(I));
            commonResponse.setCustom(jSONObject);
        }
        return JSONObject.toJSONString(commonResponse);
    }

    /*
     * WARNING - void declaration
     */
    public static String processDecryptionResult(EpointConfig epointConfig, QueryResultRequest queryResultRequest, CommonResponse commonResponse) throws Exception {
        void a;
        EpointConfig epointConfig2 = epointConfig;
        JSONObject jSONObject = a.getCustom();
        Object a2 = jSONObject.getString("qrstatus");
        JSONObject jSONObject2 = new JSONObject();
        jSONObject2.put("qrstatus", a2);
        if (BZTQRStatusEnum.已确认.getValue().equals(a2)) {
            void a3;
            Object[] objectArray = new Object[--1];
            objectArray[3 ^ 3] = a3.getFilepath();
            D.info(String.format("%s文件开始解密。", objectArray));
            a2 = CommonUtil.handleFileDecryption(epointConfig2, (QueryResultRequest)a3, jSONObject.getJSONObject("qrinfo"));
            Object[] objectArray2 = new Object[--2];
            objectArray2[2 & 5] = a3.getFilepath();
            objectArray2[--1] = a2;
            D.info(String.format("%s文件解密后路径为：%s。", objectArray2));
            if (StringUtil.isNotBlank(a2)) {
                jSONObject2.put("orgpath", (Object)CommonUtil.ALLATORIxDEMO(a3.getFilepath()));
            }
            Object[] objectArray3 = new Object[3 & 5];
            objectArray3[5 >> 3] = a3.getFilepath();
            D.info(String.format("%s文件解密结束。", objectArray3));
        }
        Object object = a2 = new CommonResponse();
        ((CommonResponse)object).setStatus(a.getStatus());
        ((CommonResponse)object).setCustom(jSONObject2);
        return JSONObject.toJSONString(object);
    }

    private static /* synthetic */ String ALLATORIxDEMO(QRInfo a2) {
        return a2.getDecryptobjects().stream().filter(a -> StringUtil.isNotBlank(a.getOrg())).findFirst().map(QRInfo.DecryptObject::getOrg).orElseThrow(() -> new IllegalArgumentException("未找到解密密钥"));
    }

    private static /* synthetic */ String ALLATORIxDEMO(String string) {
        String string2 = string;
        int a = Math.max(string2.lastIndexOf(0x2F & 0x7F), string2.lastIndexOf(0x7D & 0x5E));
        String string3 = a >= 0 ? string2.substring(5 >> 3, a + --1) : "";
        String string4 = a >= 0 ? string2.substring(a + --1) : string2;
        a = string4.lastIndexOf(0x2F & 0x7E);
        String string5 = a != -4 >> 2 ? string4.substring(5 >> 3, a) : string4;
        String string6 = a != -4 >> 2 ? string4.substring(a) : "";
        return new StringBuilder().insert(3 & 4, string3).append(string5).append("_decrypted").append(string6).toString();
    }

    public CommonUtil() {
        CommonUtil a;
    }

    /*
     * WARNING - void declaration
     */
    public static CommonResponse validateRequest(EpQzFileServerConfig epQzFileServerConfig, JSONObject jSONObject, String string) {
        void a;
        void a2;
        EpQzFileServerConfig epQzFileServerConfig2 = epQzFileServerConfig;
        CommonResponse commonResponse = new CommonResponse();
        CommonResponse.Status a3 = new CommonResponse.Status();
        if (!CommonUtil.validateToken(epQzFileServerConfig2, a2.getString(h))) {
            CommonResponse commonResponse2 = commonResponse;
            Object object = a3;
            ((CommonResponse.Status)object).setCode(ResponseEnum.请求失败.getValue());
            ((CommonResponse.Status)object).setText("token验证失败！");
            commonResponse2.setStatus(a3);
            D.warn("{}操作token验证失败", (Object)a);
            return commonResponse2;
        }
        if (StringUtil.isBlank(a2.getString(ALLATORIxDEMO))) {
            CommonResponse commonResponse3 = commonResponse;
            Object object = a3;
            ((CommonResponse.Status)object).setCode(ResponseEnum.请求失败.getValue());
            ((CommonResponse.Status)object).setText("待解密投标文件路径为空！");
            commonResponse3.setStatus(a3);
            D.warn("{}操作文件路径为空", (Object)a);
            return commonResponse3;
        }
        return null;
    }

    /*
     * WARNING - void declaration
     */
    public static CommonResponse buildErrorResponse(ResponseEnum responseEnum, String string) {
        void a;
        Object a2;
        ResponseEnum responseEnum2 = responseEnum;
        Object object = a2 = new CommonResponse.Status();
        ((CommonResponse.Status)object).setCode(responseEnum2.getValue());
        ((CommonResponse.Status)object).setText((String)a);
        CommonResponse commonResponse = new CommonResponse();
        commonResponse.setStatus((CommonResponse.Status)a2);
        return commonResponse;
    }

    public static boolean isSuccessResponse(CommonResponse a) {
        if (a.getStatus().getCode() == ResponseEnum.请求成功.getValue().intValue()) {
            return 5 >> 2;
        }
        return false;
    }

    /*
     * WARNING - void declaration
     */
    public static String getXmlNodeContent(EpointConfig epointConfig, String string, String string2) throws Exception {
        void a;
        String a2 = string2;
        EpointConfig a3 = epointConfig;
        return XMLUtil.getXMLNodeContent(new StringBuilder().insert(2 & 5, a3.getFilepath()).append((String)a).toString(), a2);
    }

    public static String decryptFilePath(EpointConfig epointConfig, String string) throws Exception {
        String a = string;
        EpointConfig a2 = epointConfig;
        return new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(a2.getAppsecret()), Base64Util.decode(a)), "UTF-8");
    }

    public static boolean validateToken(EpQzFileServerConfig epQzFileServerConfig, String string) {
        String a = string;
        EpQzFileServerConfig a2 = epQzFileServerConfig;
        return TokenUtil.validateToken(a, a2.getAppkey(), a2.getAppsecret(), "");
    }
}


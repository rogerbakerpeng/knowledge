/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.service;

import com.alibaba.fastjson.JSONObject;
import com.epoint.configuration.EpQzFileServerConfig;
import com.epoint.configuration.EpointConfig;
import com.epoint.epqz.filedecrypt.aspect.annoation.ValidateRequest;
import com.epoint.epqz.filedecrypt.controller.FileDecryptController;
import com.epoint.epqz.filedecrypt.enums.FilePathModeEnum;
import com.epoint.epqz.filedecrypt.enums.ResponseEnum;
import com.epoint.epqz.filedecrypt.model.CommonResponse;
import com.epoint.epqz.filedecrypt.model.DecryptRequest;
import com.epoint.epqz.filedecrypt.model.QueryResultRequest;
import com.epoint.epqz.filedecrypt.util.CommonUtil;
import com.epoint.epqz.filedecrypt.util.QRUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileDecryptService {
    private static final Logger D = LoggerFactory.getLogger(FileDecryptService.class);
    @Autowired
    private EpQzFileServerConfig h;
    private static final String c = "DigitalEnvelope";
    @Autowired
    private EpointConfig ALLATORIxDEMO;

    /*
     * WARNING - void declaration
     */
    @ValidateRequest(value="查询解密结果")
    public String queryResult(QueryResultRequest queryResultRequest) {
        CommonResponse a;
        void a2;
        FileDecryptService fileDecryptService;
        block3: {
            fileDecryptService = this;
            try {
                String string = QRUtil.queryQRResult(fileDecryptService.h, a2.getQrcodeid());
                a = JSONObject.parseObject(string, CommonResponse.class);
                if (CommonUtil.isSuccessResponse(a)) break block3;
                return JSONUtils.bean2json(a);
            }
            catch (Exception exception) {
                D.error("查询结果操作失败，参数：{}", (Object)JSONUtils.bean2json(a2), (Object)exception);
                return JSONUtils.bean2json(CommonUtil.buildErrorResponse(ResponseEnum.请求失败, "查询过程发生异常"));
            }
        }
        return CommonUtil.processDecryptionResult(fileDecryptService.ALLATORIxDEMO, (QueryResultRequest)a2, a);
    }

    /*
     * WARNING - void declaration
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    @ValidateRequest(value="开始解密")
    public String decrypt(DecryptRequest decryptRequest) {
        void a;
        FileDecryptService fileDecryptService = this;
        try {
            String a2 = FilePathModeEnum.SM4加密.getValue() == a.getFilepath_mode() ? CommonUtil.decryptFilePath(fileDecryptService.ALLATORIxDEMO, a.getFilepath()) : a.getFilepath();
            String string = CommonUtil.getXmlNodeContent(fileDecryptService.ALLATORIxDEMO, a2, c);
            if (StringUtil.isBlank(string)) {
                return JSONUtils.bean2json(CommonUtil.buildErrorResponse(ResponseEnum.请求失败, "数字信封内容为空"));
            }
            return CommonUtil.processQRCodeCreation(fileDecryptService.h, string);
        }
        catch (Exception a2) {
            D.error("开始解密操作失败，参数：{}", (Object)JSONUtils.bean2json(a), (Object)a2);
            return JSONUtils.bean2json(CommonUtil.buildErrorResponse(ResponseEnum.请求失败, "解密过程发生异常"));
        }
    }

    public FileDecryptService() {
        FileDecryptService a;
    }
}


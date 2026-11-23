/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.asn1.SealGMFactory;
import com.epoint.epsignature.asn1.v4.GMSealMaker;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.CustomBaseResp;
import com.epoint.epsignature.bean.Pdf;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.annotation.PDFAnnotationReq;
import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.bean.sign.SignatureInfo;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.bean.sign.impl.ComSignsReq;
import com.epoint.epsignature.bean.sign.impl.CrossPageReq;
import com.epoint.epsignature.bean.sign.impl.KeySignReq;
import com.epoint.epsignature.bean.sign.impl.MultiPageSignReq;
import com.epoint.epsignature.enums.CallbackOperEnum;
import com.epoint.epsignature.enums.EpItextPdfVersionEnum;
import com.epoint.epsignature.enums.H5ActionsEnum;
import com.epoint.epsignature.enums.ZTBFileStorageTypeEnum;
import com.epoint.epsignature.gm.ses.v1.SES_Header;
import com.epoint.epsignature.gm.ses.v4.SESeal;
import com.epoint.epsignature.gm.ses.v4.TBS_Sign;
import com.epoint.epsignature.license.app.util.RequiresAuthorization;
import com.epoint.epsignature.service.SignService;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.EpFileServerUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PDFAnnotationUtil;
import com.epoint.epsignature.utils.PDFMergeUtil;
import com.epoint.epsignature.utils.ShanTouMergeUtil;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1GeneralizedTime;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.pdf.AcroFields;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.PdfStamper;
import com.epoint.itextpdf.text.pdf.RandomAccessFileOrArray;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Method;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.cert.Certificate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;

@RequiresAuthorization
public class H5Actions
extends BaseActions {
    private H5OutImpl outApi;
    private static final Logger logger = Logger.getLogger(H5Actions.class);
    private static final String SEALS_PREFIX = "\\|\\|\\|";
    private static final String SEALINFO_AND_DATA_PREFIX = "@@@";
    private static final String SEALINFO_PREFIX = "-";
    private static final String REQUESTCONTEXTHOLDERCLASSPATH = "org.springframework.web.context.request.RequestContextHolder";
    private static final String SERVLETREQUESTATTRIBUTESCLASSPATH = "org.springframework.web.context.request.ServletRequestAttributes";
    private static final String SERVLET_CONTEXTS_CLASS_NAME = "org.jboss.seam.web.ServletContexts";
    public static boolean ENABLEVERIFY = true;
    private static final String EPITEXTPDF_VERSION_METH_NAME = "getEpItextVersion";
    private static final String EPITEXT_VERSION_CLASSPATH = "com.epoint.itextpdf.text.Version";
    private static final boolean HAS_TMP_FILE_BYTE_RANGE_FIX = H5Actions.hasByteRangeFixSupport();
    public static boolean isPreSignValid = false;
    public static String IS_OPEN_SIGNATURE_CERT_VERIFY = "0";

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.outApi = (H5OutImpl)actionContext.get("H5OutImpl");
        if (this.outApi == null) {
            throw new RuntimeException("H5Actions \u521d\u59cb\u5316\u5931\u8d25\uff0c\u672a\u627e\u5230\u5b9e\u73b0\u7684H5OutImpl");
        }
    }

    public BaseResp getSealData(BaseReq basereq) {
        String[] seals;
        JSONObject map = (JSONObject)basereq.getRequest();
        ArrayList<Seal> list = new ArrayList<Seal>();
        String sealstr = map.getString("seal");
        for (String strseal : seals = sealstr.split(SEALS_PREFIX)) {
            Seal seal = new Seal();
            String[] sealinfo_and_data = strseal.split(SEALINFO_AND_DATA_PREFIX);
            String[] sealinfo = sealinfo_and_data[0].split(SEALINFO_PREFIX);
            seal.setSealname(sealinfo[1]);
            seal.setSealguid(sealinfo[2]);
            seal.setSealdata(sealinfo_and_data[1]);
            list.add(seal);
        }
        return this.success(JSONUtils.bean2json(list));
    }

    public BaseResp verify(BaseReq basereq) throws Exception {
        if (!ENABLEVERIFY) {
            return this.success(JSONUtils.bean2json(new ArrayList()));
        }
        Map verifymap = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), Map.class);
        String noVerifySign = (String)verifymap.get("noVerifySign");
        if ("true".equals(noVerifySign)) {
            return this.success(JSONUtils.bean2json(new ArrayList()));
        }
        VerifyReq verify = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), VerifyReq.class);
        Pdf[] batchpdf = null;
        try {
            ComSignReq bean = JSONUtils.json2bean(verify.getPdf().getMsg(), ComSignReq.class);
            if (bean != null) {
                batchpdf = bean.getBatchpdf();
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        PdfReader reader = null;
        reader = batchpdf != null && batchpdf.length > 0 ? this.initPdfReader(batchpdf[0], "", true) : this.initPdfReader(verify.getPdf(), "", true);
        if (reader == null) {
            logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01" + JSONUtils.bean2json(basereq));
            return this.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
        }
        AcroFields fields = reader.getAcroFields();
        ArrayList<String> names = fields.getSignatureNames();
        if (!names.isEmpty() && names.get(0).contains("GMSeal")) {
            RandomAccessFileOrArray src = reader.getSafeFile();
            byte[] pdfcontent = new byte[Integer.parseInt(String.valueOf(src.length()))];
            src.read(pdfcontent);
            return this.success(ShanTouMergeUtil.verifyShanTouPDF(names, pdfcontent, fields));
        }
        return this.success(PDFMergeUtil.verifyPDF(reader));
    }

    public BaseResp verifyI7(BaseReq basereq) throws Exception {
        String ISValidateZZThirdSeal;
        if (!ENABLEVERIFY) {
            return this.success(JSONUtils.bean2json(new ArrayList()));
        }
        Map verifymap = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), Map.class);
        String noVerifySign = (String)verifymap.get("noVerifySign");
        if ("true".equals(noVerifySign)) {
            return this.success(JSONUtils.bean2json(new ArrayList()));
        }
        BaseResp baseResp = this.reqDoActionOfEpointFileServer(H5ActionsEnum.\u9a8c\u7b7e, basereq, VerifyReq.class);
        if (baseResp != null) {
            return baseResp;
        }
        VerifyReq verify = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), VerifyReq.class);
        Pdf[] batchpdf = null;
        try {
            ComSignReq bean = JSONUtils.json2bean(verify.getPdf().getMsg(), ComSignReq.class);
            if (bean != null) {
                batchpdf = bean.getBatchpdf();
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        Pdf pdf = null;
        PdfReader reader = null;
        pdf = batchpdf != null && batchpdf.length > 0 ? batchpdf[0] : verify.getPdf();
        reader = this.initPdfReader(pdf, "", true);
        if (reader == null) {
            logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01" + JSONUtils.bean2json(basereq));
            return this.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
        }
        AcroFields fields = reader.getAcroFields();
        ArrayList<String> names = fields.getSignatureNames();
        if (!names.isEmpty() && names.get(0).contains("GMSeal")) {
            RandomAccessFileOrArray src = reader.getSafeFile();
            byte[] pdfcontent = new byte[Integer.parseInt(String.valueOf(src.length()))];
            src.read(pdfcontent);
            return this.success(ShanTouMergeUtil.verifyShanTouPDF(names, pdfcontent, fields));
        }
        HashMap<String, String> map = new HashMap<String, String>();
        String string = ISValidateZZThirdSeal = verifymap.containsKey("ISValidateZZThirdSeal") ? String.valueOf(verifymap.get("ISValidateZZThirdSeal")) : "";
        if (StringUtil.isNotBlank(ISValidateZZThirdSeal)) {
            map.put("ISValidateZZThirdSeal", ISValidateZZThirdSeal);
        }
        return this.success(PDFMergeUtil.verifyPDFWithMixed(reader, fields, map));
    }

    public BaseResp verifySingleSign(BaseReq basereq) throws Exception {
        PdfReader reader = null;
        Map verifymap = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), Map.class);
        String filesignname = (String)verifymap.get("fieldname");
        VerifyReq verify = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), VerifyReq.class);
        Pdf[] batchpdf = null;
        try {
            ComSignReq bean = JSONUtils.json2bean(verify.getPdf().getMsg(), ComSignReq.class);
            if (bean != null) {
                batchpdf = bean.getBatchpdf();
            }
            byte[] f = null;
            f = batchpdf != null && batchpdf.length > 0 ? this.outApi.getPDF(batchpdf[0]) : this.outApi.getPDF(verify.getPdf());
            if (f == null) {
                logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01" + JSONUtils.bean2json(basereq));
                return this.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
            }
            reader = new PdfReader(f);
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return this.success(PDFMergeUtil.verifySingleSign(reader, filesignname));
    }

    public BaseResp comSign(BaseReq basereq) throws Exception {
        BaseResp baseResp = this.reqDoActionOfEpointFileServer(H5ActionsEnum.\u7b7e\u7ae0, basereq, ComSignReq.class);
        if (baseResp != null) {
            return baseResp;
        }
        return this.doSign(JSONUtils.bean2json(basereq.getRequest()), ComSignReq.class);
    }

    public BaseResp comSigns(BaseReq basereq) throws Exception {
        return this.doSign(JSONUtils.bean2json(basereq.getRequest()), ComSignsReq.class);
    }

    public BaseResp multiPageSign(BaseReq basereq) throws Exception {
        BaseResp baseResp = this.reqDoActionOfEpointFileServer(H5ActionsEnum.\u7b7e\u7ae0, basereq, MultiPageSignReq.class);
        if (baseResp != null) {
            return baseResp;
        }
        return this.doSign(JSONUtils.bean2json(basereq.getRequest()), MultiPageSignReq.class);
    }

    public BaseResp keySign(BaseReq basereq) throws Exception {
        BaseResp baseResp = this.reqDoActionOfEpointFileServer(H5ActionsEnum.\u7b7e\u7ae0, basereq, KeySignReq.class);
        if (baseResp != null) {
            return baseResp;
        }
        return this.doSign(JSONUtils.bean2json(basereq.getRequest()), KeySignReq.class);
    }

    public BaseResp crossPageSign(BaseReq basereq) throws Exception {
        BaseResp baseResp = this.reqDoActionOfEpointFileServer(H5ActionsEnum.\u7b7e\u7ae0, basereq, CrossPageReq.class);
        if (baseResp != null) {
            return baseResp;
        }
        return this.doSign(JSONUtils.bean2json(basereq.getRequest()), CrossPageReq.class);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public BaseResp deleteSign(BaseReq basereq) throws Exception {
        ComSignReq req;
        block40: {
            BaseResp baseResp = this.reqDoActionOfEpointFileServer(H5ActionsEnum.\u5220\u9664\u7b7e\u7ae0, basereq, ComSignReq.class);
            if (baseResp != null) {
                return baseResp;
            }
            req = JSONUtils.json2bean(basereq.getRequest(), ComSignReq.class);
            Pdf[] batchpdf = null;
            try {
                ComSignReq bean = JSONUtils.json2bean(req.getPdf().getMsg(), ComSignReq.class);
                if (bean != null) {
                    batchpdf = bean.getBatchpdf();
                }
            }
            catch (Exception e) {
                logger.error(e.getMessage(), e);
            }
            PdfReader reader = null;
            try {
                reader = batchpdf != null && batchpdf.length > 0 ? this.initPdfReader(batchpdf[0], "", false) : this.initPdfReader(req.getPdf(), "", false);
                if (reader == null) {
                    throw new RuntimeException("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
                }
            }
            catch (Exception e) {
                logger.error(e.getMessage(), e);
            }
            String ywDelSignedPDFPath = this.outApi.getSignedPDFPath(req.getPdf());
            File tmpFile = null;
            if (StringUtil.isNotBlank(ywDelSignedPDFPath)) {
                tmpFile = new File(ywDelSignedPDFPath);
            } else {
                File tmpFileDir = Paths.get(System.getProperty("java.io.tmpdir"), new String[0]).toFile();
                if (!Files.isWritable(tmpFileDir.toPath())) {
                    return null;
                }
                tmpFile = File.createTempFile(UUID.randomUUID().toString(), ".tmp", tmpFileDir);
            }
            byte[] annotationPDF = null;
            try (BufferedOutputStream os = new BufferedOutputStream(new FileOutputStream(tmpFile));){
                PdfStamper pdfStamper = new PdfStamper(reader, os, '\u0000', true);
                AcroFields acroFields = pdfStamper.getAcroFields();
                if ("currentpage".equals(req.getSign().getDeleteMode())) {
                    String name = req.getSign().getPositions()[0].getName();
                    if (StringUtil.isNotBlank(name)) {
                        List signlist = JSONUtils.json2bean(name, List.class);
                        for (String signid : signlist) {
                            acroFields.clearSignatureField(signid);
                        }
                    }
                } else if ("total".equals(req.getSign().getDeleteMode())) {
                    ArrayList<String> names = acroFields.getSignatureNames();
                    for (String name : names) {
                        if (!StringUtil.isNotBlank(name)) continue;
                        acroFields.clearSignatureField(name);
                    }
                } else {
                    acroFields.clearSignatureField(req.getSign().getPositions()[0].getName());
                }
                pdfStamper.close();
                if (reader != null) {
                    reader.close();
                }
                if (tmpFile == null || !StringUtil.isNotBlank(tmpFile.getAbsolutePath()) || !tmpFile.exists()) break block40;
                if (!this.outApi.dealPDFPath(req.getPdf(), tmpFile.getAbsolutePath()) && !this.outApi.dealPDFOs(req.getPdf(), os)) {
                    annotationPDF = Files.readAllBytes(tmpFile.toPath());
                    this.outApi.dealPDF(req.getPdf(), annotationPDF);
                }
                try {
                    if (StringUtil.isBlank(ywDelSignedPDFPath) || !ywDelSignedPDFPath.equals(tmpFile.getAbsolutePath())) {
                        Files.deleteIfExists(tmpFile.toPath());
                    }
                }
                catch (IOException e) {
                    logger.error(String.format("\u4e34\u65f6\u6587\u4ef6\u5220\u9664\u5931\u8d25\uff0c\u5bf9\u5e94\u8def\u5f84\u4e3a\uff1a%s", tmpFile.toPath()));
                }
            }
            catch (Exception e) {
                logger.error(e.getMessage(), e);
            }
            finally {
                if (reader != null) {
                    reader.close();
                }
            }
        }
        HashMap<String, String> rtn = new HashMap<String, String>();
        rtn.put("name", req.getSign().getPositions()[0].getName());
        return this.success(JSONUtils.bean2json(rtn));
    }

    public BaseResp keycomSign(BaseReq basereq) throws Exception {
        String rst = "";
        JSONArray respArr = new JSONArray();
        JSONObject reqJson = JSONUtils.json2bean(basereq.getRequest(), JSONObject.class);
        JSONArray signsArr = reqJson.getJSONArray("sign");
        JSONObject pdfObj = reqJson.getJSONObject("pdf");
        JSONObject ext = reqJson.getJSONObject("ext");
        for (int i = 0; i < signsArr.size(); ++i) {
            JSONObject request = new JSONObject();
            request.put("pdf", (Object)pdfObj);
            request.put("ext", (Object)ext);
            JSONObject signinfo = signsArr.getJSONObject(i);
            JSONObject positions = signinfo.getJSONObject("positions");
            request.put("signed", (Object)signinfo.getString("signed"));
            request.put("signCert", (Object)signinfo.getString("signCert"));
            JSONObject sign = new JSONObject();
            sign.put("keyword", (Object)positions.getString("keyword"));
            sign.put("signimg", (Object)signinfo.getString("signimg"));
            request.put("sign", (Object)sign);
            String json = JSONUtils.bean2json(this.doSign(JSONObject.toJSONString(request), KeySignReq.class));
            rst = JSONObject.parseObject(json).getString("custom");
            JSONObject infoObj = JSONObject.parseObject(rst);
            respArr.add(infoObj);
        }
        return this.success(JSONUtils.bean2json(respArr));
    }

    private <T> BaseResp doSign(String params, Class<? extends SignReq> signReqClass) throws Exception {
        JSONObject jsonObject;
        String signMode;
        if (logger.isDebugEnabled()) {
            logger.debug("\u5408\u5e76\u65f6\u7684\u8bf7\u6c42\u53c2\u6570\uff1a" + params);
        }
        if (this.isImageSignMode(signMode = (jsonObject = JSONObject.parseObject(params)).getJSONObject("pdf").getString("signmode"))) {
            return this.doSignImage(params, signReqClass);
        }
        BaseResp validationResult = this.preSignValidation(params, signReqClass);
        if (validationResult != null) {
            return validationResult;
        }
        params = this.processSignImage(params, jsonObject);
        params = this.processTimestampSign(params, jsonObject);
        SignReq req = JSONUtils.json2bean(params, signReqClass);
        this.checkSignPermission(jsonObject, req.getSignCert());
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        if (this.isBatchSign(req)) {
            this.handleBatchSign(req, signReqClass, resultMap);
        } else {
            this.handleSingleSign(req, resultMap);
        }
        return this.success(JSONUtils.bean2json(resultMap));
    }

    private boolean isImageSignMode(String signMode) {
        return "11".equals(signMode) || "20".equals(signMode) || "21".equals(signMode);
    }

    private BaseResp preSignValidation(String params, Class<? extends SignReq> signReqClass) throws Exception {
        String errorMsg;
        if (this.isPreSignValidEnabled() && StringUtil.isNotBlank(errorMsg = PDFMergeUtil.PreSignValid(params, signReqClass))) {
            return this.error(errorMsg);
        }
        if (this.isRootCertValidationEnabled() && StringUtil.isNotBlank(errorMsg = PDFMergeUtil.preSignSignCertValid(params, signReqClass))) {
            return this.error(errorMsg);
        }
        return null;
    }

    private boolean isPreSignValidEnabled() {
        return isPreSignValid || "true".equals(ConfigUtil.getConfigValue("ztb", "isPreSignValid"));
    }

    private boolean isRootCertValidationEnabled() {
        return "1".equals(IS_OPEN_SIGNATURE_CERT_VERIFY) || "1".equals(ConfigUtil.getConfigValue("ztb", "IS_OPEN_SIGNATURE_CERT_VERIFY"));
    }

    private String processSignImage(String params, JSONObject jsonObject) throws Exception {
        JSONObject signObject = jsonObject.getJSONObject("sign");
        if (signObject != null && signObject.containsKey("imgwidth") && signObject.containsKey("imgheight")) {
            int imgwidth = signObject.getIntValue("imgwidth");
            int imgheight = signObject.getIntValue("imgheight");
            String oldsignimg = signObject.getString("signimg");
            String newsignimg = SignUtil.resizeImage(oldsignimg, imgwidth, imgheight);
            signObject.put("signimg", (Object)newsignimg);
            return JSONObject.toJSONString(jsonObject);
        }
        return params;
    }

    private String processTimestampSign(String params, JSONObject jsonObject) {
        String signWithTime = ConfigUtil.getConfigValue("ztb", "signWithTime");
        String isShowTime = jsonObject.getJSONObject("pdf").getString("isShowTime");
        if ("1".equals(signWithTime) || "1".equals(isShowTime)) {
            JSONObject pdfObject = jsonObject.getJSONObject("pdf");
            boolean hideMinAndSecOfSign = pdfObject.getBoolean("hideMinAndSecOfSign");
            String showSignTimeInPre = pdfObject.getString("showSignTimeInPre");
            if (!"1".equals(showSignTimeInPre)) {
                JSONObject signObject = jsonObject.getJSONObject("sign");
                String signimg = signObject.getString("signimg");
                signimg = SignUtil.getSignimgWithDate(signimg, hideMinAndSecOfSign);
                signObject.put("signimg", (Object)signimg);
                return JSONObject.toJSONString(jsonObject);
            }
        }
        return params;
    }

    private void checkSignPermission(JSONObject jsonObject, String signCert) {
        if (!this.isSignAuthorizationEnabled()) {
            return;
        }
        JSONObject authorizedInfo = this.getAuthorizationInfo(jsonObject);
        if (authorizedInfo == null) {
            return;
        }
        JSONArray allowedNames = authorizedInfo.getJSONArray("allowedName");
        if (allowedNames == null || allowedNames.isEmpty()) {
            return;
        }
        if (!this.hasSignPermission(signCert, allowedNames)) {
            throw this.createUnauthorizedException(authorizedInfo);
        }
    }

    private boolean isSignAuthorizationEnabled() {
        String isuseauthorized = ConfigUtil.getConfigValue("ztb", "isuseauthorized");
        return "1".equals(isuseauthorized);
    }

    private JSONObject getAuthorizationInfo(JSONObject jsonObject) {
        JSONObject ext = jsonObject.getJSONObject("ext");
        if (ext == null) {
            return null;
        }
        return ext.getJSONObject("authorizedInfo");
    }

    private boolean hasSignPermission(String signCert, JSONArray allowedNames) {
        String userNameString = this.extractCertSubject(signCert);
        for (int i = 0; i < allowedNames.size(); ++i) {
            String allowedName = allowedNames.getString(i);
            if (!userNameString.contains(allowedName)) continue;
            return true;
        }
        return false;
    }

    private String extractCertSubject(String signCert) {
        try {
            return CertUtils.getAllCN(CertUtils.getX509Certificate(signCert));
        }
        catch (Exception e) {
            throw new RuntimeException("\u89e3\u6790\u7b7e\u7ae0\u8bc1\u4e66\u5931\u8d25", e);
        }
    }

    private RuntimeException createUnauthorizedException(JSONObject authorizedInfo) {
        String unauthorizedMessage = authorizedInfo.getString("unauthorizedMessage");
        if (StringUtil.isBlank(unauthorizedMessage)) {
            return new RuntimeException("\u7b7e\u7ae0\u5931\u8d25:\u68c0\u6d4b\u5230\u60a8\u6b63\u5728\u4f7f\u7528\u4e0e\u672c\u5355\u4f4d\u4fe1\u606f\u4e0d\u5339\u914d\u7684CA\u8bc1\u4e66\u7b7e\u7ae0\uff0c\u6216\u60a8\u6240\u4f7f\u7528\u7684CA\u8bc1\u4e66\u7684\u6240\u5c5e\u5355\u4f4d\u65e0\u9700\u7b7e\u7f72\u6b64\u6587\u4ef6\uff0c\u8bf7\u6838\u5b9e\u76f8\u5173\u4fe1\u606f\u3002\u5982\u786e\u8ba4\u65e0\u8bef\uff0c\u60a8\u53ef\u4ee5\u91cd\u65b0\u5c1d\u8bd5\u7b7e\u7ae0\u3002");
        }
        return new RuntimeException("\u7b7e\u7ae0\u5931\u8d25:" + unauthorizedMessage);
    }

    private boolean isBatchSign(SignReq req) {
        if (req.getPdf().getMsg() == null) {
            return false;
        }
        try {
            SignReq reqBatch = (SignReq)JSONUtils.json2bean(req.getPdf().getMsg(), req.getClass());
            return reqBatch != null && reqBatch.getBatchpdf() != null && reqBatch.getBatchpdf().length > 0;
        }
        catch (Exception e) {
            logger.error("\u89e3\u6790\u6279\u91cf\u7b7e\u7ae0\u4fe1\u606f\u5931\u8d25\uff1a" + req.getPdf().getMsg(), e);
            return false;
        }
    }

    private void handleBatchSign(SignReq req, Class<? extends SignReq> signReqClass, Map<String, Object> resultMap) throws Exception {
        SignReq reqBatch = JSONUtils.json2bean(req.getPdf().getMsg(), signReqClass);
        List signatureObjects = JSONUtils.json2bean(req.getSigned(), List.class);
        for (int i = 0; i < reqBatch.getBatchpdf().length; ++i) {
            SignService service = this.initSignService(reqBatch.getBatchpdf()[i], req.getPassword(), true);
            if (service == null) {
                logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff1a" + JSONUtils.bean2json(req));
                throw new Exception("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6");
            }
            QRInfo.SignatureObject signatureObj = this.getSignatureObject(signatureObjects, i);
            if (signatureObj == null) continue;
            this.processSigning(service, req, signatureObj);
            this.collectSignInfo(service, resultMap);
            service.close();
            this.outApi.dealSignInfo(reqBatch.getBatchpdf()[i], JSONUtils.bean2json(resultMap));
            req.preaseresult = null;
        }
    }

    private void handleSingleSign(SignReq req, Map<String, Object> resultMap) throws Exception {
        List<SignatureInfo> signVerify;
        SignService service = this.initSignService(req.getPdf(), req.getPassword(), true);
        if (service == null) {
            logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff1a" + JSONUtils.bean2json(req));
            throw new Exception("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6");
        }
        QRInfo.SignatureObject signatureObj = new QRInfo.SignatureObject();
        signatureObj.setSigned(req.getSigned());
        this.processSigning(service, req, signatureObj);
        this.collectSignInfo(service, resultMap);
        service.close();
        String signInfo = "";
        if (resultMap.containsKey("verify")) {
            signInfo = JSONUtils.bean2json(resultMap);
        }
        if ((signVerify = service.getSignVerify()).isEmpty()) {
            this.outApi.dealSignInfo(req.getPdf(), "");
        } else {
            this.outApi.dealSignInfo(req.getPdf(), signInfo);
        }
    }

    private QRInfo.SignatureObject getSignatureObject(List<QRInfo.SignatureObject> signatureObjects, int index) {
        if (index < signatureObjects.size()) {
            return JSONUtils.json2bean(JSONUtils.bean2json(signatureObjects.get(index)), QRInfo.SignatureObject.class);
        }
        return null;
    }

    private void processSigning(SignService service, SignReq req, QRInfo.SignatureObject signatureObj) throws Exception {
        if (HAS_TMP_FILE_BYTE_RANGE_FIX) {
            this.processWithTempFile(service, req, signatureObj);
        } else {
            this.processWithMemory(service, req, signatureObj);
        }
    }

    private void processWithTempFile(SignService service, SignReq req, QRInfo.SignatureObject signatureObj) throws Exception {
        String customPath = this.outApi.getSignedPDFPath(req.getPdf());
        String signedPDFPath = service.doMergeTmpFile(customPath, req, Base64Util.decode(req.getSignCert()), Base64Util.decode(signatureObj.getSigned()), req.getExt());
        if (StringUtil.isNotBlank(signedPDFPath)) {
            this.handleSignedFile(req, customPath, signedPDFPath);
        } else {
            this.processWithMemory(service, req, signatureObj);
        }
    }

    private void processWithMemory(SignService service, SignReq req, QRInfo.SignatureObject signatureObj) throws Exception {
        try (ByteArrayOutputStream signedPDF = service.doMergeOs(req, Base64Util.decode(req.getSignCert()), Base64Util.decode(signatureObj.getSigned()), req.getExt());){
            if (!this.outApi.dealPDFOs(req.getPdf(), signedPDF)) {
                this.outApi.dealPDF(req.getPdf(), signedPDF.toByteArray());
            }
        }
    }

    private void handleSignedFile(SignReq req, String customPath, String signedFilePath) throws IOException {
        File signedFile = new File(signedFilePath);
        if (signedFile.exists()) {
            if (!this.outApi.dealPDFPath(req.getPdf(), signedFilePath)) {
                this.outApi.dealPDF(req.getPdf(), Files.readAllBytes(signedFile.toPath()));
            }
            this.cleanTempFile(signedFilePath, customPath);
        }
    }

    private void cleanTempFile(String filePath, String customPath) {
        if (!filePath.equals(customPath)) {
            try {
                Files.deleteIfExists(Paths.get(filePath, new String[0]));
            }
            catch (IOException e) {
                logger.error("\u4e34\u65f6\u6587\u4ef6\u5220\u9664\u5931\u8d25\uff1a" + filePath, e);
            }
        }
    }

    private void collectSignInfo(SignService service, Map<String, Object> resultMap) throws Exception {
        List<SignatureInfo> signVerify = service.getSignVerify();
        resultMap.put("verify", signVerify);
    }

    public BaseResp degist(BaseReq basereq) throws Exception {
        BaseResp baseResp = this.reqDoActionOfEpointFileServer(H5ActionsEnum.\u8ba1\u7b97\u6458\u8981, basereq, ComSignReq.class);
        if (baseResp != null) {
            return baseResp;
        }
        SignService service = null;
        SignReq req = JSONUtils.json2bean(basereq.getRequest(), ComSignReq.class);
        ArrayList<QRInfo.SignatureObject> ls = new ArrayList<QRInfo.SignatureObject>();
        SignReq reqbatch = JSONUtils.json2bean(req.getPdf().getMsg(), ComSignReq.class);
        if (reqbatch != null && reqbatch.getBatchpdf() != null && reqbatch.getBatchpdf().length > 0) {
            for (int i = 0; i < reqbatch.getBatchpdf().length; ++i) {
                req.setPdf(reqbatch.getBatchpdf()[i]);
                service = this.initSignService(req.getPdf(), req.getPassword(), false);
                if (service == null) {
                    logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01" + JSONUtils.bean2json(basereq));
                    return this.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
                }
                ls.add(new QRInfo.SignatureObject("", Base64Util.encode(service.getDegist()), null, "batch"));
            }
        } else {
            service = this.initSignService(req.getPdf(), req.getPassword(), false);
            if (service == null) {
                logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01" + JSONUtils.bean2json(basereq));
                return this.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
            }
            ls.add(new QRInfo.SignatureObject("", Base64Util.encode(service.getDegist()), null, null));
        }
        if (service != null) {
            service.close();
        }
        return this.success(JSONUtils.bean2json(ls));
    }

    public BaseResp degistGMV4(BaseReq basereq) throws Exception {
        BaseResp baseResp = this.reqDoActionOfEpointFileServer(H5ActionsEnum.\u8ba1\u7b97\u6458\u8981, basereq, ComSignReq.class);
        if (baseResp != null) {
            return baseResp;
        }
        JSONObject reqJSON = JSONObject.parseObject(basereq.getRequest().toString());
        ArrayList<QRInfo.SignatureObject> ls = new ArrayList<QRInfo.SignatureObject>();
        SignService service = null;
        if (StringUtil.isNotBlank(reqJSON.getString("isdeletesign"))) {
            ls.add(new QRInfo.SignatureObject("", Base64Util.encode(String.valueOf(new Date().getTime())), null, null));
            return this.success(JSONUtils.bean2json(ls));
        }
        SignReq req = JSONUtils.json2bean(basereq.getRequest(), ComSignReq.class);
        SignReq reqbatch = JSONUtils.json2bean(req.getPdf().getMsg(), ComSignReq.class);
        if (reqbatch != null && reqbatch.getBatchpdf() != null && reqbatch.getBatchpdf().length > 0) {
            for (int i = 0; i < reqbatch.getBatchpdf().length; ++i) {
                req.setPdf(reqbatch.getBatchpdf()[i]);
                service = this.initSignService(req.getPdf(), req.getPassword(), false);
                if (service == null) {
                    logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01" + JSONUtils.bean2json(basereq));
                    return this.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
                }
                ls.add(new QRInfo.SignatureObject("", Base64Util.encode(service.getDegist()), null, "batch"));
            }
        } else {
            byte[] hash = null;
            byte[] pdfb = null;
            String pdfpath = this.outApi.getPDFPath(req.getPdf());
            if (StringUtil.isBlank(pdfpath)) {
                pdfb = this.outApi.getPDF(req.getPdf());
                if (pdfb == null) {
                    logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01" + JSONUtils.bean2json(basereq));
                    throw new RuntimeException("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
                }
                hash = SignUtil.degist(pdfb, "SM3");
            } else {
                hash = SignUtil.degistByStream(pdfpath, "SM3");
            }
            SealGMFactory sealfactory = new SealGMFactory(new GMSealMaker());
            Certificate[] certlist = new Certificate[1];
            String signcert = StringUtil.isNotBlank(req.getSignCert()) ? req.getSignCert() : Base64Util.encode(new GMSealMaker().getCertificate().getEncoded());
            certlist[0] = CertUtils.getX509Certificate(Base64Util.decode(signcert));
            String base64 = JSONObject.parseObject(basereq.getRequest().toString()).getJSONObject("sign").getString("signimg");
            SESeal seal = null;
            try {
                seal = sealfactory.makeSeal(UUID.randomUUID().toString(), 1, "\u6cd5\u4eba\u7ae0", "GIF", Base64Util.decode(base64), certlist, 12);
            }
            catch (Exception e) {
                logger.error(e.getMessage(), e);
            }
            TBS_Sign toSign = new TBS_Sign().setVersion(SES_Header.V4).setEseal(seal).setTimeInfo(new ASN1GeneralizedTime(new Date(), Locale.CHINA)).setDataHash(hash).setPropertyInfo("{}");
            ls.add(new QRInfo.SignatureObject("", Base64Util.encode(toSign.getEncoded("DER")), null, null));
        }
        if (service != null) {
            service.close();
        }
        return this.success(JSONUtils.bean2json(ls));
    }

    public BaseResp addAnnotation(BaseReq basereq) throws Exception {
        return this.handleAnnotation(basereq, 1);
    }

    public BaseResp removeAnnotation(BaseReq basereq) throws Exception {
        return this.handleAnnotation(basereq, 2);
    }

    public BaseResp updateAnnotation(BaseReq basereq) throws Exception {
        return this.handleAnnotation(basereq, 3);
    }

    public BaseResp getAnnotationInfo(BaseReq basereq) throws Exception {
        if (!ENABLEVERIFY) {
            return this.success(JSONUtils.bean2json(new ArrayList()));
        }
        BaseResp baseResp = this.reqDoActionOfEpointFileServer(H5ActionsEnum.\u83b7\u53d6\u6ce8\u91ca, basereq, PDFAnnotationReq.class);
        if (baseResp != null) {
            return baseResp;
        }
        PDFAnnotationReq pdfannotationreq = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), PDFAnnotationReq.class);
        Pdf[] batchpdf = null;
        try {
            ComSignReq bean = JSONUtils.json2bean(pdfannotationreq.getPdf().getMsg(), ComSignReq.class);
            if (bean != null) {
                batchpdf = bean.getBatchpdf();
            }
        }
        catch (Exception e) {
            logger.error("\u8bf7\u6c42\u53c2\u6570msg:" + pdfannotationreq.getPdf().getMsg(), e);
        }
        PdfReader reader = null;
        reader = batchpdf != null && batchpdf.length > 0 ? this.initPdfReader(batchpdf[0], "", true) : this.initPdfReader(pdfannotationreq.getPdf(), "", true);
        if (reader == null) {
            logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01" + JSONUtils.bean2json(basereq));
            return this.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
        }
        List<PDFAnnotationReq> data = PDFAnnotationUtil.getAnnotationInfo(reader);
        reader.close();
        return this.success(JSONUtils.bean2json(data));
    }

    public BaseResp handleAnnotation(BaseReq basereq, int annotation_type) throws Exception {
        PDFAnnotationReq pdfannotationreq = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), PDFAnnotationReq.class);
        Pdf[] batchpdf = null;
        try {
            ComSignReq bean = JSONUtils.json2bean(pdfannotationreq.getPdf().getMsg(), ComSignReq.class);
            if (bean != null) {
                batchpdf = bean.getBatchpdf();
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        PdfReader reader = null;
        reader = batchpdf != null && batchpdf.length > 0 ? this.initPdfReader(batchpdf[0], "", false) : this.initPdfReader(pdfannotationreq.getPdf(), "", false);
        if (reader == null) {
            return this.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
        }
        pdfannotationreq.setTitle("\u6279\u6ce8");
        byte[] annotationPDF = null;
        switch (annotation_type) {
            case 1: {
                annotationPDF = PDFAnnotationUtil.addAnnotation(reader, pdfannotationreq.getPosition(), pdfannotationreq.getTitle(), pdfannotationreq.getContent(), pdfannotationreq.getId(), pdfannotationreq.getAuthor());
                break;
            }
            case 2: {
                annotationPDF = PDFAnnotationUtil.removeAnnotation(reader, pdfannotationreq.getPosition().getPage(), pdfannotationreq.getId());
                break;
            }
            case 3: {
                annotationPDF = PDFAnnotationUtil.updateAnnotation(reader, pdfannotationreq.getPosition().getPage(), pdfannotationreq.getId(), pdfannotationreq.getContent());
                break;
            }
        }
        this.outApi.dealPDF(pdfannotationreq.getPdf(), annotationPDF);
        HashMap<String, String> rtn = new HashMap<String, String>();
        rtn.put("pdf", Base64Util.encode(annotationPDF));
        return this.success(JSONUtils.bean2json(rtn));
    }

    private <T> BaseResp doSignImage(String params, Class<? extends SignReq> signReqClass) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(params);
        String signMode = jsonObject.getJSONObject("pdf").getString("signmode");
        SignReq req = JSONUtils.json2bean(params, signReqClass);
        if (this.isBatchSign(req)) {
            return this.handleBatchImageSign(req, signReqClass, signMode);
        }
        return this.handleSingleImageSign(req, signMode);
    }

    private <T> BaseResp handleBatchImageSign(SignReq req, Class<? extends SignReq> signReqClass, String signMode) throws Exception {
        SignReq reqBatch = JSONUtils.json2bean(req.getPdf().getMsg(), signReqClass);
        if (reqBatch == null || reqBatch.getBatchpdf() == null || reqBatch.getBatchpdf().length == 0) {
            logger.warn("\u65e0\u6548\u7684\u6279\u91cf\u7b7e\u7ae0\u8bf7\u6c42\uff1a" + req.getPdf().getMsg());
            return this.error("\u65e0\u6548\u7684\u6279\u91cf\u7b7e\u7ae0\u8bf7\u6c42");
        }
        String signInfo = "";
        for (int i = 0; i < reqBatch.getBatchpdf().length; ++i) {
            Pdf pdf = reqBatch.getBatchpdf()[i];
            PdfReader pdfReader = this.getPdfReader(pdf);
            if (pdfReader == null) {
                return this.handlePdfNotFound(pdf);
            }
            List<SignInfo> signList = this.parseSignatures(req, pdfReader);
            this.processImageMerge(pdfReader, signList, pdf, signMode);
            Map<String, Object> signInfoMap = this.parseSignInfo(signList);
            String currentSignInfo = JSONUtils.bean2json(signInfoMap);
            if (i == 0) {
                signInfo = currentSignInfo;
            }
            this.outApi.dealSignInfo(pdf, currentSignInfo);
        }
        return this.success(signInfo);
    }

    private BaseResp handleSingleImageSign(SignReq req, String signMode) throws Exception {
        Pdf pdf = req.getPdf();
        PdfReader pdfReader = this.getPdfReader(pdf);
        if (pdfReader == null) {
            return this.handlePdfNotFound(pdf);
        }
        List<SignInfo> signList = this.parseSignatures(req, pdfReader);
        this.processImageMerge(pdfReader, signList, pdf, signMode);
        Map<String, Object> signInfoMap = this.parseSignInfo(signList);
        String signInfo = JSONUtils.bean2json(signInfoMap);
        this.outApi.dealSignInfo(pdf, signInfo);
        return this.success(signInfo);
    }

    private PdfReader getPdfReader(Pdf pdf) throws IOException {
        String pdfPath = this.outApi.getPDFPath(pdf);
        if (StringUtil.isNotBlank(pdfPath)) {
            return new PdfReader(pdfPath);
        }
        byte[] pdfBytes = this.outApi.getPDF(pdf);
        if (pdfBytes != null) {
            return new PdfReader(pdfBytes);
        }
        return null;
    }

    private BaseResp handlePdfNotFound(Pdf pdf) {
        logger.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff1a" + JSONUtils.bean2json(pdf));
        return this.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01");
    }

    private List<SignInfo> parseSignatures(SignReq req, PdfReader pdfReader) throws Exception {
        req.setReader(pdfReader);
        SignReq.PreaseResult result = req.parseSigns();
        return result.getSignList();
    }

    private void processImageMerge(PdfReader pdfReader, List<SignInfo> signList, Pdf pdf, String signMode) throws Exception {
        String outputPath;
        String signedPdfPath = this.outApi.getSignedPDFPath(pdf);
        if (StringUtil.isNotBlank(signedPdfPath) && StringUtil.isNotBlank(outputPath = PDFMergeUtil.imageMergeByTmpfile(pdfReader, signedPdfPath, signList))) {
            this.handleSignedPdfFile(pdf, outputPath, signMode);
            return;
        }
        ByteArrayOutputStream signedPDF = PDFMergeUtil.imageMergeOs(pdfReader, signList);
        this.handleSignedPdfStream(pdf, signedPDF, signMode);
        signedPDF.close();
    }

    private void handleSignedPdfFile(Pdf pdf, String filePath, String signMode) throws IOException {
        File signedFile = new File(filePath);
        if (signedFile.exists()) {
            if ("20".equals(signMode)) {
                return;
            }
            if (!this.outApi.dealPDFPath(pdf, filePath)) {
                this.outApi.dealPDF(pdf, Files.readAllBytes(signedFile.toPath()));
            }
        }
    }

    private void handleSignedPdfStream(Pdf pdf, ByteArrayOutputStream signedPDF, String signMode) throws IOException {
        if ("20".equals(signMode)) {
            return;
        }
        if (!this.outApi.dealPDFOs(pdf, signedPDF)) {
            this.outApi.dealPDF(pdf, signedPDF.toByteArray());
        }
    }

    public BaseResp initLicense(BaseReq basereq) throws Exception {
        String logoImageSrc;
        String isshowbfjg;
        String needpwdcheck;
        HashMap<String, String> rtn = new HashMap<String, String>();
        rtn.put("initLicense", "initLicense");
        String needfacecheck = ConfigUtil.getConfigValue("ztb", "needfacecheck");
        if (StringUtil.isNotBlank(needfacecheck)) {
            rtn.put("needfacecheck", needfacecheck);
        }
        if (StringUtil.isNotBlank(needpwdcheck = ConfigUtil.getConfigValue("ztb", "needpwdcheck"))) {
            rtn.put("needpwdcheck", needpwdcheck);
        }
        if (StringUtil.isNotBlank(isshowbfjg = ConfigUtil.getConfigValue("ztb", "isshowbfjg"))) {
            rtn.put("isshowbfjg", isshowbfjg);
        }
        if (StringUtil.isNotBlank(logoImageSrc = ConfigUtil.getConfigValue("ztb", "logoImageSrc"))) {
            rtn.put("logoImageSrc", logoImageSrc);
        }
        return this.success(JSONUtils.bean2json(rtn));
    }

    private Map<String, Object> parseSignInfo(List<SignInfo> signlist) {
        HashMap<String, Object> rtn = new HashMap<String, Object>();
        ArrayList<SignatureInfo> signinfoList = new ArrayList<SignatureInfo>();
        for (SignInfo var : signlist) {
            SignatureInfo signatureinfo = new SignatureInfo();
            signatureinfo.setSignid(var.getName());
            signatureinfo.setPos(new SignatureInfo.Postion(var.getPage(), var.getX(), var.getY()));
            signatureinfo.setSignImg(var.getImgbase64());
            signatureinfo.setIsIntegrity(true);
            signatureinfo.setPage(var.getPage());
            signatureinfo.setCert(new SignatureInfo.Cert());
            signatureinfo.setSigndate(new Date().getTime());
            signatureinfo.setLocation("SIGN_LOCATION");
            signatureinfo.setReason("SIGN_REASON");
            signatureinfo.setSignature("");
            signinfoList.add(signatureinfo);
        }
        rtn.put("verify", signinfoList);
        return rtn;
    }

    private SignService initSignService(Pdf pdf, String password, boolean isNeedPdfReader) throws Exception {
        SignService service = null;
        byte[] pdfb = null;
        String pdfpath = this.outApi.getPDFPath(pdf);
        if (StringUtil.isNotBlank(pdfpath)) {
            try {
                service = StringUtil.isNotBlank(password) ? new SignService(pdfpath, password, isNeedPdfReader) : new SignService(pdfpath, isNeedPdfReader);
                if (service != null) {
                    return service;
                }
            }
            catch (Exception e) {
                logger.error("\u6839\u636e\u6587\u4ef6\u8def\u5f84\u83b7\u53d6\u6587\u4ef6\u5931\u8d25\uff01" + e.getMessage());
            }
        }
        if ((pdfb = this.outApi.getPDF(pdf)) == null) {
            return null;
        }
        service = StringUtil.isNotBlank(password) ? new SignService(pdfb, password, isNeedPdfReader) : new SignService(pdfb, isNeedPdfReader);
        return service;
    }

    private PdfReader initPdfReader(Pdf pdf, String password, boolean partial) throws Exception {
        PdfReader reader = null;
        byte[] pdfb = null;
        String pdfpath = this.outApi.getPDFPath(pdf);
        if (StringUtil.isNotBlank(pdfpath)) {
            try {
                if (StringUtil.isNotBlank(password)) {
                    reader = partial ? new PdfReader(pdfpath, password.getBytes(), true) : new PdfReader(pdfpath, password.getBytes());
                } else {
                    PdfReader pdfReader = reader = partial ? new PdfReader(pdfpath, null, true) : new PdfReader(pdfpath);
                }
                if (reader != null) {
                    return reader;
                }
            }
            catch (Exception e) {
                logger.error("\u6839\u636e\u6587\u4ef6\u8def\u5f84\u83b7\u53d6\u6587\u4ef6\u5931\u8d25\uff01" + e.getMessage());
            }
        }
        if ((pdfb = this.outApi.getPDF(pdf)) == null) {
            return null;
        }
        reader = StringUtil.isNotBlank(password) ? new PdfReader(pdfb, password.getBytes()) : new PdfReader(pdfb);
        return reader;
    }

    public BaseResp getCookie(BaseReq basereq) throws Exception {
        Cookie[] cookies;
        HttpServletRequest request = null;
        HashMap<String, String> rtn = new HashMap<String, String>();
        try {
            Class<?> RequestContextHolderClass = Class.forName(REQUESTCONTEXTHOLDERCLASSPATH);
            Method getRequestAttributes = RequestContextHolderClass.getDeclaredMethod("getRequestAttributes", new Class[0]);
            Object requestAttributes = getRequestAttributes.invoke(null, new Object[0]);
            Class<?> ServletAttributeClass = Class.forName(SERVLETREQUESTATTRIBUTESCLASSPATH);
            if (requestAttributes != null && SERVLETREQUESTATTRIBUTESCLASSPATH.equals(requestAttributes.getClass().getName())) {
                Method getRequestMethod = ServletAttributeClass.getMethod("getRequest", new Class[0]);
                request = (HttpServletRequest)getRequestMethod.invoke(requestAttributes, new Object[0]);
            } else {
                request = this.getHttpServletRequestFromSeam();
            }
        }
        catch (ClassNotFoundException e) {
            logger.error("getCookie", e);
            request = this.getHttpServletRequestFromSeam();
        }
        catch (Exception e) {
            logger.error("getCookie", e);
        }
        if (request != null && (cookies = request.getCookies()) != null) {
            String cookieString = Arrays.stream(cookies).map(cookie -> cookie.getName() + "=" + cookie.getValue()).collect(Collectors.joining(";"));
            rtn.put("cookie", cookieString);
        }
        return this.success(JSONUtils.bean2json(rtn));
    }

    private HttpServletRequest getHttpServletRequestFromSeam() {
        Object getRequestObj = null;
        try {
            Class<?> ServletContextClass = Class.forName(SERVLET_CONTEXTS_CLASS_NAME);
            Method getCurrentInstanceMethod = ServletContextClass.getMethod("instance", new Class[0]);
            Object servletContext = getCurrentInstanceMethod.invoke(null, new Object[0]);
            Method getRequestMethod = ServletContextClass.getMethod("getRequest", new Class[0]);
            getRequestObj = getRequestMethod.invoke(servletContext, new Object[0]);
        }
        catch (Exception e) {
            logger.error("getHttpServletRequestFromSeam", e);
        }
        return getRequestObj != null ? (HttpServletRequest)getRequestObj : null;
    }

    public BaseResp addHighlightAnnotationInfo(BaseReq basereq) throws Exception {
        PDFHighlightAnnotationReq pdfannotationreq = JSONUtils.json2bean(JSONUtils.bean2json(basereq.getRequest()), PDFHighlightAnnotationReq.class);
        PdfReader reader = this.initPdfReader(pdfannotationreq.getPdf(), "", false);
        if (reader == null) {
            return this.error("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01" + JSONUtils.bean2json(basereq));
        }
        String annoationID = "EPHIGH_" + UUID.randomUUID().toString();
        ByteArrayOutputStream annotationPDF = PDFAnnotationUtil.addHeightLightAnnoation(reader, pdfannotationreq.getPosition(), annoationID, false);
        this.outApi.dealPDF(pdfannotationreq.getPdf(), annotationPDF.toByteArray());
        HashMap<String, String> rtn = new HashMap<String, String>();
        rtn.put("id", annoationID);
        return this.success(JSONUtils.bean2json(rtn));
    }

    private BaseResp reqDoActionOfEpointFileServer(H5ActionsEnum h5ActionsEnum, BaseReq baseReq, Class<?> type) throws Exception {
        BaseReq changeBasereq;
        CustomBaseResp customBaseResp;
        BaseResp baseResp = null;
        RequestInfo requestInfo = this.getRequestInfo(h5ActionsEnum.getVal(), baseReq, type);
        if (requestInfo != null && (customBaseResp = this.doActionOfEpFileServer(changeBasereq = this.changeBaseReq(requestInfo, baseReq), requestInfo.epFileServerUrl)) != null) {
            RequestInfo requestInfoResp = this.resolveRequest(h5ActionsEnum.getVal(), baseReq, type);
            baseResp = this.ywCallbackOperate(requestInfoResp.singlePdf, customBaseResp);
        }
        return baseResp;
    }

    private RequestInfo getRequestInfo(String h5ActionsType, BaseReq baseReq, Class<?> type) {
        RequestInfo requestInfo = null;
        try {
            String epFileServerUrl;
            requestInfo = this.resolveRequest(h5ActionsType, baseReq, type);
            this.processPdfMsgInfo(requestInfo, h5ActionsType);
            JSONObject configJSONObj = this.getConfigJSONObj(requestInfo);
            if (configJSONObj == null) {
                return null;
            }
            String fileStorageType = configJSONObj.containsKey("filestoragetype") ? configJSONObj.getString("filestoragetype") : "";
            String string = epFileServerUrl = configJSONObj.containsKey("epfileserverurl") ? configJSONObj.getString("epfileserverurl") : "";
            if (StringUtil.isBlank(fileStorageType) || StringUtil.isBlank(epFileServerUrl)) {
                return null;
            }
            if (!ZTBFileStorageTypeEnum.\u65b0\u70b9\u6587\u4ef6\u670d\u52a1\u5668.getVal().equals(fileStorageType)) {
                return null;
            }
            requestInfo.epFileServerUrl = epFileServerUrl;
            this.processPdfResources(requestInfo, h5ActionsType);
        }
        catch (Exception e) {
            logger.error(String.format("\u5bf9\u8bf7\u6c42\u4f53\u8fdb\u884c\u5904\u7406\u56de\u8c03\u4e1a\u52a1\u53c2\u6570\u8fdb\u884c\u585e\u5165\u5931\u8d25: %s", e.getMessage()), e);
        }
        return requestInfo;
    }

    private JSONObject getConfigJSONObj(RequestInfo requestInfo) {
        JSONObject msgObj;
        JSONObject configJSONObj = null;
        if (requestInfo != null && requestInfo.singlePdf != null && StringUtil.isNotBlank(requestInfo.singlePdf.getMsg()) && StringUtil.isNotBlank((msgObj = JSONObject.parseObject(requestInfo.singlePdf.getMsg())).getString("config"))) {
            configJSONObj = JSONObject.parseObject(msgObj.getString("config"));
        }
        return configJSONObj;
    }

    private BaseReq changeBaseReq(RequestInfo requestInfo, BaseReq baseReq) {
        try {
            this.updateBaseRequest(baseReq, requestInfo);
        }
        catch (Exception e) {
            logger.error(String.format("\u6839\u636eH5\u7b7e\u7ae0\u63a7\u4ef6\u5185\u90e8\u64cd\u4f5c\u7c7b\u578b\u8fdb\u884c\u8bf7\u6c42\u4f53\u8f6c\u6362\u5931\u8d25: %s", e.getMessage()), e);
        }
        return baseReq;
    }

    private void updateBaseRequest(BaseReq baseReq, RequestInfo requestInfo) {
        try {
            if (requestInfo.processedRequest != null) {
                String updatedJson = JSONUtils.bean2json(requestInfo.processedRequest);
                baseReq.setRequest(JSONUtils.json2bean(updatedJson, Object.class));
            }
        }
        catch (Exception e) {
            logger.error(String.format("\u56de\u5199\u8bf7\u6c42\u5bf9\u8c61\u5931\u8d25: %s", e.getMessage()), e);
        }
    }

    private RequestInfo resolveRequest(String actionType, BaseReq baseReq, Class<?> type) throws Exception {
        RequestInfo result = new RequestInfo();
        if (H5ActionsEnum.\u9a8c\u7b7e.getVal().equals(actionType)) {
            VerifyReq verifyReq = (VerifyReq)this.parseRequest(baseReq, type);
            result.processedRequest = verifyReq;
            result.batchPdfs = this.tryGetBatchPdfsFromMessage(verifyReq.getPdf());
            result.singlePdf = verifyReq.getPdf();
        } else if (H5ActionsEnum.\u83b7\u53d6\u6ce8\u91ca.getVal().equals(actionType)) {
            PDFAnnotationReq pdfAnnotationReq = (PDFAnnotationReq)this.parseRequest(baseReq, type);
            result.processedRequest = pdfAnnotationReq;
            result.batchPdfs = this.tryGetBatchPdfsFromMessage(pdfAnnotationReq.getPdf());
            result.singlePdf = pdfAnnotationReq.getPdf();
        } else {
            SignReq signReq = (SignReq)this.parseRequest(baseReq, type);
            if (signReq != null) {
                result.processedRequest = signReq;
                result.batchPdfs = signReq.getBatchpdf();
                result.singlePdf = signReq.getPdf();
            }
        }
        return result;
    }

    private void processPdfMsgInfo(RequestInfo requestInfo, String h5ActionsType) {
        if (requestInfo.batchPdfs != null && requestInfo.batchPdfs.length > 0) {
            Arrays.stream(requestInfo.batchPdfs).filter(Objects::nonNull).forEach(pdf -> this.updatePdfMsgInfo((Pdf)pdf, h5ActionsType));
        } else if (requestInfo.singlePdf != null) {
            this.updatePdfMsgInfo(requestInfo.singlePdf, h5ActionsType);
        }
    }

    private void processPdfResources(RequestInfo requestInfo, String h5ActionsType) {
        if (requestInfo.batchPdfs != null && requestInfo.batchPdfs.length > 0) {
            Arrays.stream(requestInfo.batchPdfs).filter(Objects::nonNull).forEach(pdf -> this.updatePdfSource((Pdf)pdf, h5ActionsType));
        } else if (requestInfo.singlePdf != null) {
            this.updatePdfSource(requestInfo.singlePdf, h5ActionsType);
        }
    }

    private void updatePdfMsgInfo(Pdf pdf, String h5ActionsType) {
        if (pdf == null) {
            return;
        }
        try {
            String msginfo = this.outApi.getMsgInfo(pdf);
            if (StringUtil.isNotBlank(msginfo)) {
                pdf.setMsg(msginfo);
            }
        }
        catch (Exception e) {
            logger.error(String.format("\u66f4\u65b0PDF\u989d\u5916\u8282\u70b9\u4fe1\u606f\u5931\u8d25: %s", e.getMessage()), e);
        }
    }

    private void updatePdfSource(Pdf pdf, String h5ActionsType) {
        if (pdf == null) {
            return;
        }
        try {
            String signedPDFPath;
            String path = this.outApi.getPDFPath(pdf);
            if (StringUtil.isNotBlank(path)) {
                pdf.setSrc(path);
            }
            if ((H5ActionsEnum.\u7b7e\u7ae0.getVal().equals(h5ActionsType) || H5ActionsEnum.\u5220\u9664\u7b7e\u7ae0.getVal().equals(h5ActionsType)) && StringUtil.isNotBlank(signedPDFPath = this.outApi.getSignedPDFPath(pdf))) {
                pdf.setDest(signedPDFPath);
            }
        }
        catch (Exception e) {
            logger.error(String.format("\u66f4\u65b0PDF\u8def\u5f84\u5931\u8d25: %s", e.getMessage()), e);
        }
    }

    private Pdf[] tryGetBatchPdfsFromMessage(Pdf pdf) {
        if (pdf == null || StringUtil.isBlank(pdf.getMsg())) {
            return null;
        }
        try {
            ComSignReq comSignReq = JSONUtils.json2bean(pdf.getMsg(), ComSignReq.class);
            return comSignReq != null ? comSignReq.getBatchpdf() : null;
        }
        catch (Exception e) {
            logger.error(String.format("\u8bf7\u6c42\u4f53\u8f6c\u6362\u5931\u8d25: %s", e.getMessage()), e);
            return null;
        }
    }

    private <T> T parseRequest(BaseReq baseReq, Class<T> type) throws Exception {
        return JSONUtils.json2bean(JSONUtils.bean2json(baseReq.getRequest()), type);
    }

    private CustomBaseResp doActionOfEpFileServer(BaseReq changeBasereq, String epFileServerUrl) {
        CustomBaseResp customBaseResp = null;
        try {
            String baseResStr;
            if (StringUtil.isNotBlank(epFileServerUrl) && StringUtil.isNotBlank(baseResStr = EpFileServerUtil.doAction(epFileServerUrl, JSONUtils.bean2json(changeBasereq)))) {
                return JSONUtils.json2bean(baseResStr, CustomBaseResp.class);
            }
        }
        catch (Exception e) {
            logger.error(String.format("\u6587\u4ef6\u670d\u52a1\u5668doAction\u8c03\u7528\u5931\u8d25:%s", e.getMessage()), e);
        }
        return customBaseResp;
    }

    private BaseResp ywCallbackOperate(Pdf pdf, CustomBaseResp customBaseResp) {
        CustomBaseResp baseResp = null;
        try {
            if (customBaseResp != null && StringUtil.isNotBlank(customBaseResp.getExt())) {
                JSONArray extJsonArray = JSONUtils.json2bean(customBaseResp.getExt(), JSONArray.class);
                for (Object extObj : extJsonArray) {
                    JSONObject extJsonObj = JSONUtils.json2bean(extObj, JSONObject.class);
                    CallbackOperEnum callbackOperEnum = CallbackOperEnum.getByValue(extJsonObj.getString("method"));
                    if (callbackOperEnum == null) continue;
                    Class<?> clazz = Class.forName("com.epoint.epsignature.actions.H5OutImpl");
                    Method targetMethod = clazz.getMethod(callbackOperEnum.getVal(), Pdf.class, String.class);
                    targetMethod.invoke(this.outApi, pdf, extJsonObj.getString("params"));
                }
                baseResp = customBaseResp;
            }
        }
        catch (Exception e) {
            logger.error(String.format("PDF\u64cd\u4f5c\u4e1a\u52a1\u56de\u8c03\u8c03\u7528\u5931\u8d25:%s", e.getMessage()), e);
        }
        return baseResp;
    }

    private static boolean hasByteRangeFixSupport() {
        boolean hasByteRangeFixSupport = false;
        try {
            Method[] actionMethods;
            Class<?> clazz = Class.forName(EPITEXT_VERSION_CLASSPATH);
            for (Method method : actionMethods = clazz.getMethods()) {
                Object instance;
                String versionStr;
                if (!EPITEXTPDF_VERSION_METH_NAME.equals(method.getName()) || !StringUtil.isNotBlank(versionStr = (String)method.invoke(instance = clazz.getDeclaredConstructor(new Class[0]).newInstance(new Object[0]), new Object[0])) || !EpItextPdfVersionEnum.sp1\u4fee\u8ba2\u7248\u672c.getVal().equals(versionStr)) continue;
                hasByteRangeFixSupport = true;
                break;
            }
        }
        catch (Exception e) {
            logger.error(String.format("EpItextPDF jar\u5305\u4e3a\u8001\u7248\u672c:%s", e.getMessage()), e);
        }
        return hasByteRangeFixSupport;
    }

    static {
        PdfReader.unethicalreading = true;
    }

    private static class RequestInfo {
        Pdf[] batchPdfs;
        Pdf singlePdf;
        String epFileServerUrl;
        Object processedRequest;

        private RequestInfo() {
        }
    }
}


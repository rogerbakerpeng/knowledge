/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.api;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.H5OutImpl;
import com.epoint.epsignature.actions.OFDOutImpl;
import com.epoint.epsignature.actions.PadImpl;
import com.epoint.epsignature.actions.impl.H5Actions;
import com.epoint.epsignature.actions.impl.ServerSealActions;
import com.epoint.epsignature.api.OutImplAPI;
import com.epoint.epsignature.api.PDFImgImpl;
import com.epoint.epsignature.asn1.SealGMFactory;
import com.epoint.epsignature.asn1.v4.GMSealMaker;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.CertInfo;
import com.epoint.epsignature.bean.Pdf;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.Version;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.bean.annotation.ToBeHighlightBlock;
import com.epoint.epsignature.bean.sign.MatchItem;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.bean.sign.SignatureInfo;
import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.bean.sign.impl.KeyFindUtil;
import com.epoint.epsignature.dzyyzz.service.DZYYZZService;
import com.epoint.epsignature.enums.LicenseEnum;
import com.epoint.epsignature.gm.ses.v1.SES_Header;
import com.epoint.epsignature.gm.ses.v4.SESeal;
import com.epoint.epsignature.gm.ses.v4.TBS_Sign;
import com.epoint.epsignature.license.app.entity.AuthResult;
import com.epoint.epsignature.license.app.entity.LicenseEntity;
import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;
import com.epoint.epsignature.license.app.service.LicenseService;
import com.epoint.epsignature.license.app.strategy.LicenseDataForOtherStrategy;
import com.epoint.epsignature.license.app.util.AuthorizationUtil;
import com.epoint.epsignature.license.app.util.PackageScanner;
import com.epoint.epsignature.license.app.util.RequiresAuthorization;
import com.epoint.epsignature.pdfsignatureinfo.factory.PdfVerifyStrategyFactory;
import com.epoint.epsignature.pdfsignatureinfo.strategy.PdfVerifyStrategy;
import com.epoint.epsignature.service.HNBXCAService;
import com.epoint.epsignature.service.MCertService;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.GMUtil;
import com.epoint.epsignature.utils.ImageMergeUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PDFAnnotationUtil;
import com.epoint.epsignature.utils.PDFMergeUtil;
import com.epoint.epsignature.utils.PdfValidator;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.SM3Util;
import com.epoint.gmhelper.SM4Util;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Encodable;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1GeneralizedTime;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1InputStream;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERTaggedObject;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.itextpdf.text.Image;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.AcroFields;
import com.epoint.itextpdf.text.pdf.PdfArray;
import com.epoint.itextpdf.text.pdf.PdfContentByte;
import com.epoint.itextpdf.text.pdf.PdfDictionary;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.PdfStamper;
import com.epoint.itextpdf.text.pdf.PdfString;
import com.epoint.itextpdf.text.pdf.parser.PdfTextExtractor;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.security.MessageDigest;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.UUID;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;

public class EpSignatureApi {
    private static Logger log = Logger.getLogger(EpSignatureApi.class);
    private static String _mcertUrl;
    private static MCertService _mcertservice;
    private static HNBXCAService _hnbxcaservice;
    private static String[] OPERTYPE;
    private static Map<String, Object> actionContext;
    public static final String BZT_LOG_SIGN = "\u3010\u6807\u8bc1\u901a\u7ec4\u4ef6\u3011";
    private static String EPSIGNATURE_VERSION;
    private static String PDFJS_VERSION;
    private static final String VERSION_SOURCE_PATH = "/revision.txt";
    private static final String WHITE_ACTION_PACKAGE = "com.epoint.epsignature.actions.impl";
    private static List<PackageScanner.ClassMethods> WHITE_ACTION_LIST;

    public static void setH5OutApi(H5OutImpl outApi) {
        actionContext.put("H5OutImpl", outApi);
    }

    public static void setOFDOutApi(OFDOutImpl ofdOutImpl) {
        actionContext.put("OFDOutImpl", ofdOutImpl);
    }

    public static void setPadApi(PadImpl padImpl) {
        actionContext.put("PadImpl", padImpl);
    }

    public static void setIsEnableVerify(boolean isEnableVerify) {
        H5Actions.ENABLEVERIFY = isEnableVerify;
    }

    public static void setPlatFormConfig(String platformcode, String tokenSecret) {
        _mcertservice.setPlatConfig(platformcode, tokenSecret);
        actionContext.put("platformcode", platformcode);
        actionContext.put("tokenSecret", tokenSecret);
    }

    public static void setCloudPlatFormConfig(String platformcode, String tokenSecret) {
        actionContext.put("cloudplatformcode", platformcode);
        actionContext.put("cloudtokenSecret", tokenSecret);
    }

    public static void setHNBXCAConfig(String appid, String appKey, String BXServerUrl) {
        _hnbxcaservice.setPlatConfig(appid, appKey, BXServerUrl);
    }

    public static void setMcertUrl(String mcertUrl) {
        _mcertservice.setMcertUrl(mcertUrl);
    }

    public static void setHuaWeiPostUrl(String posturl) {
        actionContext.put("posturl", posturl);
        _mcertservice.setHuaweiUrl(posturl);
    }

    public static void setDZHTPostUrl(String posturl) {
        _mcertservice.setDzhtUrl(posturl);
    }

    public static void setIsIgnoreSSL(boolean isIgnoreSSL) {
        _mcertservice.setIgnoreSSL(isIgnoreSSL);
    }

    public static void setGuangXiCAConfig(String appid, String appsecret, String host) {
        actionContext.put("appid", appid);
        actionContext.put("appsecret", appsecret);
        actionContext.put("host", host);
    }

    public static void setCommonServerSealConfig(String qzcloudurl, String qzcloudappsecret, String qzcloudplatformcode) {
        actionContext.put("qzcloudurl", qzcloudurl);
        actionContext.put("qzcloudappsecret", qzcloudappsecret);
        actionContext.put("qzcloudplatformcode", qzcloudplatformcode);
    }

    public static void setHuaCeCAConfig(String authCode, String hchost) {
        actionContext.put("authCode", authCode);
        actionContext.put("hchost", hchost);
    }

    public static void setShanTouConfig(String passId, String passToken, String sturl) {
        actionContext.put("passId", passId);
        actionContext.put("passToken", passToken);
        actionContext.put("sturl", sturl);
    }

    public static void setAnXunConfig(String api_key, String api_secret, String AnXunUrl) {
        actionContext.put("api_key", api_key);
        actionContext.put("api_secret", api_secret);
        actionContext.put("AnXunUrl", AnXunUrl);
    }

    public static void setSHDZYYZZConfig(String url, String key) {
        actionContext.put("SHDZYYZZUrl", url);
        actionContext.put("SHDZYYZZKey", key);
    }

    public static void setIsPreSignSignCertValid(String isPreSignSignCertValid) {
        H5Actions.IS_OPEN_SIGNATURE_CERT_VERIFY = isPreSignSignCertValid;
    }

    public static void setIsPreSignValid(boolean isPreSignValid) {
        H5Actions.isPreSignValid = isPreSignValid;
    }

    public static Map<String, Object> getActionContext() {
        return actionContext;
    }

    public EpSignatureApi(String mcerturl, String platformcode, OutImplAPI api) {
        EpSignatureApi.setMcertUrl(mcerturl);
        EpSignatureApi.setH5OutApi(api);
        EpSignatureApi.setPlatFormConfig(platformcode, "");
        _mcertservice.setTokenMaker(api);
    }

    public static String pdfVerify(byte[] pdf) throws Exception {
        return PDFMergeUtil.verifyPDF(new PdfReader(pdf));
    }

    @RequiresAuthorization
    public static String getPdfVerifyInfo(String pdfPath) throws Exception {
        String res = "";
        try {
            PdfReader pdfReader = new PdfReader(pdfPath);
            res = PDFMergeUtil.verifyPDFWithMixed(pdfReader);
        }
        catch (Exception e) {
            log.error(String.format("pdfVerify \u672a\u77e5\u9519\u8bef, \u6587\u4ef6\u8def\u5f84\uff1a%s", pdfPath), e);
            return "";
        }
        return res;
    }

    @RequiresAuthorization
    public static String getPdfVerifyInfo(FileInputStream pdfIfFileInputStream) throws Exception {
        String res = "";
        try {
            PdfReader pdfReader = new PdfReader(pdfIfFileInputStream);
            res = PDFMergeUtil.verifyPDFWithMixed(pdfReader);
        }
        catch (Exception e) {
            log.error(String.format("pdfVerify \u672a\u77e5\u9519\u8bef", new Object[0]), e);
            return "";
        }
        return res;
    }

    @RequiresAuthorization
    public static String pdfVerify(InputStream in, String pdftype) throws Exception {
        return EpSignatureApi.pdfVerifyInternal(in, pdftype, false);
    }

    @RequiresAuthorization
    public static String pdfVerify(String pdfPath, String pdftype) throws Exception {
        return EpSignatureApi.pdfVerifyInternal(pdfPath, pdftype, true);
    }

    private static String pdfVerifyInternal(Object pdfInput, String pdftype, boolean isPath) throws Exception {
        String respStr = "";
        if (StringUtil.isNotBlank(pdftype)) {
            if (!PdfVerifyStrategyFactory.containsStrategy(pdftype)) {
                throw new IllegalArgumentException("\u4e0d\u652f\u6301\u7684PDF\u7c7b\u578b: " + pdftype);
            }
            PdfVerifyStrategy strategy = PdfVerifyStrategyFactory.getStrategy(pdftype);
            PdfReader reader = null;
            reader = isPath ? new PdfReader((String)pdfInput) : new PdfReader((InputStream)pdfInput);
            respStr = strategy.verify(reader);
        }
        return respStr;
    }

    public static String pdfDeigst(byte[] pdf) throws Exception {
        return Base64Util.encode(PDFMergeUtil.degist4PDFSign(pdf, "SM3"));
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static byte[] WXMerge(byte[] pdf, List<String> signinfos) throws Exception {
        byte[] os = null;
        int origin_length = pdf.length;
        PdfReader reader = new PdfReader(pdf);
        for (String var : signinfos) {
            try {
                SealInfo info = JSONUtils.json2bean(var, SealInfo.class);
                HashMap<String, SignatureInfo> data = new HashMap<String, SignatureInfo>();
                for (SignatureInfo info_ : info.getVerify()) {
                    SignatureInfo infoout = null;
                    if (!StringUtil.isNotBlank(info_.getRef_id())) {
                        data.put(info_.getSignid(), info_);
                        infoout = info_;
                    } else {
                        SignatureInfo commondata = (SignatureInfo)data.get(info_.getRef_id());
                        if (commondata == null) {
                            for (SignatureInfo infoin : info.verify) {
                                if (!infoin.getSignid().equals(info_.getRef_id())) continue;
                                data.put(infoin.getSignid(), infoin);
                                break;
                            }
                        }
                        infoout = (SignatureInfo)data.get(info_.getRef_id());
                        infoout.setPage(info_.getPage());
                        infoout.getPos().setPage(info_.getPage());
                        infoout.setSignid(info_.getSignid());
                    }
                    info_ = infoout;
                    if (StringUtil.isNotBlank(info_.getSignature()) && info_.getCert() != null && StringUtil.isNotBlank(info_.getCert().getBase64Cert())) {
                        try {
                            os = PDFMergeUtil.origin_Sign(reader, infoout, origin_length, infoout.getExt());
                        }
                        catch (Exception e) {
                            log.error("\u65e0\u5e8f\u5408\u5e76\u5931\u8d25\uff1a", e);
                        }
                    } else {
                        ByteArrayOutputStream osin = new ByteArrayOutputStream();
                        PdfStamper stamper = new PdfStamper(reader, osin, '\u0000', true);
                        try {
                            Image image = Image.getInstance(Base64Util.decode(info_.getSignImg()));
                            int page = info_.getPage();
                            PdfContentByte under = stamper.getOverContent(page);
                            float width = image.getWidth();
                            float height = image.getHeight();
                            Rectangle rect = SignReq.fixRect(info_.getPos().getX(), info_.getPos().getY(), width, height, page, reader);
                            image.setAbsolutePosition(rect.getLeft(), rect.getBottom());
                            image.scaleAbsolute(width * 0.83f, height * 0.83f);
                            under.addImage(image);
                        }
                        finally {
                            stamper.close();
                            reader.close();
                        }
                        os = osin.toByteArray();
                        osin.close();
                    }
                    reader = new PdfReader(os);
                }
            }
            catch (Exception e) {
                log.error("\u7b7e\u7ae0\u5408\u5e76\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f:" + e.getMessage() + ";\u5408\u5e76\u8bf7\u6c42\u53c2\u6570\uff1a" + var, e);
                throw new RuntimeException(e);
            }
        }
        return os;
    }

    public static CertInfo parseCert(String certBase64) throws Exception {
        return CertUtils.parseCert(certBase64);
    }

    public static String EpDataVerify(String org, String signCert, String sd) {
        try {
            if (GMUtil.verify(Base64Util.decode(org), Base64Util.decode(signCert), Base64Util.decode(sd))) {
                return "0";
            }
            if (SignUtil.verifySign(Base64Util.decode(org), Base64Util.decode(sd), Base64Util.decode(signCert))) {
                return "0";
            }
            if (new DZYYZZService().verifySign(signCert, org, sd)) {
                return "0";
            }
            if (EpSignatureApi.verifySign(org, signCert, sd)) {
                return "0";
            }
        }
        catch (Exception e) {
            log.error("EpDataVerify \u672a\u77e5\u9519\u8bef", e);
            return "1";
        }
        return "1";
    }

    public String doAction(String params) throws Exception {
        return EpSignatureApi.doActionStatic(params);
    }

    private static void authCheck(String className, String methodName) {
        if (!PackageScanner.containsClassAndMethod(WHITE_ACTION_LIST, className, methodName)) {
            throw new UnauthorizedAccessException(String.format("className[%s];methodName[%s] \u672a\u627e\u5230\u6216\u65e0\u6743\u8bbf\u95ee", className, methodName));
        }
    }

    public static String doActionStatic(String params) throws Exception {
        BaseResp resp;
        if (log.isDebugEnabled()) {
            log.debug("doActionStatic\u8bf7\u6c42\uff1a" + params);
        }
        HashMap map_license = new HashMap();
        try {
            BaseReq basereq = JSONUtils.json2bean(params, BaseReq.class);
            String action = basereq.getAction();
            String[] a = action.split("\\.");
            String className = "com.epoint.epsignature.actions.impl." + a[0];
            String func = a[1];
            EpSignatureApi.authCheck(className, func);
            Class<?> actionClass = Class.forName(className);
            Object actionimpl = actionClass.newInstance();
            BaseActions baseaction = (BaseActions)actionimpl;
            baseaction.init(actionContext);
            Method method = EpSignatureApi.getMethodByName(func, actionClass);
            if (method == null) {
                throw new RuntimeException("\u672a\u627e\u5230action\u65b9\u6cd5");
            }
            AuthResult authResult = AuthorizationUtil.checkMethod(actionClass, method);
            if (authResult != null && LicenseEnum.LicenseResultEnum.\u5931\u8d25.getVal().equals(authResult.getLicenseResult())) {
                HashMap<String, AuthResult> map_resp_ = new HashMap<String, AuthResult>();
                map_resp_.put("license", authResult);
                return JSONUtils.bean2json(map_resp_);
            }
            Object resp2 = method.invoke(baseaction, basereq);
            Map map_resp = JSONUtils.json2bean(JSONUtils.bean2json(resp2), Map.class);
            map_resp.put("license", authResult);
            map_resp.put("version", EpSignatureApi.getVesion());
            String respstr = JSONUtils.bean2json(map_resp);
            if (log.isDebugEnabled()) {
                log.debug("doActionStatic\u54cd\u5e94\uff1a" + respstr);
            }
            return respstr;
        }
        catch (JSONException ex) {
            log.error("\u6570\u636ejson\u8f6c\u6362\u5f02\u5e38", ex);
            resp = BaseResp.returnError(9999, "\u6570\u636ejson\u8f6c\u6362\u5f02\u5e38\uff0c\u5177\u4f53\u62a5\u9519\u8bf7\u67e5\u770b\u65e5\u5fd7\uff01");
        }
        catch (UnauthorizedAccessException e) {
            log.error("\u8bbf\u95ee\u6743\u9650\u9a8c\u8bc1\u5931\u8d25", e);
            resp = BaseResp.returnError(9999, "\u8bbf\u95ee\u6743\u9650\u9a8c\u8bc1\u5931\u8d25\uff0c\u5177\u4f53\u62a5\u9519\u8bf7\u67e5\u770b\u65e5\u5fd7\uff01");
        }
        catch (Exception e) {
            log.error(String.format("doActionStatic \u672a\u77e5\u9519\u8bef\uff0c\u9519\u8bef\u4fe1\u606f:%s\uff0c\u8bf7\u6c42\u53c2\u6570params\uff1a%s", e.getCause() != null ? e.getCause().getMessage() : e.getMessage(), params));
            resp = e.getCause() != null ? BaseResp.returnError(9999, e.getCause().getMessage()) : BaseResp.returnError(9999, e.getMessage());
        }
        Map map_resp = JSONUtils.json2bean(JSONUtils.bean2json(resp), Map.class);
        map_resp.put("license", map_license);
        return JSONUtils.bean2json(map_resp);
    }

    private static Method getMethodByName(String name, Class clazz) {
        Method[] actionMethods;
        for (Method var : actionMethods = clazz.getMethods()) {
            if (!var.getName().equals(name)) continue;
            return var;
        }
        return null;
    }

    public static String applyCloudCert(String userid, String username, String idcard, String extparam) {
        ServerSealActions action = new ServerSealActions();
        try {
            action.init(actionContext);
        }
        catch (Exception e) {
            log.error("applyCloudCert \u672a\u77e5\u9519\u8bef", e);
        }
        return action.applyCloudCert(userid, username, idcard, extparam);
    }

    public static String destoryCloudCert(String userid) {
        ServerSealActions action = new ServerSealActions();
        try {
            action.init(actionContext);
        }
        catch (Exception e) {
            log.error("destoryCloudCert \u672a\u77e5\u9519\u8bef", e);
        }
        return action.destoryCloudCert(userid);
    }

    public static String saveLedgerData(String userid, String hash) {
        ServerSealActions action = new ServerSealActions();
        try {
            action.init(actionContext);
        }
        catch (Exception e) {
            log.error("saveLedgerData \u672a\u77e5\u9519\u8bef", e);
        }
        return action.saveLedgerData(userid, hash);
    }

    public static String queryLedgerData(String userid, String signaData, String hash, String tx_hash) {
        ServerSealActions action = new ServerSealActions();
        try {
            action.init(actionContext);
        }
        catch (Exception e) {
            log.error("queryLedgerData \u672a\u77e5\u9519\u8bef", e);
        }
        return action.queryLedgerData(userid, signaData, hash, tx_hash);
    }

    public static String verifySign(String org, String cert, String signed, String loginid) {
        try {
            if (StringUtil.isBlank(org) || StringUtil.isBlank(cert) || StringUtil.isBlank(signed)) {
                return "";
            }
            X509Certificate signcert = SM2CertUtil.getX509Certificate(Base64Util.decode(cert));
            String oid = signcert.getSigAlgOID();
            boolean str = false;
            if (oid.startsWith("1.2.156.10197.1")) {
                str = GMUtil.verify(Base64Util.decode(org), Base64Util.decode(cert), Base64Util.decode(signed));
            } else if (oid.startsWith("1.2.840.113549.1.1")) {
                str = SignUtil.verifySign(Base64Util.decode(org), Base64Util.decode(signed), Base64Util.decode(cert));
            }
            if (!str) {
                org = Base64Util.encode(org);
                if (oid.startsWith("1.2.156.10197.1")) {
                    str = GMUtil.verify(Base64Util.decode(org), Base64Util.decode(cert), Base64Util.decode(signed));
                } else if (oid.startsWith("1.2.840.113549.1.1")) {
                    str = SignUtil.verifySign(Base64Util.decode(org), Base64Util.decode(signed), Base64Util.decode(cert));
                }
            }
            if (str) {
                try {
                    String dognum = SM2CertUtil.getSerialNumber(Base64Util.decode(cert));
                    byte[] hash = SM3Util.hash(dognum.getBytes("UTF-8"));
                    byte[] key = new byte[16];
                    System.arraycopy(hash, 0, key, 0, 16);
                    byte[] dec = SM4Util.decrypt_Ecb_Padding(key, Base64Util.decode(loginid));
                    return new String(dec, "UTF-8");
                }
                catch (Exception e) {
                    log.error("loginid \u89e3\u5bc6\u5931\u8d25", e);
                    return "";
                }
            }
        }
        catch (Exception e) {
            log.error("verifySign_loginid \u672a\u77e5\u9519\u8bef", e);
        }
        return "";
    }

    public static boolean verifySign(String org, String cert, String signed) {
        boolean str = false;
        try {
            str = EpSignatureApi.verifySignIn(org, cert, signed);
            if (!str) {
                str = PdfValidator.adjustSignedAndVerify(signed, org, cert);
            }
            if (!str) {
                str = PdfValidator.parseP7SignedAndVerify(org, cert, signed);
            }
        }
        catch (Exception e) {
            log.error("verifySign \u672a\u77e5\u9519\u8bef", e);
        }
        return str;
    }

    private static Map<String, Object> licenseCheck() {
        HashMap<String, Object> mapinfo = new HashMap<String, Object>();
        try {
            LicenseService service = new LicenseService(new LicenseDataForOtherStrategy());
            service.loadLicense();
            LicenseEntity licenseEntity = service.getLicenseEntity();
            if (StringUtil.isNotBlank(licenseEntity)) {
                String[] licenseinfo = new String(licenseEntity.getSourceData(), "UTF-8").split("@");
                mapinfo.put("licenseResult", "sucess");
                mapinfo.put("licenseName", licenseinfo[0]);
                mapinfo.put("platformcode", licenseinfo[1]);
                mapinfo.put("licdesc", licenseinfo[2]);
                mapinfo.put("softwareName", licenseinfo[3]);
                mapinfo.put("softwareId", licenseinfo[4]);
                if (licenseinfo.length >= 6) {
                    mapinfo.put("liclevel", licenseinfo[5]);
                }
                if (licenseinfo.length >= 7) {
                    mapinfo.put("showmode", licenseinfo[6]);
                }
                return mapinfo;
            }
        }
        catch (Exception e) {
            log.error("licenseCheck \u672a\u77e5\u9519\u8bef", e);
            mapinfo.put("licenseResult", "error");
            mapinfo.put("licenseError", "\u63a7\u4ef6\u6fc0\u6d3b\u5931\u8d25");
        }
        return mapinfo;
    }

    public static byte[] CommonMerge(byte[] pdf, List<String> signinfos, String pdftype) throws Exception {
        byte[] os = null;
        try {
            os = ImageMergeUtil.CommonMerge(pdf, signinfos, pdftype);
        }
        catch (Exception e) {
            log.error("CommonMerge \u672a\u77e5\u9519\u8bef", e);
        }
        return os;
    }

    public static String getVesion() {
        Version version = new Version();
        String epsignatureversion = "";
        if (StringUtil.isBlank(EPSIGNATURE_VERSION)) {
            InputStream in = null;
            try {
                in = EpSignatureApi.class.getResourceAsStream(VERSION_SOURCE_PATH);
                Properties p = new Properties();
                p.load(in);
                epsignatureversion = p.getProperty("version");
                if (epsignatureversion.contains("-SNAPSHOT")) {
                    epsignatureversion = epsignatureversion.replace("-SNAPSHOT", "");
                }
                EPSIGNATURE_VERSION = epsignatureversion + "." + p.getProperty("epsignaturesvnversion");
                PDFJS_VERSION = epsignatureversion + "." + p.getProperty("pdfjssvnversion");
            }
            catch (IOException e) {
                e.printStackTrace();
            }
        }
        version.setEpsignatureversion(EPSIGNATURE_VERSION);
        version.setPdfjsversion(PDFJS_VERSION);
        return JSONUtils.bean2json(version);
    }

    public static String pdfSignInfo(final byte[] pdfb, String signimg, String signed, String signcert, String keyword) throws Exception {
        String rst = "";
        H5Actions actions = new H5Actions();
        HashMap<String, Object> actionKeyContext = new HashMap<String, Object>();
        OutImplAPI outKeyApi = new OutImplAPI(){

            @Override
            public String getSealImg(String request) {
                return null;
            }

            @Override
            public byte[] getPDF(Pdf pdf) {
                return pdfb;
            }

            @Override
            public void dealSignInfo(Pdf pdf, String signinfo) {
            }

            @Override
            public void dealPDF(Pdf pdf, byte[] file) {
            }

            @Override
            public String getPDFPath(Pdf pdf) {
                return null;
            }

            @Override
            public boolean dealPDFOs(Pdf pdf, OutputStream file) {
                return false;
            }
        };
        actionKeyContext.put("H5OutImpl", outKeyApi);
        actions.init(actionKeyContext);
        JSONObject params = new JSONObject();
        JSONObject request = new JSONObject();
        JSONObject pdf = new JSONObject();
        JSONObject ext = new JSONObject();
        JSONObject sign = new JSONObject();
        params.put("action", (Object)"keySign");
        pdf.put("type", (Object)"file");
        pdf.put("src", (Object)"");
        pdf.put("signmode", (Object)"7");
        pdf.put("msg", (Object)"");
        pdf.put("mergemode", (Object)"2");
        request.put("pdf", (Object)pdf);
        request.put("signed", (Object)signed);
        request.put("signCert", (Object)signcert);
        ext.put("signMode", (Object)"7");
        request.put("ext", (Object)ext);
        sign.put("keyword", (Object)keyword);
        sign.put("signimg", (Object)signimg);
        request.put("sign", (Object)sign);
        params.put("request", (Object)request);
        BaseReq baseReq = JSONUtils.json2bean(params, BaseReq.class);
        String json = JSONUtils.bean2json(actions.keySign(baseReq));
        rst = JSONObject.parseObject(json).getString("custom");
        return rst;
    }

    public static String getEpsignatureVersion() {
        return EPSIGNATURE_VERSION;
    }

    public static String getPdfjsVersion() {
        return PDFJS_VERSION;
    }

    public static String pdfSignInfoByPos(final byte[] pdfb, String signimg, String signed, String signcert, List<ComSignReq.Position> pos) throws Exception {
        String rst = "";
        H5Actions actions = new H5Actions();
        HashMap<String, Object> actionKeyContext = new HashMap<String, Object>();
        OutImplAPI outKeyApi = new OutImplAPI(){

            @Override
            public String getSealImg(String request) {
                return null;
            }

            @Override
            public byte[] getPDF(Pdf pdf) {
                return pdfb;
            }

            @Override
            public void dealSignInfo(Pdf pdf, String signinfo) {
            }

            @Override
            public void dealPDF(Pdf pdf, byte[] file) {
            }

            @Override
            public String getPDFPath(Pdf pdf) {
                return null;
            }

            @Override
            public boolean dealPDFOs(Pdf pdf, OutputStream file) {
                return false;
            }
        };
        actionKeyContext.put("H5OutImpl", outKeyApi);
        actions.init(actionKeyContext);
        JSONObject params = new JSONObject();
        JSONObject request = new JSONObject();
        JSONObject pdf = new JSONObject();
        JSONObject ext = new JSONObject();
        JSONObject sign = new JSONObject();
        params.put("action", (Object)"comSign");
        pdf.put("type", (Object)"file");
        pdf.put("src", (Object)"");
        pdf.put("signmode", (Object)"7");
        pdf.put("msg", (Object)"");
        pdf.put("mergemode", (Object)"2");
        request.put("pdf", (Object)pdf);
        request.put("signed", (Object)signed);
        request.put("signCert", (Object)signcert);
        ext.put("signMode", (Object)"7");
        request.put("ext", (Object)ext);
        sign.put("positions", (Object)pos);
        sign.put("signimg", (Object)signimg);
        request.put("sign", (Object)sign);
        params.put("request", (Object)request);
        BaseReq baseReq = JSONUtils.json2bean(params, BaseReq.class);
        String json = JSONUtils.bean2json(actions.comSign(baseReq));
        rst = JSONObject.parseObject(json).getString("custom");
        return rst;
    }

    public static byte[] pdfAndImgMergeByKeyword(byte[] pdfb, String signimg, String keyword) throws Exception {
        Object fileb = null;
        String rst = "";
        H5Actions actions = new H5Actions();
        HashMap<String, Object> actionKeyContext = new HashMap<String, Object>();
        PDFImgImpl outKeyApi = new PDFImgImpl(pdfb);
        actionKeyContext.put("H5OutImpl", outKeyApi);
        actions.init(actionKeyContext);
        JSONObject params = new JSONObject();
        JSONObject request = new JSONObject();
        JSONObject pdf = new JSONObject();
        JSONObject ext = new JSONObject();
        JSONObject sign = new JSONObject();
        params.put("action", (Object)"keySign");
        pdf.put("type", (Object)"file");
        pdf.put("src", (Object)"");
        pdf.put("signmode", (Object)"11");
        pdf.put("msg", (Object)"");
        pdf.put("mergemode", (Object)"2");
        request.put("pdf", (Object)pdf);
        ext.put("signMode", (Object)"11");
        request.put("ext", (Object)ext);
        sign.put("keyword", (Object)keyword);
        sign.put("signimg", (Object)signimg);
        request.put("sign", (Object)sign);
        params.put("request", (Object)request);
        BaseReq baseReq = JSONUtils.json2bean(params, BaseReq.class);
        String json = JSONUtils.bean2json(actions.keySign(baseReq));
        rst = JSONObject.parseObject(json).getString("custom");
        return outKeyApi.getPdfn();
    }

    public static String degistGMV4(byte[] pdfb, String signCert, String imgBase64) throws Exception {
        SealGMFactory sealfactory = new SealGMFactory(new GMSealMaker());
        if (pdfb == null) {
            throw new RuntimeException("\u672a\u83b7\u53d6\u5230PDF\u6587\u4ef6\uff01\uff01");
        }
        Certificate[] certlist = new Certificate[1];
        String signcert = StringUtil.isNotBlank(signCert) ? signCert : Base64Util.encode(new GMSealMaker().getCertificate().getEncoded());
        certlist[0] = CertUtils.getX509Certificate(Base64Util.decode(signcert));
        SESeal seal = null;
        try {
            seal = sealfactory.makeSeal(UUID.randomUUID().toString(), 1, "\u6cd5\u4eba\u7ae0", "GIF", Base64Util.decode(imgBase64), certlist, 12);
        }
        catch (Exception e) {
            log.error("degistGMV4 \u5236\u7ae0\u5931\u8d25", e);
        }
        MessageDigest messageDigest = MessageDigest.getInstance("SM3");
        messageDigest.update(pdfb);
        byte[] hash = messageDigest.digest();
        TBS_Sign toSign = new TBS_Sign().setVersion(SES_Header.V4).setEseal(seal).setTimeInfo(new ASN1GeneralizedTime(new Date(), Locale.CHINA)).setDataHash(hash).setPropertyInfo("{}");
        QRInfo.SignatureObject signaObj = new QRInfo.SignatureObject("", Base64Util.encode(toSign.getEncoded("DER")), null, null);
        String signaStr = JSONUtils.bean2json(signaObj);
        JSONObject signaJson = JSONObject.parseObject(signaStr);
        return signaJson.getString("org");
    }

    public static boolean verifySignIn(String org, String cert, String signed) {
        boolean str = false;
        try {
            byte[] debase64_org = Base64Util.decode(org);
            byte[] deutf8_org = org.getBytes("UTF-8");
            byte[] deutf8_gbk_org = org.getBytes("GBK");
            byte[] debase64_cert = Base64Util.decode(cert);
            byte[] debase64_signed = Base64Util.decode(signed);
            X509Certificate signcert = SM2CertUtil.getX509Certificate(debase64_cert);
            String oid = signcert.getSigAlgOID();
            if (oid.startsWith("1.2.156.10197.1")) {
                str = GMUtil.verify(debase64_org, debase64_cert, debase64_signed) || GMUtil.verify(deutf8_org, debase64_cert, debase64_signed) || GMUtil.verify(SM3Util.hash(deutf8_org), debase64_cert, debase64_signed) || GMUtil.verify(deutf8_gbk_org, debase64_cert, debase64_signed) || GMUtil.verify(SM3Util.hash(deutf8_gbk_org), debase64_cert, debase64_signed);
            } else if (oid.startsWith("1.2.840.113549.1.1")) {
                str = SignUtil.verifySign(debase64_org, debase64_signed, debase64_cert) || SignUtil.verifySign(deutf8_org, debase64_signed, debase64_cert);
            } else {
                log.info("\u3010EpSignature_verifySign\u3011\u4e0d\u652f\u6301\u7684\u8bc1\u4e66\u7c7b\u578b\uff1a" + oid);
            }
        }
        catch (Exception e) {
            log.error("verifySignIn \u672a\u77e5\u9519\u8bef", e);
        }
        return str;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static int getPdfSealCount(String filePath) {
        AuthorizationUtil.checkStatic();
        int sealCount = 0;
        try (PdfReader reader = null;){
            reader = new PdfReader(filePath);
            sealCount = PDFMergeUtil.getPdfSealCount(reader);
        }
        return sealCount;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static int getPdfSealCount(FileInputStream fileInputStream) {
        AuthorizationUtil.checkStatic();
        int sealCount = 0;
        try (PdfReader reader = null;){
            reader = new PdfReader(fileInputStream);
            sealCount = PDFMergeUtil.getPdfSealCount(reader);
        }
        return sealCount;
    }

    @RequiresAuthorization
    public static String getKeyWordPositions(PdfReader pdfReader, List<String> keywordLst) {
        try {
            JSONObject obj = new JSONObject();
            JSONArray arr = new JSONArray();
            int pageNum = pdfReader.getNumberOfPages();
            for (int index = 1; index <= pageNum; ++index) {
                Map<String, List<MatchItem>> itemMap = KeyFindUtil.matchPage(pdfReader, index, keywordLst);
                for (Map.Entry<String, List<MatchItem>> entry : itemMap.entrySet()) {
                    String key = entry.getKey();
                    JSONObject data = new JSONObject();
                    data.put("keyword", (Object)key);
                    JSONArray positions = new JSONArray();
                    List<MatchItem> matchItemLst = entry.getValue();
                    for (MatchItem matchItem : matchItemLst) {
                        Rectangle page_size = pdfReader.getPageSize(index);
                        float x = 0.0f;
                        float y = 0.0f;
                        float heigh = 0.0f;
                        float divWidth = 0.0f;
                        float divHeight = 0.0f;
                        float x_ = 0.0f;
                        float y_ = 0.0f;
                        Object rect = null;
                        if (pdfReader.getPageN(index).getAsNumber(PdfName.ROTATE) != null) {
                            int intValue = pdfReader.getPageN(index).getAsNumber(PdfName.ROTATE).intValue();
                            int n = intValue = (intValue %= 360) < 0 ? intValue + 360 : intValue;
                            if (intValue != 180 && intValue != 0) {
                                x = matchItem.getY().floatValue();
                                y = page_size.getWidth() - matchItem.getX().floatValue();
                                heigh = page_size.getWidth();
                                divWidth = matchItem.getHeight().floatValue();
                                divHeight = matchItem.getWidth().floatValue();
                                x_ = x + 3.0f * divWidth / 4.0f;
                                y_ = heigh - y + 3.0f * divHeight / 4.0f;
                            } else {
                                x = matchItem.getX().floatValue();
                                y = matchItem.getY().floatValue();
                                heigh = page_size.getHeight();
                                divWidth = matchItem.getWidth().floatValue();
                                divHeight = matchItem.getHeight().floatValue();
                                x_ = x + divWidth / 2.0f;
                                y_ = heigh - y + divHeight / 2.0f;
                            }
                        } else {
                            x = matchItem.getX().floatValue();
                            y = matchItem.getY().floatValue();
                            heigh = page_size.getHeight();
                            divWidth = matchItem.getWidth().floatValue();
                            divHeight = matchItem.getHeight().floatValue();
                            x_ = x + divWidth / 2.0f;
                            y_ = heigh - y + divHeight / 2.0f;
                        }
                        JSONObject position = new JSONObject();
                        position.put("page", (Object)index);
                        position.put("x", (Object)Float.valueOf(x_));
                        position.put("y", (Object)Float.valueOf(y_));
                        positions.add(position);
                    }
                    Optional<JSONObject> result = arr.stream().map(jsonObj -> (JSONObject)jsonObj).filter(jObject -> jObject.getString("keyword").equals(key)).findFirst();
                    JSONObject matchingObject = result.orElse(null);
                    if (matchingObject != null) {
                        JSONArray positionArr = matchingObject.getJSONArray("positions");
                        for (Object pos : positions) {
                            positionArr.add(pos);
                        }
                        continue;
                    }
                    data.put("positions", (Object)positions);
                    arr.add(data);
                }
            }
            obj.put("data", (Object)arr);
            return obj.toJSONString();
        }
        catch (Exception e) {
            log.error("getKeyWordPositions", e);
            return null;
        }
    }

    @RequiresAuthorization
    public static Map<String, Object> getKeywordPosOfParaForAnbiao(PdfReader pdfReader, int pagenum, List<Map<String, String>> paraLst) {
        Map<String, Object> matchMap = null;
        try {
            matchMap = KeyFindUtil.matchPageByParaAndKeywordForAnbiao(pdfReader, pagenum, paraLst);
        }
        catch (Exception e) {
            log.error("getKeywordOfParaPositions", e);
        }
        return matchMap;
    }

    public static String pdfImgMergeByKeyword(byte[] pdfb, String signimg, String keyword) throws Exception {
        Object fileb = null;
        String rst = "";
        H5Actions actions = new H5Actions();
        HashMap<String, Object> actionKeyContext = new HashMap<String, Object>();
        PDFImgImpl outKeyApi = new PDFImgImpl(pdfb);
        actionKeyContext.put("H5OutImpl", outKeyApi);
        actions.init(actionKeyContext);
        JSONObject params = new JSONObject();
        JSONObject request = new JSONObject();
        JSONObject pdf = new JSONObject();
        JSONObject ext = new JSONObject();
        JSONObject sign = new JSONObject();
        params.put("action", (Object)"keySign");
        pdf.put("type", (Object)"file");
        pdf.put("src", (Object)"");
        pdf.put("signmode", (Object)"11");
        pdf.put("msg", (Object)"");
        pdf.put("mergemode", (Object)"2");
        request.put("pdf", (Object)pdf);
        ext.put("signMode", (Object)"11");
        request.put("ext", (Object)ext);
        sign.put("keyword", (Object)keyword);
        sign.put("signimg", (Object)signimg);
        request.put("sign", (Object)sign);
        params.put("request", (Object)request);
        BaseReq baseReq = JSONUtils.json2bean(params, BaseReq.class);
        String json = JSONUtils.bean2json(actions.keySign(baseReq));
        rst = JSONObject.parseObject(json).getString("custom");
        return rst;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequiresAuthorization
    public static ByteArrayOutputStream addHighlight(List<ToBeHighlightBlock> blockLst, String filePath) {
        ByteArrayOutputStream byteArrayOutputStream = null;
        try (PdfReader reader = null;){
            reader = new PdfReader(filePath);
            byteArrayOutputStream = EpSignatureApi.addHighLight(reader, blockLst);
        }
        return byteArrayOutputStream;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequiresAuthorization
    public static ByteArrayOutputStream addHighlight(List<ToBeHighlightBlock> blockLst, FileInputStream fileInputStream) {
        ByteArrayOutputStream byteArrayOutputStream = null;
        try (PdfReader reader = null;){
            reader = new PdfReader(fileInputStream);
            byteArrayOutputStream = EpSignatureApi.addHighLight(reader, blockLst);
        }
        return byteArrayOutputStream;
    }

    @RequiresAuthorization
    private static ByteArrayOutputStream addHighLight(PdfReader pdfReader, List<ToBeHighlightBlock> blockLst) {
        ByteArrayOutputStream byteArrayOutputStream = null;
        ArrayList<HighlightPos> highlightPosLst = new ArrayList<HighlightPos>();
        try {
            for (ToBeHighlightBlock hignlightBlock : blockLst) {
                HighlightPos highlightPos = new HighlightPos();
                ToBeHighlightBlock.Point startPoint = hignlightBlock.getStartPoint();
                ToBeHighlightBlock.Point endPoint = hignlightBlock.getEndPoint();
                highlightPos.setLeft(startPoint.getX());
                highlightPos.setTop(startPoint.getY());
                highlightPos.setWidth(endPoint.getX() - startPoint.getX());
                highlightPos.setHeight(startPoint.getY() - endPoint.getY());
                highlightPos.setPagenum(hignlightBlock.getPg());
                highlightPos.setHighLightID(hignlightBlock.getHighLightID());
                highlightPos.setExt(hignlightBlock.getExt());
                highlightPosLst.add(highlightPos);
            }
            byteArrayOutputStream = PDFAnnotationUtil.addHeightLightAnnoation(pdfReader, highlightPosLst, null, true);
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return byteArrayOutputStream;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequiresAuthorization
    public static ByteArrayOutputStream addHighlightFromH5(String posStr, String highLightId, FileInputStream fileInputStream) {
        ArrayList<HighlightPos> highlightPosLst = new ArrayList<HighlightPos>();
        ByteArrayOutputStream byteArrayOutputStream = null;
        try (PdfReader reader = null;){
            reader = new PdfReader(fileInputStream);
            List jsonObjects = (List)JSONUtils.json2bean(posStr, highlightPosLst.getClass());
            for (JSONObject jsonObject : jsonObjects) {
                highlightPosLst.add(JSONUtils.json2bean(jsonObject, HighlightPos.class));
            }
            byteArrayOutputStream = PDFAnnotationUtil.addHeightLightAnnoation(reader, highlightPosLst, highLightId, false);
        }
        return byteArrayOutputStream;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequiresAuthorization
    public static ByteArrayOutputStream delHighlightByID(String annoationid, List<Integer> pageLst, FileInputStream fileInputStream) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (PdfReader reader = null;){
            reader = new PdfReader(fileInputStream);
            byteArrayOutputStream = EpSignatureApi.delHighlightByID(annoationid, pageLst, reader);
        }
        return byteArrayOutputStream;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequiresAuthorization
    public static ByteArrayOutputStream delHighlightByID(String annoationid, List<Integer> pageLst, String filePath) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (PdfReader reader = null;){
            reader = new PdfReader(filePath);
            byteArrayOutputStream = EpSignatureApi.delHighlightByID(annoationid, pageLst, reader);
        }
        return byteArrayOutputStream;
    }

    private static ByteArrayOutputStream delHighlightByID(String annoationid, List<Integer> pageLst, PdfReader pdfReader) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            PdfStamper stamper = new PdfStamper(pdfReader, byteArrayOutputStream);
            for (Integer i : pageLst) {
                PdfArray annotsArray = pdfReader.getPageN(i).getAsArray(PdfName.ANNOTS);
                if (annotsArray == null) continue;
                for (int j2 = annotsArray.size() - 1; j2 >= 0; --j2) {
                    PdfDictionary annotation = annotsArray.getAsDict(j2);
                    PdfString uniqueId = annotation.getAsString(new PdfName("EP_HIGH"));
                    if (uniqueId == null || !annoationid.equals(uniqueId.toString())) continue;
                    annotsArray.remove(j2);
                }
            }
            stamper.close();
        }
        catch (Exception e) {
            log.error(annoationid, e);
        }
        return byteArrayOutputStream;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequiresAuthorization
    public static ByteArrayOutputStream delSignByID(List<String> annoationIDLst, InputStream fileInputStream) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (PdfReader reader = null;){
            reader = new PdfReader(fileInputStream);
            PdfStamper pdfStamper = new PdfStamper(reader, byteArrayOutputStream, '\u0000', true);
            AcroFields acroFields = pdfStamper.getAcroFields();
            for (String annoationID : annoationIDLst) {
                acroFields.clearSignatureField(annoationID);
            }
            pdfStamper.close();
        }
        return byteArrayOutputStream;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequiresAuthorization
    public static List<JSONObject> getPageSizeLst(FileInputStream inputStream) {
        ArrayList<JSONObject> pageSizeLst = new ArrayList<JSONObject>();
        try (PdfReader reader = null;){
            reader = new PdfReader(inputStream);
            for (int i = 1; i <= reader.getNumberOfPages(); ++i) {
                Rectangle rectangle = reader.getPageSize(i);
                JSONObject pageSizeJson = new JSONObject();
                pageSizeJson.put("w", (Object)Float.valueOf(rectangle.getWidth()));
                pageSizeJson.put("h", (Object)Float.valueOf(rectangle.getHeight()));
                pageSizeJson.put("pg", (Object)i);
                pageSizeLst.add(pageSizeJson);
            }
        }
        return pageSizeLst;
    }

    @RequiresAuthorization
    public static String dealBeijingCaSignInfo(String h5signinfo, String beijingcasigninfo) {
        if (StringUtil.isBlank(beijingcasigninfo)) {
            return h5signinfo;
        }
        JSONObject jsonObject = JSONObject.parseObject(beijingcasigninfo);
        String EventCert = jsonObject.getJSONArray("SigValue").getJSONObject(0).getString("EventCert");
        String SigValue = jsonObject.getJSONArray("SigValue").getJSONObject(0).getString("SigValue");
        SealInfo info = JSONUtils.json2bean(h5signinfo, SealInfo.class);
        for (SignatureInfo info_ : info.getVerify()) {
            SignatureInfo.Cert cert = new SignatureInfo.Cert();
            cert.setBase64Cert(EventCert);
            info_.setCert(cert);
            info_.setSignature(SigValue);
            HashMap<String, String> map = new HashMap<String, String>();
            map.put("signMode", "11");
            map.put("des", "\u5317\u4eacCA\u624b\u5199\u7248\u7b7e\u7ae0");
            info_.setExt(map);
        }
        return JSONUtils.bean2json(info);
    }

    @RequiresAuthorization
    public static String analyzePDFInfo(String pdfPath) {
        try {
            PdfReader pdfReader = new PdfReader(pdfPath);
            String h5signinfo = PDFMergeUtil.verifyPDF(pdfReader);
            return EpSignatureApi.analyzeInfo(h5signinfo);
        }
        catch (Exception e) {
            log.error("\u83b7\u53d6\u7b7e\u7ae0\u4fe1\u606f\u5931\u8d25\uff0c\u6587\u4ef6\u8def\u5f84\uff1a" + pdfPath, e);
            return "";
        }
    }

    @RequiresAuthorization
    public static String analyzePDFInfo(byte[] pdfbyte) {
        try {
            PdfReader pdfReader = new PdfReader(pdfbyte);
            String h5signinfo = PDFMergeUtil.verifyPDF(pdfReader);
            return EpSignatureApi.analyzeInfo(h5signinfo);
        }
        catch (Exception e) {
            log.error("\u83b7\u53d6\u7b7e\u7ae0\u4fe1\u606f\u5931\u8d25", e);
            return "";
        }
    }

    private static String analyzeInfo(String h5signinfo) {
        ArrayList list = new ArrayList();
        try {
            JSONArray array = JSONObject.parseArray(h5signinfo);
            for (Object info : array) {
                SignatureInfo info_ = JSONUtils.json2bean(info, SignatureInfo.class);
                HashMap<String, String> map = new HashMap<String, String>();
                map.put("sealid", info_.getSignid());
                map.put("signature", info_.getSignature());
                map.put("signatureRules", "SM2WithSM3");
                map.put("signatureTime", new SimpleDateFormat("YYYY-MM-dd HH:mm:ss").format(info_.getSigndate()));
                map.put("signaturePerson", info_.getCert().getSigner());
                map.put("signatureRusult", "\u9a8c\u7b7e\u901a\u8fc7");
                map.put("certificate", info_.getCert().getBase64Cert());
                String certificateCitation = "";
                try {
                    X509Certificate cert = SM2CertUtil.getX509Certificate(Base64Util.decode(info_.getCert().getBase64Cert()));
                    byte[] aiaExtensionValue = cert.getExtensionValue("1.3.6.1.5.5.7.1.1");
                    ASN1InputStream outerAsn1InputStream = new ASN1InputStream(aiaExtensionValue);
                    ASN1Primitive outerPrimitive = outerAsn1InputStream.readObject();
                    outerAsn1InputStream.close();
                    ASN1OctetString asn1OctetString = (ASN1OctetString)outerPrimitive;
                    ASN1InputStream innerAsn1InputStream = new ASN1InputStream(asn1OctetString.getOctets());
                    ASN1Primitive innerPrimitive = innerAsn1InputStream.readObject();
                    innerAsn1InputStream.close();
                    if (innerPrimitive instanceof ASN1Sequence) {
                        ASN1Sequence aiaSequence = (ASN1Sequence)innerPrimitive;
                        for (ASN1Encodable element : aiaSequence) {
                            ASN1Primitive innerObject;
                            DERTaggedObject taggedObject;
                            ASN1Primitive accessLocation;
                            ASN1Sequence accessDescription = (ASN1Sequence)element;
                            if (accessDescription.size() != 2 || !((accessLocation = (ASN1Primitive)accessDescription.getObjectAt(1)) instanceof DERTaggedObject) || (taggedObject = (DERTaggedObject)accessLocation).getTagNo() != 6 || !((innerObject = taggedObject.getObject()) instanceof DEROctetString)) continue;
                            DEROctetString derOctetString = (DEROctetString)innerObject;
                            byte[] octets = derOctetString.getOctets();
                            certificateCitation = new String(octets, "UTF-8");
                        }
                    }
                }
                catch (Exception e) {
                    e.printStackTrace();
                }
                map.put("certificateCitation", certificateCitation);
                map.put("signatureAlgorithmIdentificate", "1.2.156.10197.1.501");
                list.add(map);
            }
        }
        catch (Exception e) {
            log.error("\u83b7\u53d6\u7b7e\u7ae0\u4fe1\u606f\u5931\u8d25", e);
            return "";
        }
        return JSONUtils.bean2json(list);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static Map<Integer, String> getPdfTextContent(String filePath, List<Integer> pageLst, boolean isWholePdf) {
        AuthorizationUtil.checkStatic();
        LinkedHashMap<Integer, String> result = new LinkedHashMap<Integer, String>();
        try (PdfReader pdfReader = null;){
            pdfReader = new PdfReader(filePath);
            int totalPages = pdfReader.getNumberOfPages();
            List<Integer> pagesToProcess = isWholePdf ? EpSignatureApi.generatePageRange(1, totalPages) : EpSignatureApi.validateAndSortPages(pageLst, totalPages);
            for (int pageNum : pagesToProcess) {
                String pageText = PdfTextExtractor.getTextFromPage(pdfReader, pageNum);
                result.put(pageNum, pageText);
            }
        }
        return result;
    }

    private static List<Integer> generatePageRange(int start, int end) {
        ArrayList<Integer> pages = new ArrayList<Integer>();
        for (int i = start; i <= end; ++i) {
            pages.add(i);
        }
        return pages;
    }

    private static List<Integer> validateAndSortPages(List<Integer> pages, int totalPages) {
        return pages.stream().filter(page -> page >= 1 && page <= totalPages).distinct().sorted().collect(Collectors.toList());
    }

    static {
        OPERTYPE = new String[]{"initLicense", "verify", "fileinfo", "comSign", "multiPageSign", "keySign", "crossPageSign", "deleteSign", "doSign", "degist", "addAnnotation", "removeAnnotation", "updateAnnotation", "getAnnotationInfo"};
        actionContext = new HashMap<String, Object>();
        EPSIGNATURE_VERSION = "";
        PDFJS_VERSION = "";
        WHITE_ACTION_LIST = new ArrayList<PackageScanner.ClassMethods>();
        try {
            _mcertUrl = "http://218.4.136.115:9999/EpMCertServiceTest";
            _mcertservice = new MCertService(_mcertUrl, "", "");
            actionContext.put("MCertService", _mcertservice);
            _hnbxcaservice = new HNBXCAService();
            actionContext.put("HNBXCAService", _hnbxcaservice);
            WHITE_ACTION_LIST = PackageScanner.getClassAndMethodsFromPackage(WHITE_ACTION_PACKAGE);
        }
        catch (Throwable e) {
            log.error("EpSignatureApi \u9759\u6001\u4ee3\u7801\u5757\u6267\u884c\u5f02\u5e38", e);
        }
    }

    static class SealInfo {
        private List<SignatureInfo> verify;

        SealInfo() {
        }

        public List<SignatureInfo> getVerify() {
            return this.verify;
        }

        public void setVerify(List<SignatureInfo> verify) {
            this.verify = verify;
        }
    }
}


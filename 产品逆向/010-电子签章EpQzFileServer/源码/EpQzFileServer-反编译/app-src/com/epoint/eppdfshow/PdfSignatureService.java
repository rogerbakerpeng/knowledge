/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.eppdfshow;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.configuration.EpQzFileConvertConfig;
import com.epoint.configuration.EpQzFileServerConfig;
import com.epoint.configuration.EpointConfig;
import com.epoint.dataex.utils.FileUtil;
import com.epoint.epqz.cloudsign.service.CloudSignService;
import com.epoint.epqz.file.FileValidator;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.IOUtils;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.SM4Util;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.util.TokenUtil;
import com.epoint.ofd.sdk.gmhelper.SM2Util;
import com.epoint.ofd.sdk.gmhelper.cert.SM2CertUtil;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Security;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.bouncycastle.jcajce.provider.asymmetric.ec.BCECPrivateKey;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value={"/common"})
@CrossOrigin
@SpringBootApplication
public class PdfSignatureService {
    private static final Logger log = LoggerFactory.getLogger(PdfSignatureService.class);
    @Autowired
    private EpointConfig epointConfig;
    @Autowired
    private EpQzFileServerConfig epqzfileserverConfig;
    @Autowired
    private EpQzFileConvertConfig epQzFileConvertConfig;

    @RequestMapping(value={"/getpdfdigest"}, method={RequestMethod.POST})
    public String getPdfDigest(@RequestBody String params) {
        JSONObject paramsObject = JSONObject.parseObject(params);
        JSONArray urlList = paramsObject.getJSONArray("srcpdf");
        ArrayList pdfList = new ArrayList();
        if (!urlList.isEmpty()) {
            Path baseDir = Paths.get(this.epointConfig.getFilepath(), new String[0]).normalize().toAbsolutePath();
            for (Object object : urlList) {
                String pdf = JSONUtils.bean2json(object);
                JSONObject pdfObject = JSONObject.parseObject(pdf);
                String pdfUrl = pdfObject.getString("srcpath");
                String pdfOid = pdfObject.getString("pdfoid");
                String errorMsg = FileValidator.validateFilePath(pdfUrl, baseDir);
                if (errorMsg != null) {
                    return JSONUtils.bean2json(PdfSignatureService.error(errorMsg));
                }
                byte[] b = null;
                HashMap<String, String> map = new HashMap<String, String>();
                try {
                    b = IOUtils.getBytes(this.epointConfig.getFilepath() + pdfUrl);
                    map.put("digest", Base64Util.encode(EpSignatureApi.pdfDeigst(b).getBytes("utf-8")));
                    map.put("pdfoid", pdfOid);
                }
                catch (Exception e) {
                    log.error("getPdfDigest", e);
                    return JSONUtils.bean2json(PdfSignatureService.error());
                }
                pdfList.add(map);
            }
        }
        return JSONUtils.bean2json(PdfSignatureService.success(pdfList));
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequestMapping(value={"/pdfmerge"}, method={RequestMethod.POST})
    public String pdfMerge(@RequestBody String params) throws Exception {
        JSONObject paramsObject = JSONObject.parseObject(params);
        JSONArray tbMergedPdfArray = paramsObject.getJSONArray("tbmerged");
        if (!tbMergedPdfArray.isEmpty()) {
            Path baseDir = Paths.get(this.epointConfig.getFilepath(), new String[0]).normalize().toAbsolutePath();
            for (Object object : tbMergedPdfArray) {
                FilterOutputStream bos = null;
                FileOutputStream fos = null;
                File file = null;
                String pdf = JSONUtils.bean2json(object);
                JSONObject pdfObject = JSONObject.parseObject(pdf);
                String pdfUrl = pdfObject.getString("srcpath");
                String errorMsg = FileValidator.validateFilePath(pdfUrl, baseDir);
                if (errorMsg != null) {
                    return JSONUtils.bean2json(PdfSignatureService.error(errorMsg));
                }
                JSONArray sealinfoArray = pdfObject.getJSONArray("sealinfos");
                ArrayList<String> list = new ArrayList<String>();
                for (Object sealinfoObj : sealinfoArray) {
                    String sealinfo = JSONUtils.bean2json(sealinfoObj);
                    JSONObject sealinfoObject = JSONObject.parseObject(sealinfo);
                    list.add(JSONObject.toJSONString(sealinfoObject.getJSONObject("sealinfo")));
                }
                byte[] b = null;
                try {
                    b = IOUtils.getBytes(this.epointConfig.getFilepath() + pdfUrl);
                    byte[] mergedPdf = EpSignatureApi.WXMerge(b, list);
                    String savepath = pdfUrl.replace(".pdf", "_signed.pdf");
                    file = new File(this.epointConfig.getFilepath() + savepath);
                    fos = new FileOutputStream(file);
                    bos = new BufferedOutputStream(fos);
                    bos.write(mergedPdf);
                }
                catch (Exception e) {
                    log.error("pdfMerge", e);
                    String string = JSONUtils.bean2json(PdfSignatureService.error());
                    return string;
                }
                finally {
                    if (fos != null) {
                        fos.close();
                    }
                    if (bos != null) {
                        bos.close();
                    }
                }
            }
        }
        return JSONUtils.bean2json(PdfSignatureService.success(new JSONObject()));
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequestMapping(value={"/delsign"}, method={RequestMethod.POST})
    public String delSignByID(@RequestBody String params) throws Exception {
        JSONObject paramsObject = JSONObject.parseObject(params);
        Path baseDir = Paths.get(this.epointConfig.getFilepath(), new String[0]).normalize().toAbsolutePath();
        FilterOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        String pdfUrl = paramsObject.getString("srcpath");
        String errorMsg = FileValidator.validateFilePath(pdfUrl, baseDir);
        if (errorMsg != null) {
            return JSONUtils.bean2json(PdfSignatureService.error(errorMsg));
        }
        List annoationIDLst = (List)paramsObject.get("idlst");
        byte[] pdfByte = null;
        try {
            pdfByte = IOUtils.getBytes(this.epointConfig.getFilepath() + pdfUrl);
            ByteArrayOutputStream delPDFOuputStream = EpSignatureApi.delSignByID(annoationIDLst, IOUtils.getStream(pdfByte));
            String savepath = pdfUrl.replace(".pdf", "_del.pdf");
            file = new File(this.epointConfig.getFilepath() + savepath);
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(delPDFOuputStream.toByteArray());
            delPDFOuputStream.close();
        }
        catch (Exception e) {
            log.error(params, e);
            String string = JSONUtils.bean2json(PdfSignatureService.error());
            return string;
        }
        finally {
            if (fos != null) {
                fos.close();
            }
            if (bos != null) {
                bos.close();
            }
        }
        return JSONUtils.bean2json(PdfSignatureService.success(new JSONObject()));
    }

    @RequestMapping(value={"/getkeywordsignatureinfo"}, method={RequestMethod.POST})
    public String getKeyWordSignatueInfo(@RequestBody String params) throws Exception {
        JSONObject paramsObject = JSONObject.parseObject(params);
        JSONArray tbSignedFileArray = paramsObject.getJSONArray("tbsigned");
        JSONArray keySigninfoArray = new JSONArray();
        String result = "";
        if (!tbSignedFileArray.isEmpty()) {
            Path baseDir = Paths.get(this.epointConfig.getFilepath(), new String[0]).normalize().toAbsolutePath();
            for (Object object : tbSignedFileArray) {
                String pdf = JSONUtils.bean2json(object);
                JSONObject pdfObject = JSONObject.parseObject(pdf);
                String pdfUrl = pdfObject.getString("srcpath");
                String errorMsg = FileValidator.validateFilePath(pdfUrl, baseDir);
                if (errorMsg != null) {
                    return JSONUtils.bean2json(PdfSignatureService.error(errorMsg));
                }
                String keyWord = pdfObject.getString("keyword");
                String sealimg = pdfObject.getString("sealimg");
                String signed = pdfObject.getString("signed");
                String signcert = pdfObject.getString("signcert");
                byte[] pdfByte = null;
                try {
                    pdfByte = IOUtils.getBytes(this.epointConfig.getFilepath() + pdfUrl);
                    result = EpSignatureApi.pdfSignInfo(pdfByte, sealimg, signed, signcert, keyWord);
                    JSONObject rtnObj = JSONObject.parseObject(result);
                    if (!rtnObj.getJSONArray("verify").isEmpty()) {
                        JSONObject signObject = new JSONObject();
                        signObject.put("srcpath", (Object)pdfUrl);
                        signObject.put("sealinfo", (Object)rtnObj);
                        keySigninfoArray.add(signObject);
                        continue;
                    }
                    List posList = pdfObject.getObject("poslist", List.class);
                    result = EpSignatureApi.pdfSignInfoByPos(pdfByte, sealimg, signed, signcert, posList);
                    JSONObject posRtnObj = JSONObject.parseObject(result);
                    JSONObject posSignObject = new JSONObject();
                    posSignObject.put("srcpath", (Object)pdfUrl);
                    posSignObject.put("sealinfo", (Object)posRtnObj);
                    keySigninfoArray.add(posSignObject);
                }
                catch (Exception e) {
                    log.error("getKeyWordSignatueInfo", e);
                    return JSONUtils.bean2json(PdfSignatureService.error());
                }
            }
        }
        return JSONUtils.bean2json(PdfSignatureService.success(keySigninfoArray));
    }

    @RequestMapping(value={"/getsigninfobypos"}, method={RequestMethod.POST})
    public String getSignInfoByPos(@RequestBody String params) throws Exception {
        JSONObject paramsObject = JSONObject.parseObject(params);
        JSONArray tbSignedFileArray = paramsObject.getJSONArray("tbsigned");
        JSONArray posSigninfoArray = new JSONArray();
        String result = "";
        if (!tbSignedFileArray.isEmpty()) {
            Path baseDir = Paths.get(this.epointConfig.getFilepath(), new String[0]).normalize().toAbsolutePath();
            for (Object object : tbSignedFileArray) {
                String pdf = JSONUtils.bean2json(object);
                JSONObject pdfObject = JSONObject.parseObject(pdf);
                String pdfUrl = pdfObject.getString("srcpath");
                String errorMsg = FileValidator.validateFilePath(pdfUrl, baseDir);
                if (errorMsg != null) {
                    return JSONUtils.bean2json(PdfSignatureService.error(errorMsg));
                }
                List posList = pdfObject.getObject("poslist", List.class);
                String sealimg = pdfObject.getString("sealimg");
                String signed = pdfObject.getString("signed");
                String signcert = pdfObject.getString("signcert");
                byte[] pdfByte = null;
                try {
                    pdfByte = IOUtils.getBytes(this.epointConfig.getFilepath() + pdfUrl);
                    result = EpSignatureApi.pdfSignInfoByPos(pdfByte, sealimg, signed, signcert, posList);
                    JSONObject rtnObj = JSONObject.parseObject(result);
                    JSONObject signObject = new JSONObject();
                    signObject.put("srcpath", (Object)pdfUrl);
                    signObject.put("sealinfo", (Object)rtnObj);
                    posSigninfoArray.add(signObject);
                }
                catch (Exception e) {
                    log.error("getSignInfoByPos", e);
                    return JSONUtils.bean2json(PdfSignatureService.error());
                }
            }
        }
        return JSONUtils.bean2json(PdfSignatureService.success(posSigninfoArray));
    }

    @RequestMapping(value={"/pdfverify"}, method={RequestMethod.POST})
    public String pdfVerify(@RequestBody String params) throws Exception {
        JSONObject paramsObject = JSONObject.parseObject(params);
        JSONObject tbVerifiedFile = paramsObject.getJSONObject("tbverified");
        String srcpath = tbVerifiedFile.getString("srcpath");
        byte[] pdfByte = null;
        String result = null;
        try {
            Path baseDir = Paths.get(this.epointConfig.getFilepath(), new String[0]).normalize().toAbsolutePath();
            String errorMsg = FileValidator.validateFilePath(srcpath, baseDir);
            if (errorMsg != null) {
                return JSONUtils.bean2json(PdfSignatureService.error(errorMsg));
            }
            pdfByte = IOUtils.getBytes(this.epointConfig.getFilepath() + srcpath);
            result = EpSignatureApi.pdfVerify(pdfByte);
            JSONArray rtnObj = JSONObject.parseArray(result);
            return JSONUtils.bean2json(PdfSignatureService.success(rtnObj));
        }
        catch (Exception e) {
            log.error("pdfVerify", e);
            return JSONUtils.bean2json(PdfSignatureService.error());
        }
    }

    public static JSONObject success(Object object) {
        JSONObject data = new JSONObject();
        data.put("code", (Object)1);
        data.put("text", (Object)"请求成功!");
        JSONObject params = new JSONObject();
        params.put("result", object);
        data.put("params", (Object)params);
        return data;
    }

    public static JSONObject error() {
        JSONObject data = new JSONObject();
        data.put("code", (Object)0);
        data.put("text", (Object)"请求失败!");
        data.put("params", (Object)new JSONObject());
        return data;
    }

    public static JSONObject error(String errorMsg) {
        JSONObject data = new JSONObject();
        data.put("code", (Object)0);
        data.put("text", (Object)errorMsg);
        data.put("params", (Object)new JSONObject());
        return data;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequestMapping(value={"/convert"}, method={RequestMethod.POST})
    public String convert(@RequestBody String params) throws Exception {
        block11: {
            JSONObject paramsObject = JSONObject.parseObject(params);
            JSONObject tbVerifiedFile = paramsObject.getJSONObject("convertpdf");
            String srcpath = tbVerifiedFile.getString("srcpath");
            String filetype = tbVerifiedFile.getString("filetype");
            String filename = tbVerifiedFile.getString("filename");
            byte[] pdfByte = null;
            Object result = null;
            File file = null;
            FilterOutputStream bos = null;
            FileOutputStream fos = null;
            String serverurl = StringUtil.isNotBlank(this.epQzFileConvertConfig.getServerurl()) ? this.epQzFileConvertConfig.getServerurl() : "http://10.207.0.42:8080/EpQzService/";
            String appkey = StringUtil.isNotBlank(this.epQzFileConvertConfig.getAppkey()) ? this.epQzFileConvertConfig.getAppkey() : "ZJGDZT";
            String appsecret = StringUtil.isNotBlank(this.epQzFileConvertConfig.getAppsecret()) ? this.epQzFileConvertConfig.getAppsecret() : "70be3d4c-c432-45dc-8c30-6afe2e814313";
            try {
                Path baseDir = Paths.get(this.epointConfig.getFilepath(), new String[0]).normalize().toAbsolutePath();
                String errorMsg = FileValidator.validateFilePath(srcpath, baseDir);
                if (errorMsg != null) {
                    String string = JSONUtils.bean2json(PdfSignatureService.error(errorMsg));
                    return string;
                }
                pdfByte = IOUtils.getBytes(this.epointConfig.getFilepath() + srcpath);
                HashMap<String, Object> req = new HashMap<String, Object>();
                req.put("platformcode", appkey);
                req.put("token", TokenUtil.createToken(appkey, appsecret, null));
                HashMap<String, String> req_params = new HashMap<String, String>();
                req_params.put("filebase64", Base64Util.encode(pdfByte));
                req_params.put("filetype", filetype);
                req_params.put("filename", filename);
                req.put("params", req_params);
                String resp = HttpUtil.doPost(JSONUtils.bean2json(req), serverurl + "/rest/epqzservice/sign/files/convert");
                if (StringUtil.isBlank(resp)) {
                    throw new RuntimeException("获取信息为空！！");
                }
                JSONObject json_ = JSONObject.parseObject(resp);
                int code = json_.getIntValue("code");
                if (code == 1) {
                    String pdfbase64 = json_.getJSONObject("params").getString("pdfbase64");
                    String filenamein = json_.getJSONObject("params").getString("filename");
                    String savepath = srcpath.replace("." + filetype, ".pdf");
                    file = new File(this.epointConfig.getFilepath() + savepath);
                    fos = new FileOutputStream(file);
                    bos = new BufferedOutputStream(fos);
                    bos.write(Base64Util.decode(pdfbase64));
                    break block11;
                }
                throw new RuntimeException("文件转换失败，错误信息：" + json_.getString("text"));
            }
            catch (Exception e) {
                log.error("convert", e);
                String string = JSONUtils.bean2json(PdfSignatureService.error());
                return string;
            }
            finally {
                if (fos != null) {
                    fos.close();
                }
                if (bos != null) {
                    bos.close();
                }
            }
        }
        return JSONUtils.bean2json(PdfSignatureService.success(new JSONObject()));
    }

    @RequestMapping(value={"/pdfcontentverify"}, method={RequestMethod.POST})
    public String pdfContentVerify(MultipartFile pdf) throws Exception {
        byte[] pdfByte = null;
        try {
            if (pdf != null) {
                pdfByte = pdf.getBytes();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        String result = null;
        ArrayList listresult = new ArrayList();
        try {
            result = EpSignatureApi.pdfVerify(pdfByte);
            JSONArray rtnObj = JSONObject.parseArray(result);
            for (int i = 0; i < rtnObj.size(); ++i) {
                JSONObject item = rtnObj.getJSONObject(i);
                HashMap<String, String> map = new HashMap<String, String>();
                map.put("signid", item.getString("signid"));
                map.put("isIntegrity", item.getString("isIntegrity"));
                listresult.add(map);
            }
            return JSONUtils.bean2json(PdfSignatureService.success(listresult));
        }
        catch (Exception e) {
            log.error("pdfVerify", e);
            return JSONUtils.bean2json(PdfSignatureService.error());
        }
    }

    @RequestMapping(value={"/digitalsign"}, method={RequestMethod.POST})
    public String digitalSign(@RequestBody String params) {
        JSONObject paramsObject = JSONObject.parseObject(params);
        String token = paramsObject.getJSONObject("head").getString("token");
        if (StringUtil.isBlank(token) || !TokenUtil.validateToken(token, this.epointConfig.getLiaoningbaohanappkey(), this.epointConfig.getLiaoningbaohanappsecret(), null)) {
            return JSONUtils.bean2json(PdfSignatureService.commonError("token校验失败，请检查参数配置！"));
        }
        String tobeSign = paramsObject.getJSONObject("params").getString("tobesign");
        String password = this.epointConfig.getPfxpassword();
        log.debug("pfx证书密码========================》" + password);
        try {
            log.info("pfx证书路径========================》" + this.epointConfig.getFilepath() + "苏州国泰新点软件有限公司.pfx");
            byte[] pkcs12 = FileUtil.readFile(this.epointConfig.getFilepath() + "苏州国泰新点软件有限公司.pfx");
            BCECPrivateKey privateKey = SM2CertUtil.getPrivateKeyFromPfx(pkcs12, password);
            byte[] sign = SM2Util.sign(privateKey, tobeSign.getBytes());
            JSONObject json = new JSONObject();
            json.put("signedvalue", (Object)Base64Util.encode(sign));
            return JSONUtils.bean2json(PdfSignatureService.commonSuccess(json));
        }
        catch (Exception e) {
            log.error("digitalSign", e);
            return JSONUtils.bean2json(PdfSignatureService.commonError(e.getMessage()));
        }
    }

    @RequestMapping(value={"/getsealandcert"}, method={RequestMethod.POST})
    public String getSealAndCert(@RequestBody String params) {
        JSONObject paramsObject = JSONObject.parseObject(params);
        String token = paramsObject.getJSONObject("head").getString("token");
        if (StringUtil.isBlank(token) || !TokenUtil.validateToken(token, this.epointConfig.getLiaoningbaohanappkey(), this.epointConfig.getLiaoningbaohanappsecret(), null)) {
            return JSONUtils.bean2json(PdfSignatureService.commonError("token校验失败，请检查参数配置！"));
        }
        String password = this.epointConfig.getPfxpassword();
        log.info("pfx证书密码========================》" + password);
        try {
            byte[] pkcs12 = FileUtil.readFile(this.epointConfig.getFilepath() + "苏州国泰新点软件有限公司.pfx");
            X509Certificate signCert = SM2CertUtil.getX509CertificateFromPfx(pkcs12, password);
            String base64Cert = Base64Util.encode(signCert.getEncoded());
            String base64Img = Base64Util.encode(FileUtil.readFile(this.epointConfig.getFilepath() + "苏州新点公章.png"));
            JSONObject json = new JSONObject();
            json.put("cert", (Object)base64Cert);
            json.put("sealimg", (Object)base64Img);
            return JSONUtils.bean2json(PdfSignatureService.commonSuccess(json));
        }
        catch (Exception e) {
            log.error("getsealandcert", e);
            return JSONUtils.bean2json(PdfSignatureService.commonError(e.getMessage()));
        }
    }

    public static JSONObject commonSuccess(Object object) {
        JSONObject rtnJson = new JSONObject();
        JSONObject data = new JSONObject();
        data.put("code", (Object)1);
        data.put("text", (Object)"请求成功!");
        rtnJson.put("status", (Object)data);
        rtnJson.put("custom", object);
        return rtnJson;
    }

    public static JSONObject commonError(String msg) {
        JSONObject rtnJson = new JSONObject();
        JSONObject data = new JSONObject();
        data.put("code", (Object)0);
        data.put("text", (Object)msg);
        rtnJson.put("status", (Object)data);
        rtnJson.put("custom", (Object)new JSONObject());
        return rtnJson;
    }

    @RequestMapping(value={"/cloudsealsign"}, method={RequestMethod.POST})
    public String cloudSealSign(@RequestBody String params) {
        JSONObject paramsObject = JSONObject.parseObject(params);
        String token = paramsObject.getJSONObject("head").getString("token");
        if (StringUtil.isBlank(token) || !TokenUtil.validateToken(token, this.epointConfig.getAppkey(), this.epointConfig.getAppsecret(), null)) {
            return JSONUtils.bean2json(PdfSignatureService.commonError("token校验失败，请检查参数配置！"));
        }
        JSONObject pdfObject = paramsObject.getJSONObject("params");
        List posList = pdfObject.getObject("poslist", List.class);
        String keyword = pdfObject.getString("keyword");
        String pdfpath = pdfObject.getString("pdfpath");
        String serversignext = pdfObject.getString("serversignext");
        String organization = pdfObject.getString("organization");
        String user_id = pdfObject.getString("user_id");
        String userName = pdfObject.getString("userName");
        String cardNumber = pdfObject.getString("cardNumber");
        String sealwidth = pdfObject.getString("sealwidth");
        String sealheight = pdfObject.getString("sealheight");
        String keyword_index = pdfObject.getString("keyword_index");
        if (StringUtil.isBlank(keyword_index)) {
            keyword_index = "1";
        }
        if (!PdfSignatureService.validateKeywordMatchIndex(keyword_index)) {
            return JSONUtils.bean2json(PdfSignatureService.commonError("keyword_index 参数格式错误！"));
        }
        String path_de = "";
        try {
            path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(pdfpath)));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
        }
        try {
            String posturl = this.epqzfileserverConfig.getQzcloudurl();
            String cloudplatformcode = this.epqzfileserverConfig.getQzcloudplatformcode();
            String cloudtokenSecret = this.epqzfileserverConfig.getQzcloudappsecret();
            byte[] pdfb = IOUtils.getBytes(this.epointConfig.getFilepath() + path_de);
            if (pdfb == null) {
                return JSONUtils.bean2json(PdfSignatureService.commonError("获取pdf文件数据失败，文件路径为：" + this.epointConfig.getFilepath() + path_de));
            }
            HashMap<String, String> ext = new HashMap<String, String>();
            ext.put("sealwidth", sealwidth);
            ext.put("sealheight", sealheight);
            String signInfo = CloudSignService.cloudSignInfo(posturl, cloudplatformcode, cloudtokenSecret, pdfb, keyword, posList, serversignext, organization, user_id, userName, cardNumber, ext);
            if (StringUtil.isNotBlank(keyword)) {
                signInfo = PdfSignatureService.filterSignInfoByKeywordMatchIndex(signInfo, keyword_index);
            }
            ArrayList<String> signinfos = new ArrayList<String>();
            signinfos.add(signInfo);
            String pdfsavepath = "";
            pdfsavepath = StringUtil.isNotBlank(this.epqzfileserverConfig.getIsCoverSrc()) && "true".equals(this.epqzfileserverConfig.getIsCoverSrc()) ? path_de : path_de.replace(".pdf", "_signed.pdf");
            byte[] pdfbmerge = EpSignatureApi.WXMerge(pdfb, signinfos);
            if (pdfbmerge == null) {
                return JSONUtils.bean2json(PdfSignatureService.commonError("pdf文件数据合并失败，请检查关键字或位置坐标是否准确！"));
            }
            IOUtils.write2File(pdfbmerge, this.epointConfig.getFilepath(), pdfsavepath);
            HashMap<String, String> map = new HashMap<String, String>();
            map.put("pdfsavepath", this.epointConfig.getFilepath() + pdfsavepath);
            return JSONUtils.bean2json(PdfSignatureService.commonSuccess(map));
        }
        catch (Exception e) {
            log.error("cloudsealsign", e);
            return JSONUtils.bean2json(PdfSignatureService.commonError(e.getMessage()));
        }
    }

    private static boolean validateKeywordMatchIndex(String keywordMatchIndex) {
        if (StringUtil.isBlank(keywordMatchIndex)) {
            return false;
        }
        String[] indexArray = keywordMatchIndex.split(",");
        Boolean hasPositive = null;
        Boolean hasNegative = null;
        for (String indexStr : indexArray) {
            if (StringUtil.isBlank(indexStr = indexStr.trim())) {
                return false;
            }
            try {
                int index = Integer.parseInt(indexStr);
                if (index == 0) {
                    return false;
                }
                if (index > 0) {
                    hasPositive = true;
                    continue;
                }
                hasNegative = true;
            }
            catch (NumberFormatException e) {
                return false;
            }
        }
        return hasPositive == null || hasNegative == null;
    }

    private static String filterSignInfoByKeywordMatchIndex(String signInfo, String keywordMatchIndex) {
        if (StringUtil.isBlank(signInfo) || StringUtil.isBlank(keywordMatchIndex)) {
            return signInfo;
        }
        try {
            JSONObject signInfoObj = JSONObject.parseObject(signInfo);
            JSONArray verifyArray = signInfoObj.getJSONArray("verify");
            if (verifyArray == null || verifyArray.isEmpty()) {
                return signInfo;
            }
            String[] indexArray = keywordMatchIndex.split(",");
            ArrayList<JSONObject> filteredList = new ArrayList<JSONObject>();
            int totalCount = verifyArray.size();
            for (String indexStr : indexArray) {
                int index;
                int actualIndex;
                if (StringUtil.isBlank(indexStr = indexStr.trim()) || (actualIndex = (index = Integer.parseInt(indexStr)) > 0 ? index - 1 : totalCount + index) < 0 || actualIndex >= totalCount) continue;
                filteredList.add(verifyArray.getJSONObject(actualIndex));
            }
            signInfoObj.put("verify", (Object)filteredList);
            return signInfoObj.toJSONString();
        }
        catch (Exception e) {
            log.error("过滤签章位置信息失败", e);
            return signInfo;
        }
    }

    static {
        Security.addProvider(new BouncyCastleProvider());
    }
}


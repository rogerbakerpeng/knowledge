/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.eppdfshow;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.alibaba.fastjson.parser.Feature;
import com.epoint.configuration.EpQzFileServerConfig;
import com.epoint.configuration.EpointConfig;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.api.OutImplAPI;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.Pdf;
import com.epoint.epsignature.bean.sign.SignatureInfo;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.IOUtils;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PDFMergeUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.SM4Util;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.sm4.SM4;
import com.epoint.gmhelper.sm4.SM4_Context;
import com.epoint.gmhelper.util.TokenUtil;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value={"/mcertpdfservice"})
@CrossOrigin
@SpringBootApplication
public class MCertPdfService {
    private static final Logger log = LoggerFactory.getLogger(MCertPdfService.class);
    @Autowired
    private EpointConfig epointConfig;
    @Autowired
    private EpQzFileServerConfig epqzfileserverConfig;

    @RequestMapping(value={"/doAction"}, method={RequestMethod.POST})
    public String doAction(String params, MultipartFile file) {
        String rtn;
        block10: {
            rtn = "";
            try {
                EpSignatureApi.setH5OutApi(new PDFImpl(params));
                EpSignatureApi.setPlatFormConfig(this.epqzfileserverConfig.getAppkey(), this.epqzfileserverConfig.getAppsecret());
                EpSignatureApi.setHuaWeiPostUrl(this.epqzfileserverConfig.getHuaweiurl());
                EpSignatureApi.setMcertUrl(this.epqzfileserverConfig.getMcerturl());
                EpSignatureApi.setCloudPlatFormConfig(this.epqzfileserverConfig.getCloudappkey(), this.epqzfileserverConfig.getCloudappsecret());
                EpSignatureApi.setCommonServerSealConfig(this.epqzfileserverConfig.getQzcloudurl(), this.epqzfileserverConfig.getQzcloudappsecret(), this.epqzfileserverConfig.getQzcloudplatformcode());
                if (StringUtil.isNotBlank(this.epqzfileserverConfig.getIsenableverify()) && "false".equals(this.epqzfileserverConfig.getIsenableverify())) {
                    EpSignatureApi.setIsEnableVerify(false);
                }
                rtn = EpSignatureApi.doActionStatic(params);
                try {
                    if (rtn.indexOf("downloadPdfUrl") == -1) break block10;
                    String path = JSONObject.parseObject(params).getJSONObject("request").getJSONObject("pdf").getJSONObject("msg").getString("path");
                    ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
                    HttpServletRequest request = servletRequestAttributes.getRequest();
                    String serverurl = "";
                    if (StringUtil.isNotBlank(this.epqzfileserverConfig.getEpqzfileserverurl())) {
                        serverurl = this.epqzfileserverConfig.getEpqzfileserverurl() + "/File/";
                    } else {
                        String protocol = StringUtil.isNotBlank(this.epqzfileserverConfig.getProtocol()) ? this.epqzfileserverConfig.getProtocol() : request.getScheme();
                        String projectname = StringUtil.isNotBlank(this.epqzfileserverConfig.getProjectname()) ? this.epqzfileserverConfig.getProjectname() : "EpQzFileServer";
                        serverurl = protocol + "://" + request.getServerName() + ":" + request.getServerPort() + "/" + projectname + "/File/";
                    }
                    String pathde = "";
                    try {
                        pathde = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                        if (!StringUtil.isNotBlank(this.epqzfileserverConfig.getIsCoverSrc()) || !"true".equals(this.epqzfileserverConfig.getIsCoverSrc())) {
                            pathde = pathde.replace(".pdf", "_signed.pdf");
                        }
                    }
                    catch (Exception e) {
                        log.error(e.getMessage(), e);
                        return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
                    }
                    String pathfile = serverurl + pathde;
                    rtn = rtn.replace("downloadPdfUrl", pathfile);
                }
                catch (Exception e) {
                    log.error("转换PDF下载地址失败", e);
                }
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }
        return rtn;
    }

    @RequestMapping(value={"/init"}, method={RequestMethod.POST})
    public String init(HttpServletRequest request) {
        String params = "";
        try {
            byte[] by = new byte[request.getContentLength()];
            request.getInputStream().read(by);
            params = new String(by, "UTF-8");
            Map map_req = JSONUtils.json2bean(params, Map.class);
            String token = (String)map_req.get("token");
            String path = (String)map_req.get("path");
            if (!TokenUtil.validateToken(token, this.epointConfig.getAppkey(), this.epointConfig.getAppsecret(), "")) {
                return JSONUtils.bean2json(BaseResp.returnError(9999, "token验证失败！"));
            }
            if (StringUtil.isBlank(path)) {
                return JSONUtils.bean2json(BaseResp.returnError(9999, "待签章源PDF路径未找到！"));
            }
            String path_de = "";
            try {
                path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(path)));
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
                return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
            }
            String serverurl = "";
            if (StringUtil.isNotBlank(this.epqzfileserverConfig.getEpqzfileserverurl())) {
                serverurl = this.epqzfileserverConfig.getEpqzfileserverurl() + "/File/";
            } else {
                String protocol = StringUtil.isNotBlank(this.epqzfileserverConfig.getProtocol()) ? this.epqzfileserverConfig.getProtocol() : request.getScheme();
                String projectname = StringUtil.isNotBlank(this.epqzfileserverConfig.getProjectname()) ? this.epqzfileserverConfig.getProjectname() : "EpQzFileServer";
                serverurl = protocol + "://" + request.getServerName() + ":" + request.getServerPort() + "/" + projectname + "/File/";
            }
            String path_file = serverurl + path_de;
            HashMap<String, String> map_ = new HashMap<String, String>();
            map_.put("fileurl", path_file);
            return JSONUtils.bean2json(BaseResp.returnSuccess(map_));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, e.getMessage()));
        }
    }

    public static String encrypt(String plainText, byte[] secretKey) {
        try {
            SM4_Context ctx = new SM4_Context();
            ctx.isPadding = true;
            ctx.mode = 1;
            byte[] keyBytes = secretKey;
            SM4 sm4 = new SM4();
            sm4.sm4_setkey_enc(ctx, keyBytes);
            byte[] encrypted = sm4.sm4_crypt_ecb(ctx, plainText.getBytes("UTF-8"));
            String cipherText = Base64Util.encode(encrypted);
            return cipherText;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value={"/getSealMetadata"}, method={RequestMethod.POST})
    public String getSealMetadata(@RequestBody String filePath) throws Exception {
        String signtype;
        HashMap map = new HashMap();
        String path_de = "";
        try {
            path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(filePath)));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
        }
        String verify = PDFMergeUtil.verifyPDF(new PdfReader(this.epointConfig.getFilepath() + path_de));
        List<SignatureInfo> array = JSON.parseObject(verify, new TypeReference<List<SignatureInfo>>(){}, new Feature[0]);
        HashMap stats = new HashMap();
        for (SignatureInfo sign : array) {
            Map<String, String> ext = sign.getExt();
            signtype = ext.get("signtype");
            String signname = ext.get("signname");
            stats.putIfAbsent(signtype, new HashMap());
            Map signNameStats = (Map)stats.get(signtype);
            signNameStats.put(signname, signNameStats.getOrDefault(signname, 0) + 1);
        }
        ArrayList resultList = new ArrayList();
        for (Map.Entry entry : stats.entrySet()) {
            signtype = (String)entry.getKey();
            Map signNameStats = (Map)entry.getValue();
            for (Map.Entry signEntry : signNameStats.entrySet()) {
                String signname = (String)signEntry.getKey();
                Integer count = (Integer)signEntry.getValue();
                HashMap<String, Object> result = new HashMap<String, Object>();
                result.put("signtype", signtype);
                result.put("count", count);
                result.put("sealname", signname);
                resultList.add(result);
            }
        }
        return JSONUtils.bean2json(resultList);
    }

    @RequestMapping(value={"/getCurrentSignInfo"}, method={RequestMethod.POST})
    public String getCurrentSignInfo(@RequestBody String req) throws Exception {
        String resp = HttpUtil.doPost(req, this.epqzfileserverConfig.getWxdturl());
        return resp;
    }

    @RequestMapping(value={"/decryptpath"}, method={RequestMethod.POST})
    public String decryptpath(@RequestBody String params, HttpServletRequest request) {
        Map map_req = JSONUtils.json2bean(params, Map.class);
        String token = (String)map_req.get("token");
        String filepaths = (String)map_req.get("filepaths");
        if (!TokenUtil.validateToken(token, this.epointConfig.getAppkey(), this.epointConfig.getAppsecret(), "")) {
            return JSONUtils.bean2json(BaseResp.returnError(9999, "token验证失败！"));
        }
        if (StringUtil.isBlank(filepaths)) {
            return JSONUtils.bean2json(BaseResp.returnError(9999, "PDF路径未找到！"));
        }
        String[] filepathArray = JSONUtils.json2bean(filepaths, String[].class);
        ArrayList<String> filepathList = new ArrayList<String>();
        for (String path : filepathArray) {
            String path_de = "";
            try {
                path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(path)));
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
                return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
            }
            String serverurl = "";
            if (StringUtil.isNotBlank(this.epqzfileserverConfig.getEpqzfileserverurl())) {
                serverurl = this.epqzfileserverConfig.getEpqzfileserverurl() + "/File/";
            } else {
                String protocol = StringUtil.isNotBlank(this.epqzfileserverConfig.getProtocol()) ? this.epqzfileserverConfig.getProtocol() : request.getScheme();
                String projectname = StringUtil.isNotBlank(this.epqzfileserverConfig.getProjectname()) ? this.epqzfileserverConfig.getProjectname() : "EpQzFileServer";
                serverurl = protocol + "://" + request.getServerName() + ":" + request.getServerPort() + "/" + projectname + "/File/";
            }
            String path_file = serverurl + path_de;
            filepathList.add(path_file);
        }
        return JSONUtils.bean2json(BaseResp.returnSuccess(filepathList));
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequestMapping(value={"/getPdfInfo"}, method={RequestMethod.POST})
    public String getPdfInfo(@RequestBody String params) {
        Map map_req = JSONUtils.json2bean(params, Map.class);
        String token = (String)map_req.get("token");
        String filepaths = (String)map_req.get("filepaths");
        if (!TokenUtil.validateToken(token, this.epointConfig.getAppkey(), this.epointConfig.getAppsecret(), "")) {
            return JSONUtils.bean2json(BaseResp.returnError(9999, "token验证失败！"));
        }
        if (StringUtil.isBlank(filepaths)) {
            return JSONUtils.bean2json(BaseResp.returnError(9999, "PDF路径未找到！"));
        }
        String[] pdfPaths = JSONUtils.json2bean(filepaths, String[].class);
        ArrayList resultList = new ArrayList();
        try {
            for (String pdfPath : pdfPaths) {
                HashMap<String, Object> pdfInfo = new HashMap<String, Object>();
                String path_de = "";
                try {
                    path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(pdfPath)));
                }
                catch (Exception e) {
                    log.error("解密PDF路径失败: " + pdfPath, e);
                    continue;
                }
                String type = "shubian";
                try (PdfReader reader = null;){
                    String filePath = this.epointConfig.getFilepath() + path_de;
                    reader = new PdfReader(filePath);
                    int page = 1;
                    Rectangle page_rect = reader.getPageSize(page);
                    if (reader.getPageN(page).getAsNumber(PdfName.ROTATE) != null) {
                        int intValue = reader.getPageN(page).getAsNumber(PdfName.ROTATE).intValue();
                        int n = intValue = (intValue %= 360) < 0 ? intValue + 360 : intValue;
                        if (intValue != 180 && intValue != 0) {
                            page_rect = reader.getPageSize(page).rotate();
                            type = "hengbian";
                        }
                    }
                    float width = page_rect.getWidth();
                    float height = page_rect.getHeight();
                    int pageCount = reader.getNumberOfPages();
                    int signCount = EpSignatureApi.getPdfSealCount(filePath);
                    pdfInfo.put("pdf", path_de);
                    pdfInfo.put("width", Float.valueOf(width));
                    pdfInfo.put("height", Float.valueOf(height));
                    pdfInfo.put("pageCount", pageCount);
                    pdfInfo.put("type", type);
                    pdfInfo.put("signCount", signCount);
                    resultList.add(pdfInfo);
                }
            }
        }
        catch (Exception e) {
            log.error("获取PDF信息失败", e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, "获取PDF信息失败：" + e.getMessage()));
        }
        return JSONUtils.bean2json(BaseResp.returnSuccess(resultList));
    }

    class PDFImpl
    extends OutImplAPI {
        public String params;

        public PDFImpl(String params) {
            this.params = params;
        }

        @Override
        public byte[] getPDF(Pdf pdf) {
            try {
                Map map_req = JSONUtils.json2bean(pdf.getMsg(), Map.class);
                String token = (String)map_req.get("token");
                if (!TokenUtil.validateToken(token, MCertPdfService.this.epointConfig.getAppkey(), MCertPdfService.this.epointConfig.getAppsecret(), "")) {
                    log.error("token验证失败！");
                }
                String path = (String)map_req.get("path");
                String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(MCertPdfService.this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                return IOUtils.getBytes(MCertPdfService.this.epointConfig.getFilepath() + path_de);
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
                return null;
            }
        }

        @Override
        public String getPDFPath(Pdf pdf) {
            try {
                Map map_req = JSONUtils.json2bean(pdf.getMsg(), Map.class);
                String token = (String)map_req.get("token");
                if (!TokenUtil.validateToken(token, MCertPdfService.this.epointConfig.getAppkey(), MCertPdfService.this.epointConfig.getAppsecret(), "")) {
                    log.error("token验证失败！");
                }
                String path = (String)map_req.get("path");
                String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(MCertPdfService.this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                return MCertPdfService.this.epointConfig.getFilepath() + path_de;
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
                return null;
            }
        }

        /*
         * WARNING - Removed try catching itself - possible behaviour change.
         */
        @Override
        public void dealPDF(Pdf pdf, byte[] filepdf) {
            FilterOutputStream bos = null;
            FileOutputStream fos = null;
            File file = null;
            Map map_req = JSONUtils.json2bean(pdf.getMsg(), Map.class);
            String token = (String)map_req.get("token");
            if (!TokenUtil.validateToken(token, MCertPdfService.this.epointConfig.getAppkey(), MCertPdfService.this.epointConfig.getAppsecret(), "")) {
                log.error("token验证失败！");
            }
            String path = (String)map_req.get("path");
            try {
                String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(MCertPdfService.this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                String savepath = "";
                savepath = StringUtil.isNotBlank(MCertPdfService.this.epqzfileserverConfig.getIsCoverSrc()) && "true".equals(MCertPdfService.this.epqzfileserverConfig.getIsCoverSrc()) ? path_de : path_de.replace(".pdf", "_signed.pdf");
                file = new File(MCertPdfService.this.epointConfig.getFilepath() + savepath);
                fos = new FileOutputStream(file);
                bos = new BufferedOutputStream(fos);
                bos.write(filepdf);
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
            }
            finally {
                if (bos != null) {
                    try {
                        bos.close();
                    }
                    catch (IOException e) {
                        log.error(e.getMessage(), e);
                    }
                }
                if (fos != null) {
                    try {
                        fos.close();
                    }
                    catch (IOException e) {
                        log.error(e.getMessage(), e);
                    }
                }
            }
        }

        @Override
        public void dealSignInfo(Pdf pdf, String signinfo) {
        }

        @Override
        public String createToken() {
            return "";
        }
    }
}


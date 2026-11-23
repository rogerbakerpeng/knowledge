/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.eppdfshow;

import com.alibaba.fastjson.JSONObject;
import com.epoint.configuration.EpQzFileServerConfig;
import com.epoint.configuration.EpointConfig;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.api.OutImplAPI;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.Pdf;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.IOUtils;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.SM4Util;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.util.TokenUtil;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value={"/testpdfservice"})
@CrossOrigin
@SpringBootApplication
public class PdfPathDoAction {
    private static final Logger log = LoggerFactory.getLogger(PdfPathDoAction.class);
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
                if (!TokenUtil.validateToken(token, PdfPathDoAction.this.epointConfig.getAppkey(), PdfPathDoAction.this.epointConfig.getAppsecret(), "")) {
                    log.error("token验证失败！");
                }
                String path = (String)map_req.get("path");
                String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(PdfPathDoAction.this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                return IOUtils.getBytes(PdfPathDoAction.this.epointConfig.getFilepath() + path_de);
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
                if (!TokenUtil.validateToken(token, PdfPathDoAction.this.epointConfig.getAppkey(), PdfPathDoAction.this.epointConfig.getAppsecret(), "")) {
                    log.error("token验证失败！");
                }
                String path = (String)map_req.get("path");
                String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(PdfPathDoAction.this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                return PdfPathDoAction.this.epointConfig.getFilepath() + path_de;
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
                return null;
            }
        }

        @Override
        public String getSignedPDFPath(Pdf pdf) {
            try {
                Map map_req = JSONUtils.json2bean(pdf.getMsg(), Map.class);
                String token = (String)map_req.get("token");
                if (!TokenUtil.validateToken(token, PdfPathDoAction.this.epointConfig.getAppkey(), PdfPathDoAction.this.epointConfig.getAppsecret(), "")) {
                    log.error("token验证失败！");
                }
                String path = (String)map_req.get("path");
                String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(PdfPathDoAction.this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                return PdfPathDoAction.this.epointConfig.getFilepath() + path_de.replace(".pdf", "_tmpsigned.pdf");
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
            if (!TokenUtil.validateToken(token, PdfPathDoAction.this.epointConfig.getAppkey(), PdfPathDoAction.this.epointConfig.getAppsecret(), "")) {
                log.error("token验证失败！");
            }
            String path = (String)map_req.get("path");
            try {
                String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(PdfPathDoAction.this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                String savepath = "";
                savepath = StringUtil.isNotBlank(PdfPathDoAction.this.epqzfileserverConfig.getIsCoverSrc()) && "true".equals(PdfPathDoAction.this.epqzfileserverConfig.getIsCoverSrc()) ? path_de : path_de.replace(".pdf", "_signed.pdf");
                file = new File(PdfPathDoAction.this.epointConfig.getFilepath() + savepath);
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

        /*
         * WARNING - Removed try catching itself - possible behaviour change.
         */
        @Override
        public boolean dealPDFPath(Pdf pdf, String pdfPath) {
            FileOutputStream fos = null;
            File file = null;
            Map map_req = JSONUtils.json2bean(pdf.getMsg(), Map.class);
            String token = (String)map_req.get("token");
            if (!TokenUtil.validateToken(token, PdfPathDoAction.this.epointConfig.getAppkey(), PdfPathDoAction.this.epointConfig.getAppsecret(), "")) {
                log.error("token验证失败！");
            }
            String path = (String)map_req.get("path");
            try {
                String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(PdfPathDoAction.this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                String savepath = "";
                savepath = StringUtil.isNotBlank(PdfPathDoAction.this.epqzfileserverConfig.getIsCoverSrc()) && "true".equals(PdfPathDoAction.this.epqzfileserverConfig.getIsCoverSrc()) ? path_de : path_de.replace(".pdf", "_signed.pdf");
                file = new File(PdfPathDoAction.this.epointConfig.getFilepath() + savepath);
                try {
                    Files.copy(Paths.get(pdfPath, new String[0]), file.toPath(), StandardCopyOption.REPLACE_EXISTING);
                }
                catch (IOException e) {
                    e.printStackTrace();
                    boolean bl = false;
                    if (fos != null) {
                        try {
                            fos.close();
                        }
                        catch (IOException e2) {
                            log.error(e2.getMessage(), e2);
                        }
                    }
                    return bl;
                }
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
            }
            finally {
                if (fos != null) {
                    try {
                        fos.close();
                    }
                    catch (IOException e) {
                        log.error(e.getMessage(), e);
                    }
                }
            }
            return true;
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


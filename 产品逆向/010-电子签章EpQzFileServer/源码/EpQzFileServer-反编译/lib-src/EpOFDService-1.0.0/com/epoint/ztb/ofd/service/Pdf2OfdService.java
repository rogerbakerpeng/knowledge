/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  sun.misc.BASE64Decoder
 */
package com.epoint.ztb.ofd.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.epoint.dataex.bizlogic.DataExImpl;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.util.TokenUtil;
import com.epoint.ofd.core.attachment.CT_Attachment;
import com.epoint.ofd.core.basicStructure.doc.CT_CommonData;
import com.epoint.ofd.core.basicStructure.doc.Document;
import com.epoint.ofd.core.basicStructure.pageTree.Pages;
import com.epoint.ofd.core.basicStructure.res.CT_MultiMedia;
import com.epoint.ofd.core.basicStructure.res.OFDResource;
import com.epoint.ofd.core.basicStructure.res.Res;
import com.epoint.ofd.core.basicStructure.res.resources.Fonts;
import com.epoint.ofd.core.basicStructure.res.resources.MultiMedias;
import com.epoint.ofd.core.basicType.ST_Box;
import com.epoint.ofd.core.basicType.ST_ID;
import com.epoint.ofd.core.text.font.CT_Font;
import com.epoint.ofd.enums.OFDEnums;
import com.epoint.ofd.gm.cert.PKCS12Tools;
import com.epoint.ofd.gm.ses.v1.SESeal;
import com.epoint.ofd.layout.OFDDoc;
import com.epoint.ofd.layout.edit.Attachment;
import com.epoint.ofd.layout.edit.Watermark;
import com.epoint.ofd.pkg.container.DocDir;
import com.epoint.ofd.pkg.container.OFDDir;
import com.epoint.ofd.pkg.container.VirtualContainer;
import com.epoint.ofd.reader.OFDReader;
import com.epoint.ofd.reader.keyword.KeywordExtractor;
import com.epoint.ofd.reader.keyword.KeywordPosition;
import com.epoint.ofd.sign.NumberFormatAtomicSignID;
import com.epoint.ofd.sign.OFDSigner;
import com.epoint.ofd.sign.SignIDProvider;
import com.epoint.ofd.sign.SignMode;
import com.epoint.ofd.sign.signContainer.SESV1Container;
import com.epoint.ofd.sign.signContainer.SESV4Container;
import com.epoint.ofd.sign.stamppos.NormalStampPos;
import com.epoint.ofd.sign.verify.OFDValidator;
import com.epoint.ofd.sign.verify.container.SESV1ValidateContainer;
import com.epoint.ofd.sign.verify.container.SESV4ValidateContainer;
import com.epoint.ofdbox.core.model.OFD;
import com.epoint.ofdbox.core.model.page.Page;
import com.epoint.ofdbox.img.Ofd2Img;
import com.epoint.ztb.common.config.OfdConfig;
import com.epoint.ztb.common.utils.CommonUtils;
import com.epoint.ztb.common.utils.Des3Util;
import com.epoint.ztb.common.utils.LicenseUtil;
import com.epoint.ztb.common.utils.OFDUtils;
import com.epoint.ztb.convert.ConvertConfig;
import com.epoint.ztb.convert.DocConvertFactory;
import com.epoint.ztb.convert.IDocConvert;
import com.epoint.ztb.convert.IFileGetter;
import com.epoint.ztb.ofd.config.DianjuConfig;
import com.epoint.ztb.validate.service.EnableStopWatch;
import com.epoint.ztb.validate.service.ValidateToken;
import com.epoint.ztb.web.domain.AddAttachmentsRequest;
import com.epoint.ztb.web.domain.AjaxResult;
import com.epoint.ztb.web.domain.SignRequest;
import com.epoint.ztb.web.domain.WaterMarkRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.security.PrivateKey;
import java.security.cert.Certificate;
import java.security.cert.CertificateExpiredException;
import java.security.cert.CertificateNotYetValidException;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.bouncycastle.jcajce.provider.asymmetric.x509.CertificateFactory;
import org.dom4j.DocumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

@Api(tags={"Pdf2OfdService"}, description="OFD\u901a\u7528\u529f\u80fd\u63d0\u4f9b")
@RestController
@RequestMapping(value={"/ofd/v1"})
public class Pdf2OfdService {
    private static final Logger log = LoggerFactory.getLogger(Pdf2OfdService.class);
    private static final String SIGNEDDIR = "signed";
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    @Autowired
    private DianjuConfig dianjuConfig;
    private MultipartFile multipartFile;

    @ApiOperation(value="\u4e0a\u4f20\u6587\u4ef6")
    @EnableStopWatch
    @ValidateToken
    @PostMapping(value={"/uploadfile"})
    public String UploadFile(@RequestBody JSONObject jsonObject) {
        try {
            DataExImpl dataEx = new DataExImpl();
            dataEx.filetransfer(jsonObject);
        }
        catch (Exception e) {
            log.error("\u6587\u4ef6\u4e0a\u4f20\u5f02\u5e38", e);
            return AjaxResult.error("\u6587\u4ef6\u4e0a\u4f20\u5f02\u5e38", e.getMessage().toString()).toString();
        }
        return AjaxResult.success("\u4e0a\u4f20\u6210\u529f").toString();
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @ValidateToken
    @RequestMapping(value={"/upload"})
    public String uploadFile(@RequestParam(value="file") MultipartFile multipartFile, String token) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String directoryPath = OfdConfig.getTempfilepath() + File.separator + sdf.format(new Date()).substring(0, 8) + File.separator;
        File targetfile = new File(directoryPath);
        if (!targetfile.exists()) {
            targetfile.mkdirs();
        }
        File file = new File(targetfile + File.separator + multipartFile.getOriginalFilename());
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(file);
            IOUtils.copy(multipartFile.getInputStream(), (OutputStream)fileOutputStream);
        }
        catch (Exception e) {
            log.error("upload\u6587\u4ef6\u4e0a\u4f20\u5f02\u5e38", e);
            String string = AjaxResult.error("\u6587\u4ef6\u4e0a\u4f20\u5f02\u5e38", e.getMessage().toString()).toString();
            return string;
        }
        finally {
            try {
                fileOutputStream.close();
            }
            catch (IOException e) {
                return AjaxResult.error("\u6587\u4ef6\u4e0a\u4f20\u5f02\u5e38", e.getMessage().toString()).toString();
            }
        }
        return AjaxResult.success("\u4e0a\u4f20\u6210\u529f").toString();
    }

    @ApiOperation(value="pdf\u8f6cofd")
    @EnableStopWatch
    @ValidateToken
    @PostMapping(value={"/convertpdf2ofd"})
    public String ConvertPDF2OFD(final String fileid, String token, final String filename, String destfileformat) {
        log.info("OFD\u8f6c\u6362\u670d\u52a1\u5f00\u59cb\u8f6c\u6362===========================>" + new Date());
        if (StringUtil.isBlank(destfileformat)) {
            destfileformat = OFDEnums.FiletypeEnum.ofd.getVal();
        }
        Map<Object, Object> map_license = new HashMap();
        String format = StringUtil.isBlank(filename) ? "pdf" : CommonUtils.getFileFormat(filename);
        String pdfFilePath = OfdConfig.getTempfilepath() + File.separator + this.sdf.format(new Date()).substring(0, 8) + File.separator + fileid + "." + format;
        map_license = LicenseUtil.licenseCheck(token.split("\\|\\|")[1]);
        String licdesc = (String)map_license.get("licdesc");
        String danweiname = "";
        String implname = "DEFAULT";
        if (StringUtil.isNotBlank(licdesc)) {
            if (licdesc.indexOf(",") != -1) {
                String[] d = licdesc.split(",");
                danweiname = d[0];
                if (d.length > 2) {
                    implname = d[2];
                }
            }
        } else {
            danweiname = "OFD\u670d\u52a1\u672a\u6388\u6743";
        }
        String ofdOutPath = pdfFilePath.replace(format, destfileformat);
        String watermarkfilepath = ofdOutPath.replace(".ofd", "temp.ofd");
        File infile = new File(pdfFilePath);
        File outfile = new File(ofdOutPath);
        boolean isDianju = false;
        try {
            IDocConvert docconvert = DocConvertFactory.getDocConverter(implname);
            try {
                if (!"DEFAULT".equals(implname) && !"Epoint".equals(implname)) {
                    isDianju = true;
                    String configStr = this.dianjuConfig.getServerurl() + ";" + this.dianjuConfig.getSys_id();
                    IFileGetter fileGetter = new IFileGetter(){

                        @Override
                        public OFDEnums.RequestTypeEnum getType() {
                            return OFDEnums.RequestTypeEnum.http;
                        }

                        @Override
                        public String getPath(String pathIn) {
                            HashMap<String, String> params = new HashMap<String, String>();
                            params.put("fileid", fileid);
                            params.put("filename", filename);
                            params.put("token", TokenUtil.createToken("EpOFD", "EpOFD@Gepoint", null));
                            String souceFormat = CommonUtils.getFileFormat(pathIn);
                            if ("html".equals(souceFormat)) {
                                String paramJsonStr = JSONUtils.bean2json(params);
                                return Pdf2OfdService.this.dianjuConfig.getDownloadurl() + "/ofd/v1/getfileenc?encparams=" + Base64Util.encode(paramJsonStr);
                            }
                            StringBuffer sbParams = new StringBuffer();
                            if (params != null && params.size() > 0) {
                                for (Map.Entry entry : params.entrySet()) {
                                    sbParams.append((String)entry.getKey());
                                    sbParams.append("=");
                                    try {
                                        sbParams.append(URLEncoder.encode(String.valueOf(entry.getValue()), "UTF-8"));
                                    }
                                    catch (UnsupportedEncodingException e) {
                                        e.printStackTrace();
                                    }
                                    sbParams.append("&");
                                }
                            }
                            return Pdf2OfdService.this.dianjuConfig.getDownloadurl() + "/ofd/v1/getfile?" + sbParams.substring(0, sbParams.length() - 1).toString();
                        }
                    };
                    ConvertConfig convertConfig = new ConvertConfig(fileGetter, implname, configStr);
                    docconvert.init(convertConfig);
                }
                docconvert.convert(pdfFilePath, destfileformat);
                log.info("pdf convert to ofd done, pdf file save to " + ofdOutPath);
            }
            catch (Exception e) {
                log.error("pdf convert to ofd failed", e);
                return AjaxResult.error(Objects.isNull(e.getCause()) ? e.getMessage() : e.getCause().getMessage()).toString();
            }
            if (!isDianju && !"Epoint".equals(implname)) {
                infile = new File(watermarkfilepath);
                log.info("\u5f00\u59cb\u52a0\u6c34\u5370" + ofdOutPath + "@" + watermarkfilepath + "@" + danweiname);
                OFDUtils.addWatermark(ofdOutPath, watermarkfilepath, danweiname);
                FileCopyUtils.copy(infile, outfile);
            }
        }
        catch (Exception e) {
            log.error("test convert failed", e);
            return AjaxResult.error("\u8f6c\u6362\u5931\u8d25", e.getMessage()).toString();
        }
        log.info("OFD\u8f6c\u6362\u670d\u52a1\u7ed3\u675f\u8f6c\u6362===========================>" + new Date());
        return AjaxResult.success("\u8f6c\u6362\u6210\u529f").toString();
    }

    public String ConvertPDF2OFD(String fileid, String token, String filename) {
        this.ConvertPDF2OFD(fileid, token, filename, OFDEnums.FiletypeEnum.ofd.getVal());
        return AjaxResult.success("\u8f6c\u6362\u6210\u529f").toString();
    }

    @ApiOperation(value="\u83b7\u53d6\u6587\u4ef6")
    @ValidateToken
    @EnableStopWatch
    @GetMapping(value={"/getfile"})
    public void GetFile(String fileid, String filename, String token, HttpServletResponse response) throws IOException {
        Pdf2OfdService.GetFileBiz(fileid, filename, response, false);
    }

    @ApiOperation(value="\u83b7\u53d6\u6587\u4ef6")
    @ValidateToken
    @EnableStopWatch
    @GetMapping(value={"/getfileenc"})
    public void GetFile(String encparams, HttpServletResponse response) throws IOException {
        String paramJsonStr = Base64Util.decode2string(encparams);
        JSONObject paramJson = JSONObject.parseObject(paramJsonStr);
        String fileid = paramJson.getString("fileid");
        String filename = paramJson.getString("filename");
        Pdf2OfdService.GetFileBiz(fileid, filename, response, true);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    private static void GetFileBiz(String fileid, String filename, HttpServletResponse response, boolean isHtml) throws IOException {
        InputStream in = null;
        OutputStream out = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            String filePath = OfdConfig.getTempfilepath() + File.separator + sdf.format(new Date()).substring(0, 8) + File.separator + fileid + "." + OFDUtils.getFileFormat(filename);
            if (!isHtml) {
                response.setContentType("application/x-www-form-urlencoded");
                response.setHeader("Content-Disposition", "attachment;filename=" + filename);
            } else {
                response.setContentType("text/html");
            }
            in = new FileInputStream(filePath);
            out = response.getOutputStream();
            int len = 0;
            byte[] buf = new byte[1024];
            while ((len = in.read(buf)) != -1) {
                out.write(buf, 0, len);
            }
        }
        catch (Exception e) {
            log.error("getfile\u5f02\u5e38\uff1a", e);
        }
        finally {
            if (in != null) {
                in.close();
            }
            if (out != null) {
                out.close();
            }
        }
    }

    @ApiOperation(value="\u5f80ofd\u4e2d\u589e\u52a0\u9644\u4ef6")
    @EnableStopWatch
    @ValidateToken
    @PostMapping(value={"/addattachments"})
    public String AddAttachments(@RequestBody AddAttachmentsRequest addAttachmentsRequest) throws IOException, DocumentException {
        Path outP = null;
        Path inP = null;
        try {
            String tempfilepath = OfdConfig.getTempfilepath() + File.separator + this.sdf.format(new Date()).substring(0, 8) + File.separator;
            String outfilePath = tempfilepath + "tmp" + addAttachmentsRequest.getOfdfileid() + ".ofd";
            File outtmpfile = new File(outfilePath);
            if (!outtmpfile.exists()) {
                outtmpfile.createNewFile();
            }
            String infilePath = tempfilepath + addAttachmentsRequest.getOfdfileid() + ".ofd";
            outP = Paths.get(outfilePath, new String[0]);
            inP = Paths.get(infilePath, new String[0]);
            OutputStream outputStream = Files.newOutputStream(outP, new OpenOption[0]);
            BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);
            try (OFDReader reader = new OFDReader(inP);
                 OFDDoc ofdDoc = new OFDDoc(reader, bufferedOutputStream);){
                for (Map.Entry<String, String> entry : addAttachmentsRequest.getAttachments().entrySet()) {
                    String tmpfilename = "";
                    tmpfilename = entry.getKey() + "." + OFDUtils.getFileFormat(entry.getValue());
                    Path file = Paths.get(tempfilepath, tmpfilename);
                    ofdDoc.addAttachment(new Attachment(entry.getValue().split("\\.")[0], file));
                }
            }
            File infile = new File(outfilePath);
            File outfile = new File(infilePath);
            FileCopyUtils.copy(infile, outfile);
            if (outputStream != null) {
                outputStream.close();
            }
        }
        catch (Exception e) {
            log.error("\u6dfb\u52a0\u9644\u4ef6\u5f02\u5e38", e);
            return AjaxResult.success("\u6dfb\u52a0\u9644\u4ef6\u5f02\u5e38", e.getMessage()).toString();
        }
        return AjaxResult.success("\u6dfb\u52a0\u9644\u4ef6\u6210\u529f").toString();
    }

    @ApiOperation(value="\u7ed9OFD\u7b7e\u540d")
    @EnableStopWatch
    @ValidateToken
    @PostMapping(value={"/sign"})
    public String Sign(@RequestBody SignRequest signRequest) throws IOException, GeneralSecurityException {
        try {
            Throwable throwable;
            String tmpFilePath = OfdConfig.getTempfilepath() + File.separator + this.sdf.format(new Date()).substring(0, 8) + File.separator;
            File tmpfile = new File(tmpFilePath + SIGNEDDIR);
            if (!tmpfile.exists() && !tmpfile.isDirectory()) {
                tmpfile.mkdirs();
            }
            signRequest.setP12file(new String(new BASE64Decoder().decodeBuffer(signRequest.getP12file())));
            signRequest.setSealfile(new String(Des3Util.decryptMode(new BASE64Decoder().decodeBuffer(signRequest.getSealfile()))));
            signRequest.setFilename(new String(Des3Util.decryptMode(new BASE64Decoder().decodeBuffer(signRequest.getFilename()))));
            OFDUtils.bytesToFile(new BASE64Decoder().decodeBuffer(signRequest.getP12file()), tmpFilePath + signRequest.getFileid() + ".p12");
            OFDUtils.bytesToFile(new BASE64Decoder().decodeBuffer(signRequest.getSealfile()), tmpFilePath + signRequest.getFileid() + ".esl");
            Path userP12Path = Paths.get(tmpFilePath, signRequest.getFileid() + ".p12");
            Path sealPath = Paths.get(tmpFilePath, signRequest.getFileid() + ".esl");
            PrivateKey prvKey = PKCS12Tools.ReadPrvKey(userP12Path, signRequest.getAlias(), signRequest.getPwd());
            Certificate signCert = PKCS12Tools.ReadUserCert(userP12Path, signRequest.getAlias(), signRequest.getPwd());
            com.epoint.ofd.gm.ses.v4.SESeal seal = com.epoint.ofd.gm.ses.v4.SESeal.getInstance(Files.readAllBytes(sealPath));
            Path src = Paths.get(tmpFilePath, signRequest.getFileid() + ".ofd");
            Path out = Paths.get(tmpFilePath + SIGNEDDIR + File.separator + signRequest.getFileid() + ".ofd", new String[0]);
            try (OFDReader reader = new OFDReader(src);){
                throwable = null;
                try (OFDSigner signer = new OFDSigner(reader, out, (SignIDProvider)new NumberFormatAtomicSignID());){
                    SESV4Container signContainer = new SESV4Container(prvKey, seal, signCert);
                    signer.setSignMode(signRequest.getSignMode());
                    signer.setSignContainer(signContainer);
                    signer.addApPos(new NormalStampPos(signRequest.getPage(), signRequest.getX(), signRequest.getY(), signRequest.getWidth(), signRequest.getHeight()));
                    signer.exeSign();
                }
                catch (Throwable throwable2) {
                    throwable = throwable2;
                    throw throwable2;
                }
            }
            reader = new OFDReader(out);
            var12_13 = null;
            try {
                throwable = null;
                try (OFDValidator validator = new OFDValidator(reader);){
                    validator.setValidator(new SESV4ValidateContainer());
                    validator.exeValidate();
                }
                catch (Throwable throwable3) {
                    throwable = throwable3;
                    throw throwable3;
                }
            }
            catch (Throwable throwable4) {
                var12_13 = throwable4;
                throw throwable4;
            }
            finally {
                if (reader != null) {
                    if (var12_13 != null) {
                        try {
                            reader.close();
                        }
                        catch (Throwable throwable5) {
                            var12_13.addSuppressed(throwable5);
                        }
                    } else {
                        reader.close();
                    }
                }
            }
            File infile = new File(tmpFilePath + SIGNEDDIR + File.separator + signRequest.getFileid() + ".ofd");
            File outfile = new File(tmpFilePath + signRequest.getFileid() + ".ofd");
            FileCopyUtils.copy(infile, outfile);
        }
        catch (Exception e) {
            log.error("\u7b7e\u7ae0\u5f02\u5e38\uff1a", e);
            return AjaxResult.error("\u7b7e\u7ae0\u5f02\u5e38", e.getMessage()).toString();
        }
        return AjaxResult.success("\u7b7e\u7ae0\u6210\u529f").toString();
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    @ApiOperation(value="\u7ed9OFD\u672c\u5730\u7b7e\u540d")
    @EnableStopWatch
    @ValidateToken
    @PostMapping(value={"/signlocal"})
    public String SignLocal(@RequestBody SignRequest signRequest) throws IOException, GeneralSecurityException {
        log.info("OFD\u672c\u5730\u7b7e\u540d\u5f00\u59cb===========================>fileid" + signRequest.getFileid() + "\u5f53\u524d\u65f6\u95f4" + new Date());
        long start = System.currentTimeMillis();
        try {
            String tmpFilePath;
            block91: {
                OFDValidator validator2;
                Throwable throwable;
                tmpFilePath = OfdConfig.getTempfilepath() + File.separator + this.sdf.format(new Date()).substring(0, 8) + File.separator;
                File tmpfile = new File(tmpFilePath + SIGNEDDIR);
                if (!tmpfile.exists() && !tmpfile.isDirectory()) {
                    tmpfile.mkdirs();
                }
                byte[] sigVal = new BASE64Decoder().decodeBuffer(signRequest.getSigVal());
                Certificate signCert = new CertificateFactory().engineGenerateCertificate(new ByteArrayInputStream(new BASE64Decoder().decodeBuffer(signRequest.getSignCert())));
                if (signCert instanceof X509Certificate) {
                    X509Certificate x509Cert = (X509Certificate)signCert;
                    String certSubject = x509Cert.getSubjectDN().getName();
                    String certSerialNumber = x509Cert.getSerialNumber().toString();
                    String certIssuer = x509Cert.getIssuerDN().getName();
                    String fileInfo = String.format("fileid=%s, filename=%s", signRequest.getFileid(), signRequest.getFilename());
                    try {
                        x509Cert.checkValidity();
                        log.info("\u8bc1\u4e66\u6709\u6548\u671f\u68c0\u67e5\u901a\u8fc7 - \u6587\u4ef6\uff1a{}\uff0c\u8bc1\u4e66\u4e3b\u9898\uff1a{}\uff0c\u8bc1\u4e66\u5e8f\u5217\u53f7\uff1a{}\uff0c\u9881\u53d1\u8005\uff1a{}\uff0c\u751f\u6548\u65e5\u671f\uff1a{}\uff0c\u5931\u6548\u65e5\u671f\uff1a{}", fileInfo, certSubject, certSerialNumber, certIssuer, x509Cert.getNotBefore(), x509Cert.getNotAfter());
                    }
                    catch (CertificateExpiredException e) {
                        log.warn("\u8bc1\u4e66\u5df2\u8fc7\u671f - \u6587\u4ef6\uff1a{}\uff0c\u8bc1\u4e66\u4e3b\u9898\uff1a{}\uff0c\u8bc1\u4e66\u5e8f\u5217\u53f7\uff1a{}\uff0c\u9881\u53d1\u8005\uff1a{}\uff0c\u5931\u6548\u65e5\u671f\uff1a{}\uff0c\u5f53\u524d\u65f6\u95f4\uff1a{}", fileInfo, certSubject, certSerialNumber, certIssuer, x509Cert.getNotAfter(), new Date());
                    }
                    catch (CertificateNotYetValidException e) {
                        log.warn("\u8bc1\u4e66\u5c1a\u672a\u751f\u6548 - \u6587\u4ef6\uff1a{}\uff0c\u8bc1\u4e66\u4e3b\u9898\uff1a{}\uff0c\u8bc1\u4e66\u5e8f\u5217\u53f7\uff1a{}\uff0c\u9881\u53d1\u8005\uff1a{}\uff0c\u751f\u6548\u65e5\u671f\uff1a{}\uff0c\u5f53\u524d\u65f6\u95f4\uff1a{}", fileInfo, certSubject, certSerialNumber, certIssuer, x509Cert.getNotBefore(), new Date());
                    }
                }
                signRequest.setSealfile(new String(Des3Util.decryptMode(new BASE64Decoder().decodeBuffer(signRequest.getSealfile()))));
                signRequest.setFilename(new String(Des3Util.decryptMode(new BASE64Decoder().decodeBuffer(signRequest.getFilename()))));
                OFDUtils.bytesToFile(new BASE64Decoder().decodeBuffer(signRequest.getSealfile()), tmpFilePath + signRequest.getFileid() + ".esl");
                Path sealPath = Paths.get(tmpFilePath, signRequest.getFileid() + ".esl");
                Path src = Paths.get(tmpFilePath, signRequest.getFileid() + ".ofd");
                Path out = Paths.get(tmpFilePath + SIGNEDDIR + File.separator + signRequest.getFileid() + ".ofd", new String[0]);
                com.epoint.ofd.gm.ses.v4.SESeal sealv4 = null;
                SESeal sealv1 = null;
                try {
                    sealv4 = com.epoint.ofd.gm.ses.v4.SESeal.getInstance(Files.readAllBytes(sealPath));
                }
                catch (Exception e) {
                    sealv1 = SESeal.getInstance(Files.readAllBytes(sealPath));
                }
                try (OFDReader reader = new OFDReader(src);){
                    throwable = null;
                    try (OFDSigner signer = new OFDSigner(reader, out, (SignIDProvider)new NumberFormatAtomicSignID());){
                        if (sealv4 != null) {
                            SESV4Container sESV4Container = new SESV4Container(null, sealv4, signCert);
                            signer.setSignContainer(sESV4Container);
                        } else {
                            SESV1Container sESV1Container = new SESV1Container(null, sealv1, signCert);
                            signer.setSignContainer(sESV1Container);
                        }
                        signer.setSignMode(signRequest.getSignMode());
                        if (signRequest.getSignMode().equals((Object)SignMode.EpointMergeSign)) {
                            log.info("\u8bb0\u5f55\u9009\u62e9\u7684\u7b7e\u540d\u6a21\u5f0f\uff1a\u5408\u5e76");
                        } else {
                            log.info("\u6ca1\u9009\u5408\u5e76\u6a21\u5f0f\uff1a");
                        }
                        if (StringUtil.isNotBlank(signRequest.getKeyword())) {
                            List<KeywordPosition> list = KeywordExtractor.getKeyWordPositionList(reader, signRequest.getKeyword());
                            if (list.isEmpty()) {
                                log.info("\u672a\u80fd\u627e\u5230\u5bf9\u5e94\u5173\u952e\u5b57============\u300b" + signRequest.getKeyword());
                                throw new RuntimeException("\u672a\u80fd\u627e\u5230\u5bf9\u5e94\u5173\u952e\u5b57============\u300b" + signRequest.getKeyword());
                            }
                            for (KeywordPosition position : list) {
                                ST_Box box = position.getBox();
                                signer.addApPos(new NormalStampPos(position.getPage(), box.getTopLeftX() + box.getWidth() / 2.0 - 20.0, box.getTopLeftY() + box.getHeight() / 2.0 - 20.0, 40.0, 40.0));
                            }
                        } else {
                            signer.addApPos(new NormalStampPos(signRequest.getPage(), signRequest.getX(), signRequest.getY(), signRequest.getWidth(), signRequest.getHeight()));
                        }
                        signer.exelocalSign(sigVal, signRequest.getToSign());
                    }
                    catch (Throwable throwable2) {
                        throwable = throwable2;
                        throw throwable2;
                    }
                }
                if (sealv4 != null) {
                    reader = new OFDReader(out);
                    var14_19 = null;
                    try {
                        validator2 = new OFDValidator(reader);
                        throwable = null;
                        try {
                            validator2.setValidator(new SESV4ValidateContainer());
                            validator2.exeValidate();
                            break block91;
                        }
                        catch (Throwable throwable3) {
                            throwable = throwable3;
                            throw throwable3;
                        }
                        finally {
                            if (validator2 != null) {
                                if (throwable != null) {
                                    try {
                                        validator2.close();
                                    }
                                    catch (Throwable throwable4) {
                                        throwable.addSuppressed(throwable4);
                                    }
                                } else {
                                    validator2.close();
                                }
                            }
                        }
                    }
                    catch (Throwable validator2) {
                        var14_19 = validator2;
                        throw validator2;
                    }
                    finally {
                        if (reader != null) {
                            if (var14_19 != null) {
                                try {
                                    reader.close();
                                }
                                catch (Throwable validator2) {
                                    var14_19.addSuppressed(validator2);
                                }
                            } else {
                                reader.close();
                            }
                        }
                    }
                }
                reader = new OFDReader(out);
                var14_19 = null;
                try {
                    validator2 = new OFDValidator(reader);
                    throwable = null;
                    try {
                        validator2.setValidator(new SESV1ValidateContainer());
                        validator2.exeValidate();
                    }
                    catch (Throwable throwable5) {
                        throwable = throwable5;
                        throw throwable5;
                    }
                    finally {
                        if (validator2 != null) {
                            if (throwable != null) {
                                try {
                                    validator2.close();
                                }
                                catch (Throwable throwable6) {
                                    throwable.addSuppressed(throwable6);
                                }
                            } else {
                                validator2.close();
                            }
                        }
                    }
                }
                catch (Throwable throwable7) {
                    var14_19 = throwable7;
                    throw throwable7;
                }
                finally {
                    if (reader != null) {
                        if (var14_19 != null) {
                            try {
                                reader.close();
                            }
                            catch (Throwable throwable8) {
                                var14_19.addSuppressed(throwable8);
                            }
                        } else {
                            reader.close();
                        }
                    }
                }
            }
            File infile = new File(tmpFilePath + SIGNEDDIR + File.separator + signRequest.getFileid() + ".ofd");
            File outfile = new File(tmpFilePath + signRequest.getFileid() + ".ofd");
            FileCopyUtils.copy(infile, outfile);
        }
        catch (Exception e) {
            log.error("\u7b7e\u7ae0\u5f02\u5e38\uff1a", e);
            return AjaxResult.error("\u7b7e\u7ae0\u5f02\u5e38", e.getMessage()).toString();
        }
        long end = System.currentTimeMillis();
        long duration = end - start;
        log.info("OFD\u672c\u5730\u7b7e\u540d\u7ed3\u675f===========================>fileid" + signRequest.getFileid() + "\u5f53\u524d\u65f6\u95f4" + new Date());
        log.info("OFD\u672c\u5730\u7b7e\u540d\u8017\u65f6===========================>" + duration + "ms");
        return AjaxResult.success("\u7b7e\u7ae0\u6210\u529f").toString();
    }

    /*
     * Exception decompiling
     */
    @ApiOperation(value="\u83b7\u53d6\u7b7e\u540d\u539f\u6587")
    @ValidateToken
    @EnableStopWatch
    @PostMapping(value={"/gettobsign"})
    public String getToBSign(@RequestBody SignRequest signRequest) throws IOException {
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

    @ApiOperation(value="OFD\u8f6c\u56fe\u7247\u76ee\u524d\u53ea\u652f\u6301jpg")
    @EnableStopWatch
    @ValidateToken
    @PostMapping(value={"/convertofd2img"})
    public String ConvertOfd2Img(String fileid, String token) {
        ArrayList<String> list = new ArrayList<String>();
        try {
            String tempfilepath = OfdConfig.getTempfilepath() + File.separator + this.sdf.format(new Date()).substring(0, 8) + File.separator;
            String infilePath = tempfilepath + fileid + ".ofd";
            com.epoint.ofdbox.core.OFDReader reader = new com.epoint.ofdbox.core.OFDReader();
            reader.getConfig().setValid(false);
            OFD ofd = reader.read(new File(infilePath));
            Ofd2Img ofd2Img = new Ofd2Img();
            ofd2Img.getConfig().setDrawBoundary(false);
            String tmpfileid = "";
            for (Page page : ofd.getDocuments().get(0).getPages()) {
                BufferedImage image = ofd2Img.toImage(page, 30);
                tmpfileid = UUID.randomUUID().toString();
                ImageIO.write((RenderedImage)image, "JPEG", new FileOutputStream(new File(tempfilepath, tmpfileid + ".jpg")));
                list.add(tmpfileid);
            }
        }
        catch (Exception e) {
            return AjaxResult.error("ofd\u8f6c\u56fe\u7247\u5931\u8d25", e.getMessage().toString()).toString();
        }
        return AjaxResult.success("ofd\u8f6cjpg\u6210\u529f", JSON.toJSONString(list)).toString();
    }

    @ApiOperation(value="OFD\u5408\u5e76")
    @EnableStopWatch
    @ValidateToken
    @PostMapping(value={"/mergeofd"})
    public String MergeOfd(String srcfileid, String targetfileid, String token) throws IOException {
        Map<Object, Object> map_license = new HashMap();
        map_license = LicenseUtil.licenseCheck(token.split("\\|\\|")[1]);
        String danweiname = (String)map_license.get("licdesc");
        if (StringUtil.isNotBlank(danweiname)) {
            if (danweiname.indexOf(",") != -1) {
                danweiname = danweiname.substring(0, danweiname.indexOf(","));
            }
        } else {
            danweiname = "OFD\u670d\u52a1\u672a\u6388\u6743";
        }
        String tempfilepath = OfdConfig.getTempfilepath() + File.separator + this.sdf.format(new Date()).substring(0, 8) + File.separator;
        String srcfilePath = tempfilepath + srcfileid + ".ofd";
        String targetfilePath = tempfilepath + targetfileid + ".ofd";
        HashMap<String, String> fontconvertmap = new HashMap<String, String>();
        Path src = Paths.get(srcfilePath, new String[0]);
        Path target = Paths.get(targetfilePath, new String[0]);
        try (OFDReader srcreader = new OFDReader(src);
             OFDReader targetreader = new OFDReader(target);){
            OFDDir srcofdDir = srcreader.getOFDDir();
            DocDir srcdocDir = srcofdDir.obtainDocDefault();
            OFDDir targetofdDir = targetreader.getOFDDir();
            DocDir targetdocDir = targetofdDir.obtainDocDefault();
            int srccount = srcreader.getNumberOfPages();
            int targetcount = targetreader.getNumberOfPages();
            Document srcdoc = srcdocDir.getDocument();
            Document targetdoc = targetdocDir.getDocument();
            Pages pages = targetdoc.getPages();
            AtomicInteger MaxUnitID = new AtomicInteger(0);
            int srcint = srcdoc.getCommonData().getMaxUnitID().getId().intValue();
            int targetint = targetdoc.getCommonData().getMaxUnitID().getId().intValue();
            MaxUnitID = new AtomicInteger(srcint > targetint ? srcint : targetint);
            Res targetPublicRes = targetdocDir.getPublicRes();
            Fonts targetfonts = targetPublicRes.getFonts().get(0);
            List<CT_Font> ct_fontList = srcdocDir.getPublicRes().getFonts().get(0).getFonts();
            for (CT_Font cT_Font : ct_fontList) {
                fontconvertmap.put(cT_Font.getID().toString(), String.valueOf(MaxUnitID.incrementAndGet()));
                cT_Font.setID(MaxUnitID.intValue());
                try {
                    if (cT_Font.getFontFile() == null) {
                        targetfonts.addFont(new CT_Font().setFontName(cT_Font.getFontName()).setID(cT_Font.getID()));
                        continue;
                    }
                    targetfonts.addFont(new CT_Font().setFontName(cT_Font.getFontName()).setID(cT_Font.getID()).setFontFile("tmp/" + cT_Font.getFontFile()));
                }
                catch (Exception e) {
                    log.error("\u8bb0\u5f55\u5f02\u5e38addFont\uff1a", e);
                }
            }
            targetdocDir.setPublicRes(targetPublicRes);
            try {
                Collection<File> listfiles = FileUtils.listFiles(new File(srcreader.getWorkDir() + File.separator + "Doc_0/Res"), null, true);
                for (File file : listfiles) {
                    if (file.getName().contains(".otf") || file.getName().contains(".ttf") || file.getName().contains(".fon") || file.getName().contains(".ttc") || file.getName().contains(".woff") || file.getName().contains(".eot")) {
                        FileUtils.copyFileToDirectory(file, new File(targetreader.getWorkDir() + File.separator + "Doc_0/Res/tmp"));
                        continue;
                    }
                    FileUtils.copyFileToDirectory(file, new File(targetreader.getWorkDir() + File.separator + "Doc_0/Res"));
                }
            }
            catch (Exception e) {
                log.error("\u6587\u4ef6\u4e0d\u5b58\u5728", e);
            }
            HashMap multimediaconvertmap = new HashMap();
            Res res = targetdocDir.getDocumentRes();
            OFDResource targetresource = res.getResources().get(0);
            MultiMedias targetMultiMedias = (MultiMedias)targetresource;
            Res srcDocumentRes = srcdocDir.getDocumentRes();
            OFDResource srcresource = srcDocumentRes.getResources().get(0);
            MultiMedias srcMultiMedias = (MultiMedias)srcresource;
            AtomicInteger finalMaxUnitID = MaxUnitID;
            srcMultiMedias.getMultiMedias().stream().forEach(ct_multiMedia -> {
                CT_MultiMedia ct_multiMediatemp = new CT_MultiMedia();
                int id = finalMaxUnitID.incrementAndGet();
                multimediaconvertmap.put(String.valueOf(ct_multiMedia.getID()), String.valueOf(id));
                ct_multiMediatemp.setID(new ST_ID(id));
                ct_multiMediatemp.setFormat(ct_multiMedia.getFormat());
                ct_multiMediatemp.setType(ct_multiMedia.getType());
                ct_multiMediatemp.setMediaFile(ct_multiMedia.getMediaFile());
                targetMultiMedias.addMultiMedia(ct_multiMediatemp);
            });
            for (int i = 1; i <= srccount; ++i) {
                int count = targetcount++;
                pages.addPage(new com.epoint.ofd.core.basicStructure.pageTree.Page(MaxUnitID.incrementAndGet(), String.format("Pages/Page_%s/Content.xml", count)));
                Path path = Paths.get(srcreader.getWorkDir() + File.separator + "Doc_0/Pages/" + String.format("Page_%s", i - 1), "Content.xml");
                Path targetpath = Paths.get(targetreader.getWorkDir() + File.separator + "Doc_0/Pages/" + String.format("Page_%s", count), new String[0]);
                VirtualContainer virtualtarget = new VirtualContainer(targetpath);
                virtualtarget.putFile(path);
                byte[] contentBin = Files.readAllBytes(virtualtarget.getFile("Content.xml"));
                String content = new String(contentBin);
                for (Map.Entry entry : fontconvertmap.entrySet()) {
                    content = content.replace("Font=\"" + (String)entry.getKey() + "\"", "Font=\"" + (String)entry.getValue() + "\"");
                }
                for (Map.Entry entry : multimediaconvertmap.entrySet()) {
                    content = content.replace("ResourceID=\"" + (String)entry.getKey() + "\"", "ResourceID=\"" + (String)entry.getValue() + "\"");
                }
                Files.write(Paths.get(targetreader.getWorkDir() + File.separator + "Doc_0/Pages/" + String.format("Page_%s", count) + File.separator + "Content.xml", new String[0]), content.getBytes(), new OpenOption[0]);
            }
            targetdoc.setPages(pages);
            CT_CommonData commonData = targetdoc.getCommonData();
            commonData.setMaxUnitID(MaxUnitID.intValue());
            targetdoc.setCommonData(commonData);
            targetdocDir.setDocument(targetdoc);
            targetdocDir.flush();
            targetofdDir.jar(target);
            this.addAttachmentsFromSrcOFD(src, target);
        }
        catch (IOException | DocumentException e) {
            log.error("ofd\u5408\u5e76\u5931\u8d25", e);
            return AjaxResult.error("ofd\u5408\u5e76\u5931\u8d25", e.getMessage()).toString();
        }
        String watermarkfilepath = targetfilePath.replace(".ofd", "temp.ofd");
        log.info("\u5f00\u59cb\u52a0\u6c34\u5370" + targetfilePath + "@" + watermarkfilepath + "@" + danweiname);
        try {
            OFDUtils.addWatermark(targetfilePath, watermarkfilepath, danweiname);
        }
        catch (IOException e) {
            log.error("ofd\u6c34\u5370\u6dfb\u52a0\u5931\u8d25", e);
            return AjaxResult.error("ofd\u5408\u5e76\u5931\u8d25", e.getMessage()).toString();
        }
        File infile = new File(watermarkfilepath);
        File outfile = new File(targetfilePath);
        FileCopyUtils.copy(infile, outfile);
        return AjaxResult.success("ofd\u5408\u5e76\u6210\u529f").toString();
    }

    private void addAttachmentsFromSrcOFD(Path src, Path target) throws IOException {
        try (OFDReader srcreader = new OFDReader(src);
             OFDReader targetreader = new OFDReader(target);
             OFDDoc targetofdDoc = new OFDDoc(targetreader, target);){
            List<CT_Attachment> attachments = srcreader.getAttachments(srcreader.getResourceLocator());
            if (attachments != null) {
                Path path = null;
                for (CT_Attachment attachment : attachments) {
                    path = attachment.getFileLoc().toString().contains("Doc_0") ? Paths.get(srcreader.getWorkDir() + "" + attachment.getFileLoc(), new String[0]) : Paths.get(srcreader.getWorkDir() + File.separator + "Doc_0/" + attachment.getFileLoc(), new String[0]);
                    targetofdDoc.addAttachment(new Attachment(attachment.getAttachmentName(), path));
                }
            }
        }
    }

    @ApiOperation(value="\u6dfb\u52a0\u6c34\u5370")
    @EnableStopWatch
    @ValidateToken
    @PostMapping(value={"/addwatermark"})
    public String AddWaterMark(@RequestBody WaterMarkRequest waterMarkRequest) {
        String tempfilepath = OfdConfig.getTempfilepath() + File.separator + this.sdf.format(new Date()).substring(0, 8) + File.separator;
        String srcfilePath = tempfilepath + waterMarkRequest.getFileid() + ".ofd";
        String targetfilePath = tempfilepath + waterMarkRequest.getFileid() + "_mark.ofd";
        Path srcP = Paths.get(srcfilePath, new String[0]);
        Path outP = Paths.get(targetfilePath, new String[0]);
        try (OFDReader reader = new OFDReader(srcP);
             OFDDoc ofdDoc = new OFDDoc(reader, outP);){
            Watermark watermark = new Watermark(ofdDoc.getPageLayout()).setValue(waterMarkRequest.getValue()).setFontName(waterMarkRequest.getFontname()).setColor(waterMarkRequest.getColor()).setFontWeight(waterMarkRequest.getFontweight()).setGlobalAlpha(waterMarkRequest.getGlobalalpha()).setAngle(waterMarkRequest.getAngle()).setFontSize(waterMarkRequest.getFontsize()).setIntervalX(waterMarkRequest.getIntervalx()).setIntervalY(waterMarkRequest.getIntervaly());
            ofdDoc.addWatermark(watermark);
        }
        catch (Exception e) {
            return AjaxResult.error("ofd\u6dfb\u52a0\u6c34\u5370\u5931\u8d25", e.getMessage()).toString();
        }
        try {
            File infile = new File(targetfilePath);
            File outfile = new File(srcfilePath);
            FileCopyUtils.copy(infile, outfile);
        }
        catch (Exception e) {
            return AjaxResult.error("ofd\u6dfb\u52a0\u6c34\u5370\u5931\u8d25", e.getMessage()).toString();
        }
        return AjaxResult.success("\u52a0\u6c34\u5370\u6210\u529f").toString();
    }

    @ApiOperation(value="\u9a8c\u8bc1\u7b7e\u540d")
    @EnableStopWatch
    @ValidateToken
    @PostMapping(value={"/validatesign"})
    public String ValidateSign(String fileid, String token) {
        String tempfilepath = OfdConfig.getTempfilepath() + File.separator + this.sdf.format(new Date()).substring(0, 8) + File.separator;
        String srcfilePath = tempfilepath + fileid + ".ofd";
        Path srcP = Paths.get(srcfilePath, new String[0]);
        try (OFDReader reader = new OFDReader(srcP);
             OFDValidator validator = new OFDValidator(reader);){
            validator.setValidator(new SESV4ValidateContainer());
            validator.exeValidate();
        }
        catch (Exception e) {
            return AjaxResult.error("ofd\u9a8c\u8bc1\u7b7e\u540d\u5931\u8d25", e.getMessage()).toString();
        }
        return AjaxResult.success("ofd\u9a8c\u8bc1\u6210\u529f").toString();
    }
}


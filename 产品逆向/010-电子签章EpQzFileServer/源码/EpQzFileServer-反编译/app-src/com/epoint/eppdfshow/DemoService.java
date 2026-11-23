/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.eppdfshow;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.alibaba.fastjson.parser.Feature;
import com.epoint.configuration.EpointConfig;
import com.epoint.eppdfshow.SealInfo;
import com.epoint.eppdfshow.test.EpSignatureExtApiTest;
import com.epoint.epqz.file.FileValidator;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.annotation.ToBeHighlightBlock;
import com.epoint.epsignature.bean.sign.SignatureInfo;
import com.epoint.epsignature.pdfoper.PDFFactory;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.IOUtils;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PdfValidator;
import com.epoint.gmhelper.SM4Util;
import com.epoint.gmhelper.bouncycastle.jce.provider.BouncyCastleProvider;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.util.TokenUtil;
import com.epoint.itextpdf.text.pdf.AcroFields;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Security;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value={"/demoservice"})
@CrossOrigin
@SpringBootApplication
public class DemoService {
    private static final Logger log = LoggerFactory.getLogger(DemoService.class);
    @Autowired
    private EpointConfig epointConfig;

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    @RequestMapping(value={"/fileupload"}, method={RequestMethod.POST})
    public String fileUpload(MultipartFile file) {
        if (file == null) return "未获取到上传的文件，请重新上传！";
        if (file.isEmpty()) {
            return "未获取到上传的文件，请重新上传！";
        }
        String error = FileValidator.validatePdfFile(file);
        if (error != null) {
            return error;
        }
        try (InputStream fis = file.getInputStream();){
            String name = Paths.get(file.getOriginalFilename(), new String[0]).getFileName().toString();
            File targetFile = Paths.get("static", "File", name).toFile();
            if (!targetFile.getParentFile().exists()) {
                targetFile.getParentFile().mkdirs();
            }
            Path targetPath = targetFile.toPath();
            Files.copy(fis, targetPath, StandardCopyOption.REPLACE_EXISTING);
            String string = "文件上传成功！";
            return string;
        }
        catch (Exception e) {
            e.printStackTrace();
            return "文件上传失败：" + e.getMessage();
        }
    }

    @RequestMapping(value={"/getannotcount"}, method={RequestMethod.POST})
    public String getAnnotCount(MultipartFile file) {
        String error = FileValidator.validatePdfFile(file);
        if (error != null) {
            return error;
        }
        byte[] b = null;
        int count = 0;
        try {
            File tempFile;
            if (file != null) {
                b = file.getBytes();
                tempFile = File.createTempFile("example", ".txt");
                try (FileOutputStream fos = new FileOutputStream(tempFile);){
                    fos.write(b);
                }
                var7_8 = null;
                try (FileInputStream inputStream = new FileInputStream(tempFile);){
                    count = EpSignatureApi.getPdfSealCount(inputStream);
                }
                catch (Throwable throwable) {
                    var7_8 = throwable;
                    throw throwable;
                }
            }
            return "请先上传文件，再点击解析PDF文件个数！";
            tempFile.delete();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return String.valueOf("印章数量======》" + count);
    }

    @RequestMapping(value={"/getpagesizelst"}, method={RequestMethod.POST})
    public String getPageSizeLst(MultipartFile file) {
        String error = FileValidator.validatePdfFile(file);
        if (error != null) {
            return error;
        }
        byte[] b = null;
        List<Object> pageSizeLst = new ArrayList();
        try {
            File tempFile;
            if (file != null) {
                b = file.getBytes();
                tempFile = File.createTempFile("example", ".txt");
                try (FileOutputStream fos = new FileOutputStream(tempFile);){
                    fos.write(b);
                }
                var7_8 = null;
                try (FileInputStream inputStream = new FileInputStream(tempFile);){
                    pageSizeLst = EpSignatureApi.getPageSizeLst(inputStream);
                }
                catch (Throwable throwable) {
                    var7_8 = throwable;
                    throw throwable;
                }
            }
            return "请先上传文件，再点击解析PDF页面尺寸！";
            tempFile.delete();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return String.valueOf("PDF文件页面尺寸======》" + JSONUtils.bean2json(pageSizeLst));
    }

    @RequestMapping(value={"/initreqdata"}, method={RequestMethod.POST})
    public String initReqData(@RequestBody String params) throws Exception {
        try {
            Map map_req = JSONUtils.json2bean(params, Map.class);
            String filepath = (String)map_req.get("path");
            String enPath = Base64Util.encode(SM4Util.encrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), filepath.getBytes("UTF-8")));
            String token = TokenUtil.createToken(this.epointConfig.getAppkey(), this.epointConfig.getAppsecret(), "");
            HashMap<String, String> rtn = new HashMap<String, String>();
            rtn.put("path", enPath);
            rtn.put("token", token);
            return JSONUtils.bean2json(rtn);
        }
        catch (Exception e) {
            return "";
        }
    }

    public static File getRootPath() {
        File path = null;
        try {
            path = new File(ResourceUtils.getURL("classpath:").getPath());
            if (!path.exists()) {
                path = new File("");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return path;
    }

    @RequestMapping(value={"/pdfanalysis"}, method={RequestMethod.POST})
    public String pdfAnalysis(MultipartFile file) {
        String error = FileValidator.validatePdfFile(file);
        if (error != null) {
            return error;
        }
        byte[] b = null;
        try {
            if (file != null) {
                b = file.getBytes();
                PdfReader reader = new PdfReader(b);
                AcroFields fields = reader.getAcroFields();
                ArrayList<String> names = fields.getSignatureNames();
                ArrayList maplist = new ArrayList();
                for (String name : names) {
                    HashMap<String, Object> map = new HashMap<String, Object>();
                    PdfValidator pdfvalidator = PdfValidator.getInstance(fields, name, reader);
                    Map<String, String> extmap = pdfvalidator.getExDatas();
                    map.put("extdata", extmap);
                    if ("PKCS7".equals(pdfvalidator.getStructtype().name())) {
                        map.put("structtype", "PKCS7");
                    } else {
                        map.put("structtype", "GMV4");
                    }
                    String signed = "";
                    String org = "";
                    String entity = "";
                    boolean verify = false;
                    if (!pdfvalidator.verify()) {
                        org = pdfvalidator.getOrgData();
                        signed = pdfvalidator.getSignData();
                        X509Certificate cert_ = pdfvalidator.getSigningCertificate();
                        entity = Base64Util.encode(cert_.getEncoded());
                        verify = EpSignatureApi.verifySign(org, entity, signed);
                    } else {
                        verify = pdfvalidator.verify();
                    }
                    map.put("verify", verify + "");
                    map.put("sealname", name);
                    maplist.add(map);
                }
                return JSONUtils.bean2json(maplist);
            }
            return "未获取到上传的文件，请重新上传！";
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return "文件上传失败，请重新上传！";
        }
    }

    @RequestMapping(value={"/degist"}, method={RequestMethod.POST})
    public String degist(@RequestBody String filepaths) throws Exception {
        String[] filepathArray = filepaths.split(";");
        ArrayList oraarray = new ArrayList();
        for (String path : filepathArray) {
            HashMap<String, String> map = new HashMap<String, String>();
            String path_de = "";
            try {
                path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(path)));
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
                return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
            }
            byte[] b = IOUtils.getBytes(this.epointConfig.getFilepath() + path_de);
            String digest = Base64Util.encode(EpSignatureApi.pdfDeigst(b).getBytes("utf-8"));
            map.put("oid", path);
            map.put("org", digest);
            map.put("desc", "batch");
            map.put("signed", "");
            oraarray.add(map);
        }
        return JSONUtils.bean2json(oraarray);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequestMapping(value={"/mergePdf"}, method={RequestMethod.POST})
    public String mergePdf(@RequestBody String qzsigninfos) throws Exception {
        FilterOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        ArrayList<String> listArray = new ArrayList<String>();
        List<Map<String, String>> list = JSON.parseObject(qzsigninfos, new TypeReference<List<Map<String, String>>>(){}, new Feature[0]);
        for (Map<String, String> map : list) {
            try {
                String path_de = "";
                try {
                    path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(map.get("oid"))));
                }
                catch (Exception e) {
                    log.error(e.getMessage(), e);
                    String string = JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
                    if (bos != null) {
                        try {
                            bos.close();
                        }
                        catch (IOException e2) {
                            log.error(e2.getMessage(), e2);
                        }
                    }
                    if (fos != null) {
                        try {
                            fos.close();
                        }
                        catch (IOException e3) {
                            log.error(e3.getMessage(), e3);
                        }
                    }
                    return string;
                }
                byte[] pdfByte = IOUtils.getBytes(this.epointConfig.getFilepath() + path_de);
                ArrayList<String> signinfos = new ArrayList<String>();
                PdfReader reader = new PdfReader(pdfByte);
                int pageNum = reader.getNumberOfPages();
                SealInfo info = JSONUtils.json2bean(map.get("signdata"), SealInfo.class);
                List<SignatureInfo> listSignatureInfo = info.getVerify();
                for (SignatureInfo signatureInfo : listSignatureInfo) {
                    if (signatureInfo.getPage() <= pageNum) continue;
                    signatureInfo.setPage(pageNum);
                    signatureInfo.getPos().setPage(pageNum);
                }
                signinfos.add(JSONUtils.bean2json(info));
                byte[] mergedPdf = EpSignatureApi.WXMerge(pdfByte, signinfos);
                String filep = this.epointConfig.getFilepath() + path_de.replace(".pdf", "_signed11.pdf");
                file = new File(filep);
                fos = new FileOutputStream(file);
                bos = new BufferedOutputStream(fos);
                bos.write(mergedPdf);
                listArray.add(filep);
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
                if (fos == null) continue;
                try {
                    fos.close();
                }
                catch (IOException e) {
                    log.error(e.getMessage(), e);
                }
            }
        }
        return JSONUtils.bean2json(listArray);
    }

    @RequestMapping(value={"/addHighlight"}, method={RequestMethod.POST})
    public String addHighlight(@RequestBody String param) throws Exception {
        try {
            Map map = JSONUtils.json2bean(param, HashMap.class);
            String path_de = "";
            try {
                path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode((String)map.get("highlightpath"))));
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
                return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
            }
            String poslist = (String)map.get("highlightparam");
            List<ToBeHighlightBlock> positionLst = DemoService.getPositionLst(poslist);
            FileInputStream fileInputStream = new FileInputStream(this.epointConfig.getFilepath() + path_de);
            ByteArrayOutputStream fileOutputStream = EpSignatureApi.addHighlight(positionLst, fileInputStream);
            IOUtils.write2File(fileOutputStream.toByteArray(), this.epointConfig.getFilepath(), path_de.replace(".pdf", "addHighlight.pdf"));
            return this.epointConfig.getFilepath() + path_de.replace(".pdf", "addHighlight.pdf");
        }
        catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    @RequestMapping(value={"/delHighlight"}, method={RequestMethod.POST})
    public String delHighlight(@RequestBody String param) throws Exception {
        try {
            Map map = JSONUtils.json2bean(param, HashMap.class);
            String path_de = "";
            try {
                path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode((String)map.get("delhighlightpath"))));
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
                return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
            }
            String annoationID = (String)map.get("highlightid");
            ArrayList<Integer> pageLst = new ArrayList<Integer>();
            pageLst.add(Integer.valueOf((String)map.get("highlightpagenum")));
            FileInputStream fileInputStream = new FileInputStream(this.epointConfig.getFilepath() + path_de);
            ByteArrayOutputStream fileOutputStream = EpSignatureApi.delHighlightByID(annoationID, pageLst, fileInputStream);
            IOUtils.write2File(fileOutputStream.toByteArray(), this.epointConfig.getFilepath(), path_de.replace(".pdf", "delHighlight.pdf"));
            return this.epointConfig.getFilepath() + path_de.replace(".pdf", "delHighlight.pdf");
        }
        catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    private static List<ToBeHighlightBlock> getPositionLst(String jsonContent) {
        ArrayList<ToBeHighlightBlock> transformedList = new ArrayList<ToBeHighlightBlock>();
        JSONObject root = JSON.parseObject(jsonContent);
        JSONArray resultArray = root.getJSONArray("result");
        for (int i = 0; i < resultArray.size(); ++i) {
            JSONObject resultItem = resultArray.getJSONObject(i);
            JSONObject block = resultItem.getJSONObject("paragraph_structure").getJSONObject("block");
            JSONObject startPointJson = block.getJSONObject("startpoint");
            JSONObject endPointJson = block.getJSONObject("endpoint");
            ToBeHighlightBlock toBeHighlightBlock = new ToBeHighlightBlock();
            ToBeHighlightBlock.Point startPoint = new ToBeHighlightBlock.Point();
            startPoint.setX(startPointJson.getFloat("x").floatValue());
            startPoint.setY(startPointJson.getFloat("y").floatValue());
            ToBeHighlightBlock.Point endPoint = new ToBeHighlightBlock.Point();
            endPoint.setX(endPointJson.getFloat("x").floatValue());
            endPoint.setY(endPointJson.getFloat("y").floatValue());
            toBeHighlightBlock.setStartPoint(startPoint);
            toBeHighlightBlock.setEndPoint(endPoint);
            toBeHighlightBlock.setPg(block.getIntValue("startpageNum"));
            toBeHighlightBlock.setHighLightID(UUID.randomUUID().toString());
            transformedList.add(toBeHighlightBlock);
        }
        return transformedList;
    }

    @RequestMapping(value={"/mergePdfFiles"}, method={RequestMethod.POST})
    public String mergePdfFiles(@RequestBody String filepaths) throws Exception {
        LinkedHashMap<String, InputStream> fileMap = new LinkedHashMap<String, InputStream>();
        String[] filepathArray = filepaths.split(";");
        ArrayList oraarray = new ArrayList();
        for (String path : filepathArray) {
            LinkedHashMap map = new LinkedHashMap();
            String path_de = "";
            try {
                path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(path)));
            }
            catch (Exception e) {
                log.error(e.getMessage(), e);
                return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
            }
            fileMap.put(path_de, new FileInputStream(this.epointConfig.getFilepath() + path_de));
        }
        String filepath = this.epointConfig.getFilepath() + UUID.randomUUID().toString() + ".pdf";
        PDFFactory.mergePdfFiles(fileMap, filepath, false);
        return filepath;
    }

    @RequestMapping(value={"/pdfVerify"}, method={RequestMethod.POST})
    public String pdfVerify(@RequestBody String filepaths) throws Exception {
        String path_de = "";
        try {
            path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(filepaths)));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
        }
        return EpSignatureApi.pdfVerify(IOUtils.getBytes(this.epointConfig.getFilepath() + path_de));
    }

    @RequestMapping(value={"/keysignanalyzesealanchors"}, method={RequestMethod.POST})
    public String keysignanalyzesealanchors(@RequestBody String reqobj) throws Exception {
        Map reqobjMap = JSONUtils.json2bean(reqobj, Map.class);
        String[] KEYWORD = ((String)reqobjMap.get("keySignAnalyzeKeyword")).split(";");
        String filePath = (String)reqobjMap.get("keySignAnalyzePath");
        HashMap map = new HashMap();
        String path_de = "";
        try {
            path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(filePath)));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
        }
        return new EpSignatureExtApiTest().test_keySignAnalyzeSealAnchors(KEYWORD, this.epointConfig.getFilepath() + path_de);
    }

    @RequestMapping(value={"/posSignAnalyzeSealAnchors"}, method={RequestMethod.POST})
    public String posSignAnalyzeSealAnchors(@RequestBody String filePath) throws Exception {
        HashMap map = new HashMap();
        String path_de = "";
        try {
            path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(filePath)));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
        }
        return new EpSignatureExtApiTest().test_posSignAnalyzeSealAnchors(this.epointConfig.getFilepath() + path_de);
    }

    @RequestMapping(value={"/singleSignAnalyzeSealAnchors"}, method={RequestMethod.POST})
    public String singleSignAnalyzeSealAnchors(@RequestBody String filePath) throws Exception {
        HashMap map = new HashMap();
        String path_de = "";
        try {
            path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(filePath)));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
        }
        return new EpSignatureExtApiTest().test_singleSignAnalyzeSealAnchors(this.epointConfig.getFilepath() + path_de);
    }

    @RequestMapping(value={"/multiSignAnalyzeSealAnchors"}, method={RequestMethod.POST})
    public String multiSignAnalyzeSealAnchors(@RequestBody String filePath) throws Exception {
        HashMap map = new HashMap();
        String path_de = "";
        try {
            path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(filePath)));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
        }
        return new EpSignatureExtApiTest().test_multiSignAnalyzeSealAnchors(this.epointConfig.getFilepath() + path_de);
    }

    @RequestMapping(value={"/crossSignAnalyzeSealAnchors"}, method={RequestMethod.POST})
    public String crossSignAnalyzeSealAnchors(@RequestBody String filePath) throws Exception {
        HashMap map = new HashMap();
        String path_de = "";
        try {
            path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(filePath)));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
        }
        return new EpSignatureExtApiTest().test_crossSignAnalyzeSealAnchors(this.epointConfig.getFilepath() + path_de);
    }

    @RequestMapping(value={"/abiao_DetectKeyword"}, method={RequestMethod.POST})
    public String abiao_DetectKeyword(@RequestBody String reqobj) throws Exception {
        Map reqobjMap = JSONUtils.json2bean(reqobj, Map.class);
        String anbiaoJsonStr = (String)reqobjMap.get("abiao_DetectKeywordJson");
        String filePath = (String)reqobjMap.get("abiao_DetectKeywordPath");
        HashMap map = new HashMap();
        String path_de = "";
        try {
            path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(filePath)));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, "解密待签章源PDF路径失败，请确认路径！"));
        }
        return new EpSignatureExtApiTest().test_abiao_DetectKeyword(this.epointConfig.getFilepath() + path_de, anbiaoJsonStr);
    }

    @RequestMapping(value={"/pdfparse"}, method={RequestMethod.POST})
    public String pdfparse(MultipartFile file, String pdftype) {
        String error = FileValidator.validatePdfFile(file);
        if (error != null) {
            return error;
        }
        byte[] b = null;
        String parseInfo = "";
        try {
            File tempFile;
            if (file != null) {
                b = file.getBytes();
                tempFile = File.createTempFile("example", ".txt");
                try (FileOutputStream fos = new FileOutputStream(tempFile);){
                    fos.write(b);
                }
                var8_9 = null;
                try (FileInputStream inputStream = new FileInputStream(tempFile);){
                    parseInfo = EpSignatureApi.pdfVerify(inputStream, pdftype);
                }
                catch (Throwable throwable) {
                    var8_9 = throwable;
                    throw throwable;
                }
            }
            return "请先上传文件，再点击！";
            tempFile.delete();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return parseInfo;
    }

    static {
        Security.addProvider(new BouncyCastleProvider());
    }
}


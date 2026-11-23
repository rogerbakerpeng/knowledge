/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.eppdfshow;

import com.alibaba.fastjson.JSONObject;
import com.epoint.configuration.EpQzFileServerConfig;
import com.epoint.configuration.EpointConfig;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.CertObject;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.service.MCertService;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.IOUtils;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PDFMergeUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.SM4Util;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.util.TokenUtil;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value={"/eppdfshowmobileservice"})
@CrossOrigin
@SpringBootApplication
public class EpPdfShowMobileService {
    private static final Logger log = LoggerFactory.getLogger(EpPdfShowMobileService.class);
    @Autowired
    private EpointConfig epointConfig;
    @Autowired
    private EpQzFileServerConfig epqzfileserverConfig;
    private static MCertService mCertService = null;

    @PostConstruct
    private void setEpQzFileServerConfig() {
        mCertService = new MCertService(this.epqzfileserverConfig.getMcerturl(), this.epqzfileserverConfig.getAppkey(), this.epqzfileserverConfig.getAppsecret());
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
                serverurl = this.epqzfileserverConfig.getEpqzfileserverurl();
            } else {
                String protocol = StringUtil.isNotBlank(this.epqzfileserverConfig.getProtocol()) ? this.epqzfileserverConfig.getProtocol() : request.getScheme();
                String projectname = StringUtil.isNotBlank(this.epqzfileserverConfig.getProjectname()) ? this.epqzfileserverConfig.getProjectname() : "EpQzFileServer";
                serverurl = protocol + "://" + request.getServerName() + ":" + request.getServerPort() + "/" + projectname;
            }
            byte[] pdfByte = IOUtils.getBytes(this.epointConfig.getFilepath() + path_de);
            String pdfbase64 = Base64Util.encode(pdfByte);
            HashMap<String, String> map_ = new HashMap<String, String>();
            map_.put("pdfbase64", pdfbase64);
            map_.put("serverurl", serverurl);
            map_.put("bztpageurl", this.epqzfileserverConfig.getBztpageurl());
            map_.put("packagename", this.epqzfileserverConfig.getPackagename());
            map_.put("sourceTitle", this.epqzfileserverConfig.getSourceTitle());
            return JSONUtils.bean2json(BaseResp.returnSuccess(map_));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, e.getMessage()));
        }
    }

    @RequestMapping(value={"/getseseal"}, method={RequestMethod.POST})
    public String getSeSeal(HttpServletRequest request) {
        String params = "";
        try {
            byte[] by = new byte[request.getContentLength()];
            request.getInputStream().read(by);
            params = new String(by, "UTF-8");
            Map map_req = JSONUtils.json2bean(params, Map.class);
            String st = (String)map_req.get("st");
            String dognum = (String)map_req.get("dognum");
            String token = (String)map_req.get("token");
            if (!TokenUtil.validateToken(token, this.epointConfig.getAppkey(), this.epointConfig.getAppsecret(), "")) {
                return JSONUtils.bean2json(BaseResp.returnError(9999, "token验证失败！"));
            }
            HashMap<String, String> mapReq = new HashMap<String, String>();
            mapReq.put("dognum", dognum);
            String reqInfo = JSONUtils.bean2json(mapReq);
            List<Seal> listSeal = mCertService.getSealImg(reqInfo);
            Optional<Seal> seal = listSeal.stream().filter(item -> st.equals(String.valueOf(item.getSealtype()))).findFirst();
            HashMap<String, Optional<Seal>> map_ = new HashMap<String, Optional<Seal>>();
            map_.put("seal", seal);
            return JSONUtils.bean2json(BaseResp.returnSuccess(map_));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, e.getMessage()));
        }
    }

    @RequestMapping(value={"/createqr"}, method={RequestMethod.POST})
    public String createQr(HttpServletRequest request) {
        String params = "";
        try {
            int bytesRead;
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            while ((bytesRead = request.getInputStream().read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            params = new String(outputStream.toByteArray(), "UTF-8");
            Map map_req = JSONUtils.json2bean(params, Map.class);
            String st = (String)map_req.get("st");
            String page = (String)map_req.get("page");
            String x = (String)map_req.get("x");
            String y = (String)map_req.get("y");
            String dognum = (String)map_req.get("dognum");
            String referer = (String)map_req.get("referer");
            String token = (String)map_req.get("token");
            String sealimg = (String)map_req.get("sealimg");
            String wd = (String)map_req.get("wd");
            if (!TokenUtil.validateToken(token, this.epointConfig.getAppkey(), this.epointConfig.getAppsecret(), "")) {
                return JSONUtils.bean2json(BaseResp.returnError(9999, "token验证失败！"));
            }
            QRInfo qrInfo = new QRInfo();
            qrInfo.setCertobject(new CertObject("", dognum, "", ""));
            qrInfo.setQrcodetype("2");
            ArrayList<QRInfo.SignatureObject> signatureobjects = new ArrayList<QRInfo.SignatureObject>();
            String path = (String)map_req.get("path");
            String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(path)));
            byte[] pdfByte = IOUtils.getBytes(this.epointConfig.getFilepath() + path_de);
            String org = Base64Util.encode(PDFMergeUtil.degist4PDFSign(pdfByte, "SM3"));
            QRInfo.SignatureObject signatureobject = new QRInfo.SignatureObject("", org, "", "手机移动端签章");
            signatureobjects.add(signatureobject);
            qrInfo.setSignatureobjects(signatureobjects);
            HashMap<String, Object> ext = new HashMap<String, Object>();
            ext.put("st", st);
            ext.put("page", page);
            ext.put("x", x);
            ext.put("y", y);
            ext.put("dognum", dognum);
            ext.put("referer", referer);
            ext.put("token", token);
            ext.put("path", path);
            ext.put("sealimg", sealimg);
            ext.put("wd", wd);
            qrInfo.setExt(ext);
            String resp = mCertService.creatQR(qrInfo);
            if (StringUtil.isNotBlank(resp)) {
                JSONObject jsonObject = JSONObject.parseObject(resp);
                String qrcodeid = jsonObject.getJSONObject("custom").getString("qrcodeid");
                HashMap<String, String> map_ = new HashMap<String, String>();
                map_.put("qrcodeid", qrcodeid);
                return JSONUtils.bean2json(BaseResp.returnSuccess(map_));
            }
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, e.getMessage()));
        }
        return "";
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @RequestMapping(value={"/mergepdf"}, method={RequestMethod.POST})
    public String mergePdf(HttpServletRequest request) {
        String params = "";
        FilterOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        try {
            int bytesRead;
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            while ((bytesRead = request.getInputStream().read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            params = new String(outputStream.toByteArray(), "UTF-8");
            Map map_req = JSONUtils.json2bean(params, Map.class);
            String qrcodeid = (String)map_req.get("qrcodeid");
            String resp = mCertService.queryQRresult(qrcodeid);
            if (StringUtil.isBlank(resp)) {
                String string = JSONUtils.bean2json(BaseResp.returnError(9999, "未查询到签章后数据！标识为：" + qrcodeid));
                return string;
            }
            String qrinfoStr = JSONObject.parseObject(resp).getJSONObject("custom").getString("qrinfo");
            QRInfo qrInfo = JSONUtils.json2bean(qrinfoStr, QRInfo.class);
            Map<String, Object> ext = qrInfo.getExt();
            String path = (String)ext.get("path");
            String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(this.epointConfig.getAppsecret()), Base64Util.decode(path)));
            byte[] pdfByte = IOUtils.getBytes(this.epointConfig.getFilepath() + path_de);
            String signimg = (String)ext.get("sealimg");
            List<QRInfo.SignatureObject> signatureobjects = qrInfo.getSignatureobjects();
            String signed = signatureobjects.get(0).getSigned();
            String signcert = JSONObject.parseObject(resp).getJSONObject("custom").getJSONObject("qrinfo").getJSONObject("certobject").getString("signcert");
            String qzinfo = "";
            String wd = (String)ext.get("wd");
            if (StringUtil.isNotBlank(wd)) {
                qzinfo = EpSignatureApi.pdfSignInfo(pdfByte, signimg, signed, signcert, wd);
            } else {
                ArrayList<ComSignReq.Position> posList = new ArrayList<ComSignReq.Position>();
                ComSignReq.Position pos = new ComSignReq.Position();
                pos.setX(Float.parseFloat((String)ext.get("x")));
                pos.setY(Float.parseFloat((String)ext.get("y")));
                pos.setPage(Integer.parseInt((String)ext.get("page")));
                posList.add(pos);
                qzinfo = EpSignatureApi.pdfSignInfoByPos(pdfByte, signimg, signed, signcert, posList);
            }
            ArrayList<String> signinfos = new ArrayList<String>();
            signinfos.add(qzinfo);
            byte[] mergedPdf = EpSignatureApi.WXMerge(pdfByte, signinfos);
            if (mergedPdf == null || mergedPdf.length <= 0) {
                String string = JSONUtils.bean2json(BaseResp.returnError(9999, "签章失败，请确认信息是否准确！"));
                return string;
            }
            String savepath = "";
            savepath = StringUtil.isNotBlank(this.epqzfileserverConfig.getIsCoverSrc()) && "true".equals(this.epqzfileserverConfig.getIsCoverSrc()) ? path_de : path_de.replace(".pdf", "_signed.pdf");
            file = new File(this.epointConfig.getFilepath() + savepath);
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(mergedPdf);
            String pdfbase64 = Base64Util.encode(mergedPdf);
            String referer = (String)ext.get("referer");
            referer = referer + (referer.indexOf(63) > 0 ? "&" : "?") + "signstatus = 1";
            HashMap<String, String> map_ = new HashMap<String, String>();
            map_.put("pdfbase64", pdfbase64);
            map_.put("referer", referer);
            String string = JSONUtils.bean2json(BaseResp.returnSuccess(map_));
            return string;
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            String string = JSONUtils.bean2json(BaseResp.returnError(9999, e.getMessage()));
            return string;
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

    @RequestMapping(value={"/queryqrresult"}, method={RequestMethod.POST})
    public String queryQRresult(HttpServletRequest request) {
        String params = "";
        try {
            int bytesRead;
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            while ((bytesRead = request.getInputStream().read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            params = new String(outputStream.toByteArray(), "UTF-8");
            Map map_req = JSONUtils.json2bean(params, Map.class);
            String qrcodeid = (String)map_req.get("qrcodeid");
            String resp = mCertService.queryQRresult(qrcodeid);
            if (StringUtil.isBlank(resp)) {
                return JSONUtils.bean2json(BaseResp.returnError(9999, "未查询到签章后数据！标识为：" + qrcodeid));
            }
            String qrstatus = JSONObject.parseObject(resp).getJSONObject("custom").getString("qrstatus");
            return JSONUtils.bean2json(BaseResp.returnSuccess(qrstatus));
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            return JSONUtils.bean2json(BaseResp.returnError(9999, e.getMessage()));
        }
    }
}


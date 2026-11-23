/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.cloudsign.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.configuration.EpQzFileServerConfig;
import com.epoint.dataex.bizlogic.DataExImpl;
import com.epoint.epqz.cloudsign.aspect.annoation.CloudSignValidateAnnoation;
import com.epoint.epqz.cloudsign.model.DownloadFileRequest;
import com.epoint.epqz.cloudsign.model.SignFileRequest;
import com.epoint.epqz.cloudsign.model.UploadFileRequest;
import com.epoint.epqz.filedecrypt.enums.ResponseEnum;
import com.epoint.epsignature.actions.impl.CommonServerSealActions;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.MatchItem;
import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.bean.sign.impl.KeyFindUtil;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PDFMergeUtil;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gmhelper.util.TokenUtil;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.Image;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.ztb.common.config.OfdConfig;
import com.epoint.ztb.convert.utils.HttpUtil;
import com.epoint.ztb.epqz.pdf.enums.StatusCodeEnum;
import com.epoint.ztb.web.domain.AjaxResult;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CloudSignService {
    private static final Logger log = LoggerFactory.getLogger(CloudSignService.class);
    private static final float TRANS_SCALE = 0.8f;
    private static final String QUERY_CLOUD_CERT_URL = "/rest/epqzservice/v2/user/querycloudcert";
    private static final String ONE_GET_SEALIMG_URL = "/rest/epqzservice/v3/seal/onegetsealimg";
    private static final String ONE_APPLY_CERT_URL = "/rest/epqzservice/v2/cert/oneapplycert";
    private static final String ONE_SIGN_DATA_URL = "/rest/epqzservice/v3/cert/onesigndata";
    @Autowired
    private EpQzFileServerConfig epQzFileServerConfig;
    private static final String SIGNEDDIR = "signed";

    @CloudSignValidateAnnoation(value="PDF云签章上传文件")
    public String uploadFile(UploadFileRequest request) {
        try {
            DataExImpl dataEx = new DataExImpl();
            dataEx.filetransfer(JSONObject.parseObject(JSONUtils.bean2json(request)));
        }
        catch (Exception e) {
            log.error("文件上传异常", e);
            return AjaxResult.error(StatusCodeEnum.系统执行出错.getValue(), "文件上传异常").toString();
        }
        return AjaxResult.success("上传成功").toString();
    }

    @CloudSignValidateAnnoation(value="PDF云签章一键签章")
    public String signFile(SignFileRequest request) {
        try {
            boolean isApplyCloudCert = this.isApplyCloudCert(request);
            boolean applyResult = true;
            if (!isApplyCloudCert) {
                applyResult = this.oneApplyCloudCert(request);
            }
            if (applyResult) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
                String pdfFilePath = OfdConfig.getTempfilepath() + File.separator + sdf.format(new Date()).substring(0, 8) + File.separator + request.getFileid() + ".pdf";
                if (!Files.exists(new File(pdfFilePath).toPath(), new LinkOption[0])) {
                    return AjaxResult.error(StatusCodeEnum.系统执行出错.getValue(), "未找到对应PDF文件").toString();
                }
                String degistBase64Str = Base64Util.encode(PDFMergeUtil.degist4PDFSignWithPdfpath(pdfFilePath, "SM3"));
                JSONObject signedJsonObj = this.oneSignData(request, degistBase64Str);
                PdfReader reader = new PdfReader(pdfFilePath);
                Image image = Image.getInstance(com.epoint.gm.util.Base64Util.decode(request.getSignimg()));
                float width = image.getWidth() * 0.8f;
                float height = image.getHeight() * 0.8f;
                ArrayList<SignInfo> list = new ArrayList<SignInfo>();
                int pageNum = reader.getNumberOfPages();
                for (int index = 1; index <= pageNum; ++index) {
                    List<MatchItem> items = KeyFindUtil.matchPage(reader, (Integer)index, request.getKeyword());
                    for (MatchItem matchItem : items) {
                        SignInfo signInfo = CloudSignService.getSigninfo(reader, index, width, height, matchItem);
                        signInfo.setImage(image);
                        signInfo.setImgbase64(request.getSignimg());
                        list.add(signInfo);
                    }
                }
                File tmpfile = new File(OfdConfig.getTempfilepath() + File.separator + sdf.format(new Date()).substring(0, 8) + File.separator + SIGNEDDIR);
                if (!tmpfile.exists() && !tmpfile.isDirectory()) {
                    tmpfile.mkdirs();
                }
                String signedPath = OfdConfig.getTempfilepath() + File.separator + sdf.format(new Date()).substring(0, 8) + File.separator + SIGNEDDIR + File.separator + request.getFileid() + ".pdf";
                HashMap<String, String> ext = new HashMap<String, String>();
                ext.put("org", degistBase64Str);
                ext.put("signmode", "7");
                String rtnSignedPath = PDFMergeUtil.signatureMergeTmpFile(signedPath, reader, Base64Util.decode(signedJsonObj.getString(SIGNEDDIR)), CertUtils.getX509Certificate(signedJsonObj.getString("signcert")), list, "无", "无", ext);
                reader.close();
                if (StringUtil.isBlank(rtnSignedPath)) {
                    return AjaxResult.error(StatusCodeEnum.系统执行出错.getValue(), "文件签章失败").toString();
                }
            }
        }
        catch (Exception e) {
            log.error("文件签章失败，参数：{}", (Object)JSONUtils.bean2json(request), (Object)e);
            return AjaxResult.error(StatusCodeEnum.系统执行出错.getValue(), "文件签章失败").toString();
        }
        return AjaxResult.success("文件签章成功").toString();
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @CloudSignValidateAnnoation(value="PDF签章后文件下载")
    public String downloadFile(DownloadFileRequest request) {
        try {
            InputStream in = null;
            OutputStream out = null;
            try {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
                String filePath = OfdConfig.getTempfilepath() + File.separator + sdf.format(new Date()).substring(0, 8) + File.separator + SIGNEDDIR + File.separator + request.getFileid() + ".pdf";
                request.getResponse().setContentType("application/x-www-form-urlencoded");
                request.getResponse().setHeader("Content-Disposition", "attachment;filename=" + request.getFilename());
                in = new FileInputStream(filePath);
                out = request.getResponse().getOutputStream();
                int len = 0;
                byte[] buf = new byte[1024];
                while ((len = in.read(buf)) != -1) {
                    out.write(buf, 0, len);
                }
            }
            catch (Exception e) {
                log.error("getfile异常：", e);
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
        catch (Exception e) {
            log.error("文件下载操作失败，参数：{}", (Object)JSONUtils.bean2json(request.getFileid()), (Object)e);
            return AjaxResult.error(StatusCodeEnum.系统执行出错.getValue(), "文件下载异常").toString();
        }
        return AjaxResult.success("文件下载成功").toString();
    }

    private boolean isApplyCloudCert(SignFileRequest request) {
        boolean isApplyCloudCert = false;
        try {
            JSONObject reqJson = new JSONObject();
            reqJson.put("reqid", (Object)UUID.randomUUID().toString());
            reqJson.put("timestamp", (Object)new Date().getTime());
            reqJson.put("platformcode", (Object)request.getCloudAppkey());
            reqJson.put("token", (Object)TokenUtil.createToken(request.getCloudAppkey(), request.getCloudAppsecret(), null));
            JSONObject paramsJson = new JSONObject();
            paramsJson.put("idcard", (Object)request.getIdcard());
            reqJson.put("params", (Object)paramsJson);
            String postData = HttpUtil.doPost(reqJson.toString(), this.epQzFileServerConfig.getHuaweiurl() + QUERY_CLOUD_CERT_URL);
            JSONObject respJson = JSONObject.parseObject(postData);
            if (ResponseEnum.请求成功.getValue().equals(respJson.getInteger("code"))) {
                JSONObject dataJson = JSONObject.parseObject(respJson.getString("params"));
                if (String.valueOf(ResponseEnum.请求成功.getValue()).equals(dataJson.getString("isapply"))) {
                    isApplyCloudCert = true;
                }
            }
        }
        catch (Exception e) {
            log.error("文件签章，参数：{}", (Object)JSONUtils.bean2json(request), (Object)e);
            throw new RuntimeException(e);
        }
        return isApplyCloudCert;
    }

    private boolean oneApplyCloudCert(SignFileRequest request) {
        boolean applyCloudCertRes = false;
        try {
            JSONObject reqJson = new JSONObject();
            reqJson.put("reqid", (Object)UUID.randomUUID().toString());
            reqJson.put("timestamp", (Object)new Date().getTime());
            reqJson.put("platformcode", (Object)request.getCloudAppkey());
            reqJson.put("token", (Object)TokenUtil.createToken(request.getCloudAppkey(), request.getCloudAppsecret(), null));
            JSONObject paramsJson = new JSONObject();
            paramsJson.put("username", (Object)request.getUsername());
            paramsJson.put("idcard", (Object)request.getIdcard());
            paramsJson.put("sealimg", (Object)request.getSignimg());
            paramsJson.put("sendcert", (Object)"1");
            reqJson.put("params", (Object)paramsJson);
            String postData = HttpUtil.doPost(reqJson.toString(), this.epQzFileServerConfig.getHuaweiurl() + ONE_APPLY_CERT_URL);
            JSONObject respJson = JSONObject.parseObject(postData);
            if (ResponseEnum.请求成功.getValue().equals(respJson.getInteger("code"))) {
                applyCloudCertRes = true;
            }
        }
        catch (Exception e) {
            log.error("文件签章，参数：{}", (Object)JSONUtils.bean2json(request), (Object)e);
            throw new RuntimeException(e);
        }
        return applyCloudCertRes;
    }

    private JSONObject oneSignData(SignFileRequest request, String org) {
        JSONObject resJson = new JSONObject();
        try {
            JSONObject dataJson;
            JSONObject reqJson = new JSONObject();
            reqJson.put("reqid", (Object)UUID.randomUUID().toString());
            reqJson.put("timestamp", (Object)new Date().getTime());
            reqJson.put("platformcode", (Object)request.getCloudAppkey());
            reqJson.put("token", (Object)TokenUtil.createToken(request.getCloudAppkey(), request.getCloudAppsecret(), null));
            JSONObject paramsJson = new JSONObject();
            paramsJson.put("userid", (Object)request.getIdcard());
            paramsJson.put("filename", (Object)request.getFileid());
            ArrayList<JSONObject> toSignList = new ArrayList<JSONObject>();
            JSONObject toSignJson = new JSONObject();
            toSignJson.put("org", (Object)org);
            toSignList.add(toSignJson);
            paramsJson.put("signobjs", (Object)toSignList);
            reqJson.put("params", (Object)paramsJson);
            String postData = HttpUtil.doPost(reqJson.toString(), this.epQzFileServerConfig.getHuaweiurl() + ONE_SIGN_DATA_URL);
            JSONObject respJson = JSONObject.parseObject(postData);
            if (ResponseEnum.请求成功.getValue().equals(respJson.getInteger("code")) && (dataJson = JSONObject.parseObject(respJson.getString("params"))).containsKey("signobjs")) {
                JSONArray signedArray = dataJson.getJSONArray("signobjs");
                if (!signedArray.isEmpty()) {
                    resJson.put(SIGNEDDIR, (Object)JSONObject.parseObject(JSONUtils.bean2json(signedArray.get(0))).getString(SIGNEDDIR));
                }
                String signcert = dataJson.getString("signcert");
                resJson.put("signcert", (Object)signcert);
            }
        }
        catch (Exception e) {
            log.error("文件签章，参数：{}", (Object)JSONUtils.bean2json(request), (Object)e);
            throw new RuntimeException(e);
        }
        return resJson;
    }

    private String oneGetSealImg(SignFileRequest request) {
        String sealimg = "";
        try {
            JSONArray sealArray;
            JSONObject dataJson;
            JSONObject reqJson = new JSONObject();
            reqJson.put("reqid", (Object)UUID.randomUUID().toString());
            reqJson.put("timestamp", (Object)new Date().getTime());
            reqJson.put("platformcode", (Object)request.getCloudAppkey());
            reqJson.put("token", (Object)TokenUtil.createToken(request.getCloudAppkey(), request.getCloudAppsecret(), null));
            JSONObject paramsJson = new JSONObject();
            paramsJson.put("userid", (Object)request.getIdcard());
            reqJson.put("params", (Object)paramsJson);
            String postData = HttpUtil.doPost(reqJson.toString(), this.epQzFileServerConfig.getHuaweiurl() + ONE_GET_SEALIMG_URL);
            JSONObject respJson = JSONObject.parseObject(postData);
            if (ResponseEnum.请求成功.getValue().equals(respJson.getInteger("code")) && (dataJson = JSONObject.parseObject(respJson.getString("params"))).containsKey("seallist") && !(sealArray = dataJson.getJSONArray("seallist")).isEmpty()) {
                sealimg = JSONObject.parseObject(JSONUtils.bean2json(sealArray.get(0))).getString("sealimg");
            }
        }
        catch (Exception e) {
            log.error("文件签章，参数：{}", (Object)JSONUtils.bean2json(request), (Object)e);
            throw new RuntimeException(e);
        }
        return sealimg;
    }

    private static SignInfo getSigninfo(PdfReader reader, int pageIndex, float width, float height, MatchItem matchItem) {
        Rectangle page_size = reader.getPageSize(pageIndex);
        float x = 0.0f;
        float y = 0.0f;
        float heigh = 0.0f;
        float divWidth = 0.0f;
        float divHeight = 0.0f;
        float x_ = 0.0f;
        float y_ = 0.0f;
        Rectangle rect = null;
        if (reader.getPageN(pageIndex).getAsNumber(PdfName.ROTATE) != null) {
            int intValue = reader.getPageN(pageIndex).getAsNumber(PdfName.ROTATE).intValue();
            int n = intValue = (intValue %= 360) < 0 ? intValue + 360 : intValue;
            if (intValue != 180 && intValue != 0) {
                x = matchItem.getY().floatValue();
                y = page_size.getWidth() - matchItem.getX().floatValue();
                heigh = page_size.getWidth();
                divWidth = matchItem.getHeight().floatValue();
                divHeight = matchItem.getWidth().floatValue();
                x_ = x + 3.0f * divWidth / 4.0f;
                y_ = heigh - y + 3.0f * divHeight / 4.0f;
                rect = new Rectangle(x + 3.0f * divWidth / 4.0f - width / 2.0f, y + 3.0f * divHeight / 4.0f - height / 2.0f, x + 3.0f * divWidth / 4.0f + width / 2.0f, y + 3.0f * divHeight / 4.0f + height / 2.0f);
            } else {
                x = matchItem.getX().floatValue();
                y = matchItem.getY().floatValue();
                heigh = page_size.getHeight();
                divWidth = matchItem.getWidth().floatValue();
                divHeight = matchItem.getHeight().floatValue();
                x_ = x + divWidth / 2.0f;
                y_ = heigh - y + divHeight / 2.0f;
                rect = new Rectangle(x + divWidth / 2.0f - width / 2.0f, y + divHeight / 2.0f - height / 2.0f, x + divWidth / 2.0f + width / 2.0f, y + divHeight / 2.0f + height / 2.0f);
            }
        } else {
            x = matchItem.getX().floatValue();
            y = matchItem.getY().floatValue();
            heigh = page_size.getHeight();
            divWidth = matchItem.getWidth().floatValue();
            divHeight = matchItem.getHeight().floatValue();
            x_ = x + divWidth / 2.0f;
            y_ = heigh - y + divHeight / 2.0f;
            rect = new Rectangle(x + divWidth / 2.0f - width / 2.0f, y + divHeight / 2.0f - height / 2.0f, x + divWidth / 2.0f + width / 2.0f, y + divHeight / 2.0f + height / 2.0f);
        }
        return new SignInfo(rect, pageIndex, x_, y_, null, null, SignUtil.getSignName());
    }

    public static String cloudSignInfo(String posturl, String cloudplatformcode, String cloudtokenSecret, byte[] pdfb, String keyword, List<ComSignReq.Position> pos, String serversignext, String organization, String user_id, String userName, String cardNumber, Map<String, String> ext) throws Exception {
        String rst = "";
        CommonServerSealActions commonServerSealActions = new CommonServerSealActions();
        HashMap<String, Object> actionContextMap = new HashMap<String, Object>();
        actionContextMap.put("qzcloudurl", posturl);
        actionContextMap.put("qzcloudplatformcode", cloudplatformcode);
        actionContextMap.put("qzcloudappsecret", cloudtokenSecret);
        commonServerSealActions.init(actionContextMap);
        byte[] degist = PDFMergeUtil.degist4PDFSign(pdfb, "SM3");
        String signed = Base64Util.encode(degist);
        BaseReq sealimgReq = new BaseReq();
        sealimgReq.setAction("CommonServerSealActions.getSealImg");
        HashMap<String, String> sealimgMap = new HashMap<String, String>();
        sealimgMap.put("serversignext", serversignext);
        if (StringUtil.isNotBlank("organization")) {
            sealimgMap.put("organization", organization);
            sealimgMap.put("user_id", user_id);
        } else {
            sealimgMap.put("name", userName);
            sealimgMap.put("id", cardNumber);
        }
        sealimgReq.setRequest(sealimgMap);
        BaseResp sealimgresp = commonServerSealActions.getSealImg(sealimgReq);
        List list_seal = (List)sealimgresp.getCustom();
        if (list_seal == null || list_seal.isEmpty()) {
            throw new RuntimeException("未获取到印章图片！");
        }
        String sealimgbase64 = ((JSONObject)list_seal.get(0)).getString("sealimg");
        if (ext.containsKey("sealwidth") && StringUtil.isNotBlank(ext.get("sealwidth"))) {
            String newsignimg;
            int imgwidth = Integer.parseInt(ext.get("sealwidth"));
            int imgheight = Integer.parseInt(ext.get("sealheight"));
            String oldsignimg = sealimgbase64;
            sealimgbase64 = newsignimg = SignUtil.resizeImage(oldsignimg, imgwidth, imgheight);
        }
        String certdata = ((JSONObject)list_seal.get(0)).getString("certdata");
        BaseReq signDataReq = new BaseReq();
        signDataReq.setAction("CommonServerSealActions.getSignData");
        HashMap<String, String> signDataMap = new HashMap<String, String>();
        signDataMap.put("serversignext", serversignext);
        if (StringUtil.isNotBlank("organization")) {
            signDataMap.put("organization", organization);
            signDataMap.put("user_id", user_id);
        } else {
            signDataMap.put("name", userName);
            signDataMap.put("id", cardNumber);
        }
        signDataMap.put("certdata", certdata);
        signDataMap.put("digest", signed);
        signDataReq.setRequest(signDataMap);
        BaseResp signDataResp = commonServerSealActions.getSignData(signDataReq);
        JSONObject signDataRespObj = JSONObject.parseObject(signDataResp.getCustom().toString());
        String signcert = signDataRespObj.getString("signcert");
        String signature = signDataRespObj.getString("signature");
        if (StringUtil.isNotBlank(keyword)) {
            rst = EpSignatureApi.pdfSignInfo(pdfb, sealimgbase64, signature, signcert, keyword);
        } else if (pos != null) {
            rst = EpSignatureApi.pdfSignInfoByPos(pdfb, sealimgbase64, signature, signcert, pos);
        }
        return rst;
    }
}


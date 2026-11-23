/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.ofd.service;

import com.epoint.epsignature.actions.OFDOutImpl;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.Ofd;
import com.epoint.epsignature.utils.IOUtils;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.SM4Util;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.util.TokenUtil;
import com.epoint.ztb.common.config.EpQzFileServerOfdConfig;
import com.epoint.ztb.common.config.EpointOfdConfig;
import com.epoint.ztb.common.utils.OFDUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags={"MCertOfdService"}, description="\u7ed9\u524d\u7aef\u7528\u7684\u901a\u7528\u63a5\u53e3\u9075\u5faaEpSignature\u7684\u89c4\u8303")
@RestController
@RequestMapping(value={"/mcertofdservice"})
@CrossOrigin
public class MCertOfdService {
    private static final Logger log = LoggerFactory.getLogger(MCertOfdService.class);
    @Autowired
    private EpointOfdConfig epointConfig;
    @Autowired
    private EpQzFileServerOfdConfig epqzfileserverConfig;

    @ApiOperation(value="\u901a\u7528\u5165\u53e3")
    @PostMapping(value={"/doAction"})
    public String doAction(@RequestBody String params) {
        String rtn = "";
        try {
            EpSignatureApi.setPlatFormConfig(this.epqzfileserverConfig.getAppkey(), this.epqzfileserverConfig.getAppsecret());
            EpSignatureApi.setMcertUrl(this.epqzfileserverConfig.getMcerturl());
            System.out.println("\u6807\u8bc1\u901a\u8bf7\u6c42\u5730\u5740\uff1a" + this.epqzfileserverConfig.getMcerturl());
            EpSignatureApi.setOFDOutApi(new OFDOutImpl(){

                @Override
                public String getSealImg(String request) {
                    return null;
                }

                @Override
                public byte[] getOFD(Ofd ofd) {
                    try {
                        Map map_req = JSONUtils.json2bean(ofd.getMsg(), Map.class);
                        String token = (String)map_req.get("token");
                        if (!TokenUtil.validateToken(token, MCertOfdService.this.epointConfig.getAppkey(), MCertOfdService.this.epointConfig.getAppsecret(), "")) {
                            log.error("token\u9a8c\u8bc1\u5931\u8d25\uff01");
                        }
                        String path = (String)map_req.get("path");
                        String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(MCertOfdService.this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                        return IOUtils.getBytes(MCertOfdService.this.epointConfig.getFilepath() + path_de);
                    }
                    catch (Exception e) {
                        log.error(e.getMessage(), e);
                        return null;
                    }
                }

                @Override
                public void dealSignInfo(Ofd OFD2, String signinfo) {
                }

                /*
                 * WARNING - Removed try catching itself - possible behaviour change.
                 */
                @Override
                public void dealOFD(Ofd OFD2, byte[] file) {
                    FilterOutputStream bos = null;
                    FileOutputStream fos = null;
                    File filein = null;
                    Map map_req = JSONUtils.json2bean(OFD2.getMsg(), Map.class);
                    String token = (String)map_req.get("token");
                    if (!TokenUtil.validateToken(token, MCertOfdService.this.epointConfig.getAppkey(), MCertOfdService.this.epointConfig.getAppsecret(), "")) {
                        log.error("token\u9a8c\u8bc1\u5931\u8d25\uff01");
                    }
                    String path = (String)map_req.get("path");
                    try {
                        String path_de = new String(SM4Util.decrypt_Ecb_Padding(Hex.decode(MCertOfdService.this.epointConfig.getAppsecret()), Base64Util.decode(path)));
                        String savepath = "";
                        savepath = StringUtil.isNotBlank(MCertOfdService.this.epqzfileserverConfig.getIsCoverSrc()) && "true".equals(MCertOfdService.this.epqzfileserverConfig.getIsCoverSrc()) ? path_de : path_de.replace(".ofd", "_signed.ofd");
                        filein = new File(MCertOfdService.this.epointConfig.getFilepath() + savepath);
                        fos = new FileOutputStream(filein);
                        bos = new BufferedOutputStream(fos);
                        bos.write(file);
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
            });
            rtn = EpSignatureApi.doActionStatic(params);
        }
        catch (Exception e) {
            log.error("MCertOfdService.doAction\u5f02\u5e38\uff1a", e);
        }
        return rtn;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @ApiOperation(value="\u7ed9\u524d\u7aef\u83b7\u53d6\u6587\u4ef6\u4e13\u7528")
    @GetMapping(value={"/getfile"})
    public void GetFile(String url, HttpServletResponse response) throws IOException {
        url = new String(Base64Util.decode(url));
        InputStream in = null;
        OutputStream out = null;
        try {
            String applicationPhysicalPath = "EpointMisTempFile";
            String virtulDicPath = applicationPhysicalPath + File.separator + url;
            response.setContentType("multipart/form-data");
            response.setHeader("Content-Disposition", "attachment;filename=" + OFDUtils.getFileNamewithsuffix(url));
            in = new FileInputStream(virtulDicPath);
            out = response.getOutputStream();
            int len = 0;
            byte[] buf = new byte[1024];
            while ((len = in.read(buf)) != -1) {
                out.write(buf, 0, len);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
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
}


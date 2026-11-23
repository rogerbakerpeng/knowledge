/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.CertObject;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.mcert.DeviceInfo;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.service.MCertService;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.GMUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.cert.SM2CertUtil;
import java.lang.reflect.Method;
import java.security.cert.X509Certificate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class MCertActions
extends BaseActions {
    private MCertService mcertservice;
    private static Logger logger = Logger.getLogger(MCertActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        this.mcertservice = (MCertService)actionContext.get("MCertService");
        if (this.mcertservice == null) {
            throw new RuntimeException("MCertActions \u521d\u59cb\u5316\u5931\u8d25\uff0c\u672a\u627e\u5230\u5b9e\u73b0\u7684MCertService");
        }
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        return this.success(this.mcertservice.creatQR(basereq.getRequest()));
    }

    public BaseResp create11QR(BaseReq basereq) throws Exception {
        return this.success(this.mcertservice.creat11QR(basereq.getRequest()));
    }

    public BaseResp qr11tb(BaseReq basereq) throws Exception {
        return this.success(this.mcertservice.qr11tb(basereq.getRequest()));
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        return this.success(this.mcertservice.queryQRresult((String)basereq.getRequest()));
    }

    public BaseResp queryMultiQRresult(BaseReq basereq) throws Exception {
        return this.success(this.mcertservice.queryMultiQRresult((JSONObject)basereq.getRequest()));
    }

    public BaseResp encrypt(BaseReq basereq) throws Exception {
        QRInfo qrinfo = JSONUtils.json2bean(basereq.getRequest(), QRInfo.class);
        X509Certificate encCert = SM2CertUtil.getX509Certificate(Base64Util.decode(qrinfo.getCertobject().getDecryptcert()));
        String oid = encCert.getSigAlgOID();
        String str = "";
        if (oid.startsWith("1.2.156.10197.1")) {
            byte[] enc = GMUtil.encrypt(GMUtil.getBCECPublicKey(encCert), qrinfo.getDecryptobjects().get(0).getOrg().getBytes());
            str = Base64Util.encode(enc);
        } else if (oid.startsWith("1.2.840.113549.1.1")) {
            str = SignUtil.publicEncrypt(qrinfo.getDecryptobjects().get(0).getOrg(), Base64Util.encode(encCert.getPublicKey().getEncoded()));
        }
        return this.success("{\"result\":\"" + str + "\"}");
    }

    public BaseResp verifySign(BaseReq basereq) throws Exception {
        String qrapptype;
        boolean verify = false;
        QRInfo qrinfo = JSONUtils.json2bean(basereq.getRequest(), QRInfo.class);
        String org = Base64Util.decode2string(qrinfo.getSignatureobjects().get(0).getOrg());
        String cert = qrinfo.getCertobject().getSignaturecert();
        String signature = qrinfo.getSignatureobjects().get(0).getSigned();
        Map<String, Object> ext = qrinfo.getExt();
        if (ext != null && ext.get("qrapptype") != null && StringUtil.isNotBlank(ext.get("qrapptype").toString()) && (verify = MCertActions.verifyByEpointCa(qrapptype = String.valueOf(ext.get("qrapptype")), org, cert, signature))) {
            return this.success("true");
        }
        if (StringUtil.isNotBlank(qrinfo.getSignatureobjects().get(0).getSigned()) && "dzyyzzsigned".contains(qrinfo.getSignatureobjects().get(0).getSigned())) {
            return this.success("true");
        }
        verify = EpSignatureApi.verifySign(org, cert, signature);
        if (!verify) {
            org = Base64Util.encode(qrinfo.getSignatureobjects().get(0).getOrg());
            verify = EpSignatureApi.verifySign(Base64Util.decode2string(org), cert, signature);
        }
        if (!verify && ext != null && ext.get("qrapptype") != null && StringUtil.isNotBlank(ext.get("qrapptype")) && Arrays.asList(MCertService.QZQRAPPTYPE).contains(ext.get("qrapptype"))) {
            verify = this.mcertservice.verifySign(qrinfo);
        }
        return this.success(verify);
    }

    public BaseResp queryCertByDevicenum(BaseReq basereq) throws Exception {
        CertObject resp = this.mcertservice.queryCertByDevicenum(JSONUtils.bean2json(basereq.getRequest()));
        DeviceInfo info = CertUtils.parseDoubleCert(resp);
        return this.success(JSONUtils.bean2json(info));
    }

    public BaseResp queryCert(BaseReq basereq) throws Exception {
        CertObject resp = this.mcertservice.queryCertByDognum((String)basereq.getRequest());
        DeviceInfo info = CertUtils.parseDoubleCert(resp);
        return this.success(JSONUtils.bean2json(info));
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        List<Seal> seals = this.mcertservice.getSealImg(JSONUtils.bean2json(basereq.getRequest()));
        return this.success(seals);
    }

    public BaseResp signInfoSync(BaseReq basereq) throws Exception {
        String responce = this.mcertservice.signInfoSync(JSONUtils.bean2json(basereq.getRequest()));
        return this.success(responce);
    }

    public BaseResp parseCert(BaseReq basereq) throws Exception {
        CertObject resp = JSONUtils.json2bean(basereq.getRequest().toString(), CertObject.class);
        DeviceInfo info = CertUtils.parseDoubleCert(resp);
        return this.success(JSONUtils.bean2json(info));
    }

    private static boolean verifyByEpointCa(String qrapptype, String org, String cert, String signature) throws Exception {
        try {
            Class<?> epointCACls = Class.forName("com.epoint.ztb.ca.EpointCAImpl" + qrapptype);
            Object epointCAImpl = epointCACls.newInstance();
            Method EpDataVerifyOnServer = epointCACls.getMethod("EpDataVerifyOnServer", String.class, String.class, String.class);
            String verifyTag = (String)EpDataVerifyOnServer.invoke(epointCAImpl, org, cert, signature);
            if ("0".equals(verifyTag)) {
                return true;
            }
        }
        catch (ClassNotFoundException e) {
            logger.info("\u672a\u52a0\u8f7d\u5230\u6b64\u7c7b\uff1acom.epoint.ztb.ca.EpointCAImpl" + qrapptype, e);
        }
        return false;
    }
}


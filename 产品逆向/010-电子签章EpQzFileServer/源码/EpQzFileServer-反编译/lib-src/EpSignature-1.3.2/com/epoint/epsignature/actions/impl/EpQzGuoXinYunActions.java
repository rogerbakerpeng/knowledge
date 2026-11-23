/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.IOUtils;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;
import org.apache.log4j.Logger;

public class EpQzGuoXinYunActions
extends BaseActions {
    private static String PRI_SUFFIX = ".pri";
    private static String GM_OID = "1234567812345678";
    private static Logger log = Logger.getLogger(EpQzGuoXinYunActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        ArrayList<Seal> list_ = new ArrayList<Seal>();
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map map_ = JSONUtils.json2bean(req, Map.class);
        Seal seal = new Seal();
        seal.setSealname("\u56fd\u4fe1\u4e91\u7b7e\u7ae0");
        seal.setSealguid(UUID.randomUUID().toString());
        byte[] sealData = Base64Util.decode((String)map_.get("sealData"));
        Class<?> GenSealUtilClass = Class.forName("cn.com.infosec.netseal.common.util.GenSealUtil");
        Method verifySealData = GenSealUtilClass.getMethod("verifySealData", byte[].class);
        Object sealo = verifySealData.invoke(null, new Object[]{sealData});
        Method getPhotoData = sealo.getClass().getMethod("getPhotoData", new Class[0]);
        Object photoData = getPhotoData.invoke(sealo, new Object[0]);
        Method getOctets = photoData.getClass().getMethod("getOctets", new Class[0]);
        Object photoDataString = getOctets.invoke(photoData, new Object[0]);
        String sealImg = Base64Util.encode((byte[])photoDataString);
        seal.setSealdata("");
        seal.setSealimg(sealImg);
        seal.setCode_img("");
        seal.setSealtype("");
        list_.add(seal);
        return this.success(list_);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public BaseResp getSignData(BaseReq basereq) throws Exception {
        Properties properties_ztb = new Properties();
        String resource_ztb = "ztb.properties";
        try (InputStream in_ztb = null;){
            in_ztb = Thread.currentThread().getContextClassLoader().getResourceAsStream(resource_ztb);
            if (in_ztb == null) {
                in_ztb = IOUtils.class.getResourceAsStream(resource_ztb);
            }
            properties_ztb.load(in_ztb);
        }
        Properties properties = new Properties();
        String resource = "/META-INF/wenjian/wenjian.properties";
        try (InputStream in = null;){
            in = Thread.currentThread().getContextClassLoader().getResourceAsStream(resource);
            if (in == null) {
                in = IOUtils.class.getResourceAsStream(resource);
            }
            properties.load(in);
        }
        String keyPwd = properties.getProperty("keyPwd");
        keyPwd = "68683556";
        String certPath = properties.getProperty("certpath");
        byte[] certWenjian = Base64Util.decode("LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tDQpNSUlDSXpDQ0FjZWdBd0lCQWdJR0FMY2VkYTdiTUF3R0NDcUJITTlWQVlOMUJRQXdVVEVMTUFrR0ExVUVCaE1DWTI0eEtUQW5CZ05WQkFvTUlFbE9SazlUUlVNZ1ZHVmphRzV2Ykc5bmFXVnpJRk5OTWtsRVgxTlZRa05CTVJjd0ZRWURWUVFEREE1aGNIQlRUVEpKUkY5VFZVSkRRVEFlRncweE9EQXpNVGt3TlRNeE1qSmFGdzB5TURFeU1UTXdOVE14TWpKYU1CUXhFakFRQmdOVkJBTU1DVk5OWDNObFlXd3dNekJaTUJNR0J5cUdTTTQ5QWdFR0NDcUJITTlWQVlJdEEwSUFCTlA5N3VXUDIwSDJiN3FESk4rUU96UjZnQ2pHMHJoNi81d1h3Nll6elJlb2kxNTdNM0VQdXdqS09mblJpUk9aZFFXODZRTjBsL043WEFqTnc3eEdLcW1qZ2NVd2djSXdId1lEVlIwakJCZ3dGb0FVVUpTOEczTjdPbW9sclM2OFBkYTZxUHVJUWZRd0NRWURWUjBUQkFJd0FEQm9CZ05WSFI4RVlUQmZNRjJnVzZCWnBGY3dWVEVOTUFzR0ExVUVBd3dFWTNKc016RU1NQW9HQTFVRUN3d0RZM0pzTVNrd0p3WURWUVFLRENCSlRrWlBVMFZESUZSbFkyaHViMnh2WjJsbGN5QlRUVEpKUkY5VFZVSkRRVEVMTUFrR0ExVUVCaE1DWTI0d0N3WURWUjBQQkFRREFnZUFNQjBHQTFVZERnUVdCQlRzb2MrWlV5cnZFVnZxNTFVU0J1S1ZPN1lEUkRBTUJnZ3FnUnpQVlFHRGRRVUFBMGdBTUVVQ0lRQ3FXRUZZQVZnTDZxU2RJcnJpeFdjZjdpRXJ6aWxPcWxjb0Q4RGR0aEtzOHdJZ1M0bE5ObDN5OHYrR1pXWURpR1J4MnVBK0JDQWhOdkpuMlBCaDN1RmdaMVE9DQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0t");
        String keyPath = properties.getProperty("keypath");
        byte[] keyWenjian = Base64Util.decode("ddOsBS4GCIPeYOP3rdkI9S+EuTPrZ9feEhBDy3H6FQ6NRz7ksJUytCr/yMNRB3tVSTURQj0nN2ZSYgG80C9Bp47pG8X8ZjoHzvP5wFtc9vQ=");
        String GETGUOXINYUN = properties_ztb.getProperty("stampsynurl");
        GETGUOXINYUN = StringUtil.isNotBlank(GETGUOXINYUN) ? GETGUOXINYUN : "https://dev.eseal.jsgxca.com/webservice/ecert/stampSyn.do";
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        Class<?> EcertRequestClass = Class.forName("cn.com.infosec.netseal.common.entity.vo.ecert.EcertRequest");
        Object er = EcertRequestClass.newInstance();
        Method setAppId = er.getClass().getMethod("setAppId", String.class);
        setAppId.invoke(er, "yc001");
        Method setAppKey = er.getClass().getMethod("setAppKey", String.class);
        setAppKey.invoke(er, "899866673355");
        Method setAcceptId = er.getClass().getMethod("setAcceptId", String.class);
        setAcceptId.invoke(er, reqmap_.get("acceptId"));
        Method setAcceptKey = er.getClass().getMethod("setAcceptKey", String.class);
        setAcceptKey.invoke(er, reqmap_.get("acceptKey"));
        Method setBussinessId = er.getClass().getMethod("setBussinessId", String.class);
        setBussinessId.invoke(er, reqmap_.get("bussinessId"));
        Method setPinCode = er.getClass().getMethod("setPinCode", String.class);
        setPinCode.invoke(er, reqmap_.get("pwd"));
        byte[] sealData = Base64Util.decode((String)reqmap_.get("sealData"));
        Class<?> GenSealUtilClass = Class.forName("cn.com.infosec.netseal.common.util.GenSealUtil");
        Method verifySealData = GenSealUtilClass.getMethod("verifySealData", byte[].class);
        Object sealo = verifySealData.invoke(null, new Object[]{sealData});
        Method getPhotoData = sealo.getClass().getMethod("getPhotoData", new Class[0]);
        Object photoDataString = getPhotoData.invoke(sealo, new Object[0]);
        Method getOctets = photoDataString.getClass().getMethod("getOctets", new Class[0]);
        Object photoData = getOctets.invoke(photoDataString, new Object[0]);
        Method getCertList = sealo.getClass().getMethod("getCertList", new Class[0]);
        Object certDataPlus = getCertList.invoke(sealo, new Object[0]);
        Method getObjectAt = certDataPlus.getClass().getMethod("getObjectAt", Integer.TYPE);
        Object certDatPlusPlus = getObjectAt.invoke(certDataPlus, 0);
        Class<?> DEROctetStringClass = Class.forName("cn.com.infosec.asn1.DEROctetString");
        Method getOctetsPlus = DEROctetStringClass.getMethod("getOctets", new Class[0]);
        byte[] certData = (byte[])getOctetsPlus.invoke(certDatPlusPlus, new Object[0]);
        Class<?> CertUtilClass = Class.forName("cn.com.infosec.netseal.common.util.CertUtil");
        Method parseCert = CertUtilClass.getMethod("parseCert", byte[].class);
        Object signCertPlus = parseCert.invoke(null, new Object[]{certData});
        Class<?> X509CertEnvelopeClass = Class.forName("cn.com.infosec.netseal.common.entity.vo.asn1.X509CertEnvelope");
        Method getX509Cert = X509CertEnvelopeClass.getMethod("getX509Cert", new Class[0]);
        X509Certificate signCert = (X509Certificate)getX509Cert.invoke(signCertPlus, new Object[0]);
        Class<?> OidUtilClass = Class.forName("cn.com.infosec.netseal.common.util.OidUtil");
        Method getHashAlg = OidUtilClass.getMethod("getHashAlg", String.class);
        String hashAlg = (String)getHashAlg.invoke(null, signCert.getSigAlgOID());
        byte[] toStampData = Base64Util.decode((String)reqmap_.get("signed"));
        Class<?> CryptoHandlerClass = Class.forName("cn.com.infosec.netseal.common.crypto.CryptoHandler");
        Method hash = CryptoHandlerClass.getMethod("hash", byte[].class, PublicKey.class, String.class, byte[].class);
        byte[] toStampDataHash = (byte[])hash.invoke(null, toStampData, signCert.getPublicKey(), hashAlg, GM_OID.getBytes());
        Class<?> FileUtilClass = Class.forName("cn.com.infosec.netseal.common.util.FileUtil");
        Method getFileName = FileUtilClass.getMethod("getFileName", Integer.TYPE);
        Method setNonce = er.getClass().getMethod("setNonce", String.class);
        setNonce.invoke(er, (String)getFileName.invoke(null, 5));
        Class<?> DateUtilClass = Class.forName("cn.com.infosec.netseal.common.util.DateUtil");
        Method getCurrentTime = DateUtilClass.getMethod("getCurrentTime", new Class[0]);
        Method setTimestamp = er.getClass().getMethod("setTimestamp", Long.class);
        setTimestamp.invoke(er, (long)((Long)getCurrentTime.invoke(null, new Object[0])));
        Method setSignCert = er.getClass().getMethod("setSignCert", String.class);
        setSignCert.invoke(er, Base64Util.encode(certWenjian));
        Method setSignAlg = er.getClass().getMethod("setSignAlg", Integer.class);
        setSignAlg.invoke(er, 3);
        Method setToStampDataHash = er.getClass().getMethod("setToStampDataHash", String.class);
        setToStampDataHash.invoke(er, Base64Util.encode(toStampDataHash));
        Method getAcceptId = er.getClass().getMethod("getAcceptId", new Class[0]);
        getAcceptId.invoke(er, new Object[0]);
        Method getAcceptKey = er.getClass().getMethod("getAcceptKey", new Class[0]);
        getAcceptKey.invoke(er, new Object[0]);
        Method getAppId = er.getClass().getMethod("getAppId", new Class[0]);
        getAppId.invoke(er, new Object[0]);
        Method getAppKey = er.getClass().getMethod("getAppKey", new Class[0]);
        getAppKey.invoke(er, new Object[0]);
        Method getBussinessId = er.getClass().getMethod("getBussinessId", new Class[0]);
        getBussinessId.invoke(er, new Object[0]);
        Method getNonce = er.getClass().getMethod("getNonce", new Class[0]);
        getNonce.invoke(er, new Object[0]);
        Method getPinCode = er.getClass().getMethod("getPinCode", new Class[0]);
        getPinCode.invoke(er, new Object[0]);
        Method getTimestamp = er.getClass().getMethod("getTimestamp", new Class[0]);
        getTimestamp.invoke(er, new Object[0]);
        Method getToStampDataHash = er.getClass().getMethod("getToStampDataHash", new Class[0]);
        getToStampDataHash.invoke(er, new Object[0]);
        Class<?> StringUtilClass = Class.forName("cn.com.infosec.netseal.common.util.StringUtil");
        Method getBytes = StringUtilClass.getMethod("getBytes", String.class);
        Method isNotBlank = StringUtilClass.getMethod("isNotBlank", String.class);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        baos.write((byte[])getBytes.invoke(null, getAcceptId.invoke(er, new Object[0])));
        baos.write((byte[])getBytes.invoke(null, getAcceptKey.invoke(er, new Object[0])));
        baos.write((byte[])getBytes.invoke(null, getAppId.invoke(er, new Object[0])));
        baos.write((byte[])getBytes.invoke(null, getAppKey.invoke(er, new Object[0])));
        baos.write((byte[])getBytes.invoke(null, getBussinessId.invoke(er, new Object[0])));
        baos.write((byte[])getBytes.invoke(null, getNonce.invoke(er, new Object[0])));
        if (((Boolean)isNotBlank.invoke(null, getPinCode.invoke(er, new Object[0]))).booleanValue()) {
            baos.write((byte[])getBytes.invoke(null, getPinCode.invoke(er, new Object[0])));
        }
        baos.write((byte[])getBytes.invoke(null, getTimestamp.invoke(er, new Object[0]).toString()));
        baos.write((byte[])getBytes.invoke(null, getToStampDataHash.invoke(er, new Object[0])));
        Method getPublicKey = X509CertEnvelopeClass.getMethod("getPublicKey", new Class[0]);
        PublicKey pubKey = (PublicKey)getPublicKey.invoke(parseCert.invoke(null, new Object[]{certWenjian}), new Object[0]);
        Class<?> KeyStoreUtilClass = Class.forName("cn.com.infosec.netseal.common.util.KeyStoreUtil");
        Method loadKey = KeyStoreUtilClass.getMethod("loadKey", String.class, String.class, byte[].class);
        PrivateKey priKey = (PrivateKey)loadKey.invoke(null, keyPwd, PRI_SUFFIX, keyWenjian);
        Method getSignAlg = OidUtilClass.getMethod("getSignAlg", Integer.TYPE);
        Method getSignAlgPlus = er.getClass().getMethod("getSignAlg", new Class[0]);
        String signAlg = (String)getSignAlg.invoke(null, getSignAlgPlus.invoke(er, new Object[0]));
        Method sign = CryptoHandlerClass.getMethod("sign", PublicKey.class, PrivateKey.class, byte[].class, String.class, Integer.TYPE, String.class, byte[].class);
        byte[] signData = (byte[])sign.invoke(null, pubKey, priKey, baos.toByteArray(), PRI_SUFFIX, -1, signAlg, GM_OID.getBytes());
        Method setSign = er.getClass().getMethod("setSign", String.class);
        setSign.invoke(er, Base64Util.encode(signData));
        Class<?> HttpClientUtilClass = Class.forName("cn.com.infosec.netseal.common.util.HttpClientUtil");
        Method httpsPost = HttpClientUtilClass.getMethod("httpsPost", String.class, String.class);
        String result = (String)httpsPost.invoke(null, GETGUOXINYUN, JSONUtils.bean2json(er));
        log.info("\u56fd\u4fe1\u4e91\u63a5\u53e3\u8bf7\u6c42\u53c2\u6570:" + JSONUtils.bean2json(er));
        log.info("\u56fd\u4fe1\u4e91\u63a5\u53e3\u8bf7\u6c42\u5730\u5740:" + GETGUOXINYUN);
        log.info("\u56fd\u4fe1\u4e91\u63a5\u53e3\u54cd\u5e94\u53c2\u6570:" + result);
        if (StringUtil.isBlank(result)) {
            throw new RuntimeException("\u8c03\u7528\u7b2c\u4e09\u65b9\u670d\u52a1\u51fa\u9519");
        }
        JSONObject jsonObj_ = JSONUtils.json2bean(result, JSONObject.class);
        if (!"0".equals(jsonObj_.getString("errNo"))) {
            throw new RuntimeException(jsonObj_.getString("errMsg"));
        }
        byte[] stampData = Base64Util.decode(jsonObj_.getString("stampData"));
        HashMap<String, String> map_ = new HashMap<String, String>();
        map_.put("signature", jsonObj_.getString("stampData"));
        map_.put("signcert", Base64Util.encode(certData));
        return this.success(JSONUtils.bean2json(map_));
    }

    public BaseResp queryCert(BaseReq basereq) throws Exception {
        String reqs = JSONUtils.bean2json(basereq.getRequest());
        Map maps = JSONUtils.json2bean(reqs, Map.class);
        HashMap<String, String> map_ = new HashMap<String, String>();
        byte[] sealData = Base64Util.decode((String)maps.get("sealData"));
        Class<?> GenSealUtilClass = Class.forName("cn.com.infosec.netseal.common.util.GenSealUtil");
        Method verifySealData = GenSealUtilClass.getMethod("verifySealData", byte[].class);
        Object sealo = verifySealData.invoke(null, new Object[]{sealData});
        Method getPhotoData = sealo.getClass().getMethod("getPhotoData", new Class[0]);
        Object photoDataString = getPhotoData.invoke(sealo, new Object[0]);
        Method getOctets = photoDataString.getClass().getMethod("getOctets", new Class[0]);
        Object photoData = getOctets.invoke(photoDataString, new Object[0]);
        Method getCertList = sealo.getClass().getMethod("getCertList", new Class[0]);
        Object certDataPlus = getCertList.invoke(sealo, new Object[0]);
        Method getObjectAt = certDataPlus.getClass().getMethod("getObjectAt", Integer.class);
        Object certDatPlusPlus = getObjectAt.invoke(certDataPlus, 0);
        Class<?> DEROctetStringClass = Class.forName("cn.com.infosec.asn1.DEROctetString");
        Method getOctetsPlus = DEROctetStringClass.getMethod("getOctets", new Class[0]);
        byte[] certData = (byte[])getOctetsPlus.invoke(certDatPlusPlus, new Object[0]);
        map_.put("cert", Base64Util.encode(certData));
        log.info("\u56fd\u4fe1\u4e91\u8bc1\u4e66base64:" + Base64Util.encode(certData));
        return this.success(JSONUtils.bean2json(map_));
    }

    class Seal {
        private String sealname;
        private String sealguid;
        private String sealdata;
        private String sealimg;
        private String code_img;
        private String sealtype;

        public Seal() {
        }

        public Seal(String sealname, String sealimg) {
            this.sealname = sealname;
            this.sealimg = sealimg;
        }

        public Seal(String sealname, String sealguid_, String sealdata, String sealimg, String code_img) {
            this.sealname = sealname;
            this.sealguid = sealguid_;
            this.sealdata = sealdata;
            this.sealimg = sealimg;
            this.code_img = code_img;
        }

        public String getSealname() {
            return this.sealname;
        }

        public void setSealname(String sealname) {
            this.sealname = sealname;
        }

        public String getSealguid() {
            return this.sealguid;
        }

        public void setSealguid(String sealguid_) {
            this.sealguid = sealguid_;
        }

        public String getSealdata() {
            return this.sealdata;
        }

        public void setSealdata(String sealdata) {
            this.sealdata = sealdata;
        }

        public String getSealimg() {
            return this.sealimg;
        }

        public void setSealimg(String sealimg) {
            this.sealimg = sealimg;
        }

        public String getCode_img() {
            return this.code_img;
        }

        public void setCode_img(String code_img) {
            this.code_img = code_img;
        }

        public String getSealtype() {
            return this.sealtype;
        }

        public void setSealtype(String sealtype) {
            this.sealtype = sealtype;
        }
    }
}


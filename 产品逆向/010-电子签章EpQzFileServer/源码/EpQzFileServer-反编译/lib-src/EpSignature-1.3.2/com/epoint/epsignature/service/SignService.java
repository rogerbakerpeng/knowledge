/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.service;

import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.bean.sign.SignatureInfo;
import com.epoint.epsignature.utils.CertUtils;
import com.epoint.epsignature.utils.PDFMergeUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.gmhelper.util.StringUtil;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.security.CertificateInfo;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Method;
import java.security.NoSuchProviderException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class SignService {
    private static Logger log = Logger.getLogger(SignService.class);
    public static final String SIGN_REASON = "reason";
    public static final String SIGN_LOCATION = "location";
    private PdfReader reader;
    private byte[] source_pdf;
    private String source_pdfpath;
    private X509Certificate signCert;
    private List<SignInfo> signlist;
    private byte[] signature;
    private SignReq req;
    private static final String GET_REF_METH_NAME = "get_ref";

    public SignService(byte[] pdf) throws IOException {
        this.source_pdf = pdf;
        this.reader = new PdfReader(pdf);
    }

    public SignService(byte[] pdf, String password) throws IOException {
        this.source_pdf = pdf;
        this.reader = new PdfReader(pdf, password.getBytes());
    }

    public SignService(String pdfpath) throws IOException {
        this.source_pdfpath = pdfpath;
        this.reader = new PdfReader(pdfpath);
    }

    public SignService(String pdfpath, String password) throws IOException {
        this.source_pdfpath = pdfpath;
        this.reader = new PdfReader(pdfpath, password.getBytes());
    }

    public SignService(String pdfpath, boolean isNeedPdfReader) throws IOException {
        this.source_pdfpath = pdfpath;
        if (isNeedPdfReader) {
            this.reader = new PdfReader(pdfpath);
        }
    }

    public SignService(String pdfpath, String password, boolean isNeedPdfReader) throws IOException {
        this.source_pdfpath = pdfpath;
        if (isNeedPdfReader) {
            this.reader = new PdfReader(pdfpath, password.getBytes());
        }
    }

    public SignService(byte[] pdf, boolean isNeedPdfReader) throws IOException {
        this.source_pdf = pdf;
        if (isNeedPdfReader) {
            this.reader = new PdfReader(pdf);
        }
    }

    public SignService(byte[] pdf, String password, boolean isNeedPdfReader) throws IOException {
        this.source_pdf = pdf;
        if (isNeedPdfReader) {
            this.reader = new PdfReader(pdf, password.getBytes());
        }
    }

    public byte[] getDegist() {
        try {
            byte[] degist = null;
            if (this.source_pdf != null) {
                degist = PDFMergeUtil.degist4PDFSign(this.source_pdf, "SM3");
            } else if (StringUtil.isNotBlank(this.source_pdfpath)) {
                degist = PDFMergeUtil.degist4PDFSignWithPdfpath(this.source_pdfpath, "SM3");
            }
            return degist;
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException("getDegist ERROR", e);
        }
    }

    public SignReq getSignReq() {
        return this.req;
    }

    public byte[] doMerge(SignReq signreq, byte[] cert, byte[] signature, Map<String, String> ext) throws Exception {
        this.req = signreq;
        this.signature = signature;
        try {
            this.req.setReader(this.reader);
            SignReq.PreaseResult rst = this.req.parseSigns();
            this.signlist = rst.getSignList();
        }
        catch (Exception e1) {
            log.error(e1.getMessage(), e1);
            throw new RuntimeException("\u7b7e\u540d\u8bf7\u6c42\u89e3\u6790\u5f02\u5e38", e1);
        }
        try {
            this.signCert = SM2CertUtil.getX509Certificate(cert);
        }
        catch (NoSuchProviderException | CertificateException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException("\u7b7e\u540d\u8bc1\u4e66\u89e3\u6790\u5f02\u5e38", e);
        }
        return PDFMergeUtil.signatureMerge(this.reader, signature, this.signCert, this.signlist, SIGN_REASON, SIGN_LOCATION, ext);
    }

    public List<SignatureInfo> getSignVerify() throws Exception {
        ArrayList<SignatureInfo> signinfoList = new ArrayList<SignatureInfo>();
        boolean hasGetRefMeth = SignService.hasGetRefMeth();
        for (SignInfo var : this.signlist) {
            SignatureInfo signatureinfo = new SignatureInfo();
            signatureinfo.setSignid(var.getName());
            signatureinfo.setPage(var.getPage());
            SignInfo signInfoRef = null;
            if (hasGetRefMeth) {
                signInfoRef = SignService.invokeGetRef(var);
            }
            if (signInfoRef != null) {
                signatureinfo.setRef_id(signInfoRef.getName());
            } else {
                signatureinfo.setPos(new SignatureInfo.Postion(var.getPage(), var.getX(), var.getY()));
                signatureinfo.setSignImg(var.getImgbase64());
                signatureinfo.setIsIntegrity(true);
                X509Certificate cert = this.signCert;
                String serialnum = SM2CertUtil.getSerialNumber(cert.getEncoded());
                String certBase64 = Base64Util.encode(cert.getEncoded());
                String SigAlgName = cert.getSigAlgName();
                String signer_field = "CN";
                String signer = CertUtils.getClientSignCertCN(cert);
                signatureinfo.setCert(new SignatureInfo.Cert(serialnum, certBase64, SigAlgName, signer));
                signatureinfo.setSigndate(new Date().getTime());
                signatureinfo.setLocation(SIGN_LOCATION);
                signatureinfo.setReason(SIGN_REASON);
                signatureinfo.setSignature(Base64Util.encode(this.signature));
                signatureinfo.setBfjg(CertificateInfo.getIssuerFields(cert).getField("CN"));
                HashMap<String, String> map = new HashMap<String, String>();
                map.putAll(this.req.getExt());
                signatureinfo.setExt(map);
            }
            signinfoList.add(signatureinfo);
        }
        return signinfoList;
    }

    private static boolean hasGetRefMeth() {
        boolean hasGetRefMeth = false;
        try {
            Method[] actionMethods;
            Class<SignInfo> clazz = SignInfo.class;
            for (Method method : actionMethods = clazz.getMethods()) {
                if (!GET_REF_METH_NAME.equals(method.getName())) continue;
                hasGetRefMeth = true;
                break;
            }
        }
        catch (Exception e) {
            log.error(String.format("\u5224\u65ad\u662f\u5426\u5b58\u5728\u5f15\u7528\u5bf9\u8c61\u65b9\u6cd5\u5931\u8d25:%s", e.getMessage()), e);
        }
        return hasGetRefMeth;
    }

    private static SignInfo invokeGetRef(SignInfo signInfo) {
        try {
            Class<?> clazz = signInfo.getClass();
            Method method = clazz.getMethod(GET_REF_METH_NAME, new Class[0]);
            return (SignInfo)method.invoke(signInfo, new Object[0]);
        }
        catch (Exception e) {
            log.error(String.format("\u53cd\u5c04\u83b7\u53d6\u5f15\u7528\u5bf9\u8c61\u5931\u8d25:%s", e.getMessage()), e);
            return null;
        }
    }

    public byte[] getDegist(String cert) {
        try {
            String hashAlg = "";
            if (StringUtil.isBlank(cert)) {
                hashAlg = "SM3";
            } else {
                X509Certificate signcert = SM2CertUtil.getX509Certificate(Base64Util.decode(cert));
                String oid = signcert.getSigAlgOID();
                hashAlg = SignService.getHashAlg(oid);
            }
            return PDFMergeUtil.degist4PDFSign(this.source_pdf, hashAlg);
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException("getDegist ERROR", e);
        }
    }

    public static String getHashAlg(String signOid) {
        if (signOid.startsWith("1.2.840.113549.1.1")) {
            return "SHA-1";
        }
        return "SM3";
    }

    public ByteArrayOutputStream doMergeOs(SignReq signreq, byte[] cert, byte[] signature, Map<String, String> ext) throws Exception {
        this.req = signreq;
        this.signature = signature;
        try {
            this.req.setReader(this.reader);
            SignReq.PreaseResult rst = this.req.parseSigns();
            this.signlist = rst.getSignList();
        }
        catch (Exception e1) {
            log.error(e1.getMessage(), e1);
            throw new RuntimeException("\u7b7e\u540d\u8bf7\u6c42\u89e3\u6790\u5f02\u5e38", e1);
        }
        try {
            this.signCert = SM2CertUtil.getX509Certificate(cert);
        }
        catch (NoSuchProviderException | CertificateException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException("\u7b7e\u540d\u8bc1\u4e66\u89e3\u6790\u5f02\u5e38", e);
        }
        return PDFMergeUtil.signatureMergeOs(this.reader, signature, this.signCert, this.signlist, SIGN_REASON, SIGN_LOCATION, ext);
    }

    public String doMergeTmpFile(String tmpFilePath, SignReq signreq, byte[] cert, byte[] signature, Map<String, String> ext) throws Exception {
        this.req = signreq;
        this.signature = signature;
        try {
            this.req.setReader(this.reader);
            SignReq.PreaseResult rst = this.req.parseSigns();
            this.signlist = rst.getSignList();
        }
        catch (Exception e1) {
            log.error(e1.getMessage(), e1);
            throw new RuntimeException("\u7b7e\u540d\u8bf7\u6c42\u89e3\u6790\u5f02\u5e38", e1);
        }
        try {
            this.signCert = SM2CertUtil.getX509Certificate(cert);
        }
        catch (NoSuchProviderException | CertificateException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException("\u7b7e\u540d\u8bc1\u4e66\u89e3\u6790\u5f02\u5e38", e);
        }
        return PDFMergeUtil.signatureMergeTmpFile(tmpFilePath, this.reader, signature, this.signCert, this.signlist, SIGN_REASON, SIGN_LOCATION, ext);
    }

    public void close() {
        if (this.reader != null) {
            this.reader.close();
        }
    }

    @Deprecated
    public static class DegistNode {
        private String serviceID;
        private String degist;

        public String getServiceID() {
            return this.serviceID;
        }

        public void setServiceID(String serviceID) {
            this.serviceID = serviceID;
        }

        public String getDegist() {
            return this.degist;
        }

        public void setDegist(String degist) {
            this.degist = degist;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.CertInfo;
import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.bean.mcert.DeviceInfo;
import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.itextpdf.text.pdf.security.CertificateInfo;
import java.io.IOException;
import java.security.NoSuchProviderException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import org.apache.log4j.Logger;

public class CertUtils {
    private static final String YXQ_TEMPLATE = "%S\u5230%s";
    private static Logger log = Logger.getLogger(CertUtils.class);
    private static final SimpleDateFormat sdf = new SimpleDateFormat(BaseResp.J("9797m\u0003\rc$*"));

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    private static /* synthetic */ String b(X509Certificate a) {
        try {
            if (a == null) {
                return "";
            }
            String string = "";
            X509Certificate x509Certificate = a;
            String string2 = x509Certificate.getSubjectDN().getName();
            if (x509Certificate.getIssuerDN().toString().toUpperCase().contains(BaseResp.J("\u0003\b\u0003\u000f"))) {
                String string3;
                String string4 = string2;
                int n = string4.indexOf(UnauthorizedAccessException.J("O\u00191"));
                int n2 = string4.indexOf(44, n);
                if (n2 == -1) {
                    String string5 = string2;
                    string3 = string = string5.substring(n + 3, string5.length());
                    return string3.split(BaseResp.J("\u000e"))[1];
                }
                string3 = string = string2.substring(n + 3, n2);
                return string3.split(BaseResp.J("\u000e"))[1];
            }
            String string6 = string2;
            int n = string6.indexOf(UnauthorizedAccessException.J("\u00181"));
            int n3 = string6.indexOf(44, n);
            if (n3 != -1) return string2.substring(n + 2, n3);
            String string7 = string2;
            return string7.substring(n + 2, string7.length());
        }
        catch (Exception exception) {
            log.error(new StringBuilder().insert(0, BaseResp.J("\u0002\u000e\u0003\u0010\r\u0001\u8b8f\u4e26\u83f9\u5396\u531b\u4f0d\u5443\u79b0\u5f4c\u5e78\uff54")).append(exception.getMessage()).toString(), exception);
            return "";
        }
    }

    @Deprecated
    public static com.epoint.epsignature.bean.DeviceInfo parseDoubleCert(CertObject a) throws CertificateException, NoSuchProviderException {
        throw new RuntimeException(UnauthorizedAccessException.J("\u8bb2\u5195\u6c82\u5dfe\u5f54\u7524\uff5b\u8bfb\u8003\u7cf7\u6850\u8bcd\u904d\u5f0c\u5386\u83bb\u5381\u65bc\u76d3\u5195\u6c82\uff0d"));
    }

    public static String getAllCN(X509Certificate a) {
        return a.getSubjectDN().getName();
    }

    public static boolean containsChinese(String a) {
        return Pattern.compile(BaseResp.J("\u0015\u4e40c\u9fe5\u0013")).matcher(a).find();
    }

    public static boolean isValidSocialCreditCode(String a) {
        int n;
        String[] stringArray = new String[40];
        stringArray[0] = UnauthorizedAccessException.J("f=");
        stringArray[1] = BaseResp.J("q|");
        stringArray[2] = UnauthorizedAccessException.J("f?");
        stringArray[3] = BaseResp.J("qw");
        stringArray[4] = UnauthorizedAccessException.J("e=");
        stringArray[5] = BaseResp.J("rw");
        stringArray[6] = UnauthorizedAccessException.J("d=");
        stringArray[7] = BaseResp.J("s|");
        stringArray[8] = UnauthorizedAccessException.J("d?");
        stringArray[9] = BaseResp.J("sz");
        stringArray[10] = UnauthorizedAccessException.J("d9");
        stringArray[11] = BaseResp.J("sw");
        stringArray[12] = UnauthorizedAccessException.J("c=");
        stringArray[13] = BaseResp.J("tw");
        stringArray[14] = UnauthorizedAccessException.J("b=");
        stringArray[15] = BaseResp.J("u|");
        stringArray[16] = UnauthorizedAccessException.J("b?");
        stringArray[17] = BaseResp.J("uz");
        stringArray[18] = UnauthorizedAccessException.J("b9");
        stringArray[19] = BaseResp.J("uw");
        stringArray[20] = UnauthorizedAccessException.J("a=");
        stringArray[21] = BaseResp.J("v|");
        stringArray[22] = UnauthorizedAccessException.J("a5");
        stringArray[23] = BaseResp.J("w\u007f");
        stringArray[24] = UnauthorizedAccessException.J("`>");
        stringArray[25] = BaseResp.J("ww");
        stringArray[26] = UnauthorizedAccessException.J("o=");
        stringArray[27] = BaseResp.J("xw");
        stringArray[28] = UnauthorizedAccessException.J("n=");
        stringArray[29] = BaseResp.J("y|");
        stringArray[30] = UnauthorizedAccessException.J("n?");
        stringArray[31] = BaseResp.J("\u0001\u007f");
        stringArray[32] = UnauthorizedAccessException.J("\u00165");
        stringArray[33] = BaseResp.J("\u0007\u007f");
        stringArray[34] = UnauthorizedAccessException.J("\u001d=");
        stringArray[35] = BaseResp.J("\u000e\u007f");
        stringArray[36] = UnauthorizedAccessException.J("\u0019>");
        stringArray[37] = BaseResp.J("\u000e}");
        stringArray[38] = UnauthorizedAccessException.J("\u00195");
        stringArray[39] = BaseResp.J("\u0019\u007f");
        List<String> list = Arrays.asList(stringArray);
        Object object = UnauthorizedAccessException.J("g=e?c9a;o5\u0016N\u0014H\u0012J\u0010D\u001dG\u001bA\u0019\\\u0006^\u0003Y\u0000T\u000e<");
        int[] nArray = new int[17];
        nArray[0] = 1;
        nArray[1] = 3;
        nArray[2] = 9;
        nArray[3] = 27;
        nArray[4] = 19;
        nArray[5] = 26;
        nArray[6] = 16;
        nArray[7] = 17;
        nArray[8] = 20;
        nArray[9] = 29;
        nArray[10] = 25;
        nArray[11] = 13;
        nArray[12] = 8;
        nArray[13] = 24;
        nArray[14] = 10;
        nArray[15] = 30;
        nArray[16] = 28;
        object = nArray;
        if (!Pattern.matches(BaseResp.J("\u001b~mw\u0001c\u001a\u0013;\u007fx3"), a)) {
            return false;
        }
        if (!list.contains(a.substring(0, 2))) {
            return false;
        }
        char c2 = '\u0000';
        char[] cArray = a.toCharArray();
        int n2 = n = 0;
        while (n2 < 17) {
            int n3 = UnauthorizedAccessException.J("g=e?c9a;o5\u0016N\u0014H\u0012J\u0010D\u001dG\u001bA\u0019\\\u0006^\u0003Y\u0000T\u000e<").indexOf(cArray[n]);
            Object object2 = object[n];
            c2 += n3 * object2;
            n2 = ++n;
        }
        n = 31 - c2 % 31;
        c2 = BaseResp.J("p\u007fr}t{vyxw\u0001\f\u0003\n\u0005\b\u0007\u0006\n\u0005\f\u0003\u000e\u001e\u0011\u001c\u0014\u001b\u0017\u0016\u0019~").charAt(n);
        return cArray[17] == c2;
    }

    public static DeviceInfo parseDoubleCert(com.epoint.epsignature.bean.CertObject a) throws CertificateException, NoSuchProviderException, IOException {
        DeviceInfo deviceInfo = new DeviceInfo();
        X509Certificate x509Certificate = SM2CertUtil.getX509Certificate(Base64Util.decode(a.getSignaturecert()));
        DeviceInfo deviceInfo2 = deviceInfo;
        com.epoint.epsignature.bean.CertObject certObject = a;
        deviceInfo.setSignCert(certObject.getSignaturecert());
        deviceInfo2.setEncCert(certObject.getDecryptcert());
        deviceInfo2.setClientSignCertSN(StringUtil.isBlank(a.getDognum()) ? SM2CertUtil.getSerialNumber(Base64Util.decode(a.getSignaturecert())) : a.getDognum());
        DeviceInfo deviceInfo3 = deviceInfo;
        DeviceInfo deviceInfo4 = deviceInfo;
        X509Certificate x509Certificate2 = x509Certificate;
        deviceInfo.setClientSignCertCN(CertUtils.getClientSignCertCN(x509Certificate2));
        deviceInfo4.setSignPubKey(Base64Util.encode(x509Certificate2.getPublicKey().getEncoded()));
        deviceInfo4.setDevicenum(a.getDevicenum());
        deviceInfo3.setBfjg(CertificateInfo.getIssuerFields(x509Certificate).getField(UnauthorizedAccessException.J("\u0014B")));
        Object[] objectArray = new Object[2];
        objectArray[0] = sdf.format(x509Certificate.getNotBefore());
        objectArray[1] = sdf.format(x509Certificate.getNotAfter());
        deviceInfo3.setCertYouXiaoQi(String.format(YXQ_TEMPLATE, objectArray));
        deviceInfo.setOrganization(CertificateInfo.getSubjectFields(x509Certificate).getField(BaseResp.J("\u0001")));
        if (StringUtil.isNotBlank(a.getDecryptcert())) {
            try {
                x509Certificate = SM2CertUtil.getX509Certificate(Base64Util.decode(a.getDecryptcert()));
                deviceInfo.setEncPubKey(Base64Util.encode(x509Certificate.getPublicKey().getEncoded()));
                return deviceInfo;
            }
            catch (Exception exception) {
                Object[] objectArray2 = new Object[1];
                objectArray2[0] = a.getDecryptcert();
                log.warn(String.format(UnauthorizedAccessException.J("\u52ac\u5b91\u8bcd\u4e31\u89ef\u67c7\u5f0e\u5e6f\uff00\u511f\u8dff\u8f90\u300e\u52f7\u5bca\u8b96\u4e6a\f)$Q"), objectArray2));
            }
        }
        return deviceInfo;
    }

    public static X509Certificate getX509Certificate(byte[] a) throws CertificateException, NoSuchProviderException {
        return SM2CertUtil.getX509Certificate(a);
    }

    public static CertInfo parseCert(String a) throws Exception {
        CertInfo certInfo;
        byte[] byArray = Base64Util.decode(a);
        X509Certificate x509Certificate = SM2CertUtil.getX509Certificate(byArray);
        CertInfo certInfo2 = certInfo = new CertInfo();
        X509Certificate x509Certificate2 = x509Certificate;
        CertInfo certInfo3 = certInfo;
        certInfo.setCert(x509Certificate);
        certInfo3.setClientSignCertSN(SM2CertUtil.getSerialNumber(byArray));
        certInfo3.setClientSignCertCN(CertUtils.getClientSignCertCN(x509Certificate));
        certInfo.setPubKey(Base64Util.encode(x509Certificate2.getPublicKey().getEncoded()));
        certInfo2.setBfjg(x509Certificate2.getIssuerDN().toString());
        Object[] objectArray = new Object[2];
        objectArray[0] = sdf.format(x509Certificate.getNotBefore());
        objectArray[1] = sdf.format(x509Certificate.getNotAfter());
        certInfo2.setCertYouXiaoQi(String.format(YXQ_TEMPLATE, objectArray));
        CertInfo certInfo4 = certInfo;
        certInfo4.setNotBefore(x509Certificate.getNotBefore());
        certInfo4.setNotAfter(x509Certificate.getNotAfter());
        return certInfo4;
    }

    public CertUtils() {
        CertUtils a;
    }

    private static /* synthetic */ String J(X509Certificate a) {
        String string;
        block10: {
            String[] stringArray;
            block9: {
                string = "";
                stringArray = a.getSubjectDN().getName();
                if (!stringArray.contains(UnauthorizedAccessException.J("\u0014J\u0014M")) || !stringArray.contains(BaseResp.J("\t $'6'$;!\""))) break block9;
                byte[] byArray = a.getExtensionValue(UnauthorizedAccessException.J("f\"e\"o:y="));
                if (byArray != null) {
                    string = new String(byArray);
                    string = string.substring(2);
                }
                break block10;
            }
            try {
                int n;
                String string2 = "";
                byte[] byArray = a.getExtensionValue(BaseResp.J("q`r`q{v`q\u007fr{v|n|n\u007fn\u007fn\u007f"));
                if (byArray != null) {
                    string2 = new String(byArray);
                }
                if (!string2.contains(UnauthorizedAccessException.J("\u0004J"))) break block10;
                stringArray = stringArray.split(BaseResp.J("b"));
                int n2 = stringArray.length;
                int n3 = n = 0;
                while (n3 < n2) {
                    String string3 = stringArray[n];
                    if (string3.trim().startsWith(UnauthorizedAccessException.J("C"))) {
                        string = string3.trim().substring(string3.trim().indexOf(61) + 1);
                    }
                    n3 = ++n;
                }
            }
            catch (Exception exception) {
                log.error(new StringBuilder().insert(0, BaseResp.J("\u0002\u000e\u0003\u0010\r\u0001\u8b8f\u4e26\u83f9\u5396\u531b\u4f0d\u5443\u79b0\u5f4c\u5e78\uff54")).append(exception.getMessage()).toString(), exception);
                return "";
            }
        }
        if ("".equals(string)) {
            string = CertUtils.b(a);
        }
        return string;
    }

    public static X509Certificate getX509Certificate(String a) throws CertificateException, NoSuchProviderException {
        return CertUtils.getX509Certificate(Base64Util.decode(a));
    }

    public static boolean isSM2Cert(String a) {
        try {
            X509Certificate x509Certificate = CertUtils.getX509Certificate(a);
            return "1.2.156.10197.1.501".equals(x509Certificate.getSigAlgOID());
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
            new RuntimeException(UnauthorizedAccessException.J("\u89ef\u67c7\u8bcd\u4e31\u51f6\u954e\uff0d"));
            exception.printStackTrace();
            return false;
        }
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static String getClientSignCertCN(X509Certificate a) {
        String string;
        String string2;
        block16: {
            X509Certificate x509Certificate = a;
            String string3 = x509Certificate.getIssuerDN().toString();
            String string4 = x509Certificate.getSubjectX500Principal().toString();
            string = string2 = CertificateInfo.getSubjectFields(x509Certificate).getField(BaseResp.J("\u0003\u0000"));
            try {
                String string5;
                if (string3.contains(UnauthorizedAccessException.J("\u0014J\u0014M"))) {
                    if (a.getSubjectDN().getName().contains(BaseResp.J("\f\u0000\u0017\u0002\u001a\f")) || string3.toUpperCase().contains("BJCA")) {
                        string2 = CertUtils.J(a);
                        break block16;
                    } else {
                        String[] stringArray = string2.split(UnauthorizedAccessException.J("L"));
                        string2 = !BaseResp.J("~t\u007f").equals(stringArray[0]) ? stringArray[1] : stringArray[2];
                    }
                    break block16;
                }
                if (string3.toUpperCase().contains(UnauthorizedAccessException.J("\u000fM\u0014M"))) {
                    String string6;
                    string2 = string6 = CertificateInfo.getSubjectFields(a).getField(BaseResp.J("\u000f\u001b"));
                    break block16;
                }
                if (string3.toUpperCase().contains(UnauthorizedAccessException.J("\u597e\u5a0d\u8b8d\u4fed")) && string2.contains(BaseResp.J("\u5969\u5a4f\u8b9a\u4faf")) || string3.toUpperCase().contains(UnauthorizedAccessException.J("A\u0014_\u0014M"))) {
                    string2 = string2.split(BaseResp.J("\u000e"))[1];
                    break block16;
                }
                if (string3.toUpperCase().contains(UnauthorizedAccessException.J("\u001dT\u0014M")) && (string4.toLowerCase().contains(BaseResp.J("3s")) || string4.toLowerCase().contains(UnauthorizedAccessException.J("\u007f#1")))) {
                    String string7 = string4;
                    int n = string7.indexOf(BaseResp.J("\u000fs"));
                    int n2 = string7.indexOf(44, n);
                    if (n2 == -1) {
                        String string8 = string7;
                        string2 = string8.substring(n + 2, string8.length());
                        break block16;
                    } else {
                        string2 = string7.substring(n + 2, n2);
                    }
                    break block16;
                }
                if (string3.toUpperCase().contains(UnauthorizedAccessException.J("D\u0002B\u0014M"))) {
                    String string9 = BaseResp.J("\u0010nd\u001c*;x=j");
                    if (string2.matches(string9)) {
                        String string10 = string2;
                        string2 = string10.substring(0, string10.length() - 6);
                    }
                    break block16;
                }
                if ((string3.toUpperCase().contains(UnauthorizedAccessException.J("\u001fB\u0014M")) || string3.toUpperCase().contains(BaseResp.J("\u0000\u0005\u001a\u0003\u000f"))) && StringUtil.isNotBlank(string5 = CertificateInfo.getSubjectFields(a).getField(UnauthorizedAccessException.J("C"))) && !CertUtils.containsChinese(string2)) {
                    string2 = string5;
                }
            }
            catch (Exception exception) {
                log.error(BaseResp.J("\u676a\u77ab\u76c4\u9557\u8baf\uff4f"), exception);
            }
        }
        if (StringUtil.isBlank(string2)) {
            return string;
        }
        return string2;
    }
}


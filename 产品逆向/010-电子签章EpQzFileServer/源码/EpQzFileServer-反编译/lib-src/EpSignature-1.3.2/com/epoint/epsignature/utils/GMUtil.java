/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.encrypt.util.AESUtil;
import com.epoint.epsignature.bean.CertInfo;
import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.gm.bizlogic.EPGMEnum;
import com.epoint.gmhelper.SM2Util;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import com.epoint.gmhelper.bouncycastle.crypto.InvalidCipherTextException;
import com.epoint.gmhelper.bouncycastle.jcajce.provider.asymmetric.ec.BCECPublicKey;
import com.epoint.gmhelper.cert.SM2CertUtil;
import java.io.IOException;
import java.security.cert.X509Certificate;
import org.apache.log4j.Logger;

public class GMUtil {
    private static final String AESkey = "123abc45epoint78";
    private static final int maxEncCount = 10;
    private static Logger log = Logger.getLogger(GMUtil.class);

    public static String MACEncrypt(String a) {
        try {
            byte[] byArray = AESUtil.encryptByte(a.getBytes(CertInfo.J("wG{")), AESkey.getBytes("UTF-8"), null, EPGMEnum.AES.ECB_NO_PADDING);
            return Base64Util.encode(byArray);
        }
        catch (Exception exception) {
            log.error(CertObject.J("\u52b5\u5bd0\u5924\u8d33"), exception);
            return "";
        }
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static byte[] encrypt(BCECPublicKey a, byte[] a2) throws InvalidCipherTextException, IOException {
        int n = 0;
        boolean bl = true;
        while (true) {
            try {
                int n2;
                int n3;
                byte[] byArray;
                byte[] byArray2;
                byte[] byArray3 = SM2Util.encrypt(a, a2);
                bl = true;
                byte[] byArray4 = new byte[64];
                int n4 = byArray3.length - 32 - a2.length - 1;
                if (64 == n4) {
                    byArray2 = a2;
                    System.arraycopy(byArray3, 1, byArray4, 0, 64);
                } else if (65 == n4 && byArray3[1] == 0) {
                    byArray2 = a2;
                    System.arraycopy(byArray3, 2, byArray4, 0, 64);
                } else if (65 == n4 && byArray3[33] == 0) {
                    byArray2 = a2;
                    System.arraycopy(byArray3, 1, byArray4, 0, 32);
                    System.arraycopy(byArray3, 34, byArray4, 32, 32);
                } else {
                    if (66 == n4 && byArray3[1] == 0 && byArray3[34] == 0) {
                        System.arraycopy(byArray3, 2, byArray4, 0, 32);
                        System.arraycopy(byArray3, 35, byArray4, 32, 32);
                    }
                    byArray2 = a2;
                }
                byte[] byArray5 = new byte[byArray2.length];
                byte[] byArray6 = new byte[32];
                System.arraycopy(byArray3, byArray3.length - 32 - a2.length, byArray5, 0, a2.length);
                System.arraycopy(byArray3, byArray3.length - 32, byArray6, 0, 32);
                byte[] byArray7 = new byte[32];
                Object object = new byte[32];
                System.arraycopy(byArray4, 0, byArray7, 0, 32);
                System.arraycopy(byArray4, 32, object, 0, 32);
                int n5 = 0;
                int n6 = 0;
                if (byArray7[0] < 0) {
                    n5 = 33;
                    byArray = object;
                } else {
                    n5 = 32;
                    byArray = object;
                }
                if (byArray[0] < 0) {
                    n6 = 33;
                    n3 = n5;
                } else {
                    n6 = 32;
                    n3 = n5;
                }
                byte[] byArray8 = new byte[n3];
                byte[] byArray9 = new byte[n6];
                if (n5 == 33) {
                    n2 = n6;
                    byArray8[0] = 0;
                    System.arraycopy(byArray7, 0, byArray8, 1, 32);
                } else {
                    System.arraycopy(byArray7, 0, byArray8, 0, 32);
                    n2 = n6;
                }
                if (n2 == 33) {
                    byArray9[0] = 0;
                    System.arraycopy(object, 0, byArray9, 1, 32);
                } else {
                    System.arraycopy(object, 0, byArray9, 0, 32);
                }
                ASN1Integer aSN1Integer = new ASN1Integer(byArray8);
                ASN1Integer aSN1Integer2 = new ASN1Integer(byArray9);
                DEROctetString dEROctetString = new DEROctetString(byArray6);
                DEROctetString dEROctetString2 = new DEROctetString(byArray5);
                Object object2 = object = (Object)new ASN1EncodableVector();
                Object object3 = object;
                ((ASN1EncodableVector)object3).add(aSN1Integer);
                ((ASN1EncodableVector)object3).add(aSN1Integer2);
                ((ASN1EncodableVector)object2).add(dEROctetString);
                ((ASN1EncodableVector)object2).add(dEROctetString2);
                return new DERSequence((ASN1EncodableVector)object).getEncoded();
            }
            catch (Exception exception) {
                log.debug(CertInfo.J("UkSwIuD"), exception);
                bl = false;
                if (n < 10) continue;
                return null;
            }
            break;
        }
    }

    public static boolean verify(byte[] a, byte[] a2, byte[] a3) {
        return SM2Util.signVerifyByCert(a, a2, a3);
    }

    public static String MACDecrypt(byte[] a) {
        try {
            byte[] byArray = AESUtil.decryptByte(a, AESkey.getBytes("UTF-8"), null, EPGMEnum.AES.ECB_NO_PADDING);
            return new String(byArray, CertObject.J("QW]"));
        }
        catch (Exception exception) {
            log.error(CertInfo.J("\u89e6\u5bf6\u5934\u8d15"), exception);
            return "";
        }
    }

    public GMUtil() {
        GMUtil a;
    }

    public static BCECPublicKey getBCECPublicKey(X509Certificate a) {
        return SM2CertUtil.getBCECPublicKey(a);
    }
}


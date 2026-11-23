/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.v4;

import com.epoint.epsignature.asn1.SealMaker;
import com.epoint.epsignature.asn1.v4.SM2CertUtil;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.gmhelper.BCECUtil;
import com.epoint.gmhelper.SM2Util;
import com.epoint.gmhelper.bouncycastle.jcajce.provider.asymmetric.ec.BCECPrivateKey;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.security.cert.Certificate;
import java.util.Date;
import org.apache.log4j.Logger;

public class GMSealMaker
implements SealMaker {
    public static final String PASSWORD = "12345678";
    public static final String SM2PUBLICCERT = "MIICLjCCAdOgAwIBAgIJAYZf2OsnMhZUMAoGCCqBHM9VAYN1MEQxCzAJBgNVBAYTAkNOMQ8wDQYDVQQKDAZvcmcuenoxDzANBgNVBAsMBm9yZy56ejETMBEGA1UEAwwKWlogUm9vdCBDQTAeFw0yMTEwMTQwMTM2MjFaFw00MTEwMDkwMTM2MjFaMEUxCzAJBgNVBAYTAkNOMQ8wDQYDVQQKDAZvcmcuenoxDzANBgNVBAsMBm9yZy56ejEUMBIGA1UEAwwLZXhhbXBsZS5vcmcwWTATBgcqhkjOPQIBBggqgRzPVQGCLQNCAAT5RvgSNkbHESwZqZeGmyjK4eB5k2xN2pPy5O8wKYTW3o3uFmNYlwDtqWragjIDiQmc1l3IRdoMFvVTJ9tp9PX0o4GsMIGpMB0GA1UdDgQWBBRHcejFRMFJR8KsHhVKpX/pIht4ejAfBgNVHSMEGDAWgBTbmEAP67Mbezn8u8yFW3qXXLSOKjAPBgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIDuDAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwEwJwYDVR0RBCAwHoEPYWJjQGV4YW1wbGUub3JnggtleGFtcGxlLm9yZzAKBggqgRzPVQGDdQNJADBGAiEAsqlcnvdP7AEJcjk0ZXrWHtXQUvL4Cz0GXQ02FX+nrsMCIQD2COInST9x3QJ2nygxqyNioPxAp4/5SkGgZp3OYKCOFw==";
    public static final String SM2CERT = "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";
    public static final String SM2PRIVATECERT = "MIICSwIBADCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////v////////////////////8AAAAA//////////8wRAQg/////v////////////////////8AAAAA//////////wEICjp+p6dn140TVqeS89lCafzl4n1FauPkt28vUFNlA6TBEEEMsSuLB8ZgRlfmQRGajnJlI/jC7/yZgvhcVpFiTNMdMe8Nzai9PZ3nFm9zuNraSFT0KmHfMYqR0AC3zLlITnwoAIhAP////7///////////////9yA99rIcYFK1O79Ak51UEjAgEBBIIBVTCCAVECAQEEINEQMAAUgG6agSIaydctL73jWxsz4bnKG8DJhOZGvDUFoIHjMIHgAgEBMCwGByqGSM49AQECIQD////+/////////////////////wAAAAD//////////zBEBCD////+/////////////////////wAAAAD//////////AQgKOn6np2fXjRNWp5Lz2UJp/OXifUVq4+S3by9QU2UDpMEQQQyxK4sHxmBGV+ZBEZqOcmUj+MLv/JmC+FxWkWJM0x0x7w3NqL09necWb3O42tpIVPQqYd8xipHQALfMuUhOfCgAiEA/////v///////////////3ID32shxgUrU7v0CTnVQSMCAQGhRANCAAT5RvgSNkbHESwZqZeGmyjK4eB5k2xN2pPy5O8wKYTW3o3uFmNYlwDtqWragjIDiQmc1l3IRdoMFvVTJ9tp9PX0";
    private static Logger logger = Logger.getLogger(GMSealMaker.class);

    @Override
    public byte[] signData(byte[] a) {
        try {
            BCECPrivateKey bCECPrivateKey = BCECUtil.convertPKCS8ToECPrivateKey(Base64Util.decode(SM2PRIVATECERT));
            return SM2Util.sign(bCECPrivateKey, a);
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            return null;
        }
    }

    @Override
    public Certificate getCertificate() {
        try {
            return SM2CertUtil.getX509Certificate(Base64Util.decode(SM2PUBLICCERT));
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            return null;
        }
    }

    @Override
    public Date getSignDate() {
        return new Date();
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static byte[] readFile(String a) throws IOException {
        try (RandomAccessFile randomAccessFile = null;){
            randomAccessFile = new RandomAccessFile(a, BaseResp.J("<"));
            byte[] byArray = new byte[(int)randomAccessFile.length()];
            randomAccessFile.read(byArray);
            return byArray;
        }
    }

    public GMSealMaker() {
        GMSealMaker a;
    }

    @Override
    public String getSignatureAlg() {
        return "1.2.156.10197.1.501";
    }
}


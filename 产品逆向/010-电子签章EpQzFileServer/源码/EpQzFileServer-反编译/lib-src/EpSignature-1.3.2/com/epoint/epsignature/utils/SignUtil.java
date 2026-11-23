/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.epsignature.utils.c;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.bouncycastle.jce.provider.BouncyCastleProvider;
import com.epoint.gmhelper.cert.SM2CertUtil;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.DocumentException;
import com.epoint.itextpdf.text.Image;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.PdfSignatureAppearance;
import com.epoint.itextpdf.text.pdf.PdfStamper;
import com.epoint.itextpdf.text.pdf.codec.Base64;
import com.epoint.itextpdf.text.pdf.security.BouncyCastleDigest;
import com.epoint.itextpdf.text.pdf.security.ExternalDigest;
import com.epoint.itextpdf.text.pdf.security.ExternalSignature;
import com.epoint.itextpdf.text.pdf.security.MakeSignature;
import com.epoint.itextpdf.text.pdf.security.PrivateKeySignature;
import com.epoint.itextpdf.text.pdf.security.TSAClient;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.DigestOutputStream;
import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.KeyStore;
import java.security.MessageDigest;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Security;
import java.security.Signature;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.spec.X509EncodedKeySpec;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.crypto.Cipher;
import javax.imageio.ImageIO;
import org.apache.log4j.Logger;

public class SignUtil {
    public static PrivateKey pk;
    public static final String SIGN_REASON = "reason";
    public static final String FONT_PATH = "\u9ed1\u4f53";
    public static Certificate[] chain;
    public static final String IMGBASE64 = "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";
    private static final int MAX_ENCRYPT_BLOCK = 117;
    public static final String PFXBASE64 = "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";
    public static final String SIGN_LOCATION = "location";
    public static final String h5DateFormatStr;
    public static Image image;
    private static Logger log;

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * WARNING - Removed back jump from a try to a catch block - possible behaviour change.
     * Unable to fully structure code
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static byte[] degistByStream(String a, String a) {
        var2_4 = null;
        a = MessageDigest.getInstance((String)a);
        var3_5 = new c();
        var2_4 = new FileInputStream(a);
        var3_5 = new DigestOutputStream((OutputStream)var3_5, (MessageDigest)a);
        var4_6 = null;
        var5_7 = new byte[10240];
        while ((var6_11 = var2_4.read(var5_7)) != -1) {
            var3_5.write(var5_7, 0, var6_11);
        }
        ** GOTO lbl45
        {
            catch (Exception a) {
                try {
                    v0 = new Object[1];
                    v0[0] = a;
                    SignUtil.log.error(String.format(VerifyReq.J("\u65bc\u4e91\u6463\u89e6\u8b9a\u7bf0\u590a\u8d42\u0001G\u001e\u0014"), v0), a);
                }
                catch (Throwable a) {
                    SignUtil.J(var2_4);
                    throw a;
                }
                {
                    catch (Throwable var5_9) {
                        try {
                            var4_6 = var5_9;
                            throw var4_6;
                        }
                        catch (Throwable var7_12) {
                            if (var3_5 != null) {
                                if (var4_6 != null) {
                                    try {
                                        var3_5.close();
                                        v1 = var7_12;
                                        throw v1;
                                    }
                                    catch (Throwable var5_10) {
                                        v1 = var7_12;
                                        var4_6.addSuppressed(var5_10);
                                        throw v1;
                                    }
                                }
                                var3_5.close();
                            }
                            v1 = var7_12;
                            throw v1;
                        }
                    }
lbl45:
                    // 1 sources

                    if (var3_5 != null) {
                        if (var4_6 != null) {
                            try {
                                var3_5.close();
                                v2 = a;
                            }
                            catch (Throwable var5_8) {}
                            v2 = a;
                            var4_6.addSuppressed(var5_8);
                        } else {
                            var3_5.close();
                            v2 = a;
                        }
                    } else {
                        v2 = a;
                    }
                    var3_5 = v2.digest();
                }
                SignUtil.J(var2_4);
                return var3_5;
                SignUtil.J(var2_4);
                return null;
            }
        }
    }

    public static String getSignName() {
        return new StringBuilder().insert(0, EpOFDData.J("U#A$y")).append(UUID.randomUUID().toString()).toString();
    }

    public static boolean verifySign(String a, String a2, String a3) throws Exception {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        a3 = keyFactory.generatePublic(new X509EncodedKeySpec(Base64Util.decode((String)a3)));
        return SignUtil.verifySign(a.getBytes(), Base64Util.decode(a2), (PublicKey)a3);
    }

    public SignUtil() {
        SignUtil a;
    }

    public static void signRSA(PdfReader a, OutputStream a2, PrivateKey a3, Certificate[] a4, String a5, Rectangle a6, int a7, String a8, Image a9, String a10, String a11, TSAClient a12, File a13, List<SignInfo> a14) throws IOException, DocumentException, GeneralSecurityException {
        Object object = a2 = PdfStamper.createSignature(a, (OutputStream)a2, '\u0000', a13, true).getSignatureAppearance();
        Object object2 = a2;
        Object object3 = a2;
        ((PdfSignatureAppearance)object3).setReason(a10);
        ((PdfSignatureAppearance)object3).setLocation(a11);
        ((PdfSignatureAppearance)object2).setSignatureGraphic(a9);
        ((PdfSignatureAppearance)object2).setCertificationLevel(0);
        ((PdfSignatureAppearance)object).setRenderingMode(PdfSignatureAppearance.RenderingMode.GRAPHIC);
        ((PdfSignatureAppearance)object).setSigns(a14);
        a2 = new BouncyCastleDigest();
        a3 = new PrivateKeySignature((PrivateKey)a3, a5, null);
        MakeSignature.signDetached((PdfSignatureAppearance)object, (ExternalDigest)a2, (ExternalSignature)a3, a4, null, null, a12, 0, MakeSignature.CryptoStandard.CMS);
    }

    private static /* synthetic */ Font J(Graphics2D a, String a2, int a3) {
        int n = 14;
        Font font = new Font(VerifyReq.J("\u5f95\u8f08\u96fe\u9eb6"), 0, n);
        int n2 = n;
        while (n2 > 8) {
            if (a.getFontMetrics(font).stringWidth(a2) <= a3) {
                return font;
            }
            font = new Font(EpOFDData.J("\u5fe4\u8f49\u968f\u9ef7"), 0, --n);
            n2 = n;
        }
        return font;
    }

    private static /* synthetic */ void J(Closeable a) {
        if (a != null) {
            try {
                a.close();
                return;
            }
            catch (IOException iOException) {
                log.error(VerifyReq.J("\u5148\u958a\u8d7f\u6ef7\u590a\u8d42"), iOException);
            }
        }
    }

    public static void signRSA(PdfReader a, OutputStream a2, PrivateKey a3, Certificate[] a4, String a5, Rectangle a6, int a7, String a8, Image a9, String a10, String a11, TSAClient a12, File a13) throws IOException, DocumentException, GeneralSecurityException {
        PdfSignatureAppearance pdfSignatureAppearance = PdfStamper.createSignature(a, (OutputStream)a2, '\u0000', a13, true).getSignatureAppearance();
        Object object = a2 = pdfSignatureAppearance;
        Object object2 = a2;
        ((PdfSignatureAppearance)a2).setReason(a10);
        ((PdfSignatureAppearance)object2).setLocation(a11);
        ((PdfSignatureAppearance)object2).setVisibleSignature(a6, a7, a8);
        ((PdfSignatureAppearance)object).setSignatureGraphic(a9);
        pdfSignatureAppearance.setCertificationLevel(0);
        ((PdfSignatureAppearance)object).setRenderingMode(PdfSignatureAppearance.RenderingMode.GRAPHIC);
        a2 = new BouncyCastleDigest();
        a3 = new PrivateKeySignature((PrivateKey)a3, a5, null);
        MakeSignature.signDetached(pdfSignatureAppearance, (ExternalDigest)a2, (ExternalSignature)a3, a4, null, null, a12, 0, MakeSignature.CryptoStandard.CMS);
    }

    private static /* synthetic */ String b(String a, String a222) throws Exception {
        BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(Base64Util.decode(a)));
        int n = 5;
        int n2 = 20;
        BufferedImage bufferedImage2 = new BufferedImage(bufferedImage.getWidth(), bufferedImage.getHeight() + n2 + n, 2);
        Object object = bufferedImage2.createGraphics();
        Graphics2D graphics2D = object;
        ((Graphics2D)object).setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        graphics2D.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        graphics2D.drawImage(bufferedImage, 0, 0, bufferedImage.getWidth(), bufferedImage.getHeight(), null);
        Graphics2D graphics2D2 = object;
        graphics2D2.setFont(SignUtil.J(graphics2D2, a222, bufferedImage.getWidth() - 20));
        graphics2D2.setColor(Color.BLACK);
        object = graphics2D2.getFontMetrics();
        String string = a222;
        int a222 = ((FontMetrics)object).stringWidth(string);
        a222 = (bufferedImage.getWidth() - a222) / 2;
        int n3 = bufferedImage.getHeight() + n + (n2 + ((FontMetrics)object).getAscent() - ((FontMetrics)object).getDescent()) / 2;
        graphics2D2.drawString(string, a222, n3);
        graphics2D2.dispose();
        Object a222 = new ByteArrayOutputStream();
        ImageIO.write((RenderedImage)bufferedImage2, EpOFDData.J("V$A"), (OutputStream)a222);
        ByteArrayOutputStream byteArrayOutputStream = a222;
        a222 = byteArrayOutputStream.toByteArray();
        byteArrayOutputStream.close();
        return Base64Util.encode((byte[])a222);
    }

    public static byte[] degist(byte[] a, String a2) throws Exception {
        MessageDigest messageDigest = MessageDigest.getInstance(a2);
        messageDigest.update(a);
        return messageDigest.digest();
    }

    public static byte[] sign(byte[] a) throws Exception {
        String string = VerifyReq.J("4s&\u0016V");
        return new PrivateKeySignature(pk, string, null).sign(a);
    }

    public static boolean verifySign(byte[] a, byte[] a2, byte[] a3) {
        boolean bl = false;
        X509Certificate x509Certificate = SM2CertUtil.getX509Certificate(a3);
        Object object = CertificateFactory.getInstance(EpOFDData.J("~d\u0013z\u001f"));
        a3 = ((CertificateFactory)object).generateCertificate(new ByteArrayInputStream((byte[])a3));
        try {
            Object object2 = object = Signature.getInstance(x509Certificate.getSigAlgName());
            ((Signature)object).initVerify((Certificate)a3);
            ((Signature)object2).update(a);
            bl = ((Signature)object2).verify(a2);
        }
        catch (Exception exception) {
            try {
                Signature signature;
                Signature signature2 = signature = Signature.getInstance(VerifyReq.J("4s&\n\u0010R\u0013S5h&"));
                signature.initVerify((Certificate)a3);
                signature2.update(a);
                bl = signature2.verify(a2);
            }
            catch (Exception exception2) {
                log.error(exception2.getMessage(), exception2);
                exception2.printStackTrace();
            }
        }
        return bl;
    }

    private static /* synthetic */ int J(String a) {
        return a.split(EpOFDData.J("}@{")).length;
    }

    public static String resizeImage(String a, int a22, int a3) throws Exception {
        Graphics2D graphics2D;
        BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(Base64Util.decode(a)));
        BufferedImage bufferedImage2 = new BufferedImage(a22, a3, 2);
        Graphics2D graphics2D2 = graphics2D = bufferedImage2.createGraphics();
        graphics2D2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        graphics2D2.drawImage(bufferedImage, 0, 0, a22, a3, null);
        graphics2D.dispose();
        Object a22 = new ByteArrayOutputStream();
        ImageIO.write((RenderedImage)bufferedImage2, VerifyReq.J("\u0017U\u0000"), (OutputStream)a22);
        ByteArrayOutputStream byteArrayOutputStream = a22;
        a22 = byteArrayOutputStream.toByteArray();
        byteArrayOutputStream.close();
        return Base64Util.encode((byte[])a22);
    }

    private static /* synthetic */ String J(String[] a) {
        int n;
        String string = a[0];
        int n2 = n = 1;
        while (n2 < a.length) {
            if (string.length() < a[n].length()) {
                string = a[n];
            }
            n2 = ++n;
        }
        return string;
    }

    public static String sign(String a) throws Exception {
        return Base64Util.encode(SignUtil.sign(Base64Util.decode(a)));
    }

    private static /* synthetic */ String J(String a, String a2) throws Exception {
        BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(Base64Util.decode(a)));
        a2 = ImageIO.read(new ByteArrayInputStream(Base64Util.decode((String)a2)));
        BufferedImage bufferedImage2 = new BufferedImage(bufferedImage.getWidth() + 20, bufferedImage.getHeight() + 20, 2);
        Graphics2D graphics2D = bufferedImage2.createGraphics();
        BufferedImage bufferedImage3 = bufferedImage;
        graphics2D.drawImage(bufferedImage3, 0, 0, bufferedImage3.getWidth(), bufferedImage.getHeight(), null);
        Object object = a2;
        graphics2D.drawImage((java.awt.Image)object, bufferedImage.getWidth() / 2 - ((BufferedImage)object).getWidth() / 2, bufferedImage.getHeight(), bufferedImage.getWidth() / 2 + ((BufferedImage)a2).getWidth() / 2, ((BufferedImage)a2).getHeight(), null);
        graphics2D.dispose();
        a2 = new ByteArrayOutputStream();
        ImageIO.write((RenderedImage)bufferedImage2, EpOFDData.J("V$A"), (OutputStream)a2);
        Object object2 = a2;
        a2 = ((ByteArrayOutputStream)object2).toByteArray();
        ((ByteArrayOutputStream)object2).close();
        return Base64Util.encode((byte[])a2);
    }

    /*
     * Enabled force condition propagation
     * Lifted jumps to return sites
     */
    public static String getSignimgWithDate(String a, boolean a2) {
        String string;
        SimpleDateFormat simpleDateFormat;
        String string2;
        block5: {
            block4: {
                String string3 = "";
                string2 = "";
                try {
                    simpleDateFormat = null;
                    if (!a2) break block4;
                    simpleDateFormat = new SimpleDateFormat(VerifyReq.J("\u001eB\u001eB\u5e13v*\u6733\u0003_\u6582"));
                    string2 = SignUtil.J(simpleDateFormat.format(new Date()), Color.RED, new Font(FONT_PATH, 0, 11));
                    string = a;
                    return SignUtil.J(string, string2);
                }
                catch (Exception exception) {
                    log.error(VerifyReq.J("\\\u0002O4R\u0000U\u000eV\u0000l\u000eO\u000f\u007f\u0006O\u0002"), exception);
                    return string3;
                }
            }
            if (!StringUtil.isNotBlank(h5DateFormatStr)) break block5;
            simpleDateFormat = new SimpleDateFormat(h5DateFormatStr);
            return SignUtil.b(a, simpleDateFormat.format(new Date()));
        }
        simpleDateFormat = new SimpleDateFormat(EpOFDData.J("3_3_ek\u0007\t.Bjn\u0002\u001c'K"));
        string2 = SignUtil.J(simpleDateFormat.format(new Date()), null, null);
        string = a;
        return SignUtil.J(string, string2);
    }

    public static byte[] publicEncrypt(byte[] a, PublicKey a222) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(1, a222);
        int a222 = a.length;
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        int n = 0;
        int n2 = 0;
        int n3 = a222;
        while (n3 - n > 0) {
            ByteArrayOutputStream byteArrayOutputStream2;
            byte[] byArray;
            if (a222 - n > 117) {
                byArray = cipher.doFinal(a, n, 117);
                byteArrayOutputStream2 = byteArrayOutputStream;
            } else {
                int n4 = n;
                byArray = cipher.doFinal(a, n4, a222 - n4);
                byteArrayOutputStream2 = byteArrayOutputStream;
            }
            byteArrayOutputStream2.write(byArray, 0, byArray.length);
            n = ++n2 * 117;
            n3 = a222;
        }
        ByteArrayOutputStream byteArrayOutputStream3 = byteArrayOutputStream;
        byte[] a222 = byteArrayOutputStream3.toByteArray();
        byteArrayOutputStream3.close();
        return a222;
    }

    static {
        log = Logger.getLogger(SignUtil.class);
        pk = null;
        chain = null;
        image = null;
        h5DateFormatStr = ConfigUtil.getConfigValue(EpOFDData.J("\\>D"), VerifyReq.J("\u000f\u000e#Z\u0013^!T\u0015V\u0006O4O\u0015"));
        try {
            Security.addProvider(new BouncyCastleProvider());
            KeyStore keyStore = KeyStore.getInstance(EpOFDData.J("\u001am\tu{\u0014"));
            char[] cArray = VerifyReq.J("\nV\nV\nV").toCharArray();
            Object object = new ByteArrayInputStream(Base64Util.decode(PFXBASE64));
            keyStore.load((InputStream)object, cArray);
            object = keyStore.aliases().nextElement();
            pk = (PrivateKey)keyStore.getKey((String)object, cArray);
            chain = keyStore.getCertificateChain((String)object);
            image = Image.getInstance(Base64.decode(IMGBASE64));
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
            exception.printStackTrace();
        }
    }

    private static /* synthetic */ String J(String a, Color a22, Font a3) {
        byte[] byArray;
        byte[] byArray2 = null;
        String[] stringArray = a.split(EpOFDData.J("}@{"));
        BufferedImage bufferedImage = new BufferedImage(1, 1, 2);
        Graphics2D graphics2D = bufferedImage.createGraphics();
        FontMetrics fontMetrics = graphics2D.getFontMetrics();
        int n = fontMetrics.stringWidth(SignUtil.J(stringArray));
        if (a3 != null) {
            Graphics2D graphics2D2 = graphics2D;
            graphics2D2.setFont(a3);
            fontMetrics = graphics2D2.getFontMetrics(a3);
            n = fontMetrics.stringWidth(SignUtil.J(stringArray));
        }
        int n2 = SignUtil.J(a);
        int n3 = fontMetrics.getHeight();
        graphics2D.dispose();
        bufferedImage = new BufferedImage(n, n3, 2);
        graphics2D = bufferedImage.createGraphics();
        graphics2D.setRenderingHint(RenderingHints.KEY_ALPHA_INTERPOLATION, RenderingHints.VALUE_ALPHA_INTERPOLATION_QUALITY);
        graphics2D.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        graphics2D.setRenderingHint(RenderingHints.KEY_COLOR_RENDERING, RenderingHints.VALUE_COLOR_RENDER_QUALITY);
        graphics2D.setRenderingHint(RenderingHints.KEY_DITHERING, RenderingHints.VALUE_DITHER_ENABLE);
        graphics2D.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS, RenderingHints.VALUE_FRACTIONALMETRICS_ON);
        graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        graphics2D.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        graphics2D.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE);
        fontMetrics = graphics2D.getFontMetrics();
        if (a3 != null) {
            Graphics2D graphics2D3 = graphics2D;
            graphics2D3.setFont(a3);
            fontMetrics = graphics2D3.getFontMetrics(a3);
        }
        if (a22 == null) {
            a22 = Color.red;
        }
        graphics2D.setColor(a22);
        int n4 = a22 = 1;
        while (n4 <= n2) {
            graphics2D.drawString(stringArray[a22 - 1], 0, fontMetrics.getAscent() * a22++);
            n4 = a22;
        }
        graphics2D.dispose();
        try {
            ByteArrayOutputStream byteArrayOutputStream = a22 = new ByteArrayOutputStream();
            ImageIO.write((RenderedImage)bufferedImage, VerifyReq.J("\u0017U\u0000"), byteArrayOutputStream);
            byArray = byArray2 = byteArrayOutputStream.toByteArray();
        }
        catch (Exception a22) {
            log.error(EpOFDData.J("E%H<C8R"), a22);
            byArray = byArray2;
        }
        return Base64Util.encode(byArray);
    }

    public static String publicEncrypt(String a, String a2) throws Exception {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        a2 = keyFactory.generatePublic(new X509EncodedKeySpec(Base64Util.decode((String)a2)));
        return Base64Util.encode(SignUtil.publicEncrypt(Base64Util.decode(a), (PublicKey)a2));
    }

    public static boolean verifySign(byte[] a, byte[] a2, PublicKey a3) throws Exception {
        boolean bl = false;
        try {
            Signature signature;
            Signature signature2 = signature = Signature.getInstance(VerifyReq.J("4s&\n\u0010R\u0013S5h&"));
            signature.initVerify(a3);
            signature2.update(a);
            bl = signature2.verify(a2);
            return bl;
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
            exception.printStackTrace();
            return bl;
        }
    }
}


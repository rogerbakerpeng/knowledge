/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.service;

import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.IOUtils;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1OctetString;
import com.epoint.gmhelper.bouncycastle.asn1.x509.AuthorityKeyIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.x509.SubjectKeyIdentifier;
import com.epoint.gmhelper.bouncycastle.asn1.x509.SubjectPublicKeyInfo;
import com.epoint.gmhelper.bouncycastle.util.encoders.Hex;
import com.epoint.gmhelper.cert.SM2CertUtil;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.apache.log4j.Logger;

public class EpCertVerifyService {
    private static Logger log = Logger.getLogger(EpCertVerifyService.class);
    private static Map<String, X509Certificate> caRootMap = new HashMap<String, X509Certificate>();
    private boolean enableforce;
    private static final String ROOT_CERTS_DIR = "rootcerts";
    private static final String CERT_EXTENSION = ".cer";
    private static Logger epcvLog;
    private static String VERIFYERROR_MSG_TEMPLATE;

    public EpCertVerifyService(String path) {
        this(path, false);
    }

    public EpCertVerifyService(String path, boolean enableforce) {
        this.enableforce = enableforce;
        if (caRootMap.isEmpty()) {
            this.init(path);
        }
    }

    private void init(String path) {
        this.loadCertsFromJar();
        if (path != null && !path.trim().isEmpty()) {
            Set<String> certs = this.listFilesUsingJavaIO(path);
            for (String certpath : certs) {
                this.loadCertFromFile(certpath);
            }
        }
        log.info("\u603b\u5171\u52a0\u8f7d\u4e86 " + caRootMap.size() + " \u4e2a\u6839\u8bc1\u4e66");
        for (Map.Entry<String, X509Certificate> entry : caRootMap.entrySet()) {
            X509Certificate cert = entry.getValue();
            log.info("\u6839\u8bc1\u4e66\u4fe1\u606f: \u79d8\u94a5\u6807\u8bc6\u7b26[" + entry.getKey() + "], \u5e8f\u5217\u53f7[" + cert.getSerialNumber() + "], \u6709\u6548\u671f\u4ece[" + cert.getNotBefore() + " - " + cert.getNotAfter() + "], \u9881\u53d1\u8005[" + cert.getIssuerDN() + "]");
        }
    }

    private void loadCertsFromJar() {
        block17: {
            try {
                URL rootUrl = this.getClass().getClassLoader().getResource(ROOT_CERTS_DIR);
                if (rootUrl == null) {
                    log.info("JAR\u5305\u4e2d\u672a\u627e\u5230\u6839\u8bc1\u4e66\u76ee\u5f55\uff1arootcerts");
                    return;
                }
                log.info("\u4eceJAR\u5305\u8d44\u6e90\u52a0\u8f7d\u6839\u8bc1\u4e66\uff1a" + rootUrl);
                if ("file".equals(rootUrl.getProtocol())) {
                    Path rootPath = Paths.get(rootUrl.toURI());
                    try (Stream<Path> pathStream = Files.walk(rootPath, new FileVisitOption[0]);){
                        pathStream.filter(path -> !Files.isDirectory(path, new LinkOption[0]) && path.toString().endsWith(CERT_EXTENSION)).forEach(path -> {
                            try {
                                byte[] certBytes = Files.readAllBytes(path);
                                this.loadCertFromBytes(certBytes, path.toString());
                            }
                            catch (IOException e) {
                                log.error("\u8bfb\u53d6\u8bc1\u4e66\u6587\u4ef6\u5931\u8d25\uff1a" + path, e);
                            }
                        });
                        break block17;
                    }
                }
                if ("jar".equals(rootUrl.getProtocol())) {
                    this.loadCertsFromJarUsingClassLoader();
                }
            }
            catch (IOException | URISyntaxException e) {
                log.error("\u52a0\u8f7dJAR\u5305\u4e2d\u7684\u6839\u8bc1\u4e66\u5931\u8d25", e);
            }
        }
    }

    private void loadCertsFromJarUsingClassLoader() {
        block16: {
            try {
                boolean success = this.loadCertsFromJarByScanning();
                if (success) break block16;
                log.info("\u76f4\u63a5\u626b\u63cfjar\u5305\u5931\u8d25\uff0c\u5c1d\u8bd5\u4f7f\u7528\u8bc1\u4e66\u6e05\u5355\u6587\u4ef6");
                try (InputStream listStream = this.getClass().getClassLoader().getResourceAsStream("rootcerts/cert_list.txt");){
                    if (listStream != null) {
                        this.loadCertsFromList(listStream);
                    } else {
                        log.warn("\u672a\u627e\u5230\u8bc1\u4e66\u6e05\u5355\u6587\u4ef6\uff0c\u5efa\u8bae\u5728resources/rootcerts\u76ee\u5f55\u4e0b\u521b\u5efacert_list.txt\u6587\u4ef6\u4ee5\u652f\u6301Spring Boot\u5d4c\u5957jar\u90e8\u7f72");
                    }
                }
            }
            catch (Exception e) {
                log.error("\u4f7f\u7528ClassLoader\u52a0\u8f7dJAR\u5305\u4e2d\u7684\u6839\u8bc1\u4e66\u5931\u8d25", e);
            }
        }
    }

    private void loadCertsFromList(InputStream listStream) throws IOException {
        byte[] listBytes = IOUtils.readByteArray(listStream);
        String listContent = new String(listBytes, "UTF-8");
        String[] certPaths = listContent.split("\\r?\\n");
        log.info("\u4ece\u8bc1\u4e66\u6e05\u5355\u6587\u4ef6\u52a0\u8f7d\uff0c\u5171 " + certPaths.length + " \u4e2a\u8bc1\u4e66\u8def\u5f84");
        int loadedCount = 0;
        for (String certPath : certPaths) {
            if ((certPath = certPath.trim()).isEmpty() || certPath.startsWith("#")) continue;
            try (InputStream certStream = this.getClass().getClassLoader().getResourceAsStream(certPath);){
                if (certStream != null) {
                    byte[] certBytes = IOUtils.readByteArray(certStream);
                    this.loadCertFromBytes(certBytes, certPath);
                    ++loadedCount;
                    continue;
                }
                log.warn("\u8bc1\u4e66\u6587\u4ef6\u672a\u627e\u5230\uff1a" + certPath);
            }
            catch (Exception e) {
                log.error("\u8bfb\u53d6JAR\u5305\u4e2d\u7684\u8bc1\u4e66\u6587\u4ef6\u5931\u8d25\uff1a" + certPath, e);
            }
        }
        log.info("\u4ece\u6e05\u5355\u6587\u4ef6\u6210\u529f\u52a0\u8f7d " + loadedCount + " \u4e2a\u8bc1\u4e66");
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    private boolean loadCertsFromJarByScanning() {
        int certCount = 0;
        try {
            String classPath = this.getClass().getProtectionDomain().getCodeSource().getLocation().getPath();
            classPath = URLDecoder.decode(classPath, "UTF-8");
            log.info("\u5c1d\u8bd5\u626b\u63cfjar\u5305\uff1a" + classPath);
            try (JarFile jarFile = new JarFile(classPath);){
                Enumeration<JarEntry> entries = jarFile.entries();
                while (entries.hasMoreElements()) {
                    JarEntry entry = entries.nextElement();
                    String entryName = entry.getName();
                    if (!entryName.startsWith("rootcerts/") || !entryName.endsWith(CERT_EXTENSION)) continue;
                    try {
                        InputStream certStream = this.getClass().getClassLoader().getResourceAsStream(entryName);
                        Throwable throwable2 = null;
                        try {
                            if (certStream != null) {
                                byte[] certBytes = IOUtils.readByteArray(certStream);
                                this.loadCertFromBytes(certBytes, entryName);
                                ++certCount;
                                continue;
                            }
                            log.warn("\u65e0\u6cd5\u6253\u5f00\u8bc1\u4e66\u6587\u4ef6\u8f93\u5165\u6d41\uff1a" + entryName);
                        }
                        catch (Throwable throwable3) {
                            throwable2 = throwable3;
                            throw throwable3;
                        }
                        finally {
                            if (certStream == null) continue;
                            if (throwable2 != null) {
                                try {
                                    certStream.close();
                                }
                                catch (Throwable throwable4) {
                                    throwable2.addSuppressed(throwable4);
                                }
                                continue;
                            }
                            certStream.close();
                        }
                    }
                    catch (Exception e) {
                        log.error("\u8bfb\u53d6JAR\u5305\u4e2d\u7684\u8bc1\u4e66\u6587\u4ef6\u5931\u8d25\uff1a" + entryName, e);
                    }
                }
                log.info("\u901a\u8fc7\u626b\u63cfjar\u5305\u52a0\u8f7d\u4e86 " + certCount + " \u4e2a\u8bc1\u4e66");
                boolean bl = certCount > 0;
                return bl;
            }
        }
        catch (Exception e) {
            log.info("\u626b\u63cfJAR\u5305\u6587\u4ef6\u5931\u8d25\uff08\u53ef\u80fd\u662f\u5d4c\u5957jar\u5305\u6216\u5176\u4ed6\u90e8\u7f72\u65b9\u5f0f\uff09\uff1a" + e.getMessage());
            return false;
        }
    }

    private void loadCertFromFile(String certPath) {
        try {
            byte[] certBytes = IOUtils.getBytes(certPath);
            this.loadCertFromBytes(certBytes, certPath);
        }
        catch (Exception e) {
            log.error("\u6839\u8bc1\u4e66\u6587\u4ef6\u8bfb\u53d6\u5931\u8d25\uff01path:" + certPath, e);
        }
    }

    private void loadCertFromBytes(byte[] certBytes, String sourcePath) {
        try {
            X509Certificate cert = SM2CertUtil.getX509Certificate(certBytes);
            if (cert == null) {
                throw new RuntimeException("\u8bc1\u4e66\u89e3\u6790\u5f02\u5e38");
            }
            String id = this.getCertID(cert);
            caRootMap.put(id, cert);
            log.info("\u6210\u529f\u52a0\u8f7d\u6839\u8bc1\u4e66\uff1a" + sourcePath);
        }
        catch (Exception e) {
            log.error("\u6839\u8bc1\u4e66\u89e3\u6790\u5931\u8d25\uff01path:" + sourcePath);
            try {
                log.error("\u8bc1\u4e66\u5185\u5bb9(Hex)\uff1a" + Hex.toHexString(certBytes));
            }
            catch (Exception ex) {
                log.error("\u8bc1\u4e66Hex\u7f16\u7801\u8f6c\u6362\u5931\u8d25", ex);
            }
        }
    }

    private Set<String> listFilesUsingJavaIO(String dir) {
        if (!new File(dir).exists()) {
            log.error("\u6839\u8bc1\u4e66\u6587\u4ef6\u5939\u4e0d\u5b58\u5728\uff01path:" + dir);
            return new HashSet<String>();
        }
        log.info("\u6839\u8bc1\u4e66\u6587\u4ef6\u5939\u8def\u5f84\uff1a" + dir);
        List<File> fileArray = this.getFile(dir);
        return fileArray.stream().filter(file -> !file.isDirectory() && file.getName().endsWith(CERT_EXTENSION)).map(File::getAbsolutePath).collect(Collectors.toSet());
    }

    private List<File> getFile(String dir) {
        File[] filesin = new File(dir).listFiles();
        if (filesin == null) {
            return new ArrayList<File>();
        }
        ArrayList<File> files = new ArrayList<File>(Arrays.asList(filesin));
        for (File file : filesin) {
            if (!file.isDirectory()) continue;
            files.addAll(this.getFile(file.getAbsolutePath()));
        }
        return files;
    }

    public boolean verifyCert(String certBase64) {
        X509Certificate _cert = this.getX509Certificate(certBase64);
        if (_cert == null) {
            log.error("\u8bc1\u4e66\u89e3\u6790\u5931\u8d25;\u5f53\u524d\u8bc1\u4e66\uff1a" + certBase64);
            return false;
        }
        String kid = this.getAuthKeyid(_cert);
        X509Certificate _parentcert = caRootMap.get(kid);
        if (_parentcert == null) {
            log.error(String.format(VERIFYERROR_MSG_TEMPLATE, kid, certBase64, caRootMap.size()));
            if (epcvLog != null) {
                epcvLog.error(String.format(VERIFYERROR_MSG_TEMPLATE, kid, certBase64, caRootMap.size()));
            }
            return !this.enableforce;
        }
        try {
            _cert.verify(_parentcert.getPublicKey(), "EPBC");
        }
        catch (Exception e) {
            log.error("\u8bc1\u4e66\u6709\u6548\u6027\u68c0\u67e5\u5f02\u5e38:" + certBase64);
            return false;
        }
        return true;
    }

    private X509Certificate getX509Certificate(String certBase64) {
        try {
            return SM2CertUtil.getX509Certificate(Base64Util.decode(certBase64));
        }
        catch (Exception e) {
            return null;
        }
    }

    private String getAuthKeyid(X509Certificate cert) {
        try {
            byte[] b = cert.getExtensionValue("2.5.29.35");
            String kid = Hex.toHexString(AuthorityKeyIdentifier.getInstance(ASN1OctetString.getInstance(b).getOctets()).getKeyIdentifier());
            return kid;
        }
        catch (Exception e) {
            return null;
        }
    }

    private String getCertID(X509Certificate cert) throws CertificateException, NoSuchProviderException, NoSuchAlgorithmException {
        byte[] b = cert.getExtensionValue("2.5.29.14");
        String kid = null;
        kid = b != null ? Hex.toHexString(SubjectKeyIdentifier.getInstance(ASN1OctetString.getInstance(b).getOctets()).getKeyIdentifier()) : EpCertVerifyService.calculateSKI(cert);
        return kid;
    }

    public static String calculateSKI(X509Certificate cert) throws NoSuchAlgorithmException {
        SubjectPublicKeyInfo spki = SubjectPublicKeyInfo.getInstance(cert.getPublicKey().getEncoded());
        String kid = Hex.toHexString(MessageDigest.getInstance("SHA-1").digest(spki.getPublicKeyData().getBytes()));
        return kid;
    }

    public static void clearCaChe() {
        caRootMap.clear();
    }

    static {
        System.setProperty("com.epoint.gmhelper.bouncycastle.asn1.allow_unsafe_integer", "true");
        epcvLog = Logger.getLogger("EPCVLogger");
        VERIFYERROR_MSG_TEMPLATE = "\u672a\u627e\u5230\u9881\u53d1\u8005\u6839\u8bc1\u4e66\uff0c\u6839\u8bc1\u4e66\u5bc6\u94a5\u6807\u8bc6\u7b26\uff1a%s;\u7b7e\u540d\u8bc1\u4e66\uff1a%s\uff0c\u5f53\u524d\u6839\u8bc1\u4e66\u6570\u91cf\uff1a%d";
    }
}


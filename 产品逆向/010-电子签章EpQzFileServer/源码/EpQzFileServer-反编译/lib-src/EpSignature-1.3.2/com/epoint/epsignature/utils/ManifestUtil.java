/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.utils.StringUtil;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

public class ManifestUtil {
    private static String PDFJS_SVN_VERSION;
    public static final String VERSION_SOURCE_PATH = "/revision.txt";
    private static String EPSIGNATURE_VERSION;
    private static String EPSIGNATURE_SVN_VERSION;
    private static Logger log;

    public String readVersionsFromJarFile() throws IOException {
        InputStream inputStream = null;
        if (StringUtil.isNotBlank(EPSIGNATURE_VERSION)) {
            return new StringBuilder().insert(0, EPSIGNATURE_VERSION).append(PDFHighlightAnnotationReq.J("I")).append(EPSIGNATURE_SVN_VERSION).append(DZYYZZReq.J("\"")).append(PDFJS_SVN_VERSION).toString();
        }
        try {
            Properties properties;
            inputStream = EpSignatureApi.class.getResourceAsStream(VERSION_SOURCE_PATH);
            Properties properties2 = properties = new Properties();
            Properties properties3 = properties;
            properties3.load(inputStream);
            EPSIGNATURE_VERSION = properties3.getProperty(PDFHighlightAnnotationReq.J("\u007fh{~`bg"));
            PDFJS_SVN_VERSION = properties2.getProperty(DZYYZZReq.J("\u0012\\\u0004R\u0011K\u0014V\u0014]\u0010K\u000bW\f"));
            EPSIGNATURE_SVN_VERSION = properties2.getProperty(PDFHighlightAnnotationReq.J("l}zdnchy|\u007fl~\u007fc\u007fh{~`bg"));
            log.info(new StringBuilder().insert(0, DZYYZZReq.J("\u83d5\u53ee'h1q%v#l7j'g4}0k+w,")).append(EPSIGNATURE_VERSION).toString());
        }
        catch (Exception exception) {
            log.error(new StringBuilder().insert(0, PDFHighlightAnnotationReq.J("{hhi_h{~`bg~O\u007ff`Cl{K`al")).append(exception.getMessage()).toString(), exception);
        }
        finally {
            if (inputStream != null) {
                inputStream.close();
            }
        }
        return new StringBuilder().insert(0, EPSIGNATURE_VERSION).append(DZYYZZReq.J("\"")).append(EPSIGNATURE_SVN_VERSION).append(PDFHighlightAnnotationReq.J("I")).append(PDFJS_SVN_VERSION).toString();
    }

    public ManifestUtil() {
        ManifestUtil a;
    }

    static {
        log = LogManager.getLogger(ManifestUtil.class);
        EPSIGNATURE_SVN_VERSION = "";
        PDFJS_SVN_VERSION = "";
        EPSIGNATURE_VERSION = "";
    }
}


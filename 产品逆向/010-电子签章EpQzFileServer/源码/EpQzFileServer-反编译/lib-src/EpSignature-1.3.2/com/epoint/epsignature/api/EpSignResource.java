/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.api;

import com.epoint.epsignature.utils.IOUtils;
import java.io.IOException;
import org.apache.log4j.Logger;

public class EpSignResource {
    public static final String BZT_SOURCE_PATH = "/META-INF/resources/epsignature/bztsource/";
    private static Logger logger = Logger.getLogger(EpSignResource.class);

    public String getEpMcertjs() {
        return this.getQrV2Depends() + this.getQrUtfDepends() + this.getBztResource("lib/EpMCert.js");
    }

    public String getQrDepends() {
        return this.getBztResource("libs/qrcode.min.js");
    }

    public String getQrV2Depends() {
        return this.getBztResource("lib/jquery.qrcode.js");
    }

    public String getQrUtfDepends() {
        return this.getBztResource("lib/utf.js");
    }

    public String getBztResource(String path) {
        try {
            return IOUtils.readFromResource(BZT_SOURCE_PATH + path);
        }
        catch (IOException e) {
            logger.error(e.getMessage(), e);
            throw new RuntimeException(path + " \u8d44\u6e90\u83b7\u53d6\u5931\u8d25\uff01", e);
        }
    }

    public String getEpMCert332js() {
        return this.getQrV2Depends() + this.getQrUtfDepends() + this.getBztResource("lib/EpMCert332.js");
    }

    public String getEpMCert356js() {
        return this.getQrV2Depends() + this.getQrUtfDepends() + this.getBztResource("lib/EpMCert356.js");
    }

    public String getEpMCert357js() {
        return this.getQrV2Depends() + this.getQrUtfDepends() + this.getBztResource("lib/EpMCert357.js");
    }

    public String getEpMCert391js() {
        return this.getQrV2Depends() + this.getQrUtfDepends() + this.getBztResource("lib/EpMCert391.js");
    }
}


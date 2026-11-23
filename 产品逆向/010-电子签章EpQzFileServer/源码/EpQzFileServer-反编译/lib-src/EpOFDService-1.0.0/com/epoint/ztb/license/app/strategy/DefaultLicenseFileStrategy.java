/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.license.app.strategy;

import com.epoint.epsignature.utils.IOUtils;
import com.epoint.gm.bizlogic.ClassPathUtil;
import com.epoint.ztb.license.app.exception.LicenseException;
import com.epoint.ztb.license.app.exception.LicenseRuntimeException;
import com.epoint.ztb.license.app.strategy.base.LicenseFileStrategy;
import java.io.File;
import java.net.URL;
import java.util.Base64;

public class DefaultLicenseFileStrategy
implements LicenseFileStrategy {
    private final String LICENSE_FILE_NAME = "EpSignature.lic";
    private static final String MVN_TAG = "target/classes/";

    @Override
    public byte[] parseLicenseFile() throws LicenseException {
        try {
            String licHome = ClassPathUtil.getDeployWarPath() + "WEB-INF" + File.separator + "classes" + File.separator;
            String licHome2 = DefaultLicenseFileStrategy.getLicPath();
            String licHome3 = licHome2 + "keys" + File.separator;
            String licHome4 = File.separator;
            if (new File(licHome + "EpSignature.lic").exists()) {
                return Base64.getDecoder().decode(IOUtils.readToString(licHome + "EpSignature.lic"));
            }
            if (new File(licHome2 + "EpSignature.lic").exists()) {
                return Base64.getDecoder().decode(IOUtils.readToString(licHome2 + "EpSignature.lic"));
            }
            if (new File(licHome3 + "EpSignature.lic").exists()) {
                return Base64.getDecoder().decode(IOUtils.readToString(licHome3 + "EpSignature.lic"));
            }
            if (new File(licHome4 + "EpSignature.lic").exists()) {
                return Base64.getDecoder().decode(IOUtils.readToString(licHome4 + "EpSignature.lic"));
            }
            throw new LicenseRuntimeException("\u672a\u627e\u5230\u6388\u6743\u6587\u4ef6\uff0c\u8bf7\u7533\u8bf7\u6388\u6743\uff01\u6388\u6743\u6587\u4ef6\u4f4d\u7f6e\uff1a" + String.join((CharSequence)";", licHome, licHome2, licHome3, licHome4));
        }
        catch (Exception e) {
            throw new LicenseException("\u9ed8\u8ba4\u7b56\u7565-license\u6587\u4ef6\u89e3\u6790\u5931\u8d25", e);
        }
    }

    private static String getLicPath() {
        String licPath = ClassPathUtil.getLibPath();
        URL url = DefaultLicenseFileStrategy.class.getResource("/");
        String clsPath = url.getFile();
        if (clsPath.indexOf(MVN_TAG) > 0) {
            int index = clsPath.indexOf(MVN_TAG);
            if (index != -1) {
                licPath = clsPath.substring(0, index) + "src/main/resources/";
            }
            return licPath;
        }
        return licPath;
    }
}


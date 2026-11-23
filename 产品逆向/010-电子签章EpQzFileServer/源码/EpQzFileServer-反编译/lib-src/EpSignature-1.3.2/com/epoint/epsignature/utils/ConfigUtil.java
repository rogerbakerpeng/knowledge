/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.utils.EpFileServerUtil;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.epsignature.utils.TZGMVerifyPdf;
import java.util.ResourceBundle;
import org.apache.log4j.Logger;

public class ConfigUtil {
    private static Logger log = Logger.getLogger(ConfigUtil.class);

    public ConfigUtil() {
        ConfigUtil a;
    }

    public static String getConfigValue(String a) {
        return ConfigUtil.getConfigValue(TZGMVerifyPdf.J("u\u0014\u007f\r~\u0010v\u0016q\tu"), a);
    }

    public static String getConfigValue(String a, String a2) {
        String string = com.epoint.gm.bizlogic.ConfigUtil.getConfigValue(a, a2);
        if (StringUtil.isNotBlank(string)) {
            return string;
        }
        try {
            ResourceBundle resourceBundle = ResourceBundle.getBundle(a);
            if (resourceBundle.containsKey(a2) && StringUtil.isNotBlank(string = new String(resourceBundle.getString(a2).getBytes(EpFileServerUtil.J("\u0018\u000b\u001eui`da|i")), TZGMVerifyPdf.J("1D\"(")))) {
                string = string.trim();
            }
        }
        catch (Exception exception) {
            log.error(exception);
        }
        return string;
    }
}


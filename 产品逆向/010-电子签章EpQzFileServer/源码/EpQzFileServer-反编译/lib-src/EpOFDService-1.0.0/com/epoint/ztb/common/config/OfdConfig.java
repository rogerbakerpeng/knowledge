/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="ofd")
public class OfdConfig {
    private static String tempfilepath;

    public static String getTempfilepath() {
        return tempfilepath;
    }

    public static void setTempfilepath(String tempfilepath) {
        OfdConfig.tempfilepath = tempfilepath;
    }
}


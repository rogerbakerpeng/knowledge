/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource(value={"classpath:epqzfileserverconfig.properties", "file:${spring.profiles.path}/epqzfileserverconfig.properties"}, ignoreResourceNotFound=true)
@Component
@ConfigurationProperties(prefix="convert")
public class EpQzFileConvertConfig {
    private String appkey;
    private String appsecret;
    private String serverurl;

    public String getAppkey() {
        return this.appkey;
    }

    public void setAppkey(String appkey) {
        this.appkey = appkey;
    }

    public String getAppsecret() {
        return this.appsecret;
    }

    public void setAppsecret(String appsecret) {
        this.appsecret = appsecret;
    }

    public String getServerurl() {
        return this.serverurl;
    }

    public void setServerurl(String serverurl) {
        this.serverurl = serverurl;
    }
}


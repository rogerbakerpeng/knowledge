/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix="epoint")
public class EpointOfdConfig {
    private String appkey;
    private String appsecret;
    private String pfxpassword;
    private String liaoningbaohanappkey;
    private String liaoningbaohanappsecret;
    private String filepath;
    private String serverappkey;
    private String serverappsecret;
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

    public String getFilepath() {
        return this.filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public String getServerappkey() {
        return this.serverappkey;
    }

    public void setServerappkey(String serverappkey) {
        this.serverappkey = serverappkey;
    }

    public String getServerappsecret() {
        return this.serverappsecret;
    }

    public void setServerappsecret(String serverappsecret) {
        this.serverappsecret = serverappsecret;
    }

    public String getServerurl() {
        return this.serverurl;
    }

    public void setServerurl(String serverurl) {
        this.serverurl = serverurl;
    }

    public String getPfxpassword() {
        return this.pfxpassword;
    }

    public void setPfxpassword(String pfxpassword) {
        this.pfxpassword = pfxpassword;
    }

    public String getLiaoningbaohanappkey() {
        return this.liaoningbaohanappkey;
    }

    public void setLiaoningbaohanappkey(String liaoningbaohanappkey) {
        this.liaoningbaohanappkey = liaoningbaohanappkey;
    }

    public String getLiaoningbaohanappsecret() {
        return this.liaoningbaohanappsecret;
    }

    public void setLiaoningbaohanappsecret(String liaoningbaohanappsecret) {
        this.liaoningbaohanappsecret = liaoningbaohanappsecret;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource(value={"classpath:epqzfileserverconfig.properties", "file:${spring.profiles.path}/epqzfileserverconfig.properties"}, ignoreResourceNotFound=true)
@Component
@ConfigurationProperties(prefix="server")
public class EpQzFileServerOfdConfig {
    private String appkey;
    private String appsecret;
    private String huaweiurl;
    private String mcerturl;
    private String epqzfileserverurl;
    private String protocol;
    private String projectname;
    private String isCoverSrc;
    private String bztpageurl;
    private String isenableverify;
    private String packagename;
    private String sourceTitle;
    private String cloudappkey;
    private String cloudappsecret;
    private String wxdturl;

    public String getWxdturl() {
        return this.wxdturl;
    }

    public void setWxdturl(String wxdturl) {
        this.wxdturl = wxdturl;
    }

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

    public String getMcerturl() {
        return this.mcerturl;
    }

    public void setMcerturl(String mcerturl) {
        this.mcerturl = mcerturl;
    }

    public String getHuaweiurl() {
        return this.huaweiurl;
    }

    public void setHuaweiurl(String huaweiurl) {
        this.huaweiurl = huaweiurl;
    }

    public String getEpqzfileserverurl() {
        return this.epqzfileserverurl;
    }

    public void setEpqzfileserverurl(String epqzfileserverurl) {
        this.epqzfileserverurl = epqzfileserverurl;
    }

    public String getIsCoverSrc() {
        return this.isCoverSrc;
    }

    public void setIsCoverSrc(String isCoverSrc) {
        this.isCoverSrc = isCoverSrc;
    }

    public String getProtocol() {
        return this.protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getProjectname() {
        return this.projectname;
    }

    public void setProjectname(String projectname) {
        this.projectname = projectname;
    }

    public String getBztpageurl() {
        return this.bztpageurl;
    }

    public void setBztpageurl(String bztpageurl) {
        this.bztpageurl = bztpageurl;
    }

    public String getIsenableverify() {
        return this.isenableverify;
    }

    public void setIsenableverify(String isenableverify) {
        this.isenableverify = isenableverify;
    }

    public String getPackagename() {
        return this.packagename;
    }

    public void setPackagename(String packagename) {
        this.packagename = packagename;
    }

    public String getSourceTitle() {
        return this.sourceTitle;
    }

    public void setSourceTitle(String sourceTitle) {
        this.sourceTitle = sourceTitle;
    }

    public String getCloudappkey() {
        return this.cloudappkey;
    }

    public void setCloudappkey(String cloudappkey) {
        this.cloudappkey = cloudappkey;
    }

    public String getCloudappsecret() {
        return this.cloudappsecret;
    }

    public void setCloudappsecret(String cloudappsecret) {
        this.cloudappsecret = cloudappsecret;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.ofd.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="dianju")
public class DianjuConfig {
    private String downloadurl;
    private String sys_id;
    private String serverurl;

    public String getDownloadurl() {
        return this.downloadurl;
    }

    public void setDownloadurl(String downloadurl) {
        this.downloadurl = downloadurl;
    }

    public String getSys_id() {
        return this.sys_id;
    }

    public void setSys_id(String sys_id) {
        this.sys_id = sys_id;
    }

    public String getServerurl() {
        return this.serverurl;
    }

    public void setServerurl(String serverurl) {
        this.serverurl = serverurl;
    }
}


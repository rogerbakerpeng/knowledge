/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.cloudsign.model;

import org.hibernate.validator.constraints.NotEmpty;

public class SignFileRequest {
    private String requesttime;
    @NotEmpty
    private String fileid;
    @NotEmpty
    private String username;
    @NotEmpty
    private String idcard;
    @NotEmpty
    private String signimg;
    @NotEmpty
    private String keyword;
    @NotEmpty
    private String token;
    private String cloudAppkey;
    private String cloudAppsecret;

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getKeyword() {
        return this.keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getSignimg() {
        return this.signimg;
    }

    public void setSignimg(String signimg) {
        this.signimg = signimg;
    }

    public String getIdcard() {
        return this.idcard;
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFileid() {
        return this.fileid;
    }

    public void setFileid(String fileid) {
        this.fileid = fileid;
    }

    public String getRequesttime() {
        return this.requesttime;
    }

    public void setRequesttime(String requesttime) {
        this.requesttime = requesttime;
    }

    public String getCloudAppkey() {
        return this.cloudAppkey;
    }

    public void setCloudAppkey(String cloudAppkey) {
        this.cloudAppkey = cloudAppkey;
    }

    public String getCloudAppsecret() {
        return this.cloudAppsecret;
    }

    public void setCloudAppsecret(String cloudAppsecret) {
        this.cloudAppsecret = cloudAppsecret;
    }
}


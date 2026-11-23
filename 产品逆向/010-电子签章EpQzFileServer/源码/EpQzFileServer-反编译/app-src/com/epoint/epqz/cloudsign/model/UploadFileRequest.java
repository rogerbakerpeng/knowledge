/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.cloudsign.model;

import org.hibernate.validator.constraints.NotEmpty;

public class UploadFileRequest {
    private String requesttime;
    @NotEmpty
    private String fileid;
    @NotEmpty
    private String content;
    private String filename;
    private String pos;
    private String filelen;
    @NotEmpty
    private String token;

    public String getFilelen() {
        return this.filelen;
    }

    public void setFilelen(String filelen) {
        this.filelen = filelen;
    }

    public String getRequesttime() {
        return this.requesttime;
    }

    public void setRequesttime(String requesttime) {
        this.requesttime = requesttime;
    }

    public String getFileid() {
        return this.fileid;
    }

    public void setFileid(String fileid) {
        this.fileid = fileid;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFilename() {
        return this.filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getPos() {
        return this.pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}


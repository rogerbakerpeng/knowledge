/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.cloudsign.model;

import javax.servlet.http.HttpServletResponse;
import org.hibernate.validator.constraints.NotEmpty;

public class DownloadFileRequest {
    private String requesttime;
    @NotEmpty
    private String fileid;
    @NotEmpty
    private String token;
    private String filename;
    private HttpServletResponse response;

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
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

    public String getFilename() {
        return this.filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public HttpServletResponse getResponse() {
        return this.response;
    }

    public void setResponse(HttpServletResponse response) {
        this.response = response;
    }
}


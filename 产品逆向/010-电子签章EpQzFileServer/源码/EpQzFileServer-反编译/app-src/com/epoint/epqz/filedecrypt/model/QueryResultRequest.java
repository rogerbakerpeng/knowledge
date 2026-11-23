/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.model;

import org.hibernate.validator.constraints.NotBlank;

public class QueryResultRequest {
    @NotBlank(message="token不能为空")
    private String token;
    @NotBlank(message="待解密投标文件路径不能为空")
    private String filepath;
    private Integer filepath_mode;
    @NotBlank(message="二维码ID不能为空")
    private String qrcodeid;

    public String getQrcodeid() {
        return this.qrcodeid;
    }

    public void setQrcodeid(String qrcodeid) {
        this.qrcodeid = qrcodeid;
    }

    public String getFilepath() {
        return this.filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getFilepath_mode() {
        return this.filepath_mode;
    }

    public void setFilepath_mode(Integer filepath_mode) {
        this.filepath_mode = filepath_mode;
    }
}


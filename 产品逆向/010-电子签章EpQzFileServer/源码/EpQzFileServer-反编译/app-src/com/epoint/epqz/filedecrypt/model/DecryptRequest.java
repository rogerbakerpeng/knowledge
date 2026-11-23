/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.model;

import org.hibernate.validator.constraints.NotBlank;

public class DecryptRequest {
    @NotBlank(message="token不能为空")
    private String token;
    @NotBlank(message="待解密投标文件路径不能为空")
    private String filepath;
    private Integer filepath_mode;

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFilepath() {
        return this.filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public Integer getFilepath_mode() {
        return this.filepath_mode;
    }

    public void setFilepath_mode(Integer filepath_mode) {
        this.filepath_mode = filepath_mode;
    }
}


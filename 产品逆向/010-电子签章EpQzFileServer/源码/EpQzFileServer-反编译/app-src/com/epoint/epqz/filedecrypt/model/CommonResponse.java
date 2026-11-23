/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.model;

import com.alibaba.fastjson.JSONObject;

public class CommonResponse {
    private Status status;
    private JSONObject custom;

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public JSONObject getCustom() {
        return this.custom;
    }

    public void setCustom(JSONObject custom) {
        this.custom = custom;
    }

    public static class Status {
        private int code;
        private String text;

        public int getCode() {
            return this.code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public String getText() {
            return this.text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }
}


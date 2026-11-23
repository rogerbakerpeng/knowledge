/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.web.domain;

import com.alibaba.fastjson.JSON;
import com.epoint.ztb.web.domain.ErrorEnums;
import java.util.HashMap;
import org.apache.commons.lang3.StringUtils;

public class AjaxResult
extends HashMap<String, Object> {
    private static final long serialVersionUID = 1L;
    public static final String CODE_TAG = "code";
    public static final String MSG_TAG = "msg";
    public static final String DATA_TAG = "data";

    public AjaxResult() {
    }

    public AjaxResult(String code, String msg) {
        super.put(CODE_TAG, code);
        super.put(MSG_TAG, msg);
    }

    public AjaxResult(String code, String msg, Object data) {
        super.put(CODE_TAG, code);
        super.put(MSG_TAG, msg);
        if (StringUtils.isNoneBlank((CharSequence)data)) {
            super.put(DATA_TAG, data);
        }
    }

    public static AjaxResult success() {
        return AjaxResult.success("\u64cd\u4f5c\u6210\u529f");
    }

    public static AjaxResult success(Object data) {
        return AjaxResult.success("\u64cd\u4f5c\u6210\u529f", data);
    }

    public static AjaxResult success(String msg) {
        return AjaxResult.success(msg, null);
    }

    public static AjaxResult success(String msg, Object data) {
        return new AjaxResult(ErrorEnums.SUCCESS.getCode(), msg, data);
    }

    public static AjaxResult error() {
        return AjaxResult.error("\u64cd\u4f5c\u5931\u8d25");
    }

    public static AjaxResult error(String msg) {
        return AjaxResult.error(ErrorEnums.SERVER_ERROR.getCode(), msg);
    }

    public static AjaxResult error(String msg, Object data) {
        return new AjaxResult(ErrorEnums.SERVER_ERROR.getCode(), msg, data);
    }

    public static AjaxResult error(String code, String msg) {
        return new AjaxResult(code, msg, null);
    }

    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }
}


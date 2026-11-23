/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.exception;

public class ValidateTokenException
extends RuntimeException {
    private String module;
    private String code;
    private String defaultMessage;

    public ValidateTokenException(String defaultMessage) {
        this.defaultMessage = defaultMessage;
    }

    @Override
    public String getMessage() {
        return this.defaultMessage;
    }
}


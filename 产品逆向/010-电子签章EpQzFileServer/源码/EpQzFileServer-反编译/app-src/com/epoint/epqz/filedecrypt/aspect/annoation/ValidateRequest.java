/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.aspect.annoation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value={ElementType.METHOD})
@Retention(value=RetentionPolicy.RUNTIME)
public @interface ValidateRequest {
    public String value();
}


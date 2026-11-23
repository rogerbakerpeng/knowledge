/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.validate.service;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Inherited
@Documented
@Target(value={ElementType.FIELD, ElementType.TYPE, ElementType.METHOD})
@Retention(value=RetentionPolicy.RUNTIME)
public @interface ValidateToken {
    public String desc() default "token\u6570\u636e\u9a8c\u8bc1\u5f00\u59cb...";
}


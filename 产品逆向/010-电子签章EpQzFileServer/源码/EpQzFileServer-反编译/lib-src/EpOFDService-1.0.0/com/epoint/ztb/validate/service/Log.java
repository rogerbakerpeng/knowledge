/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.validate.service;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value={ElementType.PARAMETER, ElementType.METHOD})
@Retention(value=RetentionPolicy.RUNTIME)
@Documented
public @interface Log {
    public String title() default "";

    public String businessType() default "";

    public String operatorType() default "";

    public String operatorTable() default "";

    public String operatorUserGuid() default "";

    public String operatorUserName() default "";

    public String operatorContent() default "";

    public boolean isSaveRequestData() default true;
}


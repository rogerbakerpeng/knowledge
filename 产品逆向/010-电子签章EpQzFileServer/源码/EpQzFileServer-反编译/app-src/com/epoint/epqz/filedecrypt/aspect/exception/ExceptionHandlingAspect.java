/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.aspect.exception;

import com.epoint.epqz.filedecrypt.enums.ResponseEnum;
import com.epoint.epqz.filedecrypt.util.CommonUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.jobs.TempFileCleanJob;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ExceptionHandlingAspect {
    private static final Logger ALLATORIxDEMO = LoggerFactory.getLogger(ExceptionHandlingAspect.class);

    /*
     * WARNING - void declaration
     */
    @Around(value="within(@org.springframework.stereotype.Service com.epoint.epqz.filedecrypt.service..*)")
    public Object handleExceptions(ProceedingJoinPoint proceedingJoinPoint) {
        void a;
        ExceptionHandlingAspect exceptionHandlingAspect = this;
        try {
            return a.proceed();
        }
        catch (Throwable a2) {
            ALLATORIxDEMO.error("方法执行异常: {}", (Object)a.getSignature(), (Object)a2);
            return JSONUtils.bean2json(CommonUtil.buildErrorResponse(ResponseEnum.请求失败, "系统处理异常"));
        }
    }

    public ExceptionHandlingAspect() {
        ExceptionHandlingAspect a;
    }
}


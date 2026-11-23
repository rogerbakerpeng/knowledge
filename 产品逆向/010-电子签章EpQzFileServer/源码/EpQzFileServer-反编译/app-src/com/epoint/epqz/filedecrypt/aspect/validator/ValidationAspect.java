/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.aspect.validator;

import com.epoint.configuration.EpQzFileServerConfig;
import com.epoint.epqz.filedecrypt.aspect.annoation.ValidateRequest;
import com.epoint.epqz.filedecrypt.enums.ResponseEnum;
import com.epoint.epqz.filedecrypt.util.CommonUtil;
import com.epoint.epsignature.utils.JSONUtils;
import java.lang.reflect.Field;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ValidationAspect {
    private static final Logger log = LoggerFactory.getLogger(ValidationAspect.class);
    @Autowired
    private EpQzFileServerConfig epQzFileServerConfig;
    @Autowired
    private Validator validator;

    @Around(value="@annotation(validateRequest)")
    public Object validateRequest(ProceedingJoinPoint joinPoint, ValidateRequest validateRequest) throws Throwable {
        Object[] args = joinPoint.getArgs();
        if (args.length == 0) {
            throw new IllegalArgumentException("未找到请求参数");
        }
        Object requestObj = args[0];
        String operation = validateRequest.value();
        Set<ConstraintViolation<Object>> violations = this.validator.validate(requestObj, new Class[0]);
        if (!violations.isEmpty()) {
            String errorMsg = violations.stream().map(v -> v.getPropertyPath() + ": " + v.getMessage()).collect(Collectors.joining(", "));
            log.warn("{}操作参数校验失败: {}", (Object)operation, (Object)errorMsg);
            return JSONUtils.bean2json(CommonUtil.buildErrorResponse(ResponseEnum.请求失败, errorMsg));
        }
        if (requestObj.getClass().getDeclaredField("token") != null) {
            Field tokenField = requestObj.getClass().getDeclaredField("token");
            tokenField.setAccessible(true);
            String token = (String)tokenField.get(requestObj);
            if (!CommonUtil.validateToken(this.epQzFileServerConfig, token)) {
                log.warn("{}操作token验证失败", (Object)operation);
                return JSONUtils.bean2json(CommonUtil.buildErrorResponse(ResponseEnum.请求失败, "token验证失败！"));
            }
        }
        return joinPoint.proceed();
    }
}


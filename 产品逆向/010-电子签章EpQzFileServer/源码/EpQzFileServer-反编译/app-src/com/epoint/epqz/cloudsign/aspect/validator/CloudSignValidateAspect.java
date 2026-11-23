/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.cloudsign.aspect.validator;

import com.epoint.epqz.cloudsign.aspect.annoation.CloudSignValidateAnnoation;
import com.epoint.epqz.cloudsign.model.SignFileRequest;
import com.epoint.gmhelper.util.TokenUtil;
import com.epoint.ztb.common.exception.ValidateTokenException;
import com.epoint.ztb.common.utils.LicenseUtil;
import com.epoint.ztb.epqz.pdf.enums.StatusCodeEnum;
import com.epoint.ztb.jobs.UploadYmlJobs;
import com.epoint.ztb.web.domain.AjaxResult;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
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
public class CloudSignValidateAspect {
    private static final Logger log = LoggerFactory.getLogger(CloudSignValidateAspect.class);
    public static final String appKey = "EpOFD";
    public static final String appSecret = "EpOFD@Gepoint";
    @Autowired
    private Validator validator;

    @Around(value="@annotation(cloudSignValidateAnnoation)")
    public Object validateRequest(ProceedingJoinPoint joinPoint, CloudSignValidateAnnoation cloudSignValidateAnnoation) throws Throwable {
        Map<Object, Object> map_license = new HashMap();
        Object[] args = joinPoint.getArgs();
        if (args.length == 0) {
            throw new IllegalArgumentException("未找到请求参数");
        }
        Object requestObj = args[0];
        String operation = cloudSignValidateAnnoation.value();
        Set<ConstraintViolation<Object>> violations = this.validator.validate(requestObj, new Class[0]);
        if (!violations.isEmpty()) {
            String errorMsg = violations.stream().map(v -> v.getPropertyPath() + ": " + v.getMessage()).collect(Collectors.joining(", "));
            log.warn("{}操作参数校验失败: {}", (Object)operation, (Object)errorMsg);
            return AjaxResult.error(StatusCodeEnum.系统执行出错.getValue(), errorMsg).toString();
        }
        if (requestObj.getClass().getDeclaredField("token") != null) {
            Field tokenField = requestObj.getClass().getDeclaredField("token");
            tokenField.setAccessible(true);
            String token = (String)tokenField.get(requestObj);
            if (token.contains("||")) {
                map_license = LicenseUtil.licenseCheck(token.split("\\|\\|")[1]);
                if (!"sucess".equals(map_license.get("licenseResult"))) {
                    throw new ValidateTokenException("尚未激活，请先激活软件！");
                }
                if (UploadYmlJobs.getBanneddanwei().contains(map_license.get("licdesc").toString())) {
                    throw new ValidateTokenException("贵单位尚未激活本软件，请先激活软件！");
                }
                log.info("license内容" + map_license.get("licenseName") + "@" + map_license.get("licdesc"));
                if (!TokenUtil.validateToken(token.split("\\|\\|")[0], appKey, appSecret, "")) {
                    log.warn("{}操作token验证失败", (Object)operation);
                    return AjaxResult.error(StatusCodeEnum.系统执行出错.getValue(), "token验证失败！").toString();
                }
                if (requestObj.getClass().equals(SignFileRequest.class) && map_license.size() >= 8) {
                    String cloudAppkey = (String)map_license.get("platformcode");
                    String cloudAppsecret = (String)map_license.get("appsecret");
                    try {
                        SignFileRequest signRequest = (SignFileRequest)requestObj;
                        this.setFieldValue(signRequest, "cloudAppkey", cloudAppkey);
                        this.setFieldValue(signRequest, "cloudAppsecret", cloudAppsecret);
                        log.debug("云签平台配置已注入: appkey={}, appsecret={}", (Object)cloudAppkey, (Object)cloudAppsecret);
                    }
                    catch (Exception e) {
                        log.error("设置云签平台配置失败: {}", (Object)e.getMessage(), (Object)e);
                    }
                }
            }
        }
        return joinPoint.proceed();
    }

    private void setFieldValue(Object target, String fieldName, Object value) throws NoSuchFieldException, IllegalAccessException {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, value);
        field.setAccessible(false);
    }
}


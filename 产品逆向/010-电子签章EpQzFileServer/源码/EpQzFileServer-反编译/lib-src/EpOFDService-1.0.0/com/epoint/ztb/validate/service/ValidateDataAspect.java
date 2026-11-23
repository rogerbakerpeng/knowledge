/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.validate.service;

import com.alibaba.fastjson.JSONObject;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.util.TokenUtil;
import com.epoint.ztb.common.exception.ValidateTokenException;
import com.epoint.ztb.common.utils.LicenseUtil;
import com.epoint.ztb.jobs.UploadYmlJobs;
import com.epoint.ztb.validate.service.ValidateToken;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ValidateDataAspect {
    private static final Map<String, String> immutableStaticMap;
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public static final String appKey = "EpOFD";
    public static final String appSecret = "EpOFD@Gepoint";
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Pointcut(value="execution(* com.epoint.ztb.ofd.service..*.*(..))")
    public void declareJointPointExpression() {
    }

    @Before(value="declareJointPointExpression()")
    public void beforeHandleControllerMethod(JoinPoint joinPoint) throws Throwable {
        Map<Object, Object> map_license = new HashMap();
        boolean isHtml = false;
        MethodSignature methodSignature = (MethodSignature)joinPoint.getSignature();
        String methodName = methodSignature.getName();
        Object[] parameterNames = methodSignature.getParameterNames();
        Class[] clazzs = methodSignature.getParameterTypes();
        Object[] args = joinPoint.getArgs();
        JSONObject jsonObject = new JSONObject();
        int tokenIndex = ArrayUtils.indexOf(parameterNames, "token");
        isHtml = Arrays.asList(parameterNames).contains("encparams");
        ValidateToken antoken = methodSignature.getMethod().getAnnotation(ValidateToken.class);
        if (antoken != null) {
            String token = "";
            try {
                if (tokenIndex == -1 || StringUtils.isBlank((String)args[tokenIndex])) {
                    token = this.getTokenByargs(args, clazzs, isHtml);
                    if (StringUtils.isBlank(token)) {
                        jsonObject.put("msg", (Object)"\u7f3a\u5c11token\u53c2\u6570");
                        throw new ValidateTokenException("\u7f3a\u5c11token\u53c2\u6570");
                    }
                } else {
                    token = (String)args[tokenIndex];
                }
                if (token.contains("||")) {
                    map_license = LicenseUtil.licenseCheck(token.split("\\|\\|")[1]);
                    if (!"sucess".equals(map_license.get("licenseResult"))) {
                        throw new ValidateTokenException("\u5c1a\u672a\u6fc0\u6d3b\uff0c\u8bf7\u5148\u6fc0\u6d3b\u8f6f\u4ef6\uff01");
                    }
                    if (UploadYmlJobs.getBanneddanwei().contains(map_license.get("licdesc").toString())) {
                        throw new ValidateTokenException("\u8d35\u5355\u4f4d\u5c1a\u672a\u6fc0\u6d3b\u672c\u8f6f\u4ef6\uff0c\u8bf7\u5148\u6fc0\u6d3b\u8f6f\u4ef6\uff01");
                    }
                    this.logger.info("license\u5185\u5bb9" + map_license.get("licenseName") + "@" + map_license.get("licdesc"));
                    this.logger.info("fromtime:" + this.sdf.format(new Date()) + ", abilitytype:OFD, apidescription:" + immutableStaticMap.get(methodName) + ", platformname:\u6570\u636e\u670d\u52a1\u5e73\u53f0, projectname:" + map_license.get("licenseName") + ", appname:EpQzFileServer, productname:\u6295\u6807\u7535\u5b50\u4fdd\u51fd, ip:, areaname:, buname:\u6570\u636e\u670d\u52a1BU, version:1.0.0, appkey:\u6570\u636e\u670d\u52a1\u5e73\u53f0, userguid:, rowguid:" + UUID.randomUUID().toString());
                    if (!TokenUtil.validateToken(token.split("\\|\\|")[0], appKey, appSecret, "")) {
                        throw new ValidateTokenException("token\u6821\u9a8c\u4e0d\u901a\u8fc7");
                    }
                } else if (!TokenUtil.validateToken(token, appKey, appSecret, "")) {
                    throw new ValidateTokenException("token\u6821\u9a8c\u4e0d\u901a\u8fc7");
                }
            }
            catch (Exception e) {
                this.logger.error("token\u6821\u9a8c\u5931\u8d25", e);
                throw new ValidateTokenException("token\u6821\u9a8c\u5931\u8d25");
            }
        }
    }

    private String getTokenByargs(Object[] args, Class[] parameterTypes, boolean isHtml) throws ClassNotFoundException {
        String token = "";
        try {
            for (Class parametertype : parameterTypes) {
                if (parametertype.isAssignableFrom(JSONObject.class)) {
                    Map requestmap = (Map)args[0];
                    token = requestmap.get("token").toString();
                    continue;
                }
                if (isHtml) {
                    JSONObject jsonStr = JSONObject.parseObject(Base64Util.decode2string((String)args[0]));
                    if (jsonStr == null) continue;
                    return jsonStr.getString("token");
                }
                try {
                    Method method = parametertype.getDeclaredMethod("getToken", new Class[0]);
                    token = (String)method.invoke(this.parseObject(args[0], parametertype), new Object[0]);
                }
                catch (Exception exception) {
                    // empty catch block
                }
            }
        }
        catch (Exception e) {
            this.logger.error("\u8f6c\u6362\u7c7b\u578b\u5931\u8d25", e);
        }
        return token;
    }

    private <T> T parseObject(Object source, Class<T> clazz) {
        Object t = source;
        return (T)t;
    }

    static {
        HashMap<String, String> tempMap = new HashMap<String, String>();
        tempMap.put("UploadFile", "\u4e0a\u4f20\u6587\u4ef6\u63a5\u53e3");
        tempMap.put("ConvertPDF2OFD", "PDF\u8f6cOFD\u63a5\u53e3");
        tempMap.put("GetFile", "\u4e0b\u8f7d\u6587\u4ef6\u63a5\u53e3");
        tempMap.put("AddAttachments", "OFD\u9644\u4ef6\u6dfb\u52a0\u63a5\u53e3");
        tempMap.put("SignLocal", "OFD\u7b7e\u540d\u63a5\u53e3");
        tempMap.put("getToBSign", "\u83b7\u53d6OFD\u4ee3\u7b7e\u540d\u503c\u63a5\u53e3");
        tempMap.put("ConvertOfd2Img", "OFD\u8f6c\u56fe\u7247\u63a5\u53e3");
        tempMap.put("MergeOfd", "OFD\u6587\u4ef6\u5408\u5e76\u63a5\u53e3");
        immutableStaticMap = Collections.unmodifiableMap(tempMap);
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.validate.service;

import com.epoint.ztb.validate.service.EnableStopWatch;
import java.lang.reflect.Method;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class AccessLimitInterceptor
implements HandlerInterceptor {
    private ThreadLocal<StopWatch> stopWatchThreadLocal = new ThreadLocal();
    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod)handler;
            Method method = handlerMethod.getMethod();
            EnableStopWatch annotation = method.getAnnotation(EnableStopWatch.class);
            if (annotation != null) {
                String beanType = ((HandlerMethod)handler).getBeanType().getName();
                String methodName = ((HandlerMethod)handler).getMethod().getName();
                StopWatch sw = new StopWatch();
                this.stopWatchThreadLocal.set(sw);
                sw.start(beanType + "." + methodName);
            }
            return true;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object handler, Exception e) throws Exception {
        HandlerMethod handlerMethod;
        Method method;
        EnableStopWatch annotation;
        if (handler instanceof HandlerMethod && (annotation = (method = (handlerMethod = (HandlerMethod)handler).getMethod()).getAnnotation(EnableStopWatch.class)) != null) {
            StopWatch sw = this.stopWatchThreadLocal.get();
            sw.stop();
            this.log.info(sw.prettyPrint());
            this.stopWatchThreadLocal.remove();
        }
    }
}


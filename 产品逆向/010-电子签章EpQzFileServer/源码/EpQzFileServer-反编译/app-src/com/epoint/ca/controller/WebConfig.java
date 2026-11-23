/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ca.controller;

import com.epoint.frame.security.filter.EpointSecurityGetFilter;
import com.epoint.frame.security.filter.EpointSecurityPostFilter;
import java.util.ArrayList;
import java.util.HashMap;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {
    @Bean
    public FilterRegistrationBean SecurityGetFilter() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        EpointSecurityGetFilter securityGetFilter = new EpointSecurityGetFilter();
        registrationBean.setName("EpointSecurityGetFilter");
        registrationBean.setFilter(securityGetFilter);
        registrationBean.setAsyncSupported(true);
        ArrayList<String> urls = new ArrayList<String>();
        urls.add("/*");
        registrationBean.setUrlPatterns(urls);
        HashMap<String, String> init_param = new HashMap<String, String>();
        init_param.put("encoding", "UTF-8");
        registrationBean.setInitParameters(init_param);
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean SecurityPostFilter() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        EpointSecurityPostFilter securityPostFilter = new EpointSecurityPostFilter();
        registrationBean.setName("EpointSecurityPostFilter");
        registrationBean.setFilter(securityPostFilter);
        registrationBean.setAsyncSupported(true);
        ArrayList<String> urls = new ArrayList<String>();
        urls.add("/*");
        registrationBean.setUrlPatterns(urls);
        return registrationBean;
    }
}


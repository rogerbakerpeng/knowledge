/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.eppdfshow;

import com.epoint.configuration.EpQzFileServerConfig;
import com.epoint.epsignature.utils.StringUtil;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CorsFilter
implements Filter {
    @Autowired
    private EpQzFileServerConfig epqzfileserverConfig;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse)response;
        if (StringUtil.isBlank(this.epqzfileserverConfig.getIseditframeoptions())) {
            String existingXFrameOptions = httpResponse.getHeader("X-Frame-Options");
            if (existingXFrameOptions == null) {
                httpResponse.addHeader("X-Frame-Options", "ALLOWALL");
            } else {
                httpResponse.setHeader("X-Frame-Options", "ALLOWALL");
            }
        }
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void destroy() {
    }
}


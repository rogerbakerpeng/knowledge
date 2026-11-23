/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.http;

import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.utils.StringUtil;
import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;

@MultipartConfig
public class EpMcertServlet
extends HttpServlet {
    private static Logger log = Logger.getLogger(EpMcertServlet.class);
    public static final String PARAM_NAME_PLAT_CONFIG = "platFormConfig";
    public static final String BZT_LOG_SIGN = "\u3010\u6807\u8bc1\u901a\u7ec4\u4ef6\u3011";
    private static final long serialVersionUID = 1L;
    public static final String PARAM_NAME_OUTIMPL_CLASS = "outImplClass";

    public EpMcertServlet() {
        EpMcertServlet a;
    }

    @Override
    public void init() throws ServletException {
        block3: {
            EpMcertServlet a;
            super.init();
            try {
                String string = a.getInitParameter(PARAM_NAME_PLAT_CONFIG);
                if (!StringUtil.isNotBlank(string)) break block3;
                String[] stringArray = string.split(PDFHighlightAnnotationReq.J("2"));
                EpSignatureApi.setPlatFormConfig(stringArray[0], stringArray[1]);
                return;
            }
            catch (Exception exception) {
                String string = new StringBuilder().insert(0, PDFHighlightAnnotationReq.J("\u3019\u680a\u8bc8\u9017\u7ecd\u4efb\u3018\u5210\u59c2\u531b\u5e7a\u53fd\u9144\u7f63\u5938\u8d28\uff05\u8bfa\u68c9\u67e8%-yahyOb{`Jbgk`j)7)")).append(a.getInitParameter(PARAM_NAME_PLAT_CONFIG)).toString();
                log.error(string, exception);
                return;
            }
        }
        log.error(PDFHighlightAnnotationReq.J("\u3019\u680a\u8bc8\u9017\u7ecd\u4efb\u3018\u668f\u6723\u9140\u7f67\u5e7e\u53f9\u4fec\u6066\uff01\u8bfe\u8059\u7cf2\u680a\u8bc8\u9017\u5f09\u53dc\u83be\u53db\uff08"));
    }

    @Override
    public void service(HttpServletRequest a3, HttpServletResponse a2) throws ServletException, IOException {
        HttpServletRequest httpServletRequest = a3;
        String string = httpServletRequest.getContextPath();
        Object object = httpServletRequest.getServletPath();
        String string2 = httpServletRequest.getRequestURI();
        a2.setCharacterEncoding(PDFHighlightAnnotationReq.J("|yo 1"));
        if (string == null) {
            string = "";
        }
        if (string2.substring(string.length() + ((String)object).length()).endsWith(PDFHighlightAnnotationReq.J("ifLjy`bg"))) {
            HttpServletResponse httpServletResponse;
            string = a3.getParameter(PDFHighlightAnnotationReq.J("}h\u007fh`z"));
            if (StringUtil.isBlank(string)) {
                object = a3.getReader();
                string = (String)((BufferedReader)object).lines().toArray()[3];
            }
            object = null;
            try {
                log.debug(new StringBuilder().insert(0, PDFHighlightAnnotationReq.J("\u3019\u680a\u8bc8\u9017\u7ecd\u4efb\u3018ifLjy`bg-\u8bfe\u6c4f\u53cb\u657d\uff13")).append(string).toString());
                object = EpSignatureApi.doActionStatic(string);
                log.debug(new StringBuilder().insert(0, PDFHighlightAnnotationReq.J("\u301d\u680e\u8bcc\u9013\u7ec9\u4eff\u301cmbHn}dfc)\u8fd9\u56d7\u5031\uff13")).append((String)object).toString());
                httpServletResponse = a2;
            }
            catch (Exception a3) {
                log.error(PDFHighlightAnnotationReq.J("\u3019\u680a\u8bc8\u9017\u7ecd\u4efb\u3018ifLjy`bg-\u8c0a\u7525\u5938\u8d28\uff08"), a3);
                httpServletResponse = a2;
            }
            httpServletResponse.getWriter().print((String)object);
        }
    }
}


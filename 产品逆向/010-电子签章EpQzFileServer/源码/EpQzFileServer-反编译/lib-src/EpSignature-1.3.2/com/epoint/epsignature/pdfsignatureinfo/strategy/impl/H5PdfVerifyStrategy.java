/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfsignatureinfo.strategy.impl;

import com.epoint.epsignature.bean.annotation.PDFHighlightAnnotationReq;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.pdfsignatureinfo.strategy.PdfVerifyStrategy;
import com.epoint.epsignature.utils.PDFMergeUtil;
import com.epoint.gmhelper.bouncycastle.jce.provider.BouncyCastleProvider;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.security.Security;
import org.apache.log4j.Logger;

public class H5PdfVerifyStrategy
implements PdfVerifyStrategy {
    private static Logger log = Logger.getLogger(H5PdfVerifyStrategy.class);

    @Override
    public String verify(PdfReader a) throws Exception {
        String string = "";
        try {
            string = PDFMergeUtil.verifyPDF(a);
            if (a != null) {
                a.close();
                return string;
            }
        }
        catch (Exception exception) {
            try {
                log.error(PDFHighlightAnnotationReq.J("A8Yio[l\u007f`kp^}\u007fhyljp"), exception);
                throw exception;
            }
            catch (Throwable throwable) {
                if (a != null) {
                    a.close();
                }
                throw throwable;
            }
        }
        return string;
    }

    public H5PdfVerifyStrategy() {
        H5PdfVerifyStrategy a;
    }

    static {
        try {
            Security.addProvider(new BouncyCastleProvider());
            System.setProperty(VerifyReq.J("X\bVI^\u0017T\u000eU\u0013\u0015\u0000V\u000f^\u000bK\u0002IIY\bN\tX\u001eX\u0006H\u0013W\u0002\u0015\u0006H\t\nIZ\u000bW\bL8N\tH\u0006]\u0002d\u000eU\u0013^\u0000^\u0015"), PDFHighlightAnnotationReq.J("y{xl"));
            System.setProperty(VerifyReq.J("T\u0015\\IY\bN\tX\u001eX\u0006H\u0013W\u0002\u0015\u0006H\t\nIZ\u000bW\bL8N\tH\u0006]\u0002d\u000eU\u0013^\u0000^\u0015"), PDFHighlightAnnotationReq.J("y{xl"));
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
        }
    }
}


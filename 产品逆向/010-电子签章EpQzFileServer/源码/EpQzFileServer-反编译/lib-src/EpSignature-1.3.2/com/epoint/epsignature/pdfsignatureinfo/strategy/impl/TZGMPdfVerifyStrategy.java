/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.pdfsignatureinfo.strategy.impl;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.bean.annotation.PDFAnnotationReq;
import com.epoint.epsignature.pdfsignatureinfo.strategy.PdfVerifyStrategy;
import com.epoint.epsignature.utils.TZGMVerifyPdf;
import com.epoint.gmhelper.bouncycastle.jce.provider.BouncyCastleProvider;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.security.Security;
import org.apache.log4j.Logger;

public class TZGMPdfVerifyStrategy
implements PdfVerifyStrategy {
    private static Logger log = Logger.getLogger(TZGMPdfVerifyStrategy.class);

    @Override
    public String verify(PdfReader a) throws Exception {
        String string = "";
        try {
            string = TZGMVerifyPdf.TZVerify(a);
            if (a != null) {
                a.close();
                return string;
            }
        }
        catch (Exception exception) {
            try {
                log.error(ExEpSignException.J("v.e9r\u0010D\"G\u0006K\u0012['V\u0006C\u0000G\u0013["), exception);
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

    public TZGMPdfVerifyStrategy() {
        TZGMPdfVerifyStrategy a;
    }

    static {
        try {
            Security.addProvider(new BouncyCastleProvider());
            System.setProperty(PDFAnnotationReq.J("'()i!7+.*3j )/!+4\"6i&(1)'>'&73(\"j&7)ui%+((3\u00181)7&\"\"\u001b.*3! !5"), ExEpSignException.J("\u0000P\u0001G"));
            System.setProperty(PDFAnnotationReq.J("+5#i&(1)'>'&73(\"j&7)ui%+((3\u00181)7&\"\"\u001b.*3! !5"), ExEpSignException.J("\u0000P\u0001G"));
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
        }
    }
}


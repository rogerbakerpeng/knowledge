/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.tsaimpl;

import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.epsignature.tsaimpl.BJCATsaUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.itextpdf.text.pdf.security.TSAClient;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.util.UUID;
import org.apache.log4j.Logger;

public class BJCATSAClientImp
implements TSAClient {
    private static Logger logger = Logger.getLogger(BJCATSAClientImp.class);

    @Override
    public int getTokenSizeEstimate() {
        return 4096;
    }

    @Override
    public MessageDigest getMessageDigest() throws GeneralSecurityException {
        return MessageDigest.getInstance("SM3");
    }

    @Override
    public byte[] getTimeStampToken(byte[] a2) throws Exception {
        try {
            String string = BJCATsaUtil.signtss(Base64Util.encode(a2), UUID.randomUUID().toString());
            a2 = string;
            return Base64Util.decode(string);
        }
        catch (Exception a2) {
            logger.error(GetMessageResponse.J("\u5352\u4ed1\u0006<\u65b3\u9589\u6276\u7b03\u5448\u594c\u8d60\uff7c"), a2);
            return null;
        }
    }

    public BJCATSAClientImp() {
        BJCATSAClientImp a;
    }
}


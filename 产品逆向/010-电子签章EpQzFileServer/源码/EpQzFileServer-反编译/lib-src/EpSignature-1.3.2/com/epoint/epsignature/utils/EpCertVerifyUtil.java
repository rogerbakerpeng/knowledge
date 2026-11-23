/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;
import com.epoint.gm.bizlogic.ClassPathUtil;
import java.io.File;
import org.apache.log4j.Logger;

public class EpCertVerifyUtil {
    private static Logger log = Logger.getLogger(EpCertVerifyUtil.class);
    private static final String MVN_TAG = "target/classes/";

    private static /* synthetic */ String J() {
        String string = ClassPathUtil.getLibPath();
        String string2 = EpCertVerifyUtil.class.getResource(GetMessageResponse.J("R")).getFile();
        if (string2.indexOf(MVN_TAG) > 0) {
            int n = string2.indexOf(MVN_TAG);
            if (n != -1) {
                string = new StringBuilder().insert(0, string2.substring(0, n)).append(UnauthorizedAccessException.J("\u007f%oxa6e9#%i$c\"~4i$#")).toString();
            }
            return string;
        }
        return string;
    }

    public EpCertVerifyUtil() {
        EpCertVerifyUtil a;
    }

    public static String getCARootPath() {
        Object object;
        String string;
        String string2;
        String string3;
        String string4;
        String string5;
        block9: {
            block8: {
                try {
                    string5 = new StringBuilder().insert(0, ClassPathUtil.getDeployWarPath()).append(GetMessageResponse.J("*\u0000?h4\u000b;")).append(File.separator).append(UnauthorizedAccessException.J("o;m$\u007f2\u007f")).append(File.separator).toString();
                    string4 = EpCertVerifyUtil.J();
                    string3 = new StringBuilder().insert(0, string4).append(GetMessageResponse.J(".\u0018<\u000e")).append(File.separator).toString();
                    string2 = File.separator;
                    string = UnauthorizedAccessException.J("\u0014M\u0005C\u0018X");
                    object = new File("");
                    object = new StringBuilder().insert(0, ((File)object).getCanonicalPath()).append(File.separator).toString();
                    if (!new File(new StringBuilder().insert(0, string5).append(string).toString()).exists() || !new File(new StringBuilder().insert(0, string5).append(string).toString()).isDirectory()) break block8;
                    return new StringBuilder().insert(0, string5).append(string).toString();
                }
                catch (Exception exception) {
                    log.error(exception.getMessage(), exception);
                    return "";
                }
            }
            if (!new File(new StringBuilder().insert(0, string4).append(string).toString()).exists() || !new File(new StringBuilder().insert(0, string4).append(string).toString()).isDirectory()) break block9;
            return new StringBuilder().insert(0, string4).append(string).toString();
        }
        if (new File(new StringBuilder().insert(0, string3).append(string).toString()).exists() && new File(new StringBuilder().insert(0, string3).append(string).toString()).isDirectory()) {
            return new StringBuilder().insert(0, string3).append(string).toString();
        }
        if (new File(new StringBuilder().insert(0, string2).append(string).toString()).exists() && new File(new StringBuilder().insert(0, string2).append(string).toString()).isDirectory()) {
            return new StringBuilder().insert(0, string2).append(string).toString();
        }
        if (new File(new StringBuilder().insert(0, (String)object).append(string).toString()).exists() && new File(new StringBuilder().insert(0, (String)object).append(string).toString()).isDirectory()) {
            return new StringBuilder().insert(0, (String)object).append(string).toString();
        }
        if (log.isDebugEnabled()) {
            CharSequence[] charSequenceArray = new String[5];
            charSequenceArray[0] = string5;
            charSequenceArray[1] = string4;
            charSequenceArray[2] = string3;
            charSequenceArray[3] = string2;
            charSequenceArray[4] = object;
            log.info(new StringBuilder().insert(0, GetMessageResponse.J("\u6757\u623b\u524d\u63cd\u673e\u65c2\u4e8b\uff49\u8b8a\u7576\u8b8a\u63cd\u673e\uff44\u63f5\u6706\u65fa\u4eb3\u4f30\u7f2b\uff67")).append(String.join((CharSequence)UnauthorizedAccessException.J("7"), charSequenceArray)).toString());
        }
        return "";
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.strategy;

import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.epsignature.license.app.exception.LicenseException;
import com.epoint.epsignature.license.app.exception.LicenseRuntimeException;
import com.epoint.epsignature.license.app.strategy.base.LicenseFileStrategy;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.IOUtils;
import com.epoint.gm.bizlogic.ClassPathUtil;
import java.io.File;
import org.apache.log4j.Logger;

public class DefaultLicenseFileStrategy
implements LicenseFileStrategy {
    private static Logger log = Logger.getLogger(DefaultLicenseFileStrategy.class);
    private static final String LICENSE_FILE_NAME = "EpSignature.lic";
    private static final String MVN_TAG = "target/classes/";

    private static /* synthetic */ String J() {
        String string = ClassPathUtil.getLibPath();
        String string2 = DefaultLicenseFileStrategy.class.getResource(GetMessageResponse.J("R")).getFile();
        if (string2.indexOf(MVN_TAG) > 0) {
            int n = string2.indexOf(MVN_TAG);
            if (n != -1) {
                string = new StringBuilder().insert(0, string2.substring(0, n)).append(GetMessageResponse.J("\u000e7\u001ej\u0010$\u0014+R7\u00186\u00120\u000f&\u00186R")).toString();
            }
            return string;
        }
        return string;
    }

    @Override
    public byte[] parseLicenseFile() throws LicenseException {
        Object object;
        String string;
        String string2;
        String string3;
        String string4;
        block8: {
            block7: {
                try {
                    string4 = new StringBuilder().insert(0, ClassPathUtil.getDeployWarPath()).append(GetMessageResponse.J("*\u0000?h4\u000b;")).append(File.separator).append(GetMessageResponse.J("\u001e)\u001c6\u000e \u000e")).append(File.separator).toString();
                    string3 = DefaultLicenseFileStrategy.J();
                    string2 = new StringBuilder().insert(0, string3).append(GetMessageResponse.J(".\u0018<\u000e")).append(File.separator).toString();
                    string = File.separator;
                    object = new File("");
                    object = new StringBuilder().insert(0, ((File)object).getCanonicalPath()).append(File.separator).toString();
                    if (!new File(new StringBuilder().insert(0, string4).append(LICENSE_FILE_NAME).toString()).exists()) break block7;
                    return Base64Util.decode(IOUtils.readToString(new StringBuilder().insert(0, string4).append(LICENSE_FILE_NAME).toString()));
                }
                catch (Exception exception) {
                    log.error(exception.getMessage(), exception);
                    throw new LicenseException(GetMessageResponse.J("\u9e9d\u8bd9\u7b13\u7518h\u0011,\u001e \u00136\u0018\u65c2\u4e8b\u89a6\u67ed\u5974\u8d58"), exception);
                }
            }
            if (!new File(new StringBuilder().insert(0, string3).append(LICENSE_FILE_NAME).toString()).exists()) break block8;
            return Base64Util.decode(IOUtils.readToString(new StringBuilder().insert(0, string3).append(LICENSE_FILE_NAME).toString()));
        }
        if (new File(new StringBuilder().insert(0, string2).append(LICENSE_FILE_NAME).toString()).exists()) {
            return Base64Util.decode(IOUtils.readToString(new StringBuilder().insert(0, string2).append(LICENSE_FILE_NAME).toString()));
        }
        if (new File(new StringBuilder().insert(0, string).append(LICENSE_FILE_NAME).toString()).exists()) {
            return Base64Util.decode(IOUtils.readToString(new StringBuilder().insert(0, string).append(LICENSE_FILE_NAME).toString()));
        }
        if (new File(new StringBuilder().insert(0, (String)object).append(LICENSE_FILE_NAME).toString()).exists()) {
            return Base64Util.decode(IOUtils.readToString(new StringBuilder().insert(0, (String)object).append(LICENSE_FILE_NAME).toString()));
        }
        CharSequence[] charSequenceArray = new String[5];
        charSequenceArray[0] = string4;
        charSequenceArray[1] = string3;
        charSequenceArray[2] = string2;
        charSequenceArray[3] = string;
        charSequenceArray[4] = object;
        throw new LicenseRuntimeException(new StringBuilder().insert(0, GetMessageResponse.J("\u6757\u623b\u524d\u63cd\u673e\u65c2\u4e8b\uff49\u8b8a\u7576\u8b8a\u63cd\u673e\uff44\u63f5\u6706\u65fa\u4eb3\u4f30\u7f2b\uff67")).append(String.join((CharSequence)GetMessageResponse.J("F"), charSequenceArray)).toString());
    }

    public DefaultLicenseFileStrategy() {
        DefaultLicenseFileStrategy a;
    }
}


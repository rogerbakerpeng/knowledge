/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.cloudsign.util;

import com.epoint.epqz.filedecrypt.controller.FileDecryptController;
import com.epoint.jobs.TempFileCleanJob;
import com.epoint.ztb.common.config.OfdConfig;
import com.epoint.ztb.common.utils.OFDUtils;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CloudSignUtil {
    private static final Logger ALLATORIxDEMO = LoggerFactory.getLogger(CloudSignUtil.class);

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * WARNING - void declaration
     */
    private static /* synthetic */ void ALLATORIxDEMO(String string, String string2, HttpServletResponse httpServletResponse, boolean bl) throws IOException {
        block12: {
            Object a;
            block11: {
                String string3 = string;
                InputStream inputStream = null;
                a = null;
                try {
                    byte[] a2;
                    void a3;
                    void a222;
                    SimpleDateFormat simpleDateFormat;
                    String string4 = new StringBuilder().insert(5 >> 3, OfdConfig.getTempfilepath()).append(File.separator).append((simpleDateFormat = new SimpleDateFormat("yyyyMMdd")).format(new Date()).substring(5 >> 3, 0x6E & 0x19)).append(File.separator).append(string3).append(".").append(OFDUtils.getFileFormat((String)a222)).toString();
                    if (a3 == false) {
                        void v0 = a2;
                        v0.setContentType("application/x-www-form-urlencoded");
                        v0.setHeader("Content-Disposition", new StringBuilder().insert(3 & 4, "attachment;filename=").append((String)a222).toString());
                    } else {
                        a2.setContentType("text/html");
                    }
                    inputStream = new FileInputStream(string4);
                    a = a2.getOutputStream();
                    int a222 = 2 & 5;
                    a2 = new byte[0x2745 & 0x5CBA];
                    while ((a222 = inputStream.read(a2)) != -4 >> 2) {
                        ((OutputStream)a).write(a2, 5 >> 3, a222);
                    }
                    if (inputStream == null) break block11;
                }
                catch (Exception exception) {
                    ALLATORIxDEMO.error("getfile异常：", exception);
                    return;
                }
                finally {
                    if (inputStream != null) {
                        inputStream.close();
                    }
                    if (a == null) break block12;
                    ((OutputStream)a).close();
                }
                inputStream.close();
            }
            if (a != null) {
                ((OutputStream)a).close();
                return;
            }
        }
    }

    public CloudSignUtil() {
        CloudSignUtil a;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.tsaimpl;

import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.EpFileServerUtil;
import com.epoint.itextpdf.text.pdf.security.TSAClient;
import java.lang.reflect.Method;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import org.apache.log4j.Logger;

public class ChangShaTSAClientImp
implements TSAClient {
    private static Logger logger = Logger.getLogger(ChangShaTSAClientImp.class);
    private static Object tsaClientInstance;

    @Override
    public int getTokenSizeEstimate() {
        return 4096;
    }

    static {
        String string = ConfigUtil.getConfigValue(UnauthorizedAccessException.J("v#n"), EpFileServerUtil.J("20066+99%+0-#4"));
        String string2 = ConfigUtil.getConfigValue(UnauthorizedAccessException.J("v#n"), EpFileServerUtil.J(";99??\"009!(\u0018<"));
        String string3 = ConfigUtil.getConfigValue(UnauthorizedAccessException.J("v#n"), EpFileServerUtil.J("20066+99\"=2*4,"));
        String string4 = "SM3";
        try {
            Class<?> clazz = Class.forName(UnauthorizedAccessException.J("o8ayo1\u007fyx$myo;e2b#\"\u0013i1m\"`#X$m\u0014`>i9x"));
            Object object = clazz.getMethod(EpFileServerUtil.J(":$1=<4*"), new Class[0]).invoke(null, new Object[0]);
            Class<?> clazz2 = Class.forName(UnauthorizedAccessException.J("o8ayo1\u007fyx$myo;e2b#\"\u0013i1m\"`#X$m\u0014`>i9xsN\"e;h2~"));
            Class[] classArray = new Class[1];
            classArray[0] = String.class;
            Method method = clazz2.getMethod(EpFileServerUtil.J("%+0\r#4"), classArray);
            Class[] classArray2 = new Class[1];
            classArray2[0] = String.class;
            Method method2 = clazz2.getMethod(UnauthorizedAccessException.J("x$m\u0002\u007f2~9m:i"), classArray2);
            Class[] classArray3 = new Class[1];
            classArray3[0] = String.class;
            Method method3 = clazz2.getMethod(EpFileServerUtil.J(",\"9\u00019\"+&7#<"), classArray3);
            Class[] classArray4 = new Class[1];
            classArray4[0] = String.class;
            Method method4 = clazz2.getMethod(UnauthorizedAccessException.J("d6\u007f?M;k8~>x?a"), classArray4);
            Object[] objectArray = new Object[1];
            objectArray[0] = string;
            Object[] objectArray2 = new Object[1];
            objectArray2[0] = string2;
            Object[] objectArray3 = new Object[1];
            objectArray3[0] = string3;
            Object[] objectArray4 = new Object[1];
            objectArray4[0] = string4;
            tsaClientInstance = clazz2.getMethod(EpFileServerUtil.J(":$1=<"), new Class[0]).invoke(method4.invoke(method3.invoke(method2.invoke(method.invoke(object, objectArray), objectArray2), objectArray3), objectArray4), new Object[0]);
        }
        catch (Exception exception) {
            logger.error(UnauthorizedAccessException.J("\u5211\u599c\u531a\u65a1\u95f8\u6264\u5bf5\u8c36\u593d\u8d72\uff0d"), exception);
        }
    }

    @Override
    public byte[] getTimeStampToken(byte[] a) throws Exception {
        try {
            Class[] classArray = new Class[1];
            classArray[0] = byte[].class;
            Method method = tsaClientInstance.getClass().getDeclaredMethod(EpFileServerUtil.J("?4,\u00051<=\u0002,05!\f>346"), classArray);
            method.setAccessible(true);
            Object[] objectArray = new Object[1];
            objectArray[0] = a;
            a = Base64Util.encode((byte[])method.invoke(tsaClientInstance, objectArray));
            logger.info(new StringBuilder().insert(0, UnauthorizedAccessException.J("\u65a1\u95f8\u6264\u5bf5\u8c36\u7b72\u545a\u621c\u52c8\uff0d\u7b29\u5401\u8f83\u56d2\u506b\uff16")).append((String)a).toString());
            return Base64Util.decode((String)a);
        }
        catch (Exception exception) {
            logger.error(EpFileServerUtil.J("\u65a7\u95ac\u6262\u5ba1\u8c30\u7b26\u545c\u5969\u8d74\uff54\u9548\u8bb7\u4fb0\u6037\u8ba6\u67bd\u775a\u65bd\u5f86\uff59"), exception);
            throw new Exception(UnauthorizedAccessException.J("\u65a1\u95f8\u6264\u5bf5\u8c36\u7b72\u545a\u593d\u8d72\uff00\u954e\u8be3\u4fb6\u6063\u8ba0\u67e9\u775c\u65e9\u5f80\uff0d"));
        }
    }

    public ChangShaTSAClientImp() {
        ChangShaTSAClientImp a;
    }

    @Override
    public MessageDigest getMessageDigest() throws GeneralSecurityException {
        return MessageDigest.getInstance("SM3");
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.util;

import com.epoint.epsignature.bean.cert.CertObject;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.enums.LicenseEnum;
import com.epoint.epsignature.license.app.entity.AuthResult;
import com.epoint.epsignature.license.app.entity.LicenseEntity;
import com.epoint.epsignature.license.app.service.LicenseService;
import com.epoint.epsignature.license.app.strategy.LicenseDataForOtherStrategy;
import com.epoint.epsignature.license.app.util.RequiresAuthorization;
import java.lang.reflect.Method;
import org.apache.log4j.Logger;

public class AuthorizationUtil {
    private static Logger log = Logger.getLogger(AuthorizationUtil.class);

    public static AuthResult checkMethod(Class<?> a, Method a2) {
        AuthResult authResult = null;
        if (a.isAnnotationPresent(RequiresAuthorization.class) || a2.isAnnotationPresent(RequiresAuthorization.class)) {
            authResult = AuthResult.getInstance();
        }
        return authResult;
    }

    public static LicenseEntity checkLic() {
        LicenseEntity licenseEntity = null;
        try {
            LicenseService licenseService = new LicenseService(new LicenseDataForOtherStrategy());
            licenseService.loadLicense();
            licenseEntity = licenseService.getLicenseEntity();
            return licenseEntity;
        }
        catch (Exception exception) {
            log.error(CertObject.J("v~pu~Z|u"), exception);
            return licenseEntity;
        }
    }

    public static void checkStatic() {
        AuthResult authResult = AuthResult.getInstance();
        if (LicenseEnum.LicenseResultEnum.\u5931\u8d25.getVal().equals(authResult.getLicenseResult())) {
            throw new RuntimeException(DZYYZZReq.J("'H1Q\u0005V\u0003L\u0017J\u0007\u0016\u000eQ\u0001\u838f\u53b4\u5f3a\u5e5a\uff34\u8b95\u68f8\u6787T\u000b[\u65e5\u4ece\uff63"));
        }
    }

    public AuthorizationUtil() {
        AuthorizationUtil a;
    }
}


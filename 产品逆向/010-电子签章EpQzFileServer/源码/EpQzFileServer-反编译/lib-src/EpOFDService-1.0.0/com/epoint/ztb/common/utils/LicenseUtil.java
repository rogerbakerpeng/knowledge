/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.utils;

import com.epoint.epsignature.utils.StringUtil;
import com.epoint.ztb.license.app.LicenseService;
import com.epoint.ztb.license.app.entity.LicenseEntity;
import com.epoint.ztb.license.app.strategy.LicenseDataForOtherStrategy;
import java.util.HashMap;
import java.util.Map;

public class LicenseUtil {
    public static Map<String, Object> licenseCheck(String lic) {
        HashMap<String, Object> mapinfo = new HashMap<String, Object>();
        try {
            LicenseService service = new LicenseService(new LicenseDataForOtherStrategy());
            service.loadLicense(lic);
            LicenseEntity licenseEntity = service.getLicenseEntity();
            if (StringUtil.isNotBlank(licenseEntity)) {
                String[] licenseinfo = new String(licenseEntity.getSourceData(), "UTF-8").split("@");
                mapinfo.put("licenseResult", "sucess");
                mapinfo.put("licenseName", licenseinfo[0]);
                mapinfo.put("platformcode", licenseinfo[1]);
                mapinfo.put("licdesc", licenseinfo[2]);
                mapinfo.put("softwareName", licenseinfo[3]);
                mapinfo.put("softwareId", licenseinfo[4]);
                if (licenseinfo.length >= 8) {
                    mapinfo.put("liclevel", licenseinfo[5]);
                    mapinfo.put("showmode", licenseinfo[6]);
                    mapinfo.put("appsecret", licenseinfo[7]);
                }
                return mapinfo;
            }
        }
        catch (Exception e) {
            mapinfo.put("licenseResult", "error");
            mapinfo.put("licenseError", "\u7a0b\u5e8f\u6fc0\u6d3b\u5931\u8d25");
        }
        return mapinfo;
    }
}


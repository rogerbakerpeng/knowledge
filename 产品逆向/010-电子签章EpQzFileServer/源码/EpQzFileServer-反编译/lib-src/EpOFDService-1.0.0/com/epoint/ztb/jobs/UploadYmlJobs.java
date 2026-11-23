/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.jobs;

import com.epoint.ztb.common.utils.YmlUtil;
import java.util.LinkedHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class UploadYmlJobs {
    private static final Logger log = LoggerFactory.getLogger(UploadYmlJobs.class);
    private static String banneddanwei = "";

    @Scheduled(cron="0 0/5 * * * ?")
    public void UploadYml() {
        try {
            LinkedHashMap ymlmap = YmlUtil.loadYaml("application.yml");
            LinkedHashMap ofdmap = (LinkedHashMap)ymlmap.get("ofd");
            banneddanwei = (String)ofdmap.get("banneddanwei");
            log.debug("\u52a8\u6001\u83b7\u53d6\u5230banneddanwei\uff1a" + banneddanwei);
        }
        catch (Exception e) {
            log.error("\u52a8\u6001\u5237\u65b0\u914d\u7f6e\u6587\u4ef6\u5f02\u5e38", e);
        }
    }

    public static String getBanneddanwei() {
        if (banneddanwei == null) {
            return "";
        }
        return banneddanwei;
    }
}


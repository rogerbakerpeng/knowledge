/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.jobs;

import com.epoint.epqz.filedecrypt.controller.FileDecryptController;
import com.epoint.ztb.common.config.OfdConfig;
import java.io.File;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;

@Service
public class TempFileCleanJob {
    public TempFileCleanJob() {
        TempFileCleanJob a;
    }

    @Scheduled(cron="0 0 0 * * ?")
    public void CleanFile() {
        Calendar calendar;
        TempFileCleanJob tempFileCleanJob = this;
        Object a = new Date();
        Serializable serializable = new SimpleDateFormat("yyyyMMdd");
        Calendar calendar2 = calendar = Calendar.getInstance();
        calendar2.setTime((Date)a);
        calendar2.add(--5, 0xFFFFFFFE & 0xFFFFFFFF);
        a = new StringBuilder().insert(3 & 4, OfdConfig.getTempfilepath()).append(File.separator).append(serializable.format(calendar.getTime())).append(File.separator).toString();
        serializable = new File((String)a);
        if (((File)serializable).exists()) {
            FileSystemUtils.deleteRecursively((File)serializable);
            System.out.println(new StringBuilder().insert(3 ^ 3, "清理：").append((String)a).append("下文件").toString());
        }
    }

    public static String ALLATORIxDEMO(String string) {
        String string2 = string;
        int n = string2.length();
        int a = n - (4 ^ 5);
        char[] cArray = new char[n];
        int n2 = (4 ^ 5) << --3 ^ --3;
        int cfr_ignored_0 = (--2 ^ --5) << --4 ^ --3;
        int n3 = a;
        int n4 = 5 >> 1 << --3 ^ (1 ^ 3);
        while (n3 >= 0) {
            int n5 = a--;
            cArray[n5] = (char)(string2.charAt(n5) ^ n4);
            if (a < 0) break;
            int n6 = a--;
            cArray[n6] = (char)(string2.charAt(n6) ^ n2);
            n3 = a;
        }
        return new String(cArray);
    }
}


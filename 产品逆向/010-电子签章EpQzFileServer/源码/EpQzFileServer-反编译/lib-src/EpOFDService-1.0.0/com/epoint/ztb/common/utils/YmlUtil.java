/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.Map;
import org.yaml.snakeyaml.Yaml;

public class YmlUtil {
    public static LinkedHashMap loadYaml(String fileName) throws Exception {
        String path = System.getProperty("user.dir");
        File file = new File(path + "/config/" + fileName);
        InputStream in = file.exists() ? new FileInputStream(path + "/config/" + fileName) : YmlUtil.class.getClassLoader().getResourceAsStream(fileName);
        LinkedHashMap lhm = new Yaml().loadAs(in, LinkedHashMap.class);
        return lhm;
    }

    public static Object getValByKey(Map lhm, String key) throws Exception {
        String[] keys = key.split("[.]");
        Map ymlInfo = lhm;
        for (int i = 0; i < keys.length; ++i) {
            Object value = ymlInfo.get(keys[i]);
            if (i >= keys.length - 1) {
                if (value == null) {
                    throw new Exception("key\u4e0d\u5b58\u5728");
                }
                return value;
            }
            ymlInfo = (Map)value;
        }
        return null;
    }
}


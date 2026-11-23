/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

public class CommonUtils {
    public static String getFileName(String filepath) {
        filepath = filepath.replace("\\", "/");
        int indexbegin = filepath.lastIndexOf("/");
        int indexend = filepath.lastIndexOf(".");
        return filepath.substring(indexbegin + 1, indexend);
    }

    public static String getFileNamewithsuffix(String filepath) {
        filepath = filepath.replace("\\", "/");
        int indexbegin = filepath.lastIndexOf("/");
        int indexend = filepath.lastIndexOf(".");
        return filepath.substring(indexbegin + 1);
    }

    public static String getFileFormat(String filepath) {
        int indexbegin = filepath.lastIndexOf(".");
        return filepath.substring(indexbegin + 1);
    }

    public static String getFilePath(String fileabsolutepath) {
        fileabsolutepath = fileabsolutepath.replace("\\", "/");
        int index = fileabsolutepath.lastIndexOf("/");
        return fileabsolutepath.substring(0, index);
    }

    public static String readToString(String fileName) {
        String encoding = "UTF-8";
        File file = new File(fileName);
        Long filelength = file.length();
        byte[] filecontent = new byte[filelength.intValue()];
        try {
            FileInputStream in = new FileInputStream(file);
            in.read(filecontent);
            in.close();
        }
        catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        try {
            return new String(filecontent, encoding);
        }
        catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
    }
}


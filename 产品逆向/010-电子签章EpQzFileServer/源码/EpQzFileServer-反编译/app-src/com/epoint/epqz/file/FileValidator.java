/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.file;

import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.web.multipart.MultipartFile;

public class FileValidator {
    private static final String SAFE_FILENAME_PATTERN = "^[a-zA-Z0-9_-]+\\.pdf$";

    public static String validatePdfFile(MultipartFile file) {
        if (file.isEmpty()) {
            return "未获取到上传的文件，请重新上传！";
        }
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            return "文件名为空，请重新上传！";
        }
        String contentType = file.getContentType();
        if (!"application/pdf".equals(contentType)) {
            return "请上传PDF格式的文件！";
        }
        if (!originalFilename.toLowerCase().endsWith(".pdf")) {
            return "文件扩展名必须为.pdf！";
        }
        String fileName = originalFilename.substring(Math.max(originalFilename.lastIndexOf("\\") + 1, originalFilename.lastIndexOf("/") + 1));
        String regex = "^(?!.*[\\\\/;])(?!.*\\.\\.)[^\\\\/;]+\\.pdf$";
        Pattern pattern = Pattern.compile(regex, 2);
        Matcher matcher = pattern.matcher(fileName);
        if (!matcher.matches()) {
            return "文件名包含非法字符（如斜杠、分号或连续点）！";
        }
        return null;
    }

    public static String validateFilePath(String srcpath, Path baseDir) {
        if (!Pattern.matches(SAFE_FILENAME_PATTERN, srcpath)) {
            return "文件名包含非法字符或非PDF文件！";
        }
        try {
            Path resolvedPath = baseDir.resolve(srcpath).normalize();
            if (!resolvedPath.startsWith(baseDir)) {
                return "非法路径访问！";
            }
            return null;
        }
        catch (InvalidPathException e) {
            return "路径格式不合法！";
        }
    }
}


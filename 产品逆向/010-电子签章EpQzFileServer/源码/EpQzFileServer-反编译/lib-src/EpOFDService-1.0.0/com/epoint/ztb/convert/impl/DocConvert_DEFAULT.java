/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.convert.impl;

import com.epoint.ofd.bizlogic.CommonUtils;
import com.epoint.pdf2ofd.render.OFDRender;
import com.epoint.ztb.convert.ConvertConfig;
import com.epoint.ztb.convert.IDocConvert;
import java.io.File;
import java.io.IOException;
import java.util.Objects;
import org.apache.commons.io.FileUtils;

public class DocConvert_DEFAULT
implements IDocConvert {
    @Override
    public void init(ConvertConfig config) {
    }

    @Override
    public void convert(String pathIn, String format) {
        String sourceFormat = CommonUtils.getFileFormat(pathIn);
        if (!"pdf".equalsIgnoreCase(sourceFormat)) {
            throw new RuntimeException("\u6682\u4e0d\u652f\u6301\u9664PDF\u4ee5\u5916\u7684\u5176\u4ed6\u6587\u4ef6\u7c7b\u578b\uff01");
        }
        try {
            byte[] pdfBytes = FileUtils.readFileToByteArray(new File(pathIn));
            byte[] ofdBytes = OFDRender.convertPdfToOfd(pdfBytes);
            if (!Objects.nonNull(ofdBytes)) {
                throw new RuntimeException("DocConvert_DEFAULT..convertToOfd ERROR");
            }
            FileUtils.writeByteArrayToFile(new File(pathIn.replace(sourceFormat, "ofd")), ofdBytes);
        }
        catch (IOException e) {
            throw new RuntimeException("DocConvert_DEFAULT..convertToOfd ERROR", e);
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.dataex.bizlogic;

import com.epoint.gmhelper.util.StringUtil;
import java.text.SimpleDateFormat;

public class CheckParam {
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

    public String checkParam(String requesttime, String instance_id, String filename, String filelen, String pos) {
        if (StringUtil.isBlank(requesttime)) {
            return "requesttime\u53c2\u6570\u4e3a\u7a7a";
        }
        try {
            this.sdf.parse(requesttime);
        }
        catch (Exception e) {
            return "requesttime\u53c2\u6570\u683c\u5f0f\u5f02\u5e38";
        }
        if (StringUtil.isBlank(instance_id)) {
            return "instance_id\u53c2\u6570\u4e3a\u7a7a";
        }
        if (StringUtil.isBlank(filename)) {
            return "filename\u53c2\u6570\u4e3a\u7a7a";
        }
        try {
            Integer.valueOf(filelen);
        }
        catch (Exception e) {
            return "filelen\u53c2\u6570\u5f02\u5e38";
        }
        try {
            Integer.valueOf(pos);
        }
        catch (Exception e) {
            return "pos\u53c2\u6570\u5f02\u5e38";
        }
        return "";
    }

    public String checkParam(String requesttime, String instance_id) {
        if (StringUtil.isBlank(requesttime)) {
            return "requesttime\u53c2\u6570\u4e3a\u7a7a";
        }
        if (StringUtil.isBlank(instance_id)) {
            return "instance_id\u53c2\u6570\u4e3a\u7a7a";
        }
        return "";
    }
}


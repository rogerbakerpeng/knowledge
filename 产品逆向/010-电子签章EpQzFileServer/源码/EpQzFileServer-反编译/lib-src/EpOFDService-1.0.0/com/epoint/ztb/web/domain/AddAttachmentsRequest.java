/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.web.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Map;

@ApiModel(value="\u7b7e\u540d\u8bf7\u6c42\u5bf9\u8c61", description="\u7b7e\u540d\u65f6\u7528\u6765\u5c01\u88c5\u8bf7\u6c42\u3002")
public class AddAttachmentsRequest {
    @ApiModelProperty(value="ofd\u6587\u4ef6\u7684\u6587\u4ef6\u540d", name="test.ofd", example="40", required=true)
    private String ofdfilename;
    @ApiModelProperty(value="ofd\u6587\u4ef6\u7684\u552f\u4e00\u6807\u8bc6", name="uuid", example="40", required=true)
    private String ofdfileid;
    @ApiModelProperty(value="token", name="token", example="xxx", required=true)
    private String token;
    @ApiModelProperty(value="\u9644\u4ef6list\u5305\u542b\u4e86\u9644\u4ef6\u7684\u540d\u79f0", name="attachments", example="list", required=true)
    private Map<String, String> attachments;

    public Map<String, String> getAttachments() {
        return this.attachments;
    }

    public void setAttachments(Map<String, String> attachments) {
        this.attachments = attachments;
    }

    public String getOfdfilename() {
        return this.ofdfilename;
    }

    public void setOfdfilename(String ofdfilename) {
        this.ofdfilename = ofdfilename;
    }

    public String getOfdfileid() {
        return this.ofdfileid;
    }

    public void setOfdfileid(String ofdfileid) {
        this.ofdfileid = ofdfileid;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}


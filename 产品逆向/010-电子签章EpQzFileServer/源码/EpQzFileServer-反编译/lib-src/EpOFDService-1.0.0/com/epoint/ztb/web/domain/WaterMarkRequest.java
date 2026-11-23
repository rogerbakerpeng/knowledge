/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.web.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="\u6c34\u5370\u8bf7\u6c42\u5bf9\u8c61", description="\u7528\u6765\u5c01\u88c5\u6c34\u5370\u5c5e\u6027\u3002")
public class WaterMarkRequest {
    @ApiModelProperty(value="\u6c34\u5370\u7684\u6587\u5b57\u5185\u5bb9", name="value", example="\u6d4b\u8bd5\u6c34\u5370", required=true)
    private String value;
    @ApiModelProperty(value="\u6c34\u5370\u7684\u5b57\u4f53", name="fontname", example="simsun", required=false)
    private String fontname = "SimSun";
    @ApiModelProperty(value="\u989c\u8272 CSS3\u6837\u5f0f\u7684\u989c\u8272\u503c\uff0c\u53ef\u9009\u503c \u989c\u8272\u82f1\u6587\u5355\u8bcd,\u4f8b\u5982red,blue\u300116\u8fdb\u5236\u989c\u8272\u503c\uff0c#000000\u3001rgb(0,0,0)\u3001rgba(0,0,0,1)", name="color", example="#aaa0a5", required=false)
    private String color = "#aaa0a5";
    @ApiModelProperty(value="\u5b57\u4f53\u5bbd\u5ea6\uff0c\u9075\u5faa CSS3\u6807\u51c6\uff0c\u53ef\u9009\u503c\u4e3a normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900", name="fontweight", example="900", required=false)
    private String fontweight = "900";
    @ApiModelProperty(value="\u6c34\u5370\u900f\u660e\u5ea6\uff0c\u53ef\u53d6\u503c 0.0~1.0\uff0c\u9ed8\u8ba4 0.5", name="globalalpha", example="0.5", required=false)
    private double globalalpha = 0.5;
    @ApiModelProperty(value="\u65cb\u8f6c\u89d2\u5ea6\uff0c0-360, \u9ed8\u8ba4330(\u5bf9\u5e94\u6570\u5b66\u5f27\u5ea630\u5ea6)", name="angle", example="330d", required=false)
    private double angle = 330.0;
    @ApiModelProperty(value="\u5b57\u4f53\u5927\u5c0f, \u5355\u4f4d mm", name="fontsize", example="8d", required=false)
    private double fontsize = 8.0;
    @ApiModelProperty(value="\u6c34\u5370\u6a2a\u5411\u95f4\u8ddd\uff0c\u5355\u4f4dmm", name="intervalx", example="100d", required=false)
    private double intervalx = 100.0;
    @ApiModelProperty(value="\u6c34\u5370\u7eb5\u5411\u95f4\u8ddd\uff0c\u5355\u4f4dmm", name="intervaly", example="80d", required=false)
    private double intervaly = 80.0;
    @ApiModelProperty(value="token", name="token", example="", required=true)
    private String token;
    @ApiModelProperty(value="fileid\u6587\u4ef6\u6807\u8bc6", name="fileid", example="", required=true)
    private String fileid;

    public String getFileid() {
        return this.fileid;
    }

    public void setFileid(String fileid) {
        this.fileid = fileid;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getFontname() {
        return this.fontname;
    }

    public void setFontname(String fontname) {
        this.fontname = fontname;
    }

    public String getColor() {
        return this.color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getFontweight() {
        return this.fontweight;
    }

    public void setFontweight(String fontweight) {
        this.fontweight = fontweight;
    }

    public double getGlobalalpha() {
        return this.globalalpha;
    }

    public void setGlobalalpha(double globalalpha) {
        this.globalalpha = globalalpha;
    }

    public double getAngle() {
        return this.angle;
    }

    public void setAngle(double angle) {
        this.angle = angle;
    }

    public double getFontsize() {
        return this.fontsize;
    }

    public void setFontsize(double fontsize) {
        this.fontsize = fontsize;
    }

    public double getIntervalx() {
        return this.intervalx;
    }

    public void setIntervalx(double intervalx) {
        this.intervalx = intervalx;
    }

    public double getIntervaly() {
        return this.intervaly;
    }

    public void setIntervaly(double intervaly) {
        this.intervaly = intervaly;
    }
}


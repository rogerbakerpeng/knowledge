/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.web.domain;

import com.epoint.ofd.sign.SignMode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="\u7b7e\u540d\u8bf7\u6c42\u5bf9\u8c61", description="\u7b7e\u540d\u65f6\u7528\u6765\u5c01\u88c5\u8bf7\u6c42\u3002")
public class SignRequest {
    @ApiModelProperty(value="\u6587\u4ef6\u552f\u4e00\u6807\u8bc6", name="fileid", example="uuid", required=true)
    private String fileid;
    @ApiModelProperty(value="\u6587\u4ef6\u540d", name="filename", example="100k.ofd", required=true)
    private String filename;
    @ApiModelProperty(value="\u5370\u7ae0\u6587\u4ef6", name="sealfile", example="new BASE64Encoder().encode(OFDUtils.fileToBytes(\"src/test/resources/UserV4.esl\"))", required=true)
    private String sealfile;
    @ApiModelProperty(value="p12\u6587\u4ef6", name="P12file", example="new BASE64Encoder().encode(OFDUtils.fileToBytes(\"src/test/resources/USER.p12\"))", required=true)
    private String P12file;
    @ApiModelProperty(value="KeyStore\u4e2d\u7684key", name="alias", example="private", required=true)
    private String alias;
    @ApiModelProperty(value="\u8bc1\u4e66\u5bc6\u7801", name="pwd", example="123456", required=true)
    private String pwd;
    @ApiModelProperty(value="\u7b2c\u51e0\u9875", name="page", example="1", required=true)
    private int page;
    @ApiModelProperty(value="x\u8f74\u7684\u4f4d\u7f6e", name="x", example="50", required=false)
    private int x;
    @ApiModelProperty(value="y\u8f74\u7684\u4f4d\u7f6e", name="y", example="50", required=false)
    private int y;
    @ApiModelProperty(value="\u5bbd\u5ea6", name="width", example="40", required=true)
    private int width;
    @ApiModelProperty(value="\u9ad8\u5ea6", name="height", example="40", required=true)
    private int height;
    @ApiModelProperty(value="token", name="token", example="", required=true)
    private String token;
    @ApiModelProperty(value="signMode", name="signMode", example="", required=true)
    private SignMode signMode;
    @ApiModelProperty(value="dataHash", name="dataHash", example="", required=true)
    private String dataHash;
    @ApiModelProperty(value="sigVal", name="sigVal", example="", required=true)
    private String sigVal;
    @ApiModelProperty(value="signCert", name="signCert", example="", required=true)
    private String signCert;
    @ApiModelProperty(value="toSign", name="toSign", example="", required=true)
    private String toSign;
    @ApiModelProperty(value="keyword", name="signCert", example="", required=false)
    private String keyword;

    public String getKeyword() {
        return this.keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getToSign() {
        return this.toSign;
    }

    public void setToSign(String toSign) {
        this.toSign = toSign;
    }

    public String getSignCert() {
        return this.signCert;
    }

    public void setSignCert(String signCert) {
        this.signCert = signCert;
    }

    public String getDataHash() {
        return this.dataHash;
    }

    public void setDataHash(String dataHash) {
        this.dataHash = dataHash;
    }

    public String getSigVal() {
        return this.sigVal;
    }

    public void setSigVal(String sigVal) {
        this.sigVal = sigVal;
    }

    public SignMode getSignMode() {
        return this.signMode;
    }

    public void setSignMode(SignMode signMode) {
        this.signMode = signMode;
    }

    public String getFileid() {
        return this.fileid;
    }

    public void setFileid(String fileid) {
        this.fileid = fileid;
    }

    public String getFilename() {
        return this.filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getSealfile() {
        return this.sealfile;
    }

    public void setSealfile(String sealfile) {
        this.sealfile = sealfile;
    }

    public String getP12file() {
        return this.P12file;
    }

    public void setP12file(String p12file) {
        this.P12file = p12file;
    }

    public String getAlias() {
        return this.alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getPwd() {
        return this.pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public int getPage() {
        return this.page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getX() {
        return this.x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return this.y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getWidth() {
        return this.width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return this.height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}


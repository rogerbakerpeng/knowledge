/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.license.app.entity;

import java.io.Serializable;

public final class LicenseEntity
implements Serializable {
    private static final long serialVersionUID = 3830132886489669541L;
    public static final byte[] MAGIC_MARK = "epoint-license".getBytes();
    private final byte[] splitMark = new byte[]{(byte)(System.nanoTime() & 0x7FL), (byte)(System.nanoTime() & 0x7FL)};
    private final long applyTime = System.currentTimeMillis();
    private byte[] publicKeys;
    private long expireTime;
    private String md5;
    private transient byte[] sourceData;

    public LicenseEntity() {
    }

    public LicenseEntity(long expireTime, byte[] publicKeys, String md5) {
        this.expireTime = expireTime;
        this.publicKeys = publicKeys;
        this.md5 = md5;
    }

    public byte[] getSplitMark() {
        return this.splitMark;
    }

    public long getExpireTime() {
        return this.expireTime;
    }

    public byte[] getPublicKeys() {
        return this.publicKeys;
    }

    public long getApplyTime() {
        return this.applyTime;
    }

    public String getMd5() {
        return this.md5;
    }

    public byte[] getSourceData() {
        return this.sourceData;
    }

    public void setSourceData(byte[] sourceData) {
        this.sourceData = sourceData;
    }

    public void setPublicKeys(byte[] publicKeys) {
        this.publicKeys = publicKeys;
    }

    public void setExpireTime(long expireTime) {
        this.expireTime = expireTime;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }
}


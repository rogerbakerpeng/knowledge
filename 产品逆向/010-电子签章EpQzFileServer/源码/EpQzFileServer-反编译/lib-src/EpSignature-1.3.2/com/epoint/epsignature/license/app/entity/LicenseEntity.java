/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.entity;

import com.epoint.epsignature.asn1.ExEpSignException;
import java.io.Serializable;

public final class LicenseEntity
implements Serializable {
    private /* synthetic */ byte[] k;
    private static final long serialVersionUID = 3830132886489669541L;
    private /* synthetic */ long i;
    private final /* synthetic */ byte[] A;
    private transient /* synthetic */ byte[] a;
    private final /* synthetic */ long G;
    private /* synthetic */ String b;
    public static final byte[] MAGIC_MARK = ExEpSignException.J("\u0011R\u001bK\u001aVYN\u001dA\u0011L\u0007G").getBytes();

    public void setSourceData(byte[] a) {
        a.a = a;
    }

    public String getMd5() {
        LicenseEntity a;
        return a.b;
    }

    public void setPublicKeys(byte[] a) {
        a.k = a;
    }

    public void setExpireTime(long a) {
        a.i = a;
    }

    public long getApplyTime() {
        LicenseEntity a;
        return a.G;
    }

    public LicenseEntity(long a, byte[] a2, String a3) {
        LicenseEntity a4;
        LicenseEntity licenseEntity = a4;
        LicenseEntity licenseEntity2 = a4;
        byte[] byArray = new byte[2];
        byArray[0] = (byte)(System.nanoTime() & 0x7FL);
        byArray[1] = (byte)(System.nanoTime() & 0x7FL);
        a4.A = byArray;
        licenseEntity2.G = System.currentTimeMillis();
        licenseEntity2.i = a;
        licenseEntity.k = a2;
        licenseEntity.b = a3;
    }

    public byte[] getPublicKeys() {
        LicenseEntity a;
        return a.k;
    }

    public long getExpireTime() {
        LicenseEntity a;
        return a.i;
    }

    public byte[] getSourceData() {
        LicenseEntity a;
        return a.a;
    }

    public byte[] getSplitMark() {
        LicenseEntity a;
        return a.A;
    }

    public void setMd5(String a) {
        a.b = a;
    }

    public LicenseEntity() {
        LicenseEntity a;
        byte[] byArray = new byte[2];
        byArray[0] = (byte)(System.nanoTime() & 0x7FL);
        byArray[1] = (byte)(System.nanoTime() & 0x7FL);
        a.A = byArray;
        a.G = System.currentTimeMillis();
    }
}


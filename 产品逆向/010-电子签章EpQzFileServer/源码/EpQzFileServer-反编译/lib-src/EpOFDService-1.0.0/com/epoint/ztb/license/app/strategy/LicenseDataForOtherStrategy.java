/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.license.app.strategy;

import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.ztb.license.app.entity.LicenseEntity;
import com.epoint.ztb.license.app.exception.LicenseException;
import com.epoint.ztb.license.app.strategy.base.KeyPairStrategy;
import com.epoint.ztb.license.app.strategy.base.LicenseDataStrategy;
import com.epoint.ztb.license.app.util.Md5;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

public class LicenseDataForOtherStrategy
implements LicenseDataStrategy {
    @Override
    public LicenseEntity parseLicenseData(byte[] bytes, String publicKey, KeyPairStrategy keyPairStrategy) throws LicenseException {
        try {
            ByteArrayInputStream inputStream = new ByteArrayInputStream(bytes);
            byte[] magicBytes = new byte[LicenseEntity.MAGIC_MARK.length];
            inputStream.read(magicBytes);
            this.checkBytes(magicBytes, LicenseEntity.MAGIC_MARK);
            String entryLengthStr = new String(this.readByLength(inputStream));
            byte[] entryBytes = new byte[Integer.parseInt(entryLengthStr)];
            inputStream.read(entryBytes);
            LicenseEntity entity = JSONUtils.json2bean(new String(entryBytes), LicenseEntity.class);
            if (Long.parseLong(new String(this.readByLength(inputStream))) > System.currentTimeMillis()) {
                throw new LicenseException("license\u6570\u636e\u5f02\u5e38");
            }
            long expireTime = Long.parseLong(new String(this.readByLength(inputStream)));
            if (expireTime != entity.getExpireTime()) {
                throw new LicenseException("license\u6570\u636e\u5f02\u5e38");
            }
            if (expireTime < System.currentTimeMillis()) {
                throw new LicenseException("license\u5df2\u8fc7\u671f");
            }
            String keyLengthStr = new String(this.readByLength(inputStream));
            byte[] keyBytes = new byte[Integer.parseInt(keyLengthStr)];
            inputStream.read(keyBytes);
            this.checkBytes(keyBytes, entity.getPublicKeys());
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            int size = 0;
            while ((size = inputStream.read()) != 0) {
                byte[] part = new byte[size];
                inputStream.read(part);
                byte[] decodeData = keyPairStrategy.decode(part, entity.getPublicKeys());
                byteArrayOutputStream.write(decodeData);
            }
            byte[] data = byteArrayOutputStream.toByteArray();
            if (!Md5.md5(data).equals(entity.getMd5())) {
                throw new LicenseException("license\u6570\u636e\u5f02\u5e38");
            }
            ByteArrayOutputStream sourceDataOutputStream = new ByteArrayOutputStream();
            ByteArrayInputStream sourceDataInputStream = new ByteArrayInputStream(data);
            while (sourceDataInputStream.available() > 0) {
                byte[] block = new byte[sourceDataInputStream.read()];
                sourceDataInputStream.read(block);
                sourceDataOutputStream.write(keyPairStrategy.decode(block, Base64.getDecoder().decode(publicKey)));
            }
            entity.setSourceData(sourceDataOutputStream.toByteArray());
            return entity;
        }
        catch (LicenseException e) {
            throw new LicenseException(e.getMessage());
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new LicenseException("\u9ed8\u8ba4\u7b56\u7565-liscense\u6570\u636e\u89e3\u6790\u5931\u8d25");
        }
    }

    private void checkBytes(byte[] b1, byte[] b2) throws LicenseException {
        if (b1.length != b2.length) {
            throw new LicenseException("license\u6570\u636e\u5f02\u5e38");
        }
        for (int i = 0; i < b1.length; ++i) {
            if (b1[i] == b2[i]) continue;
            throw new LicenseException("license\u6570\u636e\u5f02\u5e38");
        }
    }

    private byte[] readByLength(ByteArrayInputStream inputStream) throws IOException {
        byte[] bytes = new byte[inputStream.read()];
        inputStream.read(bytes);
        return bytes;
    }
}


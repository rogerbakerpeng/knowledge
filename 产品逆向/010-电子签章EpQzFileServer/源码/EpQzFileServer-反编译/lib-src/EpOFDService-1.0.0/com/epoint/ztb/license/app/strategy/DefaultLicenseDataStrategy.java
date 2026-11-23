/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.license.app.strategy;

import com.epoint.ztb.license.app.entity.LicenseEntity;
import com.epoint.ztb.license.app.exception.LicenseException;
import com.epoint.ztb.license.app.strategy.base.KeyPairStrategy;
import com.epoint.ztb.license.app.strategy.base.LicenseDataStrategy;
import com.epoint.ztb.license.app.util.Md5;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.util.Base64;

public class DefaultLicenseDataStrategy
implements LicenseDataStrategy {
    @Override
    public LicenseEntity parseLicenseData(byte[] bytes, String publicKey, KeyPairStrategy keyPairStrategy) throws LicenseException {
        try {
            ByteArrayInputStream inputStream = new ByteArrayInputStream(bytes);
            byte[] magicBytes = new byte[LicenseEntity.MAGIC_MARK.length];
            inputStream.read(magicBytes);
            this.checkBytes(magicBytes, LicenseEntity.MAGIC_MARK);
            ObjectInputStream objectInputStream = new ObjectInputStream(inputStream);
            LicenseEntity entity = (LicenseEntity)objectInputStream.readObject();
            this.checkSplitBytes(objectInputStream, entity);
            long applyTime = objectInputStream.readLong();
            if (applyTime > System.currentTimeMillis()) {
                throw new LicenseException("license\u6570\u636e\u5f02\u5e38");
            }
            long expireTime = objectInputStream.readLong();
            if (expireTime != entity.getExpireTime()) {
                throw new LicenseException("license\u6570\u636e\u5f02\u5e38");
            }
            if (expireTime < System.currentTimeMillis()) {
                throw new LicenseException("license\u5df2\u8fc7\u671f");
            }
            this.checkSplitBytes(objectInputStream, entity);
            byte[] publicKeyByte = new byte[objectInputStream.read()];
            objectInputStream.read(publicKeyByte);
            this.checkBytes(publicKeyByte, entity.getPublicKeys());
            this.checkSplitBytes(objectInputStream, entity);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            int size = 0;
            while ((size = objectInputStream.read()) != 0) {
                byte[] part = new byte[size];
                objectInputStream.read(part);
                byte[] decodeData = keyPairStrategy.decode(part, entity.getPublicKeys());
                byteArrayOutputStream.write(decodeData);
                this.checkSplitBytes(objectInputStream, entity);
                if (objectInputStream.readLong() == expireTime % (long)decodeData.length) continue;
                throw new LicenseException("license\u6570\u636e\u5f02\u5e38");
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

    private void checkSplitBytes(InputStream objectInputStream, LicenseEntity protocol) throws IOException, LicenseException {
        byte[] splitBytes = new byte[protocol.getSplitMark().length];
        objectInputStream.read(splitBytes);
        for (int i = 0; i < splitBytes.length; ++i) {
            if (splitBytes[i] == protocol.getSplitMark()[i]) continue;
            throw new LicenseException("license\u6570\u636e\u5f02\u5e38");
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
}


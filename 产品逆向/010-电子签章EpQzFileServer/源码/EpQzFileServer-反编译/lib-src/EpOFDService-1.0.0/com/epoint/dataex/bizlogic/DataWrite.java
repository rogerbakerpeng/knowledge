/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.dataex.bizlogic;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;

public class DataWrite {
    public void writeDataToFile(long offset, File fileHandle, byte[] buffer) throws IOException {
        RandomAccessFile oSavedFile = new RandomAccessFile(fileHandle, "rws");
        this.write(offset, oSavedFile, buffer, buffer.length);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    private void write(long pos, RandomAccessFile oSavedFile, byte[] b, int nLen) throws IOException {
        try {
            oSavedFile.seek(pos);
            oSavedFile.write(b, 0, nLen);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            if (oSavedFile != null) {
                oSavedFile.close();
            }
        }
    }
}


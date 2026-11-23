/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions;

import com.epoint.epsignature.bean.Pdf;
import java.io.OutputStream;

public interface H5OutImpl {
    public void deleteSignInfo(Pdf var1, String var2);

    public String getPDFPath(Pdf var1);

    public String getSignedPDFPath(Pdf var1);

    public String getMsgInfo(Pdf var1);

    public void dealPDF(Pdf var1, byte[] var2);

    public byte[] getPDF(Pdf var1);

    public String getSealImg(String var1);

    public boolean dealPDFPath(Pdf var1, String var2);

    public void dealSignInfo(Pdf var1, String var2);

    public boolean dealPDFOs(Pdf var1, OutputStream var2);
}


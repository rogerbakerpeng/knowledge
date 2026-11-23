/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions;

import com.epoint.epsignature.bean.Ofd;

public interface OFDOutImpl {
    public String getSealImg(String var1);

    public void dealOFD(Ofd var1, byte[] var2);

    public byte[] getOFD(Ofd var1);

    public void dealSignInfo(Ofd var1, String var2);
}


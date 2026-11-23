/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions;

import com.epoint.epsignature.bean.Pdf;
import com.epoint.epsignature.bean.QRInfo;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.bean.sign.SignReq;
import java.util.List;

public interface PadImpl {
    public SignResult getSignedVal(List<Pdf> var1, String var2);

    public String getSignCert(String var1);

    public String dealDegist(SignReq var1, List<QRInfo.SignatureObject> var2);

    public List<Seal> getSealImg(String var1);

    public static class SignResult {
        private /* synthetic */ Object G;
        private /* synthetic */ int b;

        public void setValue(Object a) {
            a.G = a;
        }

        public Object getValue() {
            SignResult a;
            return a.G;
        }

        public SignResult() {
            SignResult a;
        }

        public SignResult(int a, Object a2) {
            SignResult a3;
            SignResult signResult = a3;
            signResult.b = a;
            signResult.G = a2;
        }

        public void setStatus(int a) {
            a.b = a;
        }

        public int getStatus() {
            SignResult a;
            return a.b;
        }
    }
}


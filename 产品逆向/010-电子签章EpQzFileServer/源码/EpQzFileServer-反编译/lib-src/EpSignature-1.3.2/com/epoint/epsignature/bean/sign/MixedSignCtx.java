/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MixedSignCtx {
    public Map<String, String> imgs;
    public Map<String, MixedSign> signs;
    public List<MixedAnnote> annotes;

    public MixedSignCtx() {
        MixedSignCtx a;
        MixedSignCtx mixedSignCtx = a;
        a.annotes = new ArrayList<MixedAnnote>();
        mixedSignCtx.signs = new HashMap<String, MixedSign>();
        a.imgs = new HashMap<String, String>();
    }

    public class Timestamp {
        public long time;
        public String b64;
        public boolean verified;
        public String signer;

        public Timestamp() {
            Timestamp a2;
        }
    }

    public class Cert {
        public String sn;
        public String bfjg;
        public String b64;
        public String signer;
        public String sigAlg;

        public Cert() {
            Cert a2;
        }
    }

    public class MixedAnnote {
        public int pg;
        public float y;
        public String iid;
        public Map<String, String> ext;
        public float x;
        public String sealtype;
        public String sid;
        public String annoteid;
        public String name;

        public MixedAnnote() {
            MixedAnnote a2;
        }
    }

    public class MixedSign {
        public String sigtype;
        public String verify;
        public Map<String, String> ext;
        public String sigid;
        public Cert cert;
        public String signed;
        public String loc;
        public String rea;
        public String name;
        public Timestamp timestamp;
        public long date;
        public int sealmode;
        public String org;
        public String certverify;

        public MixedSign() {
            MixedSign a2;
        }
    }
}


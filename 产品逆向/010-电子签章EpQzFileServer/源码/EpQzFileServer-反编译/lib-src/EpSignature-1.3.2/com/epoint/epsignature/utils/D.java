/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.utils.JSONUtils;

class D {
    double A;
    boolean a;
    double G;
    double b;

    public String toString() {
        D a;
        return new StringBuilder().insert(0, JSONUtils.J("V")).append(Math.ceil(a.A)).append(EpOFDData.J("\n")).append(Math.ceil(a.b)).append(JSONUtils.J("P")).toString();
    }

    D(double a, double a2) {
        D a3;
        D d = a3;
        d.A = a;
        d.b = a2;
    }

    public double J(D a) {
        D a2;
        return (a.A - a2.A) * (a.A - a2.A) + (a.b - a2.b) * (a.b - a2.b);
    }

    D() {
        D a;
    }
}


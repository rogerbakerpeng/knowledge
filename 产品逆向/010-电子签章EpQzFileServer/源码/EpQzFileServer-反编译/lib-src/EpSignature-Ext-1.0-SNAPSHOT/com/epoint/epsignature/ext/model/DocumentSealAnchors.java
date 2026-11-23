/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.model;

import com.epoint.epsignature.ext.model.PageAnchor;
import com.epoint.epsignature.ext.model.SealinfoAndPos;
import java.util.List;

public class DocumentSealAnchors {
    private /* synthetic */ List<PageAnchor> b;
    private /* synthetic */ List<SealinfoAndPos> g;

    public void setDocument_seal_anchors(List<PageAnchor> a) {
        a.b = a;
    }

    public static String F(String a) {
        int n = a.length();
        int n2 = n - 1;
        char[] cArray = new char[n];
        int n3 = 4 << 3 ^ (2 ^ 5);
        int cfr_ignored_0 = 5 << 3 ^ 3;
        int n4 = n2;
        int n5 = (2 ^ 5) << 4 ^ 2 << 1;
        while (n4 >= 0) {
            int n6 = n2--;
            cArray[n6] = (char)(a.charAt(n6) ^ n5);
            if (n2 < 0) break;
            int n7 = n2--;
            cArray[n7] = (char)(a.charAt(n7) ^ n3);
            n4 = n2;
        }
        return new String(cArray);
    }

    public DocumentSealAnchors() {
        DocumentSealAnchors a;
    }

    public List<SealinfoAndPos> getUnmatched_seals() {
        DocumentSealAnchors a;
        return a.g;
    }

    public List<PageAnchor> getDocument_seal_anchors() {
        DocumentSealAnchors a;
        return a.b;
    }

    public void setUnmatched_seals(List<SealinfoAndPos> a) {
        a.g = a;
    }
}


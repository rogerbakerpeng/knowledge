/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.model;

import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import java.util.List;

public class KeywordPositionOfPdf {
    private /* synthetic */ List<KeywordAndPosition> g;

    public void setData(List<KeywordAndPosition> a) {
        a.g = a;
    }

    public KeywordPositionOfPdf() {
        KeywordPositionOfPdf a;
    }

    public List<KeywordAndPosition> getData() {
        KeywordPositionOfPdf a;
        return a.g;
    }

    public class KeywordAndPosition {
        private /* synthetic */ List<ComSignReq.Position> m;
        private /* synthetic */ String g;

        public List<ComSignReq.Position> getPositions() {
            KeywordAndPosition a;
            return a.m;
        }

        public String getKeyword() {
            KeywordAndPosition a;
            return a.g;
        }

        public void setKeyword(String a) {
            a.g = a;
        }

        public void setPositions(List<ComSignReq.Position> a) {
            a.m = a;
        }

        public KeywordAndPosition() {
            KeywordAndPosition a2;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.gm.ses.v4;

import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.dzyyzz.cn.com.epoint.GetMessageResponse;
import com.epoint.epsignature.gm.ses.v1.ExtensionDatas;
import com.epoint.epsignature.gm.ses.v4.SESeal;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1BitString;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Encodable;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1GeneralizedTime;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.DERBitString;
import com.epoint.gmhelper.bouncycastle.asn1.DERIA5String;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DERSequence;
import org.apache.log4j.Logger;

public class TBS_Sign
extends ASN1Object {
    private /* synthetic */ Object g;
    private /* synthetic */ ExtDatasType k;
    private /* synthetic */ DERIA5String i;
    private /* synthetic */ Object A;
    private /* synthetic */ ASN1Integer a;
    private /* synthetic */ ASN1GeneralizedTime G;
    private static Logger log = Logger.getLogger(TBS_Sign.class);
    private /* synthetic */ ASN1BitString b;

    public TBS_Sign(ASN1Sequence a) {
        TBS_Sign tBS_Sign;
        TBS_Sign a2;
        a2.k = ExtDatasType.UNKNOWN;
        a = ((ASN1Sequence)a).getObjects();
        a2.a = ASN1Integer.getInstance(a.nextElement());
        Object e = a.nextElement();
        try {
            a2.A = SESeal.getInstance(e);
            tBS_Sign = a2;
        }
        catch (Exception exception) {
            log.error(BaseResp.J("\u7b3e\u7aae\u7e93\u67ca\u6530\u6320\u4e4d\u6661\u6b23\u898a\u0016z"));
            tBS_Sign = a2;
            a2.A = DEROctetString.getInstance(e);
        }
        tBS_Sign.G = ASN1GeneralizedTime.getInstance(a.nextElement());
        Object object = a;
        a2.b = DERBitString.getInstance(a.nextElement());
        a2.i = DERIA5String.getInstance(object.nextElement());
        if (object.hasMoreElements()) {
            Object e2 = a.nextElement();
            a2.J(e2);
        }
    }

    public boolean isExtDatasExtensionDatas() {
        TBS_Sign a;
        return a.k == ExtDatasType.EXTENSION_DATAS;
    }

    public TBS_Sign() {
        TBS_Sign a;
        a.k = ExtDatasType.UNKNOWN;
    }

    public TBS_Sign setPropertyInfo(String a) {
        TBS_Sign a2;
        a2.i = new DERIA5String(a);
        return a2;
    }

    public static TBS_Sign getInstance(Object a) {
        if (a instanceof TBS_Sign) {
            return (TBS_Sign)a;
        }
        if (a != null) {
            return new TBS_Sign(ASN1Sequence.getInstance(a));
        }
        return null;
    }

    public TBS_Sign setDataHash(byte[] a) {
        TBS_Sign a2;
        a2.b = new DERBitString(a);
        return a2;
    }

    public ASN1GeneralizedTime getTimeInfo() {
        TBS_Sign a;
        return a.G;
    }

    public ExtensionDatas getExtDatasAsExtensionDatas() {
        TBS_Sign a;
        if (a.isExtDatasExtensionDatas()) {
            return (ExtensionDatas)a.g;
        }
        return null;
    }

    public TBS_Sign(ASN1Integer a, SESeal a2, ASN1GeneralizedTime a3, ASN1BitString a4, DERIA5String a5, ExtensionDatas a6) {
        TBS_Sign a7;
        TBS_Sign tBS_Sign = a7;
        TBS_Sign tBS_Sign2 = a7;
        a7.k = ExtDatasType.UNKNOWN;
        tBS_Sign2.a = a;
        tBS_Sign2.A = a2;
        tBS_Sign.G = a3;
        tBS_Sign.b = a4;
        a7.i = a5;
        a7.setExtDatas(a6);
    }

    public DERIA5String getPropertyInfo() {
        TBS_Sign a;
        return a.i;
    }

    public ASN1Integer getVersion() {
        TBS_Sign a;
        return a.a;
    }

    public TBS_Sign setVersion(ASN1Integer a) {
        TBS_Sign a2;
        a2.a = a;
        return a2;
    }

    public TBS_Sign setDataHash(ASN1BitString a) {
        TBS_Sign a2;
        a2.b = a;
        return a2;
    }

    public Object getExtDatas() {
        TBS_Sign a;
        return a.g;
    }

    public boolean isExtDatasASN1Sequence() {
        TBS_Sign a;
        return a.k == ExtDatasType.ASN1_SEQUENCE;
    }

    public TBS_Sign setEseal(SESeal a) {
        TBS_Sign a2;
        a2.A = a;
        return a2;
    }

    public TBS_Sign setExtDatas(ExtensionDatas a) {
        TBS_Sign a2;
        TBS_Sign tBS_Sign = a2;
        tBS_Sign.g = a;
        tBS_Sign.k = a != null ? ExtDatasType.EXTENSION_DATAS : ExtDatasType.UNKNOWN;
        return a2;
    }

    public Object getEseal() {
        TBS_Sign a;
        return a.A;
    }

    public TBS_Sign setTimeInfo(ASN1GeneralizedTime a) {
        TBS_Sign a2;
        a2.G = a;
        return a2;
    }

    public TBS_Sign(ASN1Integer a, SESeal a2, ASN1GeneralizedTime a3, ASN1BitString a4, DERIA5String a5, ASN1Sequence a6) {
        TBS_Sign a7;
        TBS_Sign tBS_Sign = a7;
        TBS_Sign tBS_Sign2 = a7;
        a7.k = ExtDatasType.UNKNOWN;
        tBS_Sign2.a = a;
        tBS_Sign2.A = a2;
        tBS_Sign.G = a3;
        tBS_Sign.b = a4;
        a7.i = a5;
        a7.setExtDatas(a6);
    }

    public ASN1BitString getDataHash() {
        TBS_Sign a;
        return a.b;
    }

    public TBS_Sign setPropertyInfo(DERIA5String a) {
        TBS_Sign a2;
        a2.i = a;
        return a2;
    }

    public ExtDatasType getExtDatasType() {
        TBS_Sign a;
        return a.k;
    }

    public boolean hasExtDatas() {
        TBS_Sign a;
        return a.g != null;
    }

    public TBS_Sign setExtDatas(ASN1Sequence a) {
        TBS_Sign a2;
        TBS_Sign tBS_Sign = a2;
        tBS_Sign.g = a;
        tBS_Sign.k = a != null ? ExtDatasType.ASN1_SEQUENCE : ExtDatasType.UNKNOWN;
        return a2;
    }

    public ASN1Sequence getExtDatasAsASN1Sequence() {
        TBS_Sign a;
        if (a.isExtDatasASN1Sequence()) {
            return (ASN1Sequence)a.g;
        }
        return null;
    }

    @Override
    public ASN1Primitive toASN1Primitive() {
        ASN1EncodableVector aSN1EncodableVector;
        TBS_Sign a;
        ASN1EncodableVector aSN1EncodableVector2 = new ASN1EncodableVector();
        TBS_Sign tBS_Sign = a;
        aSN1EncodableVector2.add(tBS_Sign.a);
        if (tBS_Sign.A instanceof SESeal) {
            aSN1EncodableVector2.add((SESeal)a.A);
            aSN1EncodableVector = aSN1EncodableVector2;
        } else {
            aSN1EncodableVector2.add((DEROctetString)a.A);
            aSN1EncodableVector = aSN1EncodableVector2;
        }
        aSN1EncodableVector.add(a.G);
        TBS_Sign tBS_Sign2 = a;
        aSN1EncodableVector2.add(a.b);
        aSN1EncodableVector2.add(tBS_Sign2.i);
        if (tBS_Sign2.g != null) {
            if (a.g instanceof ASN1Encodable) {
                aSN1EncodableVector2.add((ASN1Encodable)a.g);
            } else {
                log.warn(GetMessageResponse.J(" \u000519$\t$\u000ee\u00146]+\u00121]\u0004.\u000bL\u0000\u0013&\u0012!\u001c'\u0011 Qe\u001e$\u0013+\u00121]$\u0019!]1\u0012e<\u00163t-7\u0014(\u00141\u00143\u0018"));
            }
        }
        return new DERSequence(aSN1EncodableVector2);
    }

    private /* synthetic */ void J(Object a) {
        TBS_Sign a2;
        ASN1Object aSN1Object;
        try {
            aSN1Object = ExtensionDatas.getInstance(a);
            if (aSN1Object != null) {
                TBS_Sign tBS_Sign = a2;
                tBS_Sign.g = aSN1Object;
                tBS_Sign.k = ExtDatasType.EXTENSION_DATAS;
                log.debug(BaseResp.J("\u688e\u6d0b\u527e`\u000b8:% 3'/ \u0004/4/3n\u7c3b\u57c5"));
                return;
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        try {
            aSN1Object = ASN1Sequence.getInstance(a);
            if (aSN1Object != null) {
                TBS_Sign tBS_Sign = a2;
                tBS_Sign.g = aSN1Object;
                tBS_Sign.k = ExtDatasType.ASN1_SEQUENCE;
                return;
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        TBS_Sign tBS_Sign = a2;
        tBS_Sign.g = a;
        tBS_Sign.k = ExtDatasType.UNKNOWN;
    }

    public static final class ExtDatasType
    extends Enum<ExtDatasType> {
        public static final /* enum */ ExtDatasType UNKNOWN = new ExtDatasType(HighlightPos.J("\u000e\u0002\u0010\u0002\u0014\u001b\u0015"), 0);
        public static final /* enum */ ExtDatasType EXTENSION_DATAS;
        private static final /* synthetic */ ExtDatasType[] $VALUES;
        public static final /* enum */ ExtDatasType ASN1_SEQUENCE;

        static {
            ASN1_SEQUENCE = new ExtDatasType(BaseResp.J("\u000f\u0013\u0000q\u0011\u0013\u000b\u0011\u001b\u0005\u0000\u0003\u000b"), 1);
            EXTENSION_DATAS = new ExtDatasType(HighlightPos.J("\u001e\u0014\u000f\t\u0015\u001f\u0012\u0003\u0015\u0013\u001f\r\u000f\r\b"), 2);
            ExtDatasType[] extDatasTypeArray = new ExtDatasType[3];
            extDatasTypeArray[0] = UNKNOWN;
            extDatasTypeArray[1] = ASN1_SEQUENCE;
            extDatasTypeArray[2] = EXTENSION_DATAS;
            $VALUES = extDatasTypeArray;
        }

        public static ExtDatasType valueOf(String a) {
            return Enum.valueOf(ExtDatasType.class, a);
        }

        public static ExtDatasType[] values() {
            return (ExtDatasType[])$VALUES.clone();
        }

        /*
         * WARNING - Possible parameter corruption
         * WARNING - void declaration
         */
        private /* synthetic */ ExtDatasType() {
            void var2_-1;
            void var1_-1;
            ExtDatasType a;
        }
    }
}


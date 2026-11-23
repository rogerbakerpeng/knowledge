/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.model;

import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Encodable;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1EncodableVector;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Integer;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Object;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1UTCTime;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DLSequence;
import com.epoint.gmhelper.cert.SM2CertUtil;
import java.io.IOException;
import java.security.cert.Certificate;
import java.util.ArrayList;
import java.util.Date;
import org.apache.log4j.Logger;

public abstract class EpASN1Object<T extends ASN1Object> {
    protected T source;
    private static final Logger logger = Logger.getLogger(EpASN1Object.class);

    public byte[] getEncoded() throws IOException {
        EpASN1Object a;
        return ((ASN1Object)a.source).getEncoded();
    }

    public T getSource() {
        EpASN1Object a;
        return a.source;
    }

    public void setSource(T a) {
        a.source = a;
    }

    protected static DEROctetString cert2OctetString(Certificate a) {
        try {
            return new DEROctetString(a.getEncoded());
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            throw new RuntimeException(VerifyReq.J("X\u0002I\u0013\t(X\u0013^\u0013h\u0013I\u000eU\u0000\u9522\u8b88"));
        }
    }

    protected static long asn1Int2Long(Object a) {
        return ((ASN1Integer)a).getValue().longValue();
    }

    protected static Certificate[] asn1Seq2CertList(Object a) {
        ArrayList<Certificate> arrayList;
        try {
            int n;
            arrayList = new ArrayList<Certificate>();
            ASN1Encodable[] aSN1EncodableArray = ((ASN1Sequence)a).toArray();
            int n2 = aSN1EncodableArray.length;
            int n3 = n = 0;
            while (n3 < n2) {
                ASN1Encodable aSN1Encodable = aSN1EncodableArray[n];
                arrayList.add(EpASN1Object.octetString2Cert(aSN1Encodable));
                n3 = ++n;
            }
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            throw new RuntimeException(BaseReq.J("\u0012A\u001d\u0003 W\u0002\u00000W\u0001F?[\u0000F\u5942\u8d17"));
        }
        ArrayList<Certificate> arrayList2 = arrayList;
        return arrayList2.toArray(new Certificate[arrayList2.size()]);
    }

    protected static Certificate octetString2Cert(Object a) {
        try {
            return SM2CertUtil.getX509Certificate(((DEROctetString)a).getOctets());
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            throw new RuntimeException(VerifyReq.J("T\u0004O\u0002O4O\u0015R\t\\Ux\u0002I\u0013\u590a\u8d42"));
        }
    }

    protected static ASN1Sequence certList2asn1Seq(Certificate[] a) {
        ASN1EncodableVector aSN1EncodableVector;
        try {
            int n;
            aSN1EncodableVector = new ASN1EncodableVector();
            Certificate[] certificateArray = a;
            int n2 = a.length;
            int n3 = n = 0;
            while (n3 < n2) {
                Certificate certificate = certificateArray[n];
                aSN1EncodableVector.add(new DEROctetString(certificate.getEncoded()));
                n3 = ++n;
            }
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            throw new RuntimeException(BaseReq.J("\u0010W\u0001F?[\u0000FAS\u0000\\Ba\u0016C\u5942\u8d17"));
        }
        return new DLSequence(aSN1EncodableVector);
    }

    protected static ASN1UTCTime date2ASN1UTCTime(Date a) {
        return new ASN1UTCTime(a);
    }

    protected static Date asn1UTCTime2Date(Object a) {
        try {
            return ((ASN1UTCTime)a).getDate();
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            throw new RuntimeException(VerifyReq.J("Z\u0014UVn3x3R\n^U\u007f\u0006O\u0002\u590a\u8d42"));
        }
    }

    protected static byte[] derOctetStr2Byte(Object a) {
        try {
            return ((DEROctetString)a).getEncoded();
        }
        catch (Exception exception) {
            logger.error(exception.getMessage(), exception);
            throw new RuntimeException(BaseReq.J("\u0017W\u0001}\u0010F\u0016F F\u0001\u00001K\u0007W\u5942\u8d17"));
        }
    }

    public EpASN1Object() {
        EpASN1Object a;
    }
}


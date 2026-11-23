/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.tsaimpl.TSAClientFactory;
import com.epoint.epsignature.utils.Base64Util;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1InputStream;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Primitive;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1Sequence;
import com.epoint.gmhelper.bouncycastle.asn1.ASN1TaggedObject;
import com.epoint.gmhelper.bouncycastle.asn1.DEROctetString;
import com.epoint.gmhelper.bouncycastle.asn1.DLSet;
import com.epoint.itextpdf.text.pdf.security.TSAClient;
import java.io.ByteArrayInputStream;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;

public class EpQzChangShaTSAActions
extends BaseActions {
    private static Logger log = Logger.getLogger(EpQzChangShaTSAActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        return this.success("");
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        try {
            String req = JSONUtils.bean2json(basereq.getRequest());
            Map reqmap_ = JSONUtils.json2bean(req, Map.class);
            String signData = (String)reqmap_.get("signed");
            ASN1InputStream signDataStream = new ASN1InputStream(new ByteArrayInputStream(Base64Util.decode(signData)));
            ASN1Primitive signDataPkcs = signDataStream.readObject();
            DLSet signDataAsn = (DLSet)signDataPkcs;
            ASN1Sequence asn1EncodableVector = (ASN1Sequence)signDataAsn.getObjectAt(1);
            DLSet rsaDataSet = (DLSet)asn1EncodableVector.getObjectAt(1);
            DEROctetString str = (DEROctetString)rsaDataSet.getObjectAt(0);
            String signDataStr = Base64Util.encode(str.getOctets());
            TSAClient tsaClient = TSAClientFactory.getQzInstance();
            byte[] signedby = tsaClient.getTimeStampToken(Base64Util.decode(signDataStr));
            String signed = Base64Util.encode(signedby);
            ASN1InputStream tempstream = new ASN1InputStream(new ByteArrayInputStream(signedby));
            ASN1Primitive pkcs = tempstream.readObject();
            ASN1Sequence signedData = (ASN1Sequence)pkcs;
            ASN1Sequence content = (ASN1Sequence)signedData.getObjectAt(1);
            ASN1TaggedObject content2 = (ASN1TaggedObject)content.getObjectAt(1);
            ASN1Sequence content3 = (ASN1Sequence)content2.getObject();
            ASN1Sequence rsaData = (ASN1Sequence)((ASN1TaggedObject)content3.getObjectAt(3)).getObject();
            String certdata = Base64Util.encode(rsaData.getEncoded());
            tempstream.close();
            HashMap<String, String> map_ = new HashMap<String, String>();
            map_.put("signature", signed);
            map_.put("signcert", certdata);
            return this.success(JSONUtils.bean2json(map_));
        }
        catch (Exception e) {
            log.error("\u65f6\u95f4\u6233\u7b7e\u540d\u5931\u8d25\uff01", e);
            return null;
        }
    }

    public BaseResp verify(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        boolean str = false;
        Map reqmap_ = JSONUtils.json2bean(req, Map.class);
        String signature = (String)reqmap_.get("signature");
        try {
            Class<?> clazz = Class.forName("com.cfs.tsa.verification.TimeStampVerifier");
            Method verifyMethod = clazz.getMethod("verify", byte[].class, byte[].class);
            Object arg1 = null;
            byte[] arg2 = Base64Util.decode(signature);
            str = (Boolean)verifyMethod.invoke(null, arg1, arg2);
        }
        catch (Exception e) {
            e.printStackTrace();
            log.error("\u65f6\u95f4\u6233\u7b7e\u540d\u5931\u8d25\uff01", e);
        }
        return this.success(str);
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.gm.util.Base64Util;
import java.lang.reflect.Method;
import java.security.PrivateKey;
import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;

public class CFCAServerSealImpl
extends BaseActions {
    private static Logger logger = Logger.getLogger(CFCAServerSealImpl.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getSignData(BaseReq basereq) throws Exception {
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map map_ = JSONUtils.json2bean(req, Map.class);
        String sm2FileText = (String)map_.get("signcertsm2");
        String sm2FilePass = "111111";
        Class<?> JCryptoClazz = Class.forName("cfca.sadk.lib.crypto.JCrypto");
        String deviceName = JCryptoClazz.getField("JSOFT_LIB").get(null).toString();
        Method getInstance = JCryptoClazz.getMethod("getInstance", new Class[0]);
        Object JCryptoObj = getInstance.invoke(JCryptoClazz, new Object[0]);
        Method initialize = JCryptoClazz.getMethod("initialize", String.class, Object.class);
        initialize.invoke(JCryptoObj, deviceName, null);
        Method openSession = JCryptoClazz.getMethod("openSession", String.class);
        Class<?> SessionClazz = Class.forName("cfca.sadk.lib.crypto.Session");
        Object session = openSession.invoke(JCryptoObj, deviceName);
        Class<?> CertUtilClazz = Class.forName("cfca.sadk.util.CertUtil");
        Method getCertFromSM2 = CertUtilClazz.getMethod("getCertFromSM2", byte[].class);
        Class<?> X509CertClazz = Class.forName("cfca.sadk.x509.certificate.X509Cert");
        Object cert = getCertFromSM2.invoke(CertUtilClazz, new Object[]{sm2FileText.getBytes()});
        Class<?> KeyUtilClazz = Class.forName("cfca.sadk.util.KeyUtil");
        Method getPrivateKeyFromSM2 = KeyUtilClazz.getMethod("getPrivateKeyFromSM2", byte[].class, String.class);
        PrivateKey priKey = (PrivateKey)getPrivateKeyFromSM2.invoke(KeyUtilClazz, sm2FileText.getBytes(), sm2FilePass);
        byte[] sourceData = ((String)map_.get("signed")).getBytes("UTF8");
        Class<?> SignatureClazz = Class.forName("cfca.sadk.util.Signature");
        Object util = SignatureClazz.newInstance();
        String signAlg = "sm3WithSM2Encryption";
        Method p7SignMessageAttach = SignatureClazz.getMethod("p7SignMessageAttach", String.class, byte[].class, PrivateKey.class, X509CertClazz, SessionClazz);
        byte[] base64P7SignedData = (byte[])p7SignMessageAttach.invoke(util, signAlg, sourceData, priKey, cert, session);
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("signature", Base64Util.encode(base64P7SignedData));
        map.put("signcert", sm2FileText);
        return this.success(JSONUtils.bean2json(map));
    }

    public boolean verifySign(String signature) {
        try {
            Class<?> JCryptoClazz = Class.forName("cfca.sadk.lib.crypto.JCrypto");
            String deviceName = JCryptoClazz.getField("JSOFT_LIB").get(null).toString();
            Method getInstance = JCryptoClazz.getMethod("getInstance", new Class[0]);
            Object JCryptoObj = getInstance.invoke(JCryptoClazz, new Object[0]);
            Method initialize = JCryptoClazz.getMethod("initialize", String.class, Object.class);
            initialize.invoke(JCryptoObj, deviceName, null);
            Method openSession = JCryptoClazz.getMethod("openSession", String.class);
            Class<?> SessionClazz = Class.forName("cfca.sadk.lib.crypto.Session");
            Object session = openSession.invoke(JCryptoObj, deviceName);
            Class<?> SignatureClazz = Class.forName("cfca.sadk.util.Signature");
            Object util = SignatureClazz.newInstance();
            Method p7SignMessageAttach = SignatureClazz.getMethod("p7VerifyMessageAttach", byte[].class, SessionClazz);
            return (Boolean)p7SignMessageAttach.invoke(util, Base64Util.decode(signature), session);
        }
        catch (Exception e) {
            logger.error("\u9a8c\u7b7e\u5931\u8d25," + e.getMessage(), e);
            return false;
        }
    }
}


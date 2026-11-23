/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.impl.EpQzShanTouYunActions;
import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.bean.sign.SignatureInfo;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.itextpdf.text.pdf.AcroFields;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import org.apache.log4j.Logger;

public class ShanTouMergeUtil {
    private static final Logger log = Logger.getLogger(ShanTouMergeUtil.class);

    public static String verifyShanTouPDF(ArrayList<String> a, byte[] a2, AcroFields a3) throws Exception {
        ArrayList<SignatureInfo> arrayList = new ArrayList<SignatureInfo>();
        int n = 0;
        String string = "";
        Object object = new EpQzShanTouYunActions();
        EpQzShanTouYunActions epQzShanTouYunActions = object;
        epQzShanTouYunActions.init(EpSignatureApi.getActionContext());
        string = epQzShanTouYunActions.verify((byte[])a2);
        a2 = a.iterator();
        while (a2.hasNext()) {
            object = (String)a2.next();
            try {
                SignatureInfo signatureInfo = new SignatureInfo();
                if (((String)object).contains(HighlightPos.J("\u000b\u0016\u001f>-7")) && StringUtil.isNotBlank(string)) {
                    signatureInfo = ShanTouMergeUtil.inspectShanTouSign(string, n++, a3, (String)object);
                }
                if (signatureInfo == null) continue;
                arrayList.add(signatureInfo);
            }
            catch (Exception exception) {
                exception.printStackTrace();
            }
        }
        return JSONUtils.bean2json(arrayList);
    }

    public static SignatureInfo inspectShanTouSign(String a, int a22, AcroFields a3, String a4) {
        try {
            SignatureInfo signatureInfo;
            JSONObject jSONObject = JSONObject.parseObject(a);
            JSONArray jSONArray = JSONUtils.json2bean(jSONObject.getString(ExEpSignException.J("\u0006G\u0007W\u0018V")), JSONArray.class);
            SignatureInfo signatureInfo2 = signatureInfo = new SignatureInfo();
            SignatureInfo signatureInfo3 = signatureInfo;
            signatureInfo2.setId(a3.getFieldItem(a4).getWidgetRef(0).getNumber() + HighlightPos.J("\t"));
            signatureInfo2.setSignid(a4);
            JSONObject a22 = (JSONObject)jSONArray.get(a22);
            SignatureInfo signatureInfo4 = signatureInfo;
            signatureInfo4.setIsIntegrity("0".equals(a22.getString(ExEpSignException.J("\u0015T\u0015K\u0018C\u0016K\u0018K\u0000["))));
            signatureInfo4.setSigndate(new SimpleDateFormat(HighlightPos.J("\"5\"5v\u0001\u0016a?({$3v6!a?(")).parse(a22.getString(ExEpSignException.J("\u0007K\u0013L K\u0019G"))).getTime());
            signatureInfo4.setCert(new SignatureInfo.Cert("", "", "", ""));
            return signatureInfo;
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
            return null;
        }
    }

    public ShanTouMergeUtil() {
        ShanTouMergeUtil a;
    }
}


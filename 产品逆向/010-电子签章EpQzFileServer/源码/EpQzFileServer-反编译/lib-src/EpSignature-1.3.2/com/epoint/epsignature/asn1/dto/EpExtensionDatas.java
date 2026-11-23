/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.asn1.dto;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.asn1.dto.EpExtData;
import com.epoint.epsignature.asn1.model.EpASN1Object;
import com.epoint.epsignature.asn1.model.ExtData;
import com.epoint.epsignature.asn1.model.ExtensionDatas;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.TZGMVerifyPdf;
import java.util.HashMap;
import java.util.Map;

public class EpExtensionDatas
extends EpASN1Object<ExtensionDatas> {
    private /* synthetic */ EpExtData[] G;
    private /* synthetic */ Map<String, EpExtData> b;

    private /* synthetic */ EpExtData[] J() {
        int n;
        EpExtensionDatas a;
        ExtData[] extDataArray = ((ExtensionDatas)a.source).getExtdata();
        int n2 = extDataArray.length;
        EpExtData[] epExtDataArray = new EpExtData[n2];
        int n3 = n = 0;
        while (n3 < n2) {
            int n4 = n;
            EpExtData epExtData = new EpExtData(extDataArray[n]);
            epExtDataArray[n4] = epExtData;
            n3 = ++n;
        }
        return epExtDataArray;
    }

    public EpExtensionDatas(ExtensionDatas a) {
        EpExtensionDatas a2;
        EpExtensionDatas epExtensionDatas = a2;
        epExtensionDatas.setSource(a);
        epExtensionDatas.J();
    }

    public void setExtdata(EpExtData[] a) {
        EpExtensionDatas a2;
        ((ExtensionDatas)a2.source).setExtdata(EpExtensionDatas.J(a));
    }

    public boolean hasOID(String a) {
        int n;
        EpExtensionDatas a2;
        EpExtData[] epExtDataArray = a2.J();
        int n2 = epExtDataArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            if (epExtDataArray[n].oidEquals(a)) {
                return true;
            }
            n3 = ++n;
        }
        return false;
    }

    public void appendExtData(EpExtData a) {
        EpExtensionDatas a2;
        ExtData[] extDataArray = a.getExtnID();
        ExtData[] extDataArray2 = a2.b.get(extDataArray);
        if (extDataArray2 != null) {
            extDataArray2.setCritical(a.isCritical());
            extDataArray2.setExtnValue(a.getExtnValue());
            return;
        }
        EpExtensionDatas epExtensionDatas = a2;
        epExtensionDatas.b.put((String)extDataArray, a);
        extDataArray = ((ExtensionDatas)epExtensionDatas.source).getExtdata();
        extDataArray2 = new ExtData[extDataArray.length + 1];
        System.arraycopy(extDataArray, 0, extDataArray2, 0, extDataArray.length);
        extDataArray2[extDataArray.length] = (ExtData)a.getSource();
        ((ExtensionDatas)a2.source).setExtdata(extDataArray2);
    }

    public EpExtData getByOID(String a) {
        int n;
        EpExtensionDatas a2;
        EpExtData[] epExtDataArray = a2.J();
        int n2 = epExtDataArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            if (epExtDataArray[n].oidEquals(a)) {
                return epExtDataArray[n];
            }
            n3 = ++n;
        }
        throw new ExEpSignException(new StringBuilder().insert(0, JSONUtils.J("Hle-eb\u007f-mdei+hsyol\u007fl+or-ddo-1V")).append(a).append(TZGMVerifyPdf.J("M")).toString());
    }

    public EpExtensionDatas(ExtData[] a) {
        a2(new ExtensionDatas(a));
        EpExtensionDatas a2;
    }

    private static /* synthetic */ ExtData[] J(EpExtData[] a) {
        int n;
        int n2 = a.length;
        ExtData[] extDataArray = new ExtData[n2];
        int n3 = n = 0;
        while (n3 < n2) {
            int n4 = n++;
            extDataArray[n4] = (ExtData)a[n4].getSource();
            n3 = n;
        }
        return extDataArray;
    }

    public EpExtensionDatas() {
        a(new ExtData[0]);
        EpExtensionDatas a;
    }

    private /* synthetic */ void J() {
        int n;
        EpExtensionDatas a;
        a.b = new HashMap<String, EpExtData>();
        EpExtData[] epExtDataArray = a.J();
        int n2 = epExtDataArray.length;
        int n3 = n = 0;
        while (n3 < n2) {
            EpExtData epExtData = epExtDataArray[n];
            String string = epExtData.getExtnID();
            if (a.b.containsKey(string)) {
                throw new ExEpSignException(new StringBuilder().insert(0, JSONUtils.J("Nu\u007fhe~bbeIjyj~+\u5b55\u5723\u76f5\u5407\u7689DDOV")).append(string).append(TZGMVerifyPdf.J("9+\u5279\u59db\u5372\u5921\u8d411")).toString());
            }
            a.b.put(string, epExtData);
            n3 = ++n;
        }
    }

    public EpExtensionDatas(EpExtData[] a) {
        a2(new ExtensionDatas(EpExtensionDatas.J(a)));
        EpExtensionDatas a2;
    }

    public EpExtData[] getExtdata() {
        EpExtensionDatas a;
        return a.J();
    }
}


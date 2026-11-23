/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.utils;

import com.epoint.epsignature.api.EpSignatureApi;
import com.epoint.epsignature.ext.model.AnchorPoint;
import com.epoint.epsignature.ext.model.DocumentSealAnchors;
import com.epoint.epsignature.ext.model.ToBeTwiceDetecedForAnbiao;
import com.epoint.epsignature.ext.model.TwiceDetecedParaResultForAnbiao;
import com.epoint.epsignature.ext.model.TwiceDetecedResForAnbiao;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;

public class TwiceDetectOfAnBiaoUtil {
    private static Logger log = Logger.getLogger(TwiceDetectOfAnBiaoUtil.class);

    public static List<TwiceDetecedResForAnbiao> getTwiceDetectInfoByParaLst(PdfReader a2, List<ToBeTwiceDetecedForAnbiao> a3) {
        ArrayList<TwiceDetecedResForAnbiao> arrayList = new ArrayList<TwiceDetecedResForAnbiao>();
        a3 = a3.stream().map(a -> {
            HashMap<String, String> hashMap = new HashMap<String, String>();
            String string = hashMap.put(AnchorPoint.F("VsTsE}H"), a.getParacon());
            HashMap<String, String> hashMap2 = hashMap;
            hashMap.put(DocumentSealAnchors.F("\u0004F\u0006F\u001fB\r"), a.getParakey());
            hashMap2.put(AnchorPoint.F("bG`G|I"), a.getParano());
            hashMap.put(DocumentSealAnchors.F("\u0007R\u0019"), a.getSum());
            return hashMap2;
        }).collect(Collectors.toList());
        try {
            int n = a2.getNumberOfPages();
            for (int i = 1; i <= n; ++i) {
                TwiceDetecedResForAnbiao twiceDetecedResForAnbiao = new TwiceDetecedResForAnbiao();
                Map<String, Object> map = EpSignatureApi.getKeywordPosOfParaForAnbiao(a2, i, a3);
                if (map == null || !map.containsKey(DocumentSealAnchors.F("\u0004F\u0006F\u0018T\u0000")) || !((map = map.get(AnchorPoint.F("VsTsJaR"))) instanceof List) || ((List)((Object)map)).isEmpty()) continue;
                map = (List)((Object)map);
                TwiceDetecedResForAnbiao twiceDetecedResForAnbiao2 = twiceDetecedResForAnbiao;
                twiceDetecedResForAnbiao2.setParalst((List<TwiceDetecedParaResultForAnbiao>)((Object)map));
                twiceDetecedResForAnbiao2.setPg(i);
                arrayList.add(twiceDetecedResForAnbiao2);
            }
        }
        catch (Exception exception) {
            log.error(DocumentSealAnchors.F("\u0013B\u0000s\u0003N\u0017B0B\u0000B\u0017S=I\u0012H6^>T\u001bI8T\u0000"), exception);
        }
        return arrayList;
    }

    public TwiceDetectOfAnBiaoUtil() {
        TwiceDetectOfAnBiaoUtil a;
    }
}


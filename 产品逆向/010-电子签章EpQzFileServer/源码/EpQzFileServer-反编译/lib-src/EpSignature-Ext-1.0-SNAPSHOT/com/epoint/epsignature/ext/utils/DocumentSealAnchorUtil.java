/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.ext.utils;

import com.alibaba.fastjson.JSONArray;
import com.epoint.epsignature.bean.sign.MixedSignCtx;
import com.epoint.epsignature.bean.sign.SignatureInfo;
import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.ext.model.AnchorPoint;
import com.epoint.epsignature.ext.model.AnchorSignatureInfo;
import com.epoint.epsignature.ext.model.DetectParams;
import com.epoint.epsignature.ext.model.DocumentSealAnchors;
import com.epoint.epsignature.ext.model.PageAnchor;
import com.epoint.epsignature.ext.model.SealinfoAndPos;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.PDFMergeUtil;
import com.epoint.itextpdf.text.pdf.PdfReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;

public class DocumentSealAnchorUtil {
    private static Logger log = Logger.getLogger(DocumentSealAnchorUtil.class);
    private static final String SIGN_NAME = "signname";

    public static List<AnchorSignatureInfo> getSignatureInfos(PdfReader a) {
        ArrayList<AnchorSignatureInfo> arrayList = new ArrayList<AnchorSignatureInfo>();
        try {
            String string = PDFMergeUtil.verifyPDF(a);
            Iterator<Object> iterator = JSONUtils.json2bean(string, JSONArray.class).iterator();
            while (iterator.hasNext()) {
                AnchorSignatureInfo anchorSignatureInfo;
                AnchorSignatureInfo anchorSignatureInfo2 = anchorSignatureInfo = JSONUtils.json2bean(iterator.next(), AnchorSignatureInfo.class);
                anchorSignatureInfo2.setHasAnchor(false);
                arrayList.add(anchorSignatureInfo2);
            }
        }
        catch (Exception exception) {
            log.error(DocumentSealAnchors.F("\u0013B\u0000t\u001d@\u001aF\u0000R\u0006B=I\u0012H\u0007"), exception);
        }
        return arrayList;
    }

    public static DocumentSealAnchors getDocSealAnchorsByPosAndSealinfo(List<DetectParams> a, List<AnchorSignatureInfo> a2) {
        DocumentSealAnchors documentSealAnchors = new DocumentSealAnchors();
        ArrayList<PageAnchor> arrayList = new ArrayList<PageAnchor>();
        for (DetectParams detectParams : a) {
            Iterator<ComSignReq.Position> iterator = detectParams.getPositionLst().iterator();
            while (iterator.hasNext()) {
                Iterator<ComSignReq.Position> iterator2;
                ComSignReq.Position position = iterator2.next();
                iterator = iterator2;
                DocumentSealAnchorUtil.F(arrayList, position).getAnchor_points().add(DocumentSealAnchorUtil.F(detectParams, position, a2));
            }
        }
        DocumentSealAnchors documentSealAnchors2 = documentSealAnchors;
        documentSealAnchors2.setDocument_seal_anchors(arrayList);
        documentSealAnchors2.setUnmatched_seals(DocumentSealAnchorUtil.F(a2));
        return documentSealAnchors;
    }

    public static DocumentSealAnchors getDocSealAnchorsByPosAndMixctx(List<DetectParams> a, MixedSignCtx a2) {
        DocumentSealAnchors documentSealAnchors = new DocumentSealAnchors();
        ArrayList<PageAnchor> arrayList = new ArrayList<PageAnchor>();
        Map<String, MixedSignCtx.MixedAnnote> map = DocumentSealAnchorUtil.F(a2);
        for (DetectParams detectParams : a) {
            Iterator<ComSignReq.Position> iterator = detectParams.getPositionLst().iterator();
            while (iterator.hasNext()) {
                Iterator<ComSignReq.Position> iterator2;
                ComSignReq.Position position = iterator2.next();
                iterator = iterator2;
                DocumentSealAnchorUtil.F(arrayList, position).getAnchor_points().add(DocumentSealAnchorUtil.F(detectParams, position, a2, map));
            }
        }
        DocumentSealAnchors documentSealAnchors2 = documentSealAnchors;
        documentSealAnchors2.setDocument_seal_anchors(arrayList);
        documentSealAnchors2.setUnmatched_seals(DocumentSealAnchorUtil.F(a2, map));
        return documentSealAnchors;
    }

    public static MixedSignCtx getMixedSignCtx(PdfReader a) {
        MixedSignCtx mixedSignCtx = null;
        try {
            mixedSignCtx = PDFMergeUtil.inspectSignatureWithMixed((PdfReader)a, (boolean)false);
            return mixedSignCtx;
        }
        catch (Exception exception) {
            log.error(DocumentSealAnchors.F("\u0013B\u0000j\u001d_\u0011C'N\u0013I7S\f"), exception);
            return mixedSignCtx;
        }
    }

    private static /* synthetic */ AnchorPoint F(DetectParams a2, ComSignReq.Position a3, MixedSignCtx a4, Map<String, MixedSignCtx.MixedAnnote> a5) {
        AnchorPoint anchorPoint;
        boolean bl = false;
        DetectParams detectParams = a2;
        String string = detectParams.getSealtype();
        float f = detectParams.getRange();
        ComSignReq.Position position = a3;
        float f2 = position.getX();
        float f3 = position.getY();
        int n = position.getPage();
        AnchorPoint anchorPoint2 = anchorPoint = new AnchorPoint();
        AnchorPoint anchorPoint3 = anchorPoint;
        anchorPoint3.setPosition((ComSignReq.Position)a3);
        anchorPoint3.setSeal_type(string);
        anchorPoint2.setKeyword(a2.getKeyword());
        anchorPoint2.setRange(a2.getRange());
        a3 = new ArrayList();
        MixedSignCtx mixedSignCtx = a4;
        a4 = mixedSignCtx.annotes;
        Map<String, MixedSignCtx.MixedSign> map = mixedSignCtx.signs;
        a4 = a4.iterator();
        while (a4.hasNext()) {
            SignatureInfo.Postion postion;
            MixedSignCtx.MixedAnnote mixedAnnote;
            MixedSignCtx.MixedAnnote mixedAnnote2 = mixedAnnote = (MixedSignCtx.MixedAnnote)a4.next();
            int n2 = mixedAnnote2.pg;
            float f4 = mixedAnnote2.x;
            float f5 = mixedAnnote2.y;
            Map<String, String> map2 = map.get((Object)mixedAnnote.sid).ext;
            if (n != n2 || !(Math.abs(f2 - f4) < f) || !(Math.abs(f3 - f5) < f) || !string.equals(map2.get(DocumentSealAnchors.F("T\u001d@\u001aS\rW\u0011")))) continue;
            SealinfoAndPos sealinfoAndPos = new SealinfoAndPos();
            SignatureInfo.Postion postion2 = postion = new SignatureInfo.Postion();
            postion.setX(f4);
            postion2.setY(f5);
            postion2.setPage(n2);
            SealinfoAndPos sealinfoAndPos2 = sealinfoAndPos;
            sealinfoAndPos2.setSealpos(postion);
            sealinfoAndPos2.setSealinfo(map2.entrySet().stream().filter(a -> ((String)a.getKey()).equals(SIGN_NAME)).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue)));
            a3.add(sealinfoAndPos);
            bl = true;
            if (!a5.containsKey(mixedAnnote.annoteid)) continue;
            a5.remove(mixedAnnote.annoteid);
        }
        if (!bl) {
            anchorPoint.setSignatures(Arrays.asList(new SealinfoAndPos[0]));
        }
        AnchorPoint anchorPoint4 = anchorPoint;
        anchorPoint4.setSignatures((List<SealinfoAndPos>)a3);
        return anchorPoint4;
    }

    private static /* synthetic */ List<SealinfoAndPos> F(List<AnchorSignatureInfo> a2) {
        Iterator iterator;
        ArrayList<SealinfoAndPos> arrayList = new ArrayList<SealinfoAndPos>();
        Iterator iterator2 = iterator = a2.stream().filter(a -> !a.isHasAnchor()).collect(Collectors.toList()).iterator();
        while (iterator2.hasNext()) {
            AnchorSignatureInfo anchorSignatureInfo = (AnchorSignatureInfo)iterator.next();
            SealinfoAndPos sealinfoAndPos = new SealinfoAndPos();
            iterator2 = iterator;
            SealinfoAndPos sealinfoAndPos2 = sealinfoAndPos;
            sealinfoAndPos2.setSealinfo(anchorSignatureInfo.getExt());
            sealinfoAndPos2.setSealpos(anchorSignatureInfo.getPos());
            arrayList.add(sealinfoAndPos2);
        }
        return arrayList;
    }

    private static /* synthetic */ PageAnchor F(List<PageAnchor> a, ComSignReq.Position a3) {
        PageAnchor pageAnchor = null;
        Optional<PageAnchor> optional = a.stream().filter(a2 -> a2.getPage() == a3.getPage()).findFirst();
        if (optional.isPresent()) {
            pageAnchor = optional.get();
            return pageAnchor;
        }
        pageAnchor = new PageAnchor();
        optional = new ArrayList();
        PageAnchor pageAnchor2 = pageAnchor;
        pageAnchor.setAnchor_points((List<AnchorPoint>)((Object)optional));
        pageAnchor2.setPage(a3.getPage());
        a.add(pageAnchor2);
        return pageAnchor2;
    }

    private static /* synthetic */ Map<String, MixedSignCtx.MixedAnnote> F(MixedSignCtx a) {
        Object object = a.annotes;
        HashMap<String, MixedSignCtx.MixedAnnote> hashMap = new HashMap<String, MixedSignCtx.MixedAnnote>();
        Object object2 = object = object.iterator();
        while (object2.hasNext()) {
            MixedSignCtx.MixedAnnote mixedAnnote = (MixedSignCtx.MixedAnnote)object.next();
            object2 = object;
            hashMap.put(mixedAnnote.annoteid, mixedAnnote);
        }
        return hashMap;
    }

    private static /* synthetic */ AnchorPoint F(DetectParams a, ComSignReq.Position a2, List<AnchorSignatureInfo> a3) {
        AnchorPoint anchorPoint;
        boolean bl = false;
        DetectParams detectParams = a;
        String string = detectParams.getSealtype();
        float f = detectParams.getRange();
        ComSignReq.Position position = a2;
        float f2 = position.getX();
        float f3 = position.getY();
        int n = position.getPage();
        AnchorPoint anchorPoint2 = anchorPoint = new AnchorPoint();
        AnchorPoint anchorPoint3 = anchorPoint;
        anchorPoint3.setPosition((ComSignReq.Position)a2);
        anchorPoint3.setSeal_type(string);
        anchorPoint2.setKeyword(a.getKeyword());
        anchorPoint2.setRange(a.getRange());
        a2 = new ArrayList();
        a3 = a3.iterator();
        while (a3.hasNext()) {
            SealinfoAndPos sealinfoAndPos;
            Map<String, String> map;
            AnchorSignatureInfo anchorSignatureInfo = (AnchorSignatureInfo)a3.next();
            int n2 = anchorSignatureInfo.getPos().getPage();
            float f4 = anchorSignatureInfo.getPos().getX();
            float f5 = anchorSignatureInfo.getPos().getY();
            if (n != n2 || !(Math.abs(f2 - f4) < f) || !(Math.abs(f3 - f5) < f) || !string.equals((map = anchorSignatureInfo.getExt()).get(DocumentSealAnchors.F("T\u001d@\u001aS\rW\u0011")))) continue;
            SealinfoAndPos sealinfoAndPos2 = sealinfoAndPos = new SealinfoAndPos();
            sealinfoAndPos.setSealpos(anchorSignatureInfo.getPos());
            sealinfoAndPos2.setSealinfo(map);
            anchorPoint.setSeal_type(string);
            a2.add(sealinfoAndPos2);
            bl = true;
            anchorSignatureInfo.setHasAnchor(true);
        }
        if (!bl) {
            anchorPoint.setSignatures(Arrays.asList(new SealinfoAndPos[0]));
        }
        AnchorPoint anchorPoint4 = anchorPoint;
        anchorPoint4.setSignatures((List<SealinfoAndPos>)a2);
        return anchorPoint4;
    }

    private static /* synthetic */ List<SealinfoAndPos> F(MixedSignCtx a2, Map<String, MixedSignCtx.MixedAnnote> a3) {
        ArrayList<SealinfoAndPos> arrayList = new ArrayList<SealinfoAndPos>();
        Map<String, MixedSignCtx.MixedSign> map = a2.signs;
        Object object = a3 = a3.entrySet().iterator();
        while (object.hasNext()) {
            MixedSignCtx.MixedAnnote mixedAnnote = (MixedSignCtx.MixedAnnote)((Map.Entry)a3.next()).getValue();
            Map<String, String> map2 = map.get(mixedAnnote.sid);
            SealinfoAndPos sealinfoAndPos = new SealinfoAndPos();
            map2 = ((MixedSignCtx.MixedSign)((Object)map2)).ext;
            if (map2 != null) {
                sealinfoAndPos.setSealinfo(map2.entrySet().stream().filter(a -> ((String)a.getKey()).equals(SIGN_NAME)).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue)));
            }
            map2 = new SignatureInfo.Postion();
            object = a3;
            SealinfoAndPos sealinfoAndPos2 = sealinfoAndPos;
            Map<String, String> map3 = map2;
            MixedSignCtx.MixedAnnote mixedAnnote2 = mixedAnnote;
            ((SignatureInfo.Postion)((Object)map2)).setX(mixedAnnote2.x);
            ((SignatureInfo.Postion)((Object)map3)).setY(mixedAnnote2.y);
            ((SignatureInfo.Postion)((Object)map3)).setPage(mixedAnnote.pg);
            sealinfoAndPos2.setSealpos((SignatureInfo.Postion)((Object)map3));
            arrayList.add(sealinfoAndPos2);
        }
        return arrayList;
    }

    public DocumentSealAnchorUtil() {
        DocumentSealAnchorUtil a;
    }
}


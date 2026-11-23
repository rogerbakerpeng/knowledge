/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.eppdfshow.test;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.epoint.epsignature.bean.sign.impl.ComSignReq;
import com.epoint.epsignature.ext.api.EpSignatureExtApi;
import com.epoint.epsignature.ext.enums.DetectTypeEnum;
import com.epoint.epsignature.ext.enums.SealTypeEnum;
import com.epoint.epsignature.ext.model.DetectParams;
import com.epoint.epsignature.ext.model.DocumentSealAnchors;
import com.epoint.epsignature.ext.model.ToBeTwiceDetecedForAnbiao;
import com.epoint.epsignature.ext.model.TwiceDetecedResForAnbiao;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;

public class EpSignatureExtApiTest {
    private static Logger log = Logger.getLogger(EpSignatureExtApiTest.class);

    public String test_keySignAnalyzeSealAnchors(String[] KEYWORD, String filePath) {
        List<DetectParams> toSignLst = this.getKeywordLst(KEYWORD);
        DocumentSealAnchors docSealAnchorinfo = EpSignatureExtApi.analyzeSealAnchors(filePath, toSignLst, DetectTypeEnum.关键字盖章锚点分析.getVal());
        return JSON.toJSONString((Object)docSealAnchorinfo, SerializerFeature.DisableCircularReferenceDetect);
    }

    private List<DetectParams> getKeywordLst(String[] keywordArr) {
        ArrayList<DetectParams> keywordList = new ArrayList<DetectParams>();
        for (String keyword : keywordArr) {
            DetectParams signKeyword = new DetectParams();
            signKeyword.setKeyword(keyword);
            signKeyword.setSealtype(SealTypeEnum.企业公章.getVal());
            signKeyword.setRange(5.0f);
            keywordList.add(signKeyword);
        }
        return keywordList;
    }

    public String test_posSignAnalyzeSealAnchors(String filePath) {
        List<DetectParams> toSignLst = this.getPosLst();
        DocumentSealAnchors docSealAnchorinfo = EpSignatureExtApi.analyzeSealAnchors(filePath, toSignLst, DetectTypeEnum.指定位置盖章锚点分析.getVal());
        return JSON.toJSONString((Object)docSealAnchorinfo, SerializerFeature.DisableCircularReferenceDetect);
    }

    public String test_singleSignAnalyzeSealAnchors(String filePath) {
        List<DetectParams> toSignLst = this.getSigngleLst();
        DocumentSealAnchors docSealAnchorinfo = EpSignatureExtApi.analyzeSealAnchors(filePath, toSignLst, DetectTypeEnum.单个盖章锚点分析.getVal());
        return JSON.toJSONString((Object)docSealAnchorinfo, SerializerFeature.DisableCircularReferenceDetect);
    }

    public String test_multiSignAnalyzeSealAnchors(String filePath) {
        List<DetectParams> toSignLst = this.getMultipageLst();
        DocumentSealAnchors docSealAnchorinfo = EpSignatureExtApi.analyzeSealAnchors(filePath, toSignLst, DetectTypeEnum.批量盖章锚点分析.getVal());
        return JSON.toJSONString((Object)docSealAnchorinfo, SerializerFeature.DisableCircularReferenceDetect);
    }

    public String test_crossSignAnalyzeSealAnchors(String filePath) {
        List<DetectParams> toSignLst = this.getCrossLst();
        DocumentSealAnchors docSealAnchorinfo = EpSignatureExtApi.analyzeSealAnchors(filePath, toSignLst, DetectTypeEnum.骑缝签章锚点分析.getVal());
        return JSON.toJSONString((Object)docSealAnchorinfo, SerializerFeature.DisableCircularReferenceDetect);
    }

    public String test_abiao_DetectKeyword(String filePath, String anbiaoJsonStr) {
        List<ToBeTwiceDetecedForAnbiao> toBeTwiceDetecedLst = this.getToBeTwiceDetecedParaLst(anbiaoJsonStr);
        System.out.println("开始" + System.currentTimeMillis());
        List<TwiceDetecedResForAnbiao> toBeTwiceDetecedResultLst = EpSignatureExtApi.twiceDetectKeywordByParaLst(filePath, toBeTwiceDetecedLst);
        System.out.println("结束" + System.currentTimeMillis());
        return JSON.toJSONString(toBeTwiceDetecedResultLst, SerializerFeature.DisableCircularReferenceDetect);
    }

    public String test_abiao_DetectKeyword_PingBiao(String filePath, String anbiaoJsonStr) {
        List<ToBeTwiceDetecedForAnbiao> toBeTwiceDetecedLst = this.getToBeTwiceDetecedParaLstOfPingBiao(anbiaoJsonStr);
        System.out.println("开始" + System.currentTimeMillis());
        List<TwiceDetecedResForAnbiao> toBeTwiceDetecedResultLst = EpSignatureExtApi.twiceDetectKeywordByParaLst(filePath, toBeTwiceDetecedLst);
        System.out.println("结束" + System.currentTimeMillis());
        return JSON.toJSONString(toBeTwiceDetecedResultLst, SerializerFeature.DisableCircularReferenceDetect);
    }

    private List<DetectParams> getPosLst() {
        ArrayList<DetectParams> toSignList = new ArrayList<DetectParams>();
        DetectParams toSign = new DetectParams();
        ArrayList<ComSignReq.Position> posLst = new ArrayList<ComSignReq.Position>();
        ComSignReq.Position postion = new ComSignReq.Position();
        postion.setX(150.0f);
        postion.setY(150.0f);
        postion.setPage(1);
        ComSignReq.Position anoPostion = new ComSignReq.Position();
        anoPostion.setX(150.0f);
        anoPostion.setY(150.0f);
        anoPostion.setPage(1);
        posLst.add(postion);
        posLst.add(anoPostion);
        toSign.setPositionLst(posLst);
        toSign.setSealtype(SealTypeEnum.企业公章.getVal());
        toSignList.add(toSign);
        return toSignList;
    }

    private List<DetectParams> getSigngleLst() {
        ArrayList<DetectParams> toSignList = new ArrayList<DetectParams>();
        DetectParams toSign = new DetectParams();
        toSign.setX(100.0f);
        toSign.setY(150.0f);
        toSign.setPagenum(5);
        toSign.setSealtype(SealTypeEnum.企业公章.getVal());
        toSignList.add(toSign);
        return toSignList;
    }

    private List<DetectParams> getMultipageLst() {
        ArrayList<DetectParams> toSignList = new ArrayList<DetectParams>();
        DetectParams toSign = new DetectParams();
        toSign.setX(100.0f);
        toSign.setY(150.0f);
        toSign.setPagerange("1-100");
        toSign.setSealtype(SealTypeEnum.企业公章.getVal());
        toSignList.add(toSign);
        return toSignList;
    }

    private List<DetectParams> getCrossLst() {
        ArrayList<DetectParams> toSignList = new ArrayList<DetectParams>();
        DetectParams toSign = new DetectParams();
        toSign.setX(100.0f);
        toSign.setY(150.0f);
        toSign.setSealtype(SealTypeEnum.企业公章.getVal());
        toSignList.add(toSign);
        return toSignList;
    }

    private List<ToBeTwiceDetecedForAnbiao> getToBeTwiceDetecedParaLst(String anbiaoJsonStr) {
        int i = 0;
        ArrayList<ToBeTwiceDetecedForAnbiao> toBeTwiceDetecedForAnbiaoLst = new ArrayList<ToBeTwiceDetecedForAnbiao>();
        List toBeTwiceDetecedJsonLst = new ArrayList();
        toBeTwiceDetecedJsonLst = (List)JSONUtils.json2bean(anbiaoJsonStr, toBeTwiceDetecedJsonLst.getClass());
        for (JSONObject json : toBeTwiceDetecedJsonLst) {
            if (!StringUtil.isNotBlank(json.getString("errorparagraph"))) continue;
            ToBeTwiceDetecedForAnbiao toBeTwiceDetecedForAnbiao = new ToBeTwiceDetecedForAnbiao();
            String para = json.getString("errorparagraph").replace("\t", "").replace("\r", "");
            String keyword = "";
            keyword = StringUtil.isBlank(json.getString("errorrun")) ? para : json.getString("errorrun").replace("\t", "").replace("\r", "");
            toBeTwiceDetecedForAnbiao.setSum(json.getString("summary"));
            toBeTwiceDetecedForAnbiao.setParacon(para);
            toBeTwiceDetecedForAnbiao.setParakey(keyword);
            toBeTwiceDetecedForAnbiao.setParano(String.valueOf(i++));
            toBeTwiceDetecedForAnbiaoLst.add(toBeTwiceDetecedForAnbiao);
        }
        return toBeTwiceDetecedForAnbiaoLst;
    }

    private List<ToBeTwiceDetecedForAnbiao> getToBeTwiceDetecedParaLstOfPingBiao(String anbiaoJsonStr) {
        ArrayList<ToBeTwiceDetecedForAnbiao> toBeTwiceDetecedForAnbiaoLst = new ArrayList<ToBeTwiceDetecedForAnbiao>();
        List toBeTwiceDetecedJsonLst = new ArrayList();
        toBeTwiceDetecedJsonLst = (List)JSONUtils.json2bean(anbiaoJsonStr, toBeTwiceDetecedJsonLst.getClass());
        for (JSONObject json : toBeTwiceDetecedJsonLst) {
            ToBeTwiceDetecedForAnbiao toBeTwiceDetecedForAnbiao = new ToBeTwiceDetecedForAnbiao();
            toBeTwiceDetecedForAnbiao.setSum(json.getString("sum"));
            toBeTwiceDetecedForAnbiao.setParacon(json.getString("paracon").replace(" ", ""));
            toBeTwiceDetecedForAnbiao.setParakey(json.getString("parakey").replace(" ", ""));
            toBeTwiceDetecedForAnbiao.setParano(json.getString("parano"));
            toBeTwiceDetecedForAnbiaoLst.add(toBeTwiceDetecedForAnbiao);
        }
        return toBeTwiceDetecedForAnbiaoLst;
    }
}


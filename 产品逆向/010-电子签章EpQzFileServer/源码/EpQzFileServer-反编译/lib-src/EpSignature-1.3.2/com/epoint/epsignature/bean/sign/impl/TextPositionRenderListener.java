/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign.impl;

import com.epoint.epsignature.bean.sign.MatchItem;
import com.epoint.epsignature.bean.sign.VerifyReq;
import com.epoint.epsignature.license.app.exception.UnauthorizedAccessException;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.itextpdf.awt.geom.Rectangle2D;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.parser.ImageRenderInfo;
import com.epoint.itextpdf.text.pdf.parser.RenderListener;
import com.epoint.itextpdf.text.pdf.parser.TextRenderInfo;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TextPositionRenderListener
implements RenderListener {
    private List<MatchItem> allItems;
    private Rectangle curPageSize;
    private List<MatchItem> matches;
    private List<String> keywordLst;
    private String keyword;
    private Map<String, List<MatchItem>> keywordMatchMap;
    private Integer pageNumber;

    public void setKeyword(String a) {
        a.keyword = a;
    }

    public void setPageNumber(Integer a) {
        a.pageNumber = a;
    }

    public List<String> getKeywordLst() {
        TextPositionRenderListener a;
        return a.keywordLst;
    }

    @Override
    public void renderText(TextRenderInfo a) {
        Object object = a = ((TextRenderInfo)a).getCharacterRenderInfos().iterator();
        while (object.hasNext()) {
            TextPositionRenderListener textPositionRenderListener;
            MatchItem matchItem;
            block5: {
                TextPositionRenderListener a2;
                block4: {
                    block2: {
                        String string;
                        block3: {
                            TextRenderInfo textRenderInfo = (TextRenderInfo)a.next();
                            string = textRenderInfo.getText();
                            string = string.replace(VerifyReq.J("G"), "");
                            Rectangle2D.Float float_ = textRenderInfo.getAscentLine().getBoundingRectange();
                            float f = textRenderInfo.getBaseline().getStartPoint().get(1);
                            f = textRenderInfo.getAscentLine().getStartPoint().get(1) - f;
                            MatchItem matchItem2 = matchItem = new MatchItem();
                            Rectangle2D.Float float_2 = float_;
                            MatchItem matchItem3 = matchItem;
                            TextPositionRenderListener textPositionRenderListener2 = a2;
                            MatchItem matchItem4 = matchItem;
                            matchItem4.setContent(string);
                            matchItem4.setPageNum(a2.pageNumber);
                            matchItem.setPageWidth(Float.valueOf(textPositionRenderListener2.curPageSize.getWidth()));
                            matchItem3.setPageHeight(Float.valueOf(textPositionRenderListener2.curPageSize.getHeight()));
                            matchItem3.setX(Float.valueOf((float)float_.getX() / 0.8f));
                            matchItem.setY(Float.valueOf((float)float_2.getY() / 0.8f));
                            matchItem2.setWidth(Float.valueOf(float_2.width / 0.8f));
                            matchItem2.setHeight(Float.valueOf(f / 0.8f));
                            if (!StringUtil.isNotBlank(string)) break block2;
                            if (a2.keywordLst == null || a2.keywordLst.isEmpty()) break block3;
                            for (String string2 : a2.keywordLst) {
                                if (!string.equalsIgnoreCase(a2.keyword)) continue;
                                ArrayList arrayList = new ArrayList();
                                a2.keywordMatchMap.put(string2, arrayList);
                            }
                            break block4;
                        }
                        if (!string.equalsIgnoreCase(a2.keyword)) break block4;
                        TextPositionRenderListener textPositionRenderListener3 = a2;
                        textPositionRenderListener = textPositionRenderListener3;
                        textPositionRenderListener3.matches.add(matchItem);
                        break block5;
                    }
                    matchItem.setContent(UnauthorizedAccessException.J("\u7a2d\u5b5b\u7b71\u4e3e"));
                }
                textPositionRenderListener = a2;
            }
            textPositionRenderListener.allItems.add(matchItem);
            object = a;
        }
    }

    void setCurPageSize(Rectangle a) {
        a.curPageSize = a;
    }

    @Override
    public void renderImage(ImageRenderInfo a) {
    }

    public void setKeywordMatchMap(Map<String, List<MatchItem>> a) {
        a.keywordMatchMap = a;
    }

    public void setKeywordLst(List<String> a) {
        a.keywordLst = a;
    }

    @Override
    public void beginTextBlock() {
    }

    public void setAllItems(List<MatchItem> a) {
        a.allItems = a;
    }

    public TextPositionRenderListener() {
        TextPositionRenderListener a;
        TextPositionRenderListener textPositionRenderListener = a;
        a.matches = new ArrayList<MatchItem>();
        textPositionRenderListener.allItems = new ArrayList<MatchItem>();
        a.keywordMatchMap = new HashMap<String, List<MatchItem>>();
    }

    public List<MatchItem> getMatches() {
        TextPositionRenderListener a;
        return a.matches;
    }

    public List<MatchItem> getAllItems() {
        TextPositionRenderListener a;
        return a.allItems;
    }

    public Map<String, List<MatchItem>> getKeywordMatchMap() {
        TextPositionRenderListener a;
        return a.keywordMatchMap;
    }

    @Override
    public void endTextBlock() {
    }
}


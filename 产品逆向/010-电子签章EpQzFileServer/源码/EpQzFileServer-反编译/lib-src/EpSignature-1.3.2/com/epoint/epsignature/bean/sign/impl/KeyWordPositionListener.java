/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign.impl;

import com.epoint.epsignature.bean.CertInfo;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.bean.sign.MatchItem;
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

class KeyWordPositionListener
implements RenderListener {
    private List<MatchItem> allItems;
    private List<String> keywordLst;
    private Rectangle curPageSize;
    private String keyword;
    private List<MatchItem> matches;
    private Integer pageNumber;
    private Map<String, List<MatchItem>> keywordMatchMap;

    public List<String> getKeywordLst() {
        KeyWordPositionListener a;
        return a.keywordLst;
    }

    public Map<String, List<MatchItem>> getKeywordMatchMap() {
        KeyWordPositionListener a;
        return a.keywordMatchMap;
    }

    public List<MatchItem> getAllItems() {
        KeyWordPositionListener a;
        return a.allItems;
    }

    public List<MatchItem> getMatches() {
        KeyWordPositionListener a;
        return a.matches;
    }

    void setCurPageSize(Rectangle a) {
        a.curPageSize = a;
    }

    public void setKeywordLst(List<String> a) {
        a.keywordLst = a;
    }

    @Override
    public void renderText(TextRenderInfo a) {
        Object object = a = ((TextRenderInfo)a).getCharacterRenderInfos().iterator();
        while (object.hasNext()) {
            KeyWordPositionListener keyWordPositionListener;
            MatchItem matchItem;
            block5: {
                KeyWordPositionListener a2;
                block4: {
                    block2: {
                        String string;
                        block3: {
                            TextRenderInfo textRenderInfo = (TextRenderInfo)a.next();
                            string = textRenderInfo.getText();
                            string = string.replace(HighlightPos.J("{"), "");
                            Rectangle2D.Float float_ = textRenderInfo.getAscentLine().getBoundingRectange();
                            MatchItem matchItem2 = matchItem = new MatchItem();
                            Rectangle2D.Float float_2 = float_;
                            MatchItem matchItem3 = matchItem;
                            KeyWordPositionListener keyWordPositionListener2 = a2;
                            MatchItem matchItem4 = matchItem;
                            matchItem4.setContent(string);
                            matchItem4.setPageNum(a2.pageNumber);
                            matchItem.setPageWidth(Float.valueOf(keyWordPositionListener2.curPageSize.getWidth()));
                            matchItem3.setPageHeight(Float.valueOf(keyWordPositionListener2.curPageSize.getHeight()));
                            matchItem3.setX(Float.valueOf((float)float_.getX()));
                            matchItem.setY(Float.valueOf((float)float_2.getY()));
                            matchItem2.setWidth(Float.valueOf(float_2.width));
                            matchItem2.setHeight(Float.valueOf(float_.height));
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
                        KeyWordPositionListener keyWordPositionListener3 = a2;
                        keyWordPositionListener = keyWordPositionListener3;
                        keyWordPositionListener3.matches.add(matchItem);
                        break block5;
                    }
                    matchItem.setContent(CertInfo.J("\u7a7f\u5b67\u7b23\u4e02"));
                }
                keyWordPositionListener = a2;
            }
            keyWordPositionListener.allItems.add(matchItem);
            object = a;
        }
    }

    @Override
    public void endTextBlock() {
    }

    KeyWordPositionListener() {
        KeyWordPositionListener a;
        KeyWordPositionListener keyWordPositionListener = a;
        a.matches = new ArrayList<MatchItem>();
        keyWordPositionListener.allItems = new ArrayList<MatchItem>();
        a.keywordMatchMap = new HashMap<String, List<MatchItem>>();
    }

    @Override
    public void beginTextBlock() {
    }

    public void setAllItems(List<MatchItem> a) {
        a.allItems = a;
    }

    public void setKeyword(String a) {
        a.keyword = a;
    }

    public void setPageNumber(Integer a) {
        a.pageNumber = a;
    }

    public void setKeywordMatchMap(Map<String, List<MatchItem>> a) {
        a.keywordMatchMap = a;
    }

    @Override
    public void renderImage(ImageRenderInfo a) {
    }
}


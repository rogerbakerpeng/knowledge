/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign.impl;

import com.epoint.epsignature.bean.annotation.HighlightPos;
import com.epoint.epsignature.bean.sign.MatchItem;
import com.epoint.epsignature.bean.sign.impl.KeyWordPositionListener;
import com.epoint.epsignature.bean.sign.impl.TextPositionRenderListener;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.epoint.epsignature.utils.StringUtil;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfReader;
import com.epoint.itextpdf.text.pdf.parser.PdfReaderContentParser;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

public class KeyFindUtil {
    public static List<MatchItem> matchPage(PdfReader a, Integer a2, String a3) throws Exception {
        KeyWordPositionListener keyWordPositionListener = new KeyWordPositionListener();
        keyWordPositionListener.setKeyword(a3);
        PdfReaderContentParser pdfReaderContentParser = new PdfReaderContentParser(a);
        Rectangle rectangle = a.getPageSize(a2);
        keyWordPositionListener.setPageNumber(a2);
        keyWordPositionListener.setCurPageSize(rectangle);
        pdfReaderContentParser.processContent(a2, keyWordPositionListener);
        return KeyFindUtil.findKeywordItems(keyWordPositionListener, a3);
    }

    public static List<MatchItem> classifyMatchItem(List<MatchItem> a) {
        Iterator iterator;
        Object object;
        Object object2;
        ArrayList<MatchItem> arrayList = new ArrayList<MatchItem>();
        Object object3 = new ArrayList();
        Object object4 = new ArrayList<Object>();
        object4.add(a.get(0));
        object3.add(object4);
        int n = 1;
        int n2 = n;
        while (n2 < a.size()) {
            object2 = a.get(n);
            object = a.get(n - 1);
            if (Math.abs(((MatchItem)object2).getY().floatValue() - ((MatchItem)object).getY().floatValue()) < 5.0f) {
                object4.add(object2);
            } else {
                object4 = new ArrayList<Object>();
                object4.add(object2);
                object3.add(object4);
            }
            n2 = ++n;
        }
        Iterator iterator2 = iterator = object3.iterator();
        while (iterator2.hasNext()) {
            MatchItem matchItem;
            object2 = (List)iterator.next();
            object = object2.stream().map(MatchItem::getHeight).max(Float::compare);
            object3 = (MatchItem)object2.get(0);
            object4 = null;
            if (object2.size() == 1) {
                object4 = (MatchItem)object2.get(0);
            } else {
                Object object5 = object2;
                object4 = (MatchItem)object5.get(object5.size() - 1);
            }
            MatchItem matchItem2 = matchItem = new MatchItem();
            MatchItem matchItem3 = matchItem;
            Object object6 = object3;
            MatchItem matchItem4 = matchItem;
            matchItem4.setX(((MatchItem)object3).getX());
            matchItem4.setY(((MatchItem)object3).getY());
            matchItem.setPageHeight(((MatchItem)object6).getPageHeight());
            matchItem3.setPageWidth(((MatchItem)object6).getPageWidth());
            matchItem3.setPageNum(((MatchItem)object3).getPageNum());
            matchItem2.setWidth(Float.valueOf(((MatchItem)object4).getX().floatValue() - ((MatchItem)object3).getX().floatValue() + ((MatchItem)object4).getWidth().floatValue()));
            matchItem2.setHeight((Float)((Optional)object).get());
            iterator2 = iterator;
            arrayList.add(matchItem);
        }
        return arrayList;
    }

    private static /* synthetic */ Map<String, List<MatchItem>> getMatchItemFromAllItem(List<MatchItem> a, String a2, Boolean a3) {
        HashMap<String, List<MatchItem>> hashMap = new HashMap<String, List<MatchItem>>();
        StringBuilder stringBuilder = new StringBuilder("");
        ArrayList<MatchItem> arrayList = new ArrayList<MatchItem>();
        for (MatchItem matchItem : a) {
            ArrayList<MatchItem> arrayList2;
            String string;
            block6: {
                block5: {
                    block4: {
                        if (!StringUtil.isNotBlank(matchItem.getContent()) || a2.equals(matchItem.getContent())) break block4;
                        StringBuilder stringBuilder2 = stringBuilder;
                        arrayList.add(matchItem);
                        stringBuilder2.append(matchItem.getContent());
                        if (a2.indexOf(stringBuilder2.toString()) != -1 || stringBuilder.toString().indexOf(a2) != -1) break block5;
                        stringBuilder = new StringBuilder(matchItem.getContent());
                        string = a2;
                        ArrayList<MatchItem> arrayList3 = arrayList;
                        arrayList3.clear();
                        arrayList3.add(matchItem);
                        break block6;
                    }
                    arrayList.clear();
                    if (StringUtil.isNotBlank(matchItem.getContent())) {
                        stringBuilder = new StringBuilder(matchItem.getContent());
                        arrayList.add(matchItem);
                    }
                }
                string = a2;
            }
            if (!string.equals(stringBuilder.toString()) && stringBuilder.toString().indexOf(a2) == -1) continue;
            if (a3.booleanValue()) {
                ArrayList<MatchItem> arrayList4 = new ArrayList<MatchItem>();
                ArrayList<MatchItem> arrayList5 = arrayList;
                arrayList2 = arrayList5;
                arrayList4.addAll(arrayList5);
                hashMap.put(UUID.randomUUID().toString(), arrayList4);
            } else {
                ArrayList<MatchItem> arrayList6 = new ArrayList<MatchItem>();
                arrayList6.addAll(arrayList);
                List<MatchItem> list = KeyFindUtil.classifyMatchItem(arrayList6);
                hashMap.put(HighlightPos.J("'>5\u0004") + UUID.randomUUID().toString(), list);
                arrayList2 = arrayList;
            }
            arrayList2.clear();
            stringBuilder = new StringBuilder("");
        }
        return hashMap;
    }

    public static Map<String, List<MatchItem>> findKeywordItems(KeyWordPositionListener a, List<String> a2) {
        Iterator<String> iterator;
        int n;
        HashMap<String, List<MatchItem>> hashMap = new HashMap<String, List<MatchItem>>();
        List<MatchItem> list = a.getAllItems();
        Object object = new StringBuilder();
        int n2 = n = 0;
        while (n2 < list.size()) {
            MatchItem matchItem = list.get(n);
            ((StringBuilder)object).append(matchItem.getContent());
            n2 = ++n;
        }
        if (!a2.stream().anyMatch(arg_0 -> KeyFindUtil.lambda$findKeywordItems$0((StringBuilder)object, arg_0))) {
            return a.getKeywordMatchMap();
        }
        Iterator<String> iterator2 = iterator = a2.iterator();
        while (iterator2.hasNext()) {
            a2 = iterator.next();
            object = KeyFindUtil.getKeywordMatchs((String)a2, list);
            iterator2 = iterator;
            hashMap.put((String)a2, (List<MatchItem>)object);
        }
        return hashMap;
    }

    public static Map<String, List<MatchItem>> matchPage(PdfReader a, int a2, List<String> a3) throws IOException {
        KeyWordPositionListener keyWordPositionListener = new KeyWordPositionListener();
        keyWordPositionListener.setKeywordLst(a3);
        PdfReaderContentParser pdfReaderContentParser = new PdfReaderContentParser(a);
        Rectangle rectangle = a.getPageSize(a2);
        keyWordPositionListener.setPageNumber(a2);
        keyWordPositionListener.setCurPageSize(rectangle);
        pdfReaderContentParser.processContent(a2, keyWordPositionListener);
        return KeyFindUtil.findKeywordItems(keyWordPositionListener, a3);
    }

    private static /* synthetic */ List<MatchItem> getKeywordMatchs(String a, List<MatchItem> a2) {
        int n;
        ArrayList<MatchItem> arrayList = new ArrayList<MatchItem>();
        StringBuilder stringBuilder = new StringBuilder("");
        ArrayList<MatchItem> arrayList2 = new ArrayList<MatchItem>();
        int n2 = n = 0;
        while (n2 < a2.size()) {
            String string;
            MatchItem matchItem;
            block7: {
                block6: {
                    block5: {
                        matchItem = a2.get(n);
                        if (!StringUtil.isNotBlank(matchItem.getContent()) || a.equals(matchItem.getContent())) break block5;
                        StringBuilder stringBuilder2 = stringBuilder;
                        arrayList2.add(matchItem);
                        stringBuilder2.append(matchItem.getContent());
                        if (a.indexOf(stringBuilder2.toString()) != -1 || stringBuilder.toString().indexOf(a) != -1) break block6;
                        stringBuilder = new StringBuilder(matchItem.getContent());
                        string = a;
                        ArrayList<MatchItem> arrayList3 = arrayList2;
                        arrayList3.clear();
                        arrayList3.add(matchItem);
                        break block7;
                    }
                    arrayList2.clear();
                    if (StringUtil.isNotBlank(matchItem.getContent())) {
                        stringBuilder = new StringBuilder(matchItem.getContent());
                        arrayList2.add(matchItem);
                    }
                }
                string = a;
            }
            if (string.equals(stringBuilder.toString()) || stringBuilder.toString().indexOf(a) != -1) {
                ArrayList<MatchItem> arrayList4;
                matchItem = (MatchItem)arrayList2.get(0);
                ArrayList<MatchItem> arrayList5 = arrayList2;
                MatchItem matchItem2 = (MatchItem)arrayList5.get(arrayList5.size() - 1);
                if (Math.floor(matchItem.getY().floatValue()) == Math.floor(matchItem2.getY().floatValue())) {
                    arrayList4 = arrayList;
                    MatchItem matchItem3 = matchItem;
                    matchItem3.setX(Float.valueOf((matchItem3.getX().floatValue() + matchItem2.getX().floatValue()) / 2.0f));
                    matchItem3.setY(Float.valueOf((matchItem3.getY().floatValue() + matchItem2.getY().floatValue()) / 2.0f));
                } else {
                    MatchItem matchItem4 = matchItem;
                    matchItem4.setX(matchItem4.getX());
                    matchItem4.setY(matchItem4.getY());
                    arrayList4 = arrayList;
                }
                arrayList4.add((MatchItem)arrayList2.get(0));
                arrayList2.clear();
                stringBuilder = new StringBuilder("");
            }
            n2 = ++n;
        }
        return arrayList;
    }

    public KeyFindUtil() {
        KeyFindUtil a;
    }

    private static /* synthetic */ boolean lambda$findKeywordItems$0(StringBuilder a, String a2) {
        return a.toString().contains(a2);
    }

    public static List<MatchItem> findKeywordItems(KeyWordPositionListener a, String a2) {
        int n;
        int n2;
        List<MatchItem> list = a.getAllItems();
        StringBuffer stringBuffer = new StringBuffer("");
        int n3 = n2 = 0;
        while (n3 < list.size()) {
            MatchItem matchItem = list.get(n2);
            stringBuffer.append(matchItem.getContent());
            n3 = ++n2;
        }
        if (stringBuffer.toString().lastIndexOf(a2) == -1) {
            return a.getMatches();
        }
        ArrayList<MatchItem> arrayList = new ArrayList<MatchItem>();
        stringBuffer = new StringBuffer("");
        ArrayList<MatchItem> arrayList2 = new ArrayList<MatchItem>();
        int n4 = n = 0;
        while (n4 < list.size()) {
            String string;
            block9: {
                block8: {
                    block7: {
                        if (!StringUtil.isNotBlank(list.get(n).getContent()) || a2.equals(list.get(n).getContent())) break block7;
                        List<MatchItem> list2 = list;
                        arrayList2.add(list2.get(n));
                        stringBuffer.append(list2.get(n).getContent());
                        if (a2.indexOf(stringBuffer.toString()) != -1 || stringBuffer.toString().indexOf(a2) != -1) break block8;
                        stringBuffer = new StringBuffer(list.get(n).getContent());
                        string = a2;
                        ArrayList<MatchItem> arrayList3 = arrayList2;
                        arrayList3.clear();
                        arrayList3.add(list.get(n));
                        break block9;
                    }
                    arrayList2.clear();
                    if (StringUtil.isNotBlank(list.get(n).getContent())) {
                        stringBuffer = new StringBuffer(list.get(n).getContent());
                        arrayList2.add(list.get(n));
                    }
                }
                string = a2;
            }
            if (string.equals(stringBuffer.toString()) || stringBuffer.toString().indexOf(a2) != -1) {
                ArrayList<MatchItem> arrayList4;
                MatchItem matchItem = (MatchItem)arrayList2.get(0);
                ArrayList<MatchItem> arrayList5 = arrayList2;
                MatchItem matchItem2 = (MatchItem)arrayList5.get(arrayList5.size() - 1);
                MatchItem matchItem3 = matchItem;
                if (Math.abs(matchItem.getY().floatValue() - matchItem2.getY().floatValue()) < 2.0f) {
                    matchItem3.setX(Float.valueOf((matchItem.getX().floatValue() + matchItem2.getX().floatValue()) / 2.0f));
                    arrayList4 = arrayList;
                    MatchItem matchItem4 = matchItem;
                    matchItem4.setY(Float.valueOf((matchItem4.getY().floatValue() + matchItem2.getY().floatValue()) / 2.0f));
                } else {
                    matchItem3.setX(matchItem.getX());
                    arrayList4 = arrayList;
                    MatchItem matchItem5 = matchItem;
                    matchItem5.setY(matchItem5.getY());
                }
                arrayList4.add(matchItem);
                arrayList2.clear();
                stringBuffer = new StringBuffer("");
            }
            n4 = ++n;
        }
        return arrayList;
    }

    private static /* synthetic */ Map<String, Object> getKeywordMatchsForAnbiao(Integer a, List<Map<String, String>> a2, List<MatchItem> a3) {
        HashMap<String, Object> hashMap = new HashMap<String, Object>();
        hashMap.put(DZYYZZReq.J("H\u0005"), a);
        StringBuffer stringBuffer = new StringBuffer("");
        int n = 0;
        int n2 = n;
        while (n2 < a3.size()) {
            MatchItem matchItem = a3.get(n);
            stringBuffer.append(matchItem.getContent());
            n2 = ++n;
        }
        ArrayList<Object> arrayList = new ArrayList<Object>();
        a2 = a2.iterator();
        block1: while (true) {
            Object object = a2;
            while (object.hasNext()) {
                Map map = (Map)a2.next();
                if (stringBuffer.toString().indexOf((String)map.get(HighlightPos.J("+-)-8#5"))) == -1) {
                    object = a2;
                    continue;
                }
                ArrayList arrayList2 = new ArrayList();
                Object object2 = KeyFindUtil.getMatchItemFromAllItem(a3, (String)map.get(DZYYZZReq.J("\u0012Y\u0010Y\u0001W\f")), true).entrySet().iterator();
                while (object2.hasNext()) {
                    Iterator<Map.Entry<String, List<MatchItem>>> iterator = KeyFindUtil.getMatchItemFromAllItem(object2.next().getValue(), (String)map.get(HighlightPos.J("+-)-0)\"")), false).entrySet().iterator();
                    while (iterator.hasNext()) {
                        Iterator<MatchItem> iterator2 = iterator.next().getValue().iterator();
                        while (iterator2.hasNext()) {
                            Iterator<MatchItem> iterator3;
                            MatchItem matchItem = iterator3.next();
                            HashMap<String, Float> hashMap2 = new HashMap<String, Float>();
                            iterator2 = iterator3;
                            hashMap2.put(DZYYZZReq.J("\u001a"), matchItem.getX());
                            hashMap2.put(HighlightPos.J("\""), matchItem.getY());
                            hashMap2.put(DZYYZZReq.J("\u0015"), matchItem.getWidth());
                            hashMap2.put(HighlightPos.J("3"), matchItem.getHeight());
                            arrayList2.add(hashMap2);
                        }
                    }
                }
                if (arrayList2.isEmpty()) continue block1;
                object2 = new HashMap();
                object2.put(DZYYZZReq.J("H\u0003J\u0003V\r"), map.get(HighlightPos.J("<:>:\"4")));
                object2.put(DZYYZZReq.J("\u0012Y\u0010Y\t]\u001b"), map.get(HighlightPos.J("+-)-0)\"")));
                object2.put(DZYYZZReq.J("\u0011M\u000f"), map.get(HighlightPos.J("(96")));
                object2.put(DZYYZZReq.J("\u0012W\u0011"), arrayList2);
                arrayList.add(object2);
                continue block1;
            }
            break;
        }
        HashMap<String, Object> hashMap3 = hashMap;
        hashMap3.put(HighlightPos.J("+-)-7?/"), arrayList);
        return hashMap3;
    }

    public static Map<String, Object> matchPageByParaAndKeywordForAnbiao(PdfReader a, int a2, List<Map<String, String>> a3) throws IOException {
        TextPositionRenderListener textPositionRenderListener = new TextPositionRenderListener();
        textPositionRenderListener.setKeyword("");
        PdfReaderContentParser pdfReaderContentParser = new PdfReaderContentParser(a);
        Rectangle rectangle = a.getPageSize(a2);
        textPositionRenderListener.setPageNumber(a2);
        textPositionRenderListener.setCurPageSize(rectangle);
        int n = a2;
        pdfReaderContentParser.processContent(n, textPositionRenderListener);
        return KeyFindUtil.getKeywordMatchsForAnbiao(n, a3, textPositionRenderListener.getAllItems());
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign.impl;

import com.epoint.epsignature.bean.CertInfo;
import com.epoint.epsignature.bean.sign.MatchItem;
import com.epoint.epsignature.bean.sign.SignReq;
import com.epoint.epsignature.bean.sign.impl.KeyFindUtil;
import com.epoint.epsignature.utils.SignUtil;
import com.epoint.gm.util.Base64Util;
import com.epoint.itextpdf.epsign.bean.SignInfo;
import com.epoint.itextpdf.text.Image;
import com.epoint.itextpdf.text.Rectangle;
import com.epoint.itextpdf.text.pdf.PdfName;
import com.epoint.itextpdf.text.pdf.parser.PdfReaderContentParser;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Iterator;
import org.apache.log4j.Logger;

public class KeySignReq
extends SignReq {
    private static Logger log = Logger.getLogger(KeySignReq.class);
    private Sign sign;

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     * Lifted jumps to return sites
     */
    @Override
    public SignReq.PreaseResult parseSigns() throws Exception {
        int n;
        KeySignReq a;
        if (a.preaseresult != null) return a.preaseresult;
        ArrayList<SignInfo> arrayList = new ArrayList<SignInfo>();
        KeySignReq keySignReq = a;
        String string = keySignReq.sign.getSignimg();
        Image image = Image.getInstance(Base64Util.decode(string));
        String[] stringArray = keySignReq.sign.getKeyword().split(CertInfo.J("\u001c"));
        int n2 = n = 0;
        while (true) {
            block12: {
                if (n2 >= stringArray.length) {
                    a.preaseresult = a.new SignReq.PreaseResult(arrayList);
                    return a.preaseresult;
                }
                String string2 = stringArray[n];
                try {
                    int n3 = a.reader.getNumberOfPages();
                    PdfReaderContentParser pdfReaderContentParser = new PdfReaderContentParser(a.reader);
                    Image image2 = image;
                    float f = image2.getWidth() * 0.8f;
                    float f2 = image2.getHeight() * 0.8f;
                    if (!arrayList.isEmpty()) break block12;
                    for (int i = 1; i <= n3; ++i) {
                        Iterator<MatchItem> iterator = KeyFindUtil.matchPage(a.reader, (Integer)i, string2).iterator();
                        while (iterator.hasNext()) {
                            Iterator<MatchItem> iterator2;
                            MatchItem matchItem = iterator2.next();
                            KeySignReq keySignReq2 = a;
                            Rectangle rectangle = keySignReq2.reader.getPageSize(i);
                            float f3 = 0.0f;
                            float f4 = 0.0f;
                            float f5 = 0.0f;
                            float f6 = 0.0f;
                            float f7 = 0.0f;
                            float f8 = 0.0f;
                            float f9 = 0.0f;
                            Rectangle rectangle2 = null;
                            if (keySignReq2.reader.getPageN(i).getAsNumber(PdfName.ROTATE) != null) {
                                int n4 = a.reader.getPageN(i).getAsNumber(PdfName.ROTATE).intValue();
                                int n5 = n4 = (n4 %= 360) < 0 ? n4 + 360 : n4;
                                if (n4 != 180 && n4 != 0) {
                                    MatchItem matchItem2 = matchItem;
                                    f3 = matchItem2.getY().floatValue();
                                    f4 = rectangle.getWidth() - matchItem.getX().floatValue();
                                    f5 = rectangle.getWidth();
                                    f6 = matchItem2.getHeight().floatValue();
                                    f7 = matchItem2.getWidth().floatValue();
                                    f8 = f3 + 3.0f * f6 / 4.0f;
                                    f9 = f5 - f4 + 3.0f * f7 / 4.0f;
                                    rectangle2 = new Rectangle(f3 + 3.0f * f6 / 4.0f - f / 2.0f, f4 + 3.0f * f7 / 4.0f - f2 / 2.0f, f3 + 3.0f * f6 / 4.0f + f / 2.0f, f4 + 3.0f * f7 / 4.0f + f2 / 2.0f);
                                } else {
                                    MatchItem matchItem3 = matchItem;
                                    f3 = matchItem3.getX().floatValue();
                                    f4 = matchItem3.getY().floatValue();
                                    f5 = rectangle.getHeight();
                                    f6 = matchItem3.getWidth().floatValue();
                                    f7 = matchItem.getHeight().floatValue();
                                    f8 = f3 + f6 / 2.0f;
                                    f9 = f5 - f4 + f7 / 2.0f;
                                    rectangle2 = new Rectangle(f3 + f6 / 2.0f - f / 2.0f, f4 + f7 / 2.0f - f2 / 2.0f, f3 + f6 / 2.0f + f / 2.0f, f4 + f7 / 2.0f + f2 / 2.0f);
                                }
                            } else {
                                MatchItem matchItem4 = matchItem;
                                f3 = matchItem4.getX().floatValue();
                                f4 = matchItem4.getY().floatValue();
                                f5 = rectangle.getHeight();
                                f6 = matchItem4.getWidth().floatValue();
                                f7 = matchItem.getHeight().floatValue();
                                f8 = f3 + f6 / 2.0f;
                                f9 = f5 - f4 + f7 / 2.0f;
                                rectangle2 = new Rectangle(f3 + f6 / 2.0f - f / 2.0f, f4 + f7 / 2.0f - f2 / 2.0f, f3 + f6 / 2.0f + f / 2.0f, f4 + f7 / 2.0f + f2 / 2.0f);
                            }
                            String string3 = SignUtil.getSignName();
                            iterator = iterator2;
                            arrayList.add(new SignInfo(rectangle2, i, f8, f9, string, image, string3));
                        }
                    }
                }
                catch (IOException iOException) {
                    log.error(iOException.getMessage(), iOException);
                    iOException.printStackTrace();
                }
            }
            n2 = ++n;
        }
    }

    public KeySignReq() {
        KeySignReq a;
    }

    public Sign getSign() {
        KeySignReq a;
        return a.sign;
    }

    public void setSign(Sign a) {
        a.sign = a;
    }

    public static class Sign {
        private String signimg;
        private String keyword;

        public void setSignimg(String a) {
            a.signimg = a;
        }

        public String getKeyword() {
            Sign a;
            return URLDecoder.decode(a.keyword);
        }

        public void setKeyword(String a) {
            a.keyword = a;
        }

        public Sign() {
            Sign a;
        }

        public String getSignimg() {
            Sign a;
            return a.signimg;
        }
    }
}


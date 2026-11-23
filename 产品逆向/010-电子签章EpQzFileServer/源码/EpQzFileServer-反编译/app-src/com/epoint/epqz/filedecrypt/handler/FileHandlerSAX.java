/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.handler;

import com.epoint.epsignature.utils.StringUtil;
import com.epoint.jobs.TempFileCleanJob;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class FileHandlerSAX
extends DefaultHandler {
    private String J;
    private Map<String, String> D;
    private List<String> h;
    private StringBuilder c;
    private String ALLATORIxDEMO;

    /*
     * WARNING - void declaration
     */
    @Override
    public void characters(char[] cArray, int n, int n2) throws SAXException {
        void a;
        void a2;
        int a3 = n2;
        FileHandlerSAX a4 = this;
        if (StringUtil.isNotBlank(a4.ALLATORIxDEMO)) {
            return;
        }
        if (StringUtil.isNotBlank(a4.J)) {
            FileHandlerSAX fileHandlerSAX = a4;
            if (fileHandlerSAX.h.contains(fileHandlerSAX.J)) {
                a4.c.append((char[])a2, (int)a, a3);
            }
        }
        super.characters((char[])a2, (int)a, a3);
    }

    public FileHandlerSAX(String string) {
        FileHandlerSAX a;
        String a2 = string;
        FileHandlerSAX fileHandlerSAX = a = this;
        FileHandlerSAX fileHandlerSAX2 = a;
        FileHandlerSAX fileHandlerSAX3 = a;
        fileHandlerSAX3.D = new HashMap<String, String>();
        fileHandlerSAX2.ALLATORIxDEMO = "";
        fileHandlerSAX2.J = null;
        fileHandlerSAX.h = new ArrayList<String>();
        fileHandlerSAX.h = Arrays.asList(a2.split(","));
    }

    @Override
    public void startDocument() throws SAXException {
        FileHandlerSAX a;
        super.startDocument();
    }

    /*
     * Unable to fully structure code
     */
    @Override
    public void endElement(String var1_1, String var2_2, String var3_3) throws SAXException {
        a = var3_3;
        a = this;
        if (StringUtil.isNotBlank(a.ALLATORIxDEMO)) {
            return;
        }
        a.J = null;
        if ("TBFile".equals(a) || !a.h.contains(a)) ** GOTO lbl17
        v0 = a;
        var4_4 = v0.c.toString();
        if (v0.D.containsKey(a)) {
            v1 = a;
            a.ALLATORIxDEMO = (String)a + "节点重复，此投标文件格式可能有问题！";
        } else {
            a.D.put(a, var4_4);
lbl17:
            // 2 sources

            v1 = a;
        }
        super.endElement((String)a, (String)a, a);
    }

    public Map<String, String> getDicParam() {
        FileHandlerSAX a;
        return a.D;
    }

    /*
     * WARNING - void declaration
     */
    @Override
    public void startElement(String string, String string2, String string3, Attributes attributes) throws SAXException {
        void a;
        void a2;
        void a3;
        String a4 = string3;
        FileHandlerSAX a5 = this;
        if (StringUtil.isNotBlank(a5.ALLATORIxDEMO)) {
            return;
        }
        a5.J = a4;
        if (!"TBFile".equals(a4)) {
            FileHandlerSAX fileHandlerSAX = a5;
            fileHandlerSAX.c = new StringBuilder();
        }
        super.startElement((String)a3, (String)a2, a4, (Attributes)a);
    }

    @Override
    public void endDocument() throws SAXException {
        FileHandlerSAX a;
        super.endDocument();
    }
}


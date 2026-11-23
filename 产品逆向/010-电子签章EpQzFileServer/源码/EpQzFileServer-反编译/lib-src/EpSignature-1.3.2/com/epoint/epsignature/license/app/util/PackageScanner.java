/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.license.app.util;

import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.CertInfo;
import com.epoint.epsignature.utils.EpFileServerUtil;
import com.epoint.epsignature.utils.TZGMVerifyPdf;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.jar.JarFile;
import java.util.jar.JarInputStream;
import org.apache.log4j.Logger;

public class PackageScanner {
    private static Logger log = Logger.getLogger(PackageScanner.class);
    private static final String EPSIGNATURE_JAR_NAME = "EpSignature";

    /*
     * WARNING - Removed back jump from a try to a catch block - possible behaviour change.
     * Unable to fully structure code
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static List<String> getClassNamesFromPackage(String a) {
        var1_1 = new ArrayList<String>();
        var2_2 = Thread.currentThread().getContextClassLoader();
        var3_3 = a.replace('.', '/');
        try {
            var2_2 = var2_2.getResources((String)var3_3);
lbl6:
            // 3 sources

            block12: while (true) {
                if (var2_2.hasMoreElements() == false) return var1_1;
                var3_3 = (URL)var2_2.nextElement();
                if (var3_3.getProtocol().equalsIgnoreCase(BaseResp.J("\u0006\u0007\f\u000b"))) {
                    var4_5 = new File(var3_3.getFile());
                    if (!var4_5.exists()) continue;
                    var5_6 = var4_5.list();
                    var6_7 = ((String[])var5_6).length;
                    v0 = var7_9 = 0;
                    while (true) {
                        if (v0 >= var6_7) continue block12;
                        var8_11 = var5_6[var7_9];
                        if (var8_11.endsWith(CertInfo.J("+SiQvC"))) {
                            v1 = var8_11;
                            var9_12 = new StringBuilder().insert(0, a).append('.').append(v1.substring(0, v1.length() - 6)).toString();
                            var1_1.add((String)var9_12);
                        }
                        v0 = ++var7_9;
                    }
                }
                break;
            }
        }
        catch (IOException var3_4) {
            v2 = new Object[1];
            v2[0] = a;
            PackageScanner.log.error(String.format(CertInfo.J("bUqsiQvCKQhUvvw_h`dSnQbU%\u6257\u8849\u5f32\u5e3d\u0011uQf[dW`~d]`\n^\u0015vm"), v2), var3_4);
            return var1_1;
        }
        {
            if (!var3_3.getProtocol().equalsIgnoreCase(BaseResp.J("\u0004\u0001\u001c"))) ** GOTO lbl6
            var4_5 = var3_3.getPath().substring(5, var3_3.getPath().indexOf(CertInfo.J("\u0011")));
            var5_6 = new JarFile(URLDecoder.decode((String)var4_5, "UTF-8"));
            var6_8 = var5_6.entries();
            while (var6_8.hasMoreElements()) {
                block21: {
                    var7_10 = var6_8.nextElement();
                    var8_11 = var7_10.getName().replace('/', '.');
                    if (var8_11.startsWith(a) && var8_11.endsWith(BaseResp.J("n-,/3="))) {
                        v3 = var8_11;
                        var1_1.add(v3.substring(0, v3.length() - 6));
                        continue;
                    }
                    if (!var8_11.endsWith(CertInfo.J("+ZdB")) || !var8_11.contains("EpSignature")) continue;
                    var9_12 = new JarInputStream(var5_6.getInputStream(var7_10));
                    var4_5 = null;
                    try {
                        while ((var10_13 = var9_12.getNextJarEntry()) != null) {
                            var11_17 = var10_13.getName().replace('/', '.');
                            if (!var11_17.startsWith(a) || !var11_17.endsWith(BaseResp.J("n-,/3="))) continue;
                            v4 = var11_17;
                            var1_1.add(v4.substring(0, v4.length() - 6));
                        }
                        if (var9_12 == null) continue;
                        if (var4_5 == null) break block21;
                    }
                    catch (Throwable var10_15) {
                        try {
                            var4_5 = var10_15;
                            throw var4_5;
                        }
                        catch (Throwable var12_18) {
                            if (var9_12 != null) {
                                if (var4_5 != null) {
                                    try {
                                        var9_12.close();
                                        v5 = var12_18;
                                        throw v5;
                                    }
                                    catch (Throwable var10_16) {
                                        v5 = var12_18;
                                        var4_5.addSuppressed(var10_16);
                                        throw v5;
                                    }
                                }
                                var9_12.close();
                            }
                            v5 = var12_18;
                            throw v5;
                        }
                    }
                    try {
                        var9_12.close();
                    }
                    catch (Throwable var10_14) {
                        var4_5.addSuppressed(var10_14);
                    }
                    continue;
                }
                var9_12.close();
            }
        }
        {
            var5_6.close();
            ** continue;
        }
    }

    public static boolean containsClassAndMethod(List<ClassMethods> a, String a2, String a3) {
        for (ClassMethods classMethods : a) {
            if (!classMethods.getClassName().equals(a2) || !classMethods.containsMethod(a3)) continue;
            return true;
        }
        return false;
    }

    public PackageScanner() {
        PackageScanner a;
    }

    public static List<ClassMethods> getClassAndMethodsFromPackage(String a) {
        Object object = PackageScanner.getClassNamesFromPackage(a);
        ArrayList<ClassMethods> arrayList = new ArrayList<ClassMethods>();
        object = object.iterator();
        block4: while (true) {
            Object object2 = object;
            while (object2.hasNext()) {
                int n;
                String string;
                block8: {
                    string = (String)object.next();
                    if (!string.contains(BaseResp.J("j"))) break block8;
                    object2 = object;
                    continue;
                }
                Class<?> clazz = Class.forName(string);
                Method[] methodArray = clazz.getDeclaredMethods();
                ArrayList<String> arrayList2 = new ArrayList<String>();
                int n2 = methodArray.length;
                int n3 = n = 0;
                while (n3 < n2) {
                    Method method = methodArray[n];
                    if (!method.getName().startsWith(CertInfo.J("\\d]gTd\u0014"))) {
                        arrayList2.add(method.getName());
                    }
                    n3 = ++n;
                }
                try {
                    arrayList.add(new ClassMethods(string, arrayList2));
                }
                catch (Throwable throwable) {
                    Object[] objectArray = new Object[1];
                    objectArray[0] = a;
                    log.error(String.format(BaseResp.J(")%:\u0003\"!=3\u000f.*\r+4&/*3\b2!-\u001e!-+/'+`\u6229\u880c\u5f4c\u5e78o0/#%!)%\u0000!#%t\u001bk3\u0013"), objectArray), throwable);
                }
                continue block4;
            }
            break;
        }
        return arrayList;
    }

    public static class ClassMethods {
        private /* synthetic */ List<String> G;
        private /* synthetic */ String b;

        public ClassMethods(String a, List<String> a2) {
            ClassMethods a3;
            ClassMethods classMethods = a3;
            classMethods.b = a;
            classMethods.G = a2;
        }

        public String getSimpleName() {
            ClassMethods a;
            ClassMethods classMethods = a;
            return classMethods.b.substring(classMethods.b.lastIndexOf(46) + 1);
        }

        public String getClassName() {
            ClassMethods a;
            return a.b;
        }

        public String toString() {
            ClassMethods a;
            return new StringBuilder().insert(0, TZGMVerifyPdf.J("S\bq\u0017c^0")).append(a.b).append(EpFileServerUtil.J("tq\u00154,975+kx")).append(a.G).toString();
        }

        public List<String> getMethodNames() {
            ClassMethods a;
            return a.G;
        }

        public boolean containsMethod(String a) {
            ClassMethods a2;
            return a2.G.contains(a);
        }
    }
}


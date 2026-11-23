/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.utils.TZGMVerifyPdf;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.io.StringWriter;
import java.util.Arrays;
import org.apache.log4j.Logger;

public class IOUtils {
    private static Logger log = Logger.getLogger(IOUtils.class);
    public static final int DEFAULT_BUFFER_SIZE = 4096;

    public static InputStream getStream(byte[] a) {
        return new ByteArrayInputStream(a);
    }

    /*
     * Exception decompiling
     */
    public static byte[] getBytes(String a) {
        /*
         * This method has failed to decompile.  When submitting a bug report, please provide this stack trace, and (if you hold appropriate legal rights) the relevant class file.
         * 
         * org.benf.cfr.reader.util.ConfusedCFRException: Started 2 blocks at once
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.getStartingBlocks(Op04StructuredStatement.java:412)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.buildNestedBlocks(Op04StructuredStatement.java:487)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op03SimpleStatement.createInitialStructuredBlock(Op03SimpleStatement.java:736)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisInner(CodeAnalyser.java:850)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisOrWrapFail(CodeAnalyser.java:278)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysis(CodeAnalyser.java:201)
         *     at org.benf.cfr.reader.entities.attributes.AttributeCode.analyse(AttributeCode.java:94)
         *     at org.benf.cfr.reader.entities.Method.analyse(Method.java:531)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseMid(ClassFile.java:1055)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseTop(ClassFile.java:942)
         *     at org.benf.cfr.reader.Driver.doJarVersionTypes(Driver.java:257)
         *     at org.benf.cfr.reader.Driver.doJar(Driver.java:139)
         *     at org.benf.cfr.reader.CfrDriverImpl.analyse(CfrDriverImpl.java:76)
         *     at org.benf.cfr.reader.Main.main(Main.java:54)
         */
        throw new IllegalStateException("Decompilation failed");
    }

    public IOUtils() {
        IOUtils a;
    }

    public static boolean deleteDir(File a) {
        if (a.isDirectory()) {
            int n;
            String[] stringArray = a.list();
            int n2 = n = 0;
            while (n2 < stringArray.length) {
                if (!IOUtils.deleteDir(new File(a, stringArray[n]))) {
                    return false;
                }
                n2 = ++n;
            }
        }
        return a.delete();
    }

    public static void MakeDir(String a) {
        File file = new File(a);
        if (!file.exists()) {
            file.mkdirs();
        }
    }

    public static String readFromResource(String a) throws IOException {
        InputStream inputStream;
        block4: {
            String string;
            inputStream = null;
            try {
                inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(a);
                if (inputStream == null) {
                    inputStream = IOUtils.class.getResourceAsStream(a);
                }
                if (inputStream != null) break block4;
                string = null;
            }
            catch (Throwable throwable) {
                IOUtils.close(inputStream);
                throw throwable;
            }
            IOUtils.close(inputStream);
            return string;
        }
        String string = IOUtils.read(inputStream);
        IOUtils.close(inputStream);
        return string;
    }

    /*
     * Exception decompiling
     */
    public static void WriteStringToFile(String a, String a) {
        /*
         * This method has failed to decompile.  When submitting a bug report, please provide this stack trace, and (if you hold appropriate legal rights) the relevant class file.
         * 
         * org.benf.cfr.reader.util.ConfusedCFRException: Tried to end blocks [4[TRYBLOCK]], but top level block is 0[TRYBLOCK]
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.processEndingBlocks(Op04StructuredStatement.java:435)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.buildNestedBlocks(Op04StructuredStatement.java:484)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op03SimpleStatement.createInitialStructuredBlock(Op03SimpleStatement.java:736)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisInner(CodeAnalyser.java:850)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisOrWrapFail(CodeAnalyser.java:278)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysis(CodeAnalyser.java:201)
         *     at org.benf.cfr.reader.entities.attributes.AttributeCode.analyse(AttributeCode.java:94)
         *     at org.benf.cfr.reader.entities.Method.analyse(Method.java:531)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseMid(ClassFile.java:1055)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseTop(ClassFile.java:942)
         *     at org.benf.cfr.reader.Driver.doJarVersionTypes(Driver.java:257)
         *     at org.benf.cfr.reader.Driver.doJar(Driver.java:139)
         *     at org.benf.cfr.reader.CfrDriverImpl.analyse(CfrDriverImpl.java:76)
         *     at org.benf.cfr.reader.Main.main(Main.java:54)
         */
        throw new IllegalStateException("Decompilation failed");
    }

    public static long copy(InputStream a, OutputStream a2) throws IOException {
        int n = -1;
        byte[] byArray = new byte[4096];
        long l2 = 0L;
        int n2 = 0;
        while (-1 != (n2 = a.read(byArray))) {
            a2.write(byArray, 0, n2);
            l2 += (long)n2;
        }
        return l2;
    }

    /*
     * Exception decompiling
     */
    public static String readToString(String a) {
        /*
         * This method has failed to decompile.  When submitting a bug report, please provide this stack trace, and (if you hold appropriate legal rights) the relevant class file.
         * 
         * org.benf.cfr.reader.util.ConfusedCFRException: Tried to end blocks [4[TRYBLOCK]], but top level block is 0[TRYBLOCK]
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.processEndingBlocks(Op04StructuredStatement.java:435)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.buildNestedBlocks(Op04StructuredStatement.java:484)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op03SimpleStatement.createInitialStructuredBlock(Op03SimpleStatement.java:736)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisInner(CodeAnalyser.java:850)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisOrWrapFail(CodeAnalyser.java:278)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysis(CodeAnalyser.java:201)
         *     at org.benf.cfr.reader.entities.attributes.AttributeCode.analyse(AttributeCode.java:94)
         *     at org.benf.cfr.reader.entities.Method.analyse(Method.java:531)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseMid(ClassFile.java:1055)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseTop(ClassFile.java:942)
         *     at org.benf.cfr.reader.Driver.doJarVersionTypes(Driver.java:257)
         *     at org.benf.cfr.reader.Driver.doJar(Driver.java:139)
         *     at org.benf.cfr.reader.CfrDriverImpl.analyse(CfrDriverImpl.java:76)
         *     at org.benf.cfr.reader.Main.main(Main.java:54)
         */
        throw new IllegalStateException("Decompilation failed");
    }

    /*
     * Exception decompiling
     */
    public static String read(InputStream a) {
        /*
         * This method has failed to decompile.  When submitting a bug report, please provide this stack trace, and (if you hold appropriate legal rights) the relevant class file.
         * 
         * org.benf.cfr.reader.util.ConfusedCFRException: Started 3 blocks at once
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.getStartingBlocks(Op04StructuredStatement.java:412)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.buildNestedBlocks(Op04StructuredStatement.java:487)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op03SimpleStatement.createInitialStructuredBlock(Op03SimpleStatement.java:736)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisInner(CodeAnalyser.java:850)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisOrWrapFail(CodeAnalyser.java:278)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysis(CodeAnalyser.java:201)
         *     at org.benf.cfr.reader.entities.attributes.AttributeCode.analyse(AttributeCode.java:94)
         *     at org.benf.cfr.reader.entities.Method.analyse(Method.java:531)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseMid(ClassFile.java:1055)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseTop(ClassFile.java:942)
         *     at org.benf.cfr.reader.Driver.doJarVersionTypes(Driver.java:257)
         *     at org.benf.cfr.reader.Driver.doJar(Driver.java:139)
         *     at org.benf.cfr.reader.CfrDriverImpl.analyse(CfrDriverImpl.java:76)
         *     at org.benf.cfr.reader.Main.main(Main.java:54)
         */
        throw new IllegalStateException("Decompilation failed");
    }

    public static String read(Reader a) {
        StringWriter stringWriter = new StringWriter();
        try {
            char[] cArray = new char[4096];
            int n = 0;
            while (-1 != (n = a.read(cArray))) {
                stringWriter.write(cArray, 0, n);
            }
            String string = stringWriter.toString();
            return string;
        }
        catch (IOException iOException) {
            log.error(iOException.getMessage(), iOException);
            throw new IllegalStateException(BaseReq.J("\u0001W\u0012VSW\u0001@\u001c@"), iOException);
        }
        finally {
            IOUtils.close(a);
            IOUtils.close(stringWriter);
        }
    }

    /*
     * Exception decompiling
     */
    public static byte[] getByte(InputStream a) throws IOException {
        /*
         * This method has failed to decompile.  When submitting a bug report, please provide this stack trace, and (if you hold appropriate legal rights) the relevant class file.
         * 
         * org.benf.cfr.reader.util.ConfusedCFRException: Started 2 blocks at once
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.getStartingBlocks(Op04StructuredStatement.java:412)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.buildNestedBlocks(Op04StructuredStatement.java:487)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op03SimpleStatement.createInitialStructuredBlock(Op03SimpleStatement.java:736)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisInner(CodeAnalyser.java:850)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisOrWrapFail(CodeAnalyser.java:278)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysis(CodeAnalyser.java:201)
         *     at org.benf.cfr.reader.entities.attributes.AttributeCode.analyse(AttributeCode.java:94)
         *     at org.benf.cfr.reader.entities.Method.analyse(Method.java:531)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseMid(ClassFile.java:1055)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseTop(ClassFile.java:942)
         *     at org.benf.cfr.reader.Driver.doJarVersionTypes(Driver.java:257)
         *     at org.benf.cfr.reader.Driver.doJar(Driver.java:139)
         *     at org.benf.cfr.reader.CfrDriverImpl.analyse(CfrDriverImpl.java:76)
         *     at org.benf.cfr.reader.Main.main(Main.java:54)
         */
        throw new IllegalStateException("Decompilation failed");
    }

    public static byte[] byteTrim(byte[] a) {
        byte[] byArray;
        int n;
        block2: {
            int n2 = a.length;
            n = 0;
            int n3 = n2 = n2 - 1;
            while (n3 > 0) {
                if (a[n2] != 0) {
                    n = n2;
                    byArray = a;
                    break block2;
                }
                n3 = --n2;
            }
            byArray = a;
        }
        return Arrays.copyOf(byArray, n + 1);
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static byte[] readByteArray(InputStream a) throws IOException {
        byte[] byArray;
        ByteArrayOutputStream byteArrayOutputStream;
        block10: {
            byteArrayOutputStream = new ByteArrayOutputStream();
            Throwable throwable = null;
            try {
                IOUtils.copy(a, byteArrayOutputStream);
                byArray = byteArrayOutputStream.toByteArray();
                if (byteArrayOutputStream == null) return byArray;
                if (throwable == null) break block10;
            }
            catch (Throwable throwable2) {
                try {
                    throwable = throwable2;
                    throw throwable;
                }
                catch (Throwable throwable3) {
                    Throwable throwable4;
                    if (byteArrayOutputStream != null) {
                        if (throwable != null) {
                            try {
                                byteArrayOutputStream.close();
                                throwable4 = throwable3;
                                throw throwable4;
                            }
                            catch (Throwable throwable5) {
                                throwable4 = throwable3;
                                throwable.addSuppressed(throwable5);
                                throw throwable4;
                            }
                        }
                        byteArrayOutputStream.close();
                    }
                    throwable4 = throwable3;
                    throw throwable4;
                }
            }
            try {
                byteArrayOutputStream.close();
                return byArray;
            }
            catch (Throwable throwable6) {
                throwable.addSuppressed(throwable6);
                return byArray;
            }
        }
        byteArrayOutputStream.close();
        return byArray;
    }

    public static byte[] readByteArrayFromResource(String a) throws IOException {
        InputStream inputStream;
        block4: {
            byte[] byArray;
            inputStream = null;
            try {
                inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(a);
                if (inputStream == null) {
                    inputStream = IOUtils.class.getResourceAsStream(a);
                }
                if (inputStream != null) break block4;
                byArray = null;
            }
            catch (Throwable throwable) {
                IOUtils.close(inputStream);
                throw throwable;
            }
            IOUtils.close(inputStream);
            return byArray;
        }
        byte[] byArray = IOUtils.readByteArray(inputStream);
        IOUtils.close(inputStream);
        return byArray;
    }

    public static void close(Closeable a) {
        if (a == null) {
            return;
        }
        try {
            a.close();
            return;
        }
        catch (Exception exception) {
            log.error(exception.getMessage(), exception);
            exception.printStackTrace();
            return;
        }
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static void write2File(byte[] a, String a2, String a3) throws Exception {
        block11: {
            File file = new File((String)a2);
            if (!file.exists() || !file.isDirectory()) {
                file.mkdirs();
            }
            a2 = new File(new StringBuilder().insert(0, (String)a2).append(TZGMVerifyPdf.J("?")).append((String)a3).toString());
            a2 = new BufferedOutputStream(new FileOutputStream((File)a2));
            a3 = null;
            try {
                ((FilterOutputStream)a2).write(a);
                if (a2 == null) return;
                if (a3 == null) break block11;
            }
            catch (Throwable throwable) {
                try {
                    a3 = throwable;
                    throw a3;
                }
                catch (Throwable throwable2) {
                    Throwable throwable3;
                    if (a2 != null) {
                        if (a3 != null) {
                            try {
                                ((FilterOutputStream)a2).close();
                                throwable3 = throwable2;
                                throw throwable3;
                            }
                            catch (Throwable throwable4) {
                                throwable3 = throwable2;
                                ((Throwable)a3).addSuppressed(throwable4);
                                throw throwable3;
                            }
                        }
                        ((FilterOutputStream)a2).close();
                    }
                    throwable3 = throwable2;
                    throw throwable3;
                }
            }
            try {
                ((FilterOutputStream)a2).close();
                return;
            }
            catch (Throwable throwable) {
                ((Throwable)a3).addSuppressed(throwable);
                return;
            }
        }
        ((FilterOutputStream)a2).close();
    }
}


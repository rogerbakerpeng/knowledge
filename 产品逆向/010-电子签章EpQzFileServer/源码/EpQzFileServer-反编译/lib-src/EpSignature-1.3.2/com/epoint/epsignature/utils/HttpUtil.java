/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.asn1.ExEpSignException;
import com.epoint.epsignature.bean.annotation.HighlightPos;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.Map;
import org.apache.log4j.Logger;

public class HttpUtil {
    private static Logger log = Logger.getLogger(HttpUtil.class);
    private static int TIMEOUT = -1;

    public HttpUtil() {
        HttpUtil a;
    }

    public static String doGet(Map<String, String> a, String a22) {
        StringBuffer stringBuffer;
        String string;
        Object object;
        Object object2;
        HttpURLConnection httpURLConnection;
        StringBuffer stringBuffer2;
        block7: {
            stringBuffer2 = new StringBuffer();
            a22 = new URL((String)a22);
            httpURLConnection = (HttpURLConnection)((URL)a22).openConnection();
            if (TIMEOUT > 0) {
                HttpURLConnection httpURLConnection2 = httpURLConnection;
                httpURLConnection2.setConnectTimeout(TIMEOUT);
                httpURLConnection2.setReadTimeout(TIMEOUT);
            }
            HttpURLConnection httpURLConnection3 = httpURLConnection;
            httpURLConnection3.setDoOutput(true);
            httpURLConnection3.setDoInput(true);
            httpURLConnection.setRequestMethod(ExEpSignException.J("e1v"));
            if (a == null) break block7;
            object2 = a.keySet();
            Object object3 = object = object2.iterator();
            while (object3.hasNext()) {
                String string2 = string = object.next();
                httpURLConnection.addRequestProperty(string2, a.get(string2));
                object3 = object;
            }
        }
        HttpURLConnection httpURLConnection4 = httpURLConnection;
        httpURLConnection4.connect();
        object2 = httpURLConnection4.getInputStream();
        object = new BufferedReader(new InputStreamReader((InputStream)object2, HighlightPos.J(".8=ac")));
        string = null;
        Object object4 = object;
        while ((string = ((BufferedReader)object4).readLine()) != null) {
            object4 = object;
            stringBuffer2.append(string);
        }
        try {
            httpURLConnection.disconnect();
            stringBuffer = stringBuffer2;
        }
        catch (Exception a22) {
            log.error(a22.getMessage(), a22);
            stringBuffer = stringBuffer2;
            a22.printStackTrace();
        }
        return stringBuffer.toString();
    }

    public static String doPost(String a, Map<String, String> a2, String a32) {
        if (a != null && !"".equals(a)) {
            StringBuffer stringBuffer;
            Object object;
            Object object2;
            Object object3;
            HttpURLConnection httpURLConnection;
            StringBuffer stringBuffer2;
            block8: {
                stringBuffer2 = new StringBuffer();
                a32 = new URL((String)a32);
                httpURLConnection = (HttpURLConnection)((URL)a32).openConnection();
                if (TIMEOUT > 0) {
                    HttpURLConnection httpURLConnection2 = httpURLConnection;
                    httpURLConnection2.setConnectTimeout(TIMEOUT);
                    httpURLConnection2.setReadTimeout(TIMEOUT);
                }
                HttpURLConnection httpURLConnection3 = httpURLConnection;
                httpURLConnection.setDoOutput(true);
                httpURLConnection3.setDoInput(true);
                httpURLConnection3.setRequestMethod(ExEpSignException.J("$m'v"));
                httpURLConnection.setRequestProperty(HighlightPos.J("\u000f4\"/)58v\u0018\"<>"), ExEpSignException.J("\u0015R\u0004N\u001dA\u0015V\u001dM\u001a\r\u001eQ\u001bLOA\u001cC\u0006Q\u0011VIw dY\u001a"));
                if (a2 == null) break block8;
                object3 = a2.keySet();
                Object object4 = object2 = object3.iterator();
                while (object4.hasNext()) {
                    object = object2.next();
                    String string = object;
                    httpURLConnection.addRequestProperty(string, a2.get(string));
                    object4 = object2;
                }
            }
            HttpURLConnection httpURLConnection4 = httpURLConnection;
            httpURLConnection4.connect();
            object3 = httpURLConnection4.getOutputStream();
            ((OutputStream)object3).write(a.getBytes(HighlightPos.J(".8=ac")));
            object2 = httpURLConnection4.getInputStream();
            object = new BufferedReader(new InputStreamReader((InputStream)object2, ExEpSignException.J("W\u0000DY\u001a")));
            a2 = null;
            Object object5 = object;
            while ((a2 = ((BufferedReader)object5).readLine()) != null) {
                object5 = object;
                stringBuffer2.append((String)a2);
            }
            try {
                httpURLConnection.disconnect();
                stringBuffer = stringBuffer2;
            }
            catch (Exception a32) {
                log.error(a32.getMessage(), a32);
                stringBuffer = stringBuffer2;
                a32.printStackTrace();
            }
            return stringBuffer.toString();
        }
        return null;
    }

    public static void setTimeOut(int a) {
        TIMEOUT = a;
    }

    /*
     * WARNING - Removed back jump from a try to a catch block - possible behaviour change.
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static String doPostWithFormData(String a, Map<String, String> a22) throws IOException {
        Object object;
        Object object2;
        block26: {
            Object object3;
            block27: {
                String string;
                Object object4;
                HttpURLConnection httpURLConnection;
                block24: {
                    block25: {
                        StringBuilder stringBuilder;
                        HttpURLConnection httpURLConnection2 = httpURLConnection = (HttpURLConnection)new URL(a).openConnection();
                        httpURLConnection.setRequestMethod(HighlightPos.J("\u001c\u0014\u001f\u000f"));
                        httpURLConnection2.setDoOutput(true);
                        httpURLConnection2.setDoInput(true);
                        if (TIMEOUT > 0) {
                            HttpURLConnection httpURLConnection3 = httpURLConnection;
                            httpURLConnection3.setConnectTimeout(TIMEOUT);
                            httpURLConnection3.setReadTimeout(TIMEOUT);
                        }
                        HttpURLConnection httpURLConnection4 = httpURLConnection;
                        httpURLConnection4.setRequestProperty(ExEpSignException.J("7M\u001aV\u0011L\u0000\u000f [\u0004G"), HighlightPos.J("69782<:>/c=#)!v(:8:w{.495(:>\"qvava\f)9\u000728\u001d#)!\u0019#.\"?-)5l\u0001\u001ax\u0002\u001b#'\u000f>\u00019k+\f"));
                        object2 = httpURLConnection4.getOutputStream();
                        object3 = null;
                        try {
                            object4 = ExEpSignException.J("\u000fY\u000fYu\u0011@?K\u0000d\u001bP\u0019`\u001bW\u001aF\u0015P\r\u00159c@{#Z\u001fv\u0006x\u0001\u0012\u0013u");
                            string = HighlightPos.J("AQ");
                            stringBuilder = new StringBuilder();
                            a22 = a22.entrySet().iterator();
                            Iterator iterator = a22;
                            while (iterator.hasNext()) {
                                Map.Entry entry = a22.next();
                                StringBuilder stringBuilder2 = stringBuilder;
                                stringBuilder2.append(ExEpSignException.J("Y\u000f")).append((String)object4).append(string);
                                stringBuilder2.append(HighlightPos.J("\u000f4\"/)58v\b2?+#(%/%4\"al=#)!v(:8:w{\":!>qy")).append((String)entry.getKey()).append(ExEpSignException.J("\u0000")).append(string);
                                stringBuilder.append(HighlightPos.J("\u000f4\"/)58v\u0018\"<>v{8>4/c+ :%5w{/3-)?>8f")).append(StandardCharsets.UTF_8).append(string);
                                stringBuilder.append(string);
                                stringBuilder.append((String)entry.getValue()).append(string);
                                iterator = a22;
                            }
                        }
                        catch (Throwable throwable) {
                            try {
                                object3 = throwable;
                                throw object3;
                            }
                            catch (Throwable throwable2) {
                                Throwable throwable3;
                                if (object2 != null) {
                                    if (object3 != null) {
                                        try {
                                            ((OutputStream)object2).close();
                                            throwable3 = throwable2;
                                            throw throwable3;
                                        }
                                        catch (Throwable a22) {
                                            throwable3 = throwable2;
                                            ((Throwable)object3).addSuppressed(a22);
                                            throw throwable3;
                                        }
                                    }
                                    ((OutputStream)object2).close();
                                }
                                throwable3 = throwable2;
                                throw throwable3;
                            }
                        }
                        {
                            stringBuilder.append(ExEpSignException.J("Y\u000f")).append((String)object4).append(HighlightPos.J("av")).append(string);
                            ((OutputStream)object2).write(stringBuilder.toString().getBytes(StandardCharsets.UTF_8));
                            ((OutputStream)object2).flush();
                            if (object2 == null) break block24;
                            if (object3 == null) break block25;
                        }
                        try {
                            ((OutputStream)object2).close();
                        }
                        catch (Throwable throwable) {
                            ((Throwable)object3).addSuppressed(throwable);
                        }
                        break block24;
                    }
                    ((OutputStream)object2).close();
                }
                object2 = new StringBuilder();
                object3 = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
                object4 = null;
                try {
                    while ((string = ((BufferedReader)object3).readLine()) != null) {
                        ((StringBuilder)object2).append(string).append(ExEpSignException.J("("));
                    }
                    if (object3 == null) break block26;
                    if (object4 == null) break block27;
                }
                catch (Throwable throwable) {
                    try {
                        object4 = throwable;
                        throw object4;
                    }
                    catch (Throwable throwable4) {
                        Throwable throwable5;
                        if (object3 != null) {
                            if (object4 != null) {
                                try {
                                    ((BufferedReader)object3).close();
                                    throwable5 = throwable4;
                                    throw throwable5;
                                }
                                catch (Throwable a22) {
                                    throwable5 = throwable4;
                                    ((Throwable)object4).addSuppressed(a22);
                                    throw throwable5;
                                }
                            }
                            ((BufferedReader)object3).close();
                        }
                        throwable5 = throwable4;
                        throw throwable5;
                    }
                }
                try {
                    ((BufferedReader)object3).close();
                    object = object2;
                    return ((StringBuilder)object).toString();
                }
                catch (Throwable throwable) {
                    object = object2;
                    ((Throwable)object4).addSuppressed(throwable);
                    return ((StringBuilder)object).toString();
                }
            }
            ((BufferedReader)object3).close();
            object = object2;
            return ((StringBuilder)object).toString();
        }
        object = object2;
        return ((StringBuilder)object).toString();
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static byte[] doDownloadsmallFile(String a) {
        byte[] byArray;
        block8: {
            byArray = null;
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            HttpURLConnection httpURLConnection = null;
            try {
                int n;
                URL uRL = new URL(a);
                httpURLConnection = (HttpURLConnection)uRL.openConnection();
                httpURLConnection.connect();
                InputStream inputStream = httpURLConnection.getInputStream();
                byte[] byArray2 = new byte[10241024];
                InputStream inputStream2 = inputStream;
                while ((n = inputStream2.read(byArray2)) != -1) {
                    inputStream2 = inputStream;
                    byteArrayOutputStream.write(byArray2, 0, n);
                }
                ByteArrayOutputStream byteArrayOutputStream2 = byteArrayOutputStream;
                byArray = byteArrayOutputStream2.toByteArray();
                byteArrayOutputStream2.close();
                if (httpURLConnection != null) {
                    httpURLConnection.disconnect();
                    return byArray;
                }
            }
            catch (Exception exception) {
                log.error(exception.getMessage(), exception);
                exception.printStackTrace();
                return byArray;
            }
            finally {
                if (httpURLConnection == null) break block8;
                httpURLConnection.disconnect();
            }
        }
        return byArray;
    }

    public static String doPost(String a, String a22) {
        if (a != null && !"".equals(a)) {
            StringBuffer stringBuffer;
            StringBuffer stringBuffer2 = new StringBuffer();
            a22 = new URL((String)a22);
            HttpURLConnection httpURLConnection = (HttpURLConnection)((URL)a22).openConnection();
            if (TIMEOUT > 0) {
                HttpURLConnection httpURLConnection2 = httpURLConnection;
                httpURLConnection2.setConnectTimeout(TIMEOUT);
                httpURLConnection2.setReadTimeout(TIMEOUT);
            }
            HttpURLConnection httpURLConnection3 = httpURLConnection;
            HttpURLConnection httpURLConnection4 = httpURLConnection;
            HttpURLConnection httpURLConnection5 = httpURLConnection;
            httpURLConnection5.setDoOutput(true);
            httpURLConnection5.setDoInput(true);
            httpURLConnection4.setRequestMethod(HighlightPos.J("\u001c\u0014\u001f\u000f"));
            httpURLConnection3.setRequestProperty(ExEpSignException.J("7M\u001aV\u0011L\u0000\u000f [\u0004G"), HighlightPos.J("-+<7%8-/%4\"t&(#5w8$:>()/q\u000e\u0018\u001dac"));
            httpURLConnection4.connect();
            httpURLConnection3.getOutputStream().write(a.getBytes(ExEpSignException.J("W\u0000DY\u001a")));
            Closeable closeable = httpURLConnection3.getInputStream();
            closeable = new BufferedReader(new InputStreamReader((InputStream)closeable, HighlightPos.J(".8=ac")));
            String string = null;
            Closeable closeable2 = closeable;
            while ((string = ((BufferedReader)closeable2).readLine()) != null) {
                closeable2 = closeable;
                stringBuffer2.append(string);
            }
            try {
                httpURLConnection.disconnect();
                stringBuffer = stringBuffer2;
            }
            catch (Exception a22) {
                log.error(a22.getMessage(), a22);
                stringBuffer = stringBuffer2;
                a22.printStackTrace();
            }
            return stringBuffer.toString();
        }
        return null;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.utils;

import com.epoint.ofd.core.annotation.pageannot.AnnotType;
import com.epoint.ofd.core.basicStructure.doc.Document;
import com.epoint.ofd.core.basicType.ST_Box;
import com.epoint.ofd.font.FontName;
import com.epoint.ofd.layout.OFDDoc;
import com.epoint.ofd.layout.edit.Annotation;
import com.epoint.ofd.layout.element.canvas.FontSetting;
import com.epoint.ofd.reader.OFDReader;
import com.epoint.ofd.reader.ResourceLocator;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.dom4j.DocumentException;

public class OFDUtils {
    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public static void bytesToFile(byte[] buffer, String path) {
        File file = new File(path);
        FileOutputStream output = null;
        FilterOutputStream bufferedOutput = null;
        try {
            output = new FileOutputStream(file);
            bufferedOutput = new BufferedOutputStream(output);
            bufferedOutput.write(buffer);
        }
        catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            if (null != bufferedOutput) {
                try {
                    bufferedOutput.close();
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (null != output) {
                try {
                    ((OutputStream)output).close();
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public static byte[] fileToBytes(String filePath) {
        byte[] buffer = null;
        File file = new File(filePath);
        FileInputStream fis = null;
        ByteArrayOutputStream bos = null;
        try {
            int n;
            fis = new FileInputStream(file);
            bos = new ByteArrayOutputStream();
            byte[] b = new byte[1024];
            while ((n = fis.read(b)) != -1) {
                bos.write(b, 0, n);
            }
            buffer = bos.toByteArray();
            return buffer;
        }
        catch (FileNotFoundException ex) {
            ex.printStackTrace();
            return buffer;
        }
        catch (IOException ex) {
            ex.printStackTrace();
            return buffer;
        }
        finally {
            try {
                if (null != bos) {
                    bos.close();
                }
            }
            catch (IOException ex) {
                ex.printStackTrace();
            }
            finally {
                try {
                    if (null != fis) {
                        fis.close();
                    }
                }
                catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        }
    }

    public static String getSignedFileName(String FileName) {
        int indexend = FileName.lastIndexOf(".");
        FileName = FileName.substring(0, indexend) + "signed";
        FileName = FileName + ".ofd";
        return FileName;
    }

    public static String getFileFormat(String filepath) {
        int indexbegin = filepath.lastIndexOf(".");
        return filepath.substring(indexbegin + 1);
    }

    public static String getFileNamewithsuffix(String filepath) {
        filepath = filepath.replace("\\", "/");
        int indexbegin = filepath.lastIndexOf("/");
        int indexend = filepath.lastIndexOf(".");
        return filepath.substring(indexbegin + 1);
    }

    public static void addWatermark(String src, String out, String watermark) throws IOException {
        Path srcP = Paths.get(src, new String[0]);
        Path outP = Paths.get(out, new String[0]);
        try (OFDReader reader = new OFDReader(srcP);
             OFDDoc ofdDoc = new OFDDoc(reader, outP);){
            ResourceLocator rl = reader.getResourceLocator();
            Document ofdDocument = rl.get(reader.getOFDDir().getOfd().getDocBody().getDocRoot(), Document::new);
            int pages = ofdDocument.getPages().getSize();
            Double width = ofdDoc.getPageLayout().getWidth();
            Double height = ofdDoc.getPageLayout().getHeight();
            for (int p = 0; p < pages; ++p) {
                Annotation annotation = new Annotation(new ST_Box(0.0, 0.0, width, height), AnnotType.Watermark, ctx -> {
                    FontSetting setting = new FontSetting(8.0, FontName.SimSun.font());
                    ctx.setFillColor(170, 160, 165).setFont(setting).setGlobalAlpha(0.4);
                    for (int i = 0; i <= 2; ++i) {
                        for (int j = 0; j <= 2; ++j) {
                            ctx.save();
                            ctx.translate(100 * i, j * 100);
                            ctx.rotate(45.0);
                            ctx.fillText(watermark, 10.0, 10.0);
                            ctx.restore();
                        }
                    }
                });
                ofdDoc.addAnnotation(p + 1, annotation);
            }
        }
        catch (DocumentException e) {
            e.printStackTrace();
        }
    }
}


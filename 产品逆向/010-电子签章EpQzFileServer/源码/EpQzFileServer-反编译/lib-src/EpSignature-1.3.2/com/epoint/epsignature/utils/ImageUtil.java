/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.utils.SignUtil;
import com.epoint.gm.util.Base64Util;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import javax.imageio.ImageIO;

public class ImageUtil {
    public static String resizeImage(String a, int a22) throws Exception {
        byte[] byArray = Base64Util.decode(a);
        BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(byArray));
        int n = bufferedImage.getWidth();
        int n2 = bufferedImage.getHeight();
        if (n <= a22) {
            return a;
        }
        float f = a22;
        float a22 = (float)n2 / (float)n * (float)a22;
        return SignUtil.resizeImage(a, (int)f, (int)a22);
    }

    public ImageUtil() {
        ImageUtil a;
    }
}


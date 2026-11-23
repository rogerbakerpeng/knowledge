/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.utils;

import com.epoint.ztb.common.utils.StringUtils;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.text.NumberFormat;
import java.util.Set;

public class Convert {
    public static String toStr(Object value, String defaultValue) {
        if (null == value) {
            return defaultValue;
        }
        if (value instanceof String) {
            return (String)value;
        }
        return value.toString();
    }

    public static String toStr(Object value) {
        return Convert.toStr(value, null);
    }

    public static Character toChar(Object value, Character defaultValue) {
        if (null == value) {
            return defaultValue;
        }
        if (value instanceof Character) {
            return (Character)value;
        }
        String valueStr = Convert.toStr(value, null);
        return Character.valueOf(StringUtils.isEmpty(valueStr) ? defaultValue.charValue() : valueStr.charAt(0));
    }

    public static Character toChar(Object value) {
        return Convert.toChar(value, null);
    }

    public static Byte toByte(Object value, Byte defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof Byte) {
            return (Byte)value;
        }
        if (value instanceof Number) {
            return ((Number)value).byteValue();
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        try {
            return Byte.parseByte(valueStr);
        }
        catch (Exception e) {
            return defaultValue;
        }
    }

    public static Byte toByte(Object value) {
        return Convert.toByte(value, null);
    }

    public static Short toShort(Object value, Short defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof Short) {
            return (Short)value;
        }
        if (value instanceof Number) {
            return ((Number)value).shortValue();
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        try {
            return Short.parseShort(valueStr.trim());
        }
        catch (Exception e) {
            return defaultValue;
        }
    }

    public static Short toShort(Object value) {
        return Convert.toShort(value, null);
    }

    public static Number toNumber(Object value, Number defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof Number) {
            return (Number)value;
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        try {
            return NumberFormat.getInstance().parse(valueStr);
        }
        catch (Exception e) {
            return defaultValue;
        }
    }

    public static Number toNumber(Object value) {
        return Convert.toNumber(value, null);
    }

    public static Integer toInt(Object value, Integer defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof Integer) {
            return (Integer)value;
        }
        if (value instanceof Number) {
            return ((Number)value).intValue();
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        try {
            return Integer.parseInt(valueStr.trim());
        }
        catch (Exception e) {
            return defaultValue;
        }
    }

    public static Integer toInt(Object value) {
        return Convert.toInt(value, null);
    }

    public static Integer[] toIntArray(String str) {
        return Convert.toIntArray(",", str);
    }

    public static Long[] toLongArray(String str) {
        return Convert.toLongArray(",", str);
    }

    public static Integer[] toIntArray(String split, String str) {
        if (StringUtils.isEmpty(str)) {
            return new Integer[0];
        }
        String[] arr = str.split(split);
        Integer[] ints = new Integer[arr.length];
        for (int i = 0; i < arr.length; ++i) {
            Integer v;
            ints[i] = v = Convert.toInt(arr[i], 0);
        }
        return ints;
    }

    public static Long[] toLongArray(String split, String str) {
        if (StringUtils.isEmpty(str)) {
            return new Long[0];
        }
        String[] arr = str.split(split);
        Long[] longs = new Long[arr.length];
        for (int i = 0; i < arr.length; ++i) {
            Long v;
            longs[i] = v = Convert.toLong(arr[i], null);
        }
        return longs;
    }

    public static String[] toStrArray(String str) {
        return Convert.toStrArray(",", str);
    }

    public static String[] toStrArray(String split, String str) {
        return str.split(split);
    }

    public static Long toLong(Object value, Long defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof Long) {
            return (Long)value;
        }
        if (value instanceof Number) {
            return ((Number)value).longValue();
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        try {
            return new BigDecimal(valueStr.trim()).longValue();
        }
        catch (Exception e) {
            return defaultValue;
        }
    }

    public static Long toLong(Object value) {
        return Convert.toLong(value, null);
    }

    public static Double toDouble(Object value, Double defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof Double) {
            return (Double)value;
        }
        if (value instanceof Number) {
            return ((Number)value).doubleValue();
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        try {
            return new BigDecimal(valueStr.trim()).doubleValue();
        }
        catch (Exception e) {
            return defaultValue;
        }
    }

    public static Double toDouble(Object value) {
        return Convert.toDouble(value, null);
    }

    public static Float toFloat(Object value, Float defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof Float) {
            return (Float)value;
        }
        if (value instanceof Number) {
            return Float.valueOf(((Number)value).floatValue());
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        try {
            return Float.valueOf(Float.parseFloat(valueStr.trim()));
        }
        catch (Exception e) {
            return defaultValue;
        }
    }

    public static Float toFloat(Object value) {
        return Convert.toFloat(value, null);
    }

    public static Boolean toBool(Object value, Boolean defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof Boolean) {
            return (Boolean)value;
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        switch (valueStr = valueStr.trim().toLowerCase()) {
            case "true": {
                return true;
            }
            case "false": {
                return false;
            }
            case "yes": {
                return true;
            }
            case "ok": {
                return true;
            }
            case "no": {
                return false;
            }
            case "1": {
                return true;
            }
            case "0": {
                return false;
            }
        }
        return defaultValue;
    }

    public static Boolean toBool(Object value) {
        return Convert.toBool(value, null);
    }

    public static <E extends Enum<E>> E toEnum(Class<E> clazz, Object value, E defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (clazz.isAssignableFrom(value.getClass())) {
            Enum myE = (Enum)value;
            return (E)myE;
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        try {
            return Enum.valueOf(clazz, valueStr);
        }
        catch (Exception e) {
            return defaultValue;
        }
    }

    public static <E extends Enum<E>> E toEnum(Class<E> clazz, Object value) {
        return Convert.toEnum(clazz, value, null);
    }

    public static BigInteger toBigInteger(Object value, BigInteger defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof BigInteger) {
            return (BigInteger)value;
        }
        if (value instanceof Long) {
            return BigInteger.valueOf((Long)value);
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        try {
            return new BigInteger(valueStr);
        }
        catch (Exception e) {
            return defaultValue;
        }
    }

    public static BigInteger toBigInteger(Object value) {
        return Convert.toBigInteger(value, null);
    }

    public static BigDecimal toBigDecimal(Object value, BigDecimal defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        if (value instanceof BigDecimal) {
            return (BigDecimal)value;
        }
        if (value instanceof Long) {
            return new BigDecimal((Long)value);
        }
        if (value instanceof Double) {
            return new BigDecimal((Double)value);
        }
        if (value instanceof Integer) {
            return new BigDecimal((Integer)value);
        }
        String valueStr = Convert.toStr(value, null);
        if (StringUtils.isEmpty(valueStr)) {
            return defaultValue;
        }
        try {
            return new BigDecimal(valueStr);
        }
        catch (Exception e) {
            return defaultValue;
        }
    }

    public static BigDecimal toBigDecimal(Object value) {
        return Convert.toBigDecimal(value, null);
    }

    public static String utf8Str(Object obj) {
        return Convert.str(obj, Charset.forName("UTF-8"));
    }

    public static String str(Object obj, String charsetName) {
        return Convert.str(obj, Charset.forName(charsetName));
    }

    public static String str(Object obj, Charset charset) {
        if (null == obj) {
            return null;
        }
        if (obj instanceof String) {
            return (String)obj;
        }
        if (obj instanceof byte[] || obj instanceof Byte[]) {
            return Convert.str((Object)((Byte[])obj), charset);
        }
        if (obj instanceof ByteBuffer) {
            return Convert.str((ByteBuffer)obj, charset);
        }
        return obj.toString();
    }

    public static String str(byte[] bytes, String charset) {
        return Convert.str(bytes, StringUtils.isEmpty(charset) ? Charset.defaultCharset() : Charset.forName(charset));
    }

    public static String str(byte[] data, Charset charset) {
        if (data == null) {
            return null;
        }
        if (null == charset) {
            return new String(data);
        }
        return new String(data, charset);
    }

    public static String str(ByteBuffer data, String charset) {
        if (data == null) {
            return null;
        }
        return Convert.str(data, Charset.forName(charset));
    }

    public static String str(ByteBuffer data, Charset charset) {
        if (null == charset) {
            charset = Charset.defaultCharset();
        }
        return charset.decode(data).toString();
    }

    public static String toSBC(String input) {
        return Convert.toSBC(input, null);
    }

    public static String toSBC(String input, Set<Character> notConvertSet) {
        char[] c = input.toCharArray();
        for (int i = 0; i < c.length; ++i) {
            if (null != notConvertSet && notConvertSet.contains(Character.valueOf(c[i]))) continue;
            if (c[i] == ' ') {
                c[i] = 12288;
                continue;
            }
            if (c[i] >= '\u007f') continue;
            c[i] = (char)(c[i] + 65248);
        }
        return new String(c);
    }

    public static String toDBC(String input) {
        return Convert.toDBC(input, null);
    }

    public static String toDBC(String text, Set<Character> notConvertSet) {
        char[] c = text.toCharArray();
        for (int i = 0; i < c.length; ++i) {
            if (null != notConvertSet && notConvertSet.contains(Character.valueOf(c[i]))) continue;
            if (c[i] == '\u3000') {
                c[i] = 32;
                continue;
            }
            if (c[i] <= '\uff00' || c[i] >= '\uff5f') continue;
            c[i] = (char)(c[i] - 65248);
        }
        String returnString = new String(c);
        return returnString;
    }

    public static String digitUppercase(double n) {
        String[] fraction = new String[]{"\u89d2", "\u5206"};
        String[] digit = new String[]{"\u96f6", "\u58f9", "\u8d30", "\u53c1", "\u8086", "\u4f0d", "\u9646", "\u67d2", "\u634c", "\u7396"};
        String[][] unit = new String[][]{{"\u5143", "\u4e07", "\u4ebf"}, {"", "\u62fe", "\u4f70", "\u4edf"}};
        String head = n < 0.0 ? "\u8d1f" : "";
        n = Math.abs(n);
        String s = "";
        for (int i = 0; i < fraction.length; ++i) {
            s = s + (digit[(int)(Math.floor(n * 10.0 * Math.pow(10.0, i)) % 10.0)] + fraction[i]).replaceAll("(\u96f6.)+", "");
        }
        if (s.length() < 1) {
            s = "\u6574";
        }
        int integerPart = (int)Math.floor(n);
        for (int i = 0; i < unit[0].length && integerPart > 0; ++i) {
            String p = "";
            for (int j = 0; j < unit[1].length && n > 0.0; ++j) {
                p = digit[integerPart % 10] + unit[1][j] + p;
                integerPart /= 10;
            }
            s = p.replaceAll("(\u96f6.)*\u96f6$", "").replaceAll("^$", "\u96f6") + unit[0][i] + s;
        }
        return head + s.replaceAll("(\u96f6.)*\u96f6\u5143", "\u5143").replaceFirst("(\u96f6.)+", "").replaceAll("(\u96f6.)+", "\u96f6").replaceAll("^\u6574$", "\u96f6\u5143\u6574");
    }
}


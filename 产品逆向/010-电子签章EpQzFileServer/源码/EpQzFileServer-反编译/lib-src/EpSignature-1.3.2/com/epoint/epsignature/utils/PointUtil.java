/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.utils.D;
import java.util.ArrayList;

public class PointUtil {
    public PointUtil() {
        PointUtil a;
    }

    /*
     * Enabled aggressive block sorting
     */
    public static String getRandomPoint(double a, double a22) {
        ArrayList<D> arrayList;
        int n;
        int n2;
        D d = new D();
        double d2 = a;
        double d3 = a22;
        int n3 = (int)Math.floor(Math.random() * 5.0);
        switch (n3) {
            case 0: {
                D d4;
                d.A = 0.0;
                d.b = Math.random() * (a22 + 1.0E-12);
                if (!(d4.b > a22)) break;
                d.b = a22;
                break;
            }
            case 1: {
                D d5;
                d.A = a;
                d.b = Math.random() * (a22 + 1.0E-12);
                if (!(d5.b > a22)) break;
                d.b = a22;
                break;
            }
            case 2: {
                D d6;
                d.b = 0.0;
                d.A = Math.random() * (a + 1.0E-12);
                if (!(d6.b > a22)) break;
                d.b = a22;
                break;
            }
            case 3: {
                D d7;
                d.b = a22;
                d.A = Math.random() * (a + 1.0E-12);
                if (!(d7.b > a22)) break;
                d.b = a22;
                break;
            }
        }
        D d8 = new D(a / 2.0, a22 / 2.0);
        D d9 = new D();
        double d10 = Math.toRadians(-30.0);
        D d11 = d9;
        d11.A = (d.A - d8.A) * Math.cos(d10) - (d.b - d8.b) * Math.sin(d10) + d8.A;
        d11.b = (d.A - d8.A) * Math.sin(d10) + (d.b - d8.b) * Math.cos(d10) + d8.b;
        D[] dArray = new D[4];
        int n4 = n2 = 0;
        while (n4 < 4) {
            dArray[n2++] = new D();
            n4 = n2;
        }
        dArray[0].A = 0.0;
        dArray[0].b = (dArray[0].A - d8.A) / (d9.A - d8.A) * (d9.b - d8.b) + d8.b;
        dArray[1].A = a;
        dArray[1].b = (dArray[1].A - d8.A) / (d9.A - d8.A) * (d9.b - d8.b) + d8.b;
        dArray[2].b = 0.0;
        dArray[2].A = (dArray[2].b - d8.b) / (d9.b - d8.b) * (d9.A - d8.A) + d8.A;
        dArray[3].b = a22;
        dArray[3].A = (dArray[3].b - d8.b) / (d9.b - d8.b) * (d9.A - d8.A) + d8.A;
        D[] dArray2 = dArray;
        int n5 = dArray.length;
        int n6 = n = 0;
        while (n6 < n5) {
            D d12;
            D a22 = dArray2[n];
            if (d12.A <= d2 && a22.A >= 0.0) {
                if (a22.b <= d3 && a22.b >= 0.0) {
                    a22.G = a22.J(d9);
                    a22.a = true;
                } else {
                    a22.a = false;
                }
            } else {
                a22.a = false;
            }
            n6 = ++n;
        }
        D d13 = null;
        int n7 = n5 = 0;
        while (n7 < dArray.length) {
            if (dArray[n5].a && d13 == null) {
                d13 = dArray[n5];
            }
            if (dArray[n5].a && dArray[n5].G < d13.G) {
                d13 = dArray[n5];
            }
            n7 = ++n5;
        }
        ArrayList<D> a22 = new ArrayList<D>();
        switch (n3) {
            case 0: {
                a22.add(d);
                a22.add(new D(0.0, 0.0));
                a22.add(new D(d2, 0.0));
                a22.add(new D(d2, d3));
                if (d.A == d13.A) {
                    a22.add(new D(0.0, d3));
                }
                ArrayList<D> arrayList2 = a22;
                arrayList = arrayList2;
                arrayList2.add(d13);
                return ((Object)arrayList).toString();
            }
            case 1: {
                a22.add(d);
                a22.add(new D(d2, d3));
                a22.add(new D(0.0, d3));
                a22.add(new D(0.0, 0.0));
                if (d.A == d13.A) {
                    a22.add(new D(d2, 0.0));
                }
                ArrayList<D> arrayList3 = a22;
                arrayList = arrayList3;
                arrayList3.add(d13);
                return ((Object)arrayList).toString();
            }
            case 2: {
                a22.add(d);
                a22.add(new D(d2, 0.0));
                a22.add(new D(d2, d3));
                a22.add(new D(0.0, d3));
                if (d.b == d13.b) {
                    a22.add(new D(0.0, 0.0));
                }
                ArrayList<D> arrayList4 = a22;
                arrayList = arrayList4;
                arrayList4.add(d13);
                return ((Object)arrayList).toString();
            }
            case 3: {
                a22.add(d);
                a22.add(new D(0.0, d3));
                a22.add(new D(0.0, 0.0));
                a22.add(new D(d2, 0.0));
                if (d.b == d13.b) {
                    a22.add(new D(d2, d3));
                }
                ArrayList<D> arrayList5 = a22;
                arrayList = arrayList5;
                arrayList5.add(d13);
                return ((Object)arrayList).toString();
            }
        }
        arrayList = a22;
        return ((Object)arrayList).toString();
    }
}


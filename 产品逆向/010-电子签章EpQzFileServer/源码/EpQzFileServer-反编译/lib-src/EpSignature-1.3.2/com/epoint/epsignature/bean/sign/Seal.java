/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.bean.sign;

public class Seal {
    private String sealimg;
    private String sealguid;
    private String sealname;
    private String code_img;
    private int sealtype;
    private String sealdata;

    public String getSealimg() {
        Seal a;
        return a.sealimg;
    }

    public void setSealtype(int a) {
        a.sealtype = a;
    }

    public String getSealname() {
        Seal a;
        return a.sealname;
    }

    public void setSealdata(String a) {
        a.sealdata = a;
    }

    public int getSealtype() {
        Seal a;
        return a.sealtype;
    }

    public String getSealguid() {
        Seal a;
        return a.sealguid;
    }

    public Seal(String a, String a2, String a3, String a4, String a5) {
        Seal a6;
        Seal seal = a6;
        Seal seal2 = a6;
        a6.sealname = a;
        seal2.sealguid = a2;
        seal2.sealdata = a3;
        seal.sealimg = a4;
        seal.code_img = a5;
    }

    public String getSealdata() {
        Seal a;
        return a.sealdata;
    }

    public void setSealguid(String a) {
        a.sealguid = a;
    }

    public void setSealimg(String a) {
        a.sealimg = a;
    }

    public void setSealname(String a) {
        a.sealname = a;
    }

    public Seal() {
        Seal a;
    }

    public Seal(String a, String a2) {
        Seal a3;
        Seal seal = a3;
        seal.sealname = a;
        seal.sealimg = a2;
    }

    public String getCode_img() {
        Seal a;
        return a.code_img;
    }

    public void setCode_img(String a) {
        a.code_img = a;
    }
}


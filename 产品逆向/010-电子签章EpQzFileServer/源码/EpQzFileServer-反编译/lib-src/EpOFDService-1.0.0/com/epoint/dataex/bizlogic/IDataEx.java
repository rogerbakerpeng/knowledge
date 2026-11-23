/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.dataex.bizlogic;

import com.alibaba.fastjson.JSONObject;

public interface IDataEx {
    public String filetransfer(JSONObject var1);

    public String datatransfer(JSONObject var1);

    public String datamonitor(JSONObject var1);

    public String handleData(JSONObject var1);

    public String docking(JSONObject var1);
}


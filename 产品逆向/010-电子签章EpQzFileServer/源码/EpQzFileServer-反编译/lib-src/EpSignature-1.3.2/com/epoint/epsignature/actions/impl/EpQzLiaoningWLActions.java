/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.utils.ConfigUtil;
import com.epoint.epsignature.utils.HttpUtil;
import com.epoint.epsignature.utils.JSONUtils;
import com.epoint.epsignature.utils.StringUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;

public class EpQzLiaoningWLActions
extends BaseActions {
    private String LiaoningWL_URL = ConfigUtil.getConfigValue("ztb", "LiaoningWL_URL");
    private static Logger log = Logger.getLogger(EpQzLiaoningWLActions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        HashMap<String, Object> map;
        String req = JSONUtils.bean2json(basereq.getRequest());
        Map reqObj = JSONUtils.json2bean(req, Map.class);
        HashMap reqmap = new HashMap();
        reqmap.put("caType", reqObj.get("caType"));
        reqmap.put("jzh", reqObj.get("jzh"));
        String resp = HttpUtil.doPost(JSONUtils.bean2json(reqmap), this.LiaoningWL_URL + "/api/zsqz/getQzMt");
        if (StringUtil.isBlank(resp)) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.LiaoningWL_URL + "/api/zsqz/getQzMt");
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            throw new RuntimeException("\u83b7\u53d6\u56fe\u7247\u4fe1\u606f\u4e3a\u7a7a\uff01");
        }
        JSONObject jsonObject = JSONObject.parseObject(resp);
        if (!"200".equals(jsonObject.getString("code"))) {
            log.error("\u8bf7\u6c42\u5730\u5740\uff1a" + this.LiaoningWL_URL + "/api/zsqz/getQzMt");
            log.error("\u8bf7\u6c42\u53c2\u6570\uff1a" + JSONUtils.bean2json(reqmap));
            log.error("\u8fd4\u56de\u53c2\u6570\uff1a" + resp);
            throw new RuntimeException("\u83b7\u53d6\u56fe\u7247\u4fe1\u606f\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\uff1a" + jsonObject.getString("msg"));
        }
        ArrayList seals = new ArrayList();
        if (StringUtil.isNotBlank(jsonObject.getJSONObject("data").getString("grqz"))) {
            map = new HashMap<String, Object>();
            map.put("sealname", "\u4e2a\u4eba\u7b7e\u7ae0");
            map.put("sealimg", jsonObject.getJSONObject("data").getString("grqz"));
            map.put("signcert", jsonObject.getJSONObject("data").getString("qmzs"));
            map.put("sealtype", 4);
            seals.add(map);
        }
        if (StringUtil.isNotBlank(jsonObject.getJSONObject("data").getString("qygz"))) {
            map = new HashMap();
            map.put("sealname", "\u4f01\u4e1a\u516c\u7ae0");
            map.put("sealimg", jsonObject.getJSONObject("data").getString("qygz"));
            map.put("signcert", jsonObject.getJSONObject("data").getString("qmzs"));
            map.put("sealtype", 1);
            seals.add(map);
        }
        if (StringUtil.isNotBlank(jsonObject.getJSONObject("data").getString("frqz"))) {
            map = new HashMap();
            map.put("sealname", "\u6cd5\u4eba\u7b7e\u7ae0");
            map.put("sealimg", jsonObject.getJSONObject("data").getString("frqz"));
            map.put("signcert", jsonObject.getJSONObject("data").getString("qmzs"));
            map.put("sealtype", 3);
            seals.add(map);
        }
        if (StringUtil.isNotBlank(jsonObject.getJSONObject("data").getString("zjsqm"))) {
            map = new HashMap();
            map.put("sealname", "\u9020\u4ef7\u5e08\u7b7e\u540d");
            map.put("sealimg", jsonObject.getJSONObject("data").getString("zjsqm"));
            map.put("signcert", jsonObject.getJSONObject("data").getString("qmzs"));
            map.put("sealtype", 4);
            seals.add(map);
        }
        if (StringUtil.isNotBlank(jsonObject.getJSONObject("data").getString("zjsgz"))) {
            map = new HashMap();
            map.put("sealname", "\u9020\u4ef7\u5e08\u7b7e\u7ae0");
            map.put("sealimg", jsonObject.getJSONObject("data").getString("zjsgz"));
            map.put("signcert", jsonObject.getJSONObject("data").getString("qmzs"));
            map.put("sealtype", 4);
            seals.add(map);
        }
        return this.success(seals);
    }
}


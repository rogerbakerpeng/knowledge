/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.actions.impl;

import com.epoint.epsignature.actions.BaseActions;
import com.epoint.epsignature.actions.impl.MCertActions;
import com.epoint.epsignature.bean.BaseReq;
import com.epoint.epsignature.bean.BaseResp;
import com.epoint.epsignature.bean.sign.Seal;
import com.epoint.epsignature.service.MCert391Service;
import com.epoint.epsignature.service.MCertService;
import com.epoint.epsignature.utils.JSONUtils;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

public class MCert391Actions
extends BaseActions {
    private MCert391Service mcertservice;
    private static Logger logger = Logger.getLogger(MCert391Actions.class);

    @Override
    public void init(Map<String, Object> actionContext) throws Exception {
        MCertService mcertservice_ = (MCertService)actionContext.get("MCertService");
        if (mcertservice_ == null) {
            throw new RuntimeException("MCertActions \u521d\u59cb\u5316\u5931\u8d25\uff0c\u672a\u627e\u5230\u5b9e\u73b0\u7684MCertService");
        }
        this.mcertservice = new MCert391Service(mcertservice_.getMcertUrl(), mcertservice_.getCurPlatFormCode(), mcertservice_.getTokenSecret());
        if (mcertservice_.getTokenMaker() != null) {
            this.mcertservice.setTokenMaker(mcertservice_.getTokenMaker());
        }
    }

    public BaseResp createQR(BaseReq basereq) throws Exception {
        return this.success(this.mcertservice.creatQR(basereq.getRequest()));
    }

    public BaseResp queryQRresult(BaseReq basereq) throws Exception {
        return this.success(this.mcertservice.queryQRresult((String)basereq.getRequest()));
    }

    public BaseResp verifySign(BaseReq basereq) throws Exception {
        return new MCertActions().verifySign(basereq);
    }

    public BaseResp getSealImg(BaseReq basereq) throws Exception {
        List<Seal> seals = this.mcertservice.getSealImg(JSONUtils.bean2json(basereq.getRequest()));
        return this.success(seals);
    }

    public BaseResp uploadSignatureOriginalText(BaseReq basereq) throws Exception {
        String tid = this.mcertservice.uploadSignatureOriginalText(JSONUtils.bean2json(basereq.getRequest()));
        return this.success(tid);
    }

    public BaseResp getOriginalTextSignatureValue(BaseReq basereq) throws Exception {
        String data = this.mcertservice.getOriginalTextSignatureValue(JSONUtils.bean2json(basereq.getRequest()));
        return this.success(data);
    }

    public BaseResp getAppOperateStatus(BaseReq basereq) throws Exception {
        String data = this.mcertservice.getAppOperateStatus(JSONUtils.bean2json(basereq.getRequest()));
        return this.success(data);
    }

    public BaseResp parseCert(BaseReq basereq) throws Exception {
        return new MCertActions().parseCert(basereq);
    }
}


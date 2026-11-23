/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.dataex.bizlogic;

import com.alibaba.fastjson.JSONObject;
import com.epoint.dataex.bizlogic.CheckParam;
import com.epoint.dataex.bizlogic.DataWrite;
import com.epoint.dataex.bizlogic.IDataEx;
import com.epoint.dataex.record.DataRecorder;
import com.epoint.dataex.record.DataRecovery;
import com.epoint.gm.util.Base64Util;
import com.epoint.gmhelper.util.StringUtil;
import com.epoint.ztb.common.config.OfdConfig;
import com.epoint.ztb.common.utils.OFDUtils;
import com.epoint.ztb.web.domain.AjaxResult;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DataExImpl
implements IDataEx {
    private static final Logger log = LoggerFactory.getLogger(DataExImpl.class);
    private JSONObject jo = null;

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    @Override
    public String filetransfer(JSONObject requestBody) {
        DataRecovery offsetrv = null;
        DataRecorder offsetrd = null;
        try {
            String filePath;
            String requesttime = requestBody.getString("requesttime");
            String fileid = requestBody.getString("fileid");
            String content = requestBody.getString("content");
            String filename = requestBody.getString("filename");
            String strPos = requestBody.getString("pos");
            String strFilelen = requestBody.getString("filelen");
            String checkParamResult = new CheckParam().checkParam(requesttime, fileid, filename, strFilelen, strPos);
            if (StringUtil.isNotBlank(checkParamResult)) {
                String string = AjaxResult.error("\u4e0a\u4f20\u5931\u8d25", checkParamResult).toString();
                return string;
            }
            int pos = Integer.parseInt(strPos);
            int filelen = Integer.parseInt(strFilelen);
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
            requesttime = df.format(new Date());
            String directoryPath = OfdConfig.getTempfilepath() + File.separator + requesttime.substring(0, 8) + File.separator;
            File file = new File(directoryPath);
            if (!file.exists()) {
                file.mkdirs();
            }
            if (!(file = new File(filePath = directoryPath + fileid + "." + OFDUtils.getFileFormat(filename))).exists()) {
                file.createNewFile();
            }
            offsetrd = new DataRecorder(directoryPath);
            offsetrv = new DataRecovery(offsetrd);
            long uploaded = offsetrv.getOffsetFromRecord(fileid);
            byte[] buffer = Base64Util.decode(content);
            long bl = buffer.length;
            if ((long)pos + bl < uploaded) {
                String string = AjaxResult.success("\u4e0a\u4f20\u6210\u529f").toString();
                return string;
            }
            DataWrite dw = new DataWrite();
            long offset = pos;
            dw.writeDataToFile(offset, file, buffer);
            uploaded = (long)pos + bl;
            offsetrv.offsetRecord(uploaded, fileid);
            if ((long)filelen == file.length() && uploaded == (long)filelen) {
                offsetrv.delRecord(fileid);
                String string = AjaxResult.success("\u4e0a\u4f20\u5b8c\u6210").toString();
                return string;
            }
        }
        catch (IOException e) {
            log.error("\u4f20\u8f93\u5f02\u5e38", e);
            String string = AjaxResult.error("\u4e0a\u4f20\u5931\u8d25", e.getMessage()).toString();
            return string;
        }
        finally {
            log.debug("\u5173\u95ed\u8fde\u63a5\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01\uff01");
        }
        return AjaxResult.success("\u4e0a\u4f20\u6210\u529f").toString();
    }

    @Override
    public String datatransfer(JSONObject jo) {
        return null;
    }

    @Override
    public String datamonitor(JSONObject request) {
        return "";
    }

    @Override
    public String handleData(JSONObject jo) {
        return null;
    }

    @Override
    public String docking(JSONObject jo) {
        return null;
    }

    public DataExImpl() {
    }

    public DataExImpl(JSONObject jo) {
        this.jo = jo;
    }

    public JSONObject getJo() {
        return this.jo;
    }

    public void setJo(JSONObject jo) {
        this.jo = jo;
    }
}


/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.cloudsign.controller;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epqz.cloudsign.model.DownloadFileRequest;
import com.epoint.epqz.cloudsign.model.SignFileRequest;
import com.epoint.epqz.cloudsign.model.UploadFileRequest;
import com.epoint.epqz.cloudsign.service.CloudSignService;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value={"/cloudsign/v1"})
public class CloudSignController {
    private final CloudSignService cloudSignService;

    public CloudSignController(CloudSignService cloudSignService) {
        this.cloudSignService = cloudSignService;
    }

    @RequestMapping(value={"/uploadfile"}, method={RequestMethod.POST})
    public String uploadFile(@RequestBody String params) {
        UploadFileRequest request = JSONObject.parseObject(params, UploadFileRequest.class);
        return this.cloudSignService.uploadFile(request);
    }

    @RequestMapping(value={"/signfile"}, method={RequestMethod.POST})
    public String signFile(@RequestBody String params) {
        SignFileRequest request = JSONObject.parseObject(params, SignFileRequest.class);
        return this.cloudSignService.signFile(request);
    }

    @RequestMapping(value={"/downloadfile"}, method={RequestMethod.GET})
    public String downloadFile(String fileid, String filename, String token, HttpServletResponse response) {
        DownloadFileRequest request = new DownloadFileRequest();
        request.setFileid(fileid);
        request.setFilename(filename);
        request.setToken(token);
        request.setResponse(response);
        return this.cloudSignService.downloadFile(request);
    }
}


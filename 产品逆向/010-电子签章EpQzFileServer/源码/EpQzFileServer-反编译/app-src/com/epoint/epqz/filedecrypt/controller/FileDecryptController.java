/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epqz.filedecrypt.controller;

import com.alibaba.fastjson.JSONObject;
import com.epoint.epqz.filedecrypt.model.DecryptRequest;
import com.epoint.epqz.filedecrypt.model.QueryResultRequest;
import com.epoint.epqz.filedecrypt.service.FileDecryptService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value={"/filedecrypt"})
public class FileDecryptController {
    private final FileDecryptService ALLATORIxDEMO;

    public static String ALLATORIxDEMO(String string) {
        String string2 = string;
        int n = --4;
        int n2 = string2.length();
        int a = n2 - (3 >> 1);
        char[] cArray = new char[n2];
        int n3 = --3;
        int cfr_ignored_0 = (1 ^ 3 ^ --5) << --4 ^ --5;
        int n4 = a;
        int n5 = n << n ^ (--3 << (1 ^ 3) ^ (4 ^ 5));
        while (n4 >= 0) {
            int n6 = a--;
            cArray[n6] = (char)(string2.charAt(n6) ^ n5);
            if (a < 0) break;
            int n7 = a--;
            cArray[n7] = (char)(string2.charAt(n7) ^ n3);
            n4 = a;
        }
        return new String(cArray);
    }

    public FileDecryptController(FileDecryptService fileDecryptService) {
        FileDecryptService a = fileDecryptService;
        FileDecryptController a2 = this;
        a2.ALLATORIxDEMO = a;
    }

    @RequestMapping(value={"/queryresult"}, method={RequestMethod.POST})
    public String queryResult(@RequestBody String string) {
        FileDecryptController fileDecryptController = object;
        Object object = string;
        FileDecryptController a = fileDecryptController;
        object = JSONObject.parseObject((String)object, QueryResultRequest.class);
        return a.ALLATORIxDEMO.queryResult((QueryResultRequest)object);
    }

    @RequestMapping(value={"/decrypt"}, method={RequestMethod.POST})
    public String decrypt(@RequestBody String string) {
        FileDecryptController fileDecryptController = object;
        Object object = string;
        FileDecryptController a = fileDecryptController;
        object = JSONObject.parseObject((String)object, DecryptRequest.class);
        return a.ALLATORIxDEMO.decrypt((DecryptRequest)object);
    }
}


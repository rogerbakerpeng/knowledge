/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.eppdfshow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages={"com.epoint"})
public class EppdfshowApplication {
    public static void main(String[] args) {
        SpringApplication.run(EppdfshowApplication.class, args);
    }
}


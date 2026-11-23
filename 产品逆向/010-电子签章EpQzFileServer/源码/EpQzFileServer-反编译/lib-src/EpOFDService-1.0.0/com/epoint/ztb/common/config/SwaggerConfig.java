/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.common.config;

import io.swagger.annotations.Api;
import java.util.ArrayList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket createRestApi() {
        ArrayList responseMessageList = new ArrayList();
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(this.apiInfo()).select().apis(RequestHandlerSelectors.withClassAnnotation(Api.class)).paths(PathSelectors.any()).build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("EpOFDService").description("\u63d0\u4f9b\u901a\u7528\u7684OFD\u64cd\u4f5c\u80fd\u529b\u7684rest\u63a5\u53e3").contact(new Contact("daiwf", "", "daiwf@epoint.com.cn")).version("1.0.0").build();
    }
}


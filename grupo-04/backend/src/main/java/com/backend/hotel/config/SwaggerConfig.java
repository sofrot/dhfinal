package com.backend.hotel.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket apiDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .globalOperationParameters(Arrays.asList(
                        new ParameterBuilder().
                                name("Authorization")
                                .description("Authentication token").modelRef(new ModelRef("string"))
                                .parameterType("header")
                                .required(false)
                                .build()
                ))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.backend.hotel.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(getApiInfo())
                ;
    }

    private ApiInfo getApiInfo() {
        return new ApiInfo(
                "Digital Booking",
                "Digital Booking API Description",
                "1.0",
                "http://digitalBooking.com/terms",
                new Contact("Alexis", "https://grupo4.com", "apis@gmail.com"),
                "LICENSE",
                "LICENSE URL",
                Collections.emptyList()
        );
    }
}

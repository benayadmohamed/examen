package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GetewayServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GetewayServiceApplication.class, args);
    }

  /*  @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("path_route", r -> r.path("/user/*")
                        .uri("lb://security-service"))*//*
                .route(r -> r.path("/user/**")
                        .filters(f -> f.rewritePath("/user/(?.*)", "/${remains}")
                                .hystrix(c -> c.setName("hystrix")
                                        .setFallbackUri("forward:/fallback/second")))
                        .uri("lb://security-service/")
                        .id("second-service"))*//*
                .build();
    }*/
}

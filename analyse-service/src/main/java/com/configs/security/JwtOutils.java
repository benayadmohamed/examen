package com.configs.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import static com.configs.security.SecurityConstants.TOKEN_PREFIX;

@Component
public class JwtOutils {
    @Value("${springbootwebfluxjjwt.jjwt.secret}")
    private String secret;
    @Value("${springbootwebfluxjjwt.jjwt.expiration}")
    private long expiration;


    public DecodedJWT verify(String token) throws JWTVerificationException {
        return JWT.require(
//                Algorithm.RSA512(new )
                Algorithm.HMAC512(secret.getBytes())
        )
                .build()
                .verify(token.replace(TOKEN_PREFIX, ""));
    }
}

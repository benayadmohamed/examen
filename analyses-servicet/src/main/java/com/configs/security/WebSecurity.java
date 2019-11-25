package com.configs.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private MyBCryptPasswordEncoder myBCryptPasswordEncoder;
    private final JwtOutils jwtOutils;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    public WebSecurity(MyBCryptPasswordEncoder myBCryptPasswordEncoder, JwtOutils jwtOutils, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
        this.myBCryptPasswordEncoder = myBCryptPasswordEncoder;
        this.jwtOutils = jwtOutils;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/clients").hasAuthority("EDIT_CLIENT")
                .antMatchers(HttpMethod.PUT, "/clients").hasAuthority("EDIT_CLIENT")
                .antMatchers(HttpMethod.GET, "/clients").hasAuthority("READ_CLIENT")
                .antMatchers(HttpMethod.GET, "/clients/{\\d+}").hasAuthority("READ_CLIENT")
                .antMatchers(HttpMethod.DELETE, "/clients/{\\d+}").hasAuthority("DELETE_CLIENT")

                .antMatchers(HttpMethod.POST, "/categories").hasAuthority("EDIT_CATEGORY")
                .antMatchers(HttpMethod.PUT, "/categories").hasAuthority("EDIT_CATEGORY")
                .antMatchers(HttpMethod.GET, "/categories").hasAuthority("READ_CATEGORY")
                .antMatchers(HttpMethod.GET, "/categories/{\\d+}").hasAuthority("READ_CATEGORY")
                .antMatchers(HttpMethod.DELETE, "/categories/{\\d+}").hasAuthority("DELETE_CATEGORY")
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                // utliser pour verifier le token et extraitre les premissions
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), jwtOutils))
                // this disables session creation on Spring Security
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedMethod(HttpMethod.DELETE);
        configuration.addAllowedMethod(HttpMethod.POST);
        configuration.addAllowedMethod(HttpMethod.PUT);
        configuration.addAllowedMethod(HttpMethod.GET);
        configuration.addAllowedHeader("*");
        configuration.addAllowedOrigin("*");
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

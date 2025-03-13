package com.banking.system.Accounts.Security;

import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtutil;
    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain Chain) throws ServletException, IOException {
        log.info("-----into doFilterInternalMethod of JwtFilter class-----");
        log.info("-----taking auth header from request");
        String authHeader= request.getHeader("Authorization");
        log.info("-----checking authHeader is null or not----->{}", authHeader);
        if(authHeader!=null && authHeader.startsWith("Bearer ")) {
            log.info("-----checked authHeader its not null and started with bearer -----");
            String token = authHeader.substring(7);
            log.info("-----token we got from authHeader----->"+token);
            String username= jwtutil.extractUsername(token);
            User user=userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("user not found"));
            log.info("-----username we got from passing token from dofilterinternal method to jwtUtil----->"+username);
            UserDetails userDetails=org.springframework.security.core.userdetails.User
                    .withUsername(username)
                    .password("")
                    .roles(user.getRole().name())
                    .build();
            UsernamePasswordAuthenticationToken authentication =new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        Chain.doFilter(request,response);
    }
}

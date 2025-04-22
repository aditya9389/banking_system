package com.banking.system.Accounts.Security;

import com.banking.system.Accounts.Model.User;
import com.banking.system.Accounts.Repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtutil;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        log.info("----- Into doFilterInternalMethod of JwtFilter -----");

        String authHeader = request.getHeader("Authorization");
        log.info("Received Authorization header: {}", authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("No valid Authorization header found, proceeding without authentication.");
            chain.doFilter(request, response);
            return;
        }

        try {
            String token = authHeader.substring(7);
            log.info("Extracted JWT Token: {}", token);

            String username = jwtutil.extractUsername(token);
            log.info("Extracted Username from Token: {}", username);

            Optional<User> userOptional = userRepository.findByUsername(username);
            if (userOptional.isEmpty()) {
                log.warn("User not found for username: {}", username);
                chain.doFilter(request, response);
                return;
            }

            User user = userOptional.get();
            UserDetails userDetails = org.springframework.security.core.userdetails.User
                    .withUsername(username)
                    .password("")
                    .roles(user.getRole().name())
                    .build();

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.info("Successfully authenticated user: {}", username);

        } catch (Exception e) {
            log.error("JWT authentication failed: {}", e.getMessage());
        }

        log.info("Proceeding with request filter chain.");
        chain.doFilter(request, response);
    }
}

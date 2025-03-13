package com.banking.system.Accounts.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "ThisIsASecretKeyForJWTGenerationMustBeLongEnough";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;

    public String generateToken(String username,String roles) {
        System.out.println("------------generating token in generateToken method of Jwtutil----------");
        Map<String,Object> claims=new HashMap<>();
        claims.put("role",roles);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token, String username) {
        System.out.println("------------validating token in validateToken method of Jwt Util----------");
        String tokenUsername = extractUsername(token);
        return (username.equals(tokenUsername) && !isTokenExpired(token));
    }

    private Key getSigningKey() {
        System.out.println("------------return secreat key through getSigningKey method of Jwt Util----------");
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String extractUsername(String token) {
        System.out.println("------------Extracting username by token from extractUsername method of Jwt Util----------");
        String tempUsername=Jwts.parserBuilder().setSigningKey(getSigningKey()).build()
                .parseClaimsJws(token).getBody().getSubject();
        System.out.println("jwtUtil giving this username: "+tempUsername);
        return tempUsername;
    }

    private boolean isTokenExpired(String token) {
        System.out.println("------------checking if isTokenExpired by isTokenExpired method of Jwt Util----------");
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        System.out.println("------------extractExpiration method is called by isTokenExpired to return date----------");
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build()
                .parseClaimsJws(token).getBody().getExpiration();
    }


}

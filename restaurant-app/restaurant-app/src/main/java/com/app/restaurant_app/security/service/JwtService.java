package com.app.restaurant_app.security.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.app.restaurant_app.common.model.AppUser;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

@Service
public class JwtService {

	@Value("${jwt.secret}")
	private String secret;

    // Generate token
    public String generateToken(AppUser user) {
        return Jwts.builder()
                .setSubject(user.getEmail())  // can be ID if preferred
                .claim("role", user.getRole().name()) // optionally include role
                .claim("id", user.getId())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hrs
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // Extract username/email from token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Validate token
    public boolean isTokenValid(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    // Helper: Check token expiry
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Helper: Get expiry date
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Generic claim extractor
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    	Claims claims = Jwts.parserBuilder()
    		    .setSigningKey(getSigningKey())
    		    .build()
    		    .parseClaimsJws(token)
    		    .getBody();

        return claimsResolver.apply(claims);
    }
    
    
}
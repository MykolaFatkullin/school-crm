package org.example.schoolcrm.infrastructure.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.regex.Pattern;

@Component
public class JwtProvider {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration-in-ms}")
    private Integer jwtExpirationInMs;

    @Value("${jwt.private-key-path}")
    private String privateKeyPath;

    @Value("${jwt.public-key-path}")
    private String publicKeyPath;

    private static final String KEYS_REGEX = "-----.*?-----|\\s+";
    private static final String ALGORITHM = "RSA";
    private static final String ROLE_FIELD = "role";

    private PrivateKey privateKey;
    private PublicKey publicKey;

    private final Logger log = LoggerFactory.getLogger(JwtProvider.class);

    @PostConstruct
    public void setKeys() throws Exception {
        privateKey = loadPrivateKey();
        publicKey = loadPublicKey();
    }

    public String generateAccessToken(UUID userId, String role) {
        return Jwts.builder()
                .subject(userId.toString())
                .claim(ROLE_FIELD, role)
                .notBefore(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(privateKey)
                .compact();
    }

    public Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(publicKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();

    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(publicKey).build().parseSignedClaims(token);
            return true;
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT token.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
        }
        return false;
    }

    private PrivateKey loadPrivateKey() throws Exception {
        var key = new ClassPathResource(privateKeyPath).getInputStream().readAllBytes();
        var sanitizedKey = prepareRsaKeys(new String(key));
        var decoded = Base64.getDecoder().decode(sanitizedKey);
        var spec = new PKCS8EncodedKeySpec(decoded);

        return KeyFactory.getInstance(ALGORITHM).generatePrivate(spec);
    }

    private PublicKey loadPublicKey() throws Exception {
        var key = new ClassPathResource(publicKeyPath).getInputStream().readAllBytes();
        var sanitizedKey = prepareRsaKeys(new String(key));
        var decoded = Base64.getDecoder().decode(sanitizedKey);
        var spec = new X509EncodedKeySpec(decoded);

        return KeyFactory.getInstance(ALGORITHM).generatePublic(spec);
    }

    private String prepareRsaKeys(String rawKey) {
        var pattern = Pattern.compile(KEYS_REGEX);
        return pattern.matcher(rawKey).replaceAll("").replaceAll("\\s", "");
    }
}

package br.com.orbit.auth.domain;

import java.util.UUID;

/**
 * Camada: DOMAIN (porta — emissão/validação de token)
 */
public interface TokenProvider {

    String generate(UUID userId, String email, String role);

    boolean isValid(String token);

    String extractUserId(String token);

    String extractEmail(String token);

    String extractRole(String token);

    long expirationMs();
}

package br.com.orbit.user.domain;

/**
 * Camada: DOMAIN (porta de serviço de domínio / hashing)
 *
 * Abstrai criptografia de senha. O domínio sabe que precisa "hash" e "comparar",
 * mas não conhece BCrypt, Argon2, etc. — isso fica na infrastructure.
 */
public interface PasswordHasher {

    String hash(String rawPassword);

    boolean matches(String rawPassword, String passwordHash);
}

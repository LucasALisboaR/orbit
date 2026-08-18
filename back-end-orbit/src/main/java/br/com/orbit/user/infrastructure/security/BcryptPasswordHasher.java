package br.com.orbit.user.infrastructure.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import br.com.orbit.user.domain.PasswordHasher;

/**
 * Camada: INFRASTRUCTURE (adapter de segurança)
 *
 * Implementação concreta de PasswordHasher com BCrypt.
 * O domínio só vê a interface; aqui está o detalhe técnico.
 */
@Component
public class BcryptPasswordHasher implements PasswordHasher {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public String hash(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    @Override
    public boolean matches(String rawPassword, String passwordHash) {
        return encoder.matches(rawPassword, passwordHash);
    }
}

package br.com.orbit.auth.application.dto;

import br.com.orbit.user.application.dto.UserPresenter;

/**
 * Camada: APPLICATION (DTO de saída — autenticação)
 *
 * Resposta do login: access token JWT + dados do usuário.
 */
public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresInMs,
        UserPresenter user
) {

    public static AuthResponse bearer(String accessToken, long expiresInMs, UserPresenter user) {
        return new AuthResponse(accessToken, "Bearer", expiresInMs, user);
    }
}

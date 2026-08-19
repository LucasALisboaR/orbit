package br.com.orbit.user.application.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.User.UserRole;
import br.com.orbit.user.domain.User.UserTheme;

/**
 * Camada: APPLICATION (DTO de saída / Presenter)
 *
 * Representação segura do User para a API.
 * Nunca inclui passwordHash — regra de Clean Code / segurança.
 */
public record UserPresenter(
        UUID id,
        String firstName,
        String lastName,
        String email,
        UserRole role,
        UserTheme theme,
        boolean isActive,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {

    public static UserPresenter from(User user) {
        return new UserPresenter(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.getTheme(),
                user.isActive(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}

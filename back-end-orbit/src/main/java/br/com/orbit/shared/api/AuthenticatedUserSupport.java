package br.com.orbit.shared.api;

import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import br.com.orbit.shared.application.dto.ActorRequest;

/**
 * Extrai o usuário autenticado do JWT (Spring Security).
 * O subject do token é o UUID do usuário — nunca confiar em userId vindo do body.
 */
public final class AuthenticatedUserSupport {

    private AuthenticatedUserSupport() {
    }

    public static UUID userIdFrom(Authentication authentication) {
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            throw new IllegalArgumentException("Usuário não autenticado");
        }
        return UUID.fromString(authentication.getName());
    }

    public static ActorRequest actorFrom(Authentication authentication) {
        UUID actorId = userIdFrom(authentication);
        boolean admin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch("ROLE_ADMIN"::equals);
        return new ActorRequest(actorId, admin);
    }
}

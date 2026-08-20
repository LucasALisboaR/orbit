package br.com.orbit.user.application;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;

import org.junit.jupiter.api.Test;

import br.com.orbit.user.application.shared.ForbiddenException;
import br.com.orbit.user.application.shared.UserAccessPolicy;

class UserAccessPolicyTest {

    private final UUID actor = UUID.fromString("11111111-1111-1111-1111-111111111111");
    private final UUID other = UUID.fromString("22222222-2222-2222-2222-222222222222");

    @Test
    void ownerCanAccessOwnResource() {
        assertDoesNotThrow(() -> UserAccessPolicy.requireSelfOrAdmin(actor, false, actor, "negado"));
    }

    @Test
    void adminCanAccessOtherResource() {
        assertDoesNotThrow(() -> UserAccessPolicy.requireSelfOrAdmin(actor, true, other, "negado"));
    }

    @Test
    void basicCannotAccessOtherResource() {
        assertThrows(
                ForbiddenException.class,
                () -> UserAccessPolicy.requireSelfOrAdmin(actor, false, other, "negado")
        );
    }
}

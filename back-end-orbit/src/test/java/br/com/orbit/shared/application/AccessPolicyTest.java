package br.com.orbit.shared.application;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;

import org.junit.jupiter.api.Test;

class AccessPolicyTest {

    private final UUID actor = UUID.fromString("11111111-1111-1111-1111-111111111111");
    private final UUID other = UUID.fromString("22222222-2222-2222-2222-222222222222");

    @Test
    void ownerCanAccessOwnResource() {
        assertDoesNotThrow(() -> AccessPolicy.requireSelfOrAdmin(actor, false, actor, "negado"));
    }

    @Test
    void adminCanAccessOtherResource() {
        assertDoesNotThrow(() -> AccessPolicy.requireSelfOrAdmin(actor, true, other, "negado"));
    }

    @Test
    void basicCannotAccessOtherResource() {
        assertThrows(
                ForbiddenException.class,
                () -> AccessPolicy.requireSelfOrAdmin(actor, false, other, "negado")
        );
    }
}

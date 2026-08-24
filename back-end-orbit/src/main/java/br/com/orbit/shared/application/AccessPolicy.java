package br.com.orbit.shared.application;

import java.util.UUID;

/**
 * Regras de autorização transversais: dono do recurso ou ADMIN.
 */
public final class AccessPolicy {

    private AccessPolicy() {
    }

    public static void requireSelfOrAdmin(UUID actorId, boolean actorIsAdmin, UUID ownerId, String message) {
        if (actorIsAdmin || actorId.equals(ownerId)) {
            return;
        }
        throw new ForbiddenException(message);
    }

    public static void requireAdmin(UUID actorId, boolean actorIsAdmin, String message) {
        if (actorIsAdmin) {
            return;
        }
        throw new ForbiddenException(message);
    }
}

package br.com.orbit.user.application.shared;

import java.util.UUID;

/**
 * Camada: APPLICATION (regra de autorização de usuário)
 *
 * Dono do recurso ou ADMIN podem consultar/excluir.
 */
public final class UserAccessPolicy {

    private UserAccessPolicy() {
    }

    public static void requireSelfOrAdmin(UUID actorId, boolean actorIsAdmin, UUID targetId, String message) {
        if (actorIsAdmin || actorId.equals(targetId)) {
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

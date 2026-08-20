package br.com.orbit.user.application.shared;

/**
 * Camada: APPLICATION
 *
 * Falha de autorização — o caller autenticado não pode executar a ação.
 */
public class ForbiddenException extends RuntimeException {

    public ForbiddenException(String message) {
        super(message);
    }
}

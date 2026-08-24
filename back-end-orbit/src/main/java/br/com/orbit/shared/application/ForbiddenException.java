package br.com.orbit.shared.application;

/**
 * Falha de autorização — o caller autenticado não pode executar a ação.
 */
public class ForbiddenException extends RuntimeException {

    public ForbiddenException(String message) {
        super(message);
    }
}

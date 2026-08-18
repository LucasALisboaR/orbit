package br.com.orbit.user.application;

import br.com.orbit.user.application.dto.ForgotPasswordRequest;
import br.com.orbit.user.application.dto.MessageResponse;

/**
 * Camada: APPLICATION (caso de uso — porta de entrada)
 *
 * Inicia recuperação de senha. V0: resposta genérica (não revela se o email existe).
 */
public interface ForgotPasswordUseCase {

    MessageResponse execute(ForgotPasswordRequest request);
}

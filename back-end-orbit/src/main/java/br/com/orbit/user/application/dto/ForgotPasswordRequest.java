package br.com.orbit.user.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Camada: APPLICATION (DTO de entrada)
 *
 * Entrada do "esqueci a senha" (V0: só o email; reset completo virá depois com token).
 */
public record ForgotPasswordRequest(
        @NotBlank(message = "O email é obrigatório")
        @Email(message = "O email deve ser válido")
        String email
) {
}

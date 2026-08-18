package br.com.orbit.user.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Camada: APPLICATION (DTO de entrada)
 *
 * Entrada do caso de uso de login.
 */
public record LoginRequest(
        @NotBlank(message = "O email é obrigatório")
        @Email(message = "O email deve ser válido")
        String email,

        @NotBlank(message = "A senha é obrigatória")
        String password
) {
}

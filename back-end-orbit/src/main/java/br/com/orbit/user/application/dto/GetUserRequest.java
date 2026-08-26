package br.com.orbit.user.application.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

import br.com.orbit.shared.application.dto.ActorRequest;

/**
 * Camada: APPLICATION (DTO de entrada)
 *
 * Entrada do caso de uso de buscar usuário por id.
 */
public record GetUserRequest(
        @NotNull(message = "O ID do usuário é obrigatório")
        UUID id,
        @NotNull ActorRequest actor
) {
}

package br.com.orbit.user.application.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

import br.com.orbit.shared.application.dto.ActorRequest;

public record DeleteUserRequest(
        @NotNull UUID id,
        @NotNull ActorRequest actor
) {
}

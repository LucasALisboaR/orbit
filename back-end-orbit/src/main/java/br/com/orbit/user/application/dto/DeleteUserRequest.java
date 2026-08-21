package br.com.orbit.user.application.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record DeleteUserRequest(
        @NotNull UUID id,
        @NotNull ActorRequest actor
) {
}

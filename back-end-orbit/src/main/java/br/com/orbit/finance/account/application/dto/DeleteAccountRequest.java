package br.com.orbit.finance.account.application.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record DeleteAccountRequest(
    @NotNull(message = "O ID da conta é obrigatório")
    UUID id
) {
}

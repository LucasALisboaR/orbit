package br.com.orbit.finance.account.application.dto;

import java.util.UUID;

import br.com.orbit.finance.account.domain.Account.AccountType;
import jakarta.validation.constraints.NotNull;

public record EditAccountRequest(
    @NotNull(message = "O ID da conta é obrigatório")
    UUID id,

    @NotNull(message = "O nome da conta é obrigatório")
    String name,

    @NotNull(message = "O tipo de conta é obrigatório")
    AccountType type
) {}

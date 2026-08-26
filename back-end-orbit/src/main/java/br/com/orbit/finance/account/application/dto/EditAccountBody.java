package br.com.orbit.finance.account.application.dto;

import br.com.orbit.finance.account.domain.Account.AccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EditAccountBody(
    @NotBlank(message = "O nome da conta é obrigatório")
    @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres")
    String name,

    @NotNull(message = "O tipo de conta é obrigatório")
    AccountType type
) {
}

package br.com.orbit.finance.account.application.dto;

import java.math.BigDecimal;

import br.com.orbit.finance.account.domain.Account.AccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateAccountRequest(
        @NotBlank(message = "O nome é obrigatório")
        @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
        String name,

        @NotNull(message = "O tipo de conta é obrigatório")
        AccountType type,

        @NotNull(message = "O saldo da conta é obrigatório")
        BigDecimal balance
) {
}

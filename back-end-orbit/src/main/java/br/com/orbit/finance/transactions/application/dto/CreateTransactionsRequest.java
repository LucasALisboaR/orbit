package br.com.orbit.finance.transactions.application.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import br.com.orbit.finance.transactions.domain.Transactions.TransactionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateTransactionsRequest(
        @NotNull(message = "O ID da conta é obrigatório")
        UUID accountId,

        @NotNull(message = "O ID da categoria é obrigatório")
        UUID categoryId,

        @NotBlank(message = "A descrição é obrigatória")
        String description,

        @NotNull(message = "O valor é obrigatório")
        @Positive(message = "O valor deve ser maior que zero")
        BigDecimal amount,

        @NotNull(message = "O tipo de transação é obrigatório")
        TransactionType type,

        @NotNull(message = "A data da transação é obrigatória")
        LocalDate transactionDate
) {
}

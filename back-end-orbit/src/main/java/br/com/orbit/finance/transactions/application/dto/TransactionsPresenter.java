package br.com.orbit.finance.transactions.application.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

import br.com.orbit.finance.transactions.domain.Transactions;
import br.com.orbit.finance.transactions.domain.Transactions.TransactionType;

public record TransactionsPresenter(
    UUID id,
    UUID userId,
    UUID accountId,
    UUID categoryId,
    String description,
    BigDecimal amount,
    TransactionType type,
    LocalDate transactionDate,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
    public static TransactionsPresenter from(Transactions transactions){
        return new TransactionsPresenter(
            transactions.getId(),
            transactions.getUserId(),
            transactions.getAccountId(),
            transactions.getCategoryId(),
            transactions.getDescription(),
            transactions.getAmount(),
            transactions.getType(),
            transactions.getTransactionDate(),
            transactions.getCreatedAt(),
            transactions.getUpdatedAt()
        );
    }
}
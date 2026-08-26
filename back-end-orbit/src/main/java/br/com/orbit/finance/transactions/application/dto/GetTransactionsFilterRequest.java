package br.com.orbit.finance.transactions.application.dto;

import java.time.LocalDate;
import java.util.UUID;

import br.com.orbit.finance.transactions.domain.Transactions.TransactionType;
import br.com.orbit.finance.transactions.domain.TransactionsFilter;

public record GetTransactionsFilterRequest(
        UUID accountId,
        TransactionType type,
        LocalDate from,
        LocalDate to,
        int page,
        int size
) {
    public TransactionsFilter toDomain() {
        return new TransactionsFilter(accountId, type, from, to, page, size);
    }
}

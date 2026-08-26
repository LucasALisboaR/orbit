package br.com.orbit.finance.transactions.domain;

import java.time.LocalDate;
import java.util.UUID;

import br.com.orbit.finance.transactions.domain.Transactions.TransactionType;

public record TransactionsFilter(
        UUID accountId,
        TransactionType type,
        LocalDate from,
        LocalDate to,
        int page,
        int size
) {
    public static final int DEFAULT_PAGE = 0;
    public static final int DEFAULT_SIZE = 20;
    public static final int MAX_SIZE = 100;
}

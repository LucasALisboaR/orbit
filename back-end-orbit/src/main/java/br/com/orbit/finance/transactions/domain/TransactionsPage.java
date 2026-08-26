package br.com.orbit.finance.transactions.domain;

import java.util.List;

public record TransactionsPage(
        List<Transactions> content,
        long totalElements,
        int page,
        int size,
        int totalPages
) {}

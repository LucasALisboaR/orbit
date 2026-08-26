package br.com.orbit.finance.transactions.application.dto;

import java.util.List;

import br.com.orbit.finance.transactions.domain.TransactionsPage;

public record TransactionsPagePresenter(
        List<TransactionsPresenter> content,
        long totalElements,
        int page,
        int size,
        int totalPages
) {
    public static TransactionsPagePresenter from(TransactionsPage page) {
        return new TransactionsPagePresenter(
                page.content().stream().map(TransactionsPresenter::from).toList(),
                page.totalElements(),
                page.page(),
                page.size(),
                page.totalPages()
        );
    }
}

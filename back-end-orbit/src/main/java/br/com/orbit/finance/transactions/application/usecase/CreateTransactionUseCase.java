package br.com.orbit.finance.transactions.application.usecase;

import java.util.UUID;

import br.com.orbit.finance.transactions.application.dto.CreateTransactionsRequest;
import br.com.orbit.finance.transactions.application.dto.TransactionsPresenter;

public interface CreateTransactionUseCase {
    TransactionsPresenter execute(UUID userId, CreateTransactionsRequest request);
}

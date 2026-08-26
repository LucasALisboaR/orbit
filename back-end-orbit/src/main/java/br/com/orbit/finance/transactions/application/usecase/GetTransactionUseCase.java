package br.com.orbit.finance.transactions.application.usecase;

import java.util.UUID;

import br.com.orbit.finance.transactions.application.dto.GetTransactionsFilterRequest;
import br.com.orbit.finance.transactions.application.dto.TransactionsPagePresenter;

public interface GetTransactionUseCase {
    TransactionsPagePresenter execute(UUID userId, GetTransactionsFilterRequest filter);
}

package br.com.orbit.finance.transactions.application.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.finance.account.domain.Account;
import br.com.orbit.finance.account.domain.AccountRepository;
import br.com.orbit.finance.transactions.application.dto.GetTransactionsFilterRequest;
import br.com.orbit.finance.transactions.application.dto.TransactionsPagePresenter;
import br.com.orbit.finance.transactions.application.usecase.GetTransactionUseCase;
import br.com.orbit.finance.transactions.domain.TransactionsFilter;
import br.com.orbit.finance.transactions.domain.TransactionsRepository;
import br.com.orbit.shared.application.ForbiddenException;

@Service
public class GetTransactionUseCaseImpl implements GetTransactionUseCase {
    private final TransactionsRepository transactionsRepository;
    private final AccountRepository accountsRepository;

    public GetTransactionUseCaseImpl(
            TransactionsRepository transactionsRepository,
            AccountRepository accountsRepository) {
        this.transactionsRepository = transactionsRepository;
        this.accountsRepository = accountsRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public TransactionsPagePresenter execute(UUID userId, GetTransactionsFilterRequest filter) {
        validateFilter(filter);

        if (filter.accountId() != null) {
            validateAccountAccess(userId, filter.accountId());
        }

        return TransactionsPagePresenter.from(
                transactionsRepository.findByFilters(userId, filter.toDomain())
        );
    }

    private void validateFilter(GetTransactionsFilterRequest filter) {
        if (filter.from() != null && filter.to() != null && filter.from().isAfter(filter.to())) {
            throw new IllegalArgumentException("A data inicial não pode ser posterior à data final");
        }
        if (filter.page() < 0) {
            throw new IllegalArgumentException("A página deve ser maior ou igual a zero");
        }
        if (filter.size() < 1 || filter.size() > TransactionsFilter.MAX_SIZE) {
            throw new IllegalArgumentException(
                    "O tamanho da página deve estar entre 1 e " + TransactionsFilter.MAX_SIZE
            );
        }
    }

    private void validateAccountAccess(UUID userId, UUID accountId) {
        Account account = accountsRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada"));

        if (!account.isActive()) {
            throw new IllegalArgumentException("Conta não ativa");
        }

        if (!account.getUserId().equals(userId)) {
            throw new ForbiddenException("Você não tem permissão para acessar esta conta");
        }
    }
}

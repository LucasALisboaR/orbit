package br.com.orbit.finance.transactions.application.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.finance.account.domain.Account;
import br.com.orbit.finance.account.domain.AccountRepository;
import br.com.orbit.finance.categories.domain.Categories;
import br.com.orbit.finance.categories.domain.Categories.CategoryType;
import br.com.orbit.finance.categories.domain.CategoriesRepository;
import br.com.orbit.finance.transactions.application.dto.CreateTransactionsRequest;
import br.com.orbit.finance.transactions.application.dto.TransactionsPresenter;
import br.com.orbit.finance.transactions.application.usecase.CreateTransactionUseCase;
import br.com.orbit.finance.transactions.domain.Transactions;
import br.com.orbit.finance.transactions.domain.Transactions.TransactionType;
import br.com.orbit.finance.transactions.domain.TransactionsRepository;
import br.com.orbit.user.domain.UserRepository;

@Service
public class CreateTransactionUseCaseImpl implements CreateTransactionUseCase {

    private final TransactionsRepository transactionsRepository;
    private final CategoriesRepository categoriesRepository;
    private final AccountRepository accountsRepository;
    private final UserRepository userRepository;

    public CreateTransactionUseCaseImpl(
            TransactionsRepository transactionsRepository,
            CategoriesRepository categoriesRepository,
            AccountRepository accountsRepository,
            UserRepository userRepository
    ) {
        this.transactionsRepository = transactionsRepository;
        this.categoriesRepository = categoriesRepository;
        this.accountsRepository = accountsRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public TransactionsPresenter execute(UUID userId, CreateTransactionsRequest request) {
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        Account account = accountsRepository.findById(request.accountId())
                .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada"));

        if (!account.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Conta não pertence ao usuário");
        }
        if (!account.isActive()) {
            throw new IllegalArgumentException("Conta inativa");
        }

        Categories category = categoriesRepository.findById(request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        if (!category.isActive()) {
            throw new IllegalArgumentException("Categoria inativa");
        }
        if (!category.isSystem() && !userId.equals(category.getUserId())) {
            throw new IllegalArgumentException("Categoria não pertence ao usuário");
        }
        if (!categoryMatchesTransaction(category.getType(), request.type())) {
            throw new IllegalArgumentException("Tipo da transação não corresponde à categoria");
        }

        Transactions transaction = Transactions.create(
                userId,
                request.accountId(),
                request.categoryId(),
                request.description(),
                request.amount(),
                request.type(),
                request.transactionDate()
        );

        if (request.type() == TransactionType.INCOME) {
            account.applyIncome(request.amount());
        } else {
            account.applyExpense(request.amount());
        }

        accountsRepository.persist(account);
        Transactions saved = transactionsRepository.persist(transaction);
        return TransactionsPresenter.from(saved);
    }

    private boolean categoryMatchesTransaction(CategoryType categoryType, TransactionType transactionType) {
        return categoryType.name().equals(transactionType.name());
    }
}

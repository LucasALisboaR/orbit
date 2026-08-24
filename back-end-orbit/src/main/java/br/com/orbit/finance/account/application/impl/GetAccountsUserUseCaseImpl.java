package br.com.orbit.finance.account.application.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.finance.account.application.dto.AccountPresenter;
import br.com.orbit.finance.account.application.usecase.GetAccountsUserUseCase;
import br.com.orbit.finance.account.domain.Account;
import br.com.orbit.finance.account.domain.AccountRepository;

@Service
public class GetAccountsUserUseCaseImpl implements GetAccountsUserUseCase {

    private final AccountRepository accountRepository;

    public GetAccountsUserUseCaseImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccountPresenter> execute(UUID userId) {
        List<Account> accounts = accountRepository.findByUserId(userId);
        return accounts.stream()
            .filter(account -> account.isActive())
            .map(AccountPresenter::from)
            .collect(Collectors.toList());
    }
}

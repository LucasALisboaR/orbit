package br.com.orbit.finance.account.application.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.finance.account.application.dto.AccountPresenter;
import br.com.orbit.finance.account.application.dto.CreateAccountRequest;
import br.com.orbit.finance.account.application.usecase.CreateAccountUseCase;
import br.com.orbit.finance.account.domain.Account;
import br.com.orbit.finance.account.domain.AccountRepository;
import br.com.orbit.user.domain.UserRepository;

@Service
public class CreateAccountUseCaseImpl implements CreateAccountUseCase {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;

    public CreateAccountUseCaseImpl(UserRepository userRepository, AccountRepository accountRepository) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    @Transactional
    public AccountPresenter execute(UUID userId, CreateAccountRequest request) {
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        Account account = Account.create(
                userId,
                request.name().trim(),
                request.type(),
                request.balance());

        Account saved = accountRepository.persist(account);
        return AccountPresenter.from(saved);
    }
}

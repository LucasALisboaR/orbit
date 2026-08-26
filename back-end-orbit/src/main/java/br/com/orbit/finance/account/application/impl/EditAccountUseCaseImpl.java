package br.com.orbit.finance.account.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.finance.account.application.dto.AccountPresenter;
import br.com.orbit.finance.account.application.dto.EditAccountRequest;
import br.com.orbit.finance.account.application.usecase.EditAccountUseCase;
import br.com.orbit.finance.account.domain.Account;
import br.com.orbit.finance.account.domain.AccountRepository;
import br.com.orbit.shared.application.AccessPolicy;
import br.com.orbit.shared.application.dto.ActorRequest;

@Service
public class EditAccountUseCaseImpl implements EditAccountUseCase {
    private final AccountRepository accountRepository;

    public EditAccountUseCaseImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    @Transactional
    public AccountPresenter execute(EditAccountRequest request, ActorRequest actor){
        Account account = accountRepository.findById(request.id())
            .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada"));

        AccessPolicy.requireSelfOrAdmin(
            actor.id(),
            actor.admin(),
            account.getUserId(),
            "Você não tem permissão para editar esta conta"
        );

        account.update(request.name(), request.type());
        accountRepository.persist(account);
        return AccountPresenter.from(account);
    }
}

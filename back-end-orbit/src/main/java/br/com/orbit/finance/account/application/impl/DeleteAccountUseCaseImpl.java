package br.com.orbit.finance.account.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.finance.account.application.dto.DeleteAccountRequest;
import br.com.orbit.finance.account.application.usecase.DeleteAccountUseCase;
import br.com.orbit.finance.account.domain.Account;
import br.com.orbit.finance.account.domain.AccountRepository;
import br.com.orbit.shared.application.AccessPolicy;
import br.com.orbit.shared.application.dto.ActorRequest;

@Service
public class DeleteAccountUseCaseImpl implements DeleteAccountUseCase {
    private final AccountRepository accountRepository;

    public DeleteAccountUseCaseImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    @Transactional
    public void execute(DeleteAccountRequest request, ActorRequest actor) {
        Account account = accountRepository.findById(request.id())
            .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada"));

        AccessPolicy.requireSelfOrAdmin(
                actor.id(),
                actor.admin(),
                account.getUserId(),
                "Você não tem permissão para excluir esta conta"
        );

        if (!account.isActive()) {
            throw new IllegalArgumentException("Conta já está inativa");
        }

        account.deactivate();
        accountRepository.persist(account);
    }
}

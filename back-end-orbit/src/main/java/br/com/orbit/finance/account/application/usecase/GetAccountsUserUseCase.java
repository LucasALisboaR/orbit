package br.com.orbit.finance.account.application.usecase;

import java.util.List;
import java.util.UUID;

import br.com.orbit.finance.account.application.dto.AccountPresenter;

public interface GetAccountsUserUseCase {
    List<AccountPresenter> execute(UUID userId);
}

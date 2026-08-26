package br.com.orbit.finance.account.application.usecase;

import java.util.UUID;

import br.com.orbit.finance.account.application.dto.AccountPresenter;
import br.com.orbit.finance.account.application.dto.CreateAccountRequest;

public interface CreateAccountUseCase {
    AccountPresenter execute(UUID userId, CreateAccountRequest request);
}

package br.com.orbit.finance.account.application.usecase;

import br.com.orbit.finance.account.application.dto.AccountPresenter;
import br.com.orbit.finance.account.application.dto.EditAccountRequest;
import br.com.orbit.shared.application.dto.ActorRequest;

public interface EditAccountUseCase {
    AccountPresenter execute(EditAccountRequest request, ActorRequest actor);
}

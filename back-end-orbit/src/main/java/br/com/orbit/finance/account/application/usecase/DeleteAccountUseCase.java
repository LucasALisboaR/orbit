package br.com.orbit.finance.account.application.usecase;

import br.com.orbit.finance.account.application.dto.DeleteAccountRequest;
import br.com.orbit.shared.application.dto.ActorRequest;

public interface DeleteAccountUseCase {
    void execute(DeleteAccountRequest request, ActorRequest actor);
}

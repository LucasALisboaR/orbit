package br.com.orbit.user.application.usecase;

import java.util.UUID;

import br.com.orbit.shared.application.dto.ActorRequest;
import br.com.orbit.user.application.dto.EditUserRequest;
import br.com.orbit.user.application.dto.UserPresenter;

public interface EditUserUseCase {

    UserPresenter execute(EditUserRequest request, UUID id, ActorRequest actor);
    
}

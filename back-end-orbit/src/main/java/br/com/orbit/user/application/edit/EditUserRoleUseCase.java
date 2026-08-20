package br.com.orbit.user.application.edit;

import java.util.UUID;

import br.com.orbit.user.application.dto.ActorRequest;
import br.com.orbit.user.application.dto.EditUserRoleRequest;
import br.com.orbit.user.application.dto.UserPresenter;

public interface EditUserRoleUseCase {

    UserPresenter execute(EditUserRoleRequest request, UUID id, ActorRequest actor);
}
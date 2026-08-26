package br.com.orbit.user.application.usecase;
import java.util.List;

import br.com.orbit.shared.application.dto.ActorRequest;
import br.com.orbit.user.application.dto.UserPresenter;

public interface GetAllUsersUseCase {
    List<UserPresenter> execute(ActorRequest actor);
}
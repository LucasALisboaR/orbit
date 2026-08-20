package br.com.orbit.user.application.list;
import java.util.List;
import java.util.UUID;

import br.com.orbit.user.application.dto.ActorRequest;
import br.com.orbit.user.application.dto.UserPresenter;

public interface GetAllUsersUseCase {
    List<UserPresenter> execute(ActorRequest actor);
}
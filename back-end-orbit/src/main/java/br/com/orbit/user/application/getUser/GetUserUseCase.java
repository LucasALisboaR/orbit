package br.com.orbit.user.application.getUser;
import br.com.orbit.user.application.dto.GetUserRequest;
import br.com.orbit.user.application.dto.UserPresenter;

public interface GetUserUseCase {
    UserPresenter execute(GetUserRequest request);
}
package br.com.orbit.user.application.deleteUser;

import br.com.orbit.user.application.dto.DeleteUserRequest;

public interface DeleteUserUseCase {

    void execute(DeleteUserRequest request);
}
package br.com.orbit.user.application.delete;

import br.com.orbit.user.application.dto.DeleteUserRequest;

public interface DeleteUserUseCase {

    void execute(DeleteUserRequest request);
}
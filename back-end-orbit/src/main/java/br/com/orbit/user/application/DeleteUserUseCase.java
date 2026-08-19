package br.com.orbit.user.application;

import java.util.UUID;

public interface DeleteUserUseCase {

    void execute(UUID id);
}
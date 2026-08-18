package br.com.orbit.user.application;

import br.com.orbit.user.application.dto.CreateUserRequest;
import br.com.orbit.user.application.dto.UserPresenter;

/**
 * Camada: APPLICATION (caso de uso — porta de entrada)
 *
 * Interface do caso de uso "criar usuário".
 * Controllers dependem da interface; a implementação concreta fica ao lado.
 */
public interface CreateUserUseCase {

    UserPresenter execute(CreateUserRequest request);
}

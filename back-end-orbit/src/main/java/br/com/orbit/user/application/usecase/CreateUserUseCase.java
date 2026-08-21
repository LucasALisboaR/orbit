package br.com.orbit.user.application.usecase;

import br.com.orbit.user.application.dto.CreateUserRequest;
import br.com.orbit.user.application.dto.UserPresenter;

/**
 * Camada: APPLICATION (caso de uso — porta de entrada) oque o sistema faz
 *
 * Interface do caso de uso "criar usuário".
 * Controllers dependem da interface; a implementação concreta fica ao lado.
 */
public interface CreateUserUseCase {

    UserPresenter execute(CreateUserRequest request);
}

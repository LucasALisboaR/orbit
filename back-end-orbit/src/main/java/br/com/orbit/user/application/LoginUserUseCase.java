package br.com.orbit.user.application;

import br.com.orbit.user.application.dto.LoginRequest;
import br.com.orbit.user.application.dto.UserPresenter;

/**
 * Camada: APPLICATION (caso de uso — porta de entrada)
 *
 * Autentica um usuário com email + senha.
 * (V0: retorna o usuário; JWT/sessão podem entrar depois.)
 */
public interface LoginUserUseCase {

    UserPresenter execute(LoginRequest request);
}

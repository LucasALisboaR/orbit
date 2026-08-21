package br.com.orbit.user.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.user.application.dto.LoginRequest;
import br.com.orbit.user.application.dto.UserPresenter;
import br.com.orbit.user.application.usecase.LoginUserUseCase;
import br.com.orbit.user.domain.PasswordHasher;
import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;

/**
 * Camada: APPLICATION (caso de uso — implementação)
 *
 * Fluxo de login:
 * 1) busca usuário por email
 * 2) verifica se está ativo
 * 3) compara senha com o hash (PasswordHasher)
 * 4) retorna UserPresenter (sem passwordHash)
 */
@Service
public class LoginUserUseCaseImpl implements LoginUserUseCase {

    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;

    public LoginUserUseCaseImpl(UserRepository userRepository, PasswordHasher passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    @Override
    @Transactional(readOnly = true)
    public UserPresenter execute(LoginRequest request) {
        String email = request.email().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Email inválidos"));

        if (!user.isActive()) {
            throw new IllegalArgumentException("Usuário inativo");
        }

        if (!passwordHasher.matches(request.password(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Senha inválida");
        }

        return UserPresenter.from(user);
    }
}

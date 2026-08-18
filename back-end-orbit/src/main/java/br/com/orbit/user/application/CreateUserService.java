package br.com.orbit.user.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.user.application.dto.CreateUserRequest;
import br.com.orbit.user.application.dto.UserPresenter;
import br.com.orbit.user.domain.PasswordHasher;
import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;
import br.com.orbit.user.domain.User.UserTheme;

/**
 * Camada: APPLICATION (caso de uso — implementação)
 *
 * Orquestra o fluxo de cadastro:
 * 1) valida regras de aplicação (email já existe?)
 * 2) hasheia a senha (via porta PasswordHasher)
 * 3) cria a entity de domínio
 * 4) persiste via porta UserRepository
 * 5) devolve um DTO seguro (UserPresenter)
 *
 * Não conhece HTTP nem detalhes do PostgreSQL.
 */
@Service
public class CreateUserService implements CreateUserUseCase {

    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;

    public CreateUserService(UserRepository userRepository, PasswordHasher passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    @Override
    @Transactional
    public UserPresenter execute(CreateUserRequest request) {
        String email = request.email().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Já existe um usuário com este email");
        }

        String passwordHash = passwordHasher.hash(request.password());
        User user = new User(
                request.firstName().trim(),
                request.lastName().trim(),
                email,
                passwordHash,
                UserTheme.LIGHT
        );

        User saved = userRepository.save(user);
        return UserPresenter.from(saved);
    }
}

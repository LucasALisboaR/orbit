package br.com.orbit.user.application.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.shared.application.AccessPolicy;
import br.com.orbit.shared.application.dto.ActorRequest;
import br.com.orbit.user.application.dto.EditUserRequest;
import br.com.orbit.user.application.dto.UserPresenter;
import br.com.orbit.user.application.usecase.EditUserUseCase;
import br.com.orbit.user.domain.PasswordHasher;
import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;
import br.com.orbit.user.domain.User.UserTheme;

/**
 * Camada: APPLICATION (caso de uso — implementação)
 *
 * Orquestra o fluxo de edição de perfil:
 * 1) autoriza dono ou ADMIN
 * 2) busca o usuário
 * 3) mescla campos opcionais
 * 4) valida email único de outro usuário
 * 5) hasheia senha se veio no request
 * 6) persiste e devolve UserPresenter
 *
 * Não conhece HTTP nem detalhes do PostgreSQL.
 */
@Service
public class EditUserUseCaseImpl implements EditUserUseCase {

    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;

    public EditUserUseCaseImpl(UserRepository userRepository, PasswordHasher passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    @Override
    @Transactional
    public UserPresenter execute(EditUserRequest request, UUID id, ActorRequest actor) {

        AccessPolicy.requireSelfOrAdmin(
                actor.id(),
                actor.admin(),
                id,
                "Você não tem permissão para editar este usuário");

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        String firstName = request.firstName() != null ? request.firstName().trim() : user.getFirstName();
        String lastName = request.lastName() != null ? request.lastName().trim() : user.getLastName();
        String email = user.getEmail();
        if (request.email() != null && !request.email().isBlank()) {
            String normalizedEmail = request.email().trim().toLowerCase();
            userRepository.findByEmail(normalizedEmail)
                    .filter(other -> !other.getId().equals(id))
                    .ifPresent(other -> {
                        throw new IllegalArgumentException("Email já existe");
                    });
            email = normalizedEmail;
        }
        String passwordHash = user.getPasswordHash();
        if (request.password() != null && !request.password().isBlank()) {
            passwordHash = passwordHasher.hash(request.password());
        }
        UserTheme theme = request.theme() != null ? request.theme() : user.getTheme();

        user.update(firstName, lastName, email, passwordHash, theme);
        User saved = userRepository.persist(user);
        return UserPresenter.from(saved);
    }
}

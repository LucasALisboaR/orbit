package br.com.orbit.user.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.user.application.dto.GetUserRequest;
import br.com.orbit.user.application.dto.UserPresenter;
import br.com.orbit.user.application.shared.UserAccessPolicy;
import br.com.orbit.user.application.usecase.GetUserUseCase;
import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;

/**
 * Camada: APPLICATION (caso de uso — implementação)
 *
 * Busca um usuário por id e devolve UserPresenter.
 */
@Service
public class GetUserUseCaseImpl implements GetUserUseCase {

    private final UserRepository userRepository;

    public GetUserUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserPresenter execute(GetUserRequest request) {
        UserAccessPolicy.requireSelfOrAdmin(
                request.actor().id(),
                request.actor().admin(),
                request.id(),
                "Você não tem permissão para visualizar este usuário"
        );

        User user = userRepository.findById(request.id())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        return UserPresenter.from(user);
    }
}

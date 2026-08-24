package br.com.orbit.user.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.user.application.dto.DeleteUserRequest;
import br.com.orbit.shared.application.AccessPolicy;
import br.com.orbit.user.application.usecase.DeleteUserUseCase;
import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;

@Service
public class DeleteUserUseCaseImpl implements DeleteUserUseCase {

    private final UserRepository userRepository;

    public DeleteUserUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void execute(DeleteUserRequest request) {
        AccessPolicy.requireSelfOrAdmin(
                request.actor().id(),
                request.actor().admin(),
                request.id(),
                "Você não tem permissão para excluir este usuário"
        );

        User user = userRepository.findById(request.id())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if (!user.isActive()) {
            throw new IllegalArgumentException("Usuário já está inativo");
        }
        user.deactivate();
        userRepository.persist(user);
    }
}

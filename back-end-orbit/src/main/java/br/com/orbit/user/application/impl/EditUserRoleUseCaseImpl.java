package br.com.orbit.user.application.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import br.com.orbit.shared.application.AccessPolicy;
import br.com.orbit.shared.application.dto.ActorRequest;
import br.com.orbit.user.application.dto.EditUserRoleRequest;
import br.com.orbit.user.application.dto.UserPresenter;
import br.com.orbit.user.application.usecase.EditUserRoleUseCase;
import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;

@Service
public class EditUserRoleUseCaseImpl implements EditUserRoleUseCase {

    private final UserRepository userRepository;

    public EditUserRoleUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserPresenter execute(EditUserRoleRequest request, UUID id, ActorRequest actor) {

        AccessPolicy.requireAdmin(
                actor.id(),
                actor.admin(),
                "Você não tem permissão para alterar o nível de acesso deste usuário");

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        user.setRole(request.role());
        User saved = userRepository.persist(user);
        return UserPresenter.from(saved);
    }

}

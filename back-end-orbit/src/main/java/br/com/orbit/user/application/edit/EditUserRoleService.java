package br.com.orbit.user.application.edit;

import java.util.UUID;

import org.springframework.stereotype.Service;

import br.com.orbit.user.application.UserAccessPolicy;
import br.com.orbit.user.application.dto.ActorRequest;
import br.com.orbit.user.application.dto.EditUserRoleRequest;
import br.com.orbit.user.application.dto.UserPresenter;
import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;

@Service
public class EditUserRoleService implements EditUserRoleUseCase {

    private final UserRepository userRepository;

    public EditUserRoleService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserPresenter execute(EditUserRoleRequest request, UUID id, ActorRequest actor) {

        UserAccessPolicy.requireAdmin(
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

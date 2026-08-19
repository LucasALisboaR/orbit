package br.com.orbit.user.application.deleteUser;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.user.application.UserAccessPolicy;
import br.com.orbit.user.application.dto.DeleteUserRequest;
import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;

@Service
public class DeleteUserService implements DeleteUserUseCase {

    private final UserRepository userRepository;

    public DeleteUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void execute(DeleteUserRequest request) {
        UserAccessPolicy.requireSelfOrAdmin(
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
        userRepository.save(user);
    }
}

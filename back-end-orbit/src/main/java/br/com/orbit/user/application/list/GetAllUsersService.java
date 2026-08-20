package br.com.orbit.user.application.list;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.orbit.user.application.UserAccessPolicy;
import br.com.orbit.user.application.dto.ActorRequest;
import br.com.orbit.user.application.dto.UserPresenter;
import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;

@Service
public class GetAllUsersService implements GetAllUsersUseCase {
    final UserRepository userRepository;

    public GetAllUsersService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserPresenter> execute(ActorRequest actor) {
        UserAccessPolicy.requireAdmin(
                actor.id(),
                actor.admin(),
                "Você não tem permissão para visualizar todos os usuários"
        );

        List<User> users = userRepository.findAll();
        return users.stream()
                .map(UserPresenter::from)
                .collect(Collectors.toList());
    }
}

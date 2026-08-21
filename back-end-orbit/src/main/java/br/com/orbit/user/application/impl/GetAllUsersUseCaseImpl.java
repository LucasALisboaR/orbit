package br.com.orbit.user.application.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.orbit.user.application.dto.ActorRequest;
import br.com.orbit.user.application.dto.UserPresenter;
import br.com.orbit.user.application.shared.UserAccessPolicy;
import br.com.orbit.user.application.usecase.GetAllUsersUseCase;
import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;

@Service
public class GetAllUsersUseCaseImpl implements GetAllUsersUseCase {
    final UserRepository userRepository;

    public GetAllUsersUseCaseImpl(UserRepository userRepository) {
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

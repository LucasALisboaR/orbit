package br.com.orbit.user.infrastructure.persistence;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import br.com.orbit.user.domain.User;
import br.com.orbit.user.domain.UserRepository;

/**
 * Camada: INFRASTRUCTURE (adapter de persistência)
 *
 * Implementa a porta UserRepository do domínio usando Spring Data.
 * Se um dia trocar Postgres por outro banco, só este adapter muda.
 */
@Repository
public class UserRepositoryAdapter implements UserRepository {

    private final SpringDataUserRepository springDataUserRepository;

    public UserRepositoryAdapter(SpringDataUserRepository springDataUserRepository) {
        this.springDataUserRepository = springDataUserRepository;
    }

    @Override
    public User save(User user) {
        return springDataUserRepository.save(user);
    }

    @Override
    public Optional<User> findById(UUID id) {
        return springDataUserRepository.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return springDataUserRepository.findByEmailIgnoreCase(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return springDataUserRepository.existsByEmailIgnoreCase(email);
    }
}

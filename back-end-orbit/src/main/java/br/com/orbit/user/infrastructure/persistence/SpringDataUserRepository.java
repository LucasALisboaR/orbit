package br.com.orbit.user.infrastructure.persistence;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.orbit.user.domain.User;

/**
 * Camada: INFRASTRUCTURE (Spring Data JPA)
 *
 * Interface técnica do Spring Data. NÃO é a porta do domínio —
 * fica escondida atrás do adapter UserRepositoryAdapter.
 */
public interface SpringDataUserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);
}

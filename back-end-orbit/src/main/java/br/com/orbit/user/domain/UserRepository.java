package br.com.orbit.user.domain;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Camada: DOMAIN (porta / repository port)
 *
 * Contrato de persistência do domínio. A application depende DESTA interface,
 * nunca da implementação JPA.
 *
 * Isso é o padrão Port (hexagonal / Clean Architecture):
 * - Domain define O QUE precisa (salvar, buscar por email).
 * - Infrastructure define COMO (PostgreSQL + Spring Data).
 */
public interface UserRepository {

    User persist(User user);

    Optional<User> findById(UUID id);

    Optional<User> findByEmail(String email);

    List<User> findAll();

    boolean existsByEmail(String email);
}

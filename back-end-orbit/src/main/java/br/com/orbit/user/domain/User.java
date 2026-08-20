package br.com.orbit.user.domain;

import java.time.OffsetDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Camada: DOMAIN (núcleo do DDD)
 *
 * Entidade de domínio User — representa o conceito de "usuário" no negócio.
 * Aqui ficam as regras que sempre devem valer para um usuário (invariantes),
 * independentemente de HTTP, banco ou framework.
 *
 * Em Clean Architecture / DDD:
 * - Domain NÃO deve depender de Controller, Service de aplicação ou detalhes de infra.
 * - Anotações JPA aqui são um atalho pragmático (entity rica + persistência).
 *   Em DDD "puro", a entity ficaria sem JPA e haveria um mapper na infrastructure.
 */
@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    public enum UserRole {
        BASIC,
        ADMIN
    }

    public enum UserTheme {
        LIGHT,
        DARK
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.BASIC;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserTheme theme = UserTheme.LIGHT;

    @Column(nullable = false)
    private boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    /**
     * Factory/construtor de domínio: único caminho "oficial" para criar um User válido.
     * passwordHash já deve vir criptografado (BCrypt) pela camada de application/infrastructure.
     */
    public User(String firstName, String lastName, String email, String passwordHash, UserTheme theme) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email == null ? null : email.toLowerCase().trim();
        this.passwordHash = passwordHash;
        activate();
        setRole(UserRole.BASIC);
        setTheme(theme);
        validate();
    }

    public void update(String firstName, String lastName, String email, String passwordHash, UserTheme theme) {
        if (!isActive) {
            throw new IllegalArgumentException("Usuário inativo não pode ser atualizado.");
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email == null ? null : email.toLowerCase().trim();
        this.passwordHash = passwordHash;
        setTheme(theme);
        validate();
    }

    /** Regra de negócio: trocar senha = trocar o hash, nunca guardar texto puro. */
    public void changePassword(String passwordHash) {
        this.passwordHash = passwordHash;
        validate();
    }

    public void deactivate() {
        setActive(false);
    }

    public void activate() {
        setActive(true);
    }

    private void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public void setTheme(UserTheme theme) {
        this.theme = theme;
    }

    public void validate() {
        if (firstName == null || firstName.isBlank()) {
            throw new IllegalArgumentException("O nome é obrigatório");
        }
        if (lastName == null || lastName.isBlank()) {
            throw new IllegalArgumentException("O sobrenome é obrigatório");
        }
        validateEmail(email);
        if (passwordHash == null || passwordHash.isBlank()) {
            throw new IllegalArgumentException("A senha é obrigatória");
        }
        if (role != null && role != UserRole.BASIC && role != UserRole.ADMIN) {
            throw new IllegalArgumentException("O nivel de acesso deve ser BASIC ou ADMIN");
        }
        if (theme != null && theme != UserTheme.LIGHT && theme != UserTheme.DARK) {
            throw new IllegalArgumentException("O tema deve ser LIGHT ou DARK");
        }
    }

    private void validateEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("O email é obrigatório");
        }
        if (!email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException("O email deve ser um email válido");
        }
    }
}

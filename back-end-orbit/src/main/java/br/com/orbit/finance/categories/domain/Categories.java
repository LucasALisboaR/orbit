package br.com.orbit.finance.categories.domain;

import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categories")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Categories {

    public enum CategoryType {
        INCOME,
        EXPENSE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    /** Null quando isSystem = true (categoria global). */
    @Column(name = "user_id")
    private UUID userId;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private CategoryType type;

    @Column(name = "is_system", nullable = false)
    private boolean isSystem;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "created_at", updatable = false, nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    private Categories(UUID userId, String name, CategoryType type, boolean isSystem) {
        this.userId = userId;
        this.name = name == null ? null : name.trim();
        this.type = type;
        this.isSystem = isSystem;
        activate();
        validate();
    }

    public static Categories createCategoryByUser(UUID userId, String name, CategoryType type) {
        return new Categories(userId, name, type, false);
    }

    public static Categories createCategoryBySystem(String name, CategoryType type) {
        return new Categories(null, name, type, true);
    }

    public void update(String name, CategoryType type) {
        if (this.isSystem) {
            throw new IllegalArgumentException("Categorias do sistema não podem ser atualizadas");
        }
        if (!this.isActive) {
            throw new IllegalArgumentException("Categorias inativas não podem ser atualizadas");
        }
        this.name = name == null ? null : name.trim();
        this.type = type;
        validate();
    }

    @PrePersist
    void onPersist() {
        OffsetDateTime now = OffsetDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }

    public void activate() {
        this.isActive = true;
    }

    public void deactivate() {
        if (this.isSystem) {
            throw new IllegalArgumentException("Categorias do sistema não podem ser desativadas");
        }
        this.isActive = false;
    }

    public void validate() {
        if (this.isSystem && this.userId != null) {
            throw new IllegalArgumentException("Categoria do sistema não pode ter usuário");
        }
        if (!this.isSystem && this.userId == null) {
            throw new IllegalArgumentException("Categoria customizada precisa de usuário");
        }
        if (this.name == null || this.name.isBlank()) {
            throw new IllegalArgumentException("O nome da categoria é obrigatório");
        }
        if (this.type == null) {
            throw new IllegalArgumentException("O tipo de categoria é obrigatório");
        }
    }
}

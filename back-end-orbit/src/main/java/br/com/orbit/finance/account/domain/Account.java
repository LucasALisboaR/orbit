package br.com.orbit.finance.account.domain;

import java.math.BigDecimal;
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
@Table(name = "accounts")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {

    public enum AccountType {
        CORRENTE,
        POUPANCA,
        INVESTIMENTO,
        CARTEIRA
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private AccountType type;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal balance;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "created_at", updatable = false, nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    private Account(UUID userId, String name, AccountType type, BigDecimal balance) {
        this.userId = userId;
        this.name = name == null ? null : name.trim();
        this.type = type;
        this.balance = balance;
        activate();
        validate();
    }

    public static Account create(UUID userId, String name, AccountType type, BigDecimal balance) {
        return new Account(userId, name, type, balance != null ? balance : BigDecimal.ZERO);
    }

    public void update(String name, AccountType type) {
        if (!this.isActive) {
            throw new IllegalArgumentException("Contas inativas não podem ser atualizadas");
        }
        this.name = name == null ? null : name.trim();
        this.type = type;
        validate();
    }

    public void applyIncome(BigDecimal amount) {
        requireActive();
        requirePositive(amount);
        this.balance = this.balance.add(amount);
    }

    public void applyExpense(BigDecimal amount) {
        requireActive();
        requirePositive(amount);
        this.balance = this.balance.subtract(amount);
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
        this.isActive = false;
    }

    private void requireActive() {
        if (!this.isActive) {
            throw new IllegalArgumentException("Conta inativa não pode receber lançamentos");
        }
    }

    private void requirePositive(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor deve ser maior que zero");
        }
    }

    public void validate() {
        if (this.userId == null) {
            throw new IllegalArgumentException("O usuário da conta é obrigatório");
        }
        if (this.name == null || this.name.isBlank()) {
            throw new IllegalArgumentException("O nome da conta é obrigatório");
        }
        if (this.type == null) {
            throw new IllegalArgumentException("O tipo de conta é obrigatório");
        }
        if (this.balance == null) {
            throw new IllegalArgumentException("O saldo da conta é obrigatório");
        }
    }
}

package br.com.orbit.finance.transactions.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
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
@Table(name = "transactions")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Transactions {

    public enum TransactionType {
        INCOME,
        EXPENSE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "account_id", nullable = false)
    private UUID accountId;

    @Column(name = "category_id", nullable = false)
    private UUID categoryId;

    @Column(nullable = false, length = 255)
    private String description;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TransactionType type;

    @Column(name = "transaction_date", nullable = false)
    private LocalDate transactionDate;

    @Column(name = "created_at", updatable = false, nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    private Transactions(
            UUID userId,
            UUID accountId,
            UUID categoryId,
            String description,
            BigDecimal amount,
            TransactionType type,
            LocalDate transactionDate
    ) {
        this.userId = userId;
        this.accountId = accountId;
        this.categoryId = categoryId;
        this.description = description == null ? null : description.trim();
        this.amount = amount;
        this.type = type;
        this.transactionDate = transactionDate;
        validate();
    }

    public static Transactions create(
            UUID userId,
            UUID accountId,
            UUID categoryId,
            String description,
            BigDecimal amount,
            TransactionType type,
            LocalDate transactionDate
    ) {
        return new Transactions(userId, accountId, categoryId, description, amount, type, transactionDate);
    }

    public void update(
            UUID accountId,
            UUID categoryId,
            String description,
            BigDecimal amount,
            TransactionType type,
            LocalDate transactionDate
    ) {
        this.accountId = accountId;
        this.categoryId = categoryId;
        this.description = description == null ? null : description.trim();
        this.amount = amount;
        this.type = type;
        this.transactionDate = transactionDate;
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

    public void validate() {
        if (this.userId == null) {
            throw new IllegalArgumentException("O usuário da transação é obrigatório");
        }
        if (this.accountId == null) {
            throw new IllegalArgumentException("A conta da transação é obrigatória");
        }
        if (this.categoryId == null) {
            throw new IllegalArgumentException("A categoria da transação é obrigatória");
        }
        if (this.description == null || this.description.isBlank()) {
            throw new IllegalArgumentException("A descrição da transação é obrigatória");
        }
        if (this.amount == null) {
            throw new IllegalArgumentException("O valor da transação é obrigatório");
        }
        if (this.amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor da transação deve ser maior que zero");
        }
        if (this.type == null) {
            throw new IllegalArgumentException("O tipo da transação é obrigatório");
        }
        if (this.transactionDate == null) {
            throw new IllegalArgumentException("A data da transação é obrigatória");
        }
    }
}

package br.com.orbit.finance.account.application.dto;

import java.time.OffsetDateTime;
import java.math.BigDecimal;
import java.util.UUID;

import br.com.orbit.finance.account.domain.Account;
import br.com.orbit.finance.account.domain.Account.AccountType;

public record AccountPresenter(
    UUID id,
    UUID userId,
    String name,
    AccountType type,
    BigDecimal balance,
    boolean isActive,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {

    public static AccountPresenter from(Account account) {
        return new AccountPresenter(
            account.getId(),
            account.getUserId(),
            account.getName(),
            account.getType(),
            account.getBalance(),
            account.isActive(),
            account.getCreatedAt(),
            account.getUpdatedAt()
        );
    }
} 
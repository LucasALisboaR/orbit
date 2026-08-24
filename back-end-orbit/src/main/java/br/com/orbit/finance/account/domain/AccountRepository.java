package br.com.orbit.finance.account.domain;

import java.util.Optional;
import java.util.UUID;

public interface AccountRepository {
    
    Account persist(Account account);
    
    Optional<Account> findById(UUID id);

    Optional<Account> findByUserId(UUID id);
}

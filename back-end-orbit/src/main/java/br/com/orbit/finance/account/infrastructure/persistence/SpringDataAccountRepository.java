package br.com.orbit.finance.account.infrastructure.persistence;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.orbit.finance.account.domain.Account;

public interface SpringDataAccountRepository extends JpaRepository<Account, UUID> {

    List<Account> findAllByUserId(UUID userId);
}

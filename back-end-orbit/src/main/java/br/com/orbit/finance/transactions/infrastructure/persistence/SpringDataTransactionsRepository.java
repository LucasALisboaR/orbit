package br.com.orbit.finance.transactions.infrastructure.persistence;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.orbit.finance.transactions.domain.Transactions;

public interface SpringDataTransactionsRepository extends JpaRepository<Transactions, UUID> {

    List<Transactions> findAllByUserId(UUID userId);

    List<Transactions> findAllByAccountId(UUID accountId);
}

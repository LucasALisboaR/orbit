package br.com.orbit.finance.transactions.domain;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TransactionsRepository {

    Transactions persist(Transactions transactions);

    Optional<Transactions> findById(UUID id);

    List<Transactions> findAllByUserId(UUID userId);

    List<Transactions> findAllByAccountId(UUID accountId);
}

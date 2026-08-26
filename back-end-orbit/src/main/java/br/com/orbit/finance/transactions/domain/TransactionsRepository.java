package br.com.orbit.finance.transactions.domain;

import java.util.Optional;
import java.util.UUID;

public interface TransactionsRepository {

    Transactions persist(Transactions transactions);

    Optional<Transactions> findById(UUID id);

    TransactionsPage findByFilters(UUID userId, TransactionsFilter filter);
}

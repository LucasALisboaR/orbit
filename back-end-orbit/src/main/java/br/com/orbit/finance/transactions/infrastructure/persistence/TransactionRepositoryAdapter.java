package br.com.orbit.finance.transactions.infrastructure.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import br.com.orbit.finance.transactions.domain.Transactions;
import br.com.orbit.finance.transactions.domain.TransactionsRepository;

@Repository
public class TransactionRepositoryAdapter implements TransactionsRepository {

    private final SpringDataTransactionsRepository springDataTransactionsRepository;

    public TransactionRepositoryAdapter(SpringDataTransactionsRepository springDataTransactionsRepository) {
        this.springDataTransactionsRepository = springDataTransactionsRepository;
    }

    @Override
    public Transactions persist(Transactions transactions) {
        return springDataTransactionsRepository.save(transactions);
    }

    @Override
    public Optional<Transactions> findById(UUID id) {
        return springDataTransactionsRepository.findById(id);
    }

    @Override
    public List<Transactions> findAllByUserId(UUID userId) {
        return springDataTransactionsRepository.findAllByUserId(userId);
    }

    @Override
    public List<Transactions> findAllByAccountId(UUID accountId) {
        return springDataTransactionsRepository.findAllByAccountId(accountId);
    }
}

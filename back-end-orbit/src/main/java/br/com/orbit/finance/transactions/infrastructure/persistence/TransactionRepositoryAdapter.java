package br.com.orbit.finance.transactions.infrastructure.persistence;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import br.com.orbit.finance.transactions.domain.Transactions;
import br.com.orbit.finance.transactions.domain.TransactionsFilter;
import br.com.orbit.finance.transactions.domain.TransactionsPage;
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
    public TransactionsPage findByFilters(UUID userId, TransactionsFilter filter) {
        Page<Transactions> page = springDataTransactionsRepository.findByFilters(
                userId,
                filter.accountId(),
                filter.type(),
                filter.from(),
                filter.to(),
                PageRequest.of(filter.page(), filter.size())
        );

        return new TransactionsPage(
                page.getContent(),
                page.getTotalElements(),
                page.getNumber(),
                page.getSize(),
                page.getTotalPages()
        );
    }
}

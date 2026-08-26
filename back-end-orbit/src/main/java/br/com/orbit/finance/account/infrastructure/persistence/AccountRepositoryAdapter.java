package br.com.orbit.finance.account.infrastructure.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import br.com.orbit.finance.account.domain.Account;
import br.com.orbit.finance.account.domain.AccountRepository;

@Repository
public class AccountRepositoryAdapter implements AccountRepository {

    private final SpringDataAccountRepository springDataAccountRepository;

    public AccountRepositoryAdapter(SpringDataAccountRepository springDataAccountRepository) {
        this.springDataAccountRepository = springDataAccountRepository;
    }

    @Override
    public Account persist(Account account) {
        return springDataAccountRepository.save(account);
    }

    @Override
    public Optional<Account> findById(UUID id) {
        return springDataAccountRepository.findById(id);
    }

    @Override
    public List<Account> findByUserId(UUID userId) {
        return springDataAccountRepository.findAllByUserId(userId);
    }
}
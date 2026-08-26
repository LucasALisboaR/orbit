package br.com.orbit.finance.transactions.infrastructure.persistence;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.orbit.finance.transactions.domain.Transactions;
import br.com.orbit.finance.transactions.domain.Transactions.TransactionType;

public interface SpringDataTransactionsRepository extends JpaRepository<Transactions, UUID> {

    String FIND_BY_FILTERS =
            "SELECT t FROM Transactions t "
                    + "WHERE t.userId = :userId "
                    + "AND t.accountId IN ("
                    + "  SELECT a.id FROM Account a WHERE a.userId = :userId AND a.isActive = TRUE"
                    + "  AND (:accountId IS NULL OR a.id = :accountId)"
                    + ") "
                    + "AND (:type IS NULL OR t.type = :type) "
                    + "AND (:startDate IS NULL OR t.transactionDate >= :startDate) "
                    + "AND (:endDate IS NULL OR t.transactionDate <= :endDate) "
                    + "ORDER BY t.transactionDate DESC, t.createdAt DESC";

    String COUNT_BY_FILTERS =
            "SELECT COUNT(t) FROM Transactions t "
                    + "WHERE t.userId = :userId "
                    + "AND t.accountId IN ("
                    + "  SELECT a.id FROM Account a WHERE a.userId = :userId AND a.isActive = TRUE"
                    + "  AND (:accountId IS NULL OR a.id = :accountId)"
                    + ") "
                    + "AND (:type IS NULL OR t.type = :type) "
                    + "AND (:startDate IS NULL OR t.transactionDate >= :startDate) "
                    + "AND (:endDate IS NULL OR t.transactionDate <= :endDate)";

    @Query(value = FIND_BY_FILTERS, countQuery = COUNT_BY_FILTERS)
    Page<Transactions> findByFilters(
            @Param("userId") UUID userId,
            @Param("accountId") UUID accountId,
            @Param("type") TransactionType type,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);
}

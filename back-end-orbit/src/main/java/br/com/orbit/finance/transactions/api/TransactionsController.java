package br.com.orbit.finance.transactions.api;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.orbit.shared.api.AuthenticatedUserSupport;
import br.com.orbit.finance.transactions.application.dto.CreateTransactionsRequest;
import br.com.orbit.finance.transactions.application.dto.GetTransactionsFilterRequest;
import br.com.orbit.finance.transactions.application.dto.TransactionsPagePresenter;
import br.com.orbit.finance.transactions.application.dto.TransactionsPresenter;
import br.com.orbit.finance.transactions.application.usecase.CreateTransactionUseCase;
import br.com.orbit.finance.transactions.application.usecase.GetTransactionUseCase;
import br.com.orbit.finance.transactions.domain.TransactionsFilter;
import br.com.orbit.finance.transactions.domain.Transactions.TransactionType;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
public class TransactionsController {
    private final GetTransactionUseCase getTransactionUseCase;
    private final CreateTransactionUseCase createTransactionUseCase;

    public TransactionsController(GetTransactionUseCase getTransactionUseCase, CreateTransactionUseCase createTransactionUseCase) {
        this.getTransactionUseCase = getTransactionUseCase;
        this.createTransactionUseCase = createTransactionUseCase;
    }

    @GetMapping()
    public ResponseEntity<TransactionsPagePresenter> getTransactions(
            @RequestParam(required = false) UUID accountId,
            @RequestParam(required = false) TransactionType type,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(defaultValue = "" + TransactionsFilter.DEFAULT_PAGE) int page,
            @RequestParam(defaultValue = "" + TransactionsFilter.DEFAULT_SIZE) int size,
            Authentication authentication) {
        UUID userId = AuthenticatedUserSupport.userIdFrom(authentication);
        var filter = new GetTransactionsFilterRequest(accountId, type, from, to, page, size);
        return ResponseEntity.ok(getTransactionUseCase.execute(userId, filter));
    }

    @PostMapping()
    public ResponseEntity<TransactionsPresenter> createTransaction(
            @Valid @RequestBody CreateTransactionsRequest request,
            Authentication authentication) {
        TransactionsPresenter created = createTransactionUseCase.execute(
                AuthenticatedUserSupport.userIdFrom(authentication),
                request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}

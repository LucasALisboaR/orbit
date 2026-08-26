package br.com.orbit.finance.transactions.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.orbit.shared.api.AuthenticatedUserSupport;
import br.com.orbit.finance.transactions.application.dto.CreateTransactionsRequest;
import br.com.orbit.finance.transactions.application.dto.TransactionsPresenter;
import br.com.orbit.finance.transactions.application.usecase.CreateTransactionUseCase;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class TransactionsController {

    private final CreateTransactionUseCase createTransactionUseCase;

    public TransactionsController(CreateTransactionUseCase createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    @PostMapping("/transactions")
    public ResponseEntity<TransactionsPresenter> createTransaction(
            @Valid @RequestBody CreateTransactionsRequest request,
            Authentication authentication
    ) {
        TransactionsPresenter created = createTransactionUseCase.execute(
                AuthenticatedUserSupport.userIdFrom(authentication),
                request
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}

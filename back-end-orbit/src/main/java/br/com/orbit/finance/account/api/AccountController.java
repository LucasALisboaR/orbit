package br.com.orbit.finance.account.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.orbit.finance.account.application.dto.AccountPresenter;
import br.com.orbit.finance.account.application.dto.CreateAccountRequest;
import br.com.orbit.finance.account.application.usecase.CreateAccountUseCase;
import br.com.orbit.finance.shared.api.AuthenticatedUserSupport;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class AccountController {

    private final CreateAccountUseCase createAccountUseCase;

    public AccountController(CreateAccountUseCase createAccountUseCase) {
        this.createAccountUseCase = createAccountUseCase;
    }

    @PostMapping("/accounts")
    public ResponseEntity<AccountPresenter> create(
            @Valid @RequestBody CreateAccountRequest request,
            Authentication authentication
    ) {
        AccountPresenter created = createAccountUseCase.execute(
                AuthenticatedUserSupport.userIdFrom(authentication),
                request
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}

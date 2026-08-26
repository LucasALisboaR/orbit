package br.com.orbit.finance.account.api;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.orbit.finance.account.application.dto.AccountPresenter;
import br.com.orbit.finance.account.application.dto.CreateAccountRequest;
import br.com.orbit.finance.account.application.dto.DeleteAccountRequest;
import br.com.orbit.finance.account.application.dto.EditAccountBody;
import br.com.orbit.finance.account.application.dto.EditAccountRequest;
import br.com.orbit.finance.account.application.usecase.CreateAccountUseCase;
import br.com.orbit.finance.account.application.usecase.DeleteAccountUseCase;
import br.com.orbit.finance.account.application.usecase.EditAccountUseCase;
import br.com.orbit.finance.account.application.usecase.GetAccountsUserUseCase;

import br.com.orbit.shared.api.AuthenticatedUserSupport;
import br.com.orbit.shared.application.dto.MessageResponse;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api")
public class AccountController {

    private final CreateAccountUseCase createAccountUseCase;
    private final GetAccountsUserUseCase getAccountsUserUseCase;
    private final DeleteAccountUseCase deleteAccountUseCase;
    private final EditAccountUseCase editAccountUseCase;

    public AccountController(
            CreateAccountUseCase createAccountUseCase,
            GetAccountsUserUseCase getAccountsUserUseCase,
            DeleteAccountUseCase deleteAccountUseCase,
            EditAccountUseCase editAccountUseCase
    ) {
        this.createAccountUseCase = createAccountUseCase;
        this.getAccountsUserUseCase = getAccountsUserUseCase;
        this.deleteAccountUseCase = deleteAccountUseCase;
        this.editAccountUseCase = editAccountUseCase;
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountPresenter>> getUserAccounts(Authentication authentication) {
        List<AccountPresenter> accounts = getAccountsUserUseCase.execute(
                AuthenticatedUserSupport.userIdFrom(authentication));
        return ResponseEntity.ok(accounts);
    }

    @PutMapping("/accounts/{id}")
    public ResponseEntity<AccountPresenter> editAccount(
            @PathVariable UUID id,
            @Valid @RequestBody EditAccountBody body,
            Authentication authentication
    ) {
        AccountPresenter updated = editAccountUseCase.execute(
                new EditAccountRequest(id, body.name(), body.type()),
                AuthenticatedUserSupport.actorFrom(authentication)
        );
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/accounts/{id}")
    public ResponseEntity<MessageResponse> deleteAccount(
            @PathVariable UUID id,
            Authentication authentication) {
        deleteAccountUseCase.execute(
                new DeleteAccountRequest(id),
                AuthenticatedUserSupport.actorFrom(authentication));
        return ResponseEntity.ok(new MessageResponse("Conta deletada com sucesso"));
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

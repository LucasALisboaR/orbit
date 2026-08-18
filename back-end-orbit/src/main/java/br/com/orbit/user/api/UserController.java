package br.com.orbit.user.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.orbit.user.application.CreateUserUseCase;
import br.com.orbit.user.application.ForgotPasswordUseCase;
import br.com.orbit.user.application.LoginUserUseCase;
import br.com.orbit.user.application.dto.CreateUserRequest;
import br.com.orbit.user.application.dto.ForgotPasswordRequest;
import br.com.orbit.user.application.dto.LoginRequest;
import br.com.orbit.user.application.dto.MessageResponse;
import br.com.orbit.user.application.dto.UserPresenter;
import jakarta.validation.Valid;

/**
 * Camada: API / INTERFACE ADAPTERS (entrada HTTP)
 *
 * Traduz HTTP ↔ casos de uso.
 * Não contém regra de negócio: só valida entrada (@Valid), chama use case e devolve JSON.
 *
 * Endpoints alinhados às 3 telas do front:
 * - POST /api/users              → cadastro
 * - POST /api/auth/login         → login
 * - POST /api/auth/forgot-password → esqueci a senha
 */
@RestController
@RequestMapping("/api")
public class UserController {

    private final CreateUserUseCase createUserUseCase;
    private final LoginUserUseCase loginUserUseCase;
    private final ForgotPasswordUseCase forgotPasswordUseCase;

    public UserController(
            CreateUserUseCase createUserUseCase,
            LoginUserUseCase loginUserUseCase,
            ForgotPasswordUseCase forgotPasswordUseCase
    ) {
        this.createUserUseCase = createUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.forgotPasswordUseCase = forgotPasswordUseCase;
    }

    @PostMapping("/users")
    public ResponseEntity<UserPresenter> create(@Valid @RequestBody CreateUserRequest request) {
        UserPresenter created = createUserUseCase.execute(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UserPresenter> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(loginUserUseCase.execute(request));
    }

    @PostMapping("/auth/forgot-password")
    public ResponseEntity<MessageResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(forgotPasswordUseCase.execute(request));
    }
}

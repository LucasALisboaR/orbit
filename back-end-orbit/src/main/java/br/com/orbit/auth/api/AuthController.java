package br.com.orbit.auth.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.orbit.auth.application.dto.AuthResponse;
import br.com.orbit.auth.domain.TokenProvider;
import br.com.orbit.user.application.dto.ForgotPasswordRequest;
import br.com.orbit.user.application.dto.LoginRequest;
import br.com.orbit.user.application.dto.MessageResponse;
import br.com.orbit.user.application.dto.UserPresenter;
import br.com.orbit.user.application.usecase.ForgotPasswordUseCase;
import br.com.orbit.user.application.usecase.LoginUserUseCase;
import jakarta.validation.Valid;

/**
 * Camada: API (autenticação)
 *
 * - POST /api/auth/login            → JWT + UserPresenter
 * - POST /api/auth/forgot-password  → mensagem genérica
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final LoginUserUseCase loginUserUseCase;
    private final ForgotPasswordUseCase forgotPasswordUseCase;
    private final TokenProvider tokenProvider;

    public AuthController(
            LoginUserUseCase loginUserUseCase,
            ForgotPasswordUseCase forgotPasswordUseCase,
            TokenProvider tokenProvider
    ) {
        this.loginUserUseCase = loginUserUseCase;
        this.forgotPasswordUseCase = forgotPasswordUseCase;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        UserPresenter user = loginUserUseCase.execute(request);
        String accessToken = tokenProvider.generate(user.id(), user.email(), user.role().name());
        return ResponseEntity.ok(AuthResponse.bearer(accessToken, tokenProvider.expirationMs(), user));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<MessageResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(forgotPasswordUseCase.execute(request));
    }
}

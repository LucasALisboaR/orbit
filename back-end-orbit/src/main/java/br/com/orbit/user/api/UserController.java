package br.com.orbit.user.api;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.orbit.user.application.createUser.CreateUserUseCase;
import br.com.orbit.user.application.deleteUser.DeleteUserUseCase;
import br.com.orbit.user.application.dto.ActorRequest;
import br.com.orbit.user.application.dto.CreateUserRequest;
import br.com.orbit.user.application.dto.DeleteUserRequest;
import br.com.orbit.user.application.dto.GetUserRequest;
import br.com.orbit.user.application.dto.MessageResponse;
import br.com.orbit.user.application.dto.UserPresenter;
import br.com.orbit.user.application.getUser.GetUserUseCase;
import jakarta.validation.Valid;

/**
 * Camada: API / INTERFACE ADAPTERS (entrada HTTP — usuários)
 *
 * Auth (login / forgot-password) ficou em AuthController.
 *
 * Endpoints:
 * - POST   /api/users       → cadastro (público)
 * - GET    /api/users/{id}  → buscar (dono ou ADMIN)
 * - DELETE /api/users/{id}  → desativar (dono ou ADMIN)
 */
@RestController
@RequestMapping("/api")
public class UserController {

    private final CreateUserUseCase createUserUseCase;
    private final GetUserUseCase getUserUseCase;
    private final DeleteUserUseCase deleteUserUseCase;

    public UserController(
            CreateUserUseCase createUserUseCase,
            GetUserUseCase getUserUseCase,
            DeleteUserUseCase deleteUserUseCase
    ) {
        this.createUserUseCase = createUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }

    @PostMapping("/users")
    public ResponseEntity<UserPresenter> create(@Valid @RequestBody CreateUserRequest request) {
        UserPresenter created = createUserUseCase.execute(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserPresenter> getUser(@PathVariable UUID id, Authentication authentication) {
        UserPresenter user = getUserUseCase.execute(new GetUserRequest(id, actorFrom(authentication)));
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<MessageResponse> deleteUser(@PathVariable UUID id, Authentication authentication) {
        deleteUserUseCase.execute(new DeleteUserRequest(id, actorFrom(authentication)));
        return ResponseEntity.ok(new MessageResponse("Usuário deletado com sucesso"));
    }

    private ActorRequest actorFrom(Authentication authentication) {
        UUID actorId = UUID.fromString(authentication.getName());
        boolean admin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch("ROLE_ADMIN"::equals);
        return new ActorRequest(actorId, admin);
    }
}

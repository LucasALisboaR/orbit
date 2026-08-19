package br.com.orbit.user.api;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.orbit.user.application.ForbiddenException;

/**
 * Camada: API (tratamento de erros HTTP)
 *
 * Converte exceções de domínio/validação em respostas JSON amigáveis.
 * Mantém controllers limpos (Clean Code: um motivo para mudar).
 */
@RestControllerAdvice(basePackages = {
        "br.com.orbit.user.api",
        "br.com.orbit.auth.api"
})
public class UserExceptionHandler {

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<Map<String, Object>> handleForbidden(ForbiddenException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorBody(ex.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(errorBody(ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fields = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            fields.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        Map<String, Object> body = errorBody("Dados inválidos");
        body.put("fields", fields);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    private Map<String, Object> errorBody(String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", OffsetDateTime.now().toString());
        body.put("message", message);
        return body;
    }
}

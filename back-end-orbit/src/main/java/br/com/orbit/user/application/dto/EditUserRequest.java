package br.com.orbit.user.application.dto;

import br.com.orbit.user.domain.User.UserTheme;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record EditUserRequest(
        @Size(max = 50, message = "O nome deve ter no máximo 50 caracteres")
        String firstName,

        @Size(max = 50, message = "O sobrenome deve ter no máximo 50 caracteres")
        String lastName,

        @Email(message = "O email deve ser válido")
        String email,

        @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
        String password,

        UserTheme theme
) {
}

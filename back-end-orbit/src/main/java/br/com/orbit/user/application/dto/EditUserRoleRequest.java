package br.com.orbit.user.application.dto;
import br.com.orbit.user.domain.User.UserRole;
import jakarta.validation.constraints.NotNull;

public record EditUserRoleRequest(
        @NotNull UserRole role
) {
}
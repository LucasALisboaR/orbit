package br.com.orbit.finance.categories.application.dto;

import br.com.orbit.finance.categories.domain.Categories.CategoryType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateCategoriesByUserRequest(
        @NotBlank(message = "O nome é obrigatório")
        @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
        String name,

        @NotNull(message = "O tipo de categoria é obrigatório")
        CategoryType type
) {
}

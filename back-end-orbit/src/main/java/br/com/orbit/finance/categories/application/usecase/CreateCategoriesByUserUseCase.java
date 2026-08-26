package br.com.orbit.finance.categories.application.usecase;

import java.util.UUID;

import br.com.orbit.finance.categories.application.dto.CreateCategoriesByUserRequest;
import br.com.orbit.finance.categories.application.dto.CategoriesPresenter;

public interface CreateCategoriesByUserUseCase {
    CategoriesPresenter execute(UUID userId, CreateCategoriesByUserRequest request);
}

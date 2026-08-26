package br.com.orbit.finance.categories.application.usecase;

import java.util.List;
import java.util.UUID;

import br.com.orbit.finance.categories.application.dto.CategoriesPresenter;

public interface GetCategoriesAvailableToUserUseCase {
    List<CategoriesPresenter> execute(UUID userId);
}

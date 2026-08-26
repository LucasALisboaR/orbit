package br.com.orbit.finance.categories.application.usecase;

import java.util.List;

import br.com.orbit.finance.categories.application.dto.CategoriesPresenter;
import br.com.orbit.shared.application.dto.ActorRequest;

public interface GetCategoriesUseCase {
    List<CategoriesPresenter> execute(ActorRequest actor);
}

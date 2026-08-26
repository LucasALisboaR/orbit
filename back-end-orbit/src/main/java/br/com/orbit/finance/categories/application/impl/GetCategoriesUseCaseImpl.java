package br.com.orbit.finance.categories.application.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.finance.categories.application.dto.CategoriesPresenter;
import br.com.orbit.finance.categories.application.usecase.GetCategoriesAvailableToUserUseCase;
import br.com.orbit.finance.categories.application.usecase.GetCategoriesUseCase;
import br.com.orbit.finance.categories.domain.Categories;
import br.com.orbit.finance.categories.domain.CategoriesRepository;
import br.com.orbit.shared.application.AccessPolicy;
import br.com.orbit.shared.application.dto.ActorRequest;

@Service
public class GetCategoriesUseCaseImpl implements GetCategoriesUseCase{
    private final CategoriesRepository categoriesRepository;

    public GetCategoriesUseCaseImpl(CategoriesRepository categoriesRepository){
        this.categoriesRepository = categoriesRepository;
    }

    @Override
    @Transactional
    public List<CategoriesPresenter> execute(ActorRequest actor){
        AccessPolicy.requireAdmin(
            actor.id(),
            actor.admin(),
            "Você não tem permissão para acessar esta rota"
        );
        List <Categories> categories = categoriesRepository.findAllActiveAndIsSytemTrueAndUserId(actor.id());

        return categories.stream()
        .map(CategoriesPresenter::from)
        .collect(Collectors.toList());
    }

}

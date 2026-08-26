package br.com.orbit.finance.categories.application.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.finance.categories.application.dto.CategoriesPresenter;
import br.com.orbit.finance.categories.application.usecase.GetCategoriesAvailableToUserUseCase;
import br.com.orbit.finance.categories.domain.Categories;
import br.com.orbit.finance.categories.domain.CategoriesRepository;

@Service
public class GetCategoriesAvailableToUserUseCaseImpl implements GetCategoriesAvailableToUserUseCase{
    private final CategoriesRepository categoriesRepository;

    public GetCategoriesAvailableToUserUseCaseImpl(CategoriesRepository categoriesRepository){
        this.categoriesRepository = categoriesRepository;
    }

    @Override
    @Transactional
    public List<CategoriesPresenter> execute(UUID userId){
        List <Categories> categories = categoriesRepository.findAllActiveAndIsSytemTrueAndUserId(userId);

        return categories.stream()
        .map(CategoriesPresenter::from)
        .collect(Collectors.toList());
    }

}

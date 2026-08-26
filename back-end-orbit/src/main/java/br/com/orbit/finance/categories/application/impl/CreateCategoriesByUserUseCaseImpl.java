package br.com.orbit.finance.categories.application.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.finance.categories.application.dto.CategoriesPresenter;
import br.com.orbit.finance.categories.application.dto.CreateCategoriesByUserRequest;
import br.com.orbit.finance.categories.application.usecase.CreateCategoriesByUserUseCase;
import br.com.orbit.finance.categories.domain.Categories;
import br.com.orbit.finance.categories.domain.CategoriesRepository;
import br.com.orbit.user.domain.UserRepository;

@Service
public class CreateCategoriesByUserUseCaseImpl implements CreateCategoriesByUserUseCase {

    private final UserRepository userRepository;
    private final CategoriesRepository categoriesRepository;

    public CreateCategoriesByUserUseCaseImpl(UserRepository userRepository, CategoriesRepository categoriesRepository) {
        this.userRepository = userRepository;
        this.categoriesRepository = categoriesRepository;
    }

    @Override
    @Transactional
    public CategoriesPresenter execute(UUID userId, CreateCategoriesByUserRequest request) {
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if (categoriesRepository.existsByNameAndUserId(request.name().trim(), userId)) {
            throw new IllegalArgumentException("Categoria já existe");
        }

        Categories categories = Categories.createCategoryByUser(
                userId,
                request.name().trim(),
                request.type());
        Categories saved = categoriesRepository.persist(categories);
        return CategoriesPresenter.from(saved);
    }
}

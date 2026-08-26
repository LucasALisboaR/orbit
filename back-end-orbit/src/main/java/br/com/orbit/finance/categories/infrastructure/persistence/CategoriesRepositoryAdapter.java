package br.com.orbit.finance.categories.infrastructure.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import br.com.orbit.finance.categories.domain.Categories;
import br.com.orbit.finance.categories.domain.CategoriesRepository;

@Repository
public class CategoriesRepositoryAdapter implements CategoriesRepository {

    private final SpringDataCategoriesRepository springDataCategoriesRepository;

    public CategoriesRepositoryAdapter(SpringDataCategoriesRepository springDataCategoriesRepository) {
        this.springDataCategoriesRepository = springDataCategoriesRepository;
    }

    @Override
    public Categories persist(Categories categories) {
        return springDataCategoriesRepository.save(categories);
    }

    @Override
    public Optional<Categories> findById(UUID id) {
        return springDataCategoriesRepository.findById(id);
    }

    @Override
    public List<Categories> findAllActiveAndIsSytemTrueAndUserId(UUID userId) {
        return springDataCategoriesRepository.findAllVisibleToUser(userId);
    }

    @Override
    public List<Categories> findAll() {
        return springDataCategoriesRepository.findAll();
    }

    @Override
    public boolean existsByNameAndUserId(String name, UUID userId) {
        return springDataCategoriesRepository.existsByUserIdAndNameIgnoreCase(userId, name);
    }
}

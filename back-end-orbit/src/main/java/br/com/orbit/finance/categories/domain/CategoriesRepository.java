package br.com.orbit.finance.categories.domain;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoriesRepository {

    Categories persist(Categories categories);

    Optional<Categories> findById(UUID id);

    List<Categories> findAll();

    List<Categories> findAllActiveAndIsSytemTrueAndUserId(UUID userId);

    boolean existsByNameAndUserId(String name, UUID userId);
}

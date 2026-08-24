package br.com.orbit.finance.categories.infrastructure.persistence;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.orbit.finance.categories.domain.Categories;

public interface SpringDataCategoriesRepository extends JpaRepository<Categories, UUID> {

    List<Categories> findAllByUserId(UUID userId);

    boolean existsByUserIdAndNameIgnoreCase(UUID userId, String name);
}

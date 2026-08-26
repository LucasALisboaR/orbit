package br.com.orbit.finance.categories.infrastructure.persistence;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.orbit.finance.categories.domain.Categories;

public interface SpringDataCategoriesRepository extends JpaRepository<Categories, UUID> {

    List<Categories> findAllByUserId(UUID userId);

    boolean existsByUserIdAndNameIgnoreCase(UUID userId, String name);

    @Query("SELECT c FROM Categories c WHERE c.isActive = true AND (c.isSystem = true OR c.userId = :userId)")
    List<Categories> findAllVisibleToUser(@Param("userId") UUID userId);
}

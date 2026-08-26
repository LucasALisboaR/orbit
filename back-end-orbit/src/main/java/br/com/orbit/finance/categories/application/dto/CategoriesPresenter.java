package br.com.orbit.finance.categories.application.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

import br.com.orbit.finance.categories.domain.Categories;
import br.com.orbit.finance.categories.domain.Categories.CategoryType;

public record CategoriesPresenter(
    UUID id,
    UUID userId,
    String name,
    CategoryType type,
    boolean isSystem,
    boolean isActive,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
    public static CategoriesPresenter from(Categories categories) {
        return new CategoriesPresenter(
            categories.getId(),
            categories.getUserId(),
            categories.getName(),
            categories.getType(),
            categories.isSystem(),
            categories.isActive(),
            categories.getCreatedAt(),
            categories.getUpdatedAt()
        );
    }
}

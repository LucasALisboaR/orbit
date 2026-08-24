package br.com.orbit.finance.categories.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.orbit.finance.categories.application.dto.CategoriesPresenter;
import br.com.orbit.finance.categories.application.dto.CreateCategoriesByUserRequest;
import br.com.orbit.finance.categories.application.usecase.CreateCategoriesByUserUseCase;
import br.com.orbit.finance.shared.api.AuthenticatedUserSupport;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class CategoriesController {

    private final CreateCategoriesByUserUseCase createCategoriesByUserUseCase;

    public CategoriesController(CreateCategoriesByUserUseCase createCategoriesByUserUseCase) {
        this.createCategoriesByUserUseCase = createCategoriesByUserUseCase;
    }

    @PostMapping("/categories")
    public ResponseEntity<CategoriesPresenter> createByUser(
            @Valid @RequestBody CreateCategoriesByUserRequest request,
            Authentication authentication
    ) {
        CategoriesPresenter created = createCategoriesByUserUseCase.execute(
                AuthenticatedUserSupport.userIdFrom(authentication),
                request
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}

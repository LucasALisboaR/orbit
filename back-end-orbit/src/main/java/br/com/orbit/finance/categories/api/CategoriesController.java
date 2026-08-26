package br.com.orbit.finance.categories.api;

import java.util.List;

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
import br.com.orbit.finance.categories.application.usecase.GetCategoriesAvailableToUserUseCase;
import br.com.orbit.shared.api.AuthenticatedUserSupport;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/categories")
public class CategoriesController {

    private final CreateCategoriesByUserUseCase createCategoriesByUserUseCase;
    private final GetCategoriesAvailableToUserUseCase getCategoriesAvailableToUserUseCase;

    public CategoriesController(CreateCategoriesByUserUseCase createCategoriesByUserUseCase, GetCategoriesAvailableToUserUseCase getCategoriesAvailableToUserUseCase) {
        this.createCategoriesByUserUseCase = createCategoriesByUserUseCase;
        this.getCategoriesAvailableToUserUseCase = getCategoriesAvailableToUserUseCase;
    }

    @GetMapping("/avaliable-to-user")
    public ResponseEntity<List<CategoriesPresenter>> getCategoriesByUserAndSystem(Authentication authentication) {
        List<CategoriesPresenter> categories = getCategoriesAvailableToUserUseCase.execute(
                AuthenticatedUserSupport.userIdFrom(authentication));
        return ResponseEntity.ok(categories);
    }
    

    @PostMapping("")
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

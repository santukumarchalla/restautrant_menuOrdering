package com.app.restaurant_app.user.controller;

import com.app.restaurant_app.user.dto.UserCategoryDTO;
import com.app.restaurant_app.user.service.UserCategoryService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/categories")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class UserCategoryController {

    private final UserCategoryService categoryService;

    @GetMapping
    public List<UserCategoryDTO> getAllCategories() {
        return categoryService.getAllCategories();
    }
}
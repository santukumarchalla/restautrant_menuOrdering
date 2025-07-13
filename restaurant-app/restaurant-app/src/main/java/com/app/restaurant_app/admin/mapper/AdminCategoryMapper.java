package com.app.restaurant_app.admin.mapper;

import com.app.restaurant_app.admin.dto.CategoryDTO;
import com.app.restaurant_app.common.model.Category;

import org.springframework.stereotype.Component;

@Component
public class AdminCategoryMapper {
    public CategoryDTO toDto(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }

    public Category toEntity(CategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        return category;
    }
}
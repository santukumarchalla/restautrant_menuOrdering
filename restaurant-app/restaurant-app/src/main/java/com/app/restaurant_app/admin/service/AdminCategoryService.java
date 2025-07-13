package com.app.restaurant_app.admin.service;

import com.app.restaurant_app.admin.dto.CategoryDTO;
import java.util.List;

public interface AdminCategoryService {
    CategoryDTO addCategory(CategoryDTO categoryDTO);
    void deleteCategory(Long categoryId);
    List<CategoryDTO> getAllCategories();
}


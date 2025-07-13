package com.app.restaurant_app.admin.service;

import com.app.restaurant_app.admin.dto.CategoryDTO;
import com.app.restaurant_app.admin.mapper.AdminCategoryMapper;
import com.app.restaurant_app.admin.repos.AdminMenuItemRepository;
import com.app.restaurant_app.admin.repos.CategoryRepository;
import com.app.restaurant_app.common.exception.BadRequestException;
import com.app.restaurant_app.common.exception.ResourceNotFoundException;
import com.app.restaurant_app.common.model.Category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminCategoryServiceImpl implements AdminCategoryService {

    private final CategoryRepository categoryRepo;
    private final AdminMenuItemRepository menuItemRepository;
    private final AdminCategoryMapper categoryMapper;

    @Override
    public CategoryDTO addCategory(CategoryDTO categoryDTO) {
        Category category = categoryMapper.toEntity(categoryDTO);
        return categoryMapper.toDto(categoryRepo.save(category));
    }

    @Override
    public void deleteCategory(Long categoryId) {
        // First check if category exists
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        
        // Check if any menu items exist under this category
        if (menuItemRepository.existsByCategoryId(categoryId)) {
            throw new BadRequestException("Cannot delete category. Menu items exist under this category.");
        }
        
        // If safe, delete category
        categoryRepo.delete(category);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepo.findAll()
                .stream()
                .map(categoryMapper::toDto)
                .collect(Collectors.toList());
    }
}

package com.app.restaurant_app.admin.service;

import com.app.restaurant_app.admin.dto.MenuItemDTO;
import com.app.restaurant_app.admin.mapper.AdminMenuItemMapper;
import com.app.restaurant_app.admin.repos.AdminMenuItemRepository;
import com.app.restaurant_app.admin.repos.CategoryRepository;
import com.app.restaurant_app.common.exception.ResourceNotFoundException;
import com.app.restaurant_app.common.model.Category;
import com.app.restaurant_app.common.model.MenuItem;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminMenuItemServiceImpl implements AdminMenuItemService {

    private final AdminMenuItemRepository menuItemRepo;
    private final CategoryRepository categoryRepo;
    private final AdminMenuItemMapper menuItemMapper;

    @Override
    public MenuItemDTO addMenuItem(MenuItemDTO dto) {
        Category category = categoryRepo.findById(dto.getCategoryId())
            .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        MenuItem item = menuItemMapper.toEntity(dto);
        item.setCategory(category);
        return menuItemMapper.toDto(menuItemRepo.save(item));
    }

    @Override
    public void deleteMenuItem(Long id) {
        if (!menuItemRepo.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found");
        }
        menuItemRepo.deleteById(id);
    }

    @Override
    public MenuItemDTO updateMenuItem(Long id, MenuItemDTO dto) {
        MenuItem item = menuItemRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));

        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        item.setAvailable(dto.isAvailable());
        item.setImageUrl(dto.getImageUrl());

        return menuItemMapper.toDto(menuItemRepo.save(item));
    }

    @Override
    public List<MenuItemDTO> getMenuItemsByCategory(Long categoryId) {
        if (!categoryRepo.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found");
        }

        return menuItemRepo.findByCategoryId(categoryId)
                .stream()
                .map(menuItemMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void updateAvailability(Long itemId, boolean available) {
        MenuItem item = menuItemRepo.findById(itemId)
            .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + itemId));
        item.setAvailable(available);
        menuItemRepo.save(item);
    }
    
    @Override
    public List<MenuItemDTO> getItemsByCategoryId(Long categoryId) {
        List<MenuItem> items = menuItemRepo.findByCategoryId(categoryId);
        return items.stream()
                    .map(menuItemMapper::toDto)
                    .collect(Collectors.toList());
    }
}
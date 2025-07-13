package com.app.restaurant_app.admin.service;

import com.app.restaurant_app.admin.dto.MenuItemDTO;

import java.util.List;

public interface AdminMenuItemService {
    MenuItemDTO addMenuItem(MenuItemDTO dto);
    void deleteMenuItem(Long id);
    MenuItemDTO updateMenuItem(Long id, MenuItemDTO dto);
    List<MenuItemDTO> getMenuItemsByCategory(Long categoryId);
    void updateAvailability(Long itemId, boolean available);
    List<MenuItemDTO> getItemsByCategoryId(Long categoryId);
}
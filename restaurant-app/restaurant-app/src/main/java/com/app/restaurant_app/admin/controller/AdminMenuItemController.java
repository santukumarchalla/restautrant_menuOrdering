package com.app.restaurant_app.admin.controller;

import com.app.restaurant_app.admin.dto.MenuItemDTO;
import com.app.restaurant_app.admin.service.AdminMenuItemService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/menu")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminMenuItemController {

    private final AdminMenuItemService menuItemService;

    @PostMapping("/items")
    public MenuItemDTO addMenuItem(@RequestBody MenuItemDTO dto) {
        return menuItemService.addMenuItem(dto);
    }

    @DeleteMapping("/items/{id}")
    public String deleteMenuItem(@PathVariable("id") Long id) {
        menuItemService.deleteMenuItem(id);
        return "Menu item deleted successfully";
    }

    @PutMapping("/items/{id}")
    public MenuItemDTO updateMenuItem(@PathVariable("id") Long id, @RequestBody MenuItemDTO dto) {
        return menuItemService.updateMenuItem(id, dto);
    }

    @GetMapping("/items/by-category/{categoryId}")
    public List<MenuItemDTO> getItemsByCategory(@PathVariable("categoryId") Long categoryId) {
        return menuItemService.getMenuItemsByCategory(categoryId);
    }

    @PatchMapping("/items/{id}/availability")
    public String updateAvailability(@PathVariable("id") Long id, @RequestParam("available") boolean available) {
        menuItemService.updateAvailability(id, available);
        return "Availability updated successfully";
    }
}
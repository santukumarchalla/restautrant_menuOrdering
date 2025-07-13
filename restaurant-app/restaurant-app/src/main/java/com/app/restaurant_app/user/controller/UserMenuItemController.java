package com.app.restaurant_app.user.controller;

import com.app.restaurant_app.user.dto.UserMenuItemDTO;
import com.app.restaurant_app.user.service.UserMenuItemService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/menu")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class UserMenuItemController {

    private final UserMenuItemService menuItemService;

    @GetMapping("/category/{categoryId}")
    public List<UserMenuItemDTO> getAvailableItemsByCategory(@PathVariable("categoryId") Long categoryId) {
        return menuItemService.getAvailableItemsByCategory(categoryId);
    }
}

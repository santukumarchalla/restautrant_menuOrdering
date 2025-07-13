package com.app.restaurant_app.user.service;

import com.app.restaurant_app.user.dto.UserMenuItemDTO;
import java.util.List;

public interface UserMenuItemService {
    List<UserMenuItemDTO> getAvailableItemsByCategory(Long categoryId);
}
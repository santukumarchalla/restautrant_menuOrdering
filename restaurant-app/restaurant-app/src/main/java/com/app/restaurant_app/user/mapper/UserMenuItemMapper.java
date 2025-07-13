package com.app.restaurant_app.user.mapper;

import com.app.restaurant_app.common.model.MenuItem;
import com.app.restaurant_app.user.dto.UserMenuItemDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMenuItemMapper {
    public UserMenuItemDTO toDto(MenuItem item) {
        UserMenuItemDTO dto = new UserMenuItemDTO();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setDescription(item.getDescription());
        dto.setPrice(item.getPrice());
        dto.setImageUrl(item.getImageUrl());
        return dto;
    }
}
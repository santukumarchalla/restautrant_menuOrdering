package com.app.restaurant_app.admin.mapper;

import com.app.restaurant_app.admin.dto.MenuItemDTO;
import com.app.restaurant_app.common.model.MenuItem;

import org.springframework.stereotype.Component;

@Component
public class AdminMenuItemMapper {

    public MenuItemDTO toDto(MenuItem item) {
        return MenuItemDTO.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .available(item.isAvailable())
                .categoryId(item.getCategory().getId())
                .imageUrl(item.getImageUrl())
                .build();
    }

    public MenuItem toEntity(MenuItemDTO dto) {
        MenuItem item = new MenuItem();
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        item.setAvailable(dto.isAvailable());
        item.setImageUrl(dto.getImageUrl());
        return item;
    }
}
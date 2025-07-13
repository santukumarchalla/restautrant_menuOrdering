package com.app.restaurant_app.user.service;

import com.app.restaurant_app.user.repos.MenuItemRepository;
import com.app.restaurant_app.common.model.MenuItem;
import com.app.restaurant_app.user.dto.UserMenuItemDTO;
import com.app.restaurant_app.user.mapper.UserMenuItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserMenuItemServiceImpl implements UserMenuItemService {

    private final MenuItemRepository menuItemRepo;
    private final UserMenuItemMapper mapper;

    @Override
    public List<UserMenuItemDTO> getAvailableItemsByCategory(Long categoryId) {
        List<MenuItem> items = menuItemRepo.findByCategoryIdAndAvailableTrue(categoryId);
        return items.stream().map(mapper::toDto).collect(Collectors.toList());
    }
}
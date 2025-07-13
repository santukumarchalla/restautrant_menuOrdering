package com.app.restaurant_app.user.mapper;

import com.app.restaurant_app.common.model.Category;
import com.app.restaurant_app.user.dto.UserCategoryDTO;
import org.springframework.stereotype.Component;

@Component
public class UserCategoryMapper {
    public UserCategoryDTO toDto(Category category) {
        UserCategoryDTO dto = new UserCategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }
}

package com.app.restaurant_app.user.service;

import com.app.restaurant_app.user.dto.UserCategoryDTO;
import java.util.List;

public interface UserCategoryService {
    List<UserCategoryDTO> getAllCategories();
}
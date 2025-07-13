package com.app.restaurant_app.user.service;

import com.app.restaurant_app.user.repos.UserCategoryRepository;
import com.app.restaurant_app.user.dto.UserCategoryDTO;
import com.app.restaurant_app.user.mapper.UserCategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserCategoryServiceImpl implements UserCategoryService {

    private final UserCategoryRepository categoryRepo;
    private final UserCategoryMapper categoryMapper;

    @Override
    public List<UserCategoryDTO> getAllCategories() {
        return categoryRepo.findAll()
                .stream()
                .map(categoryMapper::toDto)
                .collect(Collectors.toList());
    }
}

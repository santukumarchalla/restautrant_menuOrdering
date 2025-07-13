package com.app.restaurant_app.admin.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.restaurant_app.common.model.MenuItem;

import java.util.List;

@Repository
public interface AdminMenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategoryId(Long categoryId);
    boolean existsByCategoryId(Long categoryId);
}
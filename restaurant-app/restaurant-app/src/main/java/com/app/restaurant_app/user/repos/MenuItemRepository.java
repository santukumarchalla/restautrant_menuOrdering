package com.app.restaurant_app.user.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.restaurant_app.common.model.MenuItem;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long>{
	List<MenuItem> findByCategoryIdAndAvailableTrue(Long categoryId);
}

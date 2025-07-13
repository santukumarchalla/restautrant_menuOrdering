package com.app.restaurant_app.user.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.restaurant_app.common.model.Category;

@Repository
public interface UserCategoryRepository extends JpaRepository<Category, Long>{

}

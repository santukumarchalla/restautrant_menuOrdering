package com.app.restaurant_app.user.repos;

import com.app.restaurant_app.user.model.Cart;
import com.app.restaurant_app.common.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(AppUser user);
}

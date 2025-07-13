package com.app.restaurant_app.user.repos;

import com.app.restaurant_app.user.model.CartLineItem;

import com.app.restaurant_app.user.model.Cart;
import com.app.restaurant_app.common.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartLineItem, Long> {
    Optional<CartLineItem> findByCartAndMenuItem(Cart cart, MenuItem menuItem);
    Optional<CartLineItem> findByCartAndMenuItemId(Cart cart, Long menuItemId);


    }
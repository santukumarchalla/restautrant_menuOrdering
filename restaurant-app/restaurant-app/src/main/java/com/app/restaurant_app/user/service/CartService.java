package com.app.restaurant_app.user.service;

import java.util.List;

import com.app.restaurant_app.user.dto.CartItemDTO;
import com.app.restaurant_app.user.dto.CartSummaryDTO;

public interface CartService {

    List<CartItemDTO> getCartItems(Long userId);

    CartSummaryDTO getCartSummary(Long userId);

    CartItemDTO addItem(Long userId, Long itemId);

    CartItemDTO increaseQuantity(Long userId, Long itemId);

    CartItemDTO decreaseQuantity(Long userId, Long itemId);

   // void removeItemCompletely(Long userId, Long itemId);
}
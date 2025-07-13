package com.app.restaurant_app.user.mapper;

import org.springframework.stereotype.Component;

import com.app.restaurant_app.common.model.MenuItem;
import com.app.restaurant_app.user.dto.CartItemDTO;
import com.app.restaurant_app.user.model.Cart;
import com.app.restaurant_app.user.model.CartLineItem;

@Component
public class CartItemMapper {

    public CartItemDTO toDto(CartLineItem cartItem) {
        return CartItemDTO.builder()
            .id(cartItem.getId())
            .userId(cartItem.getCart().getUser().getId())
            .menuItemId(cartItem.getMenuItem().getId())
            .menuItemName(cartItem.getMenuItem().getName())
            .unitPrice(cartItem.getUnitPrice())
            .quantity(cartItem.getQuantity())
            .totalPrice(cartItem.getTotalPrice())
            .build();
    }

    public CartLineItem toEntity(CartItemDTO dto, Cart cart, MenuItem menuItem) {
        return CartLineItem.builder()
            .id(dto.getId())
            .cart(cart)
            .menuItem(menuItem)
            .quantity(dto.getQuantity())
            .unitPrice(dto.getUnitPrice())
            .totalPrice(dto.getTotalPrice())
            .build();
    }
}
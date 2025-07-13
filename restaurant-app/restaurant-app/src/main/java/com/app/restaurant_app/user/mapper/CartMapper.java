package com.app.restaurant_app.user.mapper;

import com.app.restaurant_app.user.dto.CartItemDTO;
import com.app.restaurant_app.user.dto.CartItemSummaryDTO;
import com.app.restaurant_app.user.dto.CartSummaryDTO;
import com.app.restaurant_app.user.model.Cart;
import com.app.restaurant_app.user.model.CartLineItem;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class CartMapper {

    public CartItemDTO toItemDto(CartLineItem item) {
        return CartItemDTO.builder()
            .id(item.getId())
            .userId(item.getCart().getUser().getId())
            .menuItemId(item.getMenuItem().getId())
            .menuItemName(item.getMenuItem().getName())
            .unitPrice(item.getUnitPrice())
            .quantity(item.getQuantity())
            .totalPrice(item.getTotalPrice())
            .build();
    }

    public CartSummaryDTO toSummaryDto(Cart cart) {
        List<CartItemSummaryDTO> items = cart.getItems().stream()
            .map(item -> new CartItemSummaryDTO(
                item.getMenuItem().getName(),
                item.getUnitPrice(),
                item.getQuantity(),
                item.getTotalPrice()
            )).toList();

        double total = items.stream().mapToDouble(CartItemSummaryDTO::getSubtotal).sum();
        return new CartSummaryDTO(items, total);
    }
}
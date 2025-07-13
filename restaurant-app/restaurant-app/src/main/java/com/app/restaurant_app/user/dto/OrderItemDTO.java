package com.app.restaurant_app.user.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private Long menuItemId;
    private String menuItemName;
    private int quantity;
    private double price;
    private double subtotal;
}

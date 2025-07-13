package com.app.restaurant_app.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemSummaryDTO {
    private String itemName;
    private double price;
    private int quantity;
    private double subtotal;
}
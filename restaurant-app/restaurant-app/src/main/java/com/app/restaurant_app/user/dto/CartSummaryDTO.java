package com.app.restaurant_app.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartSummaryDTO {
    private List<CartItemSummaryDTO> items;
    private double totalAmount;
}
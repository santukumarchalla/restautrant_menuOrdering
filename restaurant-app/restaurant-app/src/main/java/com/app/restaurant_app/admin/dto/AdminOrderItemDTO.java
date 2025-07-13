package com.app.restaurant_app.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminOrderItemDTO {
    private Long id;
    private Long menuItemId;
    private String menuItemName;
    private int quantity;
    private double price;
}
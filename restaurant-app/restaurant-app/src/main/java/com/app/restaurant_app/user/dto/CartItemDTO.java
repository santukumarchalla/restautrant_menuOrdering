package com.app.restaurant_app.user.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CartItemDTO {
    private Long id;
    private Long userId;
    private Long menuItemId;
    private String menuItemName;
    private double unitPrice;
    private int quantity;
    private double totalPrice;
}
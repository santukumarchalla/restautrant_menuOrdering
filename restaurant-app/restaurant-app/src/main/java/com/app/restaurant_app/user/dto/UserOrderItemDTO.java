package com.app.restaurant_app.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserOrderItemDTO {
    private String menuItemName;
    private int quantity;
    private double subtotal;
}

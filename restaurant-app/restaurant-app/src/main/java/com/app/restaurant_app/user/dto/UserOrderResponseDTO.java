package com.app.restaurant_app.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserOrderResponseDTO {
    private Long orderId;
    private String paymentMethod;
    private String status;
    private double totalAmount;
    private List<OrderItemDTO> items;
    private String paymentStatus;
}

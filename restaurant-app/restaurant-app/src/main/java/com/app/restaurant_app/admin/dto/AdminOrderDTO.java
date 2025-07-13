package com.app.restaurant_app.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminOrderDTO {
    private Long id;
    private String userEmail;
    private double totalAmount;
    private String status;
    private List<AdminOrderItemDTO> items;
}

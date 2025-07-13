package com.app.restaurant_app.user.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserOrderHistoryDTO {
    private Long orderId;
    private List<String> items;
    private Double totalAmount;
    private String paymentStatus;
    private List<UserOrderItemDTO> itemsDetailed;
}

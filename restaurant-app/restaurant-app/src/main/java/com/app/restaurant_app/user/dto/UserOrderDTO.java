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
public class UserOrderDTO {
    private Long userId;
    private List<Long> itemIds;
    private String paymentMethod;
}
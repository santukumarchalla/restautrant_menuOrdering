package com.app.restaurant_app.user.dto;

import lombok.Data;

@Data
public class PaymentConfirmationDTO {
    private Long orderId;
    private String paymentReference; // optional field to store payment txn ID
}
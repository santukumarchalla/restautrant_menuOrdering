package com.app.restaurant_app.user.service;

import java.util.List;

import com.app.restaurant_app.user.dto.PaymentConfirmationDTO;
import com.app.restaurant_app.user.dto.UserOrderDTO;
import com.app.restaurant_app.user.dto.UserOrderResponseDTO;
import com.app.restaurant_app.user.dto.UserOrderHistoryDTO;

public interface UserOrderService {
    UserOrderResponseDTO placeOrder(UserOrderDTO userOrderDTO);
    List<UserOrderHistoryDTO> getOrderHistory(Long userId);
    UserOrderResponseDTO confirmPayment(PaymentConfirmationDTO dto);
}
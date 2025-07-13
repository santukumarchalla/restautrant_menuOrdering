package com.app.restaurant_app.user.controller;

import com.app.restaurant_app.user.dto.UserOrderDTO;
import com.app.restaurant_app.user.dto.UserOrderResponseDTO;
import com.app.restaurant_app.user.dto.UserOrderHistoryDTO;
import com.app.restaurant_app.user.service.UserOrderService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class UserOrderController {

    private final UserOrderService orderService;

    @PostMapping
    public UserOrderResponseDTO placeOrder(@RequestBody UserOrderDTO userOrderDTO) {
        return orderService.placeOrder(userOrderDTO);
    }
    
    @GetMapping("/history/{userId}")
    public List<UserOrderHistoryDTO> getOrderhistory(@PathVariable("userId") Long userId) {
        return orderService.getOrderHistory(userId);
    }
}
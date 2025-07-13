package com.app.restaurant_app.admin.service;

import com.app.restaurant_app.admin.dto.AdminOrderDTO;

import java.util.List;

import org.springframework.data.domain.Page;

public interface AdminOrderService {
    List<AdminOrderDTO> getAllOrders();
    AdminOrderDTO approveOrder(Long orderId);
    AdminOrderDTO denyOrder(Long orderId);
	Page<AdminOrderDTO> getPaginatedOrders(int page, int size, String sortBy);
}

package com.app.restaurant_app.admin.service;

import com.app.restaurant_app.admin.dto.AdminOrderDTO;
import com.app.restaurant_app.admin.mapper.AdminOrderMapper;
import com.app.restaurant_app.admin.repos.AdminOrderRepository;
import com.app.restaurant_app.common.exception.ResourceNotFoundException;
import com.app.restaurant_app.common.model.Order;
import com.app.restaurant_app.common.model.OrderStatus;
import com.app.restaurant_app.common.model.PaymentStatus;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService {

    private final AdminOrderRepository orderRepo;
    private final AdminOrderMapper orderMapper;

    @Override
    public List<AdminOrderDTO> getAllOrders() {
        return orderRepo.findAll()
                .stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public AdminOrderDTO approveOrder(Long orderId) {
    	 Order order = getOrder(orderId);
    	    order.setOrderStatus(OrderStatus.APPROVED);
    	    order.setPaymentStatus(PaymentStatus.PAID);  // update payment status also
    	    return orderMapper.toDto(orderRepo.save(order));
    }

    @Override
    public AdminOrderDTO denyOrder(Long orderId) {
    	Order order = getOrder(orderId);
        order.setOrderStatus(OrderStatus.REJECTED);
        order.setPaymentStatus(PaymentStatus.FAILED);  // update payment status also
        return orderMapper.toDto(orderRepo.save(order));
    }

    private Order getOrder(Long orderId) {
        return orderRepo.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
    }
    
    @Override
    public Page<AdminOrderDTO> getPaginatedOrders(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return orderRepo.findByOrderStatus(OrderStatus.PENDING, pageable)
                        .map(orderMapper::toDto);
    }

}
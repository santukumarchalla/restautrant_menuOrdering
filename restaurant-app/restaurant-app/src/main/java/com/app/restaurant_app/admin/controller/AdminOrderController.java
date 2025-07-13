package com.app.restaurant_app.admin.controller;

import com.app.restaurant_app.admin.dto.AdminOrderDTO;
import com.app.restaurant_app.admin.service.AdminOrderService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminOrderController {

    private final AdminOrderService orderService;
    
    
    @GetMapping
    public List<AdminOrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/{id}/approve")
    public AdminOrderDTO approveOrder(@PathVariable("id") Long id) {
        return orderService.approveOrder(id);
    }

    @PutMapping("/{id}/deny")
    public AdminOrderDTO denyOrder(@PathVariable("id") Long id) {
        return orderService.denyOrder(id);
    }
    
    @GetMapping("/paginated")
    public Page<AdminOrderDTO> getPaginatedOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        return orderService.getPaginatedOrders(page, size, sortBy);
    }

}

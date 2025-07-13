package com.app.restaurant_app.common.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.restaurant_app.common.model.Order;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Optional: Get orders by user ID (for user's order history)
    List<Order> findByUserId(Long userId);

    // Optional: Get orders by status (for admin filtering)
    List<Order> findByPaymentStatus(String status);

}
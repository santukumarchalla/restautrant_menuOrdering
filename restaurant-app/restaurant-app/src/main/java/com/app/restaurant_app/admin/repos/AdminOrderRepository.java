package com.app.restaurant_app.admin.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.restaurant_app.common.model.Order;
import com.app.restaurant_app.common.model.OrderStatus;

public interface AdminOrderRepository extends JpaRepository<Order, Long>{
	 Page<Order> findByOrderStatus(OrderStatus status, Pageable pageable);
}

package com.app.restaurant_app.admin.mapper;

import com.app.restaurant_app.admin.dto.AdminOrderDTO;
import com.app.restaurant_app.admin.dto.AdminOrderItemDTO;
import com.app.restaurant_app.common.model.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AdminOrderMapper {

	public AdminOrderDTO toDto(Order order) {
	    AdminOrderDTO dto = new AdminOrderDTO();
	    dto.setId(order.getId());
	    dto.setUserEmail(order.getUser().getEmail());
	    dto.setTotalAmount(order.getTotalAmount());
	    dto.setStatus(order.getOrderStatus().name());

	    List<AdminOrderItemDTO> itemDTOs = order.getOrderItems().stream()
	        .map(item -> new AdminOrderItemDTO(
	            item.getId(),
	            item.getMenuItem().getId(),
	            item.getMenuItem().getName(),
	            item.getQuantity(),
	            item.getPrice()
	        ))
	        .collect(Collectors.toList());

	    dto.setItems(itemDTOs);
	    return dto;
	}



//    private AdminOrderItemDTO toItemDto(OrderLineItem item) {
//        AdminOrderItemDTO dto = new AdminOrderItemDTO();
//        dto.setId(item.getId());
//        dto.setMenuItemId(item.getMenuItem().getId());
//        dto.setQuantity(item.getQuantity());
//        dto.setPrice(item.getPrice());
//        return dto;
//    }
}

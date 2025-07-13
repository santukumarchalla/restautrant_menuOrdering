package com.app.restaurant_app.user.mapper;

import com.app.restaurant_app.common.model.Order;
import com.app.restaurant_app.common.model.OrderLineItem;
import com.app.restaurant_app.user.dto.OrderItemDTO;
import com.app.restaurant_app.user.dto.UserOrderHistoryDTO;
import com.app.restaurant_app.user.dto.UserOrderItemDTO;
import com.app.restaurant_app.user.dto.UserOrderResponseDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    public UserOrderResponseDTO toDto(Order order) {
        UserOrderResponseDTO dto = new UserOrderResponseDTO();
        dto.setOrderId(order.getId());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setStatus(order.getOrderStatus().name());
        dto.setPaymentStatus(order.getPaymentStatus().name());
        dto.setTotalAmount(order.getTotalAmount());

        List<OrderItemDTO> itemDTOs = order.getOrderItems().stream()
                .map(this::toItemDto)
                .collect(Collectors.toList());
        dto.setItems(itemDTOs);
        return dto;
    }

    public OrderItemDTO toItemDto(OrderLineItem orderItem) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setMenuItemId(orderItem.getMenuItem().getId());
        dto.setMenuItemName(orderItem.getMenuItem().getName());
        dto.setQuantity(orderItem.getQuantity());
        dto.setPrice(orderItem.getPrice());
        dto.setSubtotal(orderItem.getTotalAmount());
        return dto;
    }

    public UserOrderHistoryDTO toHistoryDto(Order order) {
        UserOrderHistoryDTO dto = new UserOrderHistoryDTO();
        dto.setOrderId(order.getId());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setPaymentStatus(order.getPaymentStatus().name());

        // Existing: just names
        List<String> itemNames = order.getOrderItems().stream()
                .map(orderItem -> orderItem.getMenuItem().getName())
                .collect(Collectors.toList());
        dto.setItems(itemNames);

        // ✅ New: full details
        List<UserOrderItemDTO> detailedItems = order.getOrderItems().stream()
                .map(orderItem -> {
                    UserOrderItemDTO itemDTO = new UserOrderItemDTO();
                    itemDTO.setMenuItemName(orderItem.getMenuItem().getName());
                    itemDTO.setQuantity(orderItem.getQuantity());
                    itemDTO.setSubtotal(orderItem.getTotalAmount());
                    return itemDTO;
                })
                .collect(Collectors.toList());
        dto.setItemsDetailed(detailedItems);

        return dto;
}
}

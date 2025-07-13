package com.app.restaurant_app.user.service;

import com.app.restaurant_app.common.exception.BadRequestException;
import com.app.restaurant_app.common.exception.ResourceNotFoundException;
import com.app.restaurant_app.common.model.AppUser;
import com.app.restaurant_app.common.model.Order;
import com.app.restaurant_app.common.model.OrderLineItem;
import com.app.restaurant_app.common.model.OrderStatus;
import com.app.restaurant_app.common.model.PaymentStatus;
import com.app.restaurant_app.common.repos.AppUserRepository;
import com.app.restaurant_app.common.repos.OrderRepository;
import com.app.restaurant_app.user.repos.CartRepository;
import com.app.restaurant_app.user.dto.PaymentConfirmationDTO;
import com.app.restaurant_app.user.dto.UserOrderDTO;
import com.app.restaurant_app.user.dto.UserOrderResponseDTO;
import com.app.restaurant_app.user.dto.UserOrderHistoryDTO;
import com.app.restaurant_app.user.mapper.OrderMapper;
import com.app.restaurant_app.user.model.Cart;
import com.app.restaurant_app.user.model.CartLineItem;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserOrderServiceImpl implements UserOrderService {

    private final OrderRepository orderRepo;
    private final OrderMapper orderMapper;
    private final AppUserRepository userRepo;
    private final CartRepository cartRepo;

    @Override
    public UserOrderResponseDTO placeOrder(UserOrderDTO userOrderDTO) {
        Long userId = userOrderDTO.getUserId();
        List<Long> itemIds = userOrderDTO.getItemIds();

        if (itemIds == null || itemIds.isEmpty()) {
            throw new BadRequestException("No items selected for order");
        }

        AppUser user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Cart cart = cartRepo.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        List<CartLineItem> cartItems = cart.getItems();

        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        List<CartLineItem> selectedItems = cartItems.stream()
                .filter(item -> itemIds.contains(item.getMenuItem().getId()))
                .collect(Collectors.toList());

        if (selectedItems.isEmpty()) {
            throw new BadRequestException("Selected items not found in cart");
        }

        List<OrderLineItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (CartLineItem cartItem : selectedItems) {
            double price = cartItem.getMenuItem().getPrice();
            double subtotal = price * cartItem.getQuantity();
            totalAmount += subtotal;

            OrderLineItem orderItem = OrderLineItem.builder()
                    .menuItem(cartItem.getMenuItem())
                    .quantity(cartItem.getQuantity())
                    .price(price)
                    .totalAmount(subtotal)
                    .build();

            orderItems.add(orderItem);
        }

        Order order = Order.builder()
        	    .user(user)
        	    .userEmail(user.getEmail())
        	    .orderStatus(OrderStatus.PENDING)
        	    .paymentStatus(PaymentStatus.PENDING)
        	    .paymentMethod(userOrderDTO.getPaymentMethod())
        	    .totalAmount(totalAmount)
        	    .orderItems(orderItems)
        	    .build();

        orderItems.forEach(item -> item.setOrder(order));

        orderRepo.save(order);

        // Remove selected items from cart
        cart.getItems().removeIf(item -> itemIds.contains(item.getMenuItem().getId()));
        cartRepo.save(cart);

        return orderMapper.toDto(order);
    }

    @Override
    public List<UserOrderHistoryDTO> getOrderHistory(Long userId) {
        return orderRepo.findByUserId(userId).stream()
                .map(orderMapper::toHistoryDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserOrderResponseDTO confirmPayment(PaymentConfirmationDTO dto) {
        Order order = orderRepo.findById(dto.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (order.getPaymentStatus() == PaymentStatus.PAID) {
            throw new BadRequestException("Payment already confirmed");
        }

        order.setPaymentStatus(PaymentStatus.PAID);
        Order updatedOrder = orderRepo.save(order);

        return orderMapper.toDto(updatedOrder);
    }
}

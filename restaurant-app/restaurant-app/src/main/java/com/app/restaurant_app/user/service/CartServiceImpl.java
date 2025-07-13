package com.app.restaurant_app.user.service;

import com.app.restaurant_app.common.exception.ResourceNotFoundException;
import com.app.restaurant_app.common.model.AppUser;
import com.app.restaurant_app.common.model.MenuItem;
import com.app.restaurant_app.common.repos.AppUserRepository;
import com.app.restaurant_app.user.model.Cart;
import com.app.restaurant_app.user.model.CartLineItem;
import com.app.restaurant_app.user.repos.CartRepository;
import com.app.restaurant_app.user.repos.MenuItemRepository;

import com.app.restaurant_app.user.dto.CartItemDTO;
import com.app.restaurant_app.user.dto.CartSummaryDTO;
import com.app.restaurant_app.user.mapper.CartMapper;
import lombok.RequiredArgsConstructor;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

	private final CartRepository cartRepo;
	private final MenuItemRepository menuItemRepo;
	private final AppUserRepository userRepo;
	private final CartMapper cartMapper;

	@Override
	public List<CartItemDTO> getCartItems(Long userId) {
		Cart cart = getOrCreateCart(userId);
		return cart.getItems().stream().map(cartMapper::toItemDto).toList();
	}

	@Override
	public CartSummaryDTO getCartSummary(Long userId) {
		Cart cart = getOrCreateCart(userId);
		return cartMapper.toSummaryDto(cart);
	}

	@Override
	public CartItemDTO addItem(Long userId, Long menuItemId) {
		return modifyItemQuantity(userId, menuItemId, 1);
	}

	@Override
	public CartItemDTO increaseQuantity(Long userId, Long menuItemId) {
		return modifyItemQuantity(userId, menuItemId, 1);
	}

	@Override
	public CartItemDTO decreaseQuantity(Long userId, Long menuItemId) {
		return modifyItemQuantity(userId, menuItemId, -1);
	}
	
	private CartItemDTO modifyItemQuantity(Long userId, Long menuItemId, int delta) {
	    Cart cart = getOrCreateCart(userId);
	    MenuItem menuItem = getMenuItem(menuItemId);

	    // Try to find existing cart line item in cart's list
	    CartLineItem item = cart.getItems().stream()
	            .filter(ci -> ci.getMenuItem().getId().equals(menuItemId))
	            .findFirst()
	            .orElse(null);

	    if (item == null) {
	        // Item not found, create new if delta > 0
	        if (delta > 0) {
	            item = CartLineItem.builder()
	                    .cart(cart)
	                    .menuItem(menuItem)
	                    .quantity(delta)
	                    .unitPrice(menuItem.getPrice())
	                    .totalPrice(menuItem.getPrice() * delta)
	                    .build();
	            cart.getItems().add(item);
	            cartRepo.save(cart);
	            return cartMapper.toItemDto(item);
	        } else {
	            // Trying to decrease item that doesn't exist — return null or throw exception
	            return null;
	        }
	    }

	    // Modify quantity
	    int newQty = item.getQuantity() + delta;
	    if (newQty <= 0) {
	        // Remove from cart
	        cart.getItems().remove(item);
	    } else {
	        item.setQuantity(newQty);
	        item.setTotalPrice(item.getUnitPrice() * newQty);
	    }

	    // Save the cart — orphanRemoval will delete child items if removed
	    cartRepo.save(cart);

	    if (newQty <= 0) {
	        return null;  // Item was removed completely
	    } else {
	        return cartMapper.toItemDto(item);
	    }
	}


	private Cart getOrCreateCart(Long userId) {
		AppUser user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		return cartRepo.findByUser(user).orElseGet(() -> cartRepo.save(Cart.builder().user(user).build()));
	}

	private MenuItem getMenuItem(Long menuItemId) {
		return menuItemRepo.findById(menuItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));
	}
}
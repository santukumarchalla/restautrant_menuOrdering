package com.app.restaurant_app.user.controller;

import com.app.restaurant_app.user.dto.CartItemDTO;
import com.app.restaurant_app.user.dto.CartSummaryDTO;
import com.app.restaurant_app.user.service.CartService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/cart")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public List<CartItemDTO> getCartItems(@PathVariable Long userId) {
        return cartService.getCartItems(userId);
    }

    @PostMapping("/add")
    public CartItemDTO addItem(@RequestParam Long userId, @RequestParam Long itemId) {
        return cartService.addItem(userId, itemId);
    }

    @PostMapping("/increase")
    public CartItemDTO increaseQuantity(@RequestParam Long userId, @RequestParam Long itemId) {
        return cartService.increaseQuantity(userId, itemId);
    }

    @PostMapping("/decrease")
    public ResponseEntity<?> decreaseQuantity(@RequestParam Long userId, @RequestParam Long itemId) {
        CartItemDTO updatedItem = cartService.decreaseQuantity(userId, itemId);
        if (updatedItem == null) {
            return ResponseEntity.ok("Item completely removed from cart.");
        }
        return ResponseEntity.ok(updatedItem);
    }


    @GetMapping("/summary/{userId}")
    public CartSummaryDTO getCartSummary(@PathVariable Long userId) {
        return cartService.getCartSummary(userId);
    }
    
	/*
	 * @DeleteMapping("/remove") public ResponseEntity<String>
	 * removeItem(@RequestParam Long userId, @RequestParam Long itemId) {
	 * cartService.removeItemCompletely(userId, itemId); return
	 * ResponseEntity.ok("Item completely removed from cart."); }
	 */
}
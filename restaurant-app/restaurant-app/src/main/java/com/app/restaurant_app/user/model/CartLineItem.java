package com.app.restaurant_app.user.model;

import com.app.restaurant_app.common.model.MenuItem;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class CartLineItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "cart_id")
	private Cart cart;

	@ManyToOne
	@JoinColumn(name = "menu_item_id")
	private MenuItem menuItem;

	private int quantity;

	private double unitPrice;

	private double totalPrice;

	// Getters, Setters, Constructor, Builder (use Lombok if needed)
}
package com.app.restaurant_app.user.dto;

import lombok.Data;

@Data
public class UserMenuItemDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private String imageUrl;

}
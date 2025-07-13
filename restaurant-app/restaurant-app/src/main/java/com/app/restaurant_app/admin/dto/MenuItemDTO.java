package com.app.restaurant_app.admin.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private boolean available;
    private Long categoryId;
    private String imageUrl;

}

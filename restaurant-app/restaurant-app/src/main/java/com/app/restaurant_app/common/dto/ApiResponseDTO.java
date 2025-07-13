package com.app.restaurant_app.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
@Getter
public class ApiResponseDTO {
    private String message;
    private boolean success;
    private String token;
}
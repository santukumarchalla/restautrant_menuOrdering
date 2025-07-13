package com.app.restaurant_app.common.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDTO {
    @Email
    private String email;

    @NotBlank
    private String password;
}
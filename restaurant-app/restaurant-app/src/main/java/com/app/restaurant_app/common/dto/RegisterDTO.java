package com.app.restaurant_app.common.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterDTO {
	    @NotBlank
	    private String name;

	    @Email
	    @NotBlank
	    private String email;

	    @NotBlank
	    private String password;

	    @Pattern(regexp = "^(USER|ADMIN)$", message = "Role must be USER or ADMIN")
	    private String role;
}

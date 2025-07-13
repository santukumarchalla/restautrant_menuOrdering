package com.app.restaurant_app.security.authentication;

import com.app.restaurant_app.common.dto.LoginDTO;
import com.app.restaurant_app.common.dto.RegisterDTO;
import com.app.restaurant_app.common.dto.ApiResponseDTO;
import com.app.restaurant_app.common.model.AppUser;
import com.app.restaurant_app.common.model.Role;
import com.app.restaurant_app.common.repos.AppUserRepository;
import com.app.restaurant_app.security.service.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AppUserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public ApiResponseDTO register(RegisterDTO request) {
        // Validate role
        if (!request.getRole().equalsIgnoreCase("ADMIN") && !request.getRole().equalsIgnoreCase("USER")) {
            throw new IllegalArgumentException("Invalid role. Must be 'USER' or 'ADMIN'");
        }

        AppUser user = AppUser.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole().toUpperCase()))
                .build();

        userRepo.save(user);

        String token = jwtService.generateToken(user);
        return new ApiResponseDTO("Registration successful", true, token);
    }

    public ApiResponseDTO login(LoginDTO request) {
        AppUser user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);
        return new ApiResponseDTO("Login successful", true, token);
    }
}
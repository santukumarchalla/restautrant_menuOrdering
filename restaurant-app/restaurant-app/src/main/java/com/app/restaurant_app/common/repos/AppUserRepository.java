package com.app.restaurant_app.common.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.restaurant_app.common.model.AppUser;
import com.app.restaurant_app.common.model.Role;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);

    List<AppUser> findByRole(Role role);

    Optional<AppUser> findByIdAndRole(Long id, Role role);
}

package com.backend.hotel.persistence.repository;

import com.backend.hotel.persistence.entity.Role;
import com.backend.hotel.persistence.entity.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(String name);
}

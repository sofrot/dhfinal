package com.backend.hotel.persistence.repository;
import com.backend.hotel.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    Optional<User> findByNameOrEmail(String name, String email);
    Optional<User> findByName(String name);
    Boolean existsByEmail(String email);
    Boolean existsByName(String name);

    @Query("SELECT u FROM User u WHERE u.verificationCode = ?1")
    Optional<User> findByVerificationCode(String verificationCode);
}

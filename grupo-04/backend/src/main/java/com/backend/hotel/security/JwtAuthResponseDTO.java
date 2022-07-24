package com.backend.hotel.security;
import com.backend.hotel.dto.UserDTO;
import com.backend.hotel.persistence.entity.Role;
import com.backend.hotel.persistence.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtAuthResponseDTO {

    private String jwt;
    private String tokenType = "Bearer";
    private String name;
    private String lastName;
    private String email;
    private Set<Role> roles = new HashSet<>();

    public JwtAuthResponseDTO(String tokenAccess, UserDTO user) {
        this.jwt = tokenAccess;
        this.name=user.getName();
        this.lastName=user.getLastName();
        this.email=user.getEmail();
        for (Role r:user.getRoles()) {
            this.roles.add(r);
        }
    }
}

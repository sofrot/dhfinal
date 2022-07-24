package com.backend.hotel.dto;
import com.backend.hotel.persistence.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Integer id;
    private String name;
    private String lastName;
    private String email;
    private Set<Role> roles = new HashSet<>();
    private String verificationCode;
    private boolean enabled;
    private Set<ProductDTO> favoriteProducts = new HashSet<>();

    public UserDTO(Integer id, String name, String lastName, String email, String verificationCode, boolean enabled) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.verificationCode = verificationCode;
        this.enabled = enabled;
    }

}

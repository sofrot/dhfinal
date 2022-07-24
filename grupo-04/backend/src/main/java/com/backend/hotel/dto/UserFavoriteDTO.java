package com.backend.hotel.dto;

import com.backend.hotel.persistence.entity.Role;

import java.util.HashSet;
import java.util.Set;

public class UserFavoriteDTO {

    private Integer id;
    private String name;
    private String lastName;
    private String email;
    private Set<Role> roles = new HashSet<>();
    private String verificationCode;
    private boolean enabled;
}

package com.backend.hotel.persistence.entity;
import com.backend.hotel.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String lastName;
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))

    private Set<Role> roles = new HashSet<>();

    @ManyToMany(targetEntity = Product.class, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(
            name = "favorite",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id")
    )
    private Set<Product> favoriteProducts = new HashSet<>();

    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    @NotNull
    private boolean enabled;

    public User(Integer id) {
        this.id = id;
    }

    public User(Integer id, String name, String lastName, String email, String verificationCode, boolean enabled) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.verificationCode = verificationCode;
        this.enabled = enabled;
    }

    public UserDTO toDTO(){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(id);
        userDTO.setName(name);
        userDTO.setLastName(lastName);
        userDTO.setEmail(email);
        userDTO.setRoles(roles);
        userDTO.setEnabled(enabled);
        userDTO.setVerificationCode(verificationCode);
        userDTO.setFavoriteProducts(favoriteProducts.stream().map(Product::toDTO).collect(Collectors.toSet()));
        return userDTO;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }
}

package com.backend.hotel.security;
import com.backend.hotel.persistence.entity.Role;
import com.backend.hotel.persistence.entity.User;
import com.backend.hotel.persistence.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service //servicio que usaré en security Config
public class CustomUserDetailsService implements UserDetailsService{

    @Autowired
    private IUserRepository userRepository;

    //metodo para buscar el usuario por el email y devolverlo como UserDetails
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User not found with email: " + email));
        //retorno usuario con email password y sus roles asociados
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), mapRoles(user.getRoles()));
    }

    //Obtengo una lista de roles asociados de un usuario
    private Collection<? extends GrantedAuthority> mapRoles(Set<Role> roles){
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }
}

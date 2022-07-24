package com.backend.hotel.service.impl;

import com.backend.hotel.persistence.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    private final IUserRepository userRepository;
    @Autowired
    public JwtUserDetailsService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByVerificationCode(String verificationCode) throws UsernameNotFoundException {
        return userRepository.findByVerificationCode(verificationCode).get();
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException{
        return userRepository.findByEmail(email).get();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}

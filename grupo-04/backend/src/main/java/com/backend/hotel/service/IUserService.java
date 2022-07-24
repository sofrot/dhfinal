package com.backend.hotel.service;
import com.backend.hotel.dto.ProductDTO;
import com.backend.hotel.dto.RegisterDTO;
import com.backend.hotel.dto.UserDTO;

import java.util.Set;

public interface IUserService {
    UserDTO findByEmail(String email);
    Set<ProductDTO> getFavorites(String email);
    RegisterDTO save(RegisterDTO registerDTO);
}

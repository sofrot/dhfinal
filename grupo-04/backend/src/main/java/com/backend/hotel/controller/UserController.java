package com.backend.hotel.controller;
import com.backend.hotel.dto.ProductDTO;
import com.backend.hotel.dto.UserDTO;
import com.backend.hotel.persistence.entity.User;
import com.backend.hotel.persistence.repository.IUserRepository;
import com.backend.hotel.service.IUserService;
import com.backend.hotel.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private IUserRepository userRepository;

    @GetMapping("/favorites/{email}")
    public ResponseEntity<Set<ProductDTO>> getFavorites(@PathVariable("email") String email){
        return new ResponseEntity<>(userService.getFavorites(email), HttpStatus.OK);
    }

    @GetMapping("get/{email}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String email){
        return new ResponseEntity<>(userService.findByEmail(email), HttpStatus.OK);
    }

    @PostMapping("create")
    public ResponseEntity<User> createUser(@RequestBody User User){
        return new ResponseEntity<>(userRepository.save(User), HttpStatus.OK);
    }

    @DeleteMapping("/favorite/delete/{email}/{productId}")
    public ResponseEntity<String> deleteFavorite(@PathVariable("email") String email,
                                                 @PathVariable("productId") Integer productId){
        return new ResponseEntity<>(userService.deleteFavorite(email, productId), HttpStatus.OK);
    }

    @PostMapping("/favorite/create/{email}/{productId}")
    public ResponseEntity<String> addFavorite(@PathVariable("email") String email,
                                              @PathVariable("productId") Integer productId){
        return new ResponseEntity<>(userService.addFavorite(email, productId), HttpStatus.OK);
    }
}

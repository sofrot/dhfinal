package com.backend.hotel.controller;
import com.backend.hotel.dto.LoginDTO;
import com.backend.hotel.dto.RegisterDTO;
import com.backend.hotel.dto.UserDTO;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.User;
import com.backend.hotel.persistence.repository.IUserRepository;
import com.backend.hotel.security.JwtAuthResponseDTO;
import com.backend.hotel.security.JwtTokenProvider;
import com.backend.hotel.service.impl.JwtUserDetailsService;
import com.backend.hotel.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO loginDTO) throws Exception {
        UserDetails userValidation = userDetailsService.loadUserByEmail(loginDTO.getEmail());
        if (userValidation.isEnabled()){
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);//establezco la autenticacion de que sea cierto
            UserDTO user = userService.findByEmail(loginDTO.getEmail());
            String jwt = jwtTokenProvider.generateToken(authentication, user);
            return ResponseEntity.ok(new JwtAuthResponseDTO(jwt, user)); //creo constructor que solo manda token
        }
        throw new ResourceNotFoundException("User", "email", loginDTO.getEmail());

        /*
        UserDetails userValidation = userDetailsService.loadUserByEmail(loginDTO.getEmail());
        System.out.println(userValidation.isEnabled());
        if(userValidation.isEnabled()){
            //authenticate(loginDTO.getEmail(),loginDTO.getPassword());
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);//establezco la autenticacion s sprintSecurity de que sea cierto
            //final UserDetails userDetails = userDetailsService.loadUserByEmail(loginDTO.getEmail());
            final String token = jwtTokenProvider.generateToken(userValidation);

            UserDTO user = userService.findByEmail(loginDTO.getEmail());

            return ResponseEntity.ok(new JwtAuthResponseDTO(token, user)); //creo constructor que solo manda token
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email not validated");
        }
        */
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @GetMapping("/verify/{code}")
    public ResponseEntity<?> verifyAccount(@PathVariable("code") String code){
        if(userService.verify(code)) {
            return ResponseEntity.ok(HttpStatus.OK);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Code not valid");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterDTO registerDTO) throws MessagingException, UnsupportedEncodingException {
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            return new ResponseEntity<>("Fail -> Email is already in use!", HttpStatus.BAD_REQUEST);
        }
         userService.save(registerDTO);
        User user = userRepository.findByEmail(registerDTO.getEmail()).orElseThrow(() -> new ResourceNotFoundException("User", "email", registerDTO.getEmail()));
        String url = System.getenv().get("URL_API_BACKEND");
        userService.sendVerificationEmail(user, url);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }
}

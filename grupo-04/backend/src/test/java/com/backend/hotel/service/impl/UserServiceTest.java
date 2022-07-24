package com.backend.hotel.service.impl;
import com.backend.hotel.controller.UserController;
import com.backend.hotel.dto.RegisterDTO;
import com.backend.hotel.dto.UserDTO;
import com.backend.hotel.exception.GlobalExceptionHandler;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.repository.IRoleRepository;
import com.backend.hotel.service.IUserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class
UserServiceTest {
    private MockMvc mockMvc;
    @Mock
    private IUserService userService;
    @InjectMocks
    private UserController userController;
    private UserDTO user;
    private RegisterDTO register;
    @Autowired
    private IRoleRepository roleRepository;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(userController).setControllerAdvice(GlobalExceptionHandler.class).build();
        user = new UserDTO (1,"Juan","Perez","juanpe@gmail.com","verificationcode",true);
        register = new RegisterDTO("Juan","Perez","juanpe@gmail.com","password","verificationcode",true);
        configureMockito();
    }

    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(userService.save(register)).thenReturn(register);
        Mockito.when(userService.findByEmail("juanpe@gmail.com")).thenReturn(user);
    }

    @Test
    public void addUser(){
        RegisterDTO r = userService.save(register);
        Assertions.assertEquals(r.getEmail(),register.getEmail());
    }

    @Test
    public void findByEmail() {
        UserDTO u = userService.findByEmail("juanpe@gmail.com");
        Assertions.assertEquals(u.getEmail(), user.getEmail());
    }

}

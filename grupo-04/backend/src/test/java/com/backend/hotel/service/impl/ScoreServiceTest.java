package com.backend.hotel.service.impl;
import com.backend.hotel.controller.ScoreController;
import com.backend.hotel.dto.ScoreDTO;
import com.backend.hotel.exception.GlobalExceptionHandler;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.Category;
import com.backend.hotel.persistence.entity.City;
import com.backend.hotel.persistence.entity.Product;
import com.backend.hotel.persistence.entity.User;
import com.backend.hotel.service.IScoreService;
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
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(ScoreController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class ScoreServiceTest {

    private MockMvc mockMvc;
    @Mock
    private IScoreService scoreService;

    @InjectMocks
    private ScoreController scoreController;

    private ScoreDTO score;
    private Product productDTO;
    private User user;

    @Before
    public void reset() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(scoreController).setControllerAdvice(GlobalExceptionHandler.class).build();
        productDTO = new Product (5,"Name","Title","Description","Introduction","Slogan",new City(1),"address",new Category(1),3.0);
        user = new User(1,"Juan","Perez","juanpe@gmail.com","verificationcode",true);
        score = new ScoreDTO(1,5.0,productDTO,user);
        configureMockito();
    }

    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(scoreService.save(score)).thenReturn(score);
        Mockito.when(scoreService.findById(1)).thenReturn(score);
        Mockito.when(scoreService.update(score)).thenReturn(score);
        Mockito.when(scoreService.findAll()).thenReturn(List.of(score));
    }

    @Test
    public void testAddScore() throws ResourceNotFoundException {
        ScoreDTO i = scoreService.save(score);
        Assertions.assertEquals(score,i);
    }

    @Test
    public void testUpdateScore() throws ResourceNotFoundException {
        score.setScore(3.0);
        ScoreDTO i = scoreService.update(score);
        Assertions.assertEquals(score,i);
    }

    @Test
    public void testFindById() throws ResourceNotFoundException {
        ScoreDTO i = scoreService.findById(1);
        Assertions.assertEquals(score,i);
    }

    @Test
    public void testFindAll() throws ResourceNotFoundException {
        List<ScoreDTO> i = scoreService.findAll();
        Assertions.assertEquals(List.of(score),i);
    }

}

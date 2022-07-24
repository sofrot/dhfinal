package com.backend.hotel.service.impl;
import com.backend.hotel.controller.CityController;
import com.backend.hotel.controller.ReservationController;
import com.backend.hotel.dto.ReservationDTO;
import com.backend.hotel.exception.GlobalExceptionHandler;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.Category;
import com.backend.hotel.persistence.entity.City;
import com.backend.hotel.persistence.entity.Product;
import com.backend.hotel.persistence.entity.User;
import com.backend.hotel.service.IReservationService;
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
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import static org.mockito.Mockito.doThrow;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CityController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class ReservationServiceTest {
    private MockMvc mockMvc;
    @Mock
    private IReservationService reservationService;
    @InjectMocks
    private ReservationController reservationController;

    private ReservationDTO reservation;
    private Product productDTO;
    private User user;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(reservationController).setControllerAdvice(GlobalExceptionHandler.class).build();
        productDTO = new Product (5,"Name","Title","Description","Introduction","Slogan",new City(1),"address",new Category(1),3.0);
        user = new User(1,"Juan","Perez","juanpe@gmail.com","verificationcode",true);
        reservation = new ReservationDTO (5, LocalTime.now(), LocalDate.now(),LocalDate.now(),productDTO,user,"comments");
        configureMockito();
    }

    public void configureMockito(){
        Mockito.when(reservationService.save(reservation)).thenReturn(reservation);
        Mockito.when(reservationService.findById(reservation.getId())).thenReturn(reservation);
        Mockito.when(reservationService.update(reservation)).thenReturn(reservation);
        Mockito.when(reservationService.findAll()).thenReturn(List.of(reservation));
        Mockito.when(reservationService.findAllByUserId(1)).thenReturn(List.of(reservation));
        Mockito.when(reservationService.findAllByProductId(1)).thenReturn(List.of(reservation));
    }

    @Test
    public void testAddReservation(){
        ReservationDTO r = reservationService.save(reservation);
        Assertions.assertEquals(reservation, r);
    }

    @Test
    public void testUpdateReservatin(){
        reservation.setComments("new comments");
        ReservationDTO r = reservationService.update(reservation);
        Assertions.assertEquals(reservation, r);
    }

    @Test
    public void testFindById(){
        ReservationDTO r = reservationService.findById(5);
        Assertions.assertEquals(reservation, r);
    }

    @Test
    public void testFindAll(){
        List<ReservationDTO> r = reservationService.findAll();
        Assertions.assertEquals(List.of(reservation), r);
    }

    @Test
    public void testFindAllByUserId(){
        List<ReservationDTO> r = reservationService.findAllByUserId(1);
        Assertions.assertEquals(List.of(reservation), r);
    }

    @Test
    public void testFindAllByProductId(){
        List<ReservationDTO> r = reservationService.findAllByProductId(1);
        Assertions.assertEquals(List.of(reservation), r);
    }

}

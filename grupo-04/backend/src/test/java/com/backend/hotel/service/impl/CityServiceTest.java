package com.backend.hotel.service.impl;
import com.backend.hotel.controller.CityController;
import com.backend.hotel.dto.CityDTO;
import com.backend.hotel.exception.GlobalExceptionHandler;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.service.ICityService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.mockito.Mock;
import org.junit.runner.RunWith;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.List;
import static org.mockito.Mockito.doThrow;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CityController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class CityServiceTest {

    private MockMvc mockMvc;
    @Mock
    private ICityService cityService;
    @InjectMocks
    private CityController cityController;
    private CityDTO city;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(cityController).setControllerAdvice(GlobalExceptionHandler.class).build();
        city = new CityDTO (1,"Córdoba","Argentina");
        configureMockito();
    }

    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(cityService.save(city)).thenReturn(city);
        Mockito.when(cityService.findById(1)).thenReturn(city);
        Mockito.when(cityService.update(city)).thenReturn(city);
        Mockito.when(cityService.findAll()).thenReturn(List.of(city));
        doThrow(new ResourceNotFoundException("No existe ninguna ciudad con el id ingresado")).when(cityService).deleteById(10);
    }

    @Test
    public void addCity(){
        CityDTO c = cityService.save(city);
        Assertions.assertEquals(city,c);
    }

    @Test
    public void testUpdateCity(){
        CityDTO c = cityService.save(city);
        c.setName("Córdoba2");
        CityDTO c2 = cityService.update(c);
        Assertions.assertEquals(c.getName(),c2.getName());
    }

    @Test
    public void findCityById(){
        CityDTO c = cityService.findById(1);
        Assertions.assertEquals(city,c);
    }

    @Test
    public void findAllCities(){
        List<CityDTO> c = cityService.findAll();
        Assertions.assertEquals(List.of(city),c);
    }

    @Test
    public void deleteCityById(){
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            cityService.deleteById(10);
        });
    }

}
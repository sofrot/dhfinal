package com.backend.hotel.service.impl;
import com.backend.hotel.controller.CityController;
import com.backend.hotel.controller.ProductController;
import com.backend.hotel.dto.ProductDTO;
import com.backend.hotel.exception.GlobalExceptionHandler;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.Category;
import com.backend.hotel.persistence.entity.City;
import com.backend.hotel.service.IProductService;
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
import java.util.List;
import static org.mockito.Mockito.doThrow;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CityController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class ProductServiceTest {
    private MockMvc mockMvc;
    @Mock
    private IProductService productService;
    @InjectMocks
    private ProductController productController;
    private ProductDTO productDTO;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(productController).setControllerAdvice(GlobalExceptionHandler.class).build();
        productDTO = new ProductDTO (5,"Name","Title","Description","Introduction","Slogan",new City(1),"address",new Category(1),3.0);
        configureMockito();
    }

    public void configureMockito() throws ResourceNotFoundException{
        Mockito.when(productService.save(productDTO)).thenReturn(productDTO);
        Mockito.when(productService.findById(5)).thenReturn(productDTO);
        Mockito.when(productService.update(productDTO)).thenReturn(productDTO);
        Mockito.when(productService.findAll()).thenReturn(List.of(productDTO));
        Mockito.when(productService.findAllBetweenDates(LocalDate.of(2022,04,22), LocalDate.of(2022,04,25))).thenReturn(List.of(productDTO));
        Mockito.when(productService.findAllByCity("CityName")).thenReturn(List.of(productDTO));
        Mockito.when(productService.findAllByCategory("CategoryName")).thenReturn(List.of(productDTO));
        doThrow(new ResourceNotFoundException("No existe ningun producto con el id ingresado")).when(productService).deleteById(10);
    }

    @Test
    public void testAddProduct(){
        ProductDTO p = productService.save(productDTO);
        Assertions.assertEquals(productDTO, p);
    }

    @Test
    public void testUpdateProduct(){
        productDTO.setName("NewName");
        ProductDTO p = productService.update(productDTO);
        Assertions.assertEquals(productDTO, p);
    }

    @Test
    public void testFindById(){
        ProductDTO p = productService.findById(5);
        Assertions.assertEquals(productDTO, p);
    }

    @Test
    public void testFindAll(){
        List<ProductDTO> p = productService.findAll();
        Assertions.assertEquals(List.of(productDTO), p);
    }

    @Test
    public void testDeleteById(){
        Assertions.assertThrows(ResourceNotFoundException.class, () -> productService.deleteById(10));
    }

    @Test
    public void testFindAllBetweenDates(){
        List<ProductDTO> p = productService.findAllBetweenDates(LocalDate.of(2022,04,22), LocalDate.of(2022,04,25));
        Assertions.assertEquals(List.of(productDTO), p);
    }

    @Test
    public void testFindAllByCity(){
        List<ProductDTO> p = productService.findAllByCity("CityName");
        Assertions.assertEquals(List.of(productDTO), p);
    }

    @Test
    public void testFindAllByCategory(){
        List<ProductDTO> p = productService.findAllByCategory("CategoryName");
        Assertions.assertEquals(List.of(productDTO), p);
    }
}

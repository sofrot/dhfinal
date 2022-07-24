package com.backend.hotel.service.impl;
import com.backend.hotel.controller.CategoryController;
import com.backend.hotel.controller.CityController;
import com.backend.hotel.dto.CategoryDTO;
import com.backend.hotel.exception.GlobalExceptionHandler;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.service.ICategoryService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.*;
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
import static org.mockito.Mockito.doThrow;


@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CityController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class CategoryServiceTest {
    private MockMvc mockMvc;
    @Mock
    private ICategoryService categoryService;
    @InjectMocks
    private CategoryController categoryController;

    private CategoryDTO category;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).setControllerAdvice(GlobalExceptionHandler.class).build();
        category = new CategoryDTO(8,"Hotel","Hotel 3 estrellas","https://unsplash.com/photos/MXbM1NrRqtI");
        configureMockito();
    }

    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(categoryService.save(category)).thenReturn(category);
        Mockito.when(categoryService.findById(8)).thenReturn(category);
        Mockito.when(categoryService.update(category)).thenReturn(category);
        Mockito.when(categoryService.findAll()).thenReturn(List.of(category));
        doThrow(new ResourceNotFoundException("No existe ninguna categoria con el id ingresado")).when(categoryService).deleteById(10);
    }

    @Test
    public void testSave(){
        CategoryDTO c = categoryService.save(category);
        Assertions.assertEquals(c, category);
    }

    @Test
    public void testFindById(){
        CategoryDTO c = categoryService.findById(8);
        Assertions.assertEquals(c, category);
    }

    @Test
    public void testUpdate(){
        category.setTitle("Hotel 4 estrellas");
        CategoryDTO c = categoryService.update(category);
        Assertions.assertEquals(c, category);
    }

    @Test
    public void testFindAll(){
        List<CategoryDTO> c = categoryService.findAll();
        Assertions.assertEquals(c, List.of(category));
    }

    @Test
    public void testDeleteById(){
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            categoryService.deleteById(10);
        });
    }
}

package com.backend.hotel.service.impl;
import com.backend.hotel.controller.CityController;
import com.backend.hotel.controller.FeatureController;
import com.backend.hotel.dto.FeatureDTO;
import com.backend.hotel.exception.GlobalExceptionHandler;
import com.backend.hotel.exception.ResourceNotFoundException;
import com.backend.hotel.persistence.entity.Product;
import com.backend.hotel.persistence.entity.enums.FeatureType;
import com.backend.hotel.service.IFeatureService;
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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.doThrow;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CityController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class FeatureServiceTest {
    private MockMvc mockMvc;
    @Mock
    private IFeatureService featureService;
    @InjectMocks
    private FeatureController featureController;
    private FeatureDTO feature;
    private Product productDTO;

    @Before
    public void reset() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(featureController).setControllerAdvice(GlobalExceptionHandler.class).build();
        List<Product> products = new ArrayList<>();
        products.add(new Product(1));
        feature = new FeatureDTO(1, "bar", FeatureType.bar, products);
        List<Integer> productIds = new ArrayList<>();
        productIds.add(1);
        productDTO = new Product(1);
        configureMockito();
    }

    public void configureMockito() throws ResourceNotFoundException {
        Mockito.when(featureService.save(feature)).thenReturn(feature);
        Mockito.when(featureService.findById(1)).thenReturn(feature);
        Mockito.when(featureService.update(feature)).thenReturn(feature);
        Mockito.when(featureService.findAll()).thenReturn(List.of(feature));
        doThrow(new ResourceNotFoundException("Feature not found")).when(featureService).deleteById(11);
    }

    @Test
    public void testSaveFeature() {
        FeatureDTO f = featureService.save(feature);
        Assertions.assertEquals(f, feature);
    }

    @Test
    public void testFindById() {
        FeatureDTO f = featureService.findById(1);
        Assertions.assertEquals(f, feature);
    }

    @Test
    public void testUpdateFeature() {
        feature.setName("bar2");
        FeatureDTO f = featureService.update(feature);
        Assertions.assertEquals(f, feature);
    }

    @Test
    public void testFindAll() {
        List<FeatureDTO> features = featureService.findAll();
        Assertions.assertEquals(features.size(), 1);
    }

    @Test
    public void testDeleteById() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            featureService.deleteById(11);
        });
    }

}

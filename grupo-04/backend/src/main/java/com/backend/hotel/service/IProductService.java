package com.backend.hotel.service;
import com.backend.hotel.dto.ProductDTO;
import com.backend.hotel.persistence.entity.Product;

import java.time.LocalDate;
import java.util.List;

public interface IProductService extends ICRUDService<ProductDTO>{

    List<ProductDTO> findAllByCategory(String category);
    List<ProductDTO> findAllByCategoryId(Integer categoryId);
    List<ProductDTO> findAllByCity(String city);
    List<ProductDTO> findAllByCityId(Integer id);
    List<ProductDTO> getRandomProduct();
    List<ProductDTO> findAllByPages(int pageNumber, int pageSize);
    List<ProductDTO> findAllBetweenDates(LocalDate startDate, LocalDate endDate);
}

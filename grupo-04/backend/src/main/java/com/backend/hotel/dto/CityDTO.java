package com.backend.hotel.dto;
import com.backend.hotel.persistence.entity.City;
import com.backend.hotel.persistence.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CityDTO {

    private Integer id;
    private String name;
    private String country;

    private List<Product> productList;

    public CityDTO(Integer id, String name, String country) {
        this.id = id;
        this.name = name;
        this.country = country;
    }

    public CityDTO(Integer id) {
        this.id = id;
    }

    public CityDTO(String name, String country) {
        this.name = name;
        this.country = country;
    }

    public City toEntity(){
        City city = new City();
        city.setId(id);
        city.setName(name);
        city.setCountry(country);
        city.setProductList(productList);
        return city;
    }
}

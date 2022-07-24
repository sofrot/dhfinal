package com.backend.hotel.dto;
import com.backend.hotel.persistence.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Integer id;
    private String name;
    private String title;
    private String description;
    private String introduction;
    private String slogan;
    private List<Feature> features;
    private City city;
    private String address;
    private Category category;
    private Double score;
    private List<Image> images;
    private List<Policy> policies;
    private List<Reservation> reservations;
    private boolean active;

    public ProductDTO(Integer id, String name, String title, String description, String introduction, String slogan, City city, String address, Category category, Double score) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.description = description;
        this.introduction = introduction;
        this.slogan = slogan;
        this.city = city;
        this.address = address;
        this.category = category;
        this.score = score;
    }

    public Product toEntity() {
        Product product = new Product();
        product.setId(id);
        product.setName(name);
        product.setTitle(title);
        product.setDescription(description);
        product.setIntroduction(introduction);
        product.setSlogan(slogan);
        product.setFeatures(features);
        product.setCity(city);
        product.setAddress(address);
        product.setCategory(category);
        product.setScore(score);
        product.setImages(images);
        product.setPolicies(policies);
        product.setReservations(reservations);
        product.setActive(active);
        return product;
    }
}

package com.backend.hotel.persistence.entity;

import com.backend.hotel.dto.CategoryDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private String url;

    @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Product> products;

    public Category(Integer id) {
        this.id = id;
    }

    //Mapper to DTO
    public CategoryDTO toDTO(){
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(id);
        categoryDTO.setTitle(title);
        categoryDTO.setDescription(description);
        categoryDTO.setUrl(url);
        categoryDTO.setProducts(products);
        return categoryDTO;
    }
}

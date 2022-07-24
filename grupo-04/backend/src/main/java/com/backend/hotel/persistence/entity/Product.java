package com.backend.hotel.persistence.entity;
import com.backend.hotel.dto.ProductDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String title;
    @Column(columnDefinition="TEXT")
    private String description;
    private String introduction;
    private String slogan;
    private String address;
    private boolean active;

    //----relations----

    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    @JsonIgnore
    private List<Feature> features;

    @ManyToOne
    @JoinColumn(name = "city_id")
    //@JsonIgnore //si quiero que aparezca en la peticion de reservas debo sacarlo
    private City city;

    @ManyToOne
    @JoinColumn(name = "category_id")
    //@JsonIgnore
    private Category category;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="product_id")
    private List<Image> images;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name= "product_id")
    private List<Policy> policies;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Reservation> reservations;

    //Atributo con la puntuacion promedio del producto---------------------
    @Column(name = "average_score")
    private Double score;

    public Product(Integer id) {
        this.id = id;
    }

    public Product(Integer i, String name, String title, String description, String introduction, String slogan, City city, String address, Category category, double v) {
        this.id = i;
        this.name = name;
        this.title = title;
        this.description = description;
        this.introduction = introduction;
        this.slogan = slogan;
        this.city = city;
        this.address = address;
        this.category = category;
        this.score = v;
    }

    public ProductDTO toDTO(){
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(id);
        productDTO.setName(name);
        productDTO.setTitle(title);
        productDTO.setDescription(description);
        productDTO.setIntroduction(introduction);
        productDTO.setSlogan(slogan);
        productDTO.setFeatures(features);
        productDTO.setCity(city);
        productDTO.setAddress(address);
        productDTO.setCategory(category);
        productDTO.setImages(images);
        productDTO.setPolicies(policies);
        productDTO.setReservations(reservations);
        productDTO.setScore(score);
        productDTO.setActive(active);
        return productDTO;
    }

}

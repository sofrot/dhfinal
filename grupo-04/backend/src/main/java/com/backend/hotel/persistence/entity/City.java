package com.backend.hotel.persistence.entity;
import com.backend.hotel.dto.CityDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "city")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String country;

    @OneToMany(mappedBy = "city")
    @JsonIgnore
    private List<Product> productList;

    public City(Integer id) {
        this.id = id;
    }

    public CityDTO toDTO(){
        CityDTO cityDTO = new CityDTO();
        cityDTO.setId(this.id);
        cityDTO.setName(this.name);
        cityDTO.setCountry(this.country);
        cityDTO.setProductList(productList);
        return cityDTO;
    }

}

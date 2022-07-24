package com.backend.hotel.persistence.entity;
import com.backend.hotel.dto.FeatureDTO;
import com.backend.hotel.persistence.entity.enums.FeatureType;
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
@Table(name = "features")
public class Feature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private FeatureType typeFeature;

    @ManyToMany(mappedBy = "features")
    @JsonIgnore
    private List<Product> products;

    public FeatureDTO toDTO(){
        FeatureDTO featureDTO = new FeatureDTO();
        featureDTO.setId(id);
        featureDTO.setName(name);
        featureDTO.setTypeFeature(typeFeature);
        featureDTO.setProducts(products);
        return featureDTO;
    }
}

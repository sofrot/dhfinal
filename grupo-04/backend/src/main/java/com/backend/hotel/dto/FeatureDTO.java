package com.backend.hotel.dto;
import com.backend.hotel.persistence.entity.Feature;
import com.backend.hotel.persistence.entity.Product;
import com.backend.hotel.persistence.entity.enums.FeatureType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeatureDTO {

    private Integer id;
    private String name;
    private FeatureType typeFeature;
    private List<Product> products;


    public Feature toEntity(){
        Feature feature = new Feature();
        feature.setId(id);
        feature.setName(name);
        feature.setTypeFeature(typeFeature);
        feature.setProducts(products);
        return feature;
    }
}

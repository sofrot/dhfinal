package com.backend.hotel.dto;
import com.backend.hotel.persistence.entity.Category;
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
public class CategoryDTO {
    private Integer id;
    private String title;
    private String description;
    private String url;
    private List<Product> products;

    public CategoryDTO(Integer id) {
        this.id = id;
    }

    public CategoryDTO(Integer id, String title, String description, String url) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
    }

    public Category toEntity(){
        Category category  = new Category();
        category.setId(id); //pruebo seteando el id
        category.setTitle(title);
        category.setDescription(description);
        category.setUrl(url);
        category.setProducts(products);
        return category;
    }

}

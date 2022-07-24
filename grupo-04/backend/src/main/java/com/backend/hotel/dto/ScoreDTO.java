package com.backend.hotel.dto;
import com.backend.hotel.persistence.entity.Product;
import com.backend.hotel.persistence.entity.Score;
import com.backend.hotel.persistence.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScoreDTO {

    private Integer id;
    private Double score;
    private Product product;
    private User user;

    public Score toEntity(){
        Score scoreEntity = new Score();
        scoreEntity.setId(id);
        scoreEntity.setScore(score);
        scoreEntity.setProduct(product);
        scoreEntity.setUser(user);
        return scoreEntity;
    }
}

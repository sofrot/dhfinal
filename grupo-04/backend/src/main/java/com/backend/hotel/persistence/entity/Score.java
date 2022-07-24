package com.backend.hotel.persistence.entity;
import com.backend.hotel.dto.ScoreDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Max(value = 5)
    @Min(value = 0)
    private Double score;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    public ScoreDTO toDTO(){
        ScoreDTO scoreDTO = new ScoreDTO();
        scoreDTO.setId(id);
        scoreDTO.setScore(score);
        scoreDTO.setProduct(product);
        scoreDTO.setUser(user);
        return scoreDTO;
    }

}

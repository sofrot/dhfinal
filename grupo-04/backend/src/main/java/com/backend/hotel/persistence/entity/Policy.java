package com.backend.hotel.persistence.entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "policy")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition="TEXT")
    private String rules;
    @Column(columnDefinition="TEXT")
    private String health;
    @Column(columnDefinition="TEXT")
    private String cancellation;

}

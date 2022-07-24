package com.backend.hotel.persistence.entity;
import com.backend.hotel.dto.ReservationDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalTime arrival;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String comments;



    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "addressee_id")
    private Addressee addressee;

    //1---

    public ReservationDTO toDTO(){
        ReservationDTO reservationDTO = new ReservationDTO();
        reservationDTO.setId(id);
        reservationDTO.setArrival(arrival);
        reservationDTO.setCheckIn(checkIn);
        reservationDTO.setCheckOut(checkOut);
        reservationDTO.setProduct(product);
        reservationDTO.setUser(user);
        reservationDTO.setAddressee(addressee);
        reservationDTO.setComments(comments);
        return reservationDTO;
    }

}

package com.backend.hotel.dto;
import com.backend.hotel.persistence.entity.Addressee;
import com.backend.hotel.persistence.entity.Product;
import com.backend.hotel.persistence.entity.Reservation;
import com.backend.hotel.persistence.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {

    private Integer id;
    private LocalTime arrival;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Product product;
    private User user;
    private Addressee addressee;
    private String comments;

    public ReservationDTO(Integer id, LocalTime arrival, LocalDate checkIn, LocalDate checkOut, Product product, User user, String comments) {
        this.id = id;
        this.arrival = arrival;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.product = product;
        this.user = user;
        this.comments = comments;
    }

    public Reservation toEntity(){
        Reservation reservation = new Reservation();
        reservation.setId(this.id);
        reservation.setArrival(arrival);
        reservation.setCheckIn(checkIn);
        reservation.setCheckOut(checkOut);
        reservation.setProduct(product);
        reservation.setUser(user);
        reservation.setAddressee(addressee);
        reservation.setComments(comments);
        return reservation;
    }

}

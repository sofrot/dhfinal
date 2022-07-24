package com.backend.hotel.persistence.repository;
import com.backend.hotel.persistence.entity.Reservation;
import com.backend.hotel.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Integer> {
    //consultar reserva por ID de producto
    List<Reservation> findByProduct_Id(Integer productId);
    List<Reservation> findByUser_id(Integer userId);

    //filter reservation by dates
    //List<Reservation> findByCheckInBetween(LocalDate startDate, LocalDate endDate);
}

package com.backend.hotel.service;

import com.backend.hotel.dto.ReservationDTO;
import com.backend.hotel.persistence.entity.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface IReservationService extends ICRUDService<ReservationDTO>{

    List<ReservationDTO> findAllByProductId(Integer productId);
    List<ReservationDTO> findAllByUserId(Integer userId);

}
